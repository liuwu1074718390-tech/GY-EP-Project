package com.gz.biz.material.domain.req;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class MaterialSpecModelPageReq extends com.gz.biz.demo.domain.req.PageReq {
    private static final long serialVersionUID = 1L;

    private String standardName;

    private Long categoryLevel1Id;

    private Long categoryLevel2Id;

    private String status;
}
