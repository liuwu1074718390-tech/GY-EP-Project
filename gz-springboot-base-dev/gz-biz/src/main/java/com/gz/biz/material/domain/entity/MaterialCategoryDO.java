package com.gz.biz.material.domain.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 材料分类实体 material_category
 *
 * @author gz
 * @date 2026-01-22
 */
@Data
@TableName("material_category")
public class MaterialCategoryDO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 分类编码（2位，如01）
     */
    @TableField("category_code")
    private String categoryCode;

    /**
     * 分类名称
     */
    @TableField("category_name")
    private String categoryName;

    /**
     * 父级ID（0表示顶级）
     */
    @TableField("parent_id")
    private Long parentId;

    /**
     * 分类层级（1/2/3）
     */
    @TableField("level")
    private Integer level;

    /**
     * 排序序号
     */
    @TableField("sort_order")
    private Integer sortOrder;

    /**
     * 状态（1正常 0停用）
     */
    @TableField("status")
    private String status;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 更新时间
     */
    @TableField(value = "update_time", fill = FieldFill.UPDATE)
    private Date updateTime;
}
