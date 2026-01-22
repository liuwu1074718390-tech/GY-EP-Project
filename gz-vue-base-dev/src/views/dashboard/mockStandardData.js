// 模拟国标材料标准数据 - 强化水处理专用设备
// 参考南站水厂配套设备清单生成

/**
 * 分类树数据 (三级分类结构)
 */
export const categoryData = [
    {
        id: 'c2',
        categoryName: '水处理专用设备',
        categoryCode: '02',
        level: 1,
        children: [
            {
                id: 'c2-1',
                categoryName: '动力驱动及输送',
                categoryCode: '01',
                level: 2,
                children: [
                    { id: 'c2-1-1', categoryName: '潜污提升泵', categoryCode: '01', level: 3 },
                    { id: 'c2-1-2', categoryName: '立式多级冲洗泵', categoryCode: '02', level: 3 },
                    { id: 'c2-1-3', categoryName: '螺旋输送压榨机', categoryCode: '03', level: 3 },
                    { id: 'c2-1-4', categoryName: '电动葫芦起重设备', categoryCode: '04', level: 3 }
                ]
            },
            {
                id: 'c2-2',
                categoryName: '生物处理及搅拌',
                categoryCode: '02',
                level: 2,
                children: [
                    { id: 'c2-2-1', categoryName: '立式厌氧搅拌器', categoryCode: '01', level: 3 },
                    { id: 'c2-2-2', categoryName: '低速推流搅拌机', categoryCode: '02', level: 3 },
                    { id: 'c2-2-3', categoryName: 'MBR膜组件系统', categoryCode: '03', level: 3 }
                ]
            },
            {
                id: 'c2-3',
                categoryName: '阀门及截流设备',
                categoryCode: '03',
                level: 2,
                children: [
                    { id: 'c2-3-1', categoryName: '不锈钢附壁方闸门', categoryCode: '01', level: 3 },
                    { id: 'c2-3-2', categoryName: '对夹式手动蝶阀', categoryCode: '02', level: 3 },
                    { id: 'c2-3-3', categoryName: '电动调节平衡阀', categoryCode: '03', level: 3 }
                ]
            }
        ]
    },
    {
        id: 'c3',
        categoryName: '自动控制及仪表',
        categoryCode: '03',
        level: 1,
        children: [
            {
                id: 'c3-1',
                categoryName: '在线监测仪表',
                categoryCode: '01',
                level: 2,
                children: [
                    { id: 'c3-1-1', categoryName: '荧光法溶解氧仪', categoryCode: '01', level: 3 },
                    { id: 'c3-1-2', categoryName: '在线玻璃电极PH计', categoryCode: '02', level: 3 },
                    { id: 'c3-1-3', categoryName: '智能电磁流量计', categoryCode: '03', level: 3 },
                    { id: 'c3-1-4', categoryName: '超声波液位变送器', categoryCode: '04', level: 3 }
                ]
            },
            {
                id: 'c3-2',
                categoryName: '配套电控系统',
                categoryCode: '02',
                level: 2,
                children: [
                    { id: 'c3-2-1', categoryName: '变频启动控制柜', categoryCode: '01', level: 3 },
                    { id: 'c3-2-2', categoryName: '罗茨鼓风机电控', categoryCode: '02', level: 3 }
                ]
            }
        ]
    }
];

/**
 * 规格型号数据 (部分抽取)
 */
export const specData = [
    { id: 1, specName: 'Q=2083m3/h H=9.5m 75kW', specCode: '001' },
    { id: 2, specName: 'Q=1041m3/h H=9.5m 37kW', specCode: '002' },
    { id: 3, specName: '精度2mm N=3kW', specCode: '003' },
    { id: 4, specName: 'PVDF中空纤维膜组', specCode: '004' },
    { id: 5, specName: '1000x1000mm 不锈钢', specCode: '005' },
    { id: 6, specName: 'DN300 PN10 手动', specCode: '006' },
    { id: 7, specName: '0.5级 智能一体式', specCode: '007' },
    { id: 8, specName: 'IP54 含PLC/屏', specCode: '008' }
];

/**
 * 单位数据
 */
export const unitData = [
    { id: 1, unitName: '台', unitCode: '01' },
    { id: 2, unitName: '套', unitCode: '02' },
    { id: 3, unitName: '个', unitCode: '03' },
    { id: 4, unitName: '组', unitCode: '04' }
];

/**
 * 材料标准列表数据 - 基于水处理设备图片清单
 */
export const materialStandardData = [
    {
        id: 1001,
        materialCode: '02010100101',
        materialName: '潜污提升泵（大功率）',
        categoryLevel1Id: 'c2', categoryLevel1Name: '水处理专用设备',
        categoryLevel2Id: 'c2-1', categoryLevel2Name: '动力驱动及输送',
        categoryLevel3Id: 'c2-1-1', categoryLevel3Name: '潜污提升泵',
        specId: 1, specName: 'Q=2083m3/h H=9.5m 75kW',
        unitId: 1, unitName: '台',
        status: '1', remark: '带变频控制、导轨及自耦系统'
    },
    {
        id: 1002,
        materialCode: '02010100201',
        materialName: '潜污提升泵（中功率）',
        categoryLevel1Id: 'c2', categoryLevel1Name: '水处理专用设备',
        categoryLevel2Id: 'c2-1', categoryLevel2Name: '动力驱动及输送',
        categoryLevel3Id: 'c2-1-1', categoryLevel3Name: '潜污提升泵',
        specId: 2, specName: 'Q=1041m3/h H=9.5m 37kW',
        unitId: 1, unitName: '台',
        status: '1', remark: '带变频控制、导轨及自耦系统'
    },
    {
        id: 1003,
        materialCode: '02010300301',
        materialName: '螺旋压榨机',
        categoryLevel1Id: 'c2', categoryLevel1Name: '水处理专用设备',
        categoryLevel2Id: 'c2-1', categoryLevel2Name: '动力驱动及输送',
        categoryLevel3Id: 'c2-1-3', categoryLevel3Name: '螺旋输送压榨机',
        specId: 3, specName: '精度2mm N=3kW',
        unitId: 1, unitName: '台',
        status: '1', remark: '过滤精度2mm'
    },
    {
        id: 1004,
        materialCode: '02020300402',
        materialName: 'MBR膜组器系统',
        categoryLevel1Id: 'c2', categoryLevel1Name: '水处理专用设备',
        categoryLevel2Id: 'c2-2', categoryLevel2Name: '生物处理及搅拌',
        categoryLevel3Id: 'c2-2-3', categoryLevel3Name: 'MBR膜组件系统',
        specId: 4, specName: 'PVDF中空纤维膜组',
        unitId: 2, unitName: '套',
        status: '1', remark: '单渠道出水量Q≥9375m3/d'
    },
    {
        id: 1005,
        materialCode: '02030100502',
        materialName: '进水/出水闸门',
        categoryLevel1Id: 'c2', categoryLevel1Name: '水处理专用设备',
        categoryLevel2Id: 'c2-3', categoryLevel2Name: '阀门及截流设备',
        categoryLevel3Id: 'c2-3-1', categoryLevel3Name: '不锈钢附壁方闸门',
        specId: 5, specName: '1000x1000mm 不锈钢',
        unitId: 2, unitName: '套',
        status: '1', remark: '带手电一体启闭机'
    },
    {
        id: 1006,
        materialCode: '02030200603',
        materialName: '手动对夹式蝶阀',
        categoryLevel1Id: 'c2', categoryLevel1Name: '水处理专用设备',
        categoryLevel2Id: 'c2-3', categoryLevel2Name: '阀门及截流设备',
        categoryLevel3Id: 'c2-3-2', categoryLevel3Name: '对夹式手动蝶阀',
        specId: 6, specName: 'DN300 PN10 手动',
        unitId: 3, unitName: '个',
        status: '1', remark: '阀板材质：铸铁'
    },
    {
        id: 1007,
        materialCode: '03010300701',
        materialName: '智能电磁流量计',
        categoryLevel1Id: 'c3', categoryLevel1Name: '自动控制及仪表',
        categoryLevel2Id: 'c3-1', categoryLevel2Name: '在线监测仪表',
        categoryLevel3Id: 'c3-1-3', categoryLevel3Name: '智能电磁流量计',
        specId: 7, specName: '0.5级 智能一体式',
        unitId: 1, unitName: '台',
        status: '1', remark: 'DN300 PN1.6MPa'
    },
    {
        id: 1008,
        materialCode: '03020100802',
        materialName: '变频动力控制柜',
        categoryLevel1Id: 'c3', categoryLevel1Name: '自动控制及仪表',
        categoryLevel2Id: 'c3-2', categoryLevel2Name: '配套电控系统',
        categoryLevel3Id: 'c3-2-1', categoryLevel3Name: '变频启动控制柜',
        specId: 8, specName: 'IP54 含PLC/屏',
        unitId: 2, unitName: '套',
        status: '1', remark: '支持Modbus通信协议'
    }
];

