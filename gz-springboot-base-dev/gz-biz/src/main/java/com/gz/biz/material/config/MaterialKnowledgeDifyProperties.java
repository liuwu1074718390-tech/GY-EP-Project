package com.gz.biz.material.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Data
@Component
@ConfigurationProperties(prefix = "material.knowledge.dify")
public class MaterialKnowledgeDifyProperties {

    /**
     * Dify API 服务地址，例如：http://192.168.1.42/v1
     */
    private String baseUrl;

    /**
     * 知识库ID
     */
    private String datasetId;

    /**
     * Dify API Key
     */
    private String apiKey;

    /**
     * 目标文档名称
     */
    private String documentName = "标准材料数据";

    public void validateOrThrow() {
        if (!StringUtils.hasText(baseUrl)) {
            throw new IllegalArgumentException("Dify配置缺失：material.knowledge.dify.base-url");
        }
        if (!StringUtils.hasText(datasetId)) {
            throw new IllegalArgumentException("Dify配置缺失：material.knowledge.dify.dataset-id");
        }
        if (!StringUtils.hasText(apiKey)) {
            throw new IllegalArgumentException("Dify配置缺失：material.knowledge.dify.api-key");
        }
        if (!StringUtils.hasText(documentName)) {
            throw new IllegalArgumentException("Dify配置缺失：material.knowledge.dify.document-name");
        }
    }
}

