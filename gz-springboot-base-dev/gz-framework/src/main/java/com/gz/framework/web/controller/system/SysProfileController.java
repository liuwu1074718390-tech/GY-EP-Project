package com.gz.framework.web.controller.system;

import com.gz.common.annotation.Log;
import com.gz.common.model.AjaxResult;
import com.gz.common.enums.BizTypeEnum;
import com.gz.common.util.StringUtil;
import com.gz.framework.config.GzConfig;
import com.gz.framework.util.SecurityUtil;
import com.gz.framework.util.file.FileUploadUtil;
import com.gz.framework.util.file.MimeTypeUtil;
import com.gz.framework.web.api.TokenService;
import com.gz.framework.web.controller.common.BaseController;
import com.gz.framework.web.domain.dto.LoginUserDTO;
import com.gz.framework.web.domain.entity.SysUser;
import com.gz.framework.web.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 个人信息 业务处理
 *
 * @author gz
 */
@RestController
@RequestMapping("/system/user/profile")
public class SysProfileController extends BaseController {
    @Autowired
    private ISysUserService userService;

    @Autowired
    private TokenService tokenService;

    /**
     * 个人信息
     */
    @GetMapping
    public AjaxResult profile() {
        LoginUserDTO loginUserDTO = getLoginUser();
        SysUser user = loginUserDTO.getUser();
        AjaxResult ajax = AjaxResult.success(user);
        ajax.put("roleGroup", userService.selectUserRoleGroup(loginUserDTO.getUsername()));
        ajax.put("postGroup", userService.selectUserPostGroup(loginUserDTO.getUsername()));
        return ajax;
    }

    /**
     * 修改用户
     */
    @Log(title = "个人信息", businessType = BizTypeEnum.UPDATE)
    @PutMapping
    public AjaxResult updateProfile(@RequestBody SysUser user) {
        LoginUserDTO loginUserDTO = getLoginUser();
        SysUser currentUser = loginUserDTO.getUser();
        currentUser.setNickName(user.getNickName());
        currentUser.setEmail(user.getEmail());
        currentUser.setPhonenumber(user.getPhonenumber());
        currentUser.setSex(user.getSex());
        if (StringUtil.isNotEmpty(user.getPhonenumber()) && !userService.checkPhoneUnique(currentUser)) {
            return error("修改用户'" + loginUserDTO.getUsername() + "'失败，手机号码已存在");
        }
        if (StringUtil.isNotEmpty(user.getEmail()) && !userService.checkEmailUnique(currentUser)) {
            return error("修改用户'" + loginUserDTO.getUsername() + "'失败，邮箱账号已存在");
        }
        if (userService.updateUserProfile(currentUser) > 0) {
            // 更新缓存用户信息
            tokenService.setLoginUser(loginUserDTO);
            return success();
        }
        return error("修改个人信息异常，请联系管理员");
    }

    /**
     * 重置密码
     */
    @Log(title = "个人信息", businessType = BizTypeEnum.UPDATE)
    @PutMapping("/updatePwd")
    public AjaxResult updatePwd(String oldPassword, String newPassword) {
        LoginUserDTO loginUserDTO = getLoginUser();
        String userName = loginUserDTO.getUsername();
        String password = loginUserDTO.getPassword();
        if (!SecurityUtil.matchesPassword(oldPassword, password)) {
            return error("修改密码失败，旧密码错误");
        }
        if (SecurityUtil.matchesPassword(newPassword, password)) {
            return error("新密码不能与旧密码相同");
        }
        newPassword = SecurityUtil.encryptPassword(newPassword);
        if (userService.resetUserPwd(userName, newPassword) > 0) {
            // 更新缓存用户密码
            loginUserDTO.getUser().setPassword(newPassword);
            tokenService.setLoginUser(loginUserDTO);
            return success();
        }
        return error("修改密码异常，请联系管理员");
    }

    /**
     * 头像上传
     */
    @Log(title = "用户头像", businessType = BizTypeEnum.UPDATE)
    @PostMapping("/avatar")
    public AjaxResult avatar(@RequestParam("avatarfile") MultipartFile file) throws Exception {
        if (!file.isEmpty()) {
            LoginUserDTO loginUserDTO = getLoginUser();
            String avatar = FileUploadUtil.upload(GzConfig.getAvatarPath(), file, MimeTypeUtil.IMAGE_EXTENSION);
            if (userService.updateUserAvatar(loginUserDTO.getUsername(), avatar)) {
                AjaxResult ajax = AjaxResult.success();
                ajax.put("imgUrl", avatar);
                // 更新缓存用户头像
                loginUserDTO.getUser().setAvatar(avatar);
                tokenService.setLoginUser(loginUserDTO);
                return ajax;
            }
        }
        return error("上传图片异常，请联系管理员");
    }
}
