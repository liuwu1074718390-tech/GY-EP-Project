package com.gz.framework.exception.user;

import com.gz.framework.exception.file.base.BaseException;

/**
 * 用户信息异常类
 *
 * @author gz
 */
public class UserException extends BaseException {
    private static final long serialVersionUID = 1L;

    public UserException(String code, Object[] args) {
        super("user", code, args, null);
    }
}
