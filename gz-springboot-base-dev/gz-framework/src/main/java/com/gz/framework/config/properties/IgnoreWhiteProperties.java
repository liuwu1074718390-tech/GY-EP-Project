package com.gz.framework.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

/**
 * 放行白名单配置
 *
 * @author gz
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "security.ignore")
public class IgnoreWhiteProperties {
    /**
     * 放行白名单配置，spring-security不校验此处的白名单
     */
    private List<String> whites = new ArrayList<>();

}
