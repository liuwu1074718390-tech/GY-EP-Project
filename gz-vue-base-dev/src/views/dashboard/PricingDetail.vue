<template>
  <div class="pricing-detail-container">
    <!-- 顶部操作栏 -->
    <section class="header-section glass-card">
      <div class="header-left">
        <div class="task-title">
          <el-icon class="title-icon"><Document /></el-icon>
          <span>{{ taskInfo.taskName }}</span>
        </div>
        <div class="task-meta">
          <el-tag :type="getStatusType(taskInfo.status)" effect="plain">
            {{ getStatusLabel(taskInfo.status) }}
          </el-tag>
          <span class="meta-item">
            <el-icon><User /></el-icon>
            {{ taskInfo.creator }}
          </span>
          <span class="meta-item">
            <el-icon><Clock /></el-icon>
            {{ taskInfo.createTime }}
          </span>
          <span class="meta-item click-edit" @click="showPricingMethodDialog">
            <el-icon><Operation /></el-icon>
            取价方式：{{ getPricingMethodLabel(taskInfo.pricingMethod) }}
            <el-icon class="edit-icon"><Edit /></el-icon>
            <el-tag size="small" type="warning" effect="dark" class="method-tag">{{ getPricingMethodLabel(taskInfo.pricingMethod) }}</el-tag>
          </span>
        </div>
      </div>
      <div class="header-right">
        <el-button @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
        <el-button type="success" icon="Download" @click="exportExcel">
          导出Excel
        </el-button>
      </div>
    </section>
    
    <!-- 失败原因提示 -->
    <el-alert
      v-if="taskInfo.status === 'failed' && taskInfo.failReason"
      :title="taskInfo.failReason"
      type="error"
      show-icon
      :closable="false"
      class="fail-alert"
    />

    <!-- 主内容区: 全宽列表 + 抽屉详情 -->
    <section class="content-section">
      <div class="main-list-panel glass-card">
        <div class="panel-header">
          <div class="header-title">
            <el-icon><List /></el-icon>
            <span>组价材料清单</span>
          </div>
          <div class="header-info">
            <span class="count-badge">共 {{ materials.length }} 项</span>
          </div>
        </div>
        
        <el-table 
          :data="materials" 
          stripe
          border
          highlight-current-row
          @row-click="handleMaterialRowClick"
          style="width: 100%"
          height="100%"
          :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: '600', fontSize: '13px', whiteSpace: 'nowrap' }"
        >
          <el-table-column type="index" label="序号" width="65" align="center" fixed="left" />
          <el-table-column prop="材料名称" label="材料名称" min-width="130" show-overflow-tooltip fixed="left" />
          <el-table-column prop="规格型号" label="规格型号" min-width="160" show-overflow-tooltip />
          <el-table-column prop="单位" label="单位" width="60" align="center" />
          <el-table-column prop="数量" label="数量" width="70" align="center" />
          <el-table-column prop="含税单价" label="含税单价" width="110" align="right">
            <template #default="{ row }">
              <span v-if="row.含税单价" class="price-value">¥{{ formatPrice(row.含税单价) }}</span>
              <span v-else class="price-empty">未匹配</span>
            </template>
          </el-table-column>
          <el-table-column prop="含税总价" label="含税总价" width="120" align="right">
            <template #default="{ row }">
              <span v-if="row.含税总价" class="price-value">¥{{ formatPrice(row.含税总价) }}</span>
              <span v-else class="price-empty">-</span>
            </template>
          </el-table-column>
          <el-table-column prop="品牌" label="品牌" width="90" show-overflow-tooltip />
          <el-table-column prop="备注" label="备注" min-width="120" show-overflow-tooltip />
          <el-table-column label="操作" width="100" align="center" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click.stop="handleMaterialRowClick(row)">
                匹配详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>

    <!-- 匹配材价抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      direction="rtl"
      size="70%"
      :before-close="handleDrawerClose"
      class="pricing-drawer"
      :show-close="false"
    >
      <template #header>
        <div class="drawer-custom-header">
          <div class="header-left">
            <el-icon class="title-icon"><PriceTag /></el-icon>
            <span class="title-text">组价匹配详情</span>
          </div>
          <div class="header-right">
            <el-button link class="close-btn" @click="drawerVisible = false">
              <el-icon><Close /></el-icon>
            </el-button>
          </div>
        </div>
      </template>

      <div class="drawer-body-container" v-if="currentMaterial">
        <!-- 待组价材料对比卡片 (紧凑版) -->
        <div class="material-reference-card compact">
          <div class="ref-row">
            <div class="ref-main">
              <el-tag size="small" type="primary" effect="plain" class="base-tag">基准</el-tag>
              <span class="name black-bold">{{ currentMaterial.材料名称 }}</span>
              <span class="spec">{{ currentMaterial.规格型号 }}</span>
            </div>
            <div class="ref-actions">
              <el-button type="primary" icon="Search" class="search-btn-large" @click="openMaterialSelector">手动查询材价</el-button>
            </div>
          </div>
          <div class="ref-details">
            <div class="detail-item"><span class="label">单位：</span>{{ currentMaterial.单位 }}</div>
            <div class="detail-item"><span class="label">数量：</span>{{ currentMaterial.数量 }}</div>
            
            <!-- 快捷取价方式 -->
            <div class="pricing-methods-quick-select" v-if="calculatedMethods.length > 0">
               <div 
                 v-for="method in calculatedMethods" 
                 :key="method.key"
                 class="method-tag"
                 :class="{ active: currentSelectedMethod && currentSelectedMethod.key === method.key }"
                 @click="handleSelectPrice(method.data, method.key)"
               >
                 <span class="m-label">{{ method.label }}</span>
                 <span class="m-price">¥{{ formatPrice(method.data.priceIncludingTax) }}</span>
               </div>
            </div>

            <div class="detail-item highlight">
              <span class="label">当前选中值<span v-if="currentSelectedMethod" style="font-weight: normal; margin-left: 4px">({{ currentSelectedMethod.label }})</span>：</span>
              <span v-if="currentMaterial.含税单价" class="val">¥{{ formatPrice(currentMaterial.含税单价) }}</span>
              <span v-else class="empty">--</span>
            </div>
          </div>
        </div>

        <!-- 手动选择结果区 -->
        <template v-if="manualSelectedPrices.length > 0">
          <div class="section-title-wrapper">
            <div class="section-title">手动选择组价结果</div>
          </div>
          <div class="match-list-wrapper manual-list">
            <el-table 
              :data="manualSelectedPrices" 
              stripe
              border
              style="width: 100%"
              :header-cell-style="{ background: '#f8fafc', whiteSpace: 'nowrap' }"
            >
              <el-table-column type="index" label="序号" width="70" align="center" fixed="left" />
              <el-table-column prop="materialName" label="材料名称" min-width="140" show-overflow-tooltip fixed="left" />
              <el-table-column prop="specification" label="规格型号" min-width="160" show-overflow-tooltip />
              <el-table-column prop="quantity" label="数量" width="70" align="center">
                <template #default>1</template>
              </el-table-column>
              <el-table-column prop="unit" label="单位" width="65" align="center" />
              <el-table-column prop="priceIncludingTax" label="含税单价" width="115" align="right">
                <template #default="{ row }">
                  <span class="price-value">¥{{ formatPrice(row.priceIncludingTax) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="brand" label="品牌" width="100" show-overflow-tooltip />
              <el-table-column prop="priceType" label="类型" width="75" align="center" />
              <el-table-column prop="purchaseTime" label="采购时间" width="100" align="center" />
              <el-table-column prop="supplierCompany" label="报价供应商" min-width="140" show-overflow-tooltip />
              <el-table-column prop="sourceProject" label="来源项目" min-width="140" show-overflow-tooltip />
              <el-table-column label="操作" width="100" align="center" fixed="right">
                <template #default="{ row }">
                  <div class="op-cell">
                    <el-button 
                      v-if="String(row.id) !== String(currentMaterial.matchedPriceId)" 
                      size="small" type="primary" link @click="handleSelectPrice(row)">选择</el-button>
                    <span v-else class="selected-text"><el-icon><Select /></el-icon>已选</span>
                    <el-button type="danger" link size="small" icon="Delete" @click="removeManualPrice(row)"></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="spacer-24"></div>
        </template>

        <div class="section-title-wrapper">
          <div class="section-title">系统推荐匹配结果</div>
          <el-button 
            v-if="matchedPrices.length > 0" 
            link type="danger" size="small" icon="RefreshLeft" 
            @click="clearAllMatchedPrices"
          >清空</el-button>
        </div>

        <div class="match-list-wrapper">
          <el-table 
            :data="matchedPrices" 
            stripe
            border
            style="width: 100%"
            height="100%"
            :header-cell-style="{ background: '#f8fafc', whiteSpace: 'nowrap' }"
            :row-class-name="tableRowClassName"
            class="custom-match-table"
          >
            <el-table-column type="index" label="序号" width="70" align="center" fixed="left" />
            <el-table-column prop="materialName" label="材料名称" min-width="140" show-overflow-tooltip fixed="left" />
            <el-table-column prop="specification" label="规格型号" min-width="160" show-overflow-tooltip />
            <el-table-column prop="quantity" label="数量" width="70" align="center">
              <template #default>1</template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="65" align="center" />
            <el-table-column prop="priceIncludingTax" label="含税单价" width="115" align="right" sortable>
              <template #default="{ row }">
                <div class="price-cell">
                  <span class="price-value">¥{{ formatPrice(row.priceIncludingTax) }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="brand" label="品牌" width="100" show-overflow-tooltip />
            <el-table-column prop="priceType" label="类型" width="75" align="center">
              <template #default="{ row }">
                <el-tag :type="row.priceType === '中标价' ? 'success' : 'warning'" size="small" effect="plain" round>
                  {{ row.priceType.slice(0, 2) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="purchaseTime" label="采购时间" width="100" align="center" />
            <el-table-column prop="supplierCompany" label="报价供应商" min-width="140" show-overflow-tooltip />
            <el-table-column prop="sourceProject" label="来源项目" min-width="140" show-overflow-tooltip />
            <el-table-column label="操作" width="80" align="center" fixed="right">
              <template #default="{ row }">
                <el-button 
                  type="danger" link size="small" icon="Delete" 
                  @click="removeMatchedPrice(row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-drawer>

    <!-- 材价选择器弹窗 -->
    <MaterialSelectorDialog 
      v-model="selectorVisible" 

      @select="handlePriceSelected"
    />

    <!-- 修改取价方式弹窗 -->
    <el-dialog
      v-model="methodDialogVisible"
      title="修改取价方式"
      width="400px"
      append-to-body
    >
      <div class="method-dialog-content">
        <el-alert
          title="修改取价方式将重新计算本任务下所有材料的推荐价格（已手动确认的除外）"
          type="warning"
          :closable="false"
          show-icon
          style="margin-bottom: 20px"
        />
        <el-form label-width="80px">
          <el-form-item label="取价方式">
             <el-radio-group v-model="tempPricingMethod">
              <el-radio value="trimmed_mean">去极值平均价</el-radio>
              <el-radio value="average">平均价</el-radio>
              <el-radio value="lowest">最低价</el-radio>
              <el-radio value="highest">最高价</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="methodDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmUpdatePricingMethod" :loading="methodUpdating">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Document, User, Clock, ArrowLeft, Download, List, PriceTag, Search, Select, CaretBottom, Delete, RefreshLeft, Close,
  Operation, Edit
} from '@element-plus/icons-vue'
import { getPricingTaskDetail, getMatchedPrices, updateMaterialPrice, removeMaterialPrice, updateTaskPricingMethod } from '@/api/pricing'
import { TASK_STATUS_MAP } from '@/views/dashboard/mockPricingData'
import MaterialSelectorDialog from './MaterialSelectorDialog.vue'
import * as XLSX from 'xlsx'

const route = useRoute()
const router = useRouter()

// 任务信息
const taskInfo = ref({})
// 待组价材料列表
const materials = ref([])
// 当前选中的材料
const currentMaterial = ref(null)
// 当前材料的匹配材价列表 (系统推荐)
const matchedPrices = ref([])
// 每个材料的手动选择结果映射表 { materialId: [price1, price2, ...] }
const manualSelectedPricesMap = ref({})
// 当前材料的手动选择结果列表
const manualSelectedPrices = computed(() => {
  if (!currentMaterial.value) return []
  return manualSelectedPricesMap.value[currentMaterial.value.id] || []
})

// 存储每个材料用户选择的取价方式key { materialId: 'trimmed_mean' | 'average' | 'lowest' | 'highest' }
const selectedMethodKeys = ref({})

// 计算各种取价方式的结果
const calculatedMethods = computed(() => {
  if (!matchedPrices.value || matchedPrices.value.length === 0) return []
  
  const list = matchedPrices.value
  // 确保数值有效
  const validList = list.filter(i => !isNaN(Number(i.priceIncludingTax))).map(i => ({
      ...i,
      priceVal: Number(i.priceIncludingTax)
  }))
  
  if (validList.length === 0) return []

  const sorted = [...validList].sort((a, b) => a.priceVal - b.priceVal)

  // 查找最接近值的项
  const findClosest = (targetVal) => {
    return sorted.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.priceVal - targetVal)
      const currDiff = Math.abs(curr.priceVal - targetVal)
      return currDiff < prevDiff ? curr : prev
    })
  }

  // 1. 最低价
  const lowest = sorted[0]
  
  // 2. 最高价
  const highest = sorted[sorted.length - 1]
  
  // 3. 平均价
  const sum = sorted.reduce((acc, curr) => acc + curr.priceVal, 0)
  const avgVal = sum / sorted.length
  const average = findClosest(avgVal)
  
  // 4. 去极值平均价
  let trimmed = average
  if (sorted.length > 2) {
      const slice = sorted.slice(1, -1) // 去掉最高最低
      const tSum = slice.reduce((acc, curr) => acc + curr.priceVal, 0)
      const tAvg = tSum / slice.length
      trimmed = findClosest(tAvg)
  }

  // 构建返回数组 (按去极值、平均、最低、最高的顺序展示，符合常用习惯)
  // 去重处理：如果多个方式对应的价格ID一样，要不要合并？
  // 用户需求是"增加几个取价方式的计算结果"，最好都列出来，即使价格一样，标签不同也有意义
  return [
      { key: 'trimmed_mean', label: '去极值平均', data: trimmed },
      { key: 'average', label: '平均', data: average },
      { key: 'lowest', label: '最低', data: lowest },
      { key: 'highest', label: '最高', data: highest }
  ]
})

// 当前选中的取价方式详情
const currentSelectedMethod = computed(() => {
  if (!currentMaterial.value || !currentMaterial.value.matchedPriceId) return null
  
  const materialId = currentMaterial.value.id
  const selectedId = currentMaterial.value.matchedPriceId
  
  // 优先使用用户明确选择的方法key
  if (selectedMethodKeys.value[materialId]) {
    const method = calculatedMethods.value.find(m => m.key === selectedMethodKeys.value[materialId])
    if (method && method.data.id === selectedId) {
      return method
    }
  }
  
  // 找到所有匹配当前选中价格ID的方法
  const matchingMethods = calculatedMethods.value.filter(m => m.data.id === selectedId)
  
  // 如果只有一个方法匹配，返回它
  if (matchingMethods.length === 1) {
    return matchingMethods[0]
  }
  
  // 如果多个方法都指向同一个价格ID，根据任务的默认取价方式来判断
  if (matchingMethods.length > 1) {
    const taskMethod = taskInfo.value.pricingMethod || 'trimmed_mean'
    const methodKeyMap = {
      'trimmed_mean': '去极值平均',
      'average': '平均',
      'lowest': '最低',
      'highest': '最高'
    }
    const preferredLabel = methodKeyMap[taskMethod]
    return matchingMethods.find(m => m.label === preferredLabel) || matchingMethods[0]
  }
  
  return null
})

// 抽屉显示状态
const drawerVisible = ref(false)

// 材价选择器弹窗
const selectorVisible = ref(false)

// 加载任务详情
const loadTaskDetail = async () => {
  try {
    const taskId = route.query.taskId
    if (!taskId) {
      ElMessage.error('缺少任务ID')
      return
    }

    const res = await getPricingTaskDetail(taskId)
    taskInfo.value = res.data.task || {}
    materials.value = res.data.materials || []

    // 默认通过选中的方式加载第一个材料的数据，但不弹出抽屉
    if (materials.value.length > 0) {
      handleMaterialRowClick(materials.value[0], false)
    }
  } catch (error) {
    ElMessage.error('加载任务详情失败')
  }
}

onMounted(() => {
  loadTaskDetail()
})

// 点击左侧材料行
const handleMaterialRowClick = async (row, showDrawer = true) => {
  currentMaterial.value = row
  
  // 加载该材料的匹配材价列表
  try {
    const res = await getMatchedPrices(row.id)
    matchedPrices.value = res.data || []
    if (showDrawer) {
      drawerVisible.value = true
    }
  } catch (error) {
    ElMessage.error('加载匹配材价失败')
  }
}

// 关闭抽屉
const handleDrawerClose = (done) => {
  done()
}

// 计算最低价的材价ID
const lowestPriceId = computed(() => {
  if (matchedPrices.value.length === 0) return null
  
  const sorted = [...matchedPrices.value].sort((a, b) => a.priceIncludingTax - b.priceIncludingTax)
  return sorted[0].id
})

// 选择材价
const handleSelectPrice = async (priceData, methodKey = null) => {
  try {
    await updateMaterialPrice(taskInfo.value.id, currentMaterial.value.id, priceData)
    
    // 如果提供了方法key，存储用户的选择
    if (methodKey) {
      selectedMethodKeys.value[currentMaterial.value.id] = methodKey
    }
    
    // 更新当前选中材料的属性 (关键：确保 matchedPriceId 赋值正确)
    currentMaterial.value.含税单价 = priceData.priceIncludingTax
    currentMaterial.value.含税总价 = (priceData.priceIncludingTax * currentMaterial.value.数量).toFixed(2)
    currentMaterial.value.品牌 = priceData.brand
    currentMaterial.value.matchedPriceId = priceData.id
    
    // 同步更新主列表中的数据，触发界面刷新
    const mIndex = materials.value.findIndex(m => m.id === currentMaterial.value.id)
    if (mIndex > -1) {
      const updatedMaterial = { ...currentMaterial.value }
      materials.value[mIndex] = updatedMaterial
      // 重要：让 currentMaterial 指向更新后的对象，确保响应式更新
      currentMaterial.value = updatedMaterial
    }
    
    ElMessage.success('已选择该材价')
  } catch (error) {
    console.error('Select price failed:', error)
    ElMessage.error('选择材价失败')
  }
}

// 删除单条推荐结果
const removeMatchedPrice = (row) => {
  matchedPrices.value = matchedPrices.value.filter(item => item.id !== row.id)
  ElMessage.success('已移除该推荐项')
}

// 批量清空系统推荐
const clearAllMatchedPrices = () => {
  ElMessageBox.confirm('确定要清空所有系统推荐的匹配结果吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    matchedPrices.value = []
    ElMessage.success('推荐列表已清空')
  }).catch(() => {})
}

// 移除手动选择的结果
const removeManualPrice = (row) => {
  const materialId = currentMaterial.value.id
  if (manualSelectedPricesMap.value[materialId]) {
    manualSelectedPricesMap.value[materialId] = manualSelectedPricesMap.value[materialId].filter(p => p.id !== row.id)
  }
}

// 打开材价选择器
const openMaterialSelector = () => {
  selectorVisible.value = true
}

// 处理材价选择器选择结果
const handlePriceSelected = (priceData) => {
  if (!currentMaterial.value) return
  
  // 将该价格加入当前材料的手动选择列表中（避免重复）
  const materialId = currentMaterial.value.id
  if (!manualSelectedPricesMap.value[materialId]) {
    manualSelectedPricesMap.value[materialId] = []
  }
  
  const exists = manualSelectedPricesMap.value[materialId].some(p => p.id === priceData.id)
  if (!exists) {
    manualSelectedPricesMap.value[materialId].unshift({
      ...priceData,
      materialName: priceData.materialName || priceData.name, // 统一字段名
      specification: priceData.specification || priceData.spec
    })
  }

  // 同时也选中该价格
  handleSelectPrice(priceData)
  selectorVisible.value = false
}

// 导出Excel
const exportExcel = () => {
  const wb = XLSX.utils.book_new()
  
  // 准备导出数据
  const exportData = materials.value.map((item, index) => ({
    '序号': index + 1,
    '材料名称': item.材料名称,
    '规格型号': item.规格型号,
    '单位': item.单位,
    '数量': item.数量,
    '含税单价': item.含税单价 || '',
    '含税总价': item.含税总价 || '',
    '品牌': item.品牌,
    '备注': item.备注
  }))
  
  const ws = XLSX.utils.json_to_sheet(exportData)
  
  // 设置列宽
  ws['!cols'] = [
    { wch: 8 },
    { wch: 20 },
    { wch: 25 },
    { wch: 10 },
    { wch: 10 },
    { wch: 12 },
    { wch: 12 },
    { wch: 15 },
    { wch: 20 }
  ]
  
  XLSX.utils.book_append_sheet(wb, ws, '组价结果')
  XLSX.writeFile(wb, `${taskInfo.value.taskName}_组价结果.xlsx`)
  
  ElMessage.success('导出成功')
}

// 返回列表
const goBack = () => {
  router.push({ path: '/workbench', query: { tab: '智能组价' } })
}

// 工具函数
const formatPrice = (price) => {
  return price ? Number(price).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'
}

const getStatusLabel = (status) => {
  return TASK_STATUS_MAP[status]?.label || status
}

const getStatusType = (status) => {
  return TASK_STATUS_MAP[status]?.type || 'info'
}

const tableRowClassName = ({ row }) => {
  if (row.id === currentMaterial.value?.matchedPriceId) {
    return 'selected-row-highlight'
  }
  return ''
}


// 取价方式相关
const methodDialogVisible = ref(false)
const tempPricingMethod = ref('average')
const methodUpdating = ref(false)

const getPricingMethodLabel = (method) => {
  const map = {
    'trimmed_mean': '去极值平均价',
    'average': '平均价',
    'lowest': '最低价',
    'highest': '最高价'
  }
  return map[method] || '平均价'
}

const showPricingMethodDialog = () => {
  tempPricingMethod.value = taskInfo.value.pricingMethod || 'average'
  methodDialogVisible.value = true
}

const confirmUpdatePricingMethod = async () => {
  if (tempPricingMethod.value === taskInfo.value.pricingMethod) {
    methodDialogVisible.value = false
    return
  }
  
  methodUpdating.value = true
  try {
    await updateTaskPricingMethod(taskInfo.value.id, tempPricingMethod.value)
    ElMessage.success('取价方式已更新，相关材料价格已重新计算')
    methodDialogVisible.value = false
    // 重新加载详情
    loadTaskDetail()
  } catch (error) {
    ElMessage.error('更新失败')
  } finally {
    methodUpdating.value = false
  }
}
</script>

<style lang="scss" scoped>
$glass-bg: rgba(255, 255, 255, 0.75);
$glass-border: rgba(255, 255, 255, 0.5);
$primary-blue: #377cfd;

.pricing-detail-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.glass-card {
  background: $glass-bg;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
}

.fail-alert {
  margin-bottom: 0;
  border-radius: 12px;
  border: 1px solid #fde2e2;
}

.header-section {
  flex-shrink: 0;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .header-left {
    flex: 1;
    
    .task-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: 700;
      color: #303133;
      
      .title-icon {
        color: $primary-blue;
        font-size: 20px;
      }
    }
    
    .task-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 13px;
      color: #606266;
      
      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
        
        .el-icon {
          color: #909399;
        }

        &.click-edit {
          cursor: pointer;
          padding: 2px 8px;
          border-radius: 4px;
          transition: background 0.2s;
          
          &:hover {
            background: rgba(0,0,0,0.04);
            .edit-icon { opacity: 1; }
          }

          .edit-icon {
            margin-left: 4px;
            font-size: 14px;
            color: $primary-blue;
            opacity: 0.6;
          }
        }
      }
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.content-section {
  flex: 1;
  display: flex;
  min-height: 0;
  
  .main-list-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-height: 0;
  }
  
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e4e7ed;
    
    .header-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 700;
      color: #303133;
      
      .el-icon {
        color: $primary-blue;
        font-size: 18px;
      }
    }
    
    .header-info {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .count-badge {
        padding: 4px 12px;
        background: #e6f7ff;
        color: $primary-blue;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
}

.drawer-body-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;

  .material-reference-card.compact {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 20px;
    margin-bottom: 20px;

    .ref-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      
      .ref-main {
        display: flex;
        align-items: center;
        gap: 12px;
        .base-tag { margin-right: 4px; }
        .name { font-size: 15px; font-weight: 700; color: #334155; }
        .black-bold { color: #0f172a !important; font-weight: 900; }
        .spec { font-size: 13px; color: #64748b; }
      }

      .search-btn-large {
        padding: 10px 18px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
      }
    }

    .ref-details {
      display: flex;
      gap: 32px;
      font-size: 13px;
      color: #475569;
      
      .detail-item {
        display: flex;
        align-items: center;
        .label { color: #94a3b8; }
        &.highlight {
          margin-left: 0; /* 修改: 取消自动边距，由前面的元素顶过来 */
          padding-left: 20px;
          border-left: 1px solid #e2e8f0;
          
          .val { color: #ef4444; font-weight: 700; font-size: 18px; margin-left: 6px; }
        }
        .empty { color: #cbd5e1; }
      }
    }
  }

  .pricing-methods-quick-select {
    margin-left: auto; /* 推到右侧 */
    display: flex;
    gap: 10px;
    align-items: center;
    
    .method-tag {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4px 12px;
      /* Reverting: Unselected is White/Gray */
      background: #fff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      min-width: 60px;
      user-select: none;
      
      .m-label {
        font-size: 11px;
        color: #64748b;
        margin-bottom: 2px;
      }
      
      .m-price {
        font-size: 13px;
        font-weight: 500;
        color: #334155;
      }
      
      &:hover {
        border-color: $primary-blue;
        background: #f0f9ff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(55, 124, 253, 0.1);
      }
      
      /* Reverting: Active is Blue */
      &.active {
        background: #ecf5ff;
        border-color: $primary-blue;
        box-shadow: 0 2px 8px rgba(55, 124, 253, 0.15);
        
        .m-label { color: $primary-blue; font-weight: 700; }
        .m-price { color: $primary-blue; font-weight: 700; }
      }
    }
  }

  .section-title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-left: 4px;
    
    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: #334155;
      position: relative;
      padding-left: 12px;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 14px;
        background: $primary-blue;
        border-radius: 2px;
      }
    }
  }

  .match-list-wrapper {
    flex: 1;
    min-height: 200px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #eef2f6;
    
    &.manual-list {
      flex: none;
      margin-bottom: 0;
    }
  }
}

.spacer-24 { height: 24px; }

:deep(.pricing-drawer) {
  .el-drawer__header {
    margin-bottom: 0;
    padding: 16px 24px;
    border-bottom: 1px solid #f1f5f9;
    color: #0f172a;
  }
  
  .el-drawer__body {
    padding: 24px;
    background: #ffffff;
  }

  .el-table__header-wrapper th .cell {
    white-space: nowrap !important;
  }
}

.drawer-custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .title-icon {
      font-size: 20px;
      color: $primary-blue;
    }
    .title-text {
      font-size: 16px;
      font-weight: 800;
      color: #0f172a;
    }
  }

  .header-right {
    .close-btn {
      font-size: 20px;
      color: #64748b;
      &:hover { color: #ef4444; }
    }
  }
}

.price-cell {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  
  .lowest-indicator {
    white-space: nowrap;
    font-size: 10px;
    background: #ef4444;
    color: #fff;
    padding: 0 6px;
    line-height: 18px;
    border-radius: 4px;
    font-weight: 700;
  }
}

.op-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.selected-text {
  color: #10b981;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 2px;
}

.selected-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #10b981;
  font-size: 13px;
  font-weight: 600;
}

.select-btn {
  font-weight: 600;
}

.price-value {
  font-weight: 600;
  color: #303133;
}

.price-empty {
  color: #f56c6c;
  font-size: 12px;
}

.price-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  
  .lowest-tag {
    flex-shrink: 0;
  }
}

.action-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  
  .el-divider {
    margin: 0 4px;
  }
}

:deep(.selected-row-highlight) {
  --el-table-tr-bg-color: #e6f7ff !important;
}

:deep(.selected-row-highlight:hover > td.el-table__cell) {
  background-color: #d1edff !important;
}
</style>
