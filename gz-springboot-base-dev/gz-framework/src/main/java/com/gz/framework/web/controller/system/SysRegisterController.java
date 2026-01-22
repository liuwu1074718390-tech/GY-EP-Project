package com.gz.framework.web.controller.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.gz.framework.web.controller.common.BaseController;
import com.gz.common.model.AjaxResult;
import com.gz.framework.web.domain.req.RegisterBodyReq;
import com.gz.common.util.StringUtil;
import com.gz.framework.web.api.SysRegisterService;
import com.gz.framework.web.service.ISysConfigService;

/**
 * 注册验证
 *
 * @author gz
 */
@RestController
public class SysRegisterController extends BaseController {
    @Autowired
    private SysRegisterService registerService;

    @Autowired
    private ISysConfigService configService;

    @PostMapping("/register")
    public AjaxResult register(@RequestBody RegisterBodyReq user) {
        if (!("true".equals(configService.selectConfigByKey("sys.account.registerUser")))) {
            return error("当前系统没有开启注册功能！");
        }
        String msg = registerService.register(user);
        return StringUtil.isEmpty(msg) ? success() : error(msg);
    }
}
