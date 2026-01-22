import {
    categoryData,
    specData,
    unitData,
    materialStandardData
} from '@/views/dashboard/mockStandardData'

/**
 * 材料标准管理API (模拟本地数据处理)
 */

// 获取材料分类树
export function getCategoryTree() {
    return Promise.resolve({ data: categoryData })
}

// 获取规格型号列表
export function getSpecList() {
    return Promise.resolve({ data: specData })
}

// 获取计量单位列表
export function getUnitList() {
    return Promise.resolve({ data: unitData })
}

// 本地存储的模拟数据（由于在页面演示，使用 materialStandardData 作为初始值）
let localMaterialData = [...materialStandardData]

// 分页查询材料标准列表
export function pageMaterialStandard(query) {
    let result = [...localMaterialData]

    // 简单过滤逻辑
    if (query.materialName) {
        result = result.filter(item => item.materialName.includes(query.materialName))
    }
    if (query.materialCode) {
        result = result.filter(item => item.materialCode.includes(query.materialCode))
    }
    if (query.categoryLevel1Id) {
        result = result.filter(item => item.categoryLevel1Id === query.categoryLevel1Id)
    }
    if (query.categoryLevel2Id) {
        result = result.filter(item => item.categoryLevel2Id === query.categoryLevel2Id)
    }
    if (query.categoryLevel3Id) {
        result = result.filter(item => item.categoryLevel3Id === query.categoryLevel3Id)
    }
    if (query.specId) {
        result = result.filter(item => item.specId === query.specId)
    }
    if (query.unitId) {
        result = result.filter(item => item.unitId === query.unitId)
    }

    const pageNum = query.pageNum || 1
    const pageSize = query.pageSize || 20
    const start = (pageNum - 1) * pageSize
    const end = start + pageSize

    return Promise.resolve({
        records: result.slice(start, end),
        total: result.length
    })
}

// 根据ID查询详情
export function getMaterialStandardById(id) {
    const item = localMaterialData.find(i => i.id === id)
    return Promise.resolve({ data: item })
}

// 新增
export function saveMaterialStandard(data) {
    const newItem = { ...data, id: Date.now() }
    localMaterialData.unshift(newItem)
    return Promise.resolve({ code: 200 })
}

// 更新
export function updateMaterialStandard(data) {
    const index = localMaterialData.findIndex(i => i.id === data.id)
    if (index > -1) {
        localMaterialData[index] = { ...localMaterialData[index], ...data }
    }
    return Promise.resolve({ code: 200 })
}

// 删除
export function deleteMaterialStandard(id) {
    localMaterialData = localMaterialData.filter(i => i.id !== id)
    return Promise.resolve({ code: 200 })
}
