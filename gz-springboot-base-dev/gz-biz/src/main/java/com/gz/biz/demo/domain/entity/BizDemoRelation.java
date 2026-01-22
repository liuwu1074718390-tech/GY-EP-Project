package com.gz.biz.demo.domain.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.util.Date;

/**
 * Demo关联对象 biz_demo_relation
 *
 * @author gz
 * @date 2024-05-11
 */
@Data
@TableName("biz_demo_relation")
public class BizDemoRelation {
    private static final long serialVersionUID = 1L;

    /**
     * ID主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * demo表ID
     */
    @TableField("demo_id")
    private Long demoId;

    /**
     * 关联名称
     */
    @TableField("sub_name")
    private String subName;

    /**
     * 删除标志，0=存在；1=删除；
     */
    @TableField("del_flag")
    @TableLogic
    private String delFlag;

    /**
     * 创建人姓名
     */
    @TableField(value = "create_name", fill = FieldFill.INSERT)
    private String createName;

    /**
     * 创建人
     */
    @TableField(value = "create_by", fill = FieldFill.INSERT)
    private Long createBy;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 更新人姓名
     */
    @TableField(value = "update_name", fill = FieldFill.UPDATE)
    private String updateName;

    /**
     * 更新人
     */
    @TableField(value = "update_by", fill = FieldFill.UPDATE)
    private Long updateBy;

    /**
     * 更新时间
     */
    @TableField(value = "update_time", fill = FieldFill.UPDATE)
    private Date updateTime;

}