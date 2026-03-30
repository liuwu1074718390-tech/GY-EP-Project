package com.gz.biz.material.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gz.biz.material.domain.req.MaterialSpecModelIdReq;
import com.gz.biz.material.domain.req.MaterialSpecModelPageReq;
import com.gz.biz.material.domain.req.MaterialSpecModelSaveReq;
import com.gz.biz.material.domain.vo.MaterialSpecModelVO;

public interface IMaterialSpecModelService {

    Page<MaterialSpecModelVO> pageSpecModel(MaterialSpecModelPageReq req);

    MaterialSpecModelVO getSpecModelById(MaterialSpecModelIdReq req);

    boolean saveSpecModel(MaterialSpecModelSaveReq req);

    boolean updateSpecModel(MaterialSpecModelSaveReq req);

    boolean deleteSpecModel(MaterialSpecModelIdReq req);
}
