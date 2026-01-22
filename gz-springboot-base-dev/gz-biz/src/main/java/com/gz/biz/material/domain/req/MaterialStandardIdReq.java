package com.gz.biz.material.domain.req;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * ID请求对象
 *
 * @author gz
 * @date 2026-01-22
 */
@Data
public class MaterialStandardIdReq implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @NotNull(message = "ID不能为空")
    private Long id;
}
