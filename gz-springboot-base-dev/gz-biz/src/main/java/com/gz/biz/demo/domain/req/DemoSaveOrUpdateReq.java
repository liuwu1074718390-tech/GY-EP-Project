package com.gz.biz.demo.domain.req;

import lombok.Data;

/**
 * Demo对象 biz_demo
 *
 * @author gz
 * @date 2024-04-29
 */
@Data
public class DemoSaveOrUpdateReq {
    private static final long serialVersionUID = 1L;

    /**
     * 姓名最新数据
     */
    private String name;

    /**
     * 年龄最新数据
     */
    private Long age;

    /**
     * 邮箱最新数据
     */
    private String email;

    /**
     * 邮箱查询参数
     */
    private String emailSearch;

}
