package com.gz.biz.material.domain.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 材料标准实体 material_standard
 *
 * @author gz
 * @date 2026-01-22
 */
@Data
@TableName("material_standard")
public class MaterialStandardDO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 材料编码（11位，如01010100101）
     */
    @TableField("material_code")
    private String materialCode;

    /**
     * 材料名称
     */
    @TableField("material_name")
    private String materialName;

    /**
     * 一级分类ID
     */
    @TableField("category_level1_id")
    private Long categoryLevel1Id;

    /**
     * 二级分类ID
     */
    @TableField("category_level2_id")
    private Long categoryLevel2Id;

    /**
     * 三级分类ID
     */
    @TableField("category_level3_id")
    private Long categoryLevel3Id;

    /**
     * 规格ID
     */
    @TableField("spec_id")
    private Long specId;

    /**
     * 单位ID
     */
    @TableField("unit_id")
    private Long unitId;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;

    /**
     * 状态（1正常 0停用）
     */
    @TableField("status")
    private String status;

    /**
     * 删除标识（0正常 1删除）
     */
    @TableField("del_flag")
    @TableLogic
    private String delFlag;

    /**
     * 创建者
     */
    @TableField(value = "create_by", fill = FieldFill.INSERT)
    private String createBy;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 更新者
     */
    @TableField(value = "update_by", fill = FieldFill.UPDATE)
    private String updateBy;

    /**
     * 更新时间
     */
    @TableField(value = "update_time", fill = FieldFill.UPDATE)
    private Date updateTime;
}
