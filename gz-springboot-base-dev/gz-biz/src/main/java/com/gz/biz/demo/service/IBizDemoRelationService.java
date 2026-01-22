package com.gz.biz.demo.service;

import com.github.yulichang.base.MPJBaseService;
import com.gz.biz.demo.domain.entity.BizDemoRelation;

import java.util.List;

/**
 * Demo关联Service接口
 * 
 * @author gz
 * @date 2024-05-11
 */
public interface IBizDemoRelationService extends MPJBaseService<BizDemoRelation> {

    /**
     * 查询Demo关联列表
     * 
     * @return Demo关联集合
     */
    List<BizDemoRelation> listBizDemoRelation();

}
