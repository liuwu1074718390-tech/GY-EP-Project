package com.gz.biz.demo.mapper;

import com.github.yulichang.base.MPJBaseMapper;
import com.gz.biz.demo.domain.entity.BizDemoRelation;

import java.util.List;

/**
 * Demo关联Mapper接口
 * 
 * @author gz
 * @date 2024-05-11
 */
public interface BizDemoRelationMapper extends MPJBaseMapper<BizDemoRelation> {

    /**
     * 查询Demo关联列表
     * 
     * @return Demo关联集合
     */
    List<BizDemoRelation> listBizDemoRelation();

}
