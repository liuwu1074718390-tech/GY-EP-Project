package com.gz.biz.material.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gz.biz.material.domain.req.MaterialSpecModelIdReq;
import com.gz.biz.material.domain.req.MaterialSpecModelPageReq;
import com.gz.biz.material.domain.req.MaterialSpecModelSaveReq;
import com.gz.biz.material.domain.vo.MaterialSpecModelVO;
import com.gz.biz.material.service.IMaterialSpecModelService;
import com.gz.framework.web.domain.vo.BooleanVO;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/material/standard/specModel")
public class MaterialSpecModelController {

    @Resource
    private IMaterialSpecModelService specModelService;

    @PostMapping("/page")
    public Page<MaterialSpecModelVO> page(@RequestBody @Validated MaterialSpecModelPageReq req) {
        return specModelService.pageSpecModel(req);
    }

    @PostMapping("/getById")
    public MaterialSpecModelVO getById(@RequestBody @Validated MaterialSpecModelIdReq req) {
        return specModelService.getSpecModelById(req);
    }

    @PostMapping("/save")
    public BooleanVO save(@RequestBody @Validated MaterialSpecModelSaveReq req) {
        return new BooleanVO(specModelService.saveSpecModel(req));
    }

    @PostMapping("/update")
    public BooleanVO update(@RequestBody @Validated MaterialSpecModelSaveReq req) {
        return new BooleanVO(specModelService.updateSpecModel(req));
    }

    @PostMapping("/delete")
    public BooleanVO delete(@RequestBody @Validated MaterialSpecModelIdReq req) {
        return new BooleanVO(specModelService.deleteSpecModel(req));
    }
}
