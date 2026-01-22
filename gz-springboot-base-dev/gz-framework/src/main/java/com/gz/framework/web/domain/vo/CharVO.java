package com.gz.framework.web.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * CharVO
 *
 * @author gz
 * @since 2024-10-12
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CharVO {
    private static final long serialVersionUID = 1L;

    /**
     * 结果字符串
     */
    private Character resultChar;

}