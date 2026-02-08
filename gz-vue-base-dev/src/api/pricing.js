import {
    pricingTaskList,
    pricingMaterialList,
    matchedPricesMap,
    TASK_STATUS
} from '@/views/dashboard/mockPricingData'

/**
 * 智能组价API (模拟本地数据处理)
 */

// 本地存储的任务数据
let localTaskList = [...pricingTaskList]
let localMaterialList = [...pricingMaterialList]

/**
 * 获取组价任务列表
 * @param {Object} query - 查询参数
 * @param {String} query.taskName - 任务名称
 * @param {String} query.creator - 创建人
 * @param {String} query.createTimeStart - 创建时间开始
 * @param {String} query.createTimeEnd - 创建时间结束
 * @param {String} query.status - 状态
 * @param {Number} query.userId - 当前用户ID
 * @param {String} query.userRole - 用户角色 (admin/user)
 * @param {Number} query.pageNum - 页码
 * @param {Number} query.pageSize - 每页条数
 */
export function getPricingTaskList(query) {
    let result = [...localTaskList]

    // 权限控制:普通用户只能看到自己创建的任务
    if (query.userRole !== 'admin' && query.userId) {
        result = result.filter(item => item.userId === query.userId)
    }

    // 筛选条件
    if (query.taskName) {
        result = result.filter(item => item.taskName.includes(query.taskName))
    }
    if (query.creator) {
        result = result.filter(item => item.creator.includes(query.creator))
    }
    if (query.status) {
        result = result.filter(item => item.status === query.status)
    }
    if (query.createTimeStart) {
        result = result.filter(item => item.createTime >= query.createTimeStart)
    }
    if (query.createTimeEnd) {
        result = result.filter(item => item.createTime <= query.createTimeEnd)
    }

    // 按创建时间倒序排列
    result.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))

    // 分页
    const pageNum = query.pageNum || 1
    const pageSize = query.pageSize || 10
    const start = (pageNum - 1) * pageSize
    const end = start + pageSize

    return Promise.resolve({
        records: result.slice(start, end),
        total: result.length
    })
}

/**
 * 创建组价任务
 * @param {Object} data - 任务数据
 * @param {String} data.taskName - 任务名称
 * @param {Array} data.materials - 待组价材料列表
 * @param {Number} data.userId - 创建用户ID
 * @param {String} data.creator - 创建人姓名
 */
export function createPricingTask(data) {
    const newTask = {
        id: Date.now(),
        taskName: data.taskName,
        materialCount: data.materials.length,
        pricedCount: 0,
        creator: data.creator,
        createTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        status: TASK_STATUS.PENDING,
        status: TASK_STATUS.PENDING,
        failReason: null,
        userId: data.userId,
        pricingMethod: data.pricingMethod || 'trimmed_mean'
    }

    localTaskList.unshift(newTask)

    // 保存待组价材料数据
    const newMaterials = data.materials.map((material, index) => ({
        id: Date.now() + index,
        taskId: newTask.id,
        序号: material.序号 || index + 1,
        材料名称: material.材料名称,
        规格型号: material.规格型号,
        单位: material.单位,
        数量: material.数量,
        含税单价: null,
        含税总价: null,
        品牌: material.品牌 || '',
        备注: material.备注 || '',
        matchedPriceId: null
    }))

    localMaterialList.push(...newMaterials)

    // 模拟后端自动触发组价流程
    setTimeout(() => {
        simulateAutoPricing(newTask.id)
    }, 1000)

    return Promise.resolve({ code: 200, data: newTask })
}

/**
 * 模拟自动组价流程 (后端会自动调用)
 */
function simulateAutoPricing(taskId) {
    const task = localTaskList.find(t => t.id === taskId)
    if (!task) return

    // 更新任务状态为"组价中"
    task.status = TASK_STATUS.PROCESSING

    // 模拟匹配过程
    const materials = localMaterialList.filter(m => m.taskId === taskId)
    let successCount = 0

    materials.forEach(material => {
        // 80%的材料能匹配成功
        const canMatch = Math.random() > 0.2

        if (canMatch) {
            // 获取匹配结果列表
            const matchedList = matchedPricesMap[material.id % 5 + 1] || []

            if (matchedList.length > 0) {
                // 根据取价方式计算价格
                const result = calculatePrice(matchedList, task.pricingMethod)

                material.含税单价 = result.price
                material.含税总价 = (material.含税单价 * material.数量).toFixed(2)
                material.品牌 = result.brand
                material.matchedPriceId = result.id
                successCount++
            }
        }
    })

    task.pricedCount = successCount

    // 根据匹配率更新任务状态
    if (successCount === materials.length) {
        task.status = TASK_STATUS.COMPLETED
    } else if (successCount < materials.length * 0.7) {
        task.status = TASK_STATUS.FAILED
        task.failReason = `部分材料在材价库中无匹配记录,匹配率仅${((successCount / materials.length) * 100).toFixed(1)}%`
    }
}

/**
 * 删除组价任务
 * @param {Number} id - 任务ID
 */
export function deletePricingTask(id) {
    localTaskList = localTaskList.filter(item => item.id !== Number(id))
    localMaterialList = localMaterialList.filter(item => item.taskId !== Number(id))
    return Promise.resolve({ code: 200 })
}

/**
 * 获取组价任务详情
 * @param {Number} id - 任务ID
 */
export function getPricingTaskDetail(id) {
    const task = localTaskList.find(item => item.id === Number(id))
    const materials = localMaterialList.filter(item => item.taskId === Number(id))

    return Promise.resolve({
        data: {
            task,
            materials
        }
    })
}

/**
 * 获取材料的匹配材价列表
 * @param {Number} materialId - 材料ID
 */
export function getMatchedPrices(materialId) {
    // 查找该材料在本地数据中的状态
    const material = localMaterialList.find(m => m.id === Number(materialId))

    // 如果材料不存在，或者该材料目前处于"未匹配"状态（单价为空），则不返回推荐结果
    // 这是为了修复用户反馈的：未匹配材料仍然显示推荐结果的问题
    if (!material || material.含税单价 === null) {
        return Promise.resolve({
            data: []
        })
    }

    // 只获取匹配的结果
    const mockData = matchedPricesMap[materialId] || []

    return Promise.resolve({
        data: [...mockData]
    })
}

/**
 * 更新材料的组价结果
 * @param {Number} taskId - 任务ID
 * @param {Number} materialId - 材料ID
 * @param {Object} priceData - 价格数据
 */
export function updateMaterialPrice(taskId, materialId, priceData) {
    const material = localMaterialList.find(m => m.taskId === Number(taskId) && m.id === Number(materialId))

    if (material) {
        material.含税单价 = priceData.priceIncludingTax
        material.含税总价 = (material.含税单价 * material.数量).toFixed(2)
        material.品牌 = priceData.brand
        material.matchedPriceId = priceData.id
    }

    return Promise.resolve({ code: 200 })
}

/**
 * 移除材料的匹配结果
 * @param {Number} taskId - 任务ID
 * @param {Number} materialId - 材料ID
 */
export function removeMaterialPrice(taskId, materialId) {
    const material = localMaterialList.find(m => m.taskId === Number(taskId) && m.id === Number(materialId))

    if (material) {
        material.含税单价 = null
        material.含税总价 = null
        material.matchedPriceId = null
    }

    return Promise.resolve({ code: 200 })
}

/**
 * 更新任务取价方式 (并重新计算所有材料价格)
 * @param {Number} taskId - 任务ID
 * @param {String} method - 取价方式 (average/lowest/highest)
 */
export function updateTaskPricingMethod(taskId, method) {
    const task = localTaskList.find(t => t.id === Number(taskId))
    if (!task) return Promise.reject('任务不存在')

    task.pricingMethod = method

    // 重新计算该任务下所有材料的价格
    const materials = localMaterialList.filter(m => m.taskId === Number(taskId))

    materials.forEach(material => {
        // 获取匹配列表 (优先精准匹配)
        const matchedList = matchedPricesMap[material.id] || matchedPricesMap[material.id % 5 + 1] || []

        if (matchedList.length > 0) {
            const result = calculatePrice(matchedList, method)

            material.含税单价 = result.price
            material.含税总价 = (material.含税单价 * material.数量).toFixed(2)
            material.品牌 = result.brand
            material.matchedPriceId = result.id
        }
    })

    return Promise.resolve({ code: 200 })
}

/**
 * 根据取价方式计算价格
 * @param {Array} prices - 价格列表
 * @param {String} method - 取价方式
 */
function calculatePrice(prices, method) {
    if (!prices || prices.length === 0) return { price: 0, brand: '', id: null }

    // 深拷贝并按价格排序
    const sortedPrices = [...prices].sort((a, b) => Number(a.priceIncludingTax) - Number(b.priceIncludingTax))

    let selectedAdd = null

    switch (method) {
        case 'lowest':
            selectedAdd = sortedPrices[0]
            break
        case 'highest':
            selectedAdd = sortedPrices[sortedPrices.length - 1]
            break
        case 'trimmed_mean': {
            if (sortedPrices.length > 2) {
                const trimmed = sortedPrices.slice(1, -1)
                // 计算去极值后的平均值 (确保数值运算)
                const total = trimmed.reduce((sum, item) => sum + Number(item.priceIncludingTax), 0)
                const avg = total / trimmed.length
                // 找最接近去极值平均值的(在所有报价中找)
                selectedAdd = sortedPrices.reduce((prev, curr) => {
                    const currDiff = Math.abs(Number(curr.priceIncludingTax) - avg)
                    const prevDiff = Math.abs(Number(prev.priceIncludingTax) - avg)
                    return (currDiff < prevDiff ? curr : prev)
                })
                break
            }
        }
        // fallthrough
        case 'average':
        default:
            // 平均价逻辑 (确保数值运算)
            const total = sortedPrices.reduce((sum, item) => sum + Number(item.priceIncludingTax), 0)
            const avg = total / sortedPrices.length
            // 找最接近平均值的
            selectedAdd = sortedPrices.reduce((prev, curr) => {
                const currDiff = Math.abs(Number(curr.priceIncludingTax) - avg)
                const prevDiff = Math.abs(Number(prev.priceIncludingTax) - avg)
                return (currDiff < prevDiff ? curr : prev)
            })
            break
    }

    return {
        price: selectedAdd.priceIncludingTax,
        brand: selectedAdd.brand,
        id: selectedAdd.id
    }
}
