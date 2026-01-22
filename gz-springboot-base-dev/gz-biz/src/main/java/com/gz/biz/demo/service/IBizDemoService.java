package com.gz.biz.demo.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.github.yulichang.base.MPJBaseService;
import com.gz.biz.demo.domain.entity.BizDemoDO;
import com.gz.biz.demo.domain.req.DemoIdReq;
import com.gz.biz.demo.domain.req.DemoPageReq;
import com.gz.biz.demo.domain.req.DemoReq;
import com.gz.biz.demo.domain.req.DemoSaveOrUpdateReq;
import com.gz.biz.demo.domain.vo.BizDemoVO;

import java.util.List;

/**
 * DemoService接口
 * 
 * @author gz
 * @date 2024-05-06
 */
public interface IBizDemoService extends MPJBaseService<BizDemoDO> {

    /**
     * 查询Demo列表
     * 
     * @return Demo集合
     */
    List<BizDemoDO> listBizDemo();

    /**
     * 查询Demo列表
     *
     * @param req
     * @return
     */
    List<BizDemoVO> list(DemoReq req);

    /**
     * 查询Demo实体
     *
     * @param req
     * @return
     */
    BizDemoVO getByParams(DemoReq req);

    /**
     * 插入Demo表单
     *
     * @param req
     * @return
     */
    boolean insert(DemoReq req);

    /**
     * 根据主键ID删除
     *
     * @param req
     * @return
     */
    boolean deleteById(DemoIdReq req);

    /**
     * 根据ID查询Demo实体
     *
     * @param req
     * @return
     */
    BizDemoVO getById(DemoIdReq req);

    /**
     * 根据ID更新
     *
     * @param req
     * @return
     */
    boolean updateById(DemoReq req);

    /**
     * 根据条件参数更新（会支持满足条件的多条记录批量更新，如果根据参数没找到记录，会进行新增操作）
     *
     * @param req
     * @return
     */
    boolean saveOrUpdateByParams(DemoSaveOrUpdateReq req);

    /**
     * 根据条件参数更新，使用wrapper的set方法进行更新
     *
     * @param req
     * @return
     */
    boolean updateSetByParams(DemoReq req);

    /**
     * 根据主键ID逻辑删除
     *
     * @param req
     * @return
     */
    boolean updateDelFlagById(DemoIdReq req);

    /**
     * 根据条件参数查询分页列表-物理分页
     *
     * @param req
     * @return
     */
    Page<BizDemoVO> pageByPhysics(DemoPageReq req);

    /**
     * 根据条件参数查询分页列表-逻辑分页
     *
     * @param req
     * @return
     */
    Page<BizDemoVO> pageByLogic(DemoPageReq req);

    /**
     * 查询列表-多数据源注解方式
     *
     * @param req
     * @return
     */
    List<BizDemoVO> listSlaveDB(DemoReq req);

    /**
     * 查询列表-多数据源手动方式
     *
     * @param req
     * @return
     */
    List<BizDemoVO> listSlaveDBByManual(DemoReq req);

    /**
     * 关联查询-使用MPJ
     *
     * @param req
     * @return
     */
    List<BizDemoVO> listJoin(DemoReq req);
}
