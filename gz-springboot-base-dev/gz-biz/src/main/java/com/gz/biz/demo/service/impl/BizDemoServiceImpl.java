package com.gz.biz.demo.service.impl;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.github.yulichang.base.MPJBaseServiceImpl;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import com.gz.biz.demo.domain.entity.BizDemoDO;
import com.gz.biz.demo.domain.entity.BizDemoRelation;
import com.gz.biz.demo.domain.req.DemoIdReq;
import com.gz.biz.demo.domain.req.DemoPageReq;
import com.gz.biz.demo.mapper.BizDemoMapper;
import com.gz.biz.demo.domain.convert.BizDemoConvert;
import com.gz.biz.demo.domain.req.DemoReq;
import com.gz.biz.demo.domain.req.DemoSaveOrUpdateReq;
import com.gz.biz.demo.domain.vo.BizDemoVO;
import com.gz.biz.demo.service.IBizDemoService;
import com.gz.common.annotation.DataSource;
import com.gz.common.enums.DataSourceTypeEnum;
import com.gz.framework.datasource.DynamicDataSourceContextHolder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * DemoService业务层处理
 * 
 * @author gz
 * @date 2024-05-06
 */
@Slf4j
@Service
public class BizDemoServiceImpl extends MPJBaseServiceImpl<BizDemoMapper, BizDemoDO> implements IBizDemoService {
    @Resource
    private BizDemoMapper bizDemoMapper;

    /**
     * 查询Demo列表
     * 
     * @return Demo
     */
    @Override
    public List<BizDemoDO> listBizDemo() {
        return bizDemoMapper.listBizDemo();
    }

    @Override
    public List<BizDemoVO> list(DemoReq req) {
        LambdaQueryWrapper<BizDemoDO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(StrUtil.isNotBlank(req.getName()), BizDemoDO::getPersonName, req.getName())
                .eq(StrUtil.isNotBlank(req.getEmail()), BizDemoDO::getEmail, req.getEmail())
                .eq(req.getAge() != null, BizDemoDO::getPersonAge, req.getAge());

        List<BizDemoDO> list = list(queryWrapper);
        System.out.println(list);
        List<BizDemoVO> voList = BizDemoConvert.INSTANCE.DO2VOList(list);
        System.out.println(voList);

        return voList;
    }

    @Override
    public BizDemoVO getByParams(DemoReq req) {
        LambdaQueryWrapper<BizDemoDO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(StrUtil.isNotBlank(req.getName()), BizDemoDO::getPersonName, req.getName())
                .eq(StrUtil.isNotBlank(req.getEmail()), BizDemoDO::getEmail, req.getEmail())
                .eq(req.getAge() != null, BizDemoDO::getPersonAge, req.getAge());

        BizDemoDO demo = getOne(queryWrapper, false);
        System.out.println(demo);
        BizDemoVO vo = BizDemoConvert.INSTANCE.DO2VO(demo);
        System.out.println(vo);

        return vo;
    }

    @Override
    public boolean insert(DemoReq req) {
        BizDemoDO bizDemoDO = BizDemoConvert.INSTANCE.req2DO(req);
        boolean result = save(bizDemoDO);

        return result;
    }

    @Override
    public boolean deleteById(DemoIdReq req) {
        boolean result = removeById(req.getId());
        return result;
    }

    @Override
    public BizDemoVO getById(DemoIdReq req) {
        BizDemoDO demo = getById(req.getId());
        BizDemoVO vo = BizDemoConvert.INSTANCE.DO2VO(demo);
        return vo;
    }

    @Override
    public boolean updateById(DemoReq req) {
        BizDemoDO entity = BizDemoConvert.INSTANCE.req2DO(req);
        String dateStr = "2025-04-08 17:59:59";
        entity.setUpdateTime(DateUtil.parse(dateStr));
        boolean result = updateById(entity);
        return result;
    }

    @Override
    public boolean saveOrUpdateByParams(DemoSaveOrUpdateReq req) {
        BizDemoDO entity = BizDemoConvert.INSTANCE.req2DO(req);

        LambdaUpdateWrapper<BizDemoDO> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(StrUtil.isNotBlank(req.getEmailSearch()), BizDemoDO::getEmail, req.getEmailSearch());
        boolean result = saveOrUpdate(entity, updateWrapper);

        return result;
    }

    @Override
    public boolean updateSetByParams(DemoReq req) {
        LambdaUpdateWrapper<BizDemoDO> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(StrUtil.isNotBlank(req.getEmail()), BizDemoDO::getEmail, req.getEmail())
                .eq(req.getAge() != null, BizDemoDO::getPersonAge, req.getAge());
        updateWrapper.set(BizDemoDO::getPersonName, req.getName());

        boolean result = update(updateWrapper);
        return result;
    }

    @Override
    public boolean updateDelFlagById(DemoIdReq req) {
        LambdaUpdateWrapper<BizDemoDO> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(BizDemoDO::getId, req.getId())
                .set(BizDemoDO::getDelFlag, "1");

        boolean result = update(updateWrapper);
        return result;
    }

    @Override
    public Page<BizDemoVO> pageByPhysics(DemoPageReq req) {
        LambdaQueryWrapper<BizDemoDO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(StrUtil.isNotBlank(req.getName()), BizDemoDO::getPersonName, req.getName())
                .eq(StrUtil.isNotBlank(req.getEmail()), BizDemoDO::getEmail, req.getEmail())
                .eq(req.getAge() != null, BizDemoDO::getPersonAge, req.getAge());

        Page<BizDemoDO> page = new Page<>(req.getPageNum(), req.getPageSize());
        Page<BizDemoDO> pageData = page(page, queryWrapper);
        Page<BizDemoVO> voPage = BizDemoConvert.INSTANCE.DO2VOPage(pageData);
        return voPage;
    }

    @Override
    public Page<BizDemoVO> pageByLogic(DemoPageReq req) {
        LambdaQueryWrapper<BizDemoDO> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(StrUtil.isNotBlank(req.getName()), BizDemoDO::getPersonName, req.getName())
                .eq(StrUtil.isNotBlank(req.getEmail()), BizDemoDO::getEmail, req.getEmail())
                .eq(req.getAge() != null, BizDemoDO::getPersonAge, req.getAge());
        List<BizDemoDO> list = list(queryWrapper);

        Integer pageNum = req.getPageNum();
        Integer pageSize = req.getPageSize();
        int offset = Math.max(0, (pageNum - 1) * pageSize);
        int endIndex = Math.min(offset + pageSize, list.size());
        List<BizDemoDO> subList = list.subList(offset, endIndex);
        List<BizDemoVO> voList = BizDemoConvert.INSTANCE.DO2VOList(subList);

        Page<BizDemoVO> page = new Page<>(pageNum, pageSize, list.size());
        page.setRecords(voList);
        return page;
    }

    @Override
    @DataSource(DataSourceTypeEnum.SLAVE)
    public List<BizDemoVO> listSlaveDB(DemoReq req) {
        List<BizDemoDO> list = list();
        List<BizDemoVO> voList = BizDemoConvert.INSTANCE.DO2VOList(list);
        return voList;
    }

    @Override
    public List<BizDemoVO> listSlaveDBByManual(DemoReq req) {
        List<BizDemoDO> list = list();
        List<BizDemoVO> voList = BizDemoConvert.INSTANCE.DO2VOList(list);

        DynamicDataSourceContextHolder.setDataSourceType(DataSourceTypeEnum.SLAVE.name());
        List<BizDemoDO> list2 = list();
        List<BizDemoVO> voList2 = BizDemoConvert.INSTANCE.DO2VOList(list2);
        DynamicDataSourceContextHolder.clearDataSourceType();

        voList.addAll(voList2);
        return voList;
    }

    @Override
    public List<BizDemoVO> listJoin(DemoReq req) {
        List<BizDemoVO> voList = selectJoinList(BizDemoVO.class,
                new MPJLambdaWrapper<BizDemoDO>()
                        .select(BizDemoDO::getPersonName, BizDemoDO::getEmail)
                        .selectAs(BizDemoDO::getPersonName, BizDemoVO::getPersonName)
                        .selectAs(BizDemoDO::getEmail, BizDemoVO::getEmail)
                        .innerJoin(BizDemoRelation.class, BizDemoRelation::getDemoId, BizDemoDO::getId)
                        .eq(req.getAge() != null, BizDemoDO::getPersonAge, req.getAge())
                       .select(BizDemoRelation::getSubName)
                        .selectAs(BizDemoRelation::getSubName, BizDemoVO::getSubName)
                );
        voList.forEach(vo -> log.info(vo.toString()));

        return voList;
    }

}
