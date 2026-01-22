package com.gz.framework.advice;

import com.gz.common.annotation.IgnoreResultHandler;
import com.gz.common.exception.BizException;
import com.gz.common.model.AjaxResult;
import com.gz.framework.domain.page.TableDataInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;

/**
 * 使接口统一返回 AjaxResult
 *
 * @author damin
 * @date 2024-03-21
 */
@Slf4j
@ControllerAdvice(annotations = RestController.class)
@Order(2)
public class ResultHandlerAdvice implements ResponseBodyAdvice<Object> {

    /**
     * 这个方法表示对于哪些请求要执行beforeBodyWrite，返回true执行，返回false不执行
     */
    @Override
    public boolean supports(MethodParameter methodParameter, Class aClass) {
        Method method = methodParameter.getMethod();
        if (method == null) {
            return true;
        }
        // 如果返回类型是TableDataInfo，则不进行包装
        if (TableDataInfo.class.equals(method.getReturnType())) {
            return false;
        }
        // 如果返回类型是AjaxResult，则不进行包装
        if (AjaxResult.class.equals(method.getReturnType())) {
            return false;
        }
        // 如果方法上加了IgnoreResultHandler注解，则不进行包装
        if (method.getAnnotation(IgnoreResultHandler.class) != null) {
            return false;
        }

        return true;
    }

    /**
     * 接口返回结果统一包装为AjaxResult
     */
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter methodParameter, MediaType mediaType,
                                  Class aClass, ServerHttpRequest request, ServerHttpResponse response) {
        validateReturnType(methodParameter, request);
        return AjaxResult.success(body);
    }

    /**
     * 校验返回类型是否为基础类型，不是则抛出异常
     * PS：不允许返回基础类型，否则ApiFox工具生成文档没字段注释，建议使用自定义的VO类型
     *
     * @param methodParameter
     * @param request
     */
    private void validateReturnType(MethodParameter methodParameter, ServerHttpRequest request) {
        Method method = methodParameter.getMethod();
        Class<?> returnType = method.getReturnType();
        String path = request.getURI().getPath();

        if (method != null) {
            if (returnType.isPrimitive() ||
                    Number.class.isAssignableFrom(returnType) ||
                    Character.class.isAssignableFrom(returnType) ||
                    Boolean.class.isAssignableFrom(returnType)) {
                // 接口返回 String 类型
                if (String.class.equals(returnType)) {
                    throw new BizException("请求接口" + path + "返回类型为String，请使用StringVO包装");
                }
                // 接口返回 Boolean 类型
                else if (Boolean.class.equals(returnType) || boolean.class.equals(returnType)) {
                    throw new BizException("请求接口" + path + "返回类型为Boolean，请使用BooleanVO包装");
                }
                // 接口返回 Integer 类型
                else if (Integer.class.equals(returnType) || int.class.equals(returnType)) {
                    throw new BizException("请求接口" + path + "返回类型为Integer，请使用IntegerVO包装");
                }
                // 接口返回 Long 类型
                else if (Long.class.equals(returnType) || long.class.equals(returnType)) {
                    throw new BizException("请求接口" + path + "返回类型为Long，请使用LongVO包装");
                }
                // 接口返回 Double 类型
                else if (Double.class.equals(returnType) || double.class.equals(returnType)) {
                    throw new BizException("请求接口" + path + "返回类型为Double，请使用DoubleVO包装");
                }
                // 接口返回 Float 类型
                else if (Float.class.equals(returnType) || float.class.equals(returnType)) {
                    throw new BizException("请求接口" + path + "返回类型为Float，请使用FloatVO包装");
                }
                // 其他基础类型，包括：void
                else {
//                    log.info("请求接口{}返回类型为: {}", path, returnType);
                }
            }
            // 接口返回 java.util.Map 类型
            else if (java.util.Map.class.equals(returnType)) {
                throw new BizException("请求接口" + path + "返回类型为Map，请使用MapVO包装");
            }
            // 接口返回 java.util.Collection 类型
            else if (Collection.class.isAssignableFrom(returnType)) {
                Type genericReturnType = method.getGenericReturnType();
                if (genericReturnType instanceof ParameterizedType) {
                    ParameterizedType parameterizedType = (ParameterizedType) genericReturnType;
                    Type[] actualTypeArguments = parameterizedType.getActualTypeArguments();

                    for (Type type : actualTypeArguments) {
                        if (isPrimitiveOrWrapper(type)) {
                            throw new BizException("请求接口" + path + "返回类型为Collection，泛型为基础类型或其包装类，请使用实体VO类作为泛型");
                        }
                    }
                } else {
                    throw new BizException("请求接口" + path + "返回类型不是参数化类型，不允许在接口中使用");
                }
            }
            // 其他类型，包括：xxxVO、...
            else {
//                log.info("其他类型: {}", returnType);
            }

        }
    }

    /**
     * 判断类型是否为基础类型或其包装类
     *
     * @param type
     * @return
     */
    private static boolean isPrimitiveOrWrapper(Type type) {
        if (type instanceof Class<?>) {
            Class<?> clazz = (Class<?>) type;
            return clazz.isPrimitive() ||
                    Number.class.isAssignableFrom(clazz) ||
                    Character.class.isAssignableFrom(clazz) ||
                    Boolean.class.isAssignableFrom(clazz) ||
                    String.class.isAssignableFrom(clazz);
        }
        return false;
    }

}


