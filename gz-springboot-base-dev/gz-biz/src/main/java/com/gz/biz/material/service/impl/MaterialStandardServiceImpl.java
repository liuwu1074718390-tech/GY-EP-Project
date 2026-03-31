package com.gz.biz.material.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.github.yulichang.base.MPJBaseServiceImpl;
import com.gz.biz.material.domain.entity.MaterialCategoryDO;
import com.gz.biz.material.domain.entity.MaterialProcessSegmentDO;
import com.gz.biz.material.domain.entity.MaterialSpecificationDO;
import com.gz.biz.material.domain.entity.MaterialStandardDO;
import com.gz.biz.material.domain.entity.MaterialUnitDO;
import com.gz.biz.material.domain.req.MaterialProcessSegmentPageReq;
import com.gz.biz.material.domain.req.MaterialProcessSegmentSaveReq;
import com.gz.biz.material.domain.req.MaterialStandardIdReq;
import com.gz.biz.material.domain.req.MaterialStandardPageReq;
import com.gz.biz.material.domain.req.MaterialStandardSaveReq;
import com.gz.biz.material.domain.req.MaterialUnitPageReq;
import com.gz.biz.material.domain.req.MaterialUnitSaveReq;
import com.gz.biz.material.domain.vo.MaterialCategoryTreeVO;
import com.gz.biz.material.domain.vo.MaterialStandardVO;
import com.gz.biz.material.mapper.MaterialCategoryMapper;
import com.gz.biz.material.mapper.MaterialProcessSegmentMapper;
import com.gz.biz.material.mapper.MaterialSpecificationMapper;
import com.gz.biz.material.mapper.MaterialStandardMapper;
import com.gz.biz.material.mapper.MaterialUnitMapper;
import com.gz.biz.material.service.IMaterialStandardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * 材料标准Service实现
 *
 * @author gz
 * @date 2026-01-22
 */
@Slf4j
@Service
public class MaterialStandardServiceImpl extends MPJBaseServiceImpl<MaterialStandardMapper, MaterialStandardDO>
        implements IMaterialStandardService {

    @Resource
    private MaterialCategoryMapper categoryMapper;

    @Resource
    private MaterialSpecificationMapper specificationMapper;

    @Resource
    private MaterialUnitMapper unitMapper;

    @Resource
    private MaterialStandardMapper materialStandardMapper;

    @Resource
    private MaterialProcessSegmentMapper processSegmentMapper;

    @Override
    public List<MaterialCategoryTreeVO> getCategoryTree() {
        // 查询所有分类
        List<MaterialCategoryDO> allCategories = categoryMapper.selectList(
                new LambdaQueryWrapper<MaterialCategoryDO>()
                        .eq(MaterialCategoryDO::getStatus, "1")
                        .orderByAsc(MaterialCategoryDO::getLevel, MaterialCategoryDO::getSortOrder));

        // 构建树形结构
        return buildCategoryTree(allCategories, 0L);
    }

    /**
     * 递归构建分类树
     */
    private List<MaterialCategoryTreeVO> buildCategoryTree(List<MaterialCategoryDO> allCategories, Long parentId) {
        List<MaterialCategoryTreeVO> tree = new ArrayList<>();

        for (MaterialCategoryDO category : allCategories) {
            if (category.getParentId().equals(parentId)) {
                MaterialCategoryTreeVO node = new MaterialCategoryTreeVO();
                BeanUtils.copyProperties(category, node);

                // 递归查找子节点
                List<MaterialCategoryTreeVO> children = buildCategoryTree(allCategories, category.getId());
                if (!children.isEmpty()) {
                    node.setChildren(children);
                }

                tree.add(node);
            }
        }

        return tree;
    }

    @Override
    public List<MaterialSpecificationDO> getSpecificationList() {
        return specificationMapper.selectList(
                new LambdaQueryWrapper<MaterialSpecificationDO>()
                        .eq(MaterialSpecificationDO::getStatus, "1")
                        .orderByAsc(MaterialSpecificationDO::getSpecCode));
    }

    @Override
    public List<MaterialUnitDO> getUnitList() {
        List<MaterialUnitDO> units = unitMapper.selectList(
                new LambdaQueryWrapper<MaterialUnitDO>()
                        .eq(MaterialUnitDO::getStatus, "1")
                        .orderByAsc(MaterialUnitDO::getUnitCode));
        units.forEach(this::fillUnitBizIdIfMissing);
        return units;
    }

    @Override
    public Page<MaterialUnitDO> pageUnit(MaterialUnitPageReq req) {
        Page<MaterialUnitDO> page = new Page<>(req.getPageNum(), req.getPageSize());
        String unitName = StringUtils.hasText(req.getUnitName()) ? req.getUnitName().trim() : null;
        LambdaQueryWrapper<MaterialUnitDO> wrapper = new LambdaQueryWrapper<MaterialUnitDO>()
                .like(StringUtils.hasText(unitName), MaterialUnitDO::getUnitName, unitName)
                .eq(StringUtils.hasText(req.getStatus()), MaterialUnitDO::getStatus, req.getStatus())
                .orderByAsc(MaterialUnitDO::getUnitCode);

        List<MaterialUnitDO> records = unitMapper.selectList(wrapper);
        int total = records.size();
        int fromIndex = (int) ((req.getPageNum() - 1) * req.getPageSize());
        int toIndex = Math.min(fromIndex + req.getPageSize(), total);

        if (fromIndex < total) {
            List<MaterialUnitDO> pageRecords = new ArrayList<>(records.subList(fromIndex, toIndex));
            pageRecords.forEach(this::fillUnitBizIdIfMissing);
            page.setRecords(pageRecords);
        } else {
            page.setRecords(Collections.emptyList());
        }
        page.setTotal(total);
        return page;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean saveUnit(MaterialUnitSaveReq req) {
        String unitName = req.getUnitName().trim();
        ensureUnitNameUnique(unitName, null);

        MaterialUnitDO unit = new MaterialUnitDO();
        unit.setUnitName(unitName);
        unit.setUnitSymbol(StringUtils.hasText(req.getUnitSymbol()) ? req.getUnitSymbol().trim() : null);
        unit.setStatus(StringUtils.hasText(req.getStatus()) ? req.getStatus() : "1");
        unit.setUnitCode(nextUnitCode());
        int inserted = unitMapper.insert(unit);
        if (inserted <= 0 || unit.getId() == null) {
            return false;
        }

        MaterialUnitDO updateBizId = new MaterialUnitDO();
        updateBizId.setId(unit.getId());
        updateBizId.setUnitBizId(formatBizCode("U", unit.getId(), 4));
        unitMapper.updateById(updateBizId);
        return true;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean updateUnit(MaterialUnitSaveReq req) {
        if (req.getId() == null) {
            throw new IllegalArgumentException("单位ID不能为空");
        }
        MaterialUnitDO exists = unitMapper.selectById(req.getId());
        if (exists == null) {
            throw new IllegalArgumentException("单位不存在");
        }
        String unitName = req.getUnitName().trim();
        ensureUnitNameUnique(unitName, req.getId());

        MaterialUnitDO unit = new MaterialUnitDO();
        unit.setId(req.getId());
        unit.setUnitName(unitName);
        unit.setUnitSymbol(StringUtils.hasText(req.getUnitSymbol()) ? req.getUnitSymbol().trim() : null);
        unit.setStatus(StringUtils.hasText(req.getStatus()) ? req.getStatus() : exists.getStatus());
        if (!StringUtils.hasText(exists.getUnitBizId())) {
            unit.setUnitBizId(formatBizCode("U", req.getId(), 4));
        }
        return unitMapper.updateById(unit) > 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteUnit(MaterialStandardIdReq req) {
        Long usedCount = materialStandardMapper.selectCount(new LambdaQueryWrapper<MaterialStandardDO>()
                .eq(MaterialStandardDO::getUnitId, req.getId()));
        if (usedCount != null && usedCount > 0) {
            throw new IllegalArgumentException("该单位已被材料标准引用，不能删除");
        }
        return unitMapper.deleteById(req.getId()) > 0;
    }

    @Override
    public Page<MaterialProcessSegmentDO> pageProcessSegment(MaterialProcessSegmentPageReq req) {
        Page<MaterialProcessSegmentDO> page = new Page<>(req.getPageNum(), req.getPageSize());
        String segmentName = StringUtils.hasText(req.getSegmentName()) ? req.getSegmentName().trim() : null;
        LambdaQueryWrapper<MaterialProcessSegmentDO> wrapper = new LambdaQueryWrapper<MaterialProcessSegmentDO>()
                .like(StringUtils.hasText(segmentName), MaterialProcessSegmentDO::getSegmentName, segmentName)
                .eq(StringUtils.hasText(req.getStatus()), MaterialProcessSegmentDO::getStatus, req.getStatus())
                .orderByAsc(MaterialProcessSegmentDO::getSegmentBizId);
        List<MaterialProcessSegmentDO> records = processSegmentMapper.selectList(wrapper);
        int total = records.size();
        int fromIndex = (int) ((req.getPageNum() - 1) * req.getPageSize());
        int toIndex = Math.min(fromIndex + req.getPageSize(), total);
        if (fromIndex < total) {
            page.setRecords(new ArrayList<>(records.subList(fromIndex, toIndex)));
        } else {
            page.setRecords(Collections.emptyList());
        }
        page.setTotal(total);
        return page;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean saveProcessSegment(MaterialProcessSegmentSaveReq req) {
        String segmentName = req.getSegmentName().trim();
        ensureProcessSegmentNameUnique(segmentName, null);
        MaterialProcessSegmentDO entity = new MaterialProcessSegmentDO();
        entity.setSegmentName(segmentName);
        entity.setStatus(StringUtils.hasText(req.getStatus()) ? req.getStatus() : "1");
        entity.setSegmentBizId(nextProcessSegmentBizId());
        return processSegmentMapper.insert(entity) > 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean updateProcessSegment(MaterialProcessSegmentSaveReq req) {
        if (req.getId() == null) {
            throw new IllegalArgumentException("工艺段ID不能为空");
        }
        MaterialProcessSegmentDO exists = processSegmentMapper.selectById(req.getId());
        if (exists == null) {
            throw new IllegalArgumentException("工艺段不存在");
        }
        String segmentName = req.getSegmentName().trim();
        ensureProcessSegmentNameUnique(segmentName, req.getId());
        MaterialProcessSegmentDO entity = new MaterialProcessSegmentDO();
        entity.setId(req.getId());
        entity.setSegmentName(segmentName);
        entity.setStatus(StringUtils.hasText(req.getStatus()) ? req.getStatus() : exists.getStatus());
        // 编辑时业务ID保持不变，仅在历史脏数据缺失时补齐
        if (!StringUtils.hasText(exists.getSegmentBizId())) {
            entity.setSegmentBizId(nextProcessSegmentBizId());
        }
        return processSegmentMapper.updateById(entity) > 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteProcessSegment(MaterialStandardIdReq req) {
        return processSegmentMapper.deleteById(req.getId()) > 0;
    }

    @Override
    public Page<MaterialStandardVO> pageMaterialStandard(MaterialStandardPageReq req) {
        Page<MaterialStandardVO> page = new Page<>(req.getPageNum(), req.getPageSize());

        // 构建查询条件
        MaterialStandardDO query = new MaterialStandardDO();
        query.setMaterialCode(req.getMaterialCode());
        query.setMaterialName(req.getMaterialName());
        query.setCategoryLevel1Id(req.getCategoryLevel1Id());
        query.setCategoryLevel2Id(req.getCategoryLevel2Id());
        query.setCategoryLevel3Id(req.getCategoryLevel3Id());
        query.setSpecId(req.getSpecId());
        query.setUnitId(req.getUnitId());
        query.setStatus(req.getStatus());

        // 查询列表（mapper中使用关联查询获取完整信息）
        List<MaterialStandardVO> records = materialStandardMapper.selectMaterialStandardList(query);

        // 手动分页
        int total = records.size();
        int fromIndex = (int) ((req.getPageNum() - 1) * req.getPageSize());
        int toIndex = Math.min(fromIndex + req.getPageSize(), total);

        if (fromIndex < total) {
            page.setRecords(records.subList(fromIndex, toIndex));
        } else {
            page.setRecords(new ArrayList<>());
        }
        page.setTotal(total);

        return page;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean saveMaterialStandard(MaterialStandardSaveReq req) {
        MaterialStandardDO entity = new MaterialStandardDO();
        BeanUtils.copyProperties(req, entity);

        // 查询分类、规格、单位信息以生成编码
        MaterialCategoryDO level1 = categoryMapper.selectById(req.getCategoryLevel1Id());
        MaterialCategoryDO level2 = categoryMapper.selectById(req.getCategoryLevel2Id());
        MaterialCategoryDO level3 = categoryMapper.selectById(req.getCategoryLevel3Id());
        MaterialSpecificationDO spec = specificationMapper.selectById(req.getSpecId());
        MaterialUnitDO unit = unitMapper.selectById(req.getUnitId());

        // 生成材料编码
        String materialCode = generateMaterialCode(level1, level2, level3, spec, unit);
        entity.setMaterialCode(materialCode);

        // 设置默认状态
        if (!StringUtils.hasText(entity.getStatus())) {
            entity.setStatus("1");
        }

        return this.save(entity);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean updateMaterialStandard(MaterialStandardSaveReq req) {
        MaterialStandardDO entity = new MaterialStandardDO();
        BeanUtils.copyProperties(req, entity);

        // 重新生成编码
        MaterialCategoryDO level1 = categoryMapper.selectById(req.getCategoryLevel1Id());
        MaterialCategoryDO level2 = categoryMapper.selectById(req.getCategoryLevel2Id());
        MaterialCategoryDO level3 = categoryMapper.selectById(req.getCategoryLevel3Id());
        MaterialSpecificationDO spec = specificationMapper.selectById(req.getSpecId());
        MaterialUnitDO unit = unitMapper.selectById(req.getUnitId());

        String materialCode = generateMaterialCode(level1, level2, level3, spec, unit);
        entity.setMaterialCode(materialCode);

        return this.updateById(entity);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean deleteMaterialStandard(MaterialStandardIdReq req) {
        // 逻辑删除
        return this.removeById(req.getId());
    }

    @Override
    public MaterialStandardVO getMaterialStandardById(MaterialStandardIdReq req) {
        MaterialStandardDO query = new MaterialStandardDO();
        query.setId(req.getId());

        List<MaterialStandardVO> list = materialStandardMapper.selectMaterialStandardList(query);
        return list.isEmpty() ? null : list.get(0);
    }

    private void ensureUnitNameUnique(String unitName, Long excludeId) {
        List<MaterialUnitDO> allUnits = unitMapper.selectList(new LambdaQueryWrapper<MaterialUnitDO>()
                .eq(MaterialUnitDO::getUnitName, unitName));
        boolean duplicate = allUnits.stream().anyMatch(item -> !Objects.equals(item.getId(), excludeId));
        if (duplicate) {
            throw new IllegalArgumentException("单位名称已存在");
        }
    }

    private void ensureProcessSegmentNameUnique(String segmentName, Long excludeId) {
        List<MaterialProcessSegmentDO> allSegments = processSegmentMapper.selectList(new LambdaQueryWrapper<MaterialProcessSegmentDO>()
                .eq(MaterialProcessSegmentDO::getSegmentName, segmentName));
        boolean duplicate = allSegments.stream().anyMatch(item -> !Objects.equals(item.getId(), excludeId));
        if (duplicate) {
            throw new IllegalArgumentException("工艺段名称已存在");
        }
    }

    private String nextUnitCode() {
        List<MaterialUnitDO> allUnits = unitMapper.selectList(new LambdaQueryWrapper<MaterialUnitDO>()
                .isNotNull(MaterialUnitDO::getUnitCode));
        int max = allUnits.stream()
                .map(MaterialUnitDO::getUnitCode)
                .filter(StringUtils::hasText)
                .map(String::trim)
                .filter(code -> code.matches("\\d+"))
                .mapToInt(Integer::parseInt)
                .max()
                .orElse(0);
        int next = max + 1;
        if (next > 99) {
            throw new IllegalArgumentException("单位编码已用尽，请先清理无效单位");
        }
        return String.format("%02d", next);
    }

    private String nextProcessSegmentBizId() {
        List<MaterialProcessSegmentDO> allSegments = processSegmentMapper.selectList(new LambdaQueryWrapper<MaterialProcessSegmentDO>()
                .isNotNull(MaterialProcessSegmentDO::getSegmentBizId));
        int max = allSegments.stream()
                .map(MaterialProcessSegmentDO::getSegmentBizId)
                .filter(StringUtils::hasText)
                .map(String::trim)
                .filter(code -> code.matches("P\\d{3}"))
                .mapToInt(code -> Integer.parseInt(code.substring(1)))
                .max()
                .orElse(0);
        int next = max + 1;
        if (next > 999) {
            throw new IllegalArgumentException("工艺段业务ID已用尽，请先清理无效数据");
        }
        return "P" + String.format("%03d", next);
    }

    private String formatBizCode(String prefix, Long id, int padLen) {
        return prefix + String.format("%0" + padLen + "d", id);
    }

    private void fillUnitBizIdIfMissing(MaterialUnitDO unit) {
        if (unit == null || unit.getId() == null || StringUtils.hasText(unit.getUnitBizId())) return;
        unit.setUnitBizId(formatBizCode("U", unit.getId(), 4));
    }

    @Override
    public String generateMaterialCode(MaterialCategoryDO level1, MaterialCategoryDO level2,
            MaterialCategoryDO level3, MaterialSpecificationDO specDO,
            MaterialUnitDO unitDO) {
        // 编码规则：一级(2位) + 二级(2位) + 三级(2位) + 规格(3位) + 单位(2位) = 11位
        StringBuilder code = new StringBuilder();

        code.append(level1.getCategoryCode()); // 2位
        code.append(level2.getCategoryCode()); // 2位
        code.append(level3.getCategoryCode()); // 2位
        code.append(specDO.getSpecCode()); // 3位
        code.append(unitDO.getUnitCode()); // 2位

        return code.toString();
    }
}
