package com.gz.biz.material.mapper;

import com.github.yulichang.base.MPJBaseMapper;
import com.gz.biz.material.domain.entity.MaterialStdNameSpecValueDO;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MaterialStdNameSpecValueMapper extends MPJBaseMapper<MaterialStdNameSpecValueDO> {
    @Delete({
            "<script>",
            "DELETE FROM material_std_name_spec_value WHERE spec_id IN ",
            "<foreach collection='specIds' item='id' open='(' separator=',' close=')'>",
            "#{id}",
            "</foreach>",
            "</script>"
    })
    int deletePhysicalBySpecIds(@Param("specIds") List<Long> specIds);
}
