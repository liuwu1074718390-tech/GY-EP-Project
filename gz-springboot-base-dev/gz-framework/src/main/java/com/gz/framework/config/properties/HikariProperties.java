package com.gz.framework.config.properties;

import com.zaxxer.hikari.HikariDataSource;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * druid 配置属性
 *
 * @author gz
 */
@Data
@Configuration
public class HikariProperties {

    @Value("${spring.datasource.hikari.maximum-pool-size}")
    private int maximumPoolSize;

    @Value("${spring.datasource.hikari.minimum-idle}")
    private int minimumIdle;

    @Value("${spring.datasource.hikari.connection-timeout}")
    private int connectTimeout;

    public HikariDataSource dataSource(HikariDataSource datasource) {
        datasource.setMaximumPoolSize(getMaximumPoolSize());
        datasource.setMinimumIdle(getMinimumIdle());
        datasource.setConnectionTimeout(getConnectTimeout());

        return datasource;
    }

}
