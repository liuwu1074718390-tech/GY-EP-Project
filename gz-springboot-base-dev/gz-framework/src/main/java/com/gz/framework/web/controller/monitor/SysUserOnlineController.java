package com.gz.framework.web.controller.monitor;

import com.gz.common.annotation.Log;
import com.gz.common.constant.CacheConstant;
import com.gz.framework.web.controller.common.BaseController;
import com.gz.common.model.AjaxResult;
import com.gz.framework.web.domain.dto.LoginUserDTO;
import com.gz.framework.domain.page.TableDataInfo;
import com.gz.framework.util.RedisUtil;
import com.gz.common.enums.BizTypeEnum;
import com.gz.common.util.StringUtil;
import com.gz.framework.web.domain.entity.SysUserOnline;
import com.gz.framework.web.service.ISysUserOnlineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * 在线用户监控
 *
 * @author gz
 */
@RestController
@RequestMapping("/monitor/online")
public class SysUserOnlineController extends BaseController {
    @Autowired
    private ISysUserOnlineService userOnlineService;

    @Autowired
    private RedisUtil redisUtil;

    @PreAuthorize("@ss.hasPermi('monitor:online:list')")
    @GetMapping("/list")
    public TableDataInfo list(String ipaddr, String userName) {
        Collection<String> keys = redisUtil.keys(CacheConstant.LOGIN_TOKEN_KEY + "*");
        List<SysUserOnline> userOnlineList = new ArrayList<SysUserOnline>();
        for (String key : keys) {
            LoginUserDTO user = redisUtil.getCacheObject(key);
            if (StringUtil.isNotEmpty(ipaddr) && StringUtil.isNotEmpty(userName)) {
                userOnlineList.add(userOnlineService.selectOnlineByInfo(ipaddr, userName, user));
            } else if (StringUtil.isNotEmpty(ipaddr)) {
                userOnlineList.add(userOnlineService.selectOnlineByIpaddr(ipaddr, user));
            } else if (StringUtil.isNotEmpty(userName) && StringUtil.isNotNull(user.getUser())) {
                userOnlineList.add(userOnlineService.selectOnlineByUserName(userName, user));
            } else {
                userOnlineList.add(userOnlineService.loginUserToUserOnline(user));
            }
        }
        Collections.reverse(userOnlineList);
        userOnlineList.removeAll(Collections.singleton(null));
        return getDataTable(userOnlineList);
    }

    /**
     * 强退用户
     */
    @PreAuthorize("@ss.hasPermi('monitor:online:forceLogout')")
    @Log(title = "在线用户", businessType = BizTypeEnum.FORCE)
    @DeleteMapping("/{tokenId}")
    public AjaxResult forceLogout(@PathVariable String tokenId) {
        redisUtil.deleteObject(CacheConstant.LOGIN_TOKEN_KEY + tokenId);
        return success();
    }
}
