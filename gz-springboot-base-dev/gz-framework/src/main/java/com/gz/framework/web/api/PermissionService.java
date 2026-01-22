package com.gz.framework.web.api;

import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import com.gz.common.constant.Constant;
import com.gz.framework.web.domain.entity.SysRole;
import com.gz.framework.web.domain.dto.LoginUserDTO;
import com.gz.framework.util.SecurityUtil;
import com.gz.common.util.StringUtil;
import com.gz.framework.security.context.PermissionContextHolder;

/**
 * gz首创 自定义权限实现，ss取自SpringSecurity首字母
 *
 * @author gz
 */
@Service("ss")
public class PermissionService {
    /**
     * 验证用户是否具备某权限
     *
     * @param permission 权限字符串
     * @return 用户是否具备某权限
     */
    public boolean hasPermi(String permission) {
        if (StringUtil.isEmpty(permission)) {
            return false;
        }
        LoginUserDTO loginUserDTO = SecurityUtil.getLoginUser();
        if (StringUtil.isNull(loginUserDTO) || CollectionUtils.isEmpty(loginUserDTO.getPermissions())) {
            return false;
        }
        PermissionContextHolder.setContext(permission);
        return hasPermissions(loginUserDTO.getPermissions(), permission);
    }

    /**
     * 验证用户是否不具备某权限，与 hasPermi逻辑相反
     *
     * @param permission 权限字符串
     * @return 用户是否不具备某权限
     */
    public boolean lacksPermi(String permission) {
        return hasPermi(permission) != true;
    }

    /**
     * 验证用户是否具有以下任意一个权限
     *
     * @param permissions 以 PERMISSION_DELIMETER 为分隔符的权限列表
     * @return 用户是否具有以下任意一个权限
     */
    public boolean hasAnyPermi(String permissions) {
        if (StringUtil.isEmpty(permissions)) {
            return false;
        }
        LoginUserDTO loginUserDTO = SecurityUtil.getLoginUser();
        if (StringUtil.isNull(loginUserDTO) || CollectionUtils.isEmpty(loginUserDTO.getPermissions())) {
            return false;
        }
        PermissionContextHolder.setContext(permissions);
        Set<String> authorities = loginUserDTO.getPermissions();
        for (String permission : permissions.split(Constant.PERMISSION_DELIMETER)) {
            if (permission != null && hasPermissions(authorities, permission)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断用户是否拥有某个角色
     *
     * @param role 角色字符串
     * @return 用户是否具备某角色
     */
    public boolean hasRole(String role) {
        if (StringUtil.isEmpty(role)) {
            return false;
        }
        LoginUserDTO loginUserDTO = SecurityUtil.getLoginUser();
        if (StringUtil.isNull(loginUserDTO) || CollectionUtils.isEmpty(loginUserDTO.getUser().getRoles())) {
            return false;
        }
        for (SysRole sysRole : loginUserDTO.getUser().getRoles()) {
            String roleKey = sysRole.getRoleKey();
            if (Constant.SUPER_ADMIN.equals(roleKey) || roleKey.equals(StringUtil.trim(role))) {
                return true;
            }
        }
        return false;
    }

    /**
     * 验证用户是否不具备某角色，与 isRole逻辑相反。
     *
     * @param role 角色名称
     * @return 用户是否不具备某角色
     */
    public boolean lacksRole(String role) {
        return hasRole(role) != true;
    }

    /**
     * 验证用户是否具有以下任意一个角色
     *
     * @param roles 以 ROLE_NAMES_DELIMETER 为分隔符的角色列表
     * @return 用户是否具有以下任意一个角色
     */
    public boolean hasAnyRoles(String roles) {
        if (StringUtil.isEmpty(roles)) {
            return false;
        }
        LoginUserDTO loginUserDTO = SecurityUtil.getLoginUser();
        if (StringUtil.isNull(loginUserDTO) || CollectionUtils.isEmpty(loginUserDTO.getUser().getRoles())) {
            return false;
        }
        for (String role : roles.split(Constant.ROLE_DELIMETER)) {
            if (hasRole(role)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断是否包含权限
     *
     * @param permissions 权限列表
     * @param permission  权限字符串
     * @return 用户是否具备某权限
     */
    private boolean hasPermissions(Set<String> permissions, String permission) {
        return permissions.contains(Constant.ALL_PERMISSION) || permissions.contains(StringUtil.trim(permission));
    }
}
