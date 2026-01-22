package com.gz.framework.util.dict;

import com.github.benmanes.caffeine.cache.*;

import java.time.Duration;

/**
 * 本地缓存工具类
 *
 * @author gz
 * @date 2024-08-15
 */
public class CaffeineCache {

    /**
     * 创建缓存
     *
     * @param duration
     * @param loader
     * @param <K>
     * @param <V>
     * @return
     */
    public static <K, V> LoadingCache<K, V> buildAsynReloadingCache(Duration duration, Long maxSize, CacheLoader<K, V> loader) {
        if (maxSize != null) {
            return Caffeine.newBuilder().initialCapacity(200).refreshAfterWrite(duration).maximumSize(maxSize)
                    .scheduler(Scheduler.systemScheduler()).build(loader);
        } else {
            return Caffeine.newBuilder().initialCapacity(200).refreshAfterWrite(duration)
                    .scheduler(Scheduler.systemScheduler()).build(loader);
        }
    }

    /**
     * 创建缓存
     *
     * @param duration
     * @param
     * @param <K>
     * @param <V>
     * @return
     */
    public static <K, V> Cache<K, V> buildReloadingCache(Duration duration, Long maxSize) {
        if (maxSize != null) {
            return Caffeine.newBuilder().initialCapacity(200).refreshAfterWrite(duration).maximumSize(maxSize)
                    .scheduler(Scheduler.systemScheduler()).build();
        } else {
            return Caffeine.newBuilder().initialCapacity(200).refreshAfterWrite(duration)
                    .scheduler(Scheduler.systemScheduler()).build();
        }
    }

}
