package com.gz.common.exception;

import com.gz.common.constant.HttpStatusConstant;

/**
 * 业务异常
 *
 * @author gz
 */
public final class BizException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    /**
     * 错误码
     */
    private Integer code;

    /**
     * 错误提示
     */
    private String message;

    /**
     * 错误明细，内部调试错误
     * <p>
     * 和 {@link CommonResult#getDetailMessage()} 一致的设计
     */
    private String detailMessage;

    /**
     * 空构造方法，避免反序列化问题
     */
    public BizException() {
    }

    public BizException(String message) {
        this.message = message;
        this.code = HttpStatusConstant.BIZ_EXCEPTION;
    }

    public BizException(String message, Integer code) {
        this.message = message;
        this.code = code;
    }

    public String getDetailMessage() {
        return detailMessage;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public Integer getCode() {
        return code;
    }

    public BizException setMessage(String message) {
        this.message = message;
        return this;
    }

    public BizException setDetailMessage(String detailMessage) {
        this.detailMessage = detailMessage;
        return this;
    }
}