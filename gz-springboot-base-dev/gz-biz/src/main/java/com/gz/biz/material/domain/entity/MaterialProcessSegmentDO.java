package com.gz.biz.material.domain.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 标准工艺段实体 material_process_segment
 *
 * @author gz
 * @date 2026-03-30
 */
@Data
@TableName("material_process_segment")
public class MaterialProcessSegmentDO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 工艺段业务ID（如P001）
     */
    @TableField("segment_biz_id")
    private String segmentBizId;

    /**
     * 工艺段名称
     */
    @TableField("segment_name")
    private String segmentName;

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
