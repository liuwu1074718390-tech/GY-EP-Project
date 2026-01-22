package com.gz.framework.web.api;

import com.gz.common.constant.CacheConstant;
import com.gz.common.constant.Constant;
import com.gz.framework.web.domain.dto.LoginUserDTO;
import com.gz.framework.util.RedisUtil;
import com.gz.framework.util.ServletUtil;
import com.gz.common.util.StringUtil;
import com.gz.framework.util.ip.AddressUtil;
import com.gz.framework.util.ip.IpUtil;
import com.gz.common.util.uuid.IdUtil;
import eu.bitwalker.useragentutils.UserAgent;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * token验证处理
 *
 * @author gz
 */
@Component
public class TokenService {
    private static final Logger log = LoggerFactory.getLogger(TokenService.class);

    // 令牌自定义标识
    @Value("${token.header}")
    private String header;

    // 令牌秘钥
    @Value("${token.secret}")
    private String secret;

    // 令牌有效期（默认30分钟）
    @Value("${token.expireTime}")
    private int expireTime;

    protected static final long MILLIS_SECOND = 1000;

    protected static final long MILLIS_MINUTE = 60 * MILLIS_SECOND;

    private static final Long MILLIS_MINUTE_TEN = 20 * 60 * 1000L;

    @Autowired
    private RedisUtil redisUtil;

    /**
     * 获取用户身份信息
     *
     * @return 用户信息
     */
    public LoginUserDTO getLoginUser(HttpServletRequest request) {
        // 获取请求携带的令牌
        String token = getToken(request);
        if (StringUtil.isNotEmpty(token)) {
            try {
                Claims claims = parseToken(token);
                // 解析对应的权限以及用户信息
                String uuid = (String) claims.get(Constant.LOGIN_USER_KEY);
                String userKey = getTokenKey(uuid);
                LoginUserDTO user = redisUtil.getCacheObject(userKey);
                return user;
            } catch (Exception e) {
                log.error("获取用户信息异常'{}'", e.getMessage());
            }
        }
        return null;
    }

    /**
     * 设置用户身份信息
     */
    public void setLoginUser(LoginUserDTO loginUserDTO) {
        if (StringUtil.isNotNull(loginUserDTO) && StringUtil.isNotEmpty(loginUserDTO.getToken())) {
            refreshToken(loginUserDTO);
        }
    }

    /**
     * 删除用户身份信息
     */
    public void delLoginUser(String token) {
        if (StringUtil.isNotEmpty(token)) {
            String userKey = getTokenKey(token);
            redisUtil.deleteObject(userKey);
        }
    }

    /**
     * 创建令牌
     *
     * @param loginUserDTO 用户信息
     * @return 令牌
     */
    public String createToken(LoginUserDTO loginUserDTO) {
        String token = IdUtil.fastUUID();
        loginUserDTO.setToken(token);
        setUserAgent(loginUserDTO);
        refreshToken(loginUserDTO);

        Map<String, Object> claims = new HashMap<>();
        claims.put(Constant.LOGIN_USER_KEY, token);
        return createToken(claims);
    }

    /**
     * 验证令牌有效期，相差不足20分钟，自动刷新缓存
     *
     * @param loginUserDTO
     * @return 令牌
     */
    public void verifyTokenExpire(LoginUserDTO loginUserDTO) {
        long expireTime = loginUserDTO.getExpireTime();
        long currentTime = System.currentTimeMillis();
        if (expireTime - currentTime <= MILLIS_MINUTE_TEN) {
            refreshToken(loginUserDTO);
        }
    }

    /**
     * 刷新令牌有效期
     *
     * @param loginUserDTO 登录信息
     */
    public void refreshToken(LoginUserDTO loginUserDTO) {
        loginUserDTO.setLoginTime(System.currentTimeMillis());
        loginUserDTO.setExpireTime(loginUserDTO.getLoginTime() + expireTime * MILLIS_MINUTE);
        // 根据uuid将loginUser缓存
        String userKey = getTokenKey(loginUserDTO.getToken());
        redisUtil.setCacheObject(userKey, loginUserDTO, expireTime, TimeUnit.MINUTES);
    }

    /**
     * 设置用户代理信息
     *
     * @param loginUserDTO 登录信息
     */
    public void setUserAgent(LoginUserDTO loginUserDTO) {
        UserAgent userAgent = UserAgent.parseUserAgentString(ServletUtil.getRequest().getHeader("User-Agent"));
        String ip = IpUtil.getIpAddr();
        loginUserDTO.setIpaddr(ip);
        loginUserDTO.setLoginLocation(AddressUtil.getRealAddressByIP(ip));
        loginUserDTO.setBrowser(userAgent.getBrowser().getName());
        loginUserDTO.setOs(userAgent.getOperatingSystem().getName());
    }

    /**
     * 从数据声明生成令牌
     *
     * @param claims 数据声明
     * @return 令牌
     */
    private String createToken(Map<String, Object> claims) {
        String token = Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secret).compact();
        return token;
    }

    /**
     * 从令牌中获取数据声明
     *
     * @param token 令牌
     * @return 数据声明
     */
    private Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * 从令牌中获取用户名
     *
     * @param token 令牌
     * @return 用户名
     */
    public String getUsernameFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.getSubject();
    }

    /**
     * 获取请求token
     *
     * @param request
     * @return token
     */
    private String getToken(HttpServletRequest request) {
        String token = request.getHeader(header);
        if (StringUtil.isNotEmpty(token) && token.startsWith(Constant.TOKEN_PREFIX)) {
            token = token.replace(Constant.TOKEN_PREFIX, "");
        }
        return token;
    }

    private String getTokenKey(String uuid) {
        return CacheConstant.LOGIN_TOKEN_KEY + uuid;
    }
}
