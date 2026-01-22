package com.gz.biz.demo.domain.convert;

import com.gz.biz.demo.domain.vo.BizDemo2VO;
import com.gz.biz.demo.domain.entity.BizDemo2DO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Demo convert转换对象
 *
 * @author gz
 * @since 2025-04-17
 */
@Mapper
public interface BizDemo2Convert {

    BizDemo2Convert INSTANCE = Mappers.getMapper(BizDemo2Convert.class);

    BizDemo2VO DO2VO(BizDemo2DO DO);

    List<BizDemo2VO> DO2VOList(List<BizDemo2DO> DOList);

}
