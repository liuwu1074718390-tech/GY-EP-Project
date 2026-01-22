package com.gz.framework.config.properties;

import com.zaxxer.hikari.HikariDataSource;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * HikariSlaveProperties
 *
 * @author gz
 */
@Component
@ConfigurationProperties("spring.datasource.hikari.slave")
@Data
public class HikariSlaveProperties extends HikariProperties {

    private String url;

    private String username;

    private String password;

    private String driverClassName;

    public HikariDataSource dataSource(HikariDataSource datasource) {
        super.dataSource(datasource);

        datasource.setDriverClassName(driverClassName);
        datasource.setJdbcUrl(url);
        datasource.setUsername(username);
        datasource.setPassword(password);

        return datasource;
    }

}
