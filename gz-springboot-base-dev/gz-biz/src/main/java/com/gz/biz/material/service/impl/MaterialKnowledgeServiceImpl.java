package com.gz.biz.material.service.impl;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.alibaba.fastjson2.JSONWriter;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gz.biz.material.config.MaterialKnowledgeDifyProperties;
import com.gz.biz.material.domain.entity.MaterialCategoryDO;
import com.gz.biz.material.domain.req.MaterialSpecModelIdReq;
import com.gz.biz.material.domain.req.MaterialSpecModelPageReq;
import com.gz.biz.material.domain.vo.MaterialKnowledgeSyncVO;
import com.gz.biz.material.domain.vo.MaterialSpecModelVO;
import com.gz.biz.material.mapper.MaterialCategoryMapper;
import com.gz.biz.material.service.IMaterialKnowledgeService;
import com.gz.biz.material.service.IMaterialSpecModelService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
public class MaterialKnowledgeServiceImpl implements IMaterialKnowledgeService {

    private static final int MATERIAL_PAGE_SIZE = 200;
    private static final int DIFY_PAGE_SIZE = 100;
    private static final int CONNECT_TIMEOUT_MS = 10000;
    private static final int READ_TIMEOUT_MS = 30000;
    private static final String MATERIAL_SPLITTER = "\n\n<<<MATERIAL_SEGMENT_SPLITTER>>>\n\n";
    private static final String MATERIAL_DOCUMENT_TYPE = "material";

    @Resource
    private IMaterialSpecModelService specModelService;

    @Resource
    private MaterialCategoryMapper categoryMapper;

    @Resource
    private MaterialKnowledgeDifyProperties difyProperties;

    @Override
    @Transactional(readOnly = true)
    public MaterialKnowledgeSyncVO syncStandardMaterialKnowledge() {
        difyProperties.validateOrThrow();

        List<MaterialSpecModelVO> materialList = loadAllActiveSpecModels();
        String content = buildKnowledgeDocument(materialList);

        List<String> existsDocumentIds = listSameNameDocumentIds();
        for (String id : existsDocumentIds) {
            deleteDocument(id);
        }

        String createdDocumentId = createDocumentByText(content);

        MaterialKnowledgeSyncVO result = new MaterialKnowledgeSyncVO();
        result.setSuccess(Boolean.TRUE);
        result.setMessage("知识库已更新（覆盖）");
        result.setDatasetId(difyProperties.getDatasetId());
        result.setDocumentName(difyProperties.getDocumentName());
        result.setDeletedCount(existsDocumentIds.size());
        result.setCreatedDocumentId(createdDocumentId);
        result.setSyncedItemCount(materialList.size());
        return result;
    }

    private List<MaterialSpecModelVO> loadAllActiveSpecModels() {
        List<MaterialSpecModelVO> all = new ArrayList<>();
        int pageNum = 1;
        while (true) {
            MaterialSpecModelPageReq req = new MaterialSpecModelPageReq();
            req.setStatus("1");
            req.setPageNum(pageNum);
            req.setPageSize(MATERIAL_PAGE_SIZE);

            Page<MaterialSpecModelVO> page = specModelService.pageSpecModel(req);
            List<MaterialSpecModelVO> records = page == null ? Collections.emptyList() : page.getRecords();
            if (records == null || records.isEmpty()) {
                break;
            }

            for (MaterialSpecModelVO record : records) {
                if (record == null || record.getId() == null) {
                    continue;
                }
                MaterialSpecModelIdReq idReq = new MaterialSpecModelIdReq();
                idReq.setId(record.getId());
                MaterialSpecModelVO detail = specModelService.getSpecModelById(idReq);
                if (detail == null) {
                    continue;
                }
                if (!"1".equals(detail.getStatus())) {
                    continue;
                }
                all.add(detail);
            }

            long total = page.getTotal();
            if ((long) pageNum * MATERIAL_PAGE_SIZE >= total) {
                break;
            }
            pageNum++;
        }
        return all;
    }

    private String buildKnowledgeDocument(List<MaterialSpecModelVO> materialList) {
        List<String> blocks = new ArrayList<>();

        for (MaterialSpecModelVO item : materialList) {
            LinkedHashMap<String, Object> payload = new LinkedHashMap<>();
            payload.put("标准材料ID", resolveStdNameCode(item));
            payload.put("标准材料名称", item.getStandardName());

            LinkedHashMap<String, Object> categoryMap = new LinkedHashMap<>();
            CategoryPath path = resolveCategoryPath(item.getCategoryLevel2Id());
            categoryMap.put("一级分类", path.level1Name);
            categoryMap.put("二级分类", path.level2Name);
            categoryMap.put("三级分类", path.level3Name);
            payload.put("所属分类", categoryMap);

            List<LinkedHashMap<String, Object>> units = new ArrayList<>();
            List<MaterialSpecModelVO.UnitVO> unitItems = item.getUnitItems() == null ? Collections.emptyList() : item.getUnitItems();
            for (MaterialSpecModelVO.UnitVO unit : unitItems) {
                if (unit == null) continue;
                LinkedHashMap<String, Object> unitMap = new LinkedHashMap<>();
                unitMap.put("单位ID", resolveUnitBizId(unit));
                unitMap.put("单位名称", unit.getUnitName());
                units.add(unitMap);
            }
            payload.put("标准单位", units);

            LinkedHashMap<String, Object> specAttr = new LinkedHashMap<>();
            List<MaterialSpecModelVO.SpecItemVO> specItems = item.getSpecItems() == null ? Collections.emptyList() : item.getSpecItems();
            for (MaterialSpecModelVO.SpecItemVO specItem : specItems) {
                if (specItem == null || !StringUtils.hasText(specItem.getSpecKey())) {
                    continue;
                }
                List<LinkedHashMap<String, Object>> values = new ArrayList<>();
                List<MaterialSpecModelVO.SpecValueVO> valueItems = specItem.getSpecValueItems() == null
                        ? Collections.emptyList() : specItem.getSpecValueItems();
                for (MaterialSpecModelVO.SpecValueVO specValue : valueItems) {
                    if (specValue == null || !StringUtils.hasText(specValue.getSpecValue())) {
                        continue;
                    }
                    LinkedHashMap<String, Object> valueMap = new LinkedHashMap<>();
                    valueMap.put("属性值ID", resolveSpecValueCode(specValue));
                    valueMap.put("属性值", specValue.getSpecValue());
                    values.add(valueMap);
                }
                specAttr.put(specItem.getSpecKey(), values);
            }
            payload.put("标准规格属性", specAttr);

            // 仅保留纯 JSON，避免标题/说明文本进入分段内容
            blocks.add(JSON.toJSONString(payload, JSONWriter.Feature.PrettyFormat));
        }
        return String.join(MATERIAL_SPLITTER, blocks);
    }

    private List<String> listSameNameDocumentIds() {
        String documentName = difyProperties.getDocumentName();
        List<String> ids = new ArrayList<>();
        int page = 1;
        while (true) {
            JSONObject response = doGet(
                    "/datasets/" + difyProperties.getDatasetId() + "/documents",
                    Map.of("page", page, "limit", DIFY_PAGE_SIZE));
            JSONArray dataArray = extractDocumentArray(response);
            if (dataArray == null || dataArray.isEmpty()) {
                break;
            }

            for (int i = 0; i < dataArray.size(); i++) {
                JSONObject obj = dataArray.getJSONObject(i);
                if (obj == null) continue;
                String name = obj.getString("name");
                String id = obj.getString("id");
                if (documentName.equals(name) && StringUtils.hasText(id)) {
                    ids.add(id);
                }
            }

            boolean hasMore = extractHasMore(response);
            if (!hasMore) {
                break;
            }
            page++;
            if (page > 200) {
                break;
            }
        }
        return ids.stream().filter(StringUtils::hasText).distinct().collect(Collectors.toList());
    }

    private void deleteDocument(String documentId) {
        doRequest("DELETE", "/datasets/" + difyProperties.getDatasetId() + "/documents/" + documentId, null);
    }

    private String createDocumentByText(String content) {
        JSONObject body = new JSONObject();
        body.put("name", difyProperties.getDocumentName());
        body.put("text", content);
        body.put("indexing_technique", "high_quality");
        body.put("process_rule", buildCustomProcessRule());
        body.put("metadata", buildDocumentMetadata());

        JSONObject resp;
        try {
            resp = doRequest("POST", "/datasets/" + difyProperties.getDatasetId() + "/document/create-by-text", body);
        } catch (Exception ex) {
            log.warn("Dify create-by-text 接口调用失败，尝试回退到 /documents: {}", ex.getMessage());
            JSONObject fallbackBody = new JSONObject();
            fallbackBody.put("name", difyProperties.getDocumentName());
            fallbackBody.put("text", content);
            fallbackBody.put("indexing_technique", "high_quality");
            fallbackBody.put("process_rule", buildCustomProcessRule());
            fallbackBody.put("metadata", buildDocumentMetadata());
            resp = doRequest("POST", "/datasets/" + difyProperties.getDatasetId() + "/documents", fallbackBody);
        }
        return extractCreatedDocumentId(resp);
    }

    private JSONObject buildDocumentMetadata() {
        JSONObject metadata = new JSONObject();
        metadata.put("type", MATERIAL_DOCUMENT_TYPE);
        return metadata;
    }

    private JSONObject buildCustomProcessRule() {
        JSONObject segmentation = new JSONObject();
        segmentation.put("separator", MATERIAL_SPLITTER.trim());
        segmentation.put("max_tokens", 4000);

        JSONArray preProcessingRules = new JSONArray();
        JSONObject removeExtraSpaces = new JSONObject();
        removeExtraSpaces.put("id", "remove_extra_spaces");
        removeExtraSpaces.put("enabled", true);
        preProcessingRules.add(removeExtraSpaces);
        JSONObject removeUrlsEmails = new JSONObject();
        removeUrlsEmails.put("id", "remove_urls_emails");
        removeUrlsEmails.put("enabled", false);
        preProcessingRules.add(removeUrlsEmails);

        JSONObject rules = new JSONObject();
        rules.put("segmentation", segmentation);
        rules.put("pre_processing_rules", preProcessingRules);

        JSONObject processRule = new JSONObject();
        processRule.put("mode", "custom");
        processRule.put("rules", rules);
        return processRule;
    }

    private JSONObject doGet(String path, Map<String, Object> query) {
        String queryString = "";
        if (query != null && !query.isEmpty()) {
            queryString = query.entrySet().stream()
                    .filter(e -> e.getValue() != null)
                    .map(e -> e.getKey() + "=" + String.valueOf(e.getValue()))
                    .collect(Collectors.joining("&"));
            if (StringUtils.hasText(queryString)) {
                queryString = "?" + queryString;
            }
        }
        return doRequest("GET", path + queryString, null);
    }

    private JSONObject doRequest(String method, String path, JSONObject body) {
        HttpURLConnection conn = null;
        try {
            String baseUrl = difyProperties.getBaseUrl().trim();
            String normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
            URL url = new URL(normalizedBaseUrl + path);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod(method);
            conn.setConnectTimeout(CONNECT_TIMEOUT_MS);
            conn.setReadTimeout(READ_TIMEOUT_MS);
            conn.setRequestProperty("Authorization", "Bearer " + difyProperties.getApiKey());
            conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoInput(true);

            if (body != null) {
                conn.setDoOutput(true);
                byte[] bodyBytes = body.toJSONString().getBytes(StandardCharsets.UTF_8);
                try (OutputStream os = conn.getOutputStream()) {
                    os.write(bodyBytes);
                    os.flush();
                }
            }

            int code = conn.getResponseCode();
            InputStream stream = code >= 400 ? conn.getErrorStream() : conn.getInputStream();
            String respText = readStream(stream);
            if (code >= 400) {
                if (code == 401) {
                    throw new IllegalArgumentException(
                            "Dify鉴权失败(401)：请确认 material.knowledge.dify.api-key 为知识库可用的 Bearer Token，并重启后端服务。响应："
                                    + truncate(respText));
                }
                throw new IllegalArgumentException("Dify接口请求失败，HTTP " + code + "，响应：" + truncate(respText));
            }
            if (!StringUtils.hasText(respText)) {
                return new JSONObject();
            }
            return JSON.parseObject(respText);
        } catch (Exception e) {
            if (e instanceof IllegalArgumentException) {
                throw (IllegalArgumentException) e;
            }
            throw new IllegalArgumentException("调用Dify接口失败：" + e.getMessage(), e);
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
    }

    private String readStream(InputStream stream) {
        if (stream == null) return "";
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            return sb.toString();
        } catch (Exception e) {
            return "";
        }
    }

    private JSONArray extractDocumentArray(JSONObject response) {
        if (response == null) return new JSONArray();
        JSONArray dataArray = response.getJSONArray("data");
        if (dataArray != null) {
            return dataArray;
        }
        JSONObject dataObj = response.getJSONObject("data");
        if (dataObj == null) {
            return new JSONArray();
        }
        JSONArray nestedArray = dataObj.getJSONArray("data");
        return nestedArray == null ? new JSONArray() : nestedArray;
    }

    private boolean extractHasMore(JSONObject response) {
        if (response == null) return false;
        Boolean hasMore = response.getBoolean("has_more");
        if (hasMore != null) {
            return hasMore;
        }
        JSONObject dataObj = response.getJSONObject("data");
        if (dataObj == null) return false;
        Boolean nested = dataObj.getBoolean("has_more");
        return nested != null && nested;
    }

    private String extractCreatedDocumentId(JSONObject response) {
        if (response == null) return null;

        String topId = response.getString("id");
        if (StringUtils.hasText(topId)) {
            return topId;
        }

        JSONObject documentObj = response.getJSONObject("document");
        if (documentObj != null && StringUtils.hasText(documentObj.getString("id"))) {
            return documentObj.getString("id");
        }

        JSONObject dataObj = response.getJSONObject("data");
        if (dataObj == null) {
            return null;
        }
        if (StringUtils.hasText(dataObj.getString("id"))) {
            return dataObj.getString("id");
        }
        JSONObject nestedDoc = dataObj.getJSONObject("document");
        return nestedDoc == null ? null : nestedDoc.getString("id");
    }

    private String resolveStdNameCode(MaterialSpecModelVO item) {
        if (StringUtils.hasText(item.getStdNameCode())) {
            return item.getStdNameCode();
        }
        if (item.getId() == null) {
            return "";
        }
        return String.format("M%06d", item.getId());
    }

    private String resolveUnitBizId(MaterialSpecModelVO.UnitVO unitVO) {
        if (StringUtils.hasText(unitVO.getUnitBizId())) {
            return unitVO.getUnitBizId();
        }
        if (unitVO.getUnitId() == null) {
            return "";
        }
        return String.format("U%04d", unitVO.getUnitId());
    }

    private String resolveSpecValueCode(MaterialSpecModelVO.SpecValueVO specValueVO) {
        if (StringUtils.hasText(specValueVO.getSpecValueCode())) {
            return specValueVO.getSpecValueCode();
        }
        if (specValueVO.getSpecValueId() == null) {
            return "";
        }
        return String.format("V%06d", specValueVO.getSpecValueId());
    }

    private CategoryPath resolveCategoryPath(Long categoryLevel2Id) {
        if (categoryLevel2Id == null) {
            return CategoryPath.empty();
        }

        Map<Long, MaterialCategoryDO> cache = new LinkedHashMap<>();
        MaterialCategoryDO current = getCategoryById(categoryLevel2Id, cache);
        if (current == null) {
            return CategoryPath.empty();
        }

        String level1Name = "";
        String level2Name = "";
        String level3Name = "";
        Integer level = current.getLevel();

        if (Objects.equals(level, 1)) {
            level1Name = safeName(current);
        } else if (Objects.equals(level, 2)) {
            level2Name = safeName(current);
            MaterialCategoryDO p = getCategoryById(current.getParentId(), cache);
            level1Name = safeName(p);
        } else if (Objects.equals(level, 3)) {
            level3Name = safeName(current);
            MaterialCategoryDO p2 = getCategoryById(current.getParentId(), cache);
            level2Name = safeName(p2);
            MaterialCategoryDO p1 = p2 == null ? null : getCategoryById(p2.getParentId(), cache);
            level1Name = safeName(p1);
        } else {
            level2Name = safeName(current);
        }
        return new CategoryPath(level1Name, level2Name, level3Name);
    }

    private MaterialCategoryDO getCategoryById(Long id, Map<Long, MaterialCategoryDO> cache) {
        if (id == null) return null;
        if (cache.containsKey(id)) {
            return cache.get(id);
        }
        MaterialCategoryDO category = categoryMapper.selectOne(new LambdaQueryWrapper<MaterialCategoryDO>()
                .eq(MaterialCategoryDO::getId, id)
                .eq(MaterialCategoryDO::getStatus, "1")
                .last("limit 1"));
        cache.put(id, category);
        return category;
    }

    private String safeName(MaterialCategoryDO category) {
        return category == null ? "" : category.getCategoryName();
    }

    private String truncate(String text) {
        if (!StringUtils.hasText(text)) {
            return "";
        }
        if (text.length() <= 400) {
            return text;
        }
        return text.substring(0, 400) + "...";
    }

    private static class CategoryPath {
        private final String level1Name;
        private final String level2Name;
        private final String level3Name;

        private CategoryPath(String level1Name, String level2Name, String level3Name) {
            this.level1Name = level1Name == null ? "" : level1Name;
            this.level2Name = level2Name == null ? "" : level2Name;
            this.level3Name = level3Name == null ? "" : level3Name;
        }

        private static CategoryPath empty() {
            return new CategoryPath("", "", "");
        }
    }
}
