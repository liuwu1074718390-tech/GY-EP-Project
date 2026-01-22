package com.gz.biz.demo.domain.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Demo VO对象
 * 
 * @author gz
 * @since 2025-04-17
 */
@Data
public class BizDemo2VO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * ID主键
     */
    private Long id;

    /**
     * 姓名
     */
    private String personName;

    /**
     * 年龄
     */
    private Long personAge;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 删除标志，0=存在；1=删除；
     */
    private String delFlag;

    /**
     * 创建人姓名
     */
    private String createName;

    /**
     * 创建人
     */
    private Long createBy;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新人姓名
     */
    private String updateName;

    /**
     * 更新人
     */
    private Long updateBy;

    /**
     * 更新时间
     */
    private Date updateTime;

}
