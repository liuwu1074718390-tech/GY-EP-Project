package com.gz.biz.demo.domain.req;

import lombok.Data;

/**
 * Demo对象 biz_demo
 *
 * @author gz
 * @date 2024-04-29
 */
@Data
public class DemoReq {
    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    private Long id;

    /**
     * 姓名
     */
    private String name;

    /**
     * 年龄
     */
    private Long age;

    /**
     * 邮箱
     */
    private String email;

}
