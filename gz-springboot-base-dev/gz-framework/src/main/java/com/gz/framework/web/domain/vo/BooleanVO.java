package com.gz.framework.web.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * BooleanVO
 *
 * @author gz
 * @since 2024-10-12
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BooleanVO {
    private static final long serialVersionUID = 1L;

    /**
     * 结果标识，true-成功/是，false-失败/否
     */
    private Boolean resultBool;

}