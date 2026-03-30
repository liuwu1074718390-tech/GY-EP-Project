package com.gz.biz.material.domain.req;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class MaterialProcessSegmentSaveReq implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(message = "工艺段名称不能为空")
    private String segmentName;

    private String status;
}
