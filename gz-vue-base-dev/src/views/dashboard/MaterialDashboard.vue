<template>
  <div class="material-dashboard">
    <!-- 顶部标题栏 -->
    <div class="dashboard-header">
      <div class="header-left">
        <h1 class="dashboard-title">
          <el-icon><DataAnalysis /></el-icon>
          材料价格管理驾驶舱
        </h1>
        <span class="update-time">数据更新时间：{{ currentTime }}</span>
      </div>
      <div class="header-right">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="default"
          style="width: 260px"
        />
        <el-button type="primary" :icon="Refresh" @click="refreshData">刷新数据</el-button>
      </div>
    </div>

    <!-- 核心指标卡片区 -->
    <div class="kpi-cards">
      <div class="kpi-card" v-for="(item, key) in kpiCards" :key="key">
        <div class="kpi-icon" :class="item.iconClass">
          <el-icon><component :is="item.icon" /></el-icon>
        </div>
        <div class="kpi-content">
          <div class="kpi-value">
            <span class="value">{{ item.displayValue }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
          <div class="kpi-label">{{ item.label }}</div>
          <div class="kpi-extra" v-if="item.extra">
            <span :class="['trend', item.trend]" v-if="item.rate !== undefined">
              <el-icon v-if="item.trend === 'up'"><CaretTop /></el-icon>
              <el-icon v-else-if="item.trend === 'down'"><CaretBottom /></el-icon>
              {{ Math.abs(item.rate) }}%
            </span>
            <span class="sub-info" v-if="item.subInfo">{{ item.subInfo }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="dashboard-content">
      <!-- 左侧区域 -->
      <div class="content-left">
        <!-- 中标价vs市场价偏差趋势 -->
        <div class="chart-card flex-card">
          <div class="card-header">
            <div class="header-title-group">
              <h3>中标价vs市场价偏差趋势</h3>
              <el-select 
                v-model="selectedDeviationMaterial" 
                placeholder="选择材料" 
                size="small" 
                style="width: 160px; margin-left: 12px"
                @change="handleDeviationMaterialChange"
              >
                <el-option 
                  v-for="name in deviationMaterialOptions" 
                  :key="name" 
                  :label="name" 
                  :value="name" 
                />
              </el-select>
            </div>
            <el-tag :type="deviationStatus">{{ deviationText }}</el-tag>
          </div>
          <div class="chart-container" ref="deviationChartRef"></div>
        </div>

        <!-- 材料分类占比 -->
        <div class="chart-card flex-card">
          <div class="card-header">
            <h3>材料分类占比统计</h3>
            <el-radio-group v-model="categoryViewType" size="small">
              <el-radio-button label="pie">环形图</el-radio-button>
              <el-radio-button label="bar">柱状图</el-radio-button>
            </el-radio-group>
          </div>
          <div class="chart-container" ref="categoryChartRef"></div>
        </div>
      </div>

      <!-- 右侧区域 -->
      <div class="content-right">
        <!-- 大宗商品价格走势 -->
        <div class="chart-card flex-card">
          <div class="card-header">
            <h3>大宗商品价格走势</h3>
            <el-button type="primary" link>价格预警 <el-icon><ArrowRight /></el-icon></el-button>
          </div>
          <div class="chart-container" ref="commodityChartRef"></div>
        </div>

        <!-- 供应商量价分析 -->
        <div class="chart-card flex-card">
          <div class="card-header">
            <div class="header-title-group">
              <h3>供应商量价分析 TOP10</h3>
              <el-select 
                v-model="selectedSupplierMaterial" 
                placeholder="材料筛选" 
                size="small" 
                style="width: 130px; margin-left: 12px"
                @change="handleSupplierMaterialChange"
              >
                <el-option 
                  v-for="name in supplierMaterialOptions" 
                  :key="name" 
                  :label="name" 
                  :value="name" 
                />
              </el-select>
            </div>
            <el-button type="primary" link @click="goToSupplierQuery">全部供应商 <el-icon><ArrowRight /></el-icon></el-button>
          </div>
          <div class="chart-container" ref="supplierChartRef"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { 
  DataAnalysis, Refresh, CaretTop, CaretBottom, ArrowRight,
  Box, Document, OfficeBuilding, Warning
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import {
  basicStats,
  priceDeviationData,
  commodityTrendsData,
  materialCategoryData,
  supplierAnalysisData,
  formatAmount
} from './mockMaterialDashboard.js'

const router = useRouter()

// 响应式数据
const currentTime = ref('')
const dateRange = ref([])
const categoryViewType = ref('pie')
const selectedDeviationMaterial = ref(priceDeviationData.defaultMaterial)
const selectedSupplierMaterial = ref(supplierAnalysisData.defaultMaterial)

// 材料选项
const deviationMaterialOptions = computed(() => Object.keys(priceDeviationData.materials))
const supplierMaterialOptions = computed(() => Object.keys(supplierAnalysisData.materials))

// 图表引用
const deviationChartRef = ref(null)
const commodityChartRef = ref(null)
const categoryChartRef = ref(null)
const supplierChartRef = ref(null)

// 图表实例
let deviationChart = null
let commodityChart = null
let categoryChart = null
let supplierChart = null

// KPI卡片数据
const kpiCards = computed(() => ({
  materialCount: {
    icon: 'Box',
    iconClass: 'blue',
    displayValue: basicStats.materialCount.value.toLocaleString(),
    unit: basicStats.materialCount.unit,
    label: basicStats.materialCount.label,
    subInfo: `本月新增 ${basicStats.materialCount.newThisMonth} 种`,
    extra: true
  },
  priceRecordCount: {
    icon: 'Document',
    iconClass: 'green',
    displayValue: basicStats.priceRecordCount.value.toLocaleString(),
    unit: basicStats.priceRecordCount.unit,
    label: basicStats.priceRecordCount.label,
    subInfo: `本月新增 ${basicStats.priceRecordCount.newThisMonth} 条`,
    extra: true
  },
  supplierCount: {
    icon: 'OfficeBuilding',
    iconClass: 'cyan',
    displayValue: basicStats.supplierCount.value.toLocaleString(),
    unit: basicStats.supplierCount.unit,
    label: basicStats.supplierCount.label,
    subInfo: `本月新增 ${basicStats.supplierCount.newThisMonth} 家`,
    extra: true
  },
  priceAlertCount: {
    icon: 'Warning',
    iconClass: 'orange',
    displayValue: basicStats.priceAlertCount.value,
    unit: basicStats.priceAlertCount.unit,
    label: basicStats.priceAlertCount.label,
    subInfo: `本月新增 ${basicStats.priceAlertCount.highRisk} 项`,
    extra: true
  }
}))

// 偏差状态
const deviationStatus = computed(() => {
  const currentData = priceDeviationData.materials[selectedDeviationMaterial.value]
  if (!currentData) return 'info'
  const latestDeviation = currentData.deviation[currentData.deviation.length - 1]
  const absDeviation = Math.abs(latestDeviation)
  if (absDeviation > 15) return 'danger'
  if (absDeviation > 10) return 'warning'
  return 'success'
})

const deviationText = computed(() => {
  const currentData = priceDeviationData.materials[selectedDeviationMaterial.value]
  if (!currentData) return '正常'
  const latestDeviation = currentData.deviation[currentData.deviation.length - 1]
  return `偏差 ${latestDeviation.toFixed(1)}%`
})

// 工具函数
function updateCurrentTime() {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

function refreshData() {
  updateCurrentTime()
  initAllCharts()
}

// ==================== 图表初始化函数 ====================

// 1. 中标价vs市场价偏差趋势图
function initDeviationChart() {
  if (!deviationChartRef.value) return
  
  if (deviationChart) {
    deviationChart.dispose()
  }
  
  deviationChart = echarts.init(deviationChartRef.value)
  
  const currentData = priceDeviationData.materials[selectedDeviationMaterial.value]
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['中标价', '市场价', '偏差率'],
      top: 0,
      right: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '40px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: currentData.months.map(m => m.substring(5) + '月'),
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisLabel: { color: '#666' }
    },
    yAxis: [
      {
        type: 'value',
        position: 'left',
        axisLabel: {
          color: '#666',
          formatter: value => '¥' + (value / 10000).toFixed(1) + '万'
        },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
      },
      {
        type: 'value',
        position: 'right',
        axisLabel: {
          color: '#666',
          formatter: value => value.toFixed(0) + '%'
        },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '中标价',
        type: 'line',
        smooth: true,
        data: currentData.bidPrice,
        lineStyle: { width: 3, color: '#409eff' },
        itemStyle: { color: '#409eff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 0.2)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
          ])
        }
      },
      {
        name: '市场价',
        type: 'line',
        smooth: true,
        data: currentData.marketPrice,
        lineStyle: { width: 3, color: '#67c23a' },
        itemStyle: { color: '#67c23a' }
      },
      {
        name: '偏差率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: currentData.deviation,
        lineStyle: { width: 2, color: '#f56c6c', type: 'dashed' },
        itemStyle: { color: '#f56c6c' }
      }
    ]
  }
  
  deviationChart.setOption(option)
}

// 2. 大宗商品价格走势图
function initCommodityChart() {
  if (!commodityChartRef.value) return
  
  if (commodityChart) {
    commodityChart.dispose()
  }
  
  commodityChart = echarts.init(commodityChartRef.value)
  
  const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#9c27b0', '#00bcd4']
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: commodityTrendsData.commodities.map(c => c.name),
      top: 0,
      type: 'scroll',
      textStyle: { fontSize: 11 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '40px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: commodityTrendsData.months.map(m => m.substring(5) + '月'),
      axisLabel: { fontSize: 11, color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 11, color: '#666' },
      splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: commodityTrendsData.commodities.map((c, i) => ({
      name: c.name,
      type: 'line',
      smooth: true,
      data: c.prices,
      lineStyle: { color: colors[i], width: 2 },
      itemStyle: { color: colors[i] },
      markPoint: c.change > 10 ? {
        data: [{ type: 'max', name: '最高' }],
        symbol: 'pin',
        symbolSize: 40,
        itemStyle: { color: '#f56c6c' }
      } : undefined
    }))
  }
  
  commodityChart.setOption(option)
}

// 3. 材料分类占比图
function initCategoryChart() {
  if (!categoryChartRef.value) return
  
  if (categoryChart) {
    categoryChart.dispose()
  }
  
  categoryChart = echarts.init(categoryChartRef.value)
  
  let option
  
  if (categoryViewType.value === 'pie') {
    option = {
      tooltip: {
        trigger: 'item',
        formatter: params => {
          const category = materialCategoryData.categories.find(c => c.name === params.name)
          return `${params.name}<br/>
                  金额: ¥${(params.value / 10000).toFixed(2)}万<br/>
                  占比: ${params.percent.toFixed(1)}%<br/>
                  品类数: ${category.itemCount}种`
        }
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'center',
        textStyle: { fontSize: 12 }
      },
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['60%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{d}%',
            fontSize: 11
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 13,
              fontWeight: 'bold'
            }
          },
          data: materialCategoryData.categories.map(cat => ({
            name: cat.name,
            value: cat.value
          }))
        }
      ]
    }
  } else {
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20px',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: materialCategoryData.categories.map(c => c.name),
        axisLabel: { fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 11,
          formatter: value => (value / 10000).toFixed(0) + '万'
        },
        splitLine: { lineStyle: { color: '#f0f0f0' } }
      },
      series: [
        {
          type: 'bar',
          data: materialCategoryData.categories.map(c => c.value),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#409eff' },
              { offset: 1, color: '#67c23a' }
            ]),
            borderRadius: [4, 4, 0, 0]
          },
          barWidth: '50%',
          label: {
            show: true,
            position: 'top',
            formatter: params => (params.value / 10000).toFixed(0) + '万',
            fontSize: 11
          }
        }
      ]
    }
  }
  
  categoryChart.setOption(option)
}

// 4. 供应商量价分析图
function initSupplierChart() {
  if (!supplierChartRef.value) return
  
  if (supplierChart) {
    supplierChart.dispose()
  }
  
  supplierChart = echarts.init(supplierChartRef.value)
  
  const currentSuppliers = supplierAnalysisData.materials[selectedSupplierMaterial.value] || []
  const top10 = currentSuppliers.slice(0, 10)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        const index = params[0].dataIndex
        const supplier = top10[top10.length - 1 - index]
        return `${supplier.name}<br/>
                采购量: ${supplier.quantity} ${supplier.unit}<br/>
                采购额: ¥${(supplier.amount / 10000).toFixed(2)}万<br/>
                均价: ¥${supplier.avgPrice.toLocaleString()}`
      }
    },
    grid: {
      left: '3%',
      right: '15%',
      bottom: '3%',
      top: '10px',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'category',
      data: top10.map(s => s.name).reverse(),
      axisLabel: {
        fontSize: 11,
        width: 100,
        overflow: 'truncate'
      },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    series: [
      {
        name: '采购金额',
        type: 'bar',
        data: top10.map(s => s.amount).reverse(),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#409eff' },
            { offset: 1, color: '#67c23a' }
          ]),
          borderRadius: [0, 4, 4, 0]
        },
        barWidth: '60%',
        label: {
          show: true,
          position: 'right',
          formatter: params => (params.value / 10000).toFixed(1) + '万',
          fontSize: 10,
          color: '#606266'
        }
      }
    ]
  }
  
  supplierChart.setOption(option)
}

// 材料切换处理
function handleDeviationMaterialChange() {
  initDeviationChart()
}

function handleSupplierMaterialChange() {
  initSupplierChart()
}

// 跳转到供应商查询
function goToSupplierQuery() {
  router.push({ query: { ...router.currentRoute.value.query, tab: '供应商查询' } })
}

// 初始化所有图表
function initAllCharts() {
  nextTick(() => {
    initDeviationChart()
    initCommodityChart()
    initCategoryChart()
    initSupplierChart()
  })
}

// 监听分类图表切换
watch(categoryViewType, () => {
  initCategoryChart()
})

// 窗口大小变化时重绘图表
function handleResize() {
  deviationChart?.resize()
  commodityChart?.resize()
  categoryChart?.resize()
  supplierChart?.resize()
}

// 生命周期
let timer = null

onMounted(() => {
  updateCurrentTime()
  // 每小时自动更新一次时间（1小时 = 3600000ms）
  timer = setInterval(updateCurrentTime, 3600000)
  initAllCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('resize', handleResize)
  deviationChart?.dispose()
  commodityChart?.dispose()
  categoryChart?.dispose()
  supplierChart?.dispose()
})
</script>

<style lang="scss" scoped>
.material-dashboard {
  padding: 0;
  background: transparent;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 16px 16px 16px;
    padding: 16px 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    flex-shrink: 0;
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 20px;
      
      .dashboard-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 20px;
        font-weight: 600;
        color: #303133;
        margin: 0;
        
        .el-icon {
          color: #67c23a;
          font-size: 24px;
        }
      }
      
      .update-time {
        font-size: 13px;
        color: #909399;
      }
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
  
  .kpi-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 0 16px 16px 16px;
    min-width: 0;
    overflow-x: auto;
    padding-bottom: 4px;
    flex-shrink: 0;
    
    &::-webkit-scrollbar {
      height: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f0f2f5;
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #c0c4cc;
      border-radius: 3px;
      
      &:hover {
        background: #909399;
      }
    }
    
    .kpi-card {
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      gap: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      transition: all 0.3s;
      min-width: 140px;
      flex-shrink: 0;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      .kpi-icon {
        width: 48px;
        height: 48px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        
        .el-icon {
          font-size: 24px;
          color: #fff;
        }
        
        &.blue { background: linear-gradient(135deg, #409eff, #53a8ff); }
        &.green { background: linear-gradient(135deg, #67c23a, #85ce61); }
        &.orange { background: linear-gradient(135deg, #e6a23c, #ebb563); }
        &.cyan { background: linear-gradient(135deg, #00bcd4, #4dd0e1); }
      }
      
      .kpi-content {
        flex: 1;
        min-width: 0;
        
        .kpi-value {
          display: flex;
          align-items: baseline;
          gap: 4px;
          
          .value {
            font-size: 22px;
            font-weight: 700;
            color: #303133;
          }
          
          .unit {
            font-size: 12px;
            color: #909399;
          }
        }
        
        .kpi-label {
          font-size: 13px;
          color: #606266;
          margin: 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .kpi-extra {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          
          .sub-info {
            color: #909399;
          }
        }
      }
    }
  }
  
  .dashboard-content {
    display: grid;
    grid-template-columns: 60fr 40fr;
    gap: 16px;
    margin: 0 16px 16px 16px;
    flex: 1;
    min-height: 0;
    
    .content-left,
    .content-right {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-height: 0;
    }
    
    .chart-card {
      background: #fff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      display: flex;
      flex-direction: column;
      min-height: 0;
      
      &.flex-card {
        flex: 1;
      }
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        flex-shrink: 0;
        
        h3 {
          font-size: 15px;
          font-weight: 600;
          color: #303133;
          margin: 0;
        }

        .header-title-group {
          display: flex;
          align-items: center;
        }
      }
      
      .chart-container {
        flex: 1;
        min-height: 300px;
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .material-dashboard {
    .kpi-cards {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .dashboard-content {
      grid-template-columns: 1fr;
    }
  }
}

@media screen and (max-width: 1200px) {
  .material-dashboard {
    .kpi-cards {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .dashboard-content {
      grid-template-columns: 1fr;
    }
  }
}

// 响应式高度调整 - 中等屏幕 (笔记本常见分辨率)
@media screen and (max-height: 900px) {
  .material-dashboard {
    .kpi-cards {
      padding-bottom: 0;
      margin-bottom: 12px;
    }
    
    .dashboard-content {
      gap: 12px;
      margin-bottom: 12px;
      
      .chart-card {
        padding: 12px; // 减少内边距
        
        .card-header {
          margin-bottom: 8px; // 减少标题下边距
          h3 { font-size: 14px; }
        }

        .chart-container {
          min-height: 200px; // 降低最小高度
        }
      }
      
      .content-left,
      .content-right {
        gap: 12px;
      }
    }
  }
}

// 响应式高度调整 - 小屏幕 (较矮的笔记本屏幕)
@media screen and (max-height: 768px) {
  .material-dashboard {
    .dashboard-header {
      margin-bottom: 12px;
      padding: 12px 16px;
    }
    
    .kpi-cards {
      gap: 10px;
      margin-bottom: 10px;
      
      .kpi-card {
        padding: 12px;
      }
    }

    .dashboard-content {
      gap: 10px;
      margin-bottom: 10px;
      
      .chart-card {
        padding: 10px;
        
        .chart-container {
          min-height: 160px; // 进一步降低
        }
      }
      
      .content-left,
      .content-right {
        gap: 10px;
      }
    }
  }
}

// 响应式高度调整 - 超小屏幕
@media screen and (max-height: 600px) {
  .material-dashboard {
    .dashboard-content {
      .chart-card {
        padding: 8px;
        .chart-container {
          min-height: 120px; // 极限高度
        }
      }
      
      .content-left,
      .content-right {
        gap: 8px;
      }
    }
  }
}
</style>
