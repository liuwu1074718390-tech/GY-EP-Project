package com.gz.biz.demo.domain.qo;

import lombok.Data;

import java.io.Serializable;

/**
 * 查询条件实体
 *
 * @author gz
 * @date 2024-05-06
 */
@Data
public class BizDemoQO implements Serializable {
    private static final long serialVersionUID=1L;

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

}