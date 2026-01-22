package com.gz.framework.manager.factory;

import com.gz.common.constant.Constant;
import com.gz.common.util.StringUtil;
import com.gz.framework.util.ServletUtil;
import com.gz.framework.util.SpringUtil;
import com.gz.framework.util.ip.AddressUtil;
import com.gz.framework.util.ip.IpUtil;
import com.gz.framework.web.domain.entity.SysLogininfor;
import com.gz.framework.web.domain.entity.SysOperLog;
import com.gz.framework.web.service.ISysLogininforService;
import com.gz.framework.web.service.ISysOperLogService;
import eu.bitwalker.useragentutils.UserAgent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.TimerTask;

/**
 * 异步工厂（产生任务用）
 *
 * @author gz
 */
public class AsyncFactory {
    private static final Logger sys_user_logger = LoggerFactory.getLogger("sys-user");

    /**
     * 记录登录信息
     *
     * @param username 用户名
     * @param status   状态
     * @param message  消息
     * @param args     列表
     * @return 任务task
     */
    public static TimerTask recordLogininfor(final String username, final String status, final String message,
                                             final Object... args) {
        final UserAgent userAgent = UserAgent.parseUserAgentString(ServletUtil.getRequest().getHeader("User-Agent"));
        final String ip = IpUtil.getIpAddr();
        return new TimerTask() {
            @Override
            public void run() {
                String address = AddressUtil.getRealAddressByIP(ip);
                StringBuilder s = new StringBuilder();
                s.append(getBlock(ip));
                s.append(address);
                s.append(getBlock(username));
                s.append(getBlock(status));
                s.append(getBlock(message));
                // 打印信息到日志
                sys_user_logger.info(s.toString(), args);
                // 获取客户端操作系统
                String os = userAgent.getOperatingSystem().getName();
                // 获取客户端浏览器
                String browser = userAgent.getBrowser().getName();
                // 封装对象
                SysLogininfor logininfor = new SysLogininfor();
                logininfor.setUserName(username);
                logininfor.setIpaddr(ip);
                logininfor.setLoginLocation(address);
                logininfor.setBrowser(browser);
                logininfor.setOs(os);
                logininfor.setMsg(message);
                // 日志状态
                if (StringUtil.equalsAny(status, Constant.LOGIN_SUCCESS, Constant.LOGOUT, Constant.REGISTER)) {
                    logininfor.setStatus(Constant.SUCCESS);
                } else if (Constant.LOGIN_FAIL.equals(status)) {
                    logininfor.setStatus(Constant.FAIL);
                }
                // 插入数据
                SpringUtil.getBean(ISysLogininforService.class).insertLogininfor(logininfor);
            }
        };
    }

    /**
     * 操作日志记录
     *
     * @param operLog 操作日志信息
     * @return 任务task
     */
    public static TimerTask recordOper(final SysOperLog operLog) {
        return new TimerTask() {
            @Override
            public void run() {
                // 远程查询操作地点
                operLog.setOperLocation(AddressUtil.getRealAddressByIP(operLog.getOperIp()));
                SpringUtil.getBean(ISysOperLogService.class).insertOperlog(operLog);
            }
        };
    }

    public static String getBlock(Object msg) {
        if (msg == null) {
            msg = "";
        }
        return "[" + msg + "]";
    }
}
