package com.gz.framework.security.handle;

import com.alibaba.fastjson2.JSON;
import com.gz.common.constant.Constant;
import com.gz.common.model.AjaxResult;
import com.gz.framework.web.domain.dto.LoginUserDTO;
import com.gz.framework.util.ServletUtil;
import com.gz.common.util.StringUtil;
import com.gz.framework.manager.AsyncManager;
import com.gz.framework.manager.factory.AsyncFactory;
import com.gz.framework.web.api.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 自定义退出处理类 返回成功
 *
 * @author gz
 */
@Configuration
public class LogoutSuccessHandlerImpl implements LogoutSuccessHandler {
    @Autowired
    private TokenService tokenService;

    /**
     * 退出处理
     *
     * @return
     */
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        LoginUserDTO loginUserDTO = tokenService.getLoginUser(request);
        if (StringUtil.isNotNull(loginUserDTO)) {
            String userName = loginUserDTO.getUsername();
            // 删除用户缓存记录
            tokenService.delLoginUser(loginUserDTO.getToken());
            // 记录用户退出日志
            AsyncManager.me().execute(AsyncFactory.recordLogininfor(userName, Constant.LOGOUT, "退出成功"));
        }
        ServletUtil.renderString(response, JSON.toJSONString(AjaxResult.success("退出成功")));
    }
}
