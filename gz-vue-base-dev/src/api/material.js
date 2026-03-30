import request from '@/services/request'

/**
 * 材料标准管理API
 */
const unwrap = (res) => (res && Object.prototype.hasOwnProperty.call(res, 'data') ? res.data : res)

// 获取材料分类树
export function getCategoryTree() {
    return request({
        url: '/material/standard/categoryTree',
        method: 'post'
    }).then(unwrap)
}

// 获取规格型号列表
export function getSpecList() {
    return request({
        url: '/material/standard/specList',
        method: 'post'
    }).then(unwrap)
}

// 获取计量单位列表
export function getUnitList() {
    return request({
        url: '/material/standard/unitList',
        method: 'post'
    }).then(unwrap)
}

// 分页查询材料标准列表
export function pageMaterialStandard(query) {
    return request({
        url: '/material/standard/page',
        method: 'post',
        data: query
    }).then(unwrap)
}

// 根据ID查询详情
export function getMaterialStandardById(id) {
    return request({
        url: '/material/standard/getById',
        method: 'post',
        data: { id }
    }).then(unwrap)
}

// 新增
export function saveMaterialStandard(data) {
    return request({
        url: '/material/standard/save',
        method: 'post',
        data
    })
}

// 更新
export function updateMaterialStandard(data) {
    return request({
        url: '/material/standard/update',
        method: 'post',
        data
    })
}

// 删除
export function deleteMaterialStandard(id) {
    return request({
        url: '/material/standard/delete',
        method: 'post',
        data: { id }
    })
}

/**
 * 标准规格型号维护API
 */
export function pageSpecModel(query) {
    return request({
        url: '/material/standard/specModel/page',
        method: 'post',
        data: query
    }).then(unwrap)
}

export function getSpecModelById(id) {
    return request({
        url: '/material/standard/specModel/getById',
        method: 'post',
        data: { id }
    }).then(unwrap)
}

export function saveSpecModel(data) {
    return request({
        url: '/material/standard/specModel/save',
        method: 'post',
        data
    })
}

export function updateSpecModel(data) {
    return request({
        url: '/material/standard/specModel/update',
        method: 'post',
        data
    })
}

export function deleteSpecModel(id) {
    return request({
        url: '/material/standard/specModel/delete',
        method: 'post',
        data: { id }
    })
}

/**
 * 标准单位库维护API
 */
export function pageUnitLibrary(query) {
    return request({
        url: '/material/standard/unit/page',
        method: 'post',
        data: query
    }).then(unwrap)
}

export function saveUnitLibrary(data) {
    return request({
        url: '/material/standard/unit/save',
        method: 'post',
        data
    })
}

export function updateUnitLibrary(data) {
    return request({
        url: '/material/standard/unit/update',
        method: 'post',
        data
    })
}

export function deleteUnitLibrary(id) {
    return request({
        url: '/material/standard/unit/delete',
        method: 'post',
        data: { id }
    })
}

/**
 * 标准工艺段维护API
 */
export function pageProcessSegment(query) {
    return request({
        url: '/material/standard/processSegment/page',
        method: 'post',
        data: query
    }).then(unwrap)
}

export function saveProcessSegment(data) {
    return request({
        url: '/material/standard/processSegment/save',
        method: 'post',
        data
    })
}

export function updateProcessSegment(data) {
    return request({
        url: '/material/standard/processSegment/update',
        method: 'post',
        data
    })
}

export function deleteProcessSegment(id) {
    return request({
        url: '/material/standard/processSegment/delete',
        method: 'post',
        data: { id }
    })
}

/**
 * 同步标准材料知识库（覆盖）
 */
export function syncMaterialKnowledge() {
    return request({
        url: '/material/standard/knowledge/sync',
        method: 'post'
    }).then(unwrap)
}
