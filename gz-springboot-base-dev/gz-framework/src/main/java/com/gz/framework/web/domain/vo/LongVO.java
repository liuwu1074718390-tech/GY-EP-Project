package com.gz.framework.web.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * LongVO
 *
 * @author gz
 * @since 2024-10-12
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LongVO {
    private static final long serialVersionUID = 1L;

    /**
     * 结果整数值
     */
    private Long resultLong;

}