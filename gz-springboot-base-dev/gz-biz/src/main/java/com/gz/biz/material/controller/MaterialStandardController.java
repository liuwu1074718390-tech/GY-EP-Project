package com.gz.biz.material.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gz.biz.material.domain.entity.MaterialSpecificationDO;
import com.gz.biz.material.domain.entity.MaterialUnitDO;
import com.gz.biz.material.domain.req.MaterialStandardIdReq;
import com.gz.biz.material.domain.req.MaterialStandardPageReq;
import com.gz.biz.material.domain.req.MaterialStandardSaveReq;
import com.gz.biz.material.domain.vo.MaterialCategoryTreeVO;
import com.gz.biz.material.domain.vo.MaterialStandardVO;
import com.gz.biz.material.service.IMaterialStandardService;
import com.gz.framework.web.domain.vo.BooleanVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * 材料标准管理Controller
 *
 * @author gz
 * @date 2026-01-22
 */
@Slf4j
@RestController
@RequestMapping("/material/standard")
public class MaterialStandardController {

    @Resource
    private IMaterialStandardService materialStandardService;

    /**
     * 获取材料分类树
     */
    @PostMapping("/categoryTree")
    public List<MaterialCategoryTreeVO> getCategoryTree() {
        return materialStandardService.getCategoryTree();
    }

    /**
     * 获取规格型号列表
     */
    @PostMapping("/specList")
    public List<MaterialSpecificationDO> getSpecList() {
        return materialStandardService.getSpecificationList();
    }

    /**
     * 获取计量单位列表
     */
    @PostMapping("/unitList")
    public List<MaterialUnitDO> getUnitList() {
        return materialStandardService.getUnitList();
    }

    /**
     * 分页查询材料标准列表
     */
    @PostMapping("/page")
    public Page<MaterialStandardVO> page(@RequestBody @Validated MaterialStandardPageReq req) {
        return materialStandardService.pageMaterialStandard(req);
    }

    /**
     * 根据ID查询材料标准详情
     */
    @PostMapping("/getById")
    public MaterialStandardVO getById(@RequestBody @Validated MaterialStandardIdReq req) {
        return materialStandardService.getMaterialStandardById(req);
    }

    /**
     * 新增材料标准
     */
    @PostMapping("/save")
    public BooleanVO save(@RequestBody @Validated MaterialStandardSaveReq req) {
        boolean result = materialStandardService.saveMaterialStandard(req);
        return new BooleanVO(result);
    }

    /**
     * 更新材料标准
     */
    @PostMapping("/update")
    public BooleanVO update(@RequestBody @Validated MaterialStandardSaveReq req) {
        boolean result = materialStandardService.updateMaterialStandard(req);
        return new BooleanVO(result);
    }

    /**
     * 删除材料标准
     */
    @PostMapping("/delete")
    public BooleanVO delete(@RequestBody @Validated MaterialStandardIdReq req) {
        boolean result = materialStandardService.deleteMaterialStandard(req);
        return new BooleanVO(result);
    }
}
