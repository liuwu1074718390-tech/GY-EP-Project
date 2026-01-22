package com.gz.biz.demo.service.impl;

import com.github.yulichang.base.MPJBaseServiceImpl;
import com.gz.biz.demo.mapper.BizDemo2Mapper;
import com.gz.biz.demo.service.IBizDemo2Service;
import com.gz.biz.demo.domain.entity.BizDemo2DO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * DemoService业务层处理
 * 
 * @author gz
 * @since 2025-04-17
 */
@Service
public class BizDemo2ServiceImpl extends MPJBaseServiceImpl<BizDemo2Mapper, BizDemo2DO> implements IBizDemo2Service {
    @Resource
    private BizDemo2Mapper bizDemo2Mapper;

}
