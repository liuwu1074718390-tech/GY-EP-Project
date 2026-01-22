package com.gz.framework.exception;

import cn.hutool.core.util.StrUtil;
import com.gz.common.constant.HttpStatusConstant;
import com.gz.common.model.AjaxResult;
import com.gz.common.exception.BizException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.servlet.http.HttpServletRequest;

/**
 * 全局异常处理器
 *
 * @author gz
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 请求路径中缺少必需的路径变量-400
     */
    @ExceptionHandler(MissingPathVariableException.class)
    public AjaxResult handleMissingPathVariableException(MissingPathVariableException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求路径中缺少必需的路径变量'{}',发生系统异常.", requestURI, e);
        return AjaxResult.error(HttpStatusConstant.BAD_REQUEST, String.format("请求路径中缺少必需的路径变量[%s]", e.getVariableName()));
    }

    /**
     * 请求参数类型不匹配-400
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public AjaxResult handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求参数类型不匹配'{}',发生系统异常.", requestURI, e);
        return AjaxResult.error(HttpStatusConstant.BAD_REQUEST, String.format("请求参数类型不匹配，参数[%s]要求类型为：'%s'，但输入值为：'%s'", e.getName(), e.getRequiredType().getName(), e.getValue()));
    }

    /**
     * 权限校验异常-403
     */
    @ExceptionHandler(AccessDeniedException.class)
    public AjaxResult handleAccessDeniedException(AccessDeniedException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',权限校验失败'{}'", requestURI, e.getMessage());
        return AjaxResult.error(HttpStatusConstant.FORBIDDEN, "没有权限，请联系管理员授权");
    }

    /**
     * 请求方式不支持-405
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public AjaxResult handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException e,
                                                          HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        String msg = StrUtil.format("请求方式'{}' 不支持, '{}'", requestURI, e.getMethod());
        log.error(msg, e);
        return AjaxResult.error(HttpStatusConstant.METHOD_NOT_ALLOWED, msg);
    }

    /**
     * 系统异常-500
     */
    @ExceptionHandler(Exception.class)
    public AjaxResult handleException(Exception e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        String msg = StrUtil.format("请求地址'{}', 发生系统异常", requestURI);
        log.error(msg, e);
        return AjaxResult.error(msg);
    }

    /**
     * 业务异常-600
     */
    @ExceptionHandler(BizException.class)
    public AjaxResult handleServiceException(BizException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        String msg = StrUtil.format("请求地址'{}', 发生业务异常: {}", requestURI, e.getMessage());
        log.error(msg, e);
        Integer code = e.getCode();
        return code != null ? AjaxResult.error(code, e.getMessage()) : AjaxResult.error(e.getMessage());
    }

    /**
     * 自定义验证异常-602
     */
    @ExceptionHandler(BindException.class)
    public AjaxResult handleBindException(BindException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        String msg = StrUtil.format("请求地址'{}', 自定义验证异常", requestURI);
        log.error(msg, e);
        return AjaxResult.error(HttpStatusConstant.ILLEGAL_ARGUMENT_EXCEPTION, msg);
    }

    /**
     * 自定义验证异常-602
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Object handleMethodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        String msg = StrUtil.format("请求地址'{}', 参数验证异常", requestURI);
        log.error(msg, e);
        String tipMessage = e.getBindingResult().getFieldError().getDefaultMessage();
        return AjaxResult.error(HttpStatusConstant.ILLEGAL_ARGUMENT_EXCEPTION, tipMessage);
    }

    /**
     * 非法参数验证异常-602
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public AjaxResult handleIllegalArgumentException(IllegalArgumentException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        String msg = StrUtil.format("请求地址'{}', 非法参数异常", requestURI);
        log.error(msg, e);
        return AjaxResult.error(HttpStatusConstant.ILLEGAL_ARGUMENT_EXCEPTION, e.getMessage());
    }

    /**
     * 拦截未知的运行时异常-603
     */
    @ExceptionHandler(RuntimeException.class)
    public AjaxResult handleRuntimeException(RuntimeException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        String msg = StrUtil.format("请求地址'{}', 运行时异常", requestURI);
        log.error(msg, e);
        return AjaxResult.error(HttpStatusConstant.UNKNOWN_RUNTIME_EXCEPTION, msg);
    }
}
