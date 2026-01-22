package com.gz.biz.demo.controller;

import com.gz.framework.web.controller.common.BaseController;
import com.gz.framework.web.domain.vo.BooleanVO;
import com.gz.framework.web.domain.vo.IntegerVO;
import com.gz.framework.web.domain.vo.MapVO;
import com.gz.framework.web.domain.vo.StringVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * demo模块/返回值示例接口
 *
 * @author gz
 * @date 2024-10-12
 */
@Slf4j
@RestController
@RequestMapping("/demo/return")
public class ReturnDemoController extends BaseController {

    /**
     * 方法返回 BooleanVO
     */
    @PostMapping("/booleanVO")
    public BooleanVO booleanVO() {
        return new BooleanVO(false);
    }

    /**
     * 方法返回 IntegerVO
     */
    @PostMapping("/integerVO")
    public IntegerVO integerVO() {
        return new IntegerVO(123);
    }

    /**
     * 方法返回 StringVO
     */
    @PostMapping("/stringVO")
    public StringVO stringVO() {
        return new StringVO("ok");
    }

    /**
     * 方法返回 List<StringVO>
     */
    @PostMapping("/stringListVO")
    public List<StringVO> stringListVO() {
        List<StringVO> list = new ArrayList<>();
        list.add(new StringVO("ok"));
        list.add(new StringVO("yes"));
        return list;
    }

    /**
     * 方法返回 MapVO
     */
    @PostMapping("/map11")
    public MapVO map11() {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "11");
        map.put("key2", "22");
        return new MapVO(map);
    }

    /**
     * 方法返回 void
     */
    @PostMapping("/void1")
    public void void1() {
        return;
    }

}
