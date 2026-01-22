package com.gz.biz.material.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.github.yulichang.base.MPJBaseService;
import com.gz.biz.material.domain.entity.MaterialCategoryDO;
import com.gz.biz.material.domain.entity.MaterialSpecificationDO;
import com.gz.biz.material.domain.entity.MaterialStandardDO;
import com.gz.biz.material.domain.entity.MaterialUnitDO;
import com.gz.biz.material.domain.req.MaterialStandardIdReq;
import com.gz.biz.material.domain.req.MaterialStandardPageReq;
import com.gz.biz.material.domain.req.MaterialStandardSaveReq;
import com.gz.biz.material.domain.vo.MaterialCategoryTreeVO;
import com.gz.biz.material.domain.vo.MaterialStandardVO;

import java.util.List;

/**
 * 材料标准Service接口
 *
 * @author gz
 * @date 2026-01-22
 */
public interface IMaterialStandardService extends MPJBaseService<MaterialStandardDO> {

    /**
     * 获取分类树结构
     *
     * @return 分类树列表
     */
    List<MaterialCategoryTreeVO> getCategoryTree();

    /**
     * 获取规格列表
     *
     * @return 规格列表
     */
    List<MaterialSpecificationDO> getSpecificationList();

    /**
     * 获取单位列表
     *
     * @return 单位列表
     */
    List<MaterialUnitDO> getUnitList();

    /**
     * 分页查询材料标准
     *
     * @param req 查询条件
     * @return 分页结果
     */
    Page<MaterialStandardVO> pageMaterialStandard(MaterialStandardPageReq req);

    /**
     * 新增材料标准
     *
     * @param req 保存请求
     * @return 是否成功
     */
    boolean saveMaterialStandard(MaterialStandardSaveReq req);

    /**
     * 更新材料标准
     *
     * @param req 更新请求
     * @return 是否成功
     */
    boolean updateMaterialStandard(MaterialStandardSaveReq req);

    /**
     * 删除材料标准
     *
     * @param req ID请求
     * @return 是否成功
     */
    boolean deleteMaterialStandard(MaterialStandardIdReq req);

    /**
     * 根据ID查询材料标准详情
     *
     * @param req ID请求
     * @return 材料标准详情
     */
    MaterialStandardVO getMaterialStandardById(MaterialStandardIdReq req);

    /**
     * 生成材料编码（11位）
     *
     * @param categoryDO 分类信息
     * @param specDO     规格信息
     * @param unitDO     单位信息
     * @return 材料编码
     */
    String generateMaterialCode(MaterialCategoryDO level1, MaterialCategoryDO level2, MaterialCategoryDO level3,
            MaterialSpecificationDO specDO, MaterialUnitDO unitDO);
}
