package com.gz.framework.util.dict;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.github.benmanes.caffeine.cache.CacheLoader;
import com.github.benmanes.caffeine.cache.LoadingCache;
import com.gz.common.constant.SymbolConstant;
import com.gz.framework.web.mapper.IBaseMapperD;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.nullness.qual.NonNull;
import org.checkerframework.checker.nullness.qual.Nullable;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

/**
 * 字典本地缓存查询工具类
 *
 * @author gz
 * @date 2024-08-15
 */
@Slf4j
public class DictContext {

    private static IBaseMapperD<?> baseMapperD;

    // 手动获取Bean
    static {
        final Map<String, IBaseMapperD> beansOfType = SpringUtil.getBeansOfType(IBaseMapperD.class);
        if (CollectionUtil.isNotEmpty(beansOfType)) {
            baseMapperD = CollectionUtil.newArrayList(beansOfType.values()).get(0);
        }
    }

    /**
     * 加载数据缓存
     */
    private static final LoadingCache<String, String> DICT_DATA_CACHE =
            CaffeineCache.buildAsynReloadingCache(Duration.ofMinutes(5L), 5000L, new CacheLoader<String, String>() {
                @Override
                public @Nullable String load(@NonNull String key) {
                    return ObjectUtil.defaultIfNull(parseDictTableData(key), "");
                }
            });

    /**
     * 获取缓存值
     *
     * @param dictLabelField
     * @param dictTable
     * @param dictField
     * @param dictValue
     * @return
     */
    public static String getDictLabel(String dictLabelField, String dictTable, String dictField, String dictValue) {
        return DICT_DATA_CACHE.get(String.join(SymbolConstant.COLON, dictTable, dictField, dictValue, dictLabelField));
    }

    /**
     * 获取缓存值
     *
     * @param dictType
     * @param dictValue
     * @return
     */
    public static String getDictLabel(String dictType, String dictValue) {
        return DICT_DATA_CACHE.get(String.join(SymbolConstant.COLON, dictType, dictValue));
    }

    /**
     * 解析缓存
     *
     * @param key
     * @return
     */
    public static String parseDictTableData(String key) {
        String[] keys = key.split(SymbolConstant.COLON);
        String transVal = null;
        // material -> {tableName, tableCode, tableTarget}
        if (keys.length == 4) {
            String dictTable = keys[0];
            String dictField = keys[1];
            String dictValue = keys[2];
            String dictLabelField = keys[3];

            // 跨库
            if (dictTable.contains(SymbolConstant.DOT)) {
                List<String> databaseTable = StrUtil.split(dictTable, SymbolConstant.DOT);
                dictTable = databaseTable.get(1);
            }
            // 数据库查询
            String errorInfo = String.format("[parseDictTableData][ SELECT %s FROM %s WHERE %s = %s AND del_flag = 0 ]",
                    dictLabelField, dictTable, dictField, dictValue);
            if (Objects.nonNull(baseMapperD)) {
                try {
                    List<Map<String, Object>> maps = baseMapperD.selectDictTableData(dictLabelField, dictTable, dictField, dictValue);
                    Optional<Object> value = maps.get(0).values().stream().findFirst();
                    if (value.isPresent()) {
                        transVal = (String) value.get();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    log.error("[parseDictTableData][字典失败 ]");
                    log.error(errorInfo);
                    transVal = "";
                }
            } else {
                log.error("[parseDictTableData][字典失败]");
                log.error(errorInfo);

                transVal = "";
            }
        } else if (keys.length == 2) {
            String dictType = keys[0];
            String dictValue = keys[1];
            transVal = DictUtil.getDictLabel(dictType, dictValue);
        }

        return transVal;
    }

}
