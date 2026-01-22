package com.gz.framework.exception.file;

import com.gz.framework.exception.file.base.BaseException;

/**
 * 文件信息异常类
 *
 * @author gz
 */
public class FileException extends BaseException {
    private static final long serialVersionUID = 1L;

    public FileException(String code, Object[] args) {
        super("file", code, args, null);
    }

}
