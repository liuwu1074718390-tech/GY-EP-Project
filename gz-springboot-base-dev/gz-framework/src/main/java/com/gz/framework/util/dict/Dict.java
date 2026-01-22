package com.gz.framework.util.dict;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.lang.annotation.*;

/**
 * 字典注解
 *
 * @author gz
 * @date 2024-08-15
 */
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside
@JsonSerialize(using = DictSerializer.class)
@Inherited
public @interface Dict {

    // 字典类型
    String dictType() default "";

    // 字典表名
    String dictTable() default "";

    // value字段
    String dictField() default "";

    String dictLabelSuffix() default "Label";

    // 字典显示字段
    String dictLabelField() default "";
}
