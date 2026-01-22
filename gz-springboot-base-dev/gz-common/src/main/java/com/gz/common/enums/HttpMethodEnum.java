package com.gz.common.enums;

import java.util.HashMap;
import java.util.Map;

/**
 * 请求方式
 *
 * @author gz
 */
public enum HttpMethodEnum {
    GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS, TRACE;

    private static final Map<String, HttpMethodEnum> mappings = new HashMap<>(16);

    static {
        for (HttpMethodEnum httpMethodEnum : values()) {
            mappings.put(httpMethodEnum.name(), httpMethodEnum);
        }
    }

    public static HttpMethodEnum resolve(String method) {
        return (method != null ? mappings.get(method) : null);
    }

    public boolean matches(String method) {
        return (this == resolve(method));
    }
}
