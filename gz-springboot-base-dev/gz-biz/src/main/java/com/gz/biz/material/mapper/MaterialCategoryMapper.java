package com.gz.biz.material.mapper;

import com.github.yulichang.base.MPJBaseMapper;
import com.gz.biz.material.domain.entity.MaterialCategoryDO;

import java.util.List;

/**
 * 材料分类Mapper接口
 *
 * @author gz
 * @date 2026-01-22
 */
public interface MaterialCategoryMapper extends MPJBaseMapper<MaterialCategoryDO> {

    /**
     * 查询所有分类列表
     *
     * @return 分类列表
     */
    List<MaterialCategoryDO> selectAllCategories();

    /**
     * 根据父级ID查询子分类
     *
     * @param parentId 父级ID
     * @return 子分类列表
     */
    List<MaterialCategoryDO> selectByParentId(Long parentId);
}
