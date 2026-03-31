package com.gz.biz.material.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gz.biz.material.domain.entity.MaterialProcessSegmentDO;
import com.gz.biz.material.domain.entity.MaterialSpecificationDO;
import com.gz.biz.material.domain.entity.MaterialUnitDO;
import com.gz.biz.material.domain.req.MaterialProcessSegmentPageReq;
import com.gz.biz.material.domain.req.MaterialProcessSegmentSaveReq;
import com.gz.biz.material.domain.req.MaterialStandardIdReq;
import com.gz.biz.material.domain.req.MaterialStandardPageReq;
import com.gz.biz.material.domain.req.MaterialStandardSaveReq;
import com.gz.biz.material.domain.req.MaterialUnitPageReq;
import com.gz.biz.material.domain.req.MaterialUnitSaveReq;
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
     * 分页查询单位库
     */
    @PostMapping("/unit/page")
    public Page<MaterialUnitDO> pageUnit(@RequestBody @Validated MaterialUnitPageReq req) {
        return materialStandardService.pageUnit(req);
    }

    /**
     * 新增单位
     */
    @PostMapping("/unit/save")
    public BooleanVO saveUnit(@RequestBody @Validated MaterialUnitSaveReq req) {
        return new BooleanVO(materialStandardService.saveUnit(req));
    }

    /**
     * 更新单位
     */
    @PostMapping("/unit/update")
    public BooleanVO updateUnit(@RequestBody @Validated MaterialUnitSaveReq req) {
        return new BooleanVO(materialStandardService.updateUnit(req));
    }

    /**
     * 删除单位
     */
    @PostMapping("/unit/delete")
    public BooleanVO deleteUnit(@RequestBody @Validated MaterialStandardIdReq req) {
        return new BooleanVO(materialStandardService.deleteUnit(req));
    }

    /**
     * 分页查询标准工艺段
     */
    @PostMapping("/processSegment/page")
    public Page<MaterialProcessSegmentDO> pageProcessSegment(@RequestBody @Validated MaterialProcessSegmentPageReq req) {
        return materialStandardService.pageProcessSegment(req);
    }

    /**
     * 新增标准工艺段
     */
    @PostMapping("/processSegment/save")
    public BooleanVO saveProcessSegment(@RequestBody @Validated MaterialProcessSegmentSaveReq req) {
        return new BooleanVO(materialStandardService.saveProcessSegment(req));
    }

    /**
     * 更新标准工艺段
     */
    @PostMapping("/processSegment/update")
    public BooleanVO updateProcessSegment(@RequestBody @Validated MaterialProcessSegmentSaveReq req) {
        return new BooleanVO(materialStandardService.updateProcessSegment(req));
    }

    /**
     * 删除标准工艺段
     */
    @PostMapping("/processSegment/delete")
    public BooleanVO deleteProcessSegment(@RequestBody @Validated MaterialStandardIdReq req) {
        return new BooleanVO(materialStandardService.deleteProcessSegment(req));
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
