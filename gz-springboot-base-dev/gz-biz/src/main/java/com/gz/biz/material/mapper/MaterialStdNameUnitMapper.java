package com.gz.biz.material.mapper;

import com.github.yulichang.base.MPJBaseMapper;
import com.gz.biz.material.domain.entity.MaterialStdNameUnitDO;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;

public interface MaterialStdNameUnitMapper extends MPJBaseMapper<MaterialStdNameUnitDO> {
    @Delete("DELETE FROM material_std_name_unit WHERE std_name_id = #{stdNameId}")
    int deletePhysicalByStdNameId(@Param("stdNameId") Long stdNameId);
}
