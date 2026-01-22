package com.gz.framework.security.filter;

import com.gz.framework.web.domain.dto.LoginUserDTO;
import com.gz.framework.util.SecurityUtil;
import com.gz.common.util.StringUtil;
import com.gz.framework.web.api.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * token过滤器 验证token有效性
 *
 * @author gz
 */
@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        LoginUserDTO loginUserDTO = tokenService.getLoginUser(request);
        if (StringUtil.isNotNull(loginUserDTO) && StringUtil.isNull(SecurityUtil.getAuthentication())) {
            tokenService.verifyTokenExpire(loginUserDTO);
            // 根据用户信息创建已认证的用户信息对象
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUserDTO, null, loginUserDTO.getAuthorities());
            // 设置 authenticationToken 的详细信息，包括请求的 IP 地址、会话 ID 等
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            // 将 authenticationToken 设置为当前线程的认证上下文
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        chain.doFilter(request, response);
    }
}
