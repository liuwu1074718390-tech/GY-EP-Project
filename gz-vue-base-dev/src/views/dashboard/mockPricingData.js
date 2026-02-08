// 智能组价模块 Mock 数据
// 用于智能组价功能演示

// 任务状态枚举
export const TASK_STATUS = {
    PENDING: 'pending',       // 待开始
    PROCESSING: 'processing', // 组价中
    COMPLETED: 'completed',   // 组价完成
    FAILED: 'failed'          // 组价失败
}

// 任务状态显示映射
export const TASK_STATUS_MAP = {
    pending: { label: '待开始', type: 'info' },
    processing: { label: '组价中', type: 'warning' },
    completed: { label: '组价完成', type: 'success' },
    failed: { label: '组价失败', type: 'danger' }
}

// 辅助函数：生成水务材料名
const WATER_MATERIALS = [
    '离心混流泵', '一体化预制泵站', '软密封闸阀', '倒流防止器', '电磁流量计',
    '球墨铸铁给水管', 'PE100给水管', '变频控制柜', '次氯酸钠发生器', '超声波液位计',
    '不锈钢潜水泵', '双偏心蝶阀', '微机控制变频供水设备', '溶气气浮机', '污泥压滤机',
    '二氧化氯发生器', '旋转式格栅除污机', '不锈钢水箱', '多参数水质监测仪', '液压水位控制阀'
];

const BRANDS = ['凯泉', '联塑', '新兴铸管', '施耐德', '远大', '东方泵业', '科隆', '威乐'];

/**
 * 生成材料数据
 * @param {Number} taskId 
 * @param {Number} count 
 * @param {Number} startId 
 * @param {Boolean} forceEmpty 是否强制全部未匹配
 */
const generateMaterials = (taskId, count, startId, forceEmpty = false) => {
    return Array.from({ length: count }, (_, i) => {
        const materialName = WATER_MATERIALS[i % WATER_MATERIALS.length];
        // 模拟部分已匹配逻辑: 仅在非强制为空时，70%概率有价格
        const isPriced = forceEmpty ? false : (Math.random() > 0.3);
        const price = isPriced ? (1000 + Math.random() * 9000).toFixed(2) : null;

        return {
            id: startId + i,
            taskId,
            序号: i + 1,
            材料名称: materialName,
            规格型号: `SW-${100 + i}型 DN${(i + 4) * 50}`,
            单位: i % 3 === 0 ? '台' : (i % 3 === 1 ? '米' : '套'),
            数量: Math.floor(Math.random() * 100) + 1,
            含税单价: price,
            含税总价: price ? (price * (Math.floor(Math.random() * 10) + 1)).toFixed(2) : null,
            品牌: isPriced ? BRANDS[i % BRANDS.length] : '',
            备注: i % 5 === 0 ? '紧急采购' : '',
            matchedPriceId: isPriced ? (startId + 1000 + i) : null
        };
    });
};

// 2. 生成待组价材料明细数据 (先生成，后统计)
const m1 = generateMaterials(1, 12, 100, true); // 待开始：全部空
const m2 = generateMaterials(2, 15, 200);       // 组价中(部分匹配)
const m3 = generateMaterials(3, 10, 300, true); // 失败：全部空
const m4 = generateMaterials(4, 16, 400);       // 执行用户特定逻辑
// 修正 m4 逻辑：前 4 条已匹配
m4.forEach((m, idx) => {
    if (idx < 4) {
        m.含税单价 = 3200;
        m.品牌 = '科隆';
        m.matchedPriceId = 4000 + idx;
        m.含税总价 = (3200 * m.数量).toFixed(2);
    } else {
        m.含税单价 = null;
        m.品牌 = '';
        m.matchedPriceId = null;
        m.含税总价 = null;
    }
});
const m5 = generateMaterials(5, 14, 500);       // 组价完成(强制填满)
m5.forEach(m => {
    if (!m.含税单价) {
        m.含税单价 = 1500;
        m.品牌 = '施耐德';
        m.matchedPriceId = 9999;
        m.含税总价 = (1500 * m.数量).toFixed(2);
    }
});

export const pricingMaterialList = [...m1, ...m2, ...m3, ...m4, ...m5];

// 辅助函数：根据材料清单动态计算分子
const getPricedCount = (taskId) => {
    return pricingMaterialList.filter(m => m.taskId === taskId && m.含税单价 !== null).length;
};

// 1. 组价任务列表数据 (分子通过 getPricedCount 实时计算)
export const pricingTaskList = [
    {
        id: 1,
        taskName: '市政供水管网改造主材组价',
        materialCount: 12,
        get pricedCount() { return getPricedCount(1) },
        creator: '张三',
        createTime: '2026-02-05 14:30:00',
        status: TASK_STATUS.PENDING,
        failReason: null,
        userId: 1001,
        pricingMethod: 'average'
    },
    {
        id: 2,
        taskName: '南站水厂二期设备采购组价',
        materialCount: 15,
        get pricedCount() { return getPricedCount(2) },
        creator: '李四',
        createTime: '2026-02-05 10:15:00',
        // 如果已匹配数小于总数，则应为 PROCESSING 而非 COMPLETED
        get status() { return this.pricedCount === this.materialCount ? TASK_STATUS.COMPLETED : TASK_STATUS.PROCESSING },
        failReason: null,
        userId: 1002,
        pricingMethod: 'average'
    },
    {
        id: 3,
        taskName: '污水泵站自动化控制及阀门组价',
        materialCount: 10,
        get pricedCount() { return getPricedCount(3) },
        creator: '王五',
        createTime: '2026-02-04 16:45:00',
        status: TASK_STATUS.FAILED,
        failReason: '核心组价引擎连接超时 (ETIMEDOUT)，请检查网络连接或稍后重试',
        userId: 1003,
        pricingMethod: 'average'
    },
    {
        id: 4,
        taskName: '智慧水务流量仪表批量组价',
        materialCount: 16,
        get pricedCount() { return getPricedCount(4) },
        creator: '张三',
        createTime: '2026-02-04 09:20:00',
        status: TASK_STATUS.PROCESSING,
        failReason: null,
        userId: 1001,
        pricingMethod: 'average'
    },
    {
        id: 5,
        taskName: '原水泵站潜水泵组及附件组价',
        materialCount: 14,
        get pricedCount() { return getPricedCount(5) },
        creator: '赵六',
        createTime: '2026-02-03 13:10:00',
        status: TASK_STATUS.COMPLETED,
        failReason: null,
        userId: 1004,
        pricingMethod: 'average'
    }
];

// 3. 材价匹配结果数据 (Mock 推荐逻辑)
export const matchedPricesMap = {};
pricingMaterialList.forEach(m => {
    // 只有当材料本身已匹配（有含税单价）时，才提供推荐的材价数据
    // 修复：未匹配的材料不应显示系统推荐结果
    if (m.含税单价 !== null) {
        matchedPricesMap[m.id] = [
            {
                id: m.id + 1000,
                materialName: m.材料名称,
                specification: m.规格型号,
                brand: m.品牌 || BRANDS[m.id % BRANDS.length],
                unit: m.单位,
                priceType: '中标价',
                priceIncludingTax: m.含税单价, // 推荐结果应包含实际选中的那个
                purchaseTime: '2026-01',
                supplierCompany: '广东精密水务设备有限公司',
                sourceProject: '珠江水系治理二期工程',
                quantity: 1
            },
            {
                id: m.id + 2000,
                materialName: m.材料名称,
                specification: m.规格型号,
                brand: BRANDS[(m.id + 1) % BRANDS.length],
                unit: m.单位,
                priceType: '市场价',
                priceIncludingTax: (Number(m.含税单价) * 1.05).toFixed(2),
                purchaseTime: '2026-01',
                supplierCompany: '上海沪工阀门厂',
                sourceProject: '南站水厂建设项目',
                quantity: 1
            }
        ];
    } else {
        matchedPricesMap[m.id] = [];
    }
});

