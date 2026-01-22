package com.gz.framework.web.api;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import com.gz.common.constant.CacheConstant;
import com.gz.common.constant.Constant;
import com.gz.framework.web.domain.entity.SysUser;
import com.gz.framework.util.RedisUtil;
import com.gz.framework.exception.user.UserPasswordNotMatchException;
import com.gz.framework.exception.user.UserPasswordRetryLimitExceedException;
import com.gz.framework.util.MessageUtil;
import com.gz.framework.util.SecurityUtil;
import com.gz.framework.manager.AsyncManager;
import com.gz.framework.manager.factory.AsyncFactory;
import com.gz.framework.security.context.AuthenticationContextHolder;

/**
 * 登录密码方法
 *
 * @author gz
 */
@Component
public class SysPasswordService {
    @Autowired
    private RedisUtil redisUtil;

    @Value(value = "${user.password.maxRetryCount}")
    private int maxRetryCount;

    @Value(value = "${user.password.lockTime}")
    private int lockTime;

    /**
     * 登录账户密码错误次数缓存键名
     *
     * @param username 用户名
     * @return 缓存键key
     */
    private String getCacheKey(String username) {
        return CacheConstant.PWD_ERR_CNT_KEY + username;
    }

    public void validate(SysUser user) {
        Authentication usernamePasswordAuthenticationToken = AuthenticationContextHolder.getContext();
        String username = usernamePasswordAuthenticationToken.getName();
        String password = usernamePasswordAuthenticationToken.getCredentials().toString();

        Integer retryCount = redisUtil.getCacheObject(getCacheKey(username));

        if (retryCount == null) {
            retryCount = 0;
        }

        if (retryCount >= Integer.valueOf(maxRetryCount).intValue()) {
            AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL,
                    MessageUtil.message("user.password.retry.limit.exceed", maxRetryCount, lockTime)));
            throw new UserPasswordRetryLimitExceedException(maxRetryCount, lockTime);
        }

        if (!matches(user, password)) {
            retryCount = retryCount + 1;
            AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constant.LOGIN_FAIL,
                    MessageUtil.message("user.password.retry.limit.count", retryCount)));
            redisUtil.setCacheObject(getCacheKey(username), retryCount, lockTime, TimeUnit.MINUTES);
            throw new UserPasswordNotMatchException();
        } else {
            clearLoginRecordCache(username);
        }
    }

    public boolean matches(SysUser user, String rawPassword) {
        return SecurityUtil.matchesPassword(rawPassword, user.getPassword());
    }

    public void clearLoginRecordCache(String loginName) {
        if (redisUtil.hasKey(getCacheKey(loginName))) {
            redisUtil.deleteObject(getCacheKey(loginName));
        }
    }
}
