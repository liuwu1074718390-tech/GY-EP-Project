package com.gz.biz.material.domain.req;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * 材料标准保存请求
 *
 * @author gz
 * @date 2026-01-22
 */
@Data
public class MaterialStandardSaveReq implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID（更新时必填）
     */
    private Long id;

    /**
     * 材料名称
     */
    @NotBlank(message = "材料名称不能为空")
    private String materialName;

    /**
     * 一级分类ID
     */
    @NotNull(message = "一级分类不能为空")
    private Long categoryLevel1Id;

    /**
     * 二级分类ID
     */
    @NotNull(message = "二级分类不能为空")
    private Long categoryLevel2Id;

    /**
     * 三级分类ID
     */
    @NotNull(message = "三级分类不能为空")
    private Long categoryLevel3Id;

    /**
     * 规格ID
     */
    @NotNull(message = "规格型号不能为空")
    private Long specId;

    /**
     * 单位ID
     */
    @NotNull(message = "计量单位不能为空")
    private Long unitId;

    /**
     * 备注
     */
    private String remark;

    /**
     * 状态（1正常 0停用）
     */
    private String status;
}
