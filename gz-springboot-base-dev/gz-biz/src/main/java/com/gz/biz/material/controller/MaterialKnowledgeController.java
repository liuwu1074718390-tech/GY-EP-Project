package com.gz.biz.material.controller;

import com.gz.biz.material.domain.vo.MaterialKnowledgeSyncVO;
import com.gz.biz.material.service.IMaterialKnowledgeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/material/standard/knowledge")
public class MaterialKnowledgeController {

    @Resource
    private IMaterialKnowledgeService materialKnowledgeService;

    @PostMapping("/sync")
    public MaterialKnowledgeSyncVO syncKnowledge() {
        return materialKnowledgeService.syncStandardMaterialKnowledge();
    }
}

