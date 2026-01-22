package com.gz.biz.demo.domain.req;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * @Author damin
 * @Date 2024-05-08
 **/
@Data
public class PageReq {

    /**
     * 第几页，从第1页开始
     */
    @NotNull(message = "pageNum不能为空")
    private Integer pageNum;

    /**
     * 每页的数量
     */
    @NotNull(message = "pageSize")
    private Integer pageSize;

}
