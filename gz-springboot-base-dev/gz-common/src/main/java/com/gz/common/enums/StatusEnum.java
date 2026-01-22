package com.gz.common.enums;

import com.gz.common.exception.BizException;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

/**
 * 通用0/1枚举
 * 0-否/未删除/成功/正常/启用/有效，1-是/已删除/失败/异常/禁用/无效
 *
 * @author gz
 */
@Slf4j
public enum StatusEnum {
    _0("0", "否/未删除/成功/正常/启用/有效"),
    _1("1", "是/已删除/失败/异常/禁用/无效");

    private final String code;
    private final String info;

    private static final Map<String, StatusEnum> enumMap = new HashMap<>();

    static {
        for (StatusEnum objEnum : values()) {
            enumMap.put(objEnum.getCode(), objEnum);
        }
    }

    StatusEnum(String code, String info) {
        this.code = code;
        this.info = info;
    }

    public String getCode() {
        return code;
    }

    public String getInfo() {
        return info;
    }

    /**
     * 根据枚举的code获取枚举对象
     *
     * @param code
     * @return
     */
    public static StatusEnum get(String code) {
        if (code == null) {
            throw new BizException("枚举code不能为空");
        }
        if (!enumMap.containsKey(code)) {
            throw new BizException("枚举code不存在");
        }

        return enumMap.get(code);
    }

    /**
     * 根据枚举的code获取描述信息
     *
     * @param code
     * @return
     */
    public static String getDesc(String code) {
        StatusEnum objEnum = get(code);
        return objEnum.getInfo();
    }

    /**
     * 获取int类型code值
     *
     * @return
     */
    public Integer getIntCode() {
        try {
            Integer intCode = Integer.valueOf(code);
            return intCode;
        } catch (Exception e) {
            throw new BizException("枚举code转换int失败");
        }
    }
}
