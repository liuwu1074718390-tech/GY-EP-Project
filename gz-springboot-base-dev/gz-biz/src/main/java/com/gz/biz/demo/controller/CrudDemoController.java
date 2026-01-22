package com.gz.biz.demo.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gz.biz.demo.domain.req.DemoPageReq;
import com.gz.biz.demo.domain.req.DemoIdReq;
import com.gz.biz.demo.domain.req.DemoReq;
import com.gz.biz.demo.domain.req.DemoSaveOrUpdateReq;
import com.gz.biz.demo.domain.vo.BizDemoVO;
import com.gz.biz.demo.service.IBizDemoService;
import com.gz.framework.web.controller.common.BaseController;
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
 * demo模块/CRUD示例接口
 *
 * @author gz
 * @date 2024-04-29
 */
@Slf4j
@RestController
@RequestMapping("/demo/crud")
public class CrudDemoController extends BaseController {
    @Resource
    private IBizDemoService bizDemoService;

    /**
     * 根据条件参数查询分页列表-物理分页
     */
    @PostMapping("/pageByPhysics")
    public Page<BizDemoVO> pageByPhysics(@RequestBody @Validated DemoPageReq req) {
        Page<BizDemoVO> page = bizDemoService.pageByPhysics(req);
        return page;
    }

    /**
     * 根据条件参数查询分页列表-逻辑分页
     */
    @PostMapping("/pageByLogic")
    public Page<BizDemoVO> pageByLogic(@RequestBody @Validated DemoPageReq req) {
        Page<BizDemoVO> page = bizDemoService.pageByLogic(req);
        return page;
    }

    /**
     * 根据条件参数查询列表
     */
    @PostMapping("/list")
    public List<BizDemoVO> list(@RequestBody @Validated DemoReq req) {
        List<BizDemoVO> list = bizDemoService.list(req);
        return list;
    }

    /**
     * 根据ID查询实体
     */
    @PostMapping("/getById")
    public BizDemoVO getById(@RequestBody @Validated DemoIdReq req) {
        BizDemoVO vo = bizDemoService.getById(req);
        return vo;
    }

    /**
     * 根据条件参数查询实体
     */
    @PostMapping("/getByParams")
    public BizDemoVO getByParams(@RequestBody @Validated DemoReq req) {
        BizDemoVO vo = bizDemoService.getByParams(req);
        return vo;
    }

    /**
     * 新增插入实体
     */
    @PostMapping("/insert")
    public BooleanVO insert(@RequestBody @Validated DemoReq req) {
        boolean result = bizDemoService.insert(req);
        return new BooleanVO(result);
    }

    /**
     * 根据主键ID物理删除（PS：当实体中字段delFlag上用了@TableLogi注解时会自动进行逻辑删除，物理删除不生效）
     */
    @PostMapping("/deleteById")
    public BooleanVO deleteById(@RequestBody @Validated DemoIdReq req) {
        boolean result = bizDemoService.deleteById(req);
        return new BooleanVO(result);
    }

    /**
     * 根据主键ID逻辑删除
     */
    @PostMapping("/deleteLogicById")
    public BooleanVO deleteLogicById(@RequestBody @Validated DemoIdReq req) {
        boolean result = bizDemoService.updateDelFlagById(req);
        return new BooleanVO(result);
    }

    /**
     * 根据ID更新
     */
    @PostMapping("/updateById")
    public BooleanVO updateById(@RequestBody @Validated DemoReq req) {
        boolean result = bizDemoService.updateById(req);
        return new BooleanVO(result);
    }

    /**
     * 根据条件参数更新，使用wrapper的set方法进行更新
     */
    @PostMapping("/updateSetByParams")
    public BooleanVO updateSetByParams(@RequestBody @Validated DemoReq req) {
        boolean result = bizDemoService.updateSetByParams(req);
        return new BooleanVO(result);
    }

    /**
     * 根据条件参数更新或保存（会支持满足条件的多条记录批量更新，如果根据参数没找到记录，会进行新增操作）
     */
    @PostMapping("/saveOrUpdateByParams")
    public BooleanVO saveOrUpdateByParams(@RequestBody @Validated DemoSaveOrUpdateReq req) {
        boolean result = bizDemoService.saveOrUpdateByParams(req);
        return new BooleanVO(result);
    }

    /**
     * 查询列表-多数据源注解方式(PS:先将spring.datasource.hikari.slave.enabled设置为true才能使用)
     */
    @PostMapping("/listSlaveDB")
    public List<BizDemoVO> listSlaveDB(@RequestBody @Validated DemoReq req) {
        List<BizDemoVO> list = bizDemoService.listSlaveDB(req);
        return list;
    }

    /**
     * 查询列表-多数据源手工切换方式(PS:先将spring.datasource.hikari.slave.enabled设置为true才能使用)
     */
    @PostMapping("/listSlaveDBByManual")
    public List<BizDemoVO> listSlaveDBByManual(@RequestBody @Validated DemoReq req) {
        List<BizDemoVO> list = bizDemoService.listSlaveDBByManual(req);
        return list;
    }

    /**
     * 关联查询-使用MPJ
     */
    @PostMapping("/listJoin")
    public List<BizDemoVO> listJoin(@RequestBody @Validated DemoReq req) {
        List<BizDemoVO> list = bizDemoService.listJoin(req);
        return list;
    }

}
