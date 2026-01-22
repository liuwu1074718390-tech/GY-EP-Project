<template>
  <div class="material-price-query">
    <!-- 筛选区域（紧凑版） -->
    <section class="filter-section glass-card compact">
      <el-form :model="filterForm" class="filter-form" size="default">
        <div class="filter-row-primary">
          <!-- 核心筛选条件 -->
          <div class="filter-items">
            <el-input 
              v-model="filterForm.materialName" 
              placeholder="材料名称" 
              class="filter-input"
              prefix-icon="Search"
              clearable 
            />
            <el-input 
              v-model="filterForm.specification" 
              placeholder="规格型号" 
              class="filter-input"
              clearable 
            />
            <el-date-picker
              v-model="filterForm.purchaseTime"
              type="month"
              placeholder="采购月份"
              format="YYYY-MM"
              value-format="YYYY-MM"
              class="filter-date"
              clearable
            />
            <el-select 
              v-model="filterForm.sourceProject" 
              placeholder="来源项目" 
              class="filter-select"
              clearable
            >
              <el-option 
                v-for="item in uniqueValues.sourceProjects" 
                :key="item" 
                :label="item" 
                :value="item" 
              />
            </el-select>
          </div>

          <!-- 操作按钮组 -->
          <div class="action-group">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button 
              link 
              type="primary" 
              @click="showAdvanced = !showAdvanced"
              class="toggle-btn"
            >
              {{ showAdvanced ? '收起' : '高级' }}
              <el-icon class="el-icon--right"><component :is="showAdvanced ? 'ArrowUp' : 'ArrowDown'" /></el-icon>
            </el-button>
          </div>
        </div>

        <!-- 高级筛选（折叠） -->
        <el-collapse-transition>
          <div v-show="showAdvanced" class="filter-row-secondary">
            <el-select v-model="filterForm.brand" placeholder="品牌" clearable filterable class="filter-item-small">
              <el-option v-for="item in uniqueValues.brands" :key="item" :label="item" :value="item" />
            </el-select>
            <el-select v-model="filterForm.priceType" placeholder="价格类型" clearable class="filter-item-small">
              <el-option label="投标价" value="投标价" />
              <el-option label="中标价" value="中标价" />
            </el-select>
             <el-select v-model="filterForm.unit" placeholder="单位" clearable class="filter-item-small">
               <el-option v-for="item in uniqueValues.units" :key="item" :label="item" :value="item" />
             </el-select>
            <el-select v-model="filterForm.taxRate" placeholder="税率" clearable class="filter-item-small">
              <el-option label="6%" :value="6" />
              <el-option label="9%" :value="9" />
              <el-option label="13%" :value="13" />
            </el-select>
            <el-input v-model="filterForm.supplierCompany" placeholder="报价企业" clearable class="filter-item-medium" />
          </div>
        </el-collapse-transition>
      </el-form>
    </section>

    <!-- 数据表格 -->
    <section class="table-section glass-card">
      <el-table 
        :data="paginatedData" 
        stripe
        border
        style="width: 100%; font-size: 13px;"
        :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: '600', fontSize: '13px' }"
        :cell-style="{ padding: '6px 0' }"
        height="100%"
      >
        <el-table-column type="index" label="序号" width="60" fixed align="center" />
        <el-table-column prop="materialName" label="材料名称" width="160" fixed show-overflow-tooltip />
        
        <!-- 自定义规格型号列，确提示框位置准确 -->
        <el-table-column prop="specification" label="规格型号" min-width="260">
          <template #default="{ row }">
            <el-tooltip 
              effect="dark" 
              :content="row.specification" 
              placement="top-start"
              :show-after="500"
            >
              <div class="text-ellipsis">{{ row.specification }}</div>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column prop="unit" label="单位" width="70" align="center" />
        <el-table-column prop="brand" label="品牌" width="110" show-overflow-tooltip />
        <el-table-column prop="quantity" label="数量" width="90" align="right" />
        <el-table-column prop="priceExcludingTax" label="不含税价(元)" width="130" align="right">
          <template #default="{ row }">
            {{ row.priceExcludingTax.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="taxRate" label="税率" width="80" align="center">
          <template #default="{ row }">
            {{ row.taxRate }}%
          </template>
        </el-table-column>
        <el-table-column prop="priceIncludingTax" label="含税价(元)" width="130" align="right">
          <template #default="{ row }">
            {{ row.priceIncludingTax.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="sourceProject" label="来源项目" width="150" show-overflow-tooltip />
        <el-table-column prop="purchaseTime" label="采购时间" width="110" align="center" />
        <el-table-column prop="priceType" label="价格类型" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.priceType === '中标价' ? 'success' : 'warning'" size="small">
              {{ row.priceType }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="supplierCompany" label="报价企业" min-width="180" show-overflow-tooltip />
      </el-table>

      <!-- 分页器 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[20, 50, 100]"
          :total="filteredData.length"
          layout="total, sizes, prev, pager, next, jumper"
          background
          size="small"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Filter, Search, Refresh, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { materialPriceData, filterMaterialData, uniqueValues } from './mockMaterialData'

// 筛选表单
const filterForm = ref({
  materialName: '',
  specification: '',
  purchaseTime: '',
  sourceProject: '',
  brand: '',
  priceType: '',
  unit: '',
  taxRate: null,
  supplierCompany: ''
})

// 高级筛选展开状态
const showAdvanced = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(20)

// 筛选后的数据
const filteredData = ref([...materialPriceData])

// 分页后的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredData.value.slice(start, end)
})

// 查询
const handleQuery = () => {
  filteredData.value = filterMaterialData(filterForm.value)
  currentPage.value = 1 // 重置到第一页
}

// 重置
const handleReset = () => {
  filterForm.value = {
    materialName: '',
    specification: '',
    purchaseTime: '',
    sourceProject: '',
    brand: '',
    priceType: '',
    unit: '',
    taxRate: null,
    supplierCompany: ''
  }
  filteredData.value = [...materialPriceData]
  currentPage.value = 1
}
</script>

<style lang="scss" scoped>
$glass-bg: rgba(255, 255, 255, 0.75);
$glass-border: rgba(255, 255, 255, 0.5);
$primary-blue: #377cfd;
$text-main: #1d1d1f;

// 文本省略通用样式
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: help; // 提示用户可悬停
}

.material-price-query {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px; 
  height: 100vh;
  overflow: hidden;
  background: transparent;

  .glass-card {
    background: $glass-bg;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid $glass-border;
    border-radius: 16px; // 稍微减小圆角，更显紧凑
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
    padding: 16px 20px; // 减小内边距
  }

  .filter-section {
    flex-shrink: 0;
    margin: 0 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &.compact {
      .filter-form {
        // 设置表单内文字大小
        font-size: 13px;
        
        :deep(.el-input__inner) {
          font-size: 13px;
        }
        
        .filter-row-primary {
          display: flex;
          align-items: center;
          gap: 12px; // 减小间距
          flex-wrap: wrap;

          .filter-items {
            flex: 1;
            display: flex;
            gap: 10px;
            align-items: center;
            flex-wrap: wrap;

            .filter-input, .filter-select, .filter-date {
              width: 150px; // 稍微变窄
            }
          }

          .action-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-left: auto;
            
            .el-button {
              font-size: 13px;
              padding: 8px 16px;
              height: 32px;
            }

            .toggle-btn {
              font-size: 13px;
              margin-left: 4px;
            }
          }
        }

        .filter-row-secondary {
          display: flex;
          gap: 10px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px dashed rgba(0,0,0,0.06);
          flex-wrap: wrap;

          .filter-item-small {
            width: 120px;
          }
          
          .filter-item-medium {
             width: 180px;
          }
        }
      }
    }
  }

  .table-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    margin: 0 16px 16px 16px;

    :deep(.el-table) {
      border-radius: 12px;
      overflow: hidden;
      flex: 1;
      font-size: 13px; // 强制表格文字大小

      th {
        background: linear-gradient(to bottom, #f9fafb, #f5f7fa) !important;
        height: 40px; // 减小表头高度
        padding: 0;
        font-size: 13px;
        color: #303133;
      }
      
      td {
        padding: 6px 0; // 减小单元格内边距
        font-size: 13px;
      }

      .el-table__body tr:hover > td {
        background-color: #e6f0ff !important;
      }
    }

    .pagination-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(0,0,0,0.06);
      
      :deep(.el-pagination) {
        --el-pagination-font-size: 13px;
      }
    }
  }
}
</style>
