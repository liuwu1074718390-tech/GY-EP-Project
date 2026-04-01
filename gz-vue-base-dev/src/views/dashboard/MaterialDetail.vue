<template>
  <div class="material-detail-container">
    <!-- 上部区域：材价基础信息 -->
    <section class="info-section glass-card">
      <div class="section-header">
        <div class="header-top">
          <div class="title-row">
            <span class="material-name">{{ getDisplayMaterialName(materialInfo) }}</span>
            <el-tag v-if="getDisplayCategoryName(materialInfo) !== '-'" effect="plain" type="info" class="category-tag">{{ getDisplayCategoryName(materialInfo) }}</el-tag>
          </div>
          <div class="data-view-switch-pill">
            <button
              type="button"
              class="switch-item"
              :class="{ active: detailViewMode === 'NON_STANDARD' }"
              @click="setDetailViewMode('NON_STANDARD')"
            >
              非标准
            </button>
            <span class="switch-divider" />
            <button
              type="button"
              class="switch-item"
              :class="{ active: detailViewMode === 'STANDARD' }"
              @click="setDetailViewMode('STANDARD')"
            >
              标准
            </button>
          </div>
        </div>
        <div class="spec-row">
          <span class="label">规格型号：</span>
          <span class="value">{{ getDisplaySpecification(materialInfo) }}</span>
        </div>
      </div>

      <el-descriptions :column="4" border class="custom-desc">
        <el-descriptions-item label="单位">{{ getDisplayUnit(materialInfo) }}</el-descriptions-item>
        <el-descriptions-item label="数量">{{ materialInfo.quantity }}</el-descriptions-item>
        <el-descriptions-item label="品牌">{{ materialInfo.brand }}</el-descriptions-item>
        <el-descriptions-item label="供应商">
            <span class="link-text" @click="openSupplier(materialInfo.supplierCompany)">{{ materialInfo.supplierCompany }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="来源项目">{{ materialInfo.sourceProject }}</el-descriptions-item>
        
        <el-descriptions-item label="不含税价">
          <span class="price-normal">{{ formatPriceText(getDisplayPriceExcludingTax(materialInfo)) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="含税价">
          <span class="price-normal">{{ formatPriceText(getDisplayPriceIncludingTax(materialInfo)) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="税率">{{ formatTaxRateText(materialInfo.taxRate) }}</el-descriptions-item>
        <el-descriptions-item label="价格类型">
            <el-tag :type="materialInfo.priceType === '中标价' ? 'success' : 'warning'" size="small">
              {{ materialInfo.priceType }}
            </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="采购时间">{{ materialInfo.purchaseTime }}</el-descriptions-item>
      </el-descriptions>
      
      <!-- 统计概览 -->
      <div class="stats-row" v-if="stats.count > 1">
         <div class="stat-item">
            <span class="stat-label">历史最高({{ stats.metricLabel }})</span>
            <span class="stat-value">{{ formatStatPriceText(stats.maxPrice) }}</span>
         </div>
         <div class="stat-item">
            <span class="stat-label">历史最低({{ stats.metricLabel }})</span>
            <span class="stat-value success">{{ formatStatPriceText(stats.minPrice) }}</span>
         </div>
         <div class="stat-item">
            <span class="stat-label">平均价({{ stats.metricLabel }})</span>
            <span class="stat-value primary">{{ formatStatPriceText(stats.avgPrice) }}</span>
         </div>
         <div class="stat-item">
            <span class="stat-label">样本数量</span>
            <span class="stat-value">{{ stats.count }}条</span>
         </div>
      </div>
    </section>

    <!-- 下部区域：价格区间列表 -->
    <section class="list-section glass-card">
      <div class="section-title">
        <el-icon><TrendCharts /></el-icon>
        <span>价格区间列表</span>
      </div>
      
      <el-table 
        :data="relatedList" 
        stripe 
        border 
        style="width: 100%"
        :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: '600' }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" label="序号" width="55" align="center" fixed />
        <el-table-column prop="materialName" label="材料名称" min-width="120" show-overflow-tooltip fixed>
             <template #default="{ row }">
                 <span>{{ getDisplayMaterialName(row) }}</span>
                 <el-tag v-if="row.id === materialInfo.id" size="small" type="danger" effect="plain" class="current-tag">本条</el-tag>
             </template>
        </el-table-column>
        <el-table-column prop="specification" label="规格型号" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">{{ getDisplaySpecification(row) }}</template>
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="55" align="center">
          <template #default="{ row }">{{ getDisplayUnit(row) }}</template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="60" align="center" />
        
        <el-table-column prop="priceExcludingTax" label="不含税价" width="130" align="right" sortable>
             <template #default="{ row }">
                <span :class="getPriceClass(getDisplayPriceExcludingTax(row))">{{ formatPriceText(getDisplayPriceExcludingTax(row)) }}</span>
             </template>
        </el-table-column>
        <el-table-column prop="priceIncludingTax" label="含税价" width="130" align="right">
             <template #default="{ row }">{{ formatPriceText(getDisplayPriceIncludingTax(row)) }}</template>
        </el-table-column>
        <el-table-column prop="purchaseTime" label="采购时间" width="120" align="center" sortable />
        <el-table-column prop="taxRate" label="税率" width="60" align="center">
             <template #default="{ row }">{{ formatTaxRateText(row.taxRate) }}</template>
        </el-table-column>
        <el-table-column prop="brand" label="品牌" width="90" show-overflow-tooltip />
        <el-table-column prop="supplierCompany" label="供应商" min-width="150" show-overflow-tooltip>
             <template #default="{ row }">
                 <span class="link-text stop-propagation" @click.stop="openSupplier(row.supplierCompany)">{{ row.supplierCompany }}</span>
             </template>
        </el-table-column>
        <el-table-column prop="sourceProject" label="来源项目" min-width="150" show-overflow-tooltip />
        <el-table-column prop="priceType" label="类型" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.priceType === '中标价' ? 'success' : 'warning'" size="small">
              {{ row.priceType }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { materialPriceData } from './mockMaterialData'
import { getMaterialPriceById, pageMaterialPrice } from '@/api/materialPrice'
import { TrendCharts, ArrowLeft, CaretTop, CaretBottom, Minus } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const materialInfo = ref({})
const relatedList = ref([])
const useServerData = ref(true)
const detailViewMode = ref((route.query.dataViewMode || 'NON_STANDARD').toString().toUpperCase() === 'STANDARD' ? 'STANDARD' : 'NON_STANDARD')
const isStandardMode = computed(() => detailViewMode.value === 'STANDARD')

const getDisplayMaterialName = (row) => {
  if (!row) return '-'
  if (isStandardMode.value) return row.standardStdName || row.materialName || '-'
  return row.materialName || '-'
}

const getDisplaySpecification = (row) => {
  if (!row) return '-'
  if (isStandardMode.value) return row.standardSpecSummary || row.specification || '-'
  return row.specification || '-'
}

const getDisplayUnit = (row) => {
  if (!row) return '-'
  if (isStandardMode.value) return row.standardUnitName || row.unit || '-'
  return row.unit || '-'
}

const getDisplayCategoryName = (row) => {
  if (!row) return '-'
  if (isStandardMode.value) return row.standardCategoryLevel3Name || row.categoryName || '-'
  return row.categoryName || '-'
}

const getDisplayPriceExcludingTax = (row) => {
  if (!row) return null
  if (isStandardMode.value) return row.normalizedPriceExcludingTax ?? row.priceExcludingTax
  return row.priceExcludingTax
}

const getDisplayPriceIncludingTax = (row) => {
  if (!row) return null
  if (isStandardMode.value) return row.normalizedPriceIncludingTax ?? row.priceIncludingTax
  return row.priceIncludingTax
}

const isEmptyMetricValue = (value) => {
  if (value === null || value === undefined || value === '') return true
  const num = Number(value)
  return Number.isNaN(num) || num === 0
}

const formatPriceText = (value) => {
  if (isEmptyMetricValue(value)) return '-'
  return `¥${Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatTaxRateText = (value) => {
  if (isEmptyMetricValue(value)) return '-'
  return `${Number(value)}%`
}

// 初始化/加载数据
const loadData = async () => {
  const { name, spec, id } = route.query
  if (!name && !id) return

  if (useServerData.value) {
    try {
      let detail = null
      const listRes = await pageMaterialPrice({
        pageNum: 1,
        pageSize: 1000,
        materialName: name,
        specification: spec,
        dataViewMode: detailViewMode.value
      })
      relatedList.value = (listRes.records || []).sort((a, b) => String(b.purchaseTime || '').localeCompare(String(a.purchaseTime || '')))

      if (id) {
        detail = relatedList.value.find(item => String(item.id) === String(id)) || null
      }

      if (!detail && id) {
        detail = await getMaterialPriceById(id)
      }

      if (!detail && relatedList.value.length > 0) {
        detail = relatedList.value[0]
      }

      if (detail) {
        materialInfo.value = detail
        return
      }
    } catch (error) {
      useServerData.value = false
    }
  }

  // 本地数据兜底
  if (id) {
    materialInfo.value = materialPriceData.find(m => m.id == id) || {}
  }
  if (!materialInfo.value.id) {
    materialInfo.value = materialPriceData.find(m => m.materialName === name && m.specification === spec) || {}
  }
  relatedList.value = materialPriceData.filter(m =>
    m.materialName === (materialInfo.value.materialName || name) &&
    m.specification === (materialInfo.value.specification || spec)
  ).sort((a, b) => String(b.purchaseTime || '').localeCompare(String(a.purchaseTime || '')))
}

const setDetailViewMode = (mode) => {
  if (detailViewMode.value === mode) return
  detailViewMode.value = mode
  useServerData.value = true
  router.replace({ query: { ...route.query, dataViewMode: mode } })
  loadData()
}

/**
 * 获取价格状态辅助函数
 */
const getPriceStatusHelper = (price) => {
  const avg = stats.value.avgExcl
  if (!avg) return { icon: Minus, color: '#409eff', label: '持平', class: 'status-steady' }
  
  // 偏差超过 5% 判定为高/低
  const ratio = price / avg
  if (ratio > 1.05) {
    return { icon: CaretTop, color: '#f56c6c', label: '高于平均', class: 'status-high' }
  } else if (ratio < 0.95) {
    return { icon: CaretBottom, color: '#67c23a', label: '低于平均', class: 'status-low' }
  } else {
    return { icon: Minus, color: '#409eff', label: '持平', class: 'status-steady' }
  }
}

onMounted(() => {
  loadData()
})

// 监听路由参数变化（特别是 tab 仍为 '材价详情' 但 id 变了的情况，虽然这种情况较少）
watch(() => route.query.id, () => loadData())
watch(() => route.query.name, () => loadData())
watch(() => route.query.dataViewMode, (val) => {
  const mode = (val || 'NON_STANDARD').toString().toUpperCase() === 'STANDARD' ? 'STANDARD' : 'NON_STANDARD'
  detailViewMode.value = mode
})

// 返回列表页
const goBack = () => {
    // 切换 Tab 回到材价查询
    router.push({ path: '/workbench', query: { tab: '材价查询' } })
}

// 统计信息
const stats = computed(() => {
    const list = relatedList.value
    if (list.length === 0) {
      return { count: 0, validCount: 0, metricLabel: '不含税', maxPrice: null, minPrice: null, avgPrice: null }
    }

    const exclPrices = list
      .map(item => Number(getDisplayPriceExcludingTax(item)))
      .filter(price => Number.isFinite(price) && price > 0)

    const inclPrices = list
      .map(item => Number(getDisplayPriceIncludingTax(item)))
      .filter(price => Number.isFinite(price) && price > 0)

    const useExcl = exclPrices.length > 0
    const prices = useExcl ? exclPrices : inclPrices
    const metricLabel = useExcl ? '不含税' : '含税'

    if (prices.length === 0) {
      return {
        count: list.length,
        validCount: 0,
        metricLabel,
        maxPrice: null,
        minPrice: null,
        avgPrice: null
      }
    }

    const sum = prices.reduce((a, b) => a + b, 0)

    return {
        maxPrice: Math.max(...prices),
        minPrice: Math.min(...prices),
        avgPrice: sum / prices.length,
        count: list.length,
        validCount: prices.length,
        metricLabel
    }
})

const formatStatPriceText = (value) => {
    if (!Number.isFinite(Number(value)) || Number(value) <= 0) {
      return '-'
    }
    return `¥${Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const getPriceClass = (p) => {
    const price = Number(p)
    const avg = Number(stats.value.avgPrice)
    if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(avg) || avg <= 0) return ''
    if (price < avg) return 'text-success'
    if (price > avg) return 'text-warning'
    return ''
}

const openSupplier = (supplierName) => {
    // 兼容处理：如果传入的是事件对象或为空，则尝试使用 materialInfo 中的 suppliers
    const name = (typeof supplierName === 'string' && supplierName) ? supplierName : materialInfo.value.supplierCompany
    if (!name) return
    
    // 跳转到供应商详情
    const { href } = router.resolve({
        name: 'SupplierDetail',
        params: { id: 1 }, // 模拟ID
        query: { name: name }
    })
    window.open(href, '_blank')
}

const tableRowClassName = ({ row }) => {
  if (row.id === materialInfo.value.id) {
    return 'current-row-highlight'
  }
  return ''
}

</script>

<style lang="scss" scoped>
$primary-blue: #377cfd;
// 适配 Workbench 变量
$glass-bg: rgba(255, 255, 255, 0.75);
$glass-border: rgba(255, 255, 255, 0.5);

.material-detail-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.link-text {
    color: $primary-blue;
    cursor: pointer;
    &:hover { text-decoration: underline; }
}

.glass-card {
    // 统一样式
    background: $glass-bg;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid $glass-border;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
    padding: 24px;
}

.current-tag {
    margin-left: 6px;
    height: 18px;
    padding: 0 4px;
    line-height: 16px;
    font-size: 11px;
    vertical-align: middle;
}

// 高亮当前行样式
:deep(.el-table .current-row-highlight) {
    --el-table-tr-bg-color: #fef0f0 !important; // 使用 danger-light-9 背景色
}

// 悬停时保持高亮背景加深一点
:deep(.el-table .current-row-highlight:hover > td.el-table__cell) {
    background-color: #fde2e2 !important;
}

.info-section {
    .section-header {
        margin-bottom: 24px;
        .header-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
        }
        .title-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
            
            .material-name {
                font-size: 20px;
                font-weight: 700;
                color: #1d1d1f;
            }
        }
        .spec-row {
            color: #606266;
            font-size: 14px;
            .value { color: #303133; font-weight: 500; }
        }

        .data-view-switch-pill {
          display: inline-flex;
          align-items: center;
          height: 32px;
          padding: 0 6px;
          border-radius: 6px;
          border: 1px solid #d9e2f2;
          background: #f4f7fc;

          .switch-item {
            height: 24px;
            min-width: 74px;
            padding: 0 12px;
            border: none;
            border-radius: 4px;
            background: transparent;
            color: #5f6b7a;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;

            &.active {
              color: #1f6feb;
              background: #e8f1ff;
              font-weight: 600;
            }
          }

          .switch-divider {
            width: 1px;
            height: 16px;
            margin: 0 6px;
            background: #d9e2f2;
          }
        }
    }
    
    :deep(.custom-desc) {
         .el-descriptions__label {
             width: 100px;
             font-weight: 600;
             background: #f9fafb;
         }
         .el-descriptions__content {
             font-size: 14px;
         }
    }
    
    .price-normal {
        font-weight: normal;
        color: #303133;
        font-size: 14px;
    }
    
    .link-text {
        color: $primary-blue;
        cursor: pointer;
        &:hover { text-decoration: underline; }
    }
    
    .stats-row {
        margin-top: 24px;
        display: flex;
        gap: 40px;
        padding-top: 20px;
        border-top: 1px dashed #e4e7ed;
        
        .stat-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
            
            .stat-label { font-size: 12px; color: #909399; }
            .stat-value { font-size: 18px; font-weight: 600; color: #303133; }
            .stat-value.success { color: #67c23a; }
            .stat-value.primary { color: $primary-blue; }
        }
    }
}



.list-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 700;
        color: #1d1d1f;
    }

    // 确保表格自适应高度实现表头冻结
    :deep(.el-table) {
        flex: 1;
        height: 0 !important;
    }
}

.text-success { color: #67c23a; font-weight: 500; }
.text-warning { color: #f56c6c; font-weight: 500; }

.list-price-cell {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;

  .status-icon {
    font-size: 16px;
    &.status-high { animation: bounce-up 1.5s infinite; }
    &.status-low { animation: bounce-down 1.5s infinite; }
  }
}

@keyframes bounce-up {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px); }
}

</style>
