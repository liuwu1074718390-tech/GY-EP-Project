package com.gz.framework.web.domain.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * MapVO
 *
 * @author gz
 * @since 2024-10-12
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MapVO {
    private static final long serialVersionUID = 1L;

    /**
     * 结果map
     */
    private Map<String, String> resultMap;

}