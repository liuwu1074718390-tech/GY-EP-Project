package com.gz.biz.material.domain.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 材料分类树形VO
 *
 * @author gz
 * @date 2026-01-22
 */
@Data
public class MaterialCategoryTreeVO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    private Long id;

    /**
     * 分类编码（2位）
     */
    private String categoryCode;

    /**
     * 分类名称
     */
    private String categoryName;

    /**
     * 父级ID
     */
    private Long parentId;

    /**
     * 分类层级（1/2/3）
     */
    private Integer level;

    /**
     * 排序序号
     */
    private Integer sortOrder;

    /**
     * 状态（1正常 0停用）
     */
    private String status;

    /**
     * 子级分类列表
     */
    private List<MaterialCategoryTreeVO> children;
}
