package com.gz.biz.material.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gz.biz.material.domain.entity.MaterialCategoryDO;
import com.gz.biz.material.domain.entity.MaterialStdNameDO;
import com.gz.biz.material.domain.entity.MaterialStdNameSpecDO;
import com.gz.biz.material.domain.entity.MaterialStdNameSpecValueDO;
import com.gz.biz.material.domain.entity.MaterialStdNameUnitDO;
import com.gz.biz.material.domain.entity.MaterialUnitDO;
import com.gz.biz.material.domain.req.MaterialSpecModelIdReq;
import com.gz.biz.material.domain.req.MaterialSpecModelPageReq;
import com.gz.biz.material.domain.req.MaterialSpecModelSaveReq;
import com.gz.biz.material.domain.vo.MaterialSpecModelVO;
import com.gz.biz.material.mapper.MaterialCategoryMapper;
import com.gz.biz.material.mapper.MaterialStdNameMapper;
import com.gz.biz.material.mapper.MaterialStdNameSpecMapper;
import com.gz.biz.material.mapper.MaterialStdNameSpecValueMapper;
import com.gz.biz.material.mapper.MaterialStdNameUnitMapper;
import com.gz.biz.material.mapper.MaterialUnitMapper;
import com.gz.biz.material.service.IMaterialSpecModelService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MaterialSpecModelServiceImpl implements IMaterialSpecModelService {

    @Resource
    private MaterialStdNameMapper stdNameMapper;

    @Resource
    private MaterialStdNameUnitMapper stdNameUnitMapper;

    @Resource
    private MaterialStdNameSpecMapper stdNameSpecMapper;

    @Resource
    private MaterialStdNameSpecValueMapper stdNameSpecValueMapper;

    @Resource
    private MaterialCategoryMapper categoryMapper;

    @Resource
    private MaterialUnitMapper unitMapper;

    @Override
    public Page<MaterialSpecModelVO> pageSpecModel(MaterialSpecModelPageReq req) {
        Page<MaterialSpecModelVO> page = new Page<>(req.getPageNum(), req.getPageSize());

        List<Long> allowCategoryLevel2Ids = resolveLevel2Ids(req.getCategoryLevel1Id(), req.getCategoryLevel2Id());
        if (allowCategoryLevel2Ids != null && allowCategoryLevel2Ids.isEmpty()) {
            page.setRecords(Collections.emptyList());
            page.setTotal(0);
            return page;
        }

        LambdaQueryWrapper<MaterialStdNameDO> wrapper = new LambdaQueryWrapper<MaterialStdNameDO>()
                .eq(StringUtils.hasText(req.getStatus()), MaterialStdNameDO::getStatus, req.getStatus())
                .like(StringUtils.hasText(req.getStandardName()), MaterialStdNameDO::getStandardName, req.getStandardName())
                .orderByDesc(MaterialStdNameDO::getCreateTime);

        if (allowCategoryLevel2Ids != null) {
            wrapper.in(MaterialStdNameDO::getCategoryLevel2Id, allowCategoryLevel2Ids);
        }

        List<MaterialStdNameDO> all = stdNameMapper.selectList(wrapper);
        List<MaterialSpecModelVO> allVos = buildVoList(all, false);

        int total = allVos.size();
        int fromIndex = (int) ((req.getPageNum() - 1) * req.getPageSize());
        int toIndex = Math.min(fromIndex + req.getPageSize(), total);
        if (fromIndex < total) {
            page.setRecords(allVos.subList(fromIndex, toIndex));
        } else {
            page.setRecords(Collections.emptyList());
        }
        page.setTotal(total);
        return page;
    }

    @Override
    public MaterialSpecModelVO getSpecModelById(MaterialSpecModelIdReq req) {
        MaterialStdNameDO main = stdNameMapper.selectById(req.getId());
        if (main == null) {
            return null;
        }
        List<MaterialSpecModelVO> vos = buildVoList(Collections.singletonList(main), true);
        return vos.isEmpty() ? null : vos.get(0);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean saveSpecModel(MaterialSpecModelSaveReq req) {
        NormalizedSpecModel normalized = validateAndNormalizeReq(req, null);

        MaterialStdNameDO entity = new MaterialStdNameDO();
        entity.setStandardName(normalized.standardName);
        entity.setCategoryLevel2Id(req.getCategoryLevel2Id());
        entity.setStatus(StringUtils.hasText(req.getStatus()) ? req.getStatus() : "1");

        int inserted = stdNameMapper.insert(entity);
        if (inserted <= 0 || entity.getId() == null) {
            return false;
        }

        assignStdNameCode(entity.getId());
        upsertChildren(entity.getId(), normalized);
        return true;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean updateSpecModel(MaterialSpecModelSaveReq req) {
        if (req.getId() == null) {
            throw new IllegalArgumentException("更新ID不能为空");
        }

        MaterialStdNameDO exists = stdNameMapper.selectById(req.getId());
        if (exists == null) {
            throw new IllegalArgumentException("标准规格型号不存在");
        }

        NormalizedSpecModel normalized = validateAndNormalizeReq(req, req.getId());

        MaterialStdNameDO entity = new MaterialStdNameDO();
        entity.setId(req.getId());
        entity.setStandardName(normalized.standardName);
        entity.setCategoryLevel2Id(req.getCategoryLevel2Id());
        entity.setStatus(StringUtils.hasText(req.getStatus()) ? req.getStatus() : "1");
        if (!StringUtils.hasText(exists.getStdNameCode())) {
            entity.setStdNameCode(formatCode("M", req.getId(), 6));
        }

        int updated = stdNameMapper.updateById(entity);
        if (updated <= 0) {
            return false;
        }

        upsertChildren(req.getId(), normalized);
        return true;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteSpecModel(MaterialSpecModelIdReq req) {
        removeChildren(req.getId());
        return stdNameMapper.deleteById(req.getId()) > 0;
    }

    private NormalizedSpecModel validateAndNormalizeReq(MaterialSpecModelSaveReq req, Long currentStdNameId) {
        NormalizedSpecModel result = new NormalizedSpecModel();

        result.standardName = req.getStandardName() == null ? "" : req.getStandardName().trim();
        if (!StringUtils.hasText(result.standardName)) {
            throw new IllegalArgumentException("标准材料名称不能为空");
        }

        List<MaterialCategoryDO> categoryList = categoryMapper.selectList(new LambdaQueryWrapper<MaterialCategoryDO>()
                .eq(MaterialCategoryDO::getId, req.getCategoryLevel2Id())
                .eq(MaterialCategoryDO::getStatus, "1"));
        if (CollectionUtils.isEmpty(categoryList)) {
            throw new IllegalArgumentException("所属分类不存在或已停用");
        }
        Integer categoryLevel = categoryList.get(0).getLevel();
        if (categoryLevel == null || (categoryLevel != 2 && categoryLevel != 3)) {
            throw new IllegalArgumentException("所属分类必须为二级或三级分类");
        }

        LambdaQueryWrapper<MaterialStdNameDO> duplicateWrapper = new LambdaQueryWrapper<MaterialStdNameDO>()
                .eq(MaterialStdNameDO::getStandardName, result.standardName)
                .ne(currentStdNameId != null, MaterialStdNameDO::getId, currentStdNameId);
        Long duplicate = stdNameMapper.selectCount(duplicateWrapper);
        if (duplicate != null && duplicate > 0) {
            throw new IllegalArgumentException("标准材料名称已存在");
        }

        result.units = normalizeUnits(req);
        if (result.units.isEmpty()) {
            throw new IllegalArgumentException("至少需要一个有效单位");
        }

        result.specItems = normalizeSpecItems(req);
        if (result.specItems.isEmpty()) {
            throw new IllegalArgumentException("至少需要一项有效规格");
        }

        return result;
    }

    private List<UnitInput> normalizeUnits(MaterialSpecModelSaveReq req) {
        List<MaterialUnitDO> enabledUnits = unitMapper.selectList(new LambdaQueryWrapper<MaterialUnitDO>()
                .eq(MaterialUnitDO::getStatus, "1"));
        Map<Long, MaterialUnitDO> enabledById = enabledUnits.stream()
                .collect(Collectors.toMap(MaterialUnitDO::getId, u -> u, (a, b) -> a));
        Map<String, MaterialUnitDO> enabledByName = enabledUnits.stream()
                .filter(u -> StringUtils.hasText(u.getUnitName()))
                .collect(Collectors.toMap(MaterialUnitDO::getUnitName, u -> u, (a, b) -> a));

        LinkedHashMap<Long, UnitInput> dedup = new LinkedHashMap<>();
        if (!CollectionUtils.isEmpty(req.getUnitItems())) {
            for (MaterialSpecModelSaveReq.UnitReq item : req.getUnitItems()) {
                if (item == null || item.getUnitId() == null) continue;
                MaterialUnitDO unit = enabledById.get(item.getUnitId());
                if (unit == null) {
                    throw new IllegalArgumentException("单位不存在或已停用：" + item.getUnitId());
                }
                dedup.put(unit.getId(), new UnitInput(unit.getId(), unit.getUnitName()));
            }
        } else if (!CollectionUtils.isEmpty(req.getUnits())) {
            for (String unitName : req.getUnits()) {
                if (!StringUtils.hasText(unitName)) continue;
                String normalized = unitName.trim();
                MaterialUnitDO unit = enabledByName.get(normalized);
                if (unit == null) {
                    throw new IllegalArgumentException("单位不在单位库中：" + normalized);
                }
                dedup.put(unit.getId(), new UnitInput(unit.getId(), unit.getUnitName()));
            }
        }
        return new ArrayList<>(dedup.values());
    }

    private List<SpecItemInput> normalizeSpecItems(MaterialSpecModelSaveReq req) {
        if (CollectionUtils.isEmpty(req.getSpecItems())) {
            return Collections.emptyList();
        }
        List<SpecItemInput> items = new ArrayList<>();
        for (MaterialSpecModelSaveReq.SpecItemReq item : req.getSpecItems()) {
            if (item == null || !StringUtils.hasText(item.getSpecKey())) {
                continue;
            }
            SpecItemInput input = new SpecItemInput();
            input.specId = item.getSpecId();
            input.specKey = item.getSpecKey().trim();
            input.values = normalizeSpecValues(item);
            if (!input.values.isEmpty()) {
                items.add(input);
            }
        }
        return items;
    }

    private List<SpecValueInput> normalizeSpecValues(MaterialSpecModelSaveReq.SpecItemReq item) {
        LinkedHashMap<String, SpecValueInput> dedup = new LinkedHashMap<>();
        if (!CollectionUtils.isEmpty(item.getSpecValueItems())) {
            for (MaterialSpecModelSaveReq.SpecValueReq valueReq : item.getSpecValueItems()) {
                if (valueReq == null || !StringUtils.hasText(valueReq.getSpecValue())) continue;
                String text = valueReq.getSpecValue().trim();
                String key = valueReq.getSpecValueId() == null ? "N:" + text : "I:" + valueReq.getSpecValueId();
                SpecValueInput valueInput = new SpecValueInput();
                valueInput.specValueId = valueReq.getSpecValueId();
                valueInput.specValue = text;
                dedup.put(key, valueInput);
            }
        } else if (!CollectionUtils.isEmpty(item.getSpecValues())) {
            for (String value : item.getSpecValues()) {
                if (!StringUtils.hasText(value)) continue;
                String text = value.trim();
                SpecValueInput valueInput = new SpecValueInput();
                valueInput.specValue = text;
                dedup.put("N:" + text, valueInput);
            }
        }
        return new ArrayList<>(dedup.values());
    }

    private void upsertChildren(Long stdNameId, NormalizedSpecModel req) {
        upsertUnits(stdNameId, req.units);
        upsertSpecs(stdNameId, req.specItems);
    }

    private void upsertUnits(Long stdNameId, List<UnitInput> inputUnits) {
        List<MaterialStdNameUnitDO> existing = stdNameUnitMapper.selectList(new LambdaQueryWrapper<MaterialStdNameUnitDO>()
                .eq(MaterialStdNameUnitDO::getStdNameId, stdNameId)
                .orderByAsc(MaterialStdNameUnitDO::getSortOrder, MaterialStdNameUnitDO::getId));
        Map<Long, MaterialStdNameUnitDO> existingByUnitId = existing.stream()
                .filter(item -> item.getUnitId() != null)
                .collect(Collectors.toMap(MaterialStdNameUnitDO::getUnitId, u -> u, (a, b) -> a));

        Set<Long> keepRelationIds = new LinkedHashSet<>();
        int sort = 1;
        for (UnitInput input : inputUnits) {
            MaterialStdNameUnitDO exists = existingByUnitId.get(input.unitId);
            if (exists != null) {
                MaterialStdNameUnitDO update = new MaterialStdNameUnitDO();
                update.setId(exists.getId());
                update.setUnitId(input.unitId);
                update.setUnitName(input.unitName);
                update.setSortOrder(sort++);
                update.setStatus("1");
                stdNameUnitMapper.updateById(update);
                keepRelationIds.add(exists.getId());
            } else {
                MaterialStdNameUnitDO insert = new MaterialStdNameUnitDO();
                insert.setStdNameId(stdNameId);
                insert.setUnitId(input.unitId);
                insert.setUnitName(input.unitName);
                insert.setSortOrder(sort++);
                insert.setStatus("1");
                stdNameUnitMapper.insert(insert);
                keepRelationIds.add(insert.getId());
            }
        }

        for (MaterialStdNameUnitDO item : existing) {
            if (!keepRelationIds.contains(item.getId())) {
                stdNameUnitMapper.deleteById(item.getId());
            }
        }
    }

    private void upsertSpecs(Long stdNameId, List<SpecItemInput> inputSpecs) {
        List<MaterialStdNameSpecDO> existingSpecs = stdNameSpecMapper.selectList(new LambdaQueryWrapper<MaterialStdNameSpecDO>()
                .eq(MaterialStdNameSpecDO::getStdNameId, stdNameId)
                .orderByAsc(MaterialStdNameSpecDO::getSortOrder, MaterialStdNameSpecDO::getId));
        Map<Long, MaterialStdNameSpecDO> existingSpecById = existingSpecs.stream()
                .collect(Collectors.toMap(MaterialStdNameSpecDO::getId, s -> s, (a, b) -> a));

        Set<Long> keptSpecIds = new LinkedHashSet<>();
        int specSort = 1;
        for (SpecItemInput input : inputSpecs) {
            Long specId;
            if (input.specId != null) {
                MaterialStdNameSpecDO exists = existingSpecById.get(input.specId);
                if (exists == null) {
                    throw new IllegalArgumentException("规格项不存在或不属于当前标准名称：" + input.specId);
                }
                MaterialStdNameSpecDO update = new MaterialStdNameSpecDO();
                update.setId(input.specId);
                update.setSpecKey(input.specKey);
                update.setSortOrder(specSort++);
                update.setStatus("1");
                if (!StringUtils.hasText(exists.getSpecKeyCode())) {
                    update.setSpecKeyCode(formatCode("A", input.specId, 4));
                }
                stdNameSpecMapper.updateById(update);
                specId = input.specId;
            } else {
                MaterialStdNameSpecDO insert = new MaterialStdNameSpecDO();
                insert.setStdNameId(stdNameId);
                insert.setSpecKey(input.specKey);
                insert.setSortOrder(specSort++);
                insert.setStatus("1");
                stdNameSpecMapper.insert(insert);
                assignSpecKeyCode(insert.getId());
                specId = insert.getId();
            }

            keptSpecIds.add(specId);
            upsertSpecValues(specId, input.values);
        }

        List<Long> toDeleteSpecIds = existingSpecs.stream()
                .map(MaterialStdNameSpecDO::getId)
                .filter(id -> !keptSpecIds.contains(id))
                .collect(Collectors.toList());
        if (!toDeleteSpecIds.isEmpty()) {
            stdNameSpecValueMapper.delete(new LambdaQueryWrapper<MaterialStdNameSpecValueDO>()
                    .in(MaterialStdNameSpecValueDO::getSpecId, toDeleteSpecIds));
            stdNameSpecMapper.deleteBatchIds(toDeleteSpecIds);
        }
    }

    private void upsertSpecValues(Long specId, List<SpecValueInput> inputValues) {
        List<MaterialStdNameSpecValueDO> existingValues = stdNameSpecValueMapper.selectList(new LambdaQueryWrapper<MaterialStdNameSpecValueDO>()
                .eq(MaterialStdNameSpecValueDO::getSpecId, specId)
                .orderByAsc(MaterialStdNameSpecValueDO::getSortOrder, MaterialStdNameSpecValueDO::getId));
        Map<Long, MaterialStdNameSpecValueDO> existingById = existingValues.stream()
                .collect(Collectors.toMap(MaterialStdNameSpecValueDO::getId, v -> v, (a, b) -> a));

        Set<Long> keptValueIds = new LinkedHashSet<>();
        int valueSort = 1;
        for (SpecValueInput input : inputValues) {
            if (input.specValueId != null) {
                MaterialStdNameSpecValueDO exists = existingById.get(input.specValueId);
                if (exists == null) {
                    throw new IllegalArgumentException("规格值不存在或不属于当前规格项：" + input.specValueId);
                }
                MaterialStdNameSpecValueDO update = new MaterialStdNameSpecValueDO();
                update.setId(input.specValueId);
                update.setSpecValue(input.specValue);
                update.setSortOrder(valueSort++);
                update.setStatus("1");
                if (!StringUtils.hasText(exists.getSpecValueCode())) {
                    update.setSpecValueCode(formatCode("V", input.specValueId, 6));
                }
                stdNameSpecValueMapper.updateById(update);
                keptValueIds.add(input.specValueId);
            } else {
                MaterialStdNameSpecValueDO insert = new MaterialStdNameSpecValueDO();
                insert.setSpecId(specId);
                insert.setSpecValue(input.specValue);
                insert.setSortOrder(valueSort++);
                insert.setStatus("1");
                stdNameSpecValueMapper.insert(insert);
                assignSpecValueCode(insert.getId());
                keptValueIds.add(insert.getId());
            }
        }

        for (MaterialStdNameSpecValueDO value : existingValues) {
            if (!keptValueIds.contains(value.getId())) {
                stdNameSpecValueMapper.deleteById(value.getId());
            }
        }
    }

    private void removeChildren(Long stdNameId) {
        List<MaterialStdNameSpecDO> specs = stdNameSpecMapper.selectList(new LambdaQueryWrapper<MaterialStdNameSpecDO>()
                .eq(MaterialStdNameSpecDO::getStdNameId, stdNameId));
        if (!CollectionUtils.isEmpty(specs)) {
            List<Long> specIds = specs.stream().map(MaterialStdNameSpecDO::getId).collect(Collectors.toList());
            stdNameSpecValueMapper.delete(new LambdaQueryWrapper<MaterialStdNameSpecValueDO>()
                    .in(MaterialStdNameSpecValueDO::getSpecId, specIds));
            stdNameSpecMapper.deleteBatchIds(specIds);
        }

        stdNameUnitMapper.delete(new LambdaQueryWrapper<MaterialStdNameUnitDO>()
                .eq(MaterialStdNameUnitDO::getStdNameId, stdNameId));
    }

    private void assignStdNameCode(Long id) {
        MaterialStdNameDO update = new MaterialStdNameDO();
        update.setId(id);
        update.setStdNameCode(formatCode("M", id, 6));
        stdNameMapper.updateById(update);
    }

    private void assignSpecValueCode(Long id) {
        MaterialStdNameSpecValueDO update = new MaterialStdNameSpecValueDO();
        update.setId(id);
        update.setSpecValueCode(formatCode("V", id, 6));
        stdNameSpecValueMapper.updateById(update);
    }

    private void assignSpecKeyCode(Long id) {
        MaterialStdNameSpecDO update = new MaterialStdNameSpecDO();
        update.setId(id);
        update.setSpecKeyCode(formatCode("A", id, 4));
        stdNameSpecMapper.updateById(update);
    }

    private String formatCode(String prefix, Long id, int padLen) {
        return prefix + String.format("%0" + padLen + "d", id);
    }

    private List<Long> resolveLevel2Ids(Long level1Id, Long level2Id) {
        if (level2Id != null) {
            MaterialCategoryDO selected = categoryMapper.selectById(level2Id);
            if (selected == null || !"1".equals(selected.getStatus()) || selected.getLevel() == null) {
                return Collections.emptyList();
            }

            // 选中二级时，同时包含其下三级；选中三级时，直接按三级过滤
            if (selected.getLevel() == 3) {
                return Collections.singletonList(level2Id);
            }
            if (selected.getLevel() == 2) {
                List<Long> ids = new ArrayList<>();
                ids.add(level2Id);
                List<MaterialCategoryDO> level3List = categoryMapper.selectList(new LambdaQueryWrapper<MaterialCategoryDO>()
                        .eq(MaterialCategoryDO::getParentId, level2Id)
                        .eq(MaterialCategoryDO::getLevel, 3)
                        .eq(MaterialCategoryDO::getStatus, "1"));
                ids.addAll(level3List.stream().map(MaterialCategoryDO::getId).collect(Collectors.toList()));
                return ids;
            }
            return Collections.emptyList();
        }
        if (level1Id == null) {
            return null;
        }

        List<MaterialCategoryDO> list = categoryMapper.selectList(new LambdaQueryWrapper<MaterialCategoryDO>()
                .eq(MaterialCategoryDO::getParentId, level1Id)
                .eq(MaterialCategoryDO::getLevel, 2)
                .eq(MaterialCategoryDO::getStatus, "1"));
        List<Long> ids = list.stream().map(MaterialCategoryDO::getId).collect(Collectors.toList());
        if (ids.isEmpty()) {
            return ids;
        }
        List<MaterialCategoryDO> level3List = categoryMapper.selectList(new LambdaQueryWrapper<MaterialCategoryDO>()
                .in(MaterialCategoryDO::getParentId, ids)
                .eq(MaterialCategoryDO::getLevel, 3)
                .eq(MaterialCategoryDO::getStatus, "1"));
        ids.addAll(level3List.stream().map(MaterialCategoryDO::getId).collect(Collectors.toList()));
        return ids;
    }

    private List<MaterialSpecModelVO> buildVoList(List<MaterialStdNameDO> mains, boolean includeSpecItems) {
        if (CollectionUtils.isEmpty(mains)) {
            return Collections.emptyList();
        }

        List<Long> mainIds = mains.stream().map(MaterialStdNameDO::getId).collect(Collectors.toList());
        List<Long> selectedCategoryIds = mains.stream().map(MaterialStdNameDO::getCategoryLevel2Id).filter(Objects::nonNull)
                .distinct().collect(Collectors.toList());

        List<MaterialStdNameUnitDO> stdUnits = stdNameUnitMapper.selectList(new LambdaQueryWrapper<MaterialStdNameUnitDO>()
                .in(MaterialStdNameUnitDO::getStdNameId, mainIds)
                .orderByAsc(MaterialStdNameUnitDO::getSortOrder, MaterialStdNameUnitDO::getId));

        List<Long> unitIds = stdUnits.stream().map(MaterialStdNameUnitDO::getUnitId).filter(Objects::nonNull)
                .distinct().collect(Collectors.toList());
        Map<Long, MaterialUnitDO> unitMapById = unitIds.isEmpty() ? Collections.emptyMap()
                : unitMapper.selectBatchIds(unitIds).stream()
                .collect(Collectors.toMap(MaterialUnitDO::getId, u -> u, (a, b) -> a));

        List<MaterialStdNameSpecDO> specs = stdNameSpecMapper.selectList(new LambdaQueryWrapper<MaterialStdNameSpecDO>()
                .in(MaterialStdNameSpecDO::getStdNameId, mainIds)
                .orderByAsc(MaterialStdNameSpecDO::getSortOrder, MaterialStdNameSpecDO::getId));

        List<Long> specIds = specs.stream().map(MaterialStdNameSpecDO::getId).collect(Collectors.toList());
        List<MaterialStdNameSpecValueDO> values = specIds.isEmpty() ? Collections.emptyList() : stdNameSpecValueMapper
                .selectList(new LambdaQueryWrapper<MaterialStdNameSpecValueDO>()
                        .in(MaterialStdNameSpecValueDO::getSpecId, specIds)
                        .orderByAsc(MaterialStdNameSpecValueDO::getSortOrder, MaterialStdNameSpecValueDO::getId));

        List<MaterialCategoryDO> selectedCategories = selectedCategoryIds.isEmpty() ? Collections.emptyList()
                : categoryMapper.selectBatchIds(selectedCategoryIds);
        Map<Long, MaterialCategoryDO> selectedCategoryMap = selectedCategories.stream()
                .collect(Collectors.toMap(MaterialCategoryDO::getId, c -> c, (a, b) -> a));

        List<Long> parentIds = selectedCategories.stream().map(MaterialCategoryDO::getParentId).distinct()
                .collect(Collectors.toList());
        List<MaterialCategoryDO> parentCategories = parentIds.isEmpty() ? Collections.emptyList()
                : categoryMapper.selectBatchIds(parentIds);
        Map<Long, MaterialCategoryDO> parentCategoryMap = parentCategories.stream()
                .collect(Collectors.toMap(MaterialCategoryDO::getId, c -> c, (a, b) -> a));

        Map<Long, List<MaterialStdNameUnitDO>> stdUnitGroup = stdUnits.stream()
                .collect(Collectors.groupingBy(MaterialStdNameUnitDO::getStdNameId));

        Map<Long, List<MaterialStdNameSpecDO>> specMap = specs.stream()
                .collect(Collectors.groupingBy(MaterialStdNameSpecDO::getStdNameId));

        Map<Long, List<MaterialStdNameSpecValueDO>> specValueMap = values.stream()
                .collect(Collectors.groupingBy(MaterialStdNameSpecValueDO::getSpecId));

        List<MaterialSpecModelVO> result = new ArrayList<>();
        for (MaterialStdNameDO main : mains) {
            MaterialSpecModelVO vo = new MaterialSpecModelVO();
            vo.setId(main.getId());
            vo.setStdNameCode(StringUtils.hasText(main.getStdNameCode()) ? main.getStdNameCode() : formatCode("M", main.getId(), 6));
            vo.setStandardName(main.getStandardName());
            vo.setCategoryLevel2Id(main.getCategoryLevel2Id());
            vo.setStatus(main.getStatus());
            vo.setCreateTime(main.getCreateTime());
            vo.setUpdateTime(main.getUpdateTime());

            List<MaterialSpecModelVO.UnitVO> unitItems = new ArrayList<>();
            List<String> unitNames = new ArrayList<>();
            for (MaterialStdNameUnitDO relation : stdUnitGroup.getOrDefault(main.getId(), Collections.emptyList())) {
                MaterialUnitDO unit = relation.getUnitId() == null ? null : unitMapById.get(relation.getUnitId());
                String unitName = unit != null ? unit.getUnitName() : relation.getUnitName();
                if (!StringUtils.hasText(unitName)) continue;

                MaterialSpecModelVO.UnitVO unitVO = new MaterialSpecModelVO.UnitVO();
                unitVO.setUnitId(relation.getUnitId());
                unitVO.setUnitBizId(unit == null ? null
                        : (StringUtils.hasText(unit.getUnitBizId()) ? unit.getUnitBizId() : formatCode("U", unit.getId(), 4)));
                unitVO.setUnitName(unitName);
                unitItems.add(unitVO);
                unitNames.add(unitName);
            }
            vo.setUnitItems(unitItems);
            vo.setUnits(unitNames);

            MaterialCategoryDO selectedCategory = selectedCategoryMap.get(main.getCategoryLevel2Id());
            if (selectedCategory != null) {
                vo.setCategoryLevel2Name(selectedCategory.getCategoryName());
                vo.setCategoryLevel2Code(selectedCategory.getCategoryCode());

                if (selectedCategory.getLevel() != null && selectedCategory.getLevel() == 3) {
                    MaterialCategoryDO level2 = parentCategoryMap.get(selectedCategory.getParentId());
                    if (level2 != null) {
                        vo.setCategoryLevel1Id(level2.getId());
                        vo.setCategoryLevel1Name(level2.getCategoryName());
                        vo.setCategoryLevel1Code(level2.getCategoryCode());
                    }
                } else {
                    vo.setCategoryLevel1Id(selectedCategory.getParentId());
                    MaterialCategoryDO level1 = parentCategoryMap.get(selectedCategory.getParentId());
                    if (level1 != null) {
                        vo.setCategoryLevel1Name(level1.getCategoryName());
                        vo.setCategoryLevel1Code(level1.getCategoryCode());
                    }
                }
            }

            List<MaterialStdNameSpecDO> specList = specMap.getOrDefault(main.getId(), Collections.emptyList());
            vo.setSpecSummary(buildSummary(specList, specValueMap));
            if (includeSpecItems) {
                List<MaterialSpecModelVO.SpecItemVO> itemVos = new ArrayList<>();
                for (MaterialStdNameSpecDO spec : specList) {
                    List<MaterialStdNameSpecValueDO> specValues = specValueMap.getOrDefault(spec.getId(), Collections.emptyList());

                    MaterialSpecModelVO.SpecItemVO itemVO = new MaterialSpecModelVO.SpecItemVO();
                    itemVO.setSpecId(spec.getId());
                    itemVO.setSpecKey(spec.getSpecKey());
                    itemVO.setSpecKeyCode(StringUtils.hasText(spec.getSpecKeyCode())
                            ? spec.getSpecKeyCode()
                            : formatCode("A", spec.getId(), 4));
                    itemVO.setSpecValues(specValues.stream().map(MaterialStdNameSpecValueDO::getSpecValue).collect(Collectors.toList()));

                    List<MaterialSpecModelVO.SpecValueVO> valueVos = new ArrayList<>();
                    for (MaterialStdNameSpecValueDO specValue : specValues) {
                        MaterialSpecModelVO.SpecValueVO valueVO = new MaterialSpecModelVO.SpecValueVO();
                        valueVO.setSpecValueId(specValue.getId());
                        valueVO.setSpecValueCode(StringUtils.hasText(specValue.getSpecValueCode())
                                ? specValue.getSpecValueCode()
                                : formatCode("V", specValue.getId(), 6));
                        valueVO.setSpecValue(specValue.getSpecValue());
                        valueVos.add(valueVO);
                    }
                    itemVO.setSpecValueItems(valueVos);
                    itemVos.add(itemVO);
                }
                vo.setSpecItems(itemVos);
            }

            result.add(vo);
        }
        return result;
    }

    private String buildSummary(List<MaterialStdNameSpecDO> specList, Map<Long, List<MaterialStdNameSpecValueDO>> specValueMap) {
        if (CollectionUtils.isEmpty(specList)) {
            return "";
        }
        List<String> lines = new ArrayList<>();
        for (MaterialStdNameSpecDO spec : specList) {
            List<String> values = specValueMap.getOrDefault(spec.getId(), Collections.emptyList()).stream()
                    .map(MaterialStdNameSpecValueDO::getSpecValue)
                    .collect(Collectors.toList());
            String joined = values.stream().limit(5).collect(Collectors.joining("、"));
            if (values.size() > 5) {
                joined = joined + " 等" + values.size() + "项";
            }
            lines.add(spec.getSpecKey() + "：" + joined);
        }
        return String.join("；", lines);
    }

    private static class NormalizedSpecModel {
        private String standardName;
        private List<UnitInput> units;
        private List<SpecItemInput> specItems;
    }

    private static class UnitInput {
        private final Long unitId;
        private final String unitName;

        private UnitInput(Long unitId, String unitName) {
            this.unitId = unitId;
            this.unitName = unitName;
        }
    }

    private static class SpecItemInput {
        private Long specId;
        private String specKey;
        private List<SpecValueInput> values;
    }

    private static class SpecValueInput {
        private Long specValueId;
        private String specValue;
    }
}
