package com.gz.framework.web.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.gz.framework.web.domain.entity.SysUser;
import com.gz.framework.web.domain.dto.LoginUserDTO;
import com.gz.common.enums.UserStatusEnum;
import com.gz.common.exception.BizException;
import com.gz.framework.util.MessageUtil;
import com.gz.common.util.StringUtil;
import com.gz.framework.web.service.ISysUserService;

/**
 * 用户验证处理
 *
 * @author gz
 */
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    private static final Logger log = LoggerFactory.getLogger(UserDetailsService.class);

    @Autowired
    private ISysUserService userService;

    @Autowired
    private SysPasswordService passwordService;

    @Autowired
    private SysPermissionService permissionService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SysUser user = userService.selectUserByUserName(username);
        if (StringUtil.isNull(user)) {
            log.info("登录用户：{} 不存在.", username);
            throw new BizException(MessageUtil.message("user.not.exists"));
        } else if (UserStatusEnum.DELETED.getCode().equals(user.getDelFlag())) {
            log.info("登录用户：{} 已被删除.", username);
            throw new BizException(MessageUtil.message("user.password.delete"));
        } else if (UserStatusEnum.DISABLE.getCode().equals(user.getStatus())) {
            log.info("登录用户：{} 已被停用.", username);
            throw new BizException(MessageUtil.message("user.blocked"));
        }

        passwordService.validate(user);

        return createLoginUser(user);
    }

    public UserDetails createLoginUser(SysUser user) {
        return new LoginUserDTO(user.getUserId(), user.getDeptId(), user, permissionService.getMenuPermission(user));
    }
}
