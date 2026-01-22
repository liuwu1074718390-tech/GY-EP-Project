package com.gz.biz.material.domain.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 材料计量单位实体 material_unit
 *
 * @author gz
 * @date 2026-01-22
 */
@Data
@TableName("material_unit")
public class MaterialUnitDO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 单位编码（2位，如01）
     */
    @TableField("unit_code")
    private String unitCode;

    /**
     * 单位名称（如t、kg）
     */
    @TableField("unit_name")
    private String unitName;

    /**
     * 单位符号
     */
    @TableField("unit_symbol")
    private String unitSymbol;

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
