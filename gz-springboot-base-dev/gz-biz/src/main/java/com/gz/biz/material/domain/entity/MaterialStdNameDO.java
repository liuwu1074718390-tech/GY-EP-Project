package com.gz.biz.material.domain.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("material_std_name")
public class MaterialStdNameDO implements Serializable {
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("standard_name")
    private String standardName;

    @TableField("std_name_code")
    private String stdNameCode;

    @TableField("category_level2_id")
    private Long categoryLevel2Id;

    @TableField("status")
    private String status;

    @TableField("del_flag")
    @TableLogic
    private String delFlag;

    @TableField(value = "create_by", fill = FieldFill.INSERT)
    private Long createBy;

    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    @TableField(value = "update_by", fill = FieldFill.UPDATE)
    private Long updateBy;

    @TableField(value = "update_time", fill = FieldFill.UPDATE)
    private Date updateTime;
}
