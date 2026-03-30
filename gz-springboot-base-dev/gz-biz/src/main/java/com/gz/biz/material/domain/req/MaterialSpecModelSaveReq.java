package com.gz.biz.material.domain.req;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Data
public class MaterialSpecModelSaveReq implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(message = "标准材料名称不能为空")
    private String standardName;

    @NotNull(message = "二级分类不能为空")
    private Long categoryLevel2Id;

    private String stdNameCode;

    private String status;

    /**
     * 兼容旧入参（单位名称）
     */
    private List<String> units;

    @Valid
    private List<UnitReq> unitItems;

    @Valid
    @NotEmpty(message = "规格项不能为空")
    private List<SpecItemReq> specItems;

    @Data
    public static class UnitReq implements Serializable {
        private static final long serialVersionUID = 1L;

        private Long unitId;

        private String unitName;
    }

    @Data
    public static class SpecItemReq implements Serializable {
        private static final long serialVersionUID = 1L;

        private Long specId;

        @NotBlank(message = "规格名称不能为空")
        private String specKey;

        /**
        * 兼容旧入参（规格值文本）
        */
        private List<String> specValues;

        @Valid
        private List<SpecValueReq> specValueItems;
    }

    @Data
    public static class SpecValueReq implements Serializable {
        private static final long serialVersionUID = 1L;

        private Long specValueId;

        private String specValue;
    }
}
