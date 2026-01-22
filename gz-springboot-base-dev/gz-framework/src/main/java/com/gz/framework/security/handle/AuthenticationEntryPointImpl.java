package com.gz.framework.security.handle;

import com.alibaba.fastjson2.JSON;
import com.gz.common.constant.HttpStatusConstant;
import com.gz.common.model.AjaxResult;
import com.gz.framework.util.ServletUtil;
import com.gz.common.util.StringUtil;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

/**
 * 认证失败处理类 返回未授权
 *
 * @author gz
 */
@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint, Serializable {
    private static final long serialVersionUID = -8970718410437077606L;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
            throws IOException {
        int code = HttpStatusConstant.UNAUTHORIZED;
        String msg = StringUtil.format("请求访问：{}，认证失败，无法访问系统资源", request.getRequestURI());
        ServletUtil.renderString(response, JSON.toJSONString(AjaxResult.error(code, msg)));
    }
}
