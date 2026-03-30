package com.gz.biz.material.domain.req;

import com.gz.biz.demo.domain.req.PageReq;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class MaterialProcessSegmentPageReq extends PageReq {
    private static final long serialVersionUID = 1L;

    private String segmentName;

    private String status;
}
