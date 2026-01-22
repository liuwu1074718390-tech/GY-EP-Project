/**
 * 采购驾驶舱 Mock 数据
 * 广业环保采购管理系统
 */

// ==================== 核心指标卡片数据 ====================
export const kpiData = {
  yearPurchaseAmount: {
    value: 156832450,
    unit: '元',
    label: '年度采购总金额',
    yoyRate: 12.5,
    trend: 'up'
  },
  monthPurchaseAmount: {
    value: 18956320,
    unit: '元',
    label: '本月采购金额',
    momRate: 8.3,
    trend: 'up'
  },
  ongoingProjects: {
    value: 12,
    unit: '个',
    label: '进行中项目数',
    subLabel: '待验收 3 个'
  },
  pendingPurchase: {
    value: 86,
    unit: '项',
    label: '待采购物料数',
    urgent: 15
  },
  monthlySaving: {
    value: 1256800,
    unit: '元',
    label: '本月节约成本',
    savingRate: 6.2
  },
  supplierCount: {
    value: 678,
    unit: '家',
    label: '合作供应商数',
    newThisMonth: 25
  },
  materialTypeCount: {
    value: 1256,
    unit: '种',
    label: '采购材料种类',
    subLabel: '本月新增 12 种'
  }
}

// ==================== 采购金额趋势数据（近12个月） ====================
export const purchaseTrendData = {
  months: ['2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07',
    '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01'],
  actualAmount: [12500000, 15800000, 18200000, 14500000, 22100000, 19800000,
    16700000, 21500000, 24800000, 18900000, 15600000, 18956320],
  budgetAmount: [14000000, 16000000, 17000000, 16000000, 20000000, 20000000,
    18000000, 22000000, 23000000, 20000000, 17000000, 19000000],
  savingAmount: [1500000, 200000, -1200000, 1500000, -2100000, 200000,
    1300000, 500000, -1800000, 1100000, 1400000, 43680],
  lastYearAmount: [11200000, 14100000, 16500000, 13200000, 19800000, 17500000,
    15200000, 19200000, 22100000, 17200000, 14100000, 16850000]
}

// ==================== 采购分类统计数据 ====================
export const categoryData = {
  level1: [
    { name: '设备类', value: 89562000, percent: 57.1 },
    { name: '材料类', value: 42356000, percent: 27.0 },
    { name: '耗材类', value: 15823000, percent: 10.1 },
    { name: '服务类', value: 9091450, percent: 5.8 }
  ],
  sunburstData: [
    {
      name: '设备类',
      value: 89562000,
      children: [
        {
          name: 'MBR膜系统',
          value: 45000000,
          children: [
            { name: '膜组器', value: 33055670 },
            { name: '产水泵', value: 5200000 },
            { name: '控制系统', value: 6744330 }
          ]
        },
        {
          name: '泵类设备',
          value: 18500000,
          children: [
            { name: '提升泵', value: 8500000 },
            { name: '回流泵', value: 5200000 },
            { name: '加药泵', value: 4800000 }
          ]
        },
        {
          name: '格栅设备',
          value: 12800000,
          children: [
            { name: '细格栅', value: 6012744 },
            { name: '膜格栅', value: 4500000 },
            { name: '压榨机', value: 2287256 }
          ]
        },
        {
          name: '搅拌设备',
          value: 8562000,
          children: [
            { name: '厌氧搅拌器', value: 3800000 },
            { name: '缺氧搅拌器', value: 2862000 },
            { name: '推流器', value: 1900000 }
          ]
        },
        {
          name: '电气设备',
          value: 4700000,
          children: [
            { name: '变频柜', value: 2500000 },
            { name: '控制柜', value: 1500000 },
            { name: '配电柜', value: 700000 }
          ]
        }
      ]
    },
    {
      name: '材料类',
      value: 42356000,
      children: [
        {
          name: '管材管件',
          value: 18600000,
          children: [
            { name: '不锈钢管', value: 8500000 },
            { name: 'PE管', value: 5200000 },
            { name: 'PVC管', value: 3100000 },
            { name: '阀门', value: 1800000 }
          ]
        },
        {
          name: '钢材',
          value: 15200000,
          children: [
            { name: '钢筋', value: 8600000 },
            { name: '钢板', value: 4200000 },
            { name: '型钢', value: 2400000 }
          ]
        },
        {
          name: '水泥混凝土',
          value: 8556000,
          children: [
            { name: '水泥', value: 5200000 },
            { name: '混凝土', value: 3356000 }
          ]
        }
      ]
    },
    {
      name: '耗材类',
      value: 15823000,
      children: [
        { name: '化学药剂', value: 6500000 },
        { name: '滤芯滤料', value: 4200000 },
        { name: '密封件', value: 2823000 },
        { name: '润滑油', value: 2300000 }
      ]
    },
    {
      name: '服务类',
      value: 9091450,
      children: [
        { name: '安装服务', value: 4500000 },
        { name: '检测服务', value: 2591450 },
        { name: '维保服务', value: 2000000 }
      ]
    }
  ]
}

// ==================== 项目采购进度数据 ====================
export const projectProgressData = [
  {
    id: 'p1',
    name: '南站水厂项目',
    totalBudget: 156000000,
    purchasedAmount: 112500000,
    progress: 72.1,
    status: 'ongoing',
    deadline: '2026-06-30',
    manager: '张工'
  },
  {
    id: 'p2',
    name: '北部污水处理厂改造',
    totalBudget: 89000000,
    purchasedAmount: 45200000,
    progress: 50.8,
    status: 'ongoing',
    deadline: '2026-09-30',
    manager: '李工'
  },
  {
    id: 'p3',
    name: '东区净水厂新建',
    totalBudget: 125000000,
    purchasedAmount: 18600000,
    progress: 14.9,
    status: 'ongoing',
    deadline: '2026-12-31',
    manager: '王工'
  },
  {
    id: 'p4',
    name: '西部管网更新工程',
    totalBudget: 35000000,
    purchasedAmount: 32800000,
    progress: 93.7,
    status: 'ongoing',
    deadline: '2026-03-31',
    manager: '赵工'
  }
]

// ==================== 供应商分析数据 ====================
export const supplierData = {
  topSuppliers: [
    { name: '碧水源膜科技', amount: 33055670, category: '设备类', rating: 'A', region: '北京' },
    { name: '南方泵业股份', amount: 12500000, category: '设备类', rating: 'A', region: '浙江' },
    { name: '格兰富水泵', amount: 9800000, category: '设备类', rating: 'A', region: '上海' },
    { name: '宝钢特钢', amount: 8600000, category: '材料类', rating: 'A', region: '上海' },
    { name: '新兴铸管', amount: 7200000, category: '材料类', rating: 'B', region: '河北' },
    { name: '永高股份', amount: 5800000, category: '材料类', rating: 'B', region: '浙江' },
    { name: '华电重工', amount: 5200000, category: '设备类', rating: 'B', region: '山东' },
    { name: '海天塑机', amount: 4500000, category: '设备类', rating: 'B', region: '浙江' },
    { name: '中联重科', amount: 4200000, category: '设备类', rating: 'A', region: '湖南' },
    { name: '三一重工', amount: 3800000, category: '设备类', rating: 'A', region: '湖南' }
  ],
  supplierByMaterial: {
    '全部': [
      { name: '碧水源膜科技', amount: 33055670 },
      { name: '南方泵业股份', amount: 12500000 },
      { name: '格兰富水泵', amount: 9800000 },
      { name: '宝钢特钢', amount: 8600000 },
      { name: '新兴铸管', amount: 7200000 },
      { name: '永高股份', amount: 5800000 },
      { name: '华电重工', amount: 5200000 },
      { name: '海天塑机', amount: 4500000 },
      { name: '中联重科', amount: 4200000 },
      { name: '三一重工', amount: 3800000 }
    ],
    'MBR膜系统': [
      { name: '碧水源', amount: 45000000 },
      { name: '膜天', amount: 28600000 },
      { name: '立升', amount: 21500000 },
      { name: '久吾高科', amount: 18200000 },
      { name: '赛诺水务', amount: 15600000 },
      { name: '斯纳普', amount: 12800000 },
      { name: '津膜科技', amount: 9500000 },
      { name: '水拓环保', amount: 7200000 }
    ],
    '泵类设备': [
      { name: '南方泵业', amount: 18500000 },
      { name: '新界泵业', amount: 14200000 },
      { name: '利欧股份', amount: 11800000 },
      { name: '格兰富', amount: 9500000 },
      { name: '威乐(Wilo)', amount: 8200000 },
      { name: '沈阳水泵厂', amount: 7600000 },
      { name: '长沙水泵厂', amount: 6500000 }
    ],
    '流量计': [
      { name: '川仪股份', amount: 8200000 },
      { name: '天信仪表', amount: 6500000 },
      { name: '艾丝特', amount: 5200000 },
      { name: '横河电机', amount: 4800000 },
      { name: '科隆(KROHNE)', amount: 4200000 },
      { name: '西门子', amount: 3500000 }
    ],
    '压榨机': [
      { name: '滕州建兴', amount: 5600000 },
      { name: '华电重工', amount: 4800000 },
      { name: '同臣环保', amount: 3900000 },
      { name: '兴源环境', amount: 3200000 },
      { name: '景津装备', amount: 2800000 }
    ]
  },
  performanceRadar: {
    indicators: [
      { name: '交货及时率', max: 100 },
      { name: '质量合格率', max: 100 },
      { name: '价格竞争力', max: 100 },
      { name: '售后服务', max: 100 },
      { name: '合作稳定性', max: 100 }
    ],
    data: [
      { name: 'A级供应商', value: [95, 98, 85, 92, 96] },
      { name: 'B级供应商', value: [88, 92, 90, 85, 88] },
      { name: 'C级供应商', value: [78, 85, 92, 75, 80] }
    ]
  }
}

// ==================== 材料价格监控数据 ====================
export const materialPriceData = {
  priceHistory: {
    months: ['2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01'],
    materials: [
      {
        name: '潜污提升泵 (75kW)',
        unit: '元/台',
        prices: [31000, 32000, 31500, 33000, 34500, 34000],
        change: 9.7,
        status: 'danger'
      },
      {
        name: 'MBR 膜组件系统',
        unit: '元/套',
        prices: [4500, 4700, 4600, 4900, 5100, 5000],
        change: 11.1,
        status: 'danger'
      },
      {
        name: '智能电磁流量计',
        unit: '元/台',
        prices: [3800, 4000, 3950, 4200, 4400, 4300],
        change: 13.2,
        status: 'danger'
      },
      {
        name: '螺旋输送压榨机',
        unit: '元/台',
        prices: [15000, 16000, 15800, 17500, 19000, 18500],
        change: 23.3,
        status: 'danger'
      }
    ]
  },
  priceAlerts: [
    { material: '潜污提升泵 (75kW)', currentPrice: 34000, basePrice: 31000, changeRate: 9.7, alertLevel: 'high' },
    { material: 'MBR 膜组件系统', currentPrice: 5000, basePrice: 4500, changeRate: 11.1, alertLevel: 'high' },
    { material: '智能电磁流量计', currentPrice: 4300, basePrice: 3800, changeRate: 13.2, alertLevel: 'high' },
    { material: '螺旋输送压榨机', currentPrice: 18500, basePrice: 15000, changeRate: 23.3, alertLevel: 'high' }
  ]
}

// ==================== 采购效率分析数据 ====================
export const efficiencyData = {
  purchaseMethodDistribution: [
    { method: '公开招标', count: 28, amount: 98500000, percent: 62.8 },
    { method: '邀请招标', count: 35, amount: 32600000, percent: 20.8 },
    { method: '竞争性谈判', count: 42, amount: 15200000, percent: 9.7 },
    { method: '询价采购', count: 156, amount: 8500000, percent: 5.4 },
    { method: '单一来源', count: 12, amount: 2032450, percent: 1.3 }
  ]
}

// ==================== 预算执行数据 ====================
export const budgetData = {
  annual: {
    totalBudget: 180000000,
    executedAmount: 156832450,
    executionRate: 87.1,
    remainingBudget: 23167550,
    expectedSaving: 5200000
  }
}

// ==================== 合同管理数据 ====================
export const contractData = {
  expiringContracts: [
    { contractNo: 'HT-2025-0892', name: '南站水厂MBR膜组器采购合同', supplier: '碧水源膜科技', amount: 33055670, expireDate: '2026-02-15', daysLeft: 24 },
    { contractNo: 'HT-2025-0756', name: '北部污水厂提升泵采购合同', supplier: '南方泵业', amount: 5200000, expireDate: '2026-02-08', daysLeft: 17 },
    { contractNo: 'HT-2025-0823', name: '钢筋材料年度框架合同', supplier: '宝钢特钢', amount: 8600000, expireDate: '2026-02-28', daysLeft: 37 },
    { contractNo: 'HT-2025-0901', name: '化学药剂供应合同', supplier: '广州化工', amount: 3500000, expireDate: '2026-02-20', daysLeft: 29 }
  ]
}

// ==================== 高价值设备追踪数据 ====================
export const highValueEquipmentData = [
  {
    id: 'eq1',
    name: '膜组器系统',
    spec: 'PVDF中空纤维膜',
    supplier: '碧水源膜科技',
    totalPrice: 33055670,
    status: 'production',
    progress: 65,
    expectedDelivery: '2026-03-15',
    project: '南站水厂项目'
  },
  {
    id: 'eq2',
    name: '细格栅',
    spec: '内进流孔板式',
    supplier: '华电重工',
    totalPrice: 2405096,
    status: 'inspection',
    progress: 95,
    expectedDelivery: '2026-01-28',
    project: '南站水厂项目'
  },
  {
    id: 'eq3',
    name: '膜格栅',
    spec: '栅隙1mm',
    supplier: '华电重工',
    totalPrice: 4406910,
    status: 'production',
    progress: 45,
    expectedDelivery: '2026-04-20',
    project: '南站水厂项目'
  },
  {
    id: 'eq4',
    name: '提升水泵',
    spec: '潜污泵75kW',
    supplier: '南方泵业',
    totalPrice: 1999096,
    status: 'completed',
    progress: 100,
    expectedDelivery: '2026-01-15',
    project: '南站水厂项目'
  },
  {
    id: 'eq5',
    name: '产水泵变频控制柜',
    spec: 'MNS型',
    supplier: '正泰电器',
    totalPrice: 2048000,
    status: 'contract',
    progress: 15,
    expectedDelivery: '2026-05-30',
    project: '南站水厂项目'
  }
]

// ==================== 实时动态数据 ====================
export const realtimeData = {
  todayActivities: [
    { time: '09:15', type: 'order', content: '南站水厂项目 - 阀门采购订单已下达', amount: 186000 },
    { time: '10:32', type: 'delivery', content: '提升水泵已到货入库，等待验收', amount: 499774 },
    { time: '11:05', type: 'contract', content: '化学药剂供应合同已完成签署', amount: 3500000 },
    { time: '14:20', type: 'payment', content: 'MBR膜组器第二期款已支付', amount: 9916701 },
    { time: '15:48', type: 'approval', content: '东区净水厂深度处理设备采购申请已审批', amount: 5200000 },
    { time: '16:30', type: 'inspection', content: '细格栅设备验收合格，办理入库', amount: 2405096 }
  ],
  todoItems: [
    { id: 1, title: 'MBR膜组器到货验收', deadline: '2026-01-25', priority: 'high', project: '南站水厂' },
    { id: 2, title: '钢筋框架合同续签', deadline: '2026-02-28', priority: 'high', project: '年度合同' },
    { id: 3, title: '北部污水厂生化设备询价', deadline: '2026-01-30', priority: 'medium', project: '北部污水厂' },
    { id: 4, title: '供应商年度评审会议', deadline: '2026-02-15', priority: 'medium', project: '供应商管理' },
    { id: 5, title: '东区净水厂预算调整申请', deadline: '2026-01-28', priority: 'low', project: '东区净水厂' }
  ]
}

// 格式化金额
export function formatAmount(value) {
  return (value / 10000).toFixed(2)
}
