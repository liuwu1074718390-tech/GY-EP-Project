package com.gz.framework.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 * 字典物理表通用查询mapper
 *
 * @author gz
 * @date 2024-08-15
 */
public interface IBaseMapperD<T> extends BaseMapper<T> {

    @Select("SELECT ${text_column} FROM ${table} WHERE ${code_column} = #{codeColumnVal} AND del_flag = 0")
    List<Map<String, Object>> selectDictTableData(@Param("text_column") String textColumn, @Param("table") String tableName,
                                                  @Param("code_column") String codeColumn, @Param("codeColumnVal") String colCodeVal);

}
