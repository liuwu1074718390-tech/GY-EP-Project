package com.gz.framework.web.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * FloatVO
 *
 * @author gz
 * @since 2024-10-12
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FloatVO {
    private static final long serialVersionUID = 1L;

    /**
     * 结果小数值
     */
    private Float resultFloat;

}