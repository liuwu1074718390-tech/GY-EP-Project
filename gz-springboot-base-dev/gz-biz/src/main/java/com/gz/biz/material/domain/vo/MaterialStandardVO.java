package com.gz.biz.material.domain.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 材料标准VO
 *
 * @author gz
 * @date 2026-01-22
 */
@Data
public class MaterialStandardVO implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    private Long id;

    /**
     * 材料编码（11位）
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
     * 一级分类名称
     */
    private String categoryLevel1Name;

    /**
     * 一级分类编码
     */
    private String categoryLevel1Code;

    /**
     * 二级分类ID
     */
    private Long categoryLevel2Id;

    /**
     * 二级分类名称
     */
    private String categoryLevel2Name;

    /**
     * 二级分类编码
     */
    private String categoryLevel2Code;

    /**
     * 三级分类ID
     */
    private Long categoryLevel3Id;

    /**
     * 三级分类名称
     */
    private String categoryLevel3Name;

    /**
     * 三级分类编码
     */
    private String categoryLevel3Code;

    /**
     * 规格ID
     */
    private Long specId;

    /**
     * 规格名称
     */
    private String specName;

    /**
     * 规格编码
     */
    private String specCode;

    /**
     * 单位ID
     */
    private Long unitId;

    /**
     * 单位名称
     */
    private String unitName;

    /**
     * 单位编码
     */
    private String unitCode;

    /**
     * 备注
     */
    private String remark;

    /**
     * 状态（1正常 0停用）
     */
    private String status;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;
}
