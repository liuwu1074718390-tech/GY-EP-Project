// 模拟材料价格数据 - 基于南站水厂实际设备信息生成
// 用于材价查询功能演示

// 辅助函数：生成随机日期
const randomDate = () => {
    const year = 2024 + Math.floor(Math.random() * 2) // 2024-2025
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
    return `${year}-${month}`
}

// 辅助函数：随机选择
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)]

// 来源项目池
const sourceProjects = [
    '南站水厂项目',
    '环城北水厂工程',
    '洛溪水厂首期',
    '中部大龙水厂',
    '市政管网改造工程',
    '污水处理厂扩建项目'
]

// 报价企业池
const suppliers = [
    '广州水务机电设备有限公司',
    '深圳市环保工程设备公司',
    '格兰富水泵(中国)有限公司',
    '赛莱默(中国)有限公司',
    '威立雅水务技术(上海)有限公司',
    '苏州纳诺环保科技有限公司',
    '北京碧水源科技股份有限公司',
    '杭州求是膜技术有限公司',
    '上海凯泉泵业集团有限公司',
    '佛山市水泵厂有限公司'
]

// 品牌池
const brands = [
    '格兰富', '威乐', '凯泉', '连成', '南方泵业',
    '赛莱默', '苏尔寿', 'KSB', 'ABB', '西门子',
    '施耐德', '丹佛斯', '碧水源', '久保田', '东丽'
]

// 材料价格数据（基于Excel真实设备信息）
export const materialPriceData = [
    {
        id: 1,
        materialName: '提升水泵',
        specification: '潜污泵,Q=2083m³/h,H=9.5m,N=75kW,带变频控制、导轨及自耦系统',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 6,
        priceExcludingTax: 128000,
        taxRate: 13,
        priceIncludingTax: 144640,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 2,
        materialName: '提升水泵',
        specification: '潜污泵,Q=1041m³/h,H=9.5m,N=37kW,带变频控制、导轨及自耦系统',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 3,
        priceExcludingTax: 68000,
        taxRate: 13,
        priceIncludingTax: 76840,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 3,
        materialName: '螺旋压榨机',
        specification: '过滤精度3mm,N=2.2kW',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 4,
        priceExcludingTax: 45000,
        taxRate: 13,
        priceIncludingTax: 50850,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 4,
        materialName: '冲洗泵组',
        specification: '立式多级泵组,单泵Q=8m³/h,H=81m,N=3kW,带变频控制、进口过滤器',
        unit: '套',
        brand: randomChoice(brands),
        quantity: 2,
        priceExcludingTax: 32000,
        taxRate: 13,
        priceIncludingTax: 36160,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 5,
        materialName: '螺旋压榨机',
        specification: '过滤精度2mm,N=3kW',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 8,
        priceExcludingTax: 52000,
        taxRate: 13,
        priceIncludingTax: 58760,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 6,
        materialName: '恒压冲洗泵组',
        specification: '立式多级泵组,单泵Q=30m³/h,H=80m,N=11kW,带变频控制、进口过滤器',
        unit: '套',
        brand: randomChoice(brands),
        quantity: 4,
        priceExcludingTax: 58000,
        taxRate: 13,
        priceIncludingTax: 65540,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 7,
        materialName: '厌氧搅拌器',
        specification: '不锈钢立式搅拌器,D=4m,N=4kW,带变频控制',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 12,
        priceExcludingTax: 28000,
        taxRate: 13,
        priceIncludingTax: 31640,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 8,
        materialName: '缺氧搅拌器',
        specification: '不锈钢立式搅拌器,D=4.2m,N=7.5kW,带变频控制',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 10,
        priceExcludingTax: 35000,
        taxRate: 13,
        priceIncludingTax: 39550,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 9,
        materialName: '缺氧推流器',
        specification: '不锈钢低速推流器,N=15kW',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 8,
        priceExcludingTax: 42000,
        taxRate: 13,
        priceIncludingTax: 47460,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 10,
        materialName: 'MBR膜组器系统',
        specification: 'PVDF中空纤维膜组器,单渠道出水量Q≥9375m³/d,组器框架不锈钢材质',
        unit: '套',
        brand: randomChoice(['碧水源', '东丽', '久保田', '威立雅']),
        quantity: 2,
        priceExcludingTax: 3200000,
        taxRate: 13,
        priceIncludingTax: 3616000,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 11,
        materialName: '进水闸门',
        specification: '不锈钢附壁方闸门,B×H=1000×1000mm,N=0.75kW,带手电一体启闭机',
        unit: '套',
        brand: randomChoice(brands),
        quantity: 16,
        priceExcludingTax: 8500,
        taxRate: 13,
        priceIncludingTax: 9605,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 12,
        materialName: '出水闸门',
        specification: '不锈钢附壁方闸门,B×H=1000×1000mm,N=0.75kW,带手电一体启闭机',
        unit: '套',
        brand: randomChoice(brands),
        quantity: 16,
        priceExcludingTax: 8500,
        taxRate: 13,
        priceIncludingTax: 9605,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 13,
        materialName: '电动葫芦',
        specification: '起重量5T,起吊高度12m,行程约340m,N=0.8×2+7.5kW',
        unit: '套',
        brand: randomChoice(brands),
        quantity: 2,
        priceExcludingTax: 125000,
        taxRate: 13,
        priceIncludingTax: 141250,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 14,
        materialName: '产水专用设备',
        specification: 'Φ500×1100mm,SS316材质,每套含2个音叉液位计',
        unit: '套',
        brand: randomChoice(brands),
        quantity: 8,
        priceExcludingTax: 28000,
        taxRate: 13,
        priceIncludingTax: 31640,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 15,
        materialName: 'CIP泵',
        specification: '卧式离心泵,Q=251m³/h,H=12m,N=15kW,带变频控制',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 4,
        priceExcludingTax: 38000,
        taxRate: 13,
        priceIncludingTax: 42940,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 16,
        materialName: '液环真空泵',
        specification: 'Q=165m³/h,最大真空度84%,N=4kW',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 4,
        priceExcludingTax: 22000,
        taxRate: 13,
        priceIncludingTax: 24860,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 17,
        materialName: '气水分离罐',
        specification: 'V=0.12m³,φ500×780mm',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 8,
        priceExcludingTax: 6500,
        taxRate: 13,
        priceIncludingTax: 7345,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 18,
        materialName: '剩余污泥泵',
        specification: '无堵塞卧式离心泵,Q=65m³/h,H=20m,N=11kW',
        unit: '台',
        brand: randomChoice(brands),
        quantity: 6,
        priceExcludingTax: 28000,
        taxRate: 13,
        priceIncludingTax: 31640,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 19,
        materialName: '手动对夹式蝶阀',
        specification: 'DN300,1.0MPa,阀板:铸铁',
        unit: '个',
        brand: randomChoice(brands),
        quantity: 32,
        priceExcludingTax: 1200,
        taxRate: 13,
        priceIncludingTax: 1356,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 20,
        materialName: '手动对夹式蝶阀',
        specification: 'DN250,1.0MPa,阀体阀板:UPVC',
        unit: '个',
        brand: randomChoice(brands),
        quantity: 48,
        priceExcludingTax: 980,
        taxRate: 13,
        priceIncludingTax: 1107,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 21,
        materialName: '手动对夹式蝶阀',
        specification: 'DN200,1.0MPa,阀体阀板:铸铁',
        unit: '个',
        brand: randomChoice(brands),
        quantity: 64,
        priceExcludingTax: 850,
        taxRate: 13,
        priceIncludingTax: 961,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 22,
        materialName: '手动对夹式蝶阀',
        specification: 'DN150,1.0MPa,阀板:铸铁',
        unit: '个',
        brand: randomChoice(brands),
        quantity: 80,
        priceExcludingTax: 620,
        taxRate: 13,
        priceIncludingTax: 701,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 23,
        materialName: '手动对夹式蝶阀',
        specification: 'DN125,1.0MPa,阀板:SS316',
        unit: '个',
        brand: randomChoice(brands),
        quantity: 96,
        priceExcludingTax: 750,
        taxRate: 13,
        priceIncludingTax: 848,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 24,
        materialName: '手动对夹式蝶阀',
        specification: 'DN100,1.0MPa,阀板:铸铁,涡轮式',
        unit: '个',
        brand: randomChoice(brands),
        quantity: 120,
        priceExcludingTax: 480,
        taxRate: 13,
        priceIncludingTax: 542,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 25,
        materialName: '电动调节阀',
        specification: 'DN200,PN1.6MPa,电动执行器',
        unit: '套',
        brand: randomChoice(brands),
        quantity: 12,
        priceExcludingTax: 8500,
        taxRate: 13,
        priceIncludingTax: 9605,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 26,
        materialName: '电磁流量计',
        specification: 'DN300,PN1.6MPa,精度0.5级,智能一体式',
        unit: '台',
        brand: randomChoice(['E+H', 'ABB', '横河', '科隆']),
        quantity: 8,
        priceExcludingTax: 15000,
        taxRate: 13,
        priceIncludingTax: 16950,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 27,
        materialName: '超声波液位计',
        specification: '量程0-10m,精度±3mm,4-20mA输出',
        unit: '台',
        brand: randomChoice(['西门子', 'E+H', 'VEGA', '科隆']),
        quantity: 16,
        priceExcludingTax: 6800,
        taxRate: 13,
        priceIncludingTax: 7684,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 28,
        materialName: '溶解氧仪',
        specification: '量程0-20mg/L,精度±0.1mg/L,带自清洗装置',
        unit: '套',
        brand: randomChoice(['哈希', 'WTW', 'E+H', '梅特勒']),
        quantity: 12,
        priceExcludingTax: 28000,
        taxRate: 13,
        priceIncludingTax: 31640,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 29,
        materialName: 'PH计',
        specification: '量程0-14pH,精度±0.05pH,带温度补偿',
        unit: '套',
        brand: randomChoice(['梅特勒', 'E+H', '哈希', 'WTW']),
        quantity: 16,
        priceExcludingTax: 12000,
        taxRate: 13,
        priceIncludingTax: 13560,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 30,
        materialName: '浊度仪',
        specification: '量程0-100NTU,精度±2%,在线式',
        unit: '套',
        brand: randomChoice(['哈希', 'E+H', '梅特勒', 'WTW']),
        quantity: 8,
        priceExcludingTax: 18000,
        taxRate: 13,
        priceIncludingTax: 20340,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 31,
        materialName: '变频控制柜',
        specification: '75kW,IP54防护等级,含PLC、触摸屏',
        unit: '套',
        brand: randomChoice(['ABB', '西门子', '施耐德', '丹佛斯']),
        quantity: 6,
        priceExcludingTax: 85000,
        taxRate: 13,
        priceIncludingTax: 96050,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    {
        id: 32,
        materialName: '鼓风机',
        specification: '罗茨鼓风机,风量100m³/min,压力60kPa,N=110kW',
        unit: '台',
        brand: randomChoice(['章鼓', '锦工', '罗茨', '三叶']),
        quantity: 4,
        priceExcludingTax: 180000,
        taxRate: 13,
        priceIncludingTax: 203400,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: randomDate(),
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    },
    // 以下为追加的重复数据以展示价格区间效果
    {
        id: 101,
        materialName: '提升水泵',
        specification: '潜污泵,Q=2083m³/h,H=9.5m,N=75kW,带变频控制、导轨及自耦系统',
        unit: '台',
        brand: '威乐',
        quantity: 2,
        priceExcludingTax: 125000, // 价格略低
        taxRate: 13,
        priceIncludingTax: 141250,
        sourceProject: '洛溪水厂首期',
        purchaseTime: '2025-01',
        priceType: '中标价',
        supplierCompany: '格兰富水泵(中国)有限公司'
    },
    {
        id: 102,
        materialName: '提升水泵',
        specification: '潜污泵,Q=1041m³/h,H=9.5m,N=37kW,带变频控制、导轨及自耦系统',
        unit: '台',
        brand: '凯泉',
        quantity: 5,
        priceExcludingTax: 72000, // 价格略高
        taxRate: 13,
        priceIncludingTax: 81360,
        sourceProject: '中部大龙水厂',
        purchaseTime: '2024-12',
        priceType: '投标价',
        supplierCompany: '上海凯泉泵业集团有限公司'
    },
    {
        id: 103,
        materialName: '螺旋压榨机',
        specification: '过滤精度3mm,N=2.2kW',
        unit: '台',
        brand: '苏尔寿',
        quantity: 2,
        priceExcludingTax: 43000,
        taxRate: 13,
        priceIncludingTax: 48590,
        sourceProject: '市政管网改造工程',
        purchaseTime: '2025-02',
        priceType: '中标价',
        supplierCompany: '苏州纳诺环保科技有限公司'
    },
    {
        id: 104,
        materialName: '冲洗泵组',
        specification: '立式多级泵组,单泵Q=8m³/h,H=81m,N=3kW,带变频控制、进口过滤器',
        unit: '套',
        brand: '南方泵业',
        quantity: 3,
        priceExcludingTax: 30500,
        taxRate: 13,
        priceIncludingTax: 34465,
        sourceProject: '污水处理厂扩建项目',
        purchaseTime: '2024-11',
        priceType: '投标价',
        supplierCompany: '佛山市水泵厂有限公司'
    },
    // -----------------------------------------------------------
    // 批量生成 "提升水泵" 的更多模拟数据 (展示价格区间)
    // -----------------------------------------------------------
    ...Array.from({ length: 15 }).map((_, index) => ({
        id: 2000 + index,
        materialName: '提升水泵',
        specification: '潜污泵,Q=2083m³/h,H=9.5m,N=75kW,带变频控制、导轨及自耦系统',
        unit: '台',
        brand: randomChoice(['威乐', '凯泉', '格兰富', '连成', 'KSB', '白云泵业', '肯富来']),
        quantity: Math.floor(Math.random() * 5) + 1,
        priceExcludingTax: 120000 + Math.floor(Math.random() * 20000) - 10000,
        taxRate: 13,
        priceIncludingTax: 0,
        sourceProject: randomChoice(sourceProjects),
        purchaseTime: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}`,
        priceType: randomChoice(['投标价', '中标价']),
        supplierCompany: randomChoice(suppliers)
    })).map(item => {
        item.priceIncludingTax = item.priceExcludingTax * (1 + item.taxRate / 100)
        return item
    })
]

// 补充所属分类映射逻辑
const materialCategoryMap = {
    '提升水泵': '潜污提升泵',
    '螺旋压榨机': '螺旋输送压榨机',
    '冲洗泵组': '立式多级冲洗泵',
    '恒压冲洗泵组': '立式多级冲洗泵',
    '厌氧搅拌器': '立式厌氧搅拌器',
    '缺氧搅拌器': '立式厌氧搅拌器',
    '缺氧推流器': '低速推流搅拌机',
    'MBR膜组器系统': 'MBR膜组件系统',
    '进水闸门': '不锈钢附壁方闸门',
    '出水闸门': '不锈钢附壁方闸门',
    '电动葫芦': '电动葫芦起重设备',
    '产水专用设备': '螺旋输送压榨机',
    'CIP泵': '立式多级冲洗泵',
    '液环真空泵': '潜污提升泵',
    '气水分离罐': '螺旋输送压榨机',
    '剩余污泥泵': '潜污提升泵',
    '手动对夹式蝶阀': '对夹式手动蝶阀',
    '电动调节阀': '电动调节平衡阀',
    '电磁流量计': '智能电磁流量计',
    '超声波液位计': '超声波液位变送器',
    '溶解氧仪': '荧光法溶解氧仪',
    'PH计': '在线玻璃电极PH计',
    '浊度仪': '智能电磁流量计',
    '变频控制柜': '变频启动控制柜',
    '鼓风机': '罗茨鼓风机电控'
};

materialPriceData.forEach(item => {
    item.categoryName = materialCategoryMap[item.materialName] || '水处理专用设备'
});

// 后端模拟：为每条数据计算价格区间
materialPriceData.forEach(item => {
    // 找出相同材料名称+规格的所有记录
    const similar = materialPriceData.filter(
        m => m.materialName === item.materialName &&
            m.specification === item.specification
    )

    // 如果只有1条记录，不设置区间
    if (similar.length <= 1) {
        item.rangeExcl = null
        item.rangeIncl = null
        item.avgExcl = item.priceExcludingTax
        item.avgIncl = item.priceIncludingTax
        return
    }

    // 计算价格区间
    const pricesExcl = similar.map(m => m.priceExcludingTax)
    const pricesIncl = similar.map(m => m.priceIncludingTax)

    const minExcl = Math.min(...pricesExcl)
    const maxExcl = Math.max(...pricesExcl)
    const minIncl = Math.min(...pricesIncl)
    const maxIncl = Math.max(...pricesIncl)

    // 计算平均值
    const avgExcl = pricesExcl.reduce((a, b) => a + b, 0) / pricesExcl.length
    const avgIncl = pricesIncl.reduce((a, b) => a + b, 0) / pricesIncl.length

    // 设置价格区间字段（模拟后端返回）
    item.rangeExcl = [minExcl, maxExcl]
    item.rangeIncl = [minIncl, maxIncl]
    item.avgExcl = avgExcl
    item.avgIncl = avgIncl
});

// 筛选函数
export function filterMaterialData(filters) {
    let result = [...materialPriceData]

    if (filters.materialName) {
        result = result.filter(item =>
            item.materialName.includes(filters.materialName)
        )
    }

    if (filters.specification) {
        result = result.filter(item =>
            item.specification.includes(filters.specification)
        )
    }

    if (filters.purchaseTime) {
        result = result.filter(item =>
            item.purchaseTime.startsWith(filters.purchaseTime)
        )
    }

    if (filters.sourceProject) {
        result = result.filter(item =>
            item.sourceProject === filters.sourceProject
        )
    }

    if (filters.brand) {
        result = result.filter(item =>
            item.brand === filters.brand
        )
    }

    if (filters.priceType) {
        result = result.filter(item =>
            item.priceType === filters.priceType
        )
    }

    if (filters.unit) {
        result = result.filter(item =>
            item.unit === filters.unit
        )
    }

    if (filters.taxRate) {
        result = result.filter(item =>
            item.taxRate === Number(filters.taxRate)
        )
    }

    if (filters.supplierCompany) {
        result = result.filter(item =>
            item.supplierCompany.includes(filters.supplierCompany)
        )
    }

    if (filters.categoryName) {
        const target = filters.categoryName
        result = result.filter(item => {
            if (Array.isArray(target)) {
                return target.some(name => item.categoryName && item.categoryName.includes(name))
            }
            return item.categoryName && item.categoryName.includes(target)
        })
    }

    return result
}

// 导出唯一值用于筛选下拉框
export const uniqueValues = {
    sourceProjects: [...new Set(materialPriceData.map(item => item.sourceProject))],
    brands: [...new Set(materialPriceData.map(item => item.brand))].sort(),
    units: [...new Set(materialPriceData.map(item => item.unit))],
    priceTypes: ['投标价', '中标价'],
    taxRates: [6, 9, 13],
    suppliers: [...new Set(materialPriceData.map(item => item.supplierCompany))],
    categories: [...new Set(materialPriceData.map(item => item.categoryName))].sort()
}
