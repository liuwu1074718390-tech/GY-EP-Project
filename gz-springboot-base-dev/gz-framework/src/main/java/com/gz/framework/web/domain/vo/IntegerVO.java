package com.gz.framework.web.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * IntegerVO
 *
 * @author gz
 * @since 2024-10-12
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class IntegerVO {
    private static final long serialVersionUID = 1L;

    /**
     * 结果整数值
     */
    private Integer resultInt;

}