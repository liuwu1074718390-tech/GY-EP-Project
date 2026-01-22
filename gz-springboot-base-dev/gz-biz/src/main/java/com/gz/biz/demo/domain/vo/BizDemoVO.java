package com.gz.biz.demo.domain.vo;

import com.gz.framework.util.dict.Dict;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * Demo对象 biz_demo
 *
 * @author gz
 * @date 2024-05-06
 */
@Data
public class BizDemoVO implements Serializable {
    private static final long serialVersionUID=1L;

    /**
     * ID
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
    @Dict(dictType = "del_flag")
    private String delFlag;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 关联名称
     */
    private String subName;

}