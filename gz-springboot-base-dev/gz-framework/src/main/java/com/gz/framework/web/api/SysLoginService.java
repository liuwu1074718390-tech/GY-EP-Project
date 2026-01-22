package com.gz.framework.web.api;

import com.gz.common.constant.CacheConstant;
import com.gz.common.constant.Constant;
import com.gz.common.constant.UserConstant;
import com.gz.common.exception.BizException;
import com.gz.framework.exception.user.*;
import com.gz.framework.web.domain.entity.SysUser;
import com.gz.framework.web.domain.dto.LoginUserDTO;
import com.gz.framework.util.RedisUtil;
import com.gz.common.util.DateUtil;
import com.gz.framework.util.MessageUtil;
import com.gz.common.util.StringUtil;
import com.gz.framework.util.ip.IpUtil;
import com.gz.framework.manager.AsyncManager;
import com.gz.framework.manager.factory.AsyncFactory;
import com.gz.framework.security.context.AuthenticationContextHolder;
import com.gz.framework.web.service.ISysConfigService;
import com.gz.framework.web.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * 登录校验方法
 *
 * @author gz
 */
@Component
public class SysLoginService {
    @Autowired
    private TokenService tokenService;

    @Resource
    private AuthenticationManager authenticationManager;

    @Autowired
    private RedisUtil redisUtil;

    @Autowired
    private ISysUserService userService;

    @Autowired
    private ISysConfigService configService;

    /**
     * 登录验证
     *
     * @param username 用户名
     * @param password 密码
     * @param code     验证码
     * @param uuid     唯一标识
     * @return 结果
     */
    public String login(String username, String password, String code, String uuid) {
        // 验证码校验
        validateCaptcha(username, code, uuid);
        // 登录前置校验
        loginPreCheck(username, password);
        // 用户验证
        Authentication authentication = null;
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            AuthenticationContextHolder.setContext(authenticationToken);
            // 该方法会去调用 UserDetailsService.loadUserByUsername
            authentication = authenticationManager.authenticate(authenticationToken);
        } catch (Exception e) {
            if (e instanceof BadCredentialsException) {
                AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL, MessageUtil.message("user.password.not.match")));
                throw new UserPasswordNotMatchException();
            } else {
                AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL, e.getMessage()));
                throw new BizException(e.getMessage());
            }
        } finally {
            AuthenticationContextHolder.clearContext();
        }
        AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_SUCCESS, MessageUtil.message("user.login.success")));
        LoginUserDTO loginUserDTO = (LoginUserDTO) authentication.getPrincipal();
        recordLoginInfo(loginUserDTO.getUserId());
        // 生成token
        return tokenService.createToken(loginUserDTO);
    }

    /**
     * 校验验证码
     *
     * @param username 用户名
     * @param code     验证码
     * @param uuid     唯一标识
     * @return 结果
     */
    public void validateCaptcha(String username, String code, String uuid) {
        boolean captchaEnabled = configService.selectCaptchaEnabled();
        if (captchaEnabled) {
            String verifyKey = CacheConstant.CAPTCHA_CODE_KEY + StringUtil.nvl(uuid, "");
            String captcha = redisUtil.getCacheObject(verifyKey);
            redisUtil.deleteObject(verifyKey);
            if (captcha == null) {
                AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL, MessageUtil.message("user.jcaptcha.expire")));
                throw new CaptchaExpireException();
            }
            if (!code.equalsIgnoreCase(captcha)) {
                AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL, MessageUtil.message("user.jcaptcha.error")));
                throw new CaptchaException();
            }
        }
    }

    /**
     * 登录前置校验
     *
     * @param username 用户名
     * @param password 用户密码
     */
    public void loginPreCheck(String username, String password) {
        // 用户名或密码为空 错误
        if (StringUtil.isEmpty(username) || StringUtil.isEmpty(password)) {
            AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL, MessageUtil.message("not.null")));
            throw new UserNotExistsException();
        }
        // 密码如果不在指定范围内 错误
        if (password.length() < UserConstant.PASSWORD_MIN_LENGTH
                || password.length() > UserConstant.PASSWORD_MAX_LENGTH) {
            AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL, MessageUtil.message("user.password.not.match")));
            throw new UserPasswordNotMatchException();
        }
        // 用户名不在指定范围内 错误
        if (username.length() < UserConstant.USERNAME_MIN_LENGTH
                || username.length() > UserConstant.USERNAME_MAX_LENGTH) {
            AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL, MessageUtil.message("user.password.not.match")));
            throw new UserPasswordNotMatchException();
        }
        // IP黑名单校验
        String blackStr = configService.selectConfigByKey("sys.login.blackIPList");
        if (IpUtil.isMatchedIp(blackStr, IpUtil.getIpAddr())) {
            AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL, MessageUtil.message("login.blocked")));
            throw new BlackListException();
        }
    }

    /**
     * 记录登录信息
     *
     * @param userId 用户ID
     */
    public void recordLoginInfo(Long userId) {
        SysUser sysUser = new SysUser();
        sysUser.setUserId(userId);
        sysUser.setLoginIp(IpUtil.getIpAddr());
        sysUser.setLoginDate(DateUtil.getNowDate());
        userService.updateUserProfile(sysUser);
    }
}
