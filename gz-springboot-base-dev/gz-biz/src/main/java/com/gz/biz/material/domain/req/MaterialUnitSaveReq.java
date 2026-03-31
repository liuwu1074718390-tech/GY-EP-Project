package com.gz.biz.material.domain.req;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class MaterialUnitSaveReq implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(message = "单位名称不能为空")
    private String unitName;

    private String unitSymbol;

    private String status;
}
