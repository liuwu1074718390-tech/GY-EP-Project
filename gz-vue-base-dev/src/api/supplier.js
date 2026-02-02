import {
    brandData,
    regionData,
    supplierData
} from '@/views/dashboard/mockSupplierData'

/**
 * 供应商管理API (模拟本地数据处理)
 */

// 本地存储的模拟数据
let localSupplierData = [...supplierData]

// 获取品牌列表
export function getBrandList() {
    return Promise.resolve({ data: brandData })
}

// 获取地区树
export function getRegionTree() {
    return Promise.resolve({ data: regionData })
}

// 分页查询供应商列表
export function pageSupplierList(query) {
    let result = [...localSupplierData]

    // 筛选逻辑
    if (query.supplierName) {
        result = result.filter(item => item.supplierName.includes(query.supplierName))
    }
    if (query.brandName) {
        result = result.filter(item => item.brandName === query.brandName)
    }
    if (query.province) {
        result = result.filter(item => item.province === query.province)
    }
    if (query.city) {
        result = result.filter(item => item.city === query.city)
    }
    if (query.district) {
        result = result.filter(item => item.district === query.district)
    }
    if (query.contactPerson) {
        result = result.filter(item => item.contactPerson.includes(query.contactPerson))
    }
    if (query.contactPhone) {
        result = result.filter(item => item.contactPhone.includes(query.contactPhone))
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

    // 入库时间筛选
    if (query.startTime && query.endTime) {
        result = result.filter(item => {
            const createTime = new Date(item.createTime).getTime()
            const start = new Date(query.startTime).getTime()
            const end = new Date(query.endTime).getTime()
            return createTime >= start && createTime <= end
        })
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
export function getSupplierById(id) {
    const item = localSupplierData.find(i => i.id === id)
    return Promise.resolve({ data: item })
}

// 新增供应商
export function saveSupplier(data) {
    const newItem = {
        ...data,
        id: Date.now(),
        createTime: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/\//g, '-')
    }
    localSupplierData.unshift(newItem)
    return Promise.resolve({ code: 200 })
}

// 更新供应商
export function updateSupplier(data) {
    const index = localSupplierData.findIndex(i => i.id === data.id)
    if (index > -1) {
        localSupplierData[index] = { ...localSupplierData[index], ...data }
    }
    return Promise.resolve({ code: 200 })
}

// 删除供应商
export function deleteSupplier(id) {
    localSupplierData = localSupplierData.filter(i => i.id !== id)
    return Promise.resolve({ code: 200 })
}
