package com.gz.biz.demo.domain.convert;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gz.biz.demo.domain.entity.BizDemoDO;
import com.gz.biz.demo.domain.req.DemoReq;
import com.gz.biz.demo.domain.req.DemoSaveOrUpdateReq;
import com.gz.biz.demo.domain.vo.BizDemoVO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * BizDemoConvert-mapstruct转换类
 * PS: mapstruct参考模板类
 *
 * @author damin
 * @date 2024/5/6
 **/
@Mapper
public interface BizDemoConvert {

    BizDemoConvert INSTANCE = Mappers.getMapper(BizDemoConvert.class);

    /**
     * 属性名一致时可以不用写具体属性@Mappings
     */
    BizDemoVO DO2VO(BizDemoDO DO);

    List<BizDemoVO> DO2VOList(List<BizDemoDO> DOList);

    BizDemoDO VO2DO(BizDemoVO VO);

    List<BizDemoDO> VO2DOList(List<BizDemoVO> VOList);

    Page<BizDemoVO> DO2VOPage(Page<BizDemoDO> DOPage);

    @Mappings({
            @Mapping(source = "name", target = "personName"),
            @Mapping(source = "age", target = "personAge")
    })
    BizDemoDO req2DO(DemoReq req);

    @Mappings({
            @Mapping(source = "name", target = "personName"),
            @Mapping(source = "age", target = "personAge")
    })
    BizDemoDO req2DO(DemoSaveOrUpdateReq req);

}
