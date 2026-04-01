export const MATERIAL_PRICE_TEMPLATE_HEADERS = [
  '*材料名称',
  '规格型号',
  '所属分类',
  '工艺段',
  '*单位',
  '品牌',
  '*数量',
  '不含税价',
  '税率(%)',
  '*含税价',
  '来源项目',
  '*采购时间(YYYY-MM)',
  '*价格类型',
  '报价供应商',
  '备注'
]

export const MATERIAL_PRICE_HEADER_FIELD_MAP = {
  材料名称: 'materialName',
  规格型号: 'specification',
  所属分类: 'categoryName',
  工艺段: 'processSegmentName',
  单位: 'unit',
  品牌: 'brand',
  数量: 'quantity',
  不含税价: 'priceExcludingTax',
  '税率(%)': 'taxRate',
  含税价: 'priceIncludingTax',
  来源项目: 'sourceProject',
  '采购时间(YYYY-MM)': 'purchaseTime',
  价格类型: 'priceType',
  报价供应商: 'supplierCompany',
  备注: 'remark'
}

export const MATERIAL_PRICE_FIELD_HEADER_MAP = Object.fromEntries(
  Object.entries(MATERIAL_PRICE_HEADER_FIELD_MAP).map(([k, v]) => [v, k])
)

export const PRICE_TYPE_OPTIONS = ['投标价', '中标价', '厂商报价', '市场询价', '信息价', '项目价']

export const MATERIAL_PRICE_REQUIRED_FIELDS = [
  'materialName',
  'unit',
  'quantity',
  'priceIncludingTax',
  'purchaseTime',
  'priceType'
]

export function createEmptyMaterialPriceForm() {
  const now = new Date()
  const month = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0')
  return {
    materialName: '',
    specification: '',
    categoryName: '',
    categoryLevel1Id: null,
    categoryLevel2Id: null,
    categoryLevel3Id: null,
    categoryIds: [],
    processSegmentName: '',
    unit: '',
    brand: '',
    quantity: 1,
    priceExcludingTax: null,
    taxRate: null,
    priceIncludingTax: null,
    sourceProject: '',
    purchaseTime: month,
    priceType: '',
    supplierCompany: '',
    remark: '',
    masterMatchMeta: {
      supplierMatched: false,
      brandMatched: false,
      projectMatched: false
    }
  }
}

export const materialPriceFormRules = {
  materialName: [{ required: true, message: '请输入材料名称', trigger: 'blur' }],
  unit: [{ required: true, message: '请选择或输入单位', trigger: 'change' }],
  quantity: [{ required: true, message: '请输入数量', trigger: 'blur' }],
  priceIncludingTax: [{ required: true, message: '请输入含税价', trigger: 'blur' }],
  purchaseTime: [{ required: true, message: '请选择采购时间', trigger: 'change' }],
  priceType: [{ required: true, message: '请选择价格类型', trigger: 'change' }]
}

export function normalizeMaterialPriceRow(raw = {}) {
  const normalizePurchaseMonth = (value) => {
    const str = (value ?? '').toString().trim()
    if (/^\d{4}-(0[1-9]|1[0-2])$/.test(str)) {
      return str
    }
    const fullDateMatch = str.match(/^(\d{4}-(0[1-9]|1[0-2]))-\d{2}$/)
    if (fullDateMatch) {
      return fullDateMatch[1]
    }
    return str
  }

  const obj = {}
  Object.values(MATERIAL_PRICE_HEADER_FIELD_MAP).forEach(key => {
    obj[key] = (raw[key] ?? '').toString().trim()
  })
  obj.purchaseTime = normalizePurchaseMonth(obj.purchaseTime)
  return {
    ...createEmptyMaterialPriceForm(),
    ...obj,
    quantity: obj.quantity === '' ? null : Number(obj.quantity),
    priceExcludingTax: obj.priceExcludingTax === '' ? null : Number(obj.priceExcludingTax),
    taxRate: obj.taxRate === '' ? null : Number(obj.taxRate),
    priceIncludingTax: obj.priceIncludingTax === '' ? null : Number(obj.priceIncludingTax),
    categoryIds: []
  }
}

export function validateMaterialPriceRowClient(row) {
  const errors = []
  MATERIAL_PRICE_REQUIRED_FIELDS.forEach(field => {
    const v = row[field]
    if (v === '' || v === null || v === undefined) {
      errors.push({ field, message: MATERIAL_PRICE_FIELD_HEADER_MAP[field] + '不能为空' })
    }
  })

  const n1 = Number(row.quantity)
  if (Number.isNaN(n1) || n1 <= 0) {
    errors.push({ field: 'quantity', message: '数量必须大于0' })
  }

  const hasPriceExcludingTax = row.priceExcludingTax !== '' && row.priceExcludingTax !== null && row.priceExcludingTax !== undefined
  const n2 = Number(row.priceExcludingTax)
  if (hasPriceExcludingTax && (Number.isNaN(n2) || n2 < 0)) {
    errors.push({ field: 'priceExcludingTax', message: '不含税价必须是大于等于0的数字' })
  }

  const hasTaxRate = row.taxRate !== '' && row.taxRate !== null && row.taxRate !== undefined
  const n3 = Number(row.taxRate)
  if (hasTaxRate && (Number.isNaN(n3) || n3 < 0 || n3 > 100)) {
    errors.push({ field: 'taxRate', message: '税率必须在0-100之间' })
  }

  const n4 = Number(row.priceIncludingTax)
  if (Number.isNaN(n4) || n4 < 0) {
    errors.push({ field: 'priceIncludingTax', message: '含税价不能小于0' })
  }

  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test((row.purchaseTime || '').toString())) {
    errors.push({ field: 'purchaseTime', message: '采购时间格式必须为YYYY-MM' })
  }

  if (row.priceType && !PRICE_TYPE_OPTIONS.includes(row.priceType)) {
    errors.push({ field: 'priceType', message: '价格类型仅支持投标价/中标价/厂商报价/市场询价/信息价/项目价' })
  }

  if (hasPriceExcludingTax && hasTaxRate && ![n2, n3, n4].some(Number.isNaN)) {
    const expected = Number((n2 * (1 + n3 / 100)).toFixed(2))
    if (Math.abs(expected - n4) > 0.05) {
      errors.push({ field: 'priceIncludingTax', message: '含税价与不含税价/税率不一致，应约为' + expected })
    }
  }

  return errors
}
