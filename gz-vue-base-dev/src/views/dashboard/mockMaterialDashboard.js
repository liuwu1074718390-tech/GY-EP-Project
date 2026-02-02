/**
 * 材料驾驶舱 Mock 数据
 * 专注于材料价格分析，剥离采购业务信息
 */

// ==================== 基础统计数据 ====================
export const basicStats = {
    materialCount: {
        value: 1256,
        unit: '种',
        label: '材料总数量',
        newThisMonth: 12,
        trend: 'up'
    },
    priceRecordCount: {
        value: 8637,
        unit: '条',
        label: '材价数据量',
        newThisMonth: 156,
        trend: 'up'
    },
    supplierCount: {
        value: 678,
        unit: '家',
        label: '供应商数量',
        newThisMonth: 25,
        trend: 'up'
    },
    priceAlertCount: {
        value: 23,
        unit: '项',
        label: '价格预警数',
        highRisk: 8,
        trend: 'down'
    }
}

// ==================== 中标价vs市场价偏差数据 ====================
export const priceDeviationData = {
    materials: {
        'MBR膜组器': {
            name: 'MBR膜组器',
            unit: '元/套',
            months: ['2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01'],
            bidPrice: [4500000, 4520000, 4480000, 4550000, 4580000, 4600000],
            marketPrice: [4650000, 4700000, 4720000, 4850000, 4920000, 4900000],
            deviation: [-3.2, -3.8, -5.1, -6.2, -6.9, -6.1] // 百分比
        },
        '潜污提升泵': {
            name: '潜污提升泵 (75kW)',
            unit: '元/台',
            months: ['2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01'],
            bidPrice: [31000, 31500, 31800, 32200, 32800, 33000],
            marketPrice: [33000, 34000, 34500, 35500, 36200, 35800],
            deviation: [-6.1, -7.4, -7.8, -9.3, -9.4, -7.8]
        },
        '智能流量计': {
            name: '智能电磁流量计',
            unit: '元/台',
            months: ['2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01'],
            bidPrice: [3800, 3850, 3900, 3950, 4000, 4050],
            marketPrice: [4200, 4300, 4350, 4500, 4580, 4520],
            deviation: [-9.5, -10.5, -10.3, -12.2, -12.7, -10.4]
        },
        '螺旋压榨机': {
            name: '螺旋输送压榨机',
            unit: '元/台',
            months: ['2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01'],
            bidPrice: [15000, 15200, 15500, 16000, 16500, 16800],
            marketPrice: [16500, 17200, 17800, 18500, 19200, 19000],
            deviation: [-9.1, -11.6, -12.9, -13.5, -14.1, -11.6]
        }
    },
    defaultMaterial: 'MBR膜组器'
}

// ==================== 大宗商品价格走势数据 ====================
export const commodityTrendsData = {
    months: ['2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01'],
    commodities: [
        {
            name: '螺纹钢',
            unit: '元/吨',
            prices: [3650, 3720, 3800, 3950, 4100, 4050],
            change: 11.0,
            status: 'warning'
        },
        {
            name: '水泥',
            unit: '元/吨',
            prices: [420, 425, 430, 445, 460, 455],
            change: 8.3,
            status: 'warning'
        },
        {
            name: 'PE管材',
            unit: '元/米',
            prices: [85, 88, 90, 92, 95, 94],
            change: 10.6,
            status: 'warning'
        },
        {
            name: '不锈钢管',
            unit: '元/米',
            prices: [156, 160, 158, 165, 172, 170],
            change: 9.0,
            status: 'warning'
        },
        {
            name: 'PVC管材',
            unit: '元/米',
            prices: [32, 33, 34, 35, 36, 36],
            change: 12.5,
            status: 'danger'
        },
        {
            name: 'PAC药剂',
            unit: '元/吨',
            prices: [1850, 1900, 1920, 1980, 2050, 2020],
            change: 9.2,
            status: 'warning'
        }
    ]
}

// ==================== 材料分类统计数据 ====================
export const materialCategoryData = {
    categories: [
        {
            name: '设备类',
            value: 89562000,
            percent: 57.1,
            itemCount: 256,
            subcategories: [
                { name: 'MBR膜系统', value: 45000000, percent: 50.2 },
                { name: '泵类设备', value: 18500000, percent: 20.7 },
                { name: '格栅设备', value: 12800000, percent: 14.3 },
                { name: '搅拌设备', value: 8562000, percent: 9.6 },
                { name: '电气设备', value: 4700000, percent: 5.2 }
            ]
        },
        {
            name: '材料类',
            value: 42356000,
            percent: 27.0,
            itemCount: 523,
            subcategories: [
                { name: '管材管件', value: 18600000, percent: 43.9 },
                { name: '钢材', value: 15200000, percent: 35.9 },
                { name: '水泥混凝土', value: 8556000, percent: 20.2 }
            ]
        },
        {
            name: '耗材类',
            value: 15823000,
            percent: 10.1,
            itemCount: 358,
            subcategories: [
                { name: '化学药剂', value: 6500000, percent: 41.1 },
                { name: '滤芯滤料', value: 4200000, percent: 26.5 },
                { name: '密封件', value: 2823000, percent: 17.8 },
                { name: '润滑油', value: 2300000, percent: 14.5 }
            ]
        },
        {
            name: '服务类',
            value: 9091450,
            percent: 5.8,
            itemCount: 119,
            subcategories: [
                { name: '安装服务', value: 4500000, percent: 49.5 },
                { name: '检测服务', value: 2591450, percent: 28.5 },
                { name: '维保服务', value: 2000000, percent: 22.0 }
            ]
        }
    ],
    totalAmount: 156832450
}

// ==================== 供应商量价分析数据 ====================
export const supplierAnalysisData = {
    materials: {
        'MBR膜系统': [
            { name: '碧水源', quantity: 100, unit: '套', amount: 45000000, avgPrice: 450000 },
            { name: '膜天', quantity: 65, unit: '套', amount: 28600000, avgPrice: 440000 },
            { name: '立升', quantity: 50, unit: '套', amount: 21500000, avgPrice: 430000 },
            { name: '久吾高科', quantity: 42, unit: '套', amount: 18200000, avgPrice: 433333 },
            { name: '赛诺水务', quantity: 36, unit: '套', amount: 15600000, avgPrice: 433333 },
            { name: '斯纳普', quantity: 30, unit: '套', amount: 12800000, avgPrice: 426667 },
            { name: '津膜科技', quantity: 22, unit: '套', amount: 9500000, avgPrice: 431818 },
            { name: '水拓环保', quantity: 17, unit: '套', amount: 7200000, avgPrice: 423529 }
        ],
        '泵类设备': [
            { name: '南方泵业', quantity: 235, unit: '台', amount: 18500000, avgPrice: 78723 },
            { name: '新界泵业', quantity: 186, unit: '台', amount: 14200000, avgPrice: 76344 },
            { name: '利欧股份', quantity: 158, unit: '台', amount: 11800000, avgPrice: 74684 },
            { name: '格兰富', quantity: 95, unit: '台', amount: 9500000, avgPrice: 100000 },
            { name: '威乐(Wilo)', quantity: 78, unit: '台', amount: 8200000, avgPrice: 105128 },
            { name: '沈阳水泵厂', quantity: 92, unit: '台', amount: 7600000, avgPrice: 82609 },
            { name: '长沙水泵厂', quantity: 85, unit: '台', amount: 6500000, avgPrice: 76471 }
        ],
        '钢材': [
            { name: '宝钢特钢', quantity: 2150, unit: '吨', amount: 8600000, avgPrice: 4000 },
            { name: '新兴铸管', quantity: 1800, unit: '吨', amount: 7200000, avgPrice: 4000 },
            { name: '鞍钢股份', quantity: 1500, unit: '吨', amount: 6150000, avgPrice: 4100 },
            { name: '首钢集团', quantity: 1200, unit: '吨', amount: 4920000, avgPrice: 4100 },
            { name: '沙钢集团', quantity: 1050, unit: '吨', amount: 4095000, avgPrice: 3900 }
        ],
        '管材管件': [
            { name: '永高股份', quantity: 6820, unit: '米', amount: 5800000, avgPrice: 850 },
            { name: '中国联塑', quantity: 5600, unit: '米', amount: 4760000, avgPrice: 850 },
            { name: '伟星新材', quantity: 4200, unit: '米', amount: 3570000, avgPrice: 850 },
            { name: '公元股份', quantity: 3800, unit: '米', amount: 3230000, avgPrice: 850 },
            { name: '顾地科技', quantity: 2900, unit: '米', amount: 2465000, avgPrice: 850 }
        ]
    },
    defaultMaterial: 'MBR膜系统'
}

// 格式化金额
export function formatAmount(value) {
    return (value / 10000).toFixed(2)
}

// 格式化数量
export function formatQuantity(value) {
    if (value >= 10000) {
        return (value / 10000).toFixed(1) + '万'
    }
    return value.toString()
}
