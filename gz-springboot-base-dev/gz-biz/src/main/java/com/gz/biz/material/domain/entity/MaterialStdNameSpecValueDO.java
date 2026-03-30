package com.gz.biz.material.domain.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("material_std_name_spec_value")
public class MaterialStdNameSpecValueDO implements Serializable {
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("spec_id")
    private Long specId;

    @TableField("spec_value")
    private String specValue;

    @TableField("spec_value_code")
    private String specValueCode;

    @TableField("sort_order")
    private Integer sortOrder;

    @TableField("status")
    private String status;

    @TableField("del_flag")
    @TableLogic
    private String delFlag;

    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(value = "update_time", fill = FieldFill.UPDATE)
    private Date updateTime;
}
