<template>
  <div class="standard-review-tab">
    <section class="filter-panel-glass">
      <el-form :model="queryForm" size="default" class="custom-query-form">
        <div class="filter-row-primary">
          <div class="filter-items">
            <el-form-item>
              <el-input
                v-model="queryForm.materialName"
                placeholder="输入材料名称（前/后）"
                clearable
                style="width: 240px"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="queryForm.specification"
                placeholder="输入规格型号（前/后）"
                clearable
                style="width: 260px"
              />
            </el-form-item>
          </div>
          <div class="action-group">
            <el-button type="primary" @click="handleQuery" icon="Search" class="btn-search">查询</el-button>
            <el-button @click="handleReset" icon="Refresh" class="btn-reset">重置</el-button>
            <el-button link type="primary" @click="showAdvanced = !showAdvanced" class="btn-advanced">
              {{ showAdvanced ? '收起' : '高级' }}
              <el-icon class="el-icon--right"><component :is="showAdvanced ? 'ArrowUp' : 'ArrowDown'" /></el-icon>
            </el-button>
          </div>
        </div>

        <el-collapse-transition>
          <div v-show="showAdvanced" class="filter-row-secondary">
            <el-form-item>
              <el-select v-model="queryForm.status" placeholder="全部状态" clearable style="width: 160px">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="queryForm.standardCode" placeholder="输入标准编码" clearable style="width: 200px" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="queryForm.processSegment" placeholder="输入工艺段（前/后）" clearable style="width: 220px" />
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>
    </section>

    <section class="table-container-glass">
      <div v-loading="loading" class="review-card-list">
        <div
          v-for="(row, index) in tableData"
          :key="row.id || `${row.materialName}-${row.specification}-${index}`"
          class="review-card"
        >
          <div class="card-left">
            <div class="data-block">
              <div class="block-title">标准化前</div>
              <div class="kv-grid">
                <div class="kv-row">
                  <span class="kv-label">材料</span>
                  <el-tooltip :content="getTooltipText(row.materialName)" placement="top" :disabled="!shouldShowTooltip(row, index, 'materialName', row.materialName)">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'materialName')">{{ row.materialName || '-' }}</span>
                  </el-tooltip>
                </div>
                <div class="kv-row">
                  <span class="kv-label">规格</span>
                  <el-tooltip :content="getTooltipText(row.specification)" placement="top" :disabled="!shouldShowTooltip(row, index, 'specification', row.specification)">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'specification')">{{ row.specification || '-' }}</span>
                  </el-tooltip>
                </div>
                <div class="kv-row">
                  <span class="kv-label">单位</span>
                  <el-tooltip :content="getTooltipText(formatUnitText(row.unitName))" placement="top" :disabled="!shouldShowTooltip(row, index, 'unitName', formatUnitText(row.unitName))">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'unitName')">{{ formatUnitText(row.unitName) }}</span>
                  </el-tooltip>
                </div>
                <div class="kv-row">
                  <span class="kv-label">工艺段</span>
                  <el-tooltip :content="getTooltipText(row.originalProcessSegment)" placement="top" :disabled="!shouldShowTooltip(row, index, 'originalProcessSegment', row.originalProcessSegment)">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'originalProcessSegment')">{{ row.originalProcessSegment || '-' }}</span>
                  </el-tooltip>
                </div>
                <div class="kv-row">
                  <span class="kv-label">备注</span>
                  <el-tooltip :content="getTooltipText(row.remark)" placement="top" :disabled="!shouldShowTooltip(row, index, 'remark', row.remark)">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'remark')">{{ row.remark || '-' }}</span>
                  </el-tooltip>
                </div>
              </div>
            </div>

            <div class="data-block data-block-after">
              <div class="block-title">标准化后</div>
              <div class="kv-grid">
                <div class="kv-row">
                  <span class="kv-label">标准材料</span>
                  <el-tooltip :content="getTooltipText(row.standardStdName)" placement="top" :disabled="!shouldShowTooltip(row, index, 'standardStdName', row.standardStdName)">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'standardStdName')">{{ row.standardStdName || '-' }}</span>
                  </el-tooltip>
                </div>
                <div class="kv-row">
                  <span class="kv-label">标准规格</span>
                  <el-tooltip :content="getTooltipText(formatAttrSummary(row.standardAttrValues))" placement="top" :disabled="!shouldShowTooltip(row, index, 'standardAttrSummary', formatAttrSummary(row.standardAttrValues))">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'standardAttrSummary')">{{ formatAttrSummary(row.standardAttrValues) }}</span>
                  </el-tooltip>
                </div>
                <div class="kv-row">
                  <span class="kv-label">标准单位</span>
                  <el-tooltip :content="getTooltipText(formatUnitText(row.standardUnitName))" placement="top" :disabled="!shouldShowTooltip(row, index, 'standardUnitName', formatUnitText(row.standardUnitName))">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'standardUnitName')">{{ formatUnitText(row.standardUnitName) }}</span>
                  </el-tooltip>
                </div>
                <div class="kv-row">
                  <span class="kv-label">标准工艺段</span>
                  <el-tooltip :content="getTooltipText(row.standardSegmentName)" placement="top" :disabled="!shouldShowTooltip(row, index, 'standardSegmentName', row.standardSegmentName)">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'standardSegmentName')">{{ row.standardSegmentName || '-' }}</span>
                  </el-tooltip>
                </div>
                <div class="kv-row">
                  <span class="kv-label">标准编码</span>
                  <el-tooltip :content="getTooltipText(row.standardCode)" placement="top" :disabled="!shouldShowTooltip(row, index, 'standardCode', row.standardCode)">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'standardCode')">{{ row.standardCode || '-' }}</span>
                  </el-tooltip>
                </div>
                <div class="kv-row">
                  <span class="kv-label">标准分类</span>
                  <el-tooltip :content="getTooltipText(getCategoryDisplay(row))" placement="top" :disabled="!shouldShowTooltip(row, index, 'categoryDisplay', getCategoryDisplay(row))">
                    <span class="kv-value" @mouseenter="onValueHover($event, row, index, 'categoryDisplay')">{{ getCategoryDisplay(row) }}</span>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>

          <div class="card-right">
            <div class="right-top">
              <el-tag size="small" :type="getStatusTagType(row.standardizationStatus)">
                <span class="status-tag-content">
                  <span>{{ getStatusLabel(row.standardizationStatus) }}</span>
                  <el-tooltip v-if="row.errorMessage" :content="formatErrorMessage(row.errorMessage)" placement="top">
                    <el-icon class="status-error-icon"><WarningFilled /></el-icon>
                  </el-tooltip>
                </span>
              </el-tag>
            </div>

            <div class="right-meta">
              <div class="meta-item">
                <span class="meta-label">更新时间</span>
                <span class="meta-value">{{ formatDateTimeToSecond(getRowUpdateTime(row)) }}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">换算系数</span>
                <span class="meta-value">{{ row.conversionFactor || '-' }}</span>
              </div>
            </div>

            <div class="card-actions">
              <el-tooltip content="编辑" placement="left">
                <el-button class="action-btn action-btn-edit" @click="handleEdit(row)">
                  <el-icon><EditPen /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="left">
                <el-button class="action-btn action-btn-delete" @click="handleDelete(row)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
        <el-empty v-if="!loading && !tableData.length" description="暂无数据" :image-size="100" />
      </div>

      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="queryForm.pageNum"
          v-model:page-size="queryForm.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="handleQuery"
          @current-change="handleQuery"
        />
      </div>
    </section>

    <el-dialog
      v-model="dialogVisible"
      title="编辑标准化复核"
      width="1020px"
      :close-on-click-modal="false"
      class="review-edit-dialog"
    >
      <div class="review-edit-layout">
        <section class="origin-panel">
          <div class="panel-head">
            <h4>原始材料信息</h4>
            <span class="panel-tip">先看原始信息，再完成右侧标准化选择</span>
          </div>
          <div class="origin-fields">
            <div class="origin-item origin-item-main">
              <span class="origin-label">原始名称</span>
              <el-tooltip :content="formData.materialName || '-'" :disabled="!(formData.materialName || '').length">
                <span class="origin-value">{{ formData.materialName || '-' }}</span>
              </el-tooltip>
            </div>
            <div class="origin-item">
              <span class="origin-label">原始规格</span>
              <span class="origin-value">{{ formData.specification || '-' }}</span>
            </div>
            <div class="origin-item">
              <span class="origin-label">原始单位</span>
              <span class="origin-value">{{ formatUnitText(formData.unitName) }}</span>
            </div>
            <div class="origin-item">
              <span class="origin-label">原始工艺段</span>
              <span class="origin-value">{{ formData.originalProcessSegment || '-' }}</span>
            </div>
            <div class="origin-item">
              <span class="origin-label">原始备注</span>
              <span class="origin-value">{{ formData.remark || '-' }}</span>
            </div>
          </div>
        </section>

        <section class="mapping-panel">
          <div class="step-card">
            <div class="step-title">
              <span class="step-index">1</span>
              <span>先定位分类，再选标准材料</span>
            </div>
            <el-form :model="formData" label-width="112px" class="mapping-form">
              <el-form-item label="三级分类">
                <el-cascader
                  v-model="formData.categoryPath"
                  :options="categoryTree"
                  :props="categoryProps"
                  clearable
                  filterable
                  style="width: 100%"
                  @change="handleCategoryChange"
                />
                <div class="field-hint">{{ selectedCategoryPathText || '请选择二/三级分类，系统将联动过滤标准材料名称' }}</div>
              </el-form-item>
              <el-form-item label="标准材料名称">
                <el-select
                  v-model="formData.standardStdNameId"
                  clearable
                  filterable
                  :disabled="!canSelectStdName"
                  :no-data-text="stdNameNoDataText"
                  style="width: 100%"
                  @change="handleStdNameChange"
                >
                  <el-option v-for="item in filteredStdNameOptions" :key="item.id" :label="item.standardName" :value="item.id" />
                </el-select>
                <div class="field-hint">{{ selectedStdNameLabel || '将优先显示与原始名称更接近的标准材料名称' }}</div>
              </el-form-item>
            </el-form>
          </div>

          <div class="step-card step-card-spec">
            <div class="step-title">
              <span class="step-index">2</span>
              <span>确认规格属性与补充信息</span>
            </div>
            <el-form :model="formData" label-width="112px" class="mapping-form">
              <el-form-item label="标准规格属性">
                <el-select
                  v-model="formData.standardAttrValueIds"
                  multiple
                  clearable
                  filterable
                  :disabled="!canSelectAttr"
                  style="width: 100%"
                >
                  <el-option v-for="item in attrValueOptions" :key="item.id" :label="item.label" :value="item.id" />
                </el-select>
                <div class="attr-selected-preview">
                  <span class="preview-label">已选：</span>
                  <span class="preview-value">{{ selectedAttrSummary }}</span>
                </div>
              </el-form-item>
              <el-form-item label="标准单位">
                <el-select v-model="formData.standardUnitId" clearable filterable style="width: 100%">
                  <el-option v-for="item in unitOptions" :key="item.id" :label="getUnitDisplayName(item)" :value="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item label="标准工艺段">
                <el-select v-model="formData.standardSegmentId" clearable filterable style="width: 100%">
                  <el-option v-for="item in processSegmentOptions" :key="item.id" :label="item.segmentName" :value="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item label="换算系数">
                <el-input-number v-model="formData.conversionFactor" :min="0.000001" :precision="6" style="width: 100%" />
              </el-form-item>
            </el-form>
          </div>
        </section>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, EditPen, WarningFilled } from '@element-plus/icons-vue'
import {
  deleteStandardReview,
  getCategoryTree,
  getSpecModelById,
  getStandardReviewById,
  getUnitList,
  pageProcessSegment,
  pageSpecModel,
  pageStandardReview,
  updateStandardReview
} from '@/api/material'

const loading = ref(false)
const total = ref(0)
const tableData = ref([])
const dialogVisible = ref(false)
const submitLoading = ref(false)
const categoryTree = ref([])
const stdNameOptions = ref([])
const unitOptions = ref([])
const processSegmentOptions = ref([])
const attrValueOptions = ref([])
const stdNameOptionsCache = ref({})
const stdNameOptionsPending = ref({})
const inited = ref(false)
const showAdvanced = ref(false)
const editInitializing = ref(false)
const editLoading = ref(false)

const props = defineProps({
  selectedCategory: {
    type: Object,
    default: () => ({})
  }
})

const statusOptions = [
  { label: '待处理', value: 'PENDING' },
  { label: '处理中', value: 'RUNNING' },
  { label: '已完成(AI)', value: 'SUCCESS' },
  { label: '已完成(人工)', value: 'MANUAL' },
  { label: '失败(AI)', value: 'FAILED' }
]

const queryForm = reactive({
  materialName: '',
  specification: '',
  status: '',
  standardCode: '',
  processSegment: '',
  categoryLevel1Id: null,
  categoryLevel2Id: null,
  categoryLevel3Id: null,
  orderByColumn: 'updateTime',
  isAsc: 'desc',
  pageNum: 1,
  pageSize: 20
})

const formData = reactive({
  id: null,
  materialName: '',
  specification: '',
  unitName: '',
  originalProcessSegment: '',
  remark: '',
  categoryPath: [],
  standardStdNameId: null,
  standardAttrValueIds: [],
  standardUnitId: null,
  standardSegmentId: null,
  conversionFactor: 1
})

const categoryProps = {
  value: 'id',
  label: 'categoryName',
  children: 'children',
  emitPath: true,
  checkStrictly: false
}

const categoryPathNameMap = ref({})
const categoryNodeMap = ref({})
const categoryParentMap = ref({})

const buildCategoryPathNameMap = (nodes = [], path = [], parentId = null) => {
  nodes.forEach((node) => {
    const currentPath = [...path, node.categoryName]
    categoryPathNameMap.value[node.id] = currentPath
    categoryNodeMap.value[node.id] = node
    categoryParentMap.value[node.id] = parentId
    if (node.children?.length) {
      buildCategoryPathNameMap(node.children, currentPath, node.id)
    }
  })
}

const normalizeText = (value) => String(value || '').trim().toLowerCase()

const normalizeId = (value) => {
  if (value === null || value === undefined || value === '') return null
  const numeric = Number(value)
  if (Number.isNaN(numeric) || numeric <= 0) return null
  return numeric
}

const normalizeIdList = (values) => {
  if (!Array.isArray(values)) return []
  return values
    .map(item => normalizeId(item))
    .filter(item => item !== null)
}

const pickFirstValidId = (...values) => {
  for (const value of values) {
    const id = normalizeId(value)
    if (id !== null) return id
  }
  return null
}

const extractAttrIdsFromValues = (values) => {
  if (!Array.isArray(values)) return []
  return values
    .map(item => normalizeId(item?.id ?? item?.specValueId))
    .filter(item => item !== null)
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const isRepeatSubmitError = (error) => {
  const message = String(error?.msg || error?.message || '').trim()
  return message.includes('请勿重复提交') || message.includes('数据正在处理')
}

const extractKeywordTokens = (value) => {
  const text = String(value || '').trim()
  if (!text) return []
  const segments = text.split(/[\\/|,，、;；\s()（）\-_]+/).filter(Boolean)
  const tokens = [...new Set([text, ...segments].filter(item => item.length >= 2))]
  return tokens.slice(0, 6)
}

const findAncestorByLevel = (startId, level) => {
  let currentId = startId
  while (currentId) {
    const node = categoryNodeMap.value[currentId]
    if (!node) break
    if (Number(node.level) === level) return node
    currentId = categoryParentMap.value[currentId]
  }
  return null
}

const selectedLevel3Id = computed(() => {
  const path = formData.categoryPath || []
  const targetId = path[path.length - 1]
  const node = categoryNodeMap.value[targetId]
  if (!node) return null
  if (Number(node.level) === 3) return node.id
  return null
})

const selectedLevel2Id = computed(() => {
  const path = formData.categoryPath || []
  const targetId = path[path.length - 1]
  const node = categoryNodeMap.value[targetId]
  if (!node) return null
  if (Number(node.level) === 2) return node.id
  if (Number(node.level) === 3) {
    return findAncestorByLevel(node.id, 2)?.id || null
  }
  return null
})

const selectedCategoryPathText = computed(() => {
  const path = formData.categoryPath || []
  const targetId = path[path.length - 1]
  if (!targetId) return ''
  const names = categoryPathNameMap.value[targetId] || []
  return names.length ? `当前分类：${names.join(' / ')}` : ''
})

const filteredStdNameOptions = computed(() => {
  const level2Id = selectedLevel2Id.value
  const source = (stdNameOptions.value || []).filter(item => {
    if (!level2Id) return false
    return String(item.categoryLevel2Id || '') === String(level2Id)
  })
  const selectedId = normalizeId(formData.standardStdNameId)
  if (selectedId && !source.some(item => String(item.id) === String(selectedId))) {
    const selectedItem = (stdNameOptions.value || []).find(item => String(item.id) === String(selectedId))
    if (selectedItem) {
      source.unshift(selectedItem)
    }
  }
  if (!source.length) return []
  const materialTokens = extractKeywordTokens(formData.materialName)
  if (!materialTokens.length) return source
  return [...source].sort((a, b) => {
    const aName = normalizeText(a.standardName)
    const bName = normalizeText(b.standardName)
    const getScore = (name) => materialTokens.reduce((score, token) => {
      const tokenText = normalizeText(token)
      if (!tokenText) return score
      if (name === tokenText) return score + 10
      if (name.includes(tokenText) || tokenText.includes(name)) return score + 5
      return score
    }, 0)
    return getScore(bName) - getScore(aName)
  })
})

const canSelectStdName = computed(() => Boolean(selectedLevel2Id.value))
const canSelectAttr = computed(() => Boolean(formData.standardStdNameId))

const stdNameNoDataText = computed(() => {
  if (!canSelectStdName.value) return '请先选择二/三级分类'
  return '当前分类下暂无可选标准材料名称'
})

const selectedStdNameLabel = computed(() => {
  const selectedId = normalizeId(formData.standardStdNameId)
  const hit = (filteredStdNameOptions.value || []).find(item => String(item.id) === String(selectedId))
    || (stdNameOptions.value || []).find(item => String(item.id) === String(selectedId))
  if (!hit) return ''
  return `已选：${hit.standardName}`
})

const selectedAttrSummary = computed(() => {
  const ids = formData.standardAttrValueIds || []
  if (!ids.length) return '未选择'
  const optionMap = new Map((attrValueOptions.value || []).map(item => [item.id, item.label]))
  const labels = ids.map(id => optionMap.get(id)).filter(Boolean)
  return labels.length ? labels.join('；') : '未选择'
})

const getCategoryDisplay = (row) => {
  const path = categoryPathNameMap.value[row.standardCategoryLevel3Id] || []
  if (path.length >= 2) {
    return path.slice(-2).join('/')
  }
  if (path.length === 1) {
    return path[0]
  }
  return row.standardCategoryLevel3Name || '-'
}

const formatAttrItems = (attrValues = []) => {
  if (!Array.isArray(attrValues) || !attrValues.length) return []
  return attrValues.map((item) => {
    const specKey = item.specKey || '规格'
    const specValue = item.specValue || item.specValueCode || '-'
    return `${specKey}：${specValue}`
  })
}

const formatAttrSummary = (attrValues = []) => {
  const items = formatAttrItems(attrValues)
  return items.length ? items.join('；') : '-'
}

const formatUnitText = (value) => {
  const text = String(value || '').trim()
  if (!text) return '-'
  return text.replace(/\s*\(U\d+\)\s*$/i, '').trim() || '-'
}

const getUnitDisplayName = (unit) => {
  if (!unit) return ''
  return String(unit.unitSymbol || '').trim() || String(unit.unitName || '').trim()
}

const getRowUpdateTime = (row) => row?.updateTime || row?.standardizedAt || null

const pad2 = (num) => `${num}`.padStart(2, '0')

const formatDateTimeToSecond = (value) => {
  if (!value) return '--'
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '--'
  const year = date.getFullYear()
  const month = pad2(date.getMonth() + 1)
  const day = pad2(date.getDate())
  const hour = pad2(date.getHours())
  const minute = pad2(date.getMinutes())
  const second = pad2(date.getSeconds())
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

const getStatusLabel = (status) => {
  const map = {
    PENDING: '待处理',
    RUNNING: '处理中',
    SUCCESS: '已完成(AI)',
    SKIPPED: '已完成(AI)',
    MANUAL: '已完成(人工)',
    FAILED: '失败(AI)',
    DELETED: '待处理'
  }
  return map[status] || status || '-'
}

const getStatusTagType = (status) => {
  const map = {
    PENDING: 'info',
    RUNNING: 'warning',
    SUCCESS: 'success',
    SKIPPED: 'success',
    MANUAL: 'primary',
    FAILED: 'danger',
    DELETED: 'info'
  }
  return map[status] || 'info'
}

const formatErrorMessage = (rawMessage) => {
  const text = String(rawMessage || '').trim()
  if (!text) return ''
  const lowered = text.toLowerCase()
  if (
    lowered.includes('unknown column') ||
    lowered.includes('no such column') ||
    lowered.includes('sql') ||
    lowered.includes('traceback') ||
    lowered.includes('operationalerror')
  ) {
    return '标准化失败：标准库版本不一致，请刷新后重试。'
  }
  if (
    lowered.includes('timeout') ||
    lowered.includes('timed out')
  ) {
    return '标准化失败：系统繁忙，请稍后重试。'
  }
  if (
    lowered.includes('permission denied') ||
    lowered.includes('forbidden') ||
    lowered.includes('unauthorized')
  ) {
    return '标准化失败：当前账号无操作权限，请联系管理员。'
  }
  if (
    lowered.includes('duplicate') ||
    lowered.includes('already exists')
  ) {
    return '标准化失败：该记录已有标准化任务，请勿重复提交。'
  }
  if (
    lowered.includes('未映射') ||
    lowered.includes('分类编码') ||
    lowered.includes('未找到可用三级分类')
  ) {
    return '标准化失败：分类与标准映射缺失，请联系管理员。'
  }
  return '标准化失败：系统繁忙，请稍后重试。'
}

const getTooltipText = (value) => {
  const text = String(value ?? '').trim()
  if (!text || text === '-') return ''
  return text
}

const overflowStateMap = ref({})

const getOverflowKey = (row, index, field) => {
  const rowKey = row?.id ?? `${row?.materialName || ''}-${row?.specification || ''}-${index}`
  return `${rowKey}-${field}`
}

const onValueHover = (event, row, index, field) => {
  const key = getOverflowKey(row, index, field)
  const el = event?.currentTarget
  const hasOverflow = el instanceof HTMLElement && el.scrollWidth > el.clientWidth
  overflowStateMap.value[key] = hasOverflow
}

const shouldShowTooltip = (row, index, field, value) => {
  if (!getTooltipText(value)) return false
  const key = getOverflowKey(row, index, field)
  return Boolean(overflowStateMap.value[key])
}

const findCategoryPath = (nodes, targetId, path = []) => {
  const normalizedTargetId = String(targetId ?? '').trim()
  if (!normalizedTargetId) return []
  for (const node of nodes || []) {
    const current = [...path, node.id]
    if (String(node.id ?? '').trim() === normalizedTargetId) {
      return current
    }
    if (node.children?.length) {
      const found = findCategoryPath(node.children, normalizedTargetId, current)
      if (found) return found
    }
  }
  return []
}

const findCategoryPathByNames = (level3Name, level2Name = '') => {
  const normalizedLevel3Name = normalizeText(level3Name)
  const normalizedLevel2Name = normalizeText(level2Name)
  if (!normalizedLevel3Name) return []
  const walk = (nodes, path = []) => {
    for (const node of nodes || []) {
      const currentPath = [...path, node.id]
      const currentLevel = Number(node.level || 0)
      const currentName = normalizeText(node.categoryName)
      if (currentLevel === 3 && currentName === normalizedLevel3Name) {
        if (!normalizedLevel2Name) return currentPath
        const parentNode = categoryNodeMap.value[node.parentId]
        if (normalizeText(parentNode?.categoryName) === normalizedLevel2Name) {
          return currentPath
        }
      }
      if (node.children?.length) {
        const found = walk(node.children, currentPath)
        if (found.length) return found
      }
    }
    return []
  }
  return walk(categoryTree.value)
}

const syncCategoryQuery = () => {
  const current = props.selectedCategory || {}
  const level = Number(current.level || 0)
  if (level === 1) {
    queryForm.categoryLevel1Id = current.level1Id || null
    queryForm.categoryLevel2Id = null
    queryForm.categoryLevel3Id = null
    return
  }
  if (level === 2) {
    queryForm.categoryLevel1Id = current.level1Id || null
    queryForm.categoryLevel2Id = current.level2Id || null
    queryForm.categoryLevel3Id = null
    return
  }
  if (level === 3) {
    queryForm.categoryLevel1Id = current.level1Id || null
    queryForm.categoryLevel2Id = current.level2Id || null
    queryForm.categoryLevel3Id = current.level3Id || null
    return
  }
  queryForm.categoryLevel1Id = null
  queryForm.categoryLevel2Id = null
  queryForm.categoryLevel3Id = null
}

const loadBaseOptions = async () => {
  const [tree, units, segments] = await Promise.all([
    getCategoryTree(),
    getUnitList(),
    pageProcessSegment({ pageNum: 1, pageSize: 1000, status: '1' })
  ])
  categoryTree.value = tree || []
  categoryPathNameMap.value = {}
  categoryNodeMap.value = {}
  categoryParentMap.value = {}
  buildCategoryPathNameMap(categoryTree.value)
  stdNameOptions.value = []
  stdNameOptionsCache.value = {}
  unitOptions.value = units || []
  processSegmentOptions.value = segments.records || []
}

const querySpecModelsByLevel2 = async (level2Id) => {
  const res = await pageSpecModel({
    pageNum: 1,
    pageSize: 5000,
    status: '1',
    categoryLevel2Id: level2Id
  })
  return res.records || []
}

const loadStdNameOptionsByLevel2 = async (level2Id) => {
  const normalizedLevel2Id = normalizeId(level2Id)
  if (!normalizedLevel2Id) {
    stdNameOptions.value = []
    return
  }
  const cacheKey = String(normalizedLevel2Id)
  if (stdNameOptionsCache.value[cacheKey]) {
    stdNameOptions.value = stdNameOptionsCache.value[cacheKey]
    return
  }
  if (stdNameOptionsPending.value[cacheKey]) {
    const records = await stdNameOptionsPending.value[cacheKey]
    stdNameOptions.value = records
    return
  }
  const pending = (async () => {
    try {
      const records = await querySpecModelsByLevel2(normalizedLevel2Id)
      stdNameOptionsCache.value[cacheKey] = records
      return records
    } catch (error) {
      if (isRepeatSubmitError(error)) {
        await delay(350)
        const retryRecords = await querySpecModelsByLevel2(normalizedLevel2Id)
        stdNameOptionsCache.value[cacheKey] = retryRecords
        return retryRecords
      }
      throw error
    } finally {
      delete stdNameOptionsPending.value[cacheKey]
    }
  })()
  stdNameOptionsPending.value[cacheKey] = pending
  const records = await pending
  stdNameOptions.value = records
}

const ensureStdNameOptionLoaded = async (stdNameId) => {
  const normalizedStdNameId = normalizeId(stdNameId)
  if (!normalizedStdNameId) return
  const exists = (stdNameOptions.value || []).some(item => String(item.id) === String(normalizedStdNameId))
  if (exists) return
  const detail = await getSpecModelById(normalizedStdNameId)
  if (!detail?.id) return
  stdNameOptions.value = [{ ...detail }, ...stdNameOptions.value]
}

const loadAttrOptions = async (stdNameId) => {
  attrValueOptions.value = []
  const normalizedStdNameId = normalizeId(stdNameId)
  if (!normalizedStdNameId) return
  const detail = await getSpecModelById(normalizedStdNameId)
  const result = []
  ;(detail?.specItems || []).forEach(item => {
    ;(item.specValueItems || []).forEach(value => {
      result.push({
        id: value.specValueId,
        label: `${item.specKey}: ${value.specValue}`
      })
    })
  })
  attrValueOptions.value = result
}

const handleQuery = async () => {
  loading.value = true
  try {
    const res = await pageStandardReview(queryForm)
    tableData.value = res.records || []
    total.value = res.total || 0
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  syncCategoryQuery()
  Object.assign(queryForm, {
    materialName: '',
    specification: '',
    status: '',
    standardCode: '',
    processSegment: '',
    categoryLevel1Id: queryForm.categoryLevel1Id,
    categoryLevel2Id: queryForm.categoryLevel2Id,
    categoryLevel3Id: queryForm.categoryLevel3Id,
    orderByColumn: 'updateTime',
    isAsc: 'desc',
    pageNum: 1,
    pageSize: 20
  })
  handleQuery()
}

const handleStdNameChange = async (value) => {
  formData.standardStdNameId = normalizeId(value)
  formData.standardAttrValueIds = []
  await loadAttrOptions(formData.standardStdNameId)
}

const handleCategoryChange = async () => {
  if (editInitializing.value) return
  formData.standardStdNameId = null
  formData.standardAttrValueIds = []
  attrValueOptions.value = []
  await loadStdNameOptionsByLevel2(selectedLevel2Id.value)
}

const resolveEditCategoryPath = (detail, row) => {
  const level3Id = pickFirstValidId(
    detail?.standardCategoryLevel3Id,
    row?.standardCategoryLevel3Id
  )
  if (level3Id) {
    const level3Path = findCategoryPath(categoryTree.value, level3Id)
    if (level3Path.length) return level3Path
  }
  const level2Id = pickFirstValidId(
    detail?.standardCategoryLevel2Id,
    row?.standardCategoryLevel2Id
  )
  if (level2Id) {
    const level2Path = findCategoryPath(categoryTree.value, level2Id)
    if (level2Path.length) return level2Path
  }
  const level3Name = detail?.standardCategoryLevel3Name || row?.standardCategoryLevel3Name
  const level2Name = detail?.standardCategoryLevel2Name || row?.standardCategoryLevel2Name
  if (level3Name) {
    const nameMatchedPath = findCategoryPathByNames(level3Name, level2Name)
    if (nameMatchedPath.length) return nameMatchedPath
  }
  return []
}

const resolveCategoryPathByStdName = async (standardStdNameId) => {
  const normalizedStdNameId = normalizeId(standardStdNameId)
  if (!normalizedStdNameId) return []
  try {
    const stdDetail = await getSpecModelById(normalizedStdNameId)
    const level2Id = normalizeId(stdDetail?.categoryLevel2Id)
    if (!level2Id) return []
    return findCategoryPath(categoryTree.value, level2Id)
  } catch (error) {
    return []
  }
}

const handleEdit = async (row) => {
  if (editLoading.value) return
  editLoading.value = true
  try {
    let detail = null
    try {
      detail = await getStandardReviewById(row.id)
    } catch (error) {
      if (isRepeatSubmitError(error)) {
        await delay(350)
        try {
          detail = await getStandardReviewById(row.id)
        } catch (retryError) {
          detail = row || {}
        }
      } else {
        detail = row || {}
      }
    }

    editInitializing.value = true
    let categoryPath = resolveEditCategoryPath(detail, row)
    const standardStdNameId = pickFirstValidId(
      detail?.standardStdNameId,
      row?.standardStdNameId
    )
    if (!categoryPath.length && standardStdNameId) {
      categoryPath = await resolveCategoryPathByStdName(standardStdNameId)
    }
    const standardAttrValueIds = normalizeIdList(
      detail?.standardAttrValueIds
      || row?.standardAttrValueIds
      || extractAttrIdsFromValues(row?.standardAttrValues)
    )
    Object.assign(formData, {
      id: detail?.id ?? row?.id ?? null,
      materialName: detail?.materialName ?? row?.materialName ?? '',
      specification: detail?.specification ?? row?.specification ?? '',
      unitName: detail?.unitName ?? row?.unitName ?? '',
      originalProcessSegment: detail?.originalProcessSegment ?? row?.originalProcessSegment ?? '',
      remark: detail?.remark ?? row?.remark ?? '',
      categoryPath,
      standardStdNameId,
      standardAttrValueIds,
      standardUnitId: normalizeId(detail?.standardUnitId ?? row?.standardUnitId),
      standardSegmentId: normalizeId(detail?.standardSegmentId ?? row?.standardSegmentId),
      conversionFactor: Number(detail?.conversionFactor ?? row?.conversionFactor ?? 1)
    })
    dialogVisible.value = true
    await nextTick()
    formData.categoryPath = Array.isArray(categoryPath) ? [...categoryPath] : []
    try {
      await loadStdNameOptionsByLevel2(selectedLevel2Id.value)
      await ensureStdNameOptionLoaded(standardStdNameId)
      await loadAttrOptions(standardStdNameId)
    } catch (error) {
      if (!isRepeatSubmitError(error)) {
        ElMessage.warning('标准材料选项加载失败，请稍后重试')
      }
    }
  } finally {
    editInitializing.value = false
    editLoading.value = false
  }
}

const handleSubmit = async () => {
  submitLoading.value = true
  try {
    const categoryPath = Array.isArray(formData.categoryPath) ? formData.categoryPath : []
    const selectedCategoryId = normalizeId(categoryPath[categoryPath.length - 1])
    await updateStandardReview({
      id: formData.id,
      standardCategoryLevel3Id: selectedCategoryId,
      standardStdNameId: formData.standardStdNameId,
      standardAttrValueIds: formData.standardAttrValueIds,
      standardUnitId: formData.standardUnitId,
      standardSegmentId: formData.standardSegmentId,
      conversionFactor: formData.conversionFactor
    })
    ElMessage.success('更新成功')
    dialogVisible.value = false
    handleQuery()
  } finally {
    submitLoading.value = false
  }
}

const handleDelete = async (row) => {
  await ElMessageBox.confirm('删除后该材料将视为未标准化，确认继续？', '提示', { type: 'warning' })
  await deleteStandardReview(row.id)
  ElMessage.success('删除成功')
  handleQuery()
}

onMounted(async () => {
  await loadBaseOptions()
  syncCategoryQuery()
  inited.value = true
  await handleQuery()
})

watch(
  () => [
    props.selectedCategory?.level,
    props.selectedCategory?.level1Id,
    props.selectedCategory?.level2Id,
    props.selectedCategory?.level3Id
  ],
  () => {
    if (!inited.value) return
    syncCategoryQuery()
    queryForm.pageNum = 1
    handleQuery()
  }
)
</script>

<style scoped lang="scss">
$bg-glass: rgba(255, 255, 255, 0.75);
$border-glass: rgba(255, 255, 255, 0.5);

.standard-review-tab {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  min-height: 0;
}

.glass-panel {
  background: $bg-glass;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $border-glass;
  border-radius: 8px;
}

.filter-panel-glass,
.table-container-glass {
  @extend .glass-panel;
}

.filter-panel-glass {
  padding: 12px 20px;

  .custom-query-form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .filter-row-primary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .filter-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .filter-row-secondary {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding-top: 4px;
  }

  .action-group {
    display: flex;
    align-items: center;
    gap: 10px;

    .btn-search {
      border-radius: 12px;
      padding: 0 20px;
    }

    .btn-reset {
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.03);
      border: none;
    }

    .btn-advanced {
      padding: 0 2px;
    }
  }

  :deep(.el-form-item) {
    margin-bottom: 0;
    margin-right: 0;
  }

  :deep(.el-form-item__label) {
    font-size: 13px;
    font-weight: 700;
    color: #1d1d1f;
    padding-right: 8px;
  }
}

.table-container-glass {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;

  .review-card-list {
    flex: 1;
    min-height: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 4px;
  }

  .review-card {
    display: flex;
    align-items: stretch;
    flex-shrink: 0;
    gap: 10px;
    min-height: 102px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    background: #fff;
    padding: 8px 9px;
    transition: all 0.2s ease;

    &:hover {
      border-color: #d7e4ff;
      box-shadow: 0 3px 10px rgba(15, 35, 95, 0.08);
    }
  }

  .card-left {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .data-block {
    border: 1px solid #eef2f7;
    border-radius: 6px;
    padding: 5px 7px;
    background: linear-gradient(180deg, #fafcff 0%, #ffffff 100%);
  }

  .data-block-after {
    border-color: #e6f0ff;
    background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  }

  .block-title {
    font-size: 13px;
    font-weight: 700;
    color: #667085;
    margin-bottom: 4px;
    line-height: 1;
  }

  .kv-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.75fr) minmax(0, 0.9fr) minmax(0, 1.35fr);
    gap: 3px 6px;
  }

  .kv-row {
    display: flex;
    align-items: baseline;
    gap: 3px;
    min-width: 0;
    font-size: 13px;
    line-height: 1.2;
  }

  .kv-label {
    flex: none;
    color: #8b95a6;
    font-size: 13px;
  }

  .kv-value {
    color: #1e293b;
    display: block;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .kv-row :deep(.el-tooltip__trigger) {
    min-width: 0;
    flex: 1;
    display: block;
  }

  .card-right {
    width: 198px;
    border-left: 1px solid #edf1f5;
    padding-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .right-top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    :deep(.el-tag) {
      height: 28px;
      line-height: 26px;
    }
  }

  .right-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .meta-item {
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    gap: 10px;
  }

  .meta-label {
    font-size: 13px;
    color: #98a2b3;
    line-height: 1;
  }

  .meta-value {
    font-size: 13px;
    color: #344054;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
  }

  .action-btn {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: none;
    padding: 0;
  }

  .action-btn-edit {
    background: rgba(64, 158, 255, 0.14);
    color: #1d4ed8;
  }

  .action-btn-delete {
    background: rgba(245, 108, 108, 0.14);
    color: #dc2626;
  }

  .action-btn-edit:hover,
  .action-btn-edit:focus {
    background: rgba(64, 158, 255, 0.22);
    color: #1e40af;
  }

  .action-btn-delete:hover,
  .action-btn-delete:focus {
    background: rgba(245, 108, 108, 0.22);
    color: #b91c1c;
  }

  .pagination-wrapper {
    margin-top: auto;
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }
}

.status-error-icon {
  margin-left: 4px;
  vertical-align: middle;
  font-size: 16px;
}

.status-tag-content {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.review-edit-layout {
  display: grid;
  grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
  gap: 14px;
  min-height: 420px;
}

.origin-panel {
  border: 1px solid #d8e6ff;
  border-radius: 12px;
  background: linear-gradient(150deg, #eef6ff 0%, #f8fbff 48%, #ffffff 100%);
  padding: 14px 12px;
}

.panel-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;

  h4 {
    margin: 0;
    font-size: 16px;
    line-height: 1.2;
    color: #1e3a8a;
  }
}

.panel-tip {
  font-size: 12px;
  color: #5c6f90;
}

.origin-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.origin-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(72, 120, 220, 0.14);
}

.origin-item-main {
  background: linear-gradient(145deg, rgba(36, 92, 219, 0.11), rgba(255, 255, 255, 0.84));
}

.origin-label {
  color: #5f7497;
  font-size: 12px;
  line-height: 1;
}

.origin-value {
  color: #1f2a44;
  font-size: 13px;
  line-height: 1.45;
  word-break: break-word;
}

.mapping-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step-card {
  border: 1px solid #e6ebf5;
  border-radius: 12px;
  padding: 12px 12px 4px;
  background: linear-gradient(180deg, #fefefe 0%, #f9fbff 100%);
}

.step-card-spec {
  background: linear-gradient(180deg, #fbfcff 0%, #ffffff 100%);
}

.step-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #1d2b50;
  font-size: 14px;
  font-weight: 700;
}

.step-index {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: linear-gradient(145deg, #2f68d9, #5f8fff);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.mapping-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }

  :deep(.el-form-item__label) {
    color: #44526d;
    font-weight: 700;
  }
}

.field-hint {
  margin-top: 6px;
  color: #7384a6;
  font-size: 12px;
  line-height: 1.3;
}

.attr-selected-preview {
  margin-top: 6px;
  padding: 6px 8px;
  border-radius: 8px;
  background: #f3f7ff;
  border: 1px dashed #c8d8ff;
  font-size: 12px;
  line-height: 1.4;
}

.preview-label {
  color: #4f6388;
}

.preview-value {
  color: #1f3158;
}

@media (max-width: 1440px) {
  .table-container-glass {
    .review-card {
      gap: 8px;
      padding: 7px 8px;
    }

    .kv-grid {
      grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.75fr) minmax(0, 0.9fr);
    }

    .card-right {
      width: 182px;
    }
  }
}

@media (max-width: 1200px) {
  .table-container-glass {
    .review-card {
      flex-direction: column;
    }

    .card-right {
      width: 100%;
      border-left: none;
      border-top: 1px solid #f3f4f6;
      padding-left: 0;
      padding-top: 6px;
    }

    .right-meta {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 8px;
    }
  }

  .review-edit-layout {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
