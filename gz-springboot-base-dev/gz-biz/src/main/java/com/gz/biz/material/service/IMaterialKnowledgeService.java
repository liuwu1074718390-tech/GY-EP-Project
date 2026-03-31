package com.gz.biz.material.service;

import com.gz.biz.material.domain.vo.MaterialKnowledgeSyncVO;

public interface IMaterialKnowledgeService {

    /**
     * 将标准材料数据覆盖同步到 Dify 知识库文档。
     */
    MaterialKnowledgeSyncVO syncStandardMaterialKnowledge();
}

