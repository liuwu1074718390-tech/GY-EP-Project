package com.gz.biz.demo.domain.req;

import lombok.Data;

/**
 * DemoPageReq
 *
 * @author gz
 * @date 2024-04-29
 */
@Data
public class DemoPageReq extends PageReq {
    private static final long serialVersionUID = 1L;

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
