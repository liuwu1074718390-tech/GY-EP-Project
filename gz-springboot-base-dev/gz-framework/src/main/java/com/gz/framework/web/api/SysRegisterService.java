package com.gz.framework.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.gz.common.constant.CacheConstant;
import com.gz.common.constant.Constant;
import com.gz.common.constant.UserConstant;
import com.gz.framework.web.domain.entity.SysUser;
import com.gz.framework.web.domain.req.RegisterBodyReq;
import com.gz.framework.util.RedisUtil;
import com.gz.framework.exception.user.CaptchaException;
import com.gz.framework.exception.user.CaptchaExpireException;
import com.gz.framework.util.MessageUtil;
import com.gz.framework.util.SecurityUtil;
import com.gz.common.util.StringUtil;
import com.gz.framework.manager.AsyncManager;
import com.gz.framework.manager.factory.AsyncFactory;
import com.gz.framework.web.service.ISysConfigService;
import com.gz.framework.web.service.ISysUserService;

/**
 * 注册校验方法
 *
 * @author gz
 */
@Component
public class SysRegisterService {
    @Autowired
    private ISysUserService userService;

    @Autowired
    private ISysConfigService configService;

    @Autowired
    private RedisUtil redisUtil;

    /**
     * 注册
     */
    public String register(RegisterBodyReq registerBody) {
        String msg = "", username = registerBody.getUsername(), password = registerBody.getPassword();
        SysUser sysUser = new SysUser();
        sysUser.setUserName(username);

        // 验证码开关
        boolean captchaEnabled = configService.selectCaptchaEnabled();
        if (captchaEnabled) {
            validateCaptcha(username, registerBody.getCode(), registerBody.getUuid());
        }

        if (StringUtil.isEmpty(username)) {
            msg = "用户名不能为空";
        } else if (StringUtil.isEmpty(password)) {
            msg = "用户密码不能为空";
        } else if (username.length() < UserConstant.USERNAME_MIN_LENGTH
                || username.length() > UserConstant.USERNAME_MAX_LENGTH) {
            msg = "账户长度必须在2到20个字符之间";
        } else if (password.length() < UserConstant.PASSWORD_MIN_LENGTH
                || password.length() > UserConstant.PASSWORD_MAX_LENGTH) {
            msg = "密码长度必须在5到20个字符之间";
        } else if (!userService.checkUserNameUnique(sysUser)) {
            msg = "保存用户'" + username + "'失败，注册账号已存在";
        } else {
            sysUser.setNickName(username);
            sysUser.setPassword(SecurityUtil.encryptPassword(password));
            boolean regFlag = userService.registerUser(sysUser);
            if (!regFlag) {
                msg = "注册失败,请联系系统管理人员";
            } else {
                AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.REGISTER, MessageUtil.message("user.register.success")));
            }
        }
        return msg;
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
        String verifyKey = CacheConstant.CAPTCHA_CODE_KEY + StringUtil.nvl(uuid, "");
        String captcha = redisUtil.getCacheObject(verifyKey);
        redisUtil.deleteObject(verifyKey);
        if (captcha == null) {
            throw new CaptchaExpireException();
        }
        if (!code.equalsIgnoreCase(captcha)) {
            throw new CaptchaException();
        }
    }
}
