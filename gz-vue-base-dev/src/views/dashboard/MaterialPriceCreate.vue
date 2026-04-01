<template>
  <div class="material-price-create-page">
    <section class="toolbar-card">
      <div class="left-tools">
        <el-button @click="handleBack">返回</el-button>
        <el-button type="primary" plain @click="handleDownloadTemplate">下载模板</el-button>
        <el-upload :auto-upload="false" :show-file-list="false" accept=".xlsx" :on-change="handleFileChange">
          <template #trigger>
            <el-button type="primary">导入Excel</el-button>
          </template>
        </el-upload>
        <el-button @click="handleAddRow">手工新增一行</el-button>
        <el-button :disabled="selectedIds.length === 0" @click="handleBatchDelete">批量删除</el-button>
        <el-button type="warning" plain :disabled="selectedIds.length === 0" @click="openBulkEditDialog">批量修改</el-button>
      </div>
    </section>

    <section class="summary-card">
      <div class="summary-item">总行数：<b>{{ summary.total }}</b></div>
      <div class="summary-item pass">通过：<b>{{ summary.success }}</b></div>
      <div class="summary-item fail">失败：<b>{{ summary.failed }}</b></div>
      <el-switch v-model="showOnlyError" inline-prompt active-text="仅看错误行" inactive-text="显示全部" />
    </section>

    <section class="table-card">
      <el-table :data="displayRows" border stripe size="small" height="100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="44" fixed="left" align="center" header-align="center" />
        <el-table-column label="序号" width="64" fixed="left" align="center" header-align="center">
          <template #default="{ row }">{{ row.__rowNo }}</template>
        </el-table-column>

        <el-table-column min-width="140" fixed="left">
          <template #header>
            <span class="required-label">材料名称</span>
          </template>
          <template #default="{ row }">
            <el-input v-model="row.materialName" size="small" clearable />
          </template>
        </el-table-column>

        <el-table-column min-width="160">
          <template #header>
            <span>规格型号</span>
          </template>
          <template #default="{ row }">
            <el-input v-model="row.specification" size="small" clearable />
          </template>
        </el-table-column>

        <el-table-column min-width="220">
          <template #header>
            <span>所属分类</span>
          </template>
          <template #default="{ row }">
            <el-cascader
              v-model="row.categoryIds"
              :options="categoryTree"
              :props="categoryCascaderProps"
              size="small"
              placeholder="请选择分类"
              clearable
              filterable
              @change="(val) => handleCategoryChange(row, val)"
            />
          </template>
        </el-table-column>

        <el-table-column width="150">
          <template #header>
            <span>工艺段</span>
          </template>
          <template #default="{ row }">
            <el-select v-model="row.processSegmentName" size="small" placeholder="选择工艺段" filterable clearable>
              <el-option v-for="item in processSegmentOptions" :key="item.id" :label="item.segmentName" :value="item.segmentName" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column width="110">
          <template #header>
            <span class="required-label">单位</span>
          </template>
          <template #default="{ row }">
            <el-select v-model="row.unit" size="small" placeholder="选择单位" filterable clearable allow-create default-first-option>
              <el-option v-for="item in unitOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="品牌" width="160">
          <template #default="{ row }">
            <el-select
              v-model="row.brand"
              size="small"
              placeholder="可选或输入品牌"
              filterable
              clearable
              allow-create
              default-first-option
              @change="() => updateMasterMatch(row)"
            >
              <el-option v-for="item in brandOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column width="120" align="right">
          <template #header>
            <span class="required-label">数量</span>
          </template>
          <template #default="{ row }">
            <el-input-number
              v-model="row.quantity"
              size="small"
              :min="0.0001"
              :precision="4"
              :controls="false"
              :step="1"
              placeholder="数量"
            />
          </template>
        </el-table-column>

        <el-table-column width="130" align="right">
          <template #header>
            <span>不含税价</span>
          </template>
          <template #default="{ row }">
            <el-input-number
              v-model="row.priceExcludingTax"
              size="small"
              :min="0"
              :precision="2"
              :controls="false"
              :step="1"
              :value-on-clear="null"
              placeholder="不含税价"
              @change="() => handlePriceFieldChange(row, 'priceExcludingTax')"
            />
          </template>
        </el-table-column>

        <el-table-column width="110" align="right">
          <template #header>
            <span>税率(%)</span>
          </template>
          <template #default="{ row }">
            <el-input-number
              v-model="row.taxRate"
              size="small"
              :min="0"
              :max="100"
              :precision="2"
              :controls="false"
              :step="0.1"
              :value-on-clear="null"
              placeholder="税率"
              @change="() => handlePriceFieldChange(row, 'taxRate')"
            />
          </template>
        </el-table-column>

        <el-table-column width="130" align="right">
          <template #header>
            <span class="required-label">含税价</span>
          </template>
          <template #default="{ row }">
            <el-input-number
              v-model="row.priceIncludingTax"
              size="small"
              :min="0"
              :precision="2"
              :controls="false"
              :step="1"
              :value-on-clear="null"
              placeholder="含税价"
              @change="() => handlePriceFieldChange(row, 'priceIncludingTax')"
            />
          </template>
        </el-table-column>

        <el-table-column label="来源项目" min-width="180">
          <template #default="{ row }">
            <el-select
              v-model="row.sourceProject"
              size="small"
              placeholder="可选或输入来源项目"
              filterable
              clearable
              allow-create
              default-first-option
              @change="() => updateMasterMatch(row)"
            >
              <el-option v-for="item in projectOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column width="160">
          <template #header>
            <span class="required-label">时间</span>
          </template>
          <template #default="{ row }">
            <el-date-picker
              v-model="row.purchaseTime"
              type="month"
              size="small"
              format="YYYY-MM"
              value-format="YYYY-MM"
              placeholder="选择月份"
              clearable
            />
          </template>
        </el-table-column>

        <el-table-column width="110">
          <template #header>
            <span class="required-label">价格类型</span>
          </template>
          <template #default="{ row }">
            <el-select v-model="row.priceType" size="small" placeholder="选择">
              <el-option v-for="item in PRICE_TYPE_OPTIONS" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="报价供应商" min-width="180">
          <template #default="{ row }">
            <el-select
              v-model="row.supplierCompany"
              size="small"
              placeholder="可选或输入供应商"
              filterable
              clearable
              allow-create
              default-first-option
              @change="() => updateMasterMatch(row)"
            >
              <el-option v-for="item in supplierOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="备注" min-width="140">
          <template #default="{ row }">
            <el-input v-model="row.remark" size="small" clearable />
          </template>
        </el-table-column>

        <el-table-column label="校验结果" width="220" fixed="right">
          <template #default="{ row }">
            <div class="validation-cell">
              <template v-if="getRowErrors(row).length">
                <el-tag
                  v-for="(err, idx) in getRowErrors(row)"
                  :key="idx"
                  type="danger"
                  size="small"
                  effect="plain"
                  class="msg-tag"
                >{{ err.message }}</el-tag>
              </template>
              <template v-else-if="isRowValidated(row)">
                <el-tag size="small" type="success">通过</el-tag>
              </template>
              <template v-else>
                <el-tag size="small" type="info">待校验</el-tag>
              </template>
              <el-tag
                v-for="(warn, idx) in getRowWarnings(row)"
                :key="'w-' + idx"
                type="warning"
                size="small"
                effect="plain"
                class="msg-tag"
              >{{ warn.message }}</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <section class="footer-actions">
      <el-button @click="handleBack">取消</el-button>
      <el-button type="warning" :loading="validating" @click="handleValidate">校验</el-button>
      <el-button type="success" :disabled="!canCommit" :loading="committing" @click="handleCommit">提交入库</el-button>
    </section>

    <el-dialog
      v-model="bulkEditVisible"
      title="批量修改已选行"
      width="860px"
      destroy-on-close
      align-center
      class="bulk-edit-dialog"
      @closed="resetBulkEditForm"
    >
      <div class="bulk-edit-head">
        <div class="bulk-edit-title">
          <span>批量覆盖已勾选行</span>
          <span class="bulk-edit-subtitle">勾选字段后填写新值，仅覆盖选中字段</span>
        </div>
        <el-tag effect="dark" type="warning">已选 {{ selectedIds.length }} 行</el-tag>
      </div>

      <div class="bulk-edit-grid">
        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.category }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.category">所属分类</el-checkbox>
          </div>
          <el-cascader
            v-model="bulkEditForm.categoryIds"
            :disabled="!bulkEditEnabled.category"
            :options="categoryTree"
            :props="categoryCascaderProps"
            placeholder="请选择分类"
            clearable
            filterable
            @change="handleBulkCategoryChange"
          />
        </div>

        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.processSegmentName }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.processSegmentName">工艺段</el-checkbox>
          </div>
          <el-select v-model="bulkEditForm.processSegmentName" :disabled="!bulkEditEnabled.processSegmentName" placeholder="选择工艺段" filterable clearable>
            <el-option v-for="item in processSegmentOptions" :key="item.id" :label="item.segmentName" :value="item.segmentName" />
          </el-select>
        </div>

        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.unit }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.unit">单位</el-checkbox>
          </div>
          <el-select v-model="bulkEditForm.unit" :disabled="!bulkEditEnabled.unit" placeholder="选择或输入单位" filterable clearable allow-create default-first-option>
            <el-option v-for="item in unitOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </div>

        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.brand }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.brand">品牌</el-checkbox>
          </div>
          <el-select v-model="bulkEditForm.brand" :disabled="!bulkEditEnabled.brand" placeholder="可选或输入品牌" filterable clearable allow-create default-first-option>
            <el-option v-for="item in brandOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </div>

        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.quantity }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.quantity">数量</el-checkbox>
          </div>
          <el-input-number
            v-model="bulkEditForm.quantity"
            :disabled="!bulkEditEnabled.quantity"
            :min="0.0001"
            :precision="4"
            :controls="false"
            :step="1"
            :value-on-clear="null"
            placeholder="数量"
          />
        </div>

        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.taxRate }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.taxRate">税率(%)</el-checkbox>
          </div>
          <el-input-number
            v-model="bulkEditForm.taxRate"
            :disabled="!bulkEditEnabled.taxRate"
            :min="0"
            :max="100"
            :precision="2"
            :controls="false"
            :step="0.1"
            :value-on-clear="null"
            placeholder="税率"
          />
        </div>

        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.sourceProject }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.sourceProject">来源项目</el-checkbox>
          </div>
          <el-select v-model="bulkEditForm.sourceProject" :disabled="!bulkEditEnabled.sourceProject" placeholder="可选或输入来源项目" filterable clearable allow-create default-first-option>
            <el-option v-for="item in projectOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </div>

        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.purchaseTime }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.purchaseTime">时间</el-checkbox>
          </div>
          <el-date-picker
            v-model="bulkEditForm.purchaseTime"
            :disabled="!bulkEditEnabled.purchaseTime"
            type="month"
            format="YYYY-MM"
            value-format="YYYY-MM"
            placeholder="选择月份"
            clearable
          />
        </div>

        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.priceType }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.priceType">价格类型</el-checkbox>
          </div>
          <el-select v-model="bulkEditForm.priceType" :disabled="!bulkEditEnabled.priceType" placeholder="选择价格类型" clearable>
            <el-option v-for="item in PRICE_TYPE_OPTIONS" :key="item" :label="item" :value="item" />
          </el-select>
        </div>

        <div class="bulk-edit-item" :class="{ enabled: bulkEditEnabled.supplierCompany }">
          <div class="bulk-edit-label">
            <el-checkbox v-model="bulkEditEnabled.supplierCompany">报价供应商</el-checkbox>
          </div>
          <el-select
            v-model="bulkEditForm.supplierCompany"
            :disabled="!bulkEditEnabled.supplierCompany"
            placeholder="可选或输入报价供应商"
            filterable
            clearable
            allow-create
            default-first-option
          >
            <el-option v-for="item in supplierOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
      </div>

      <template #footer>
        <div class="bulk-edit-footer">
          <el-button @click="bulkEditVisible = false">取消</el-button>
          <el-button type="primary" @click="applyBulkEdit">应用到已选行</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import {
  MATERIAL_PRICE_HEADER_FIELD_MAP,
  MATERIAL_PRICE_TEMPLATE_HEADERS,
  PRICE_TYPE_OPTIONS,
  createEmptyMaterialPriceForm,
  normalizeMaterialPriceRow,
  validateMaterialPriceRowClient
} from './materialPriceSchema'
import { uniqueValues } from './mockMaterialData'
import { getCategoryTree, getUnitList, pageProcessSegment } from '@/api/material'
import {
  validateMaterialPriceImport,
  commitMaterialPriceImport,
  downloadMaterialPriceTemplate,
  listMaterialPriceSuppliers,
  listMaterialPriceBrands,
  listMaterialPriceProjects
} from '@/api/materialPrice'

const router = useRouter()
const rows = ref([])
const validating = ref(false)
const committing = ref(false)
const showOnlyError = ref(false)
const selectedIds = ref([])
const validateRows = ref([])
const batchToken = ref('')
const bulkEditVisible = ref(false)

const createBulkEditForm = () => ({
  categoryIds: [],
  categoryName: '',
  categoryLevel1Id: null,
  categoryLevel2Id: null,
  categoryLevel3Id: null,
  processSegmentName: '',
  unit: '',
  brand: '',
  quantity: null,
  taxRate: null,
  sourceProject: '',
  purchaseTime: '',
  priceType: '',
  supplierCompany: ''
})

const createBulkEditEnabled = () => ({
  category: false,
  processSegmentName: false,
  unit: false,
  brand: false,
  quantity: false,
  taxRate: false,
  sourceProject: false,
  purchaseTime: false,
  priceType: false,
  supplierCompany: false
})

const BULK_EDIT_FIELD_LABEL_MAP = {
  category: '所属分类',
  processSegmentName: '工艺段',
  unit: '单位',
  brand: '品牌',
  quantity: '数量',
  taxRate: '税率',
  sourceProject: '来源项目',
  purchaseTime: '时间',
  priceType: '价格类型',
  supplierCompany: '报价供应商'
}

const bulkEditForm = ref(createBulkEditForm())
const bulkEditEnabled = ref(createBulkEditEnabled())

const categoryTree = ref([])
const unitOptions = ref([...(uniqueValues.units || [])])
const processSegmentOptions = ref([])
const supplierOptions = ref([])
const brandOptions = ref([])
const projectOptions = ref([])
const categoryLeafNamePathMap = ref({})

const categoryCascaderProps = {
  value: 'id',
  label: 'categoryName',
  children: 'children',
  emitPath: true,
  checkStrictly: false,
  expandTrigger: 'hover'
}

const summary = computed(() => {
  if (!validateRows.value.length) {
    return { total: rows.value.length, success: 0, failed: 0 }
  }
  const failed = rows.value.filter(row => isRowValidated(row) && getRowErrors(row).length > 0).length
  const success = rows.value.filter(row => isRowValidated(row) && getRowErrors(row).length === 0).length
  return { total: rows.value.length, success, failed }
})

const errorRowNoSet = computed(() => {
  const set = new Set()
  rows.value.forEach(row => {
    if (isRowValidated(row) && getRowErrors(row).length > 0) {
      set.add(row.__rowNo)
    }
  })
  return set
})

const canCommit = computed(() => {
  return (
    rows.value.length > 0 &&
    rows.value.every(isRowValidated) &&
    rows.value.every(row => getRowErrors(row).length === 0) &&
    !!batchToken.value
  )
})

const displayRows = computed(() => {
  if (!showOnlyError.value) {
    return rows.value
  }
  return rows.value.filter(r => errorRowNoSet.value.has(r.__rowNo))
})

const reindexRows = () => {
  rows.value.forEach((row, index) => {
    row.__rowNo = index + 1
  })
}

const clearValidationState = () => {
  validateRows.value = []
  batchToken.value = ''
}

const mergeUniqueStrings = (baseList = [], appendList = []) => {
  return [...new Set([...baseList, ...appendList].map(i => (i || '').toString().trim()).filter(Boolean))]
}

const getUnitDisplayName = (unit) => {
  if (!unit) return ''
  if (typeof unit === 'string') return unit.trim()
  return String(unit.unitSymbol || '').trim() || String(unit.unitName || '').trim()
}

const buildCategoryLeafNamePathMap = (tree = []) => {
  const map = {}
  const walk = (nodes, path = []) => {
    nodes.forEach(node => {
      const nextPath = [...path, node.id]
      const children = Array.isArray(node.children) ? node.children : []
      if (children.length > 0) {
        walk(children, nextPath)
        return
      }
      const name = (node.categoryName || '').trim()
      if (name && !map[name]) {
        map[name] = nextPath
      }
    })
  }
  walk(tree, [])
  return map
}

const getCategoryLabelByPath = (path = []) => {
  if (!Array.isArray(path) || path.length === 0) {
    return ''
  }
  let nodes = categoryTree.value
  let label = ''
  path.forEach(id => {
    const node = (nodes || []).find(item => item.id === id)
    if (node) {
      label = node.categoryName || label
      nodes = node.children || []
    }
  })
  return label
}

const updateMasterMatch = (row) => {
  row.masterMatchMeta = {
    supplierMatched: !!row.supplierCompany && supplierOptions.value.includes(row.supplierCompany),
    brandMatched: !!row.brand && brandOptions.value.includes(row.brand),
    projectMatched: !!row.sourceProject && projectOptions.value.includes(row.sourceProject)
  }
}

const syncOptionsFromRows = () => {
  unitOptions.value = mergeUniqueStrings(unitOptions.value, rows.value.map(i => i.unit))
  supplierOptions.value = mergeUniqueStrings(supplierOptions.value, rows.value.map(i => i.supplierCompany))
  brandOptions.value = mergeUniqueStrings(brandOptions.value, rows.value.map(i => i.brand))
  projectOptions.value = mergeUniqueStrings(projectOptions.value, rows.value.map(i => i.sourceProject))
  rows.value.forEach(updateMasterMatch)
}

const loadMasterOptions = async () => {
  try {
    const [suppliers, brands, projects] = await Promise.all([
      listMaterialPriceSuppliers(''),
      listMaterialPriceBrands(''),
      listMaterialPriceProjects('')
    ])
    supplierOptions.value = mergeUniqueStrings(supplierOptions.value, suppliers || [])
    brandOptions.value = mergeUniqueStrings(brandOptions.value, brands || [])
    projectOptions.value = mergeUniqueStrings(projectOptions.value, projects || [])
  } catch (error) {
    // 主数据下拉获取失败时保持可自由输入
  }
}

const loadSelectOptions = async () => {
  try {
    const tree = await getCategoryTree()
    categoryTree.value = tree || []
    categoryLeafNamePathMap.value = buildCategoryLeafNamePathMap(categoryTree.value)
  } catch (error) {
    categoryTree.value = []
    categoryLeafNamePathMap.value = {}
  }

  try {
    const units = await getUnitList()
    const unitNames = (units || []).map(item => getUnitDisplayName(item))
    unitOptions.value = mergeUniqueStrings(unitOptions.value, unitNames)
  } catch (error) {
    // 忽略单位接口异常，保留默认选项
  }

  try {
    const segments = await pageProcessSegment({ pageNum: 1, pageSize: 1000, status: '1' })
    processSegmentOptions.value = segments.records || []
  } catch (error) {
    processSegmentOptions.value = []
  }

  await loadMasterOptions()
}

const handleCategoryChange = (row, value) => {
  const ids = Array.isArray(value) ? value : []
  row.categoryIds = ids
  row.categoryLevel1Id = ids[0] || null
  row.categoryLevel2Id = ids[1] || null
  row.categoryLevel3Id = ids[2] || null
  row.categoryName = ids.length > 0 ? getCategoryLabelByPath(ids) : ''
}

const handleBulkCategoryChange = (value) => {
  const ids = Array.isArray(value) ? value : []
  bulkEditForm.value.categoryIds = ids
  bulkEditForm.value.categoryLevel1Id = ids[0] || null
  bulkEditForm.value.categoryLevel2Id = ids[1] || null
  bulkEditForm.value.categoryLevel3Id = ids[2] || null
  bulkEditForm.value.categoryName = ids.length > 0 ? getCategoryLabelByPath(ids) : ''
}

const priceSyncing = ref(false)

const hasValidNumber = (v) => v !== '' && v !== null && v !== undefined && !Number.isNaN(Number(v))
const round2 = (v) => Number(Number(v).toFixed(2))

const handlePriceFieldChange = (row, changedField) => {
  if (priceSyncing.value) {
    return
  }

  const hasExcl = hasValidNumber(row.priceExcludingTax)
  const hasTax = hasValidNumber(row.taxRate)
  const hasIncl = hasValidNumber(row.priceIncludingTax)
  if ([hasExcl, hasTax, hasIncl].filter(Boolean).length < 2) {
    return
  }

  const excl = hasExcl ? Number(row.priceExcludingTax) : null
  const tax = hasTax ? Number(row.taxRate) : null
  const incl = hasIncl ? Number(row.priceIncludingTax) : null

  priceSyncing.value = true
  try {
    if (!hasIncl && hasExcl && hasTax) {
      row.priceIncludingTax = round2(excl * (1 + tax / 100))
      return
    }
    if (!hasTax && hasExcl && hasIncl) {
      if (Math.abs(excl) < 1e-9) {
        row.taxRate = 0
      } else {
        row.taxRate = round2((incl / excl - 1) * 100)
      }
      return
    }
    if (!hasExcl && hasTax && hasIncl) {
      const divisor = 1 + tax / 100
      row.priceExcludingTax = Math.abs(divisor) < 1e-9 ? null : round2(incl / divisor)
      return
    }

    if (hasExcl && hasTax && hasIncl) {
      if (changedField === 'priceIncludingTax') {
        if (Math.abs(excl) < 1e-9) {
          row.taxRate = 0
        } else {
          row.taxRate = round2((incl / excl - 1) * 100)
        }
      } else {
        row.priceIncludingTax = round2(excl * (1 + tax / 100))
      }
    }
  } finally {
    priceSyncing.value = false
  }
}

onMounted(async () => {
  await loadSelectOptions()
})

const handleBack = () => {
  router.push({ path: '/workbench', query: { tab: '材价查询' } })
}

const handleDownloadTemplate = async () => {
  try {
    const blobData = await downloadMaterialPriceTemplate()
    const blob = new Blob([blobData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, `材价导入模板_${Date.now()}.xlsx`)
  } catch (error) {
    const ws = XLSX.utils.aoa_to_sheet([MATERIAL_PRICE_TEMPLATE_HEADERS])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '材价导入模板')
    XLSX.writeFile(wb, `材价导入模板_${Date.now()}.xlsx`)
    ElMessage.warning('模板接口下载失败，已切换为本地模板')
  }
}

const handleFileChange = async (file) => {
  const rawFile = file?.raw
  if (!rawFile) {
    return
  }

  const ab = await rawFile.arrayBuffer()
  const wb = XLSX.read(ab, { type: 'array' })
  const first = wb.SheetNames[0]
  const ws = wb.Sheets[first]
  const table = XLSX.utils.sheet_to_json(ws, { header: 1 })

  if (!table.length) {
    ElMessage.warning('Excel内容为空')
    return
  }

  const normalizeHeader = (value) => (value || '').toString().trim().replace(/\*/g, '')
  const header = table[0].map(i => normalizeHeader(i))
  const headerIndexMap = {}
  header.forEach((h, idx) => {
    if (MATERIAL_PRICE_HEADER_FIELD_MAP[h]) {
      headerIndexMap[h] = idx
    }
  })

  const expectedHeaders = MATERIAL_PRICE_TEMPLATE_HEADERS.map(i => normalizeHeader(i))
  const missingHeaders = expectedHeaders.filter(h => !(h in headerIndexMap) && h !== '备注')
  if (missingHeaders.length) {
    ElMessage.error(`模板表头不完整，缺少：${missingHeaders.join('、')}`)
    return
  }

  const imported = []
  for (let i = 1; i < table.length; i++) {
    const row = table[i]
    if (!row || row.every(cell => (cell ?? '').toString().trim() === '')) {
      continue
    }

    const obj = {}
    Object.entries(MATERIAL_PRICE_HEADER_FIELD_MAP).forEach(([cn, field]) => {
      const idx = headerIndexMap[cn]
      obj[field] = idx === undefined ? '' : row[idx]
    })

    const normalized = normalizeMaterialPriceRow(obj)
    const path = normalized.categoryName ? categoryLeafNamePathMap.value[normalized.categoryName] : null
    if (Array.isArray(path) && path.length === 3) {
      normalized.categoryIds = path
      normalized.categoryLevel1Id = path[0]
      normalized.categoryLevel2Id = path[1]
      normalized.categoryLevel3Id = path[2]
    }
    imported.push(normalized)
  }

  rows.value = imported.map((item, idx) => ({
    ...item,
    __id: Date.now() + idx + Math.random(),
    __rowNo: idx + 1
  }))
  syncOptionsFromRows()
  clearValidationState()
  ElMessage.success(`导入成功，共${rows.value.length}行，请点击“校验数据”`)
}

const handleAddRow = () => {
  rows.value.unshift({
    ...createEmptyMaterialPriceForm(),
    __id: Date.now() + Math.random(),
    __rowNo: 0
  })
  reindexRows()
  syncOptionsFromRows()
  clearValidationState()
}

const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(i => i.__id)
}

const resetBulkEditForm = () => {
  bulkEditForm.value = createBulkEditForm()
  bulkEditEnabled.value = createBulkEditEnabled()
}

const openBulkEditDialog = () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先勾选需要批量修改的数据行')
    return
  }
  resetBulkEditForm()
  bulkEditVisible.value = true
}

const handleBatchDelete = async () => {
  await ElMessageBox.confirm(`确定删除已选中的 ${selectedIds.value.length} 行吗？`, '提示', { type: 'warning' })
  rows.value = rows.value.filter(i => !selectedIds.value.includes(i.__id))
  selectedIds.value = []
  reindexRows()
  syncOptionsFromRows()
  clearValidationState()
}

const applyBulkEdit = () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('未找到已选行，请重新勾选后再试')
    return
  }

  const enabledFields = Object.keys(bulkEditEnabled.value).filter(key => bulkEditEnabled.value[key])
  if (enabledFields.length === 0) {
    ElMessage.warning('请至少勾选一个要批量修改的字段')
    return
  }

  const selectedSet = new Set(selectedIds.value)
  let updatedCount = 0
  rows.value.forEach(row => {
    if (!selectedSet.has(row.__id)) {
      return
    }
    updatedCount += 1

    if (bulkEditEnabled.value.category) {
      row.categoryIds = [...bulkEditForm.value.categoryIds]
      row.categoryLevel1Id = bulkEditForm.value.categoryLevel1Id
      row.categoryLevel2Id = bulkEditForm.value.categoryLevel2Id
      row.categoryLevel3Id = bulkEditForm.value.categoryLevel3Id
      row.categoryName = bulkEditForm.value.categoryName
    }
    if (bulkEditEnabled.value.processSegmentName) {
      row.processSegmentName = bulkEditForm.value.processSegmentName
    }
    if (bulkEditEnabled.value.unit) {
      row.unit = bulkEditForm.value.unit
    }
    if (bulkEditEnabled.value.brand) {
      row.brand = bulkEditForm.value.brand
    }
    if (bulkEditEnabled.value.quantity) {
      row.quantity = bulkEditForm.value.quantity
    }
    if (bulkEditEnabled.value.taxRate) {
      row.taxRate = bulkEditForm.value.taxRate
      handlePriceFieldChange(row, 'taxRate')
    }
    if (bulkEditEnabled.value.sourceProject) {
      row.sourceProject = bulkEditForm.value.sourceProject
    }
    if (bulkEditEnabled.value.purchaseTime) {
      row.purchaseTime = bulkEditForm.value.purchaseTime
    }
    if (bulkEditEnabled.value.priceType) {
      row.priceType = bulkEditForm.value.priceType
    }
    if (bulkEditEnabled.value.supplierCompany) {
      row.supplierCompany = bulkEditForm.value.supplierCompany
    }
    updateMasterMatch(row)
  })

  syncOptionsFromRows()
  clearValidationState()
  bulkEditVisible.value = false

  const fieldLabels = enabledFields.map(key => BULK_EDIT_FIELD_LABEL_MAP[key]).filter(Boolean)
  ElMessage.success(`批量修改完成：已更新 ${updatedCount} 行，字段：${fieldLabels.join('、')}`)
}

const sanitizeRows = () => {
  return rows.value.map(row => {
    const cleaned = {}
    Object.values(MATERIAL_PRICE_HEADER_FIELD_MAP).forEach(field => {
      cleaned[field] = row[field]
    })
    cleaned.categoryLevel1Id = row.categoryLevel1Id || undefined
    cleaned.categoryLevel2Id = row.categoryLevel2Id || undefined
    cleaned.categoryLevel3Id = row.categoryLevel3Id || undefined
    return cleaned
  })
}

const handleValidate = async () => {
  if (rows.value.length === 0) {
    ElMessage.warning('请先导入或新增数据')
    return
  }

  const localErrorCount = rows.value.filter(row => validateMaterialPriceRowClient(row).length > 0).length
  validating.value = true
  try {
    const result = await validateMaterialPriceImport(sanitizeRows())
    validateRows.value = result.rows || []
    batchToken.value = result.batchToken || ''
    if (localErrorCount > 0) {
      ElMessage.warning(`本地预检发现 ${localErrorCount} 行异常，已合并服务端校验结果`)
    } else {
      ElMessage.success('校验完成')
    }
  } finally {
    validating.value = false
  }
}

const getValidateItem = (row) => {
  return validateRows.value.find(i => i.rowNo === row.__rowNo)
}

const isRowValidated = (row) => {
  return !!getValidateItem(row)
}

const mergeIssues = (serverIssues = [], clientIssues = []) => {
  const merged = [...serverIssues]
  clientIssues.forEach(issue => {
    const exists = merged.some(item => item.field === issue.field && item.message === issue.message)
    if (!exists) {
      merged.push(issue)
    }
  })
  return merged
}

const getRowErrors = (row) => {
  const serverErrors = getValidateItem(row)?.errors || []
  const clientErrors = validateMaterialPriceRowClient(row)
  return mergeIssues(serverErrors, clientErrors)
}

const getRowWarnings = (row) => {
  return getValidateItem(row)?.warnings || []
}

const handleCommit = async () => {
  if (!canCommit.value) {
    ElMessage.warning('请先完成校验并修复所有错误')
    return
  }

  committing.value = true
  try {
    const res = await commitMaterialPriceImport({
      batchToken: batchToken.value,
      rows: sanitizeRows()
    })
    ElMessage.success(`提交成功，已入库 ${res.insertCount || 0} 条`)
    router.push({ path: '/workbench', query: { tab: '材价查询' } })
  } finally {
    committing.value = false
  }
}
</script>

<style scoped lang="scss">
.material-price-create-page {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  min-height: 0;
}

.toolbar-card,
.summary-card,
.table-card,
.footer-actions {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
}

.toolbar-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 12px;

  .left-tools {
    display: flex;
    gap: 8px;
    align-items: center;
  }
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 12px;

  .summary-item.pass b {
    color: #67c23a;
  }

  .summary-item.fail b {
    color: #f56c6c;
  }
}

.table-card {
  flex: 1;
  min-height: 0;
  padding: 8px;

  :deep(.el-table .cell) {
    padding: 2px 6px;
  }

  :deep(.el-table .el-table-column--selection .cell) {
    text-align: center;
  }

  :deep(.el-input__wrapper) {
    box-shadow: inset 0 0 0 1px #dcdfe6;
  }

  :deep(.el-select),
  :deep(.el-cascader),
  :deep(.el-input-number),
  :deep(.el-date-editor.el-input) {
    width: 100%;
  }

  .validation-cell {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .msg-tag {
    margin-right: 0;
    max-width: 100%;
    white-space: normal;
  }
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 12px;
}

.bulk-edit-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px 8px;

  .bulk-edit-title {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 16px;
    font-weight: 600;
    color: #1f2a37;
  }

  .bulk-edit-subtitle {
    font-size: 12px;
    font-weight: 400;
    color: #6b7280;
  }
}

.bulk-edit-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.bulk-edit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5eaf3;
  border-radius: 8px;
  padding: 8px 10px;
  background: #fbfcff;
  transition: all 0.2s ease;

  .bulk-edit-label {
    margin-bottom: 0;
    flex: 0 0 108px;
    font-weight: 600;
    color: #4b5563;
    line-height: 1.2;
  }

  :deep(.el-checkbox) {
    width: 100%;
    margin-right: 0;
  }

  :deep(.el-select),
  :deep(.el-cascader),
  :deep(.el-input-number),
  :deep(.el-date-editor.el-input) {
    flex: 1;
    width: auto;
  }
}

.bulk-edit-item.enabled {
  border-color: #91b5ff;
  background: #f5f8ff;
  box-shadow: 0 4px 12px rgba(64, 113, 255, 0.1);
}

.bulk-edit-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

:deep(.bulk-edit-dialog .el-dialog__header) {
  padding-bottom: 10px;
  border-bottom: 1px solid #edf1f7;
}

:deep(.bulk-edit-dialog .el-dialog) {
  width: min(860px, 92vw);
  max-width: 860px;
}

:deep(.bulk-edit-dialog .el-dialog__body) {
  padding-top: 12px;
  max-height: 62vh;
  overflow: auto;
}

:deep(.bulk-edit-dialog .el-input__wrapper),
:deep(.bulk-edit-dialog .el-select__wrapper) {
  min-height: 32px;
}

@media (max-width: 960px) {
  .bulk-edit-grid {
    grid-template-columns: 1fr;
  }

  .bulk-edit-item {
    .bulk-edit-label {
      flex-basis: 96px;
    }
  }
}

.required-label {
  position: relative;
  padding-left: 8px;
}

.required-label::before {
  content: '*';
  position: absolute;
  left: 0;
  color: #f56c6c;
}
</style>
