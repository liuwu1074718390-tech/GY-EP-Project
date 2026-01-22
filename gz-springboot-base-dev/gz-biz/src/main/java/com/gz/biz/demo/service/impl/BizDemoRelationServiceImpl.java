package com.gz.biz.demo.service.impl;

import com.github.yulichang.base.MPJBaseServiceImpl;
import com.gz.biz.demo.domain.entity.BizDemoRelation;
import com.gz.biz.demo.mapper.BizDemoRelationMapper;
import com.gz.biz.demo.service.IBizDemoRelationService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Demo关联Service业务层处理
 * 
 * @author gz
 * @date 2024-05-11
 */
@Service
public class BizDemoRelationServiceImpl extends MPJBaseServiceImpl<BizDemoRelationMapper, BizDemoRelation> implements IBizDemoRelationService {
    @Resource
    private BizDemoRelationMapper bizDemoRelationMapper;

    /**
     * 查询Demo关联列表
     * 
     * @return Demo关联
     */
    @Override
    public List<BizDemoRelation> listBizDemoRelation() {
        return bizDemoRelationMapper.listBizDemoRelation();
    }

}
