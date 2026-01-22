package com.gz.biz.demo.mapper;

import com.github.yulichang.base.MPJBaseMapper;
import com.gz.biz.demo.domain.entity.BizDemoDO;

import java.util.List;

/**
 * DemoMapper接口
 * 
 * @author gz
 * @date 2024-05-06
 */
public interface BizDemoMapper extends MPJBaseMapper<BizDemoDO> {

    /**
     * 查询Demo列表
     * 
     * @return Demo集合
     */
    List<BizDemoDO> listBizDemo();

}
