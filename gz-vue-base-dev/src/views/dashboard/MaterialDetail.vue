<template>
  <div class="material-detail-container">
    <!-- 上部区域：材价基础信息 -->
    <section class="info-section glass-card">
      <div class="section-header">
        <div class="title-row">
          <span class="material-name">{{ materialInfo.materialName }}</span>
          <el-tag effect="plain" type="info" class="category-tag">{{ materialInfo.categoryName }}</el-tag>
        </div>
        <div class="spec-row">
          <span class="label">规格型号：</span>
          <span class="value">{{ materialInfo.specification }}</span>
        </div>
      </div>

      <el-descriptions :column="4" border class="custom-desc">
        <el-descriptions-item label="单位">{{ materialInfo.unit }}</el-descriptions-item>
        <el-descriptions-item label="数量">{{ materialInfo.quantity }}</el-descriptions-item>
        <el-descriptions-item label="品牌">{{ materialInfo.brand }}</el-descriptions-item>
        <el-descriptions-item label="供应商">
            <span class="link-text" @click="openSupplier(materialInfo.supplierCompany)">{{ materialInfo.supplierCompany }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="来源项目">{{ materialInfo.sourceProject }}</el-descriptions-item>
        
        <el-descriptions-item label="不含税价">
          <span class="price-normal">¥{{ formatPrice(materialInfo.priceExcludingTax) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="含税价">
          <span class="price-normal">¥{{ formatPrice(materialInfo.priceIncludingTax) }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="税率">{{ materialInfo.taxRate }}%</el-descriptions-item>
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
            <span class="stat-label">历史最高(不含税)</span>
            <span class="stat-value">¥{{ formatPrice(stats.maxExcl) }}</span>
         </div>
         <div class="stat-item">
            <span class="stat-label">历史最低(不含税)</span>
            <span class="stat-value success">¥{{ formatPrice(stats.minExcl) }}</span>
         </div>
         <div class="stat-item">
            <span class="stat-label">平均价(不含税)</span>
            <span class="stat-value primary">¥{{ formatPrice(stats.avgExcl) }}</span>
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
                 <span>{{ row.materialName }}</span>
                 <el-tag v-if="row.id === materialInfo.id" size="small" type="danger" effect="plain" class="current-tag">本条</el-tag>
             </template>
        </el-table-column>
        <el-table-column prop="specification" label="规格型号" min-width="180" show-overflow-tooltip />
        <el-table-column prop="unit" label="单位" width="55" align="center" />
        <el-table-column prop="quantity" label="数量" width="60" align="center" />
        
        <el-table-column prop="priceExcludingTax" label="不含税价" width="130" align="right" sortable>
             <template #default="{ row }">
                <span :class="getPriceClass(row.priceExcludingTax)">¥{{ formatPrice(row.priceExcludingTax) }}</span>
             </template>
        </el-table-column>
        <el-table-column prop="priceIncludingTax" label="含税价" width="130" align="right">
             <template #default="{ row }">¥{{ formatPrice(row.priceIncludingTax) }}</template>
        </el-table-column>
        <el-table-column prop="purchaseTime" label="采购时间" width="120" align="center" sortable />
        <el-table-column prop="taxRate" label="税率" width="60" align="center">
             <template #default="{ row }">{{ row.taxRate }}%</template>
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
import { TrendCharts, ArrowLeft, CaretTop, CaretBottom, Minus } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const materialInfo = ref({})
const relatedList = ref([])

// 初始化/加载数据
const loadData = () => {
  const { name, spec, id } = route.query
  if (!name) return
  
  // 1. 获取当前点击的那条主记录
  // 如果有 id，优先用 id 找
  if (id) {
      materialInfo.value = materialPriceData.find(m => m.id == id) || {}
  }
  
  // 如果没找到或者没传 id，尝试用第一条匹配的（兜底）
  if (!materialInfo.value.id) {
      materialInfo.value = materialPriceData.find(m => m.materialName === name && m.specification === spec) || {}
  }

  // 2. 获取同规格列表
  relatedList.value = materialPriceData.filter(m => 
      m.materialName === name && 
      m.specification === spec
  ).sort((a, b) => b.purchaseTime.localeCompare(a.purchaseTime)) // 默认按时间倒序
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

// 返回列表页
const goBack = () => {
    // 切换 Tab 回到材价查询
    router.push({ path: '/workbench', query: { tab: '材价查询' } })
}

// 统计信息
const stats = computed(() => {
    const list = relatedList.value
    if (list.length === 0) return { count: 0 }
    
    const prices = list.map(i => i.priceExcludingTax)
    const sum = prices.reduce((a, b) => a + b, 0)
    
    return {
        maxExcl: Math.max(...prices),
        minExcl: Math.min(...prices),
        avgExcl: sum / list.length,
        count: list.length
    }
})

const formatPrice = (p) => {
    return p ? p.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'
}

const getPriceClass = (p) => {
    if (!stats.value.avgExcl) return ''
    if (p < stats.value.avgExcl) return 'text-success'
    if (p > stats.value.avgExcl) return 'text-warning'
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
