package com.gz.biz.material.mapper;

import com.github.yulichang.base.MPJBaseMapper;
import com.gz.biz.material.domain.entity.MaterialStandardDO;
import com.gz.biz.material.domain.vo.MaterialStandardVO;

import java.util.List;

/**
 * 材料标准Mapper接口
 *
 * @author gz
 * @date 2026-01-22
 */
public interface MaterialStandardMapper extends MPJBaseMapper<MaterialStandardDO> {

    /**
     * 查询材料标准列表（包含关联信息）
     *
     * @param materialStandardDO 查询条件
     * @return 材料标准列表
     */
    List<MaterialStandardVO> selectMaterialStandardList(MaterialStandardDO materialStandardDO);
}
