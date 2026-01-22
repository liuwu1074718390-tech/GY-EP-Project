package com.gz.biz.material.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.github.yulichang.base.MPJBaseServiceImpl;
import com.gz.biz.material.domain.entity.MaterialCategoryDO;
import com.gz.biz.material.domain.entity.MaterialSpecificationDO;
import com.gz.biz.material.domain.entity.MaterialStandardDO;
import com.gz.biz.material.domain.entity.MaterialUnitDO;
import com.gz.biz.material.domain.req.MaterialStandardIdReq;
import com.gz.biz.material.domain.req.MaterialStandardPageReq;
import com.gz.biz.material.domain.req.MaterialStandardSaveReq;
import com.gz.biz.material.domain.vo.MaterialCategoryTreeVO;
import com.gz.biz.material.domain.vo.MaterialStandardVO;
import com.gz.biz.material.mapper.MaterialCategoryMapper;
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
import java.util.List;

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
        return unitMapper.selectList(
                new LambdaQueryWrapper<MaterialUnitDO>()
                        .eq(MaterialUnitDO::getStatus, "1")
                        .orderByAsc(MaterialUnitDO::getUnitCode));
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
