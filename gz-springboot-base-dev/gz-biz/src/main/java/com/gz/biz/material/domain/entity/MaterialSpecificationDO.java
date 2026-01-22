package com.gz.biz.material.domain.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 材料规格型号实体 material_specification
 *
 * @author gz
 * @date 2026-01-22
 */
@Data
@TableName("material_specification")
public class MaterialSpecificationDO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 规格编码（3位，如001）
     */
    @TableField("spec_code")
    private String specCode;

    /**
     * 规格名称（如φ6）
     */
    @TableField("spec_name")
    private String specName;

    /**
     * 规格描述
     */
    @TableField("description")
    private String description;

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
