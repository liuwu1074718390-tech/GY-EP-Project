package com.gz.biz.material.domain.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class MaterialSpecModelVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String standardName;

    private String stdNameCode;

    private Long categoryLevel1Id;

    private String categoryLevel1Name;

    private String categoryLevel1Code;

    private Long categoryLevel2Id;

    private String categoryLevel2Name;

    private String categoryLevel2Code;

    private List<String> units;

    private List<UnitVO> unitItems;

    private List<SpecItemVO> specItems;

    private String specSummary;

    private String status;

    private Date createTime;

    private Date updateTime;

    @Data
    public static class SpecItemVO implements Serializable {
        private static final long serialVersionUID = 1L;

        private Long specId;

        private String specKey;

        private String specKeyCode;

        private List<String> specValues;

        private List<SpecValueVO> specValueItems;
    }

    @Data
    public static class UnitVO implements Serializable {
        private static final long serialVersionUID = 1L;

        private Long unitId;

        private String unitBizId;

        private String unitName;
    }

    @Data
    public static class SpecValueVO implements Serializable {
        private static final long serialVersionUID = 1L;

        private Long specValueId;

        private String specValueCode;

        private String specValue;
    }
}
