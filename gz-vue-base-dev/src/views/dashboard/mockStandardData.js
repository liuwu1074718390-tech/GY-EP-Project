// 模拟国标材料标准数据 - 强化水处理专用设备
// 参考南站水厂配套设备清单生成
export { categoryData } from './generatedCategoryData.js';

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
 * 材料标准列表数据
 * 说明：按本次覆盖要求清空，后续由新标准材料导入填充
 */
export const materialStandardData = [];
