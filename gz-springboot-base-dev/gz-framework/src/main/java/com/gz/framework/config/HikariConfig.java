package com.gz.framework.config;

import com.gz.common.enums.DataSourceTypeEnum;
import com.gz.framework.util.SpringUtil;
import com.gz.framework.config.properties.HikariMasterProperties;
import com.gz.framework.config.properties.HikariSlaveProperties;
import com.gz.framework.datasource.DynamicDataSource;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * druid 配置多数据源
 *
 * @author gz
 */
@Configuration
public class HikariConfig {
    @Bean
    public DataSource masterDataSource(HikariMasterProperties hikariProperties) {
        HikariDataSource dataSource = (HikariDataSource) DataSourceBuilder.create().build();
        return hikariProperties.dataSource(dataSource);
    }

    @Bean
    @ConditionalOnProperty(prefix = "spring.datasource.hikari.slave", name = "enabled", havingValue = "true")
    public DataSource slaveDataSource(HikariSlaveProperties hikariProperties) {
        HikariDataSource dataSource = (HikariDataSource) DataSourceBuilder.create().build();
        return hikariProperties.dataSource(dataSource);
    }

    @Bean(name = "dynamicDataSource")
    @Primary
    public DynamicDataSource dataSource(DataSource masterDataSource) {
        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put(DataSourceTypeEnum.MASTER.name(), masterDataSource);
        setDataSource(targetDataSources, DataSourceTypeEnum.SLAVE.name(), "slaveDataSource");
        return new DynamicDataSource(masterDataSource, targetDataSources);
    }

    /**
     * 设置数据源
     *
     * @param targetDataSources 备选数据源集合
     * @param sourceName        数据源名称
     * @param beanName          bean名称
     */
    public void setDataSource(Map<Object, Object> targetDataSources, String sourceName, String beanName) {
        try {
            DataSource dataSource = SpringUtil.getBean(beanName);
            targetDataSources.put(sourceName, dataSource);
        } catch (Exception e) {
        }
    }

}
