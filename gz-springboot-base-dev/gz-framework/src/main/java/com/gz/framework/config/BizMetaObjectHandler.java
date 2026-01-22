package com.gz.framework.config;

import cn.hutool.core.date.DateUtil;
import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.gz.common.constant.Constant;
import com.gz.framework.web.domain.dto.LoginUserDTO;
import com.gz.framework.util.SecurityUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * @author damin
 * @description mybatis-plus自定义元数据对象处理器
 * @create 2023-05-08
 **/
@Component
@Slf4j
public class BizMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        LoginUserDTO loginUserDTO = SecurityUtil.getLoginUserAllowNull();

        if (hasName("createTime", metaObject) && Objects.isNull(metaObject.getValue("createTime"))) {
            metaObject.setValue("createTime", DateUtil.date());
        }

        if (loginUserDTO != null) {
            if (hasName("createBy", metaObject) && Objects.isNull(metaObject.getValue("createBy"))) {
                metaObject.setValue("createBy", loginUserDTO.getUserId());
            }
            if (hasName("createName", metaObject) && Objects.isNull(metaObject.getValue("createName"))) {
                metaObject.setValue("createName", loginUserDTO.getUsername());
            }

        } else {
            if (hasName("createBy", metaObject) && Objects.isNull(metaObject.getValue("createBy"))) {
                metaObject.setValue("createBy", Constant.VISITOR_ID);
            }
            if (hasName("createName", metaObject) && Objects.isNull(metaObject.getValue("createName"))) {
                metaObject.setValue("createName", Constant.VISITOR_NAME);
            }
        }
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        LoginUserDTO loginUserDTO = SecurityUtil.getLoginUserAllowNull();

        // 更新时间无论何时都应该被赋值
        if (hasName("updateTime", metaObject)) {
            metaObject.setValue("updateTime", DateUtil.date());
        }

        if (loginUserDTO != null) {
            if (hasName("updateBy", metaObject) && Objects.isNull(metaObject.getValue("updateBy"))) {
                metaObject.setValue("updateBy", loginUserDTO.getUserId());
            }
            if (hasName("updateName", metaObject) && Objects.isNull(metaObject.getValue("updateName"))) {
                metaObject.setValue("updateName", loginUserDTO.getUsername());
            }
        } else {
            if (hasName("updateBy", metaObject) && Objects.isNull(metaObject.getValue("updateBy"))) {
                metaObject.setValue("updateBy", Constant.VISITOR_ID);
            }
            if (hasName("updateName", metaObject) && Objects.isNull(metaObject.getValue("updateName"))) {
                metaObject.setValue("updateName", Constant.VISITOR_NAME);
            }
        }
    }

    /**
     * 判断是否有该属性
     *
     * @param name
     * @param metaObject
     * @return
     */
    public boolean hasName(String name, MetaObject metaObject) {
        try {
            metaObject.getValue(name);
            return true;
        } catch (Exception e) {
            log.warn("获取{}属性值失败", name, e);
            return false;
        }
    }
}
