package com.gz.common.annotation;

import java.lang.annotation.*;

/**
 * 接口返回结果会统一包装为AjaxResult，使用该注解则不会包装
 *
 * @author damin
 * @date 2024-03-21
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface IgnoreResultHandler {
}
