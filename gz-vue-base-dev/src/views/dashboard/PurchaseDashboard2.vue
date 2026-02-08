<template>
  <div class="purchase-dashboard">
    <!-- 顶部标题栏 -->
    <div class="dashboard-header">
      <div class="header-left">
        <h1 class="dashboard-title">
          <el-icon><DataAnalysis /></el-icon>
          供应商材料价格管理驾驶舱
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
        <!-- 采购金额趋势 -->
        <div class="chart-card flex-card">
          <div class="card-header">
            <h3>采购金额趋势</h3>
            <el-radio-group v-model="trendType" size="small">
              <el-radio-button label="amount">金额</el-radio-button>
              <el-radio-button label="compare">同比</el-radio-button>
            </el-radio-group>
          </div>
          <div class="chart-container" ref="trendChartRef"></div>
        </div>

        <!-- 采购分类统计 -->
        <div class="chart-card flex-card">
          <div class="card-header">
            <h3>采购分类统计</h3>
            <el-radio-group v-model="categoryViewType" size="small">
              <el-radio-button label="sunburst">旭日图</el-radio-button>
              <el-radio-button label="pie">饼图</el-radio-button>
            </el-radio-group>
          </div>
          <div class="chart-container" ref="categoryChartRef"></div>
        </div>
      </div>

      <!-- 右侧区域 -->
      <div class="content-right">
        <!-- 材料价格监控 -->
        <div class="chart-card flex-card">
          <div class="card-header">
            <h3>材料价格监控</h3>
            <el-button type="primary" link>更多预警 <el-icon><ArrowRight /></el-icon></el-button>
          </div>
          <div class="chart-container" ref="priceChartRef"></div>
        </div>

        <!-- 供应商分析 -->
        <div class="chart-card flex-card">
          <div class="card-header">
            <div class="header-title-group">
              <h3>供应商TOP10</h3>
              <el-select v-model="selectedMaterial" placeholder="材料筛选" size="small" style="width: 120px; margin-left: 12px" @change="handleMaterialChange">
                <el-option v-for="item in materialOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </div>
            <el-button type="primary" link>全部供应商 <el-icon><ArrowRight /></el-icon></el-button>
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
  Money, TrendCharts, Box, OfficeBuilding
} from '@element-plus/icons-vue'
import {
  kpiData,
  purchaseTrendData,
  categoryData,
  supplierData,
  materialPriceData,
  formatAmount as formatAmountUtil
} from './mockDashboardData.js'

// 响应式数据
const currentTime = ref('')
const dateRange = ref([])
const trendType = ref('amount')
const categoryViewType = ref('sunburst')
const selectedMaterial = ref('MBR膜系统')
const materialOptions = ['MBR膜系统', '泵类设备', '流量计', '压榨机']

// 图表引用
const trendChartRef = ref(null)
const categoryChartRef = ref(null)
const priceChartRef = ref(null)
const supplierChartRef = ref(null)

// 图表实例
let trendChart = null
let categoryChart = null
let priceChart = null
let supplierChart = null

// KPI卡片数据
const kpiCards = computed(() => ({
  yearPurchase: {
    icon: 'Money',
    iconClass: 'blue',
    displayValue: formatAmount(kpiData.yearPurchaseAmount.value),
    unit: '万元',
    label: kpiData.yearPurchaseAmount.label,
    rate: kpiData.yearPurchaseAmount.yoyRate,
    trend: kpiData.yearPurchaseAmount.trend,
    extra: true
  },
  monthPurchase: {
    icon: 'TrendCharts',
    iconClass: 'green',
    displayValue: formatAmount(kpiData.monthPurchaseAmount.value),
    unit: '万元',
    label: kpiData.monthPurchaseAmount.label,
    rate: kpiData.monthPurchaseAmount.momRate,
    trend: kpiData.monthPurchaseAmount.trend,
    extra: true
  },
  supplierCount: {
    icon: 'OfficeBuilding',
    iconClass: 'cyan',
    displayValue: kpiData.supplierCount.value,
    unit: kpiData.supplierCount.unit,
    label: kpiData.supplierCount.label,
    subInfo: `本月新增 ${kpiData.supplierCount.newThisMonth} 家`,
    extra: true
  },
  materialTypeCount: {
    icon: 'Box',
    iconClass: 'orange',
    displayValue: kpiData.materialTypeCount.value,
    unit: kpiData.materialTypeCount.unit,
    label: kpiData.materialTypeCount.label,
    subInfo: kpiData.materialTypeCount.subLabel,
    extra: true
  }
}))

// 工具函数
function formatAmount(value) {
  return (value / 10000).toFixed(2)
}

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

// 图表初始化函数
function initTrendChart() {
  if (!trendChartRef.value) return
  
  if (trendChart) {
    trendChart.dispose()
  }
  
  trendChart = echarts.init(trendChartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      formatter: function(params) {
        let result = params[0].axisValue + '<br/>'
        params.forEach(item => {
          result += `${item.marker} ${item.seriesName}: ¥${(item.value / 10000).toFixed(2)}万<br/>`
        })
        return result
      }
    },
    legend: {
      data: ['实际采购', '预算金额', '去年同期'],
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
      data: purchaseTrendData.months.map(m => m.substring(5) + '月'),
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisLabel: { color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#666',
        formatter: value => (value / 10000).toFixed(0) + '万'
      },
      splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: [
      {
        name: '实际采购',
        type: 'line',
        smooth: true,
        data: purchaseTrendData.actualAmount,
        lineStyle: { width: 3, color: '#409eff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
          ])
        },
        itemStyle: { color: '#409eff' }
      },
      {
        name: '预算金额',
        type: 'line',
        smooth: true,
        data: purchaseTrendData.budgetAmount,
        lineStyle: { width: 2, color: '#67c23a', type: 'dashed' },
        itemStyle: { color: '#67c23a' }
      },
      {
        name: '去年同期',
        type: 'line',
        smooth: true,
        data: purchaseTrendData.lastYearAmount,
        lineStyle: { width: 2, color: '#909399' },
        itemStyle: { color: '#909399' }
      }
    ]
  }
  
  trendChart.setOption(option)
}

function initCategoryChart() {
  if (!categoryChartRef.value) return
  
  if (categoryChart) {
    categoryChart.dispose()
  }
  
  categoryChart = echarts.init(categoryChartRef.value)
  
  let option
  
  if (categoryViewType.value === 'sunburst') {
    option = {
      tooltip: {
        formatter: function(params) {
          return `${params.name}<br/>金额: ¥${(params.value / 10000).toFixed(2)}万`
        }
      },
      series: {
        type: 'sunburst',
        data: categoryData.sunburstData,
        radius: [0, '90%'],
        sort: undefined,
        emphasis: {
          focus: 'ancestor'
        },
        levels: [
          {},
          {
            r0: '15%',
            r: '40%',
            itemStyle: { borderWidth: 2 },
            label: { 
              rotate: 'tangential',
              fontSize: 12
            }
          },
          {
            r0: '40%',
            r: '65%',
            label: {
              position: 'outside',
              padding: 3,
              silent: false,
              fontSize: 10
            }
          },
          {
            r0: '65%',
            r: '68%',
            label: {
              position: 'outside',
              fontSize: 9,
              show: false
            },
            itemStyle: { borderWidth: 1 }
          }
        ]
      }
    }
  } else {
    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: ¥{c}万 ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}\n{d}%'
          },
          data: categoryData.level1.map(item => ({
            name: item.name,
            value: (item.value / 10000).toFixed(2)
          }))
        }
      ]
    }
  }
  
  categoryChart.setOption(option)
}

function initPriceChart() {
  if (!priceChartRef.value) return
  
  if (priceChart) {
    priceChart.dispose()
  }
  
  priceChart = echarts.init(priceChartRef.value)
  
  const materials = materialPriceData.priceHistory.materials
  const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: materials.map(m => m.name),
      top: 0,
      type: 'scroll',
      textStyle: { fontSize: 10 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '35px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: materialPriceData.priceHistory.months.map(m => m.substring(5) + '月'),
      axisLabel: { fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 10 },
      splitLine: { lineStyle: { color: '#f0f0f0' } }
    },
    series: materials.map((m, i) => ({
      name: m.name,
      type: 'line',
      smooth: true,
      data: m.prices,
      lineStyle: { color: colors[i], width: 2 },
      itemStyle: { color: colors[i] }
    }))
  }
  
  priceChart.setOption(option)
}

function initSupplierChart() {
  if (!supplierChartRef.value) return
  
  if (supplierChart) {
    supplierChart.dispose()
  }
  
  supplierChart = echarts.init(supplierChartRef.value)
  
  const currentSuppliers = supplierData.supplierByMaterial[selectedMaterial.value] || supplierData.topSuppliers
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        const data = params[0]
        const supplier = currentSuppliers[data.dataIndex]
        return `${supplier.name}<br/>
                采购金额: ¥${(supplier.amount / 10000).toFixed(2)}万`
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '3%',
      top: '10px',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        show: false // 隐藏 X 轴金额标签
      },
      splitLine: {
        show: false // 隐藏网格线
      }
    },
    yAxis: {
      type: 'category',
      data: currentSuppliers.map(s => s.name).reverse(),
      axisLabel: {
        fontSize: 11,
        width: 120,
        overflow: 'truncate'
      },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    series: [{
      type: 'bar',
      data: currentSuppliers.map(s => s.amount).reverse(),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#409eff' },
          { offset: 1, color: '#67c23a' }
        ]),
        borderRadius: [0, 4, 4, 0]
      },
      barWidth: '60%',
      label: {
        show: false // 隐藏条形图上的数值标签
      }
    }]
  }
  
  supplierChart.setOption(option)
}

function handleMaterialChange() {
  initSupplierChart()
}

function initAllCharts() {
  nextTick(() => {
    initTrendChart()
    initCategoryChart()
    initPriceChart()
    initSupplierChart()
  })
}

// 监听分类图表切换
watch(categoryViewType, () => {
  initCategoryChart()
})

// 窗口大小变化时重绘图表
function handleResize() {
  trendChart?.resize()
  categoryChart?.resize()
  priceChart?.resize()
  supplierChart?.resize()
  
  // 修复宽窄屏切换后可能的滚动位置残留导致底部被遮挡
  if (window.innerWidth > 1240) {
    const el = document.querySelector('.main-content')
    if (el && el.scrollTop !== 0) {
      el.scrollTop = 0
    }
  }
}

// 生命周期
let timer = null

onMounted(() => {
  updateCurrentTime()
  timer = setInterval(updateCurrentTime, 1000)
  initAllCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('resize', handleResize)
  trendChart?.dispose()
  categoryChart?.dispose()
  priceChart?.dispose()
  supplierChart?.dispose()
})
</script>

<style lang="scss" scoped>
.purchase-dashboard {
  padding: 0;
  background: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px; // 统一间距 16px，利用 parent gap 确保绝对一致
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
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
          color: #409eff;
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
    margin: 0;
    min-width: 0;
    overflow-x: auto;
    padding-bottom: 0; // 移除底部内边距，确保间距精准对齐
    flex-shrink: 0;
    
    /* 滚动条样式优化 */
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
        &.red { background: linear-gradient(135deg, #f56c6c, #f78989); }
        &.purple { background: linear-gradient(135deg, #9c27b0, #ba68c8); }
        &.cyan { background: linear-gradient(135deg, #00bcd4, #4dd0e1); }
        &.yellow { background: linear-gradient(135deg, #ff9800, #ffb74d); }
        &.success { background: linear-gradient(135deg, #19be6b, #47cb89); }
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
          
          .trend {
            display: flex;
            align-items: center;
            gap: 2px;
            
            &.up { color: #f56c6c; }
            &.down { color: #67c23a; }
          }
          
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
    margin: 0; 
    padding-bottom: 2px; // 留出极小间隙，防止容器 overflow:hidden 在亚像素渲染时切掉圆角边框
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
        
        &.large {
          height: 800px;
        }
      }
    }
  }
}

@media screen and (max-width: 1600px) {
  .purchase-dashboard {
    .kpi-cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media screen and (max-width: 1200px) {
  .purchase-dashboard {
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
  .purchase-dashboard {
    .kpi-cards {
      padding-bottom: 0;
      margin-bottom: 0; // 统一由父级 gap 控制
    }
    
    .dashboard-content {
      gap: 16px;
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
        gap: 16px;
      }
    }
  }
}

// 响应式高度调整 - 小屏幕 (较矮的笔记本屏幕)
@media screen and (max-height: 768px) {
  .purchase-dashboard {
    .dashboard-header {
      margin-bottom: 0;
      padding: 12px 16px;
    }
    
    .kpi-cards {
      gap: 10px;
      margin-bottom: 0;
      
      .kpi-card {
        padding: 12px;
      }
    }

    .dashboard-content {
      gap: 10px;
      margin-bottom: 0;
      
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
  .purchase-dashboard {
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

// 响应式宽度调整 - 处理堆叠布局
@media screen and (max-width: 1240px) {
  .purchase-dashboard {
    height: auto;
    overflow: visible;

    .dashboard-content {
      display: flex;
      flex-direction: column;
      flex: none;
      
      .content-left,
      .content-right {
        flex: none;
        width: 100%;
      }

      .chart-card.flex-card {
        flex: none;
        height: 260px;
      }
    }
  }
}
</style>
