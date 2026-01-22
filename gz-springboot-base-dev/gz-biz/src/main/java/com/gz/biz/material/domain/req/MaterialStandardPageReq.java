package com.gz.biz.material.domain.req;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 材料标准分页查询请求
 *
 * @author gz
 * @date 2026-01-22
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class MaterialStandardPageReq extends com.gz.biz.demo.domain.req.PageReq {
    private static final long serialVersionUID = 1L;

    /**
     * 材料编码
     */
    private String materialCode;

    /**
     * 材料名称
     */
    private String materialName;

    /**
     * 一级分类ID
     */
    private Long categoryLevel1Id;

    /**
     * 二级分类ID
     */
    private Long categoryLevel2Id;

    /**
     * 三级分类ID
     */
    private Long categoryLevel3Id;

    /**
     * 规格ID
     */
    private Long specId;

    /**
     * 单位ID
     */
    private Long unitId;

    /**
     * 状态（1正常 0停用）
     */
    private String status;
}
