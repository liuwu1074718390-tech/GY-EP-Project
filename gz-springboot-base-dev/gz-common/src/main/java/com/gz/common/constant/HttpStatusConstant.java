package com.gz.common.constant;

/**
 * 返回状态码
 *
 * @author gz
 */
public class HttpStatusConstant {
    /**
     * 操作成功
     */
    public static final int SUCCESS = 200;

    /**
     * 参数列表错误（缺少，格式不匹配）
     */
    public static final int BAD_REQUEST = 400;

    /**
     * 未授权
     */
    public static final int UNAUTHORIZED = 401;

    /**
     * 访问受限，授权过期
     */
    public static final int FORBIDDEN = 403;

    /**
     * 资源，服务未找到
     */
    public static final int NOT_FOUND = 404;

    /**
     * 不允许的http方法
     */
    public static final int METHOD_NOT_ALLOWED = 405;

    /**
     * 系统内部错误
     */
    public static final int SYS_ERROR = 500;

    /**
     * 接口未实现
     */
    public static final int NOT_IMPLEMENTED = 501;

    /**
     * 后端业务通用异常
     */
    public static final int BIZ_EXCEPTION = 600;

    /**
     * 参数验证异常
     */
    public static final int ILLEGAL_ARGUMENT_EXCEPTION = 601;

    /**
     * 未知的运行时异常
     */
    public static final int UNKNOWN_RUNTIME_EXCEPTION = 602;

    /**
     * 系统警告消息
     */
    public static final int WARN = 603;
}
