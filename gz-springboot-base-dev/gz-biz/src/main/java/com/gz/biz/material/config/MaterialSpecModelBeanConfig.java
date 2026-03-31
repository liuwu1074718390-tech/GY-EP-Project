package com.gz.biz.material.config;

import com.gz.biz.material.service.IMaterialSpecModelService;
import com.gz.biz.material.service.impl.MaterialSpecModelServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MaterialSpecModelBeanConfig {

    @Bean(name = "specModelService")
    public IMaterialSpecModelService specModelService() {
        return new MaterialSpecModelServiceImpl();
    }
}
