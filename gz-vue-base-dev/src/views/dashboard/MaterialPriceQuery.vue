<template>
  <div class="material-price-query-container">
    <!-- 左侧分类树 -->
    <aside class="category-sidebar-glass" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="header-content" v-if="!sidebarCollapsed">
          <el-icon class="title-icon"><FolderOpened /></el-icon>
          <h3>材料分类库</h3>
        </div>
        <div class="header-action">
          <el-tooltip :content="isExpandAll ? '收起全部' : '展开全部'" placement="top">
            <el-button 
              circle
              size="small"
              :icon="isExpandAll ? 'ArrowUp' : 'ArrowDown'" 
              @click="toggleExpandAll"
              class="expand-btn"
              v-if="!sidebarCollapsed"
            />
          </el-tooltip>
          <el-button 
            circle
            size="small"
            :icon="sidebarCollapsed ? 'Expand' : 'Fold'" 
            @click="toggleSidebar"
            class="toggle-btn"
          />
        </div>
      </div>
      
      <div v-if="!sidebarCollapsed" class="tree-container-custom">
        <!-- 分类搜索框 -->
        <div class="search-box">
          <el-input
            v-model="categorySearchText"
            placeholder="搜索分类..."
            clearable
            prefix-icon="Search"
            size="small"
            @input="handleCategorySearch"
          />
        </div>

        <div
          class="all-category-option"
          :class="{ active: selectedCategoryKey === ALL_CATEGORY_KEY }"
          @click="handleSelectAllCategory"
        >
          全部分类
        </div>

        <el-tree
          ref="categoryTreeRef"
          :data="filteredCategoryTree"
          :props="{ children: 'children', label: 'categoryName' }"
          :indent="12"
          node-key="id"
          highlight-current
          :expand-on-click-node="false"
          @node-click="handleCategorySelect"
          :default-expand-all="true"
          :filter-node-method="filterNode"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <span class="node-prefix">{{ formatDisplayCategoryCode(node, data) }}</span>
              <span v-overflow-title="node.label" class="node-label">{{ node.label }}</span>
            </div>
          </template>
        </el-tree>
      </div>
    </aside>

    <main class="main-content" :class="{ expanded: sidebarCollapsed }">
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
          </div>

          <!-- 操作按钮组 -->
          <div class="action-group">
            <el-button class="btn-query-shift" type="primary" @click="handleQuery(true)">查询</el-button>
            <el-button class="btn-reset-shift" @click="handleReset">重置</el-button>
            <div class="data-view-switch-pill">
              <button
                type="button"
                class="switch-item"
                :class="{ active: filterForm.dataViewMode === 'NON_STANDARD' }"
                @click="setDataViewMode('NON_STANDARD')"
              >
                非标准
              </button>
              <span class="switch-divider" />
              <button
                type="button"
                class="switch-item"
                :class="{ active: filterForm.dataViewMode === 'STANDARD' }"
                @click="setDataViewMode('STANDARD')"
              >
                标准
              </button>
            </div>
            <el-button 
              type="success" 
              icon="Plus" 
              @click="handleAdd"
            >
              新增材价
            </el-button>
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
            <el-date-picker
              v-model="filterForm.purchaseTime"
              type="month"
              placeholder="采购月份"
              format="YYYY-MM"
              value-format="YYYY-MM"
              class="filter-item-small"
              clearable
            />
            <el-select v-model="filterForm.categoryName" placeholder="材料分类" clearable filterable class="filter-item-medium">
              <el-option v-for="item in uniqueValues.categories" :key="item" :label="item" :value="item" />
            </el-select>
            <el-select v-model="filterForm.brand" placeholder="品牌" clearable filterable class="filter-item-small">
              <el-option v-for="item in brandOptions" :key="item" :label="item" :value="item" />
            </el-select>
            <el-select v-model="filterForm.priceType" placeholder="价格类型" clearable class="filter-item-small">
              <el-option label="投标价" value="投标价" />
              <el-option label="中标价" value="中标价" />
            </el-select>
             <el-select v-model="filterForm.unit" placeholder="单位" clearable class="filter-item-small">
               <el-option v-for="item in unitOptions" :key="item" :label="item" :value="item" />
             </el-select>
            <el-select v-model="filterForm.taxRate" placeholder="税率" clearable class="filter-item-small">
              <el-option label="6%" :value="6" />
              <el-option label="9%" :value="9" />
              <el-option label="13%" :value="13" />
            </el-select>
            <el-select 
              v-model="filterForm.sourceProject" 
              placeholder="来源项目" 
              class="filter-item-medium"
              clearable
            >
              <el-option 
                v-for="item in uniqueValues.sourceProjects" 
                :key="item" 
                :label="item" 
                :value="item" 
              />
            </el-select>
            <el-input v-model="filterForm.supplierCompany" placeholder="报价供应商" clearable class="filter-item-medium" />
          </div>
        </el-collapse-transition>
      </el-form>
    </section>

    <!-- 数据表格 -->
    <section class="table-section glass-card">
      <el-table 
        :data="filteredData" 
        stripe
        border
        style="width: 100%;"
        :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: '600', fontSize: '13px' }"
        :row-style="{ height: '70px' }"
        height="100%"
      >
        <!-- 列1: 材料基础信息 (40%) -->
        <el-table-column label="材料基础信息" width="315" fixed="left">
          <template #default="{ row }">
            <div class="material-info-cell">
              <div class="material-name link-text" @click="handleMaterialDetail(row)">{{ getDisplayMaterialName(row) }}</div>
              <el-tooltip effect="dark" :content="getDisplaySpecification(row)" placement="top-start" :show-after="300">
                <div class="material-spec">{{ getDisplaySpecification(row) }}</div>
              </el-tooltip>
              <div class="material-tags">
                <span class="tag-item tag-category">
                  <el-icon><PriceTag /></el-icon>{{ getDisplayCategoryName(row) }}
                </span>
                <span class="tag-item tag-brand" :title="getDisplayBrandName(row)">
                  <el-icon><Medal /></el-icon>{{ getDisplayBrandName(row) }}
                </span>
                <span class="tag-item tag-unit">
                  <el-icon><Box /></el-icon>{{ getDisplayUnitName(row) }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- 列2: 价格分析 (25%) -->
        <el-table-column label="价格分析" width="360">
          <template #default="{ row }">
            <div class="price-cell">
              <div class="price-row">
                <div class="price-main">
                  <span class="price-label">不含税：</span>
                  <span class="price-value">{{ formatPriceDisplay(getDisplayPriceExcludingTax(row)) }}</span>
                </div>
                <div v-if="isValidPriceRange(row.rangeExcl)" class="price-range-inline" @click="handleMaterialDetail(row)">
                  <el-tooltip :content="'当前价格较区间：' + getPriceStatusHelper(getDisplayPriceExcludingTax(row), row.rangeExcl).label" placement="top" :show-after="1000">
                    <div class="status-icon-wrapper" :class="getPriceStatusHelper(getDisplayPriceExcludingTax(row), row.rangeExcl).class">
                      <el-icon class="status-icon" :style="{ color: getPriceStatusHelper(getDisplayPriceExcludingTax(row), row.rangeExcl).color }">
                        <component :is="getPriceStatusHelper(getDisplayPriceExcludingTax(row), row.rangeExcl).icon" />
                      </el-icon>
                      <span class="range-value">¥{{ row.rangeExcl[0].toLocaleString() }} ~ ¥{{ row.rangeExcl[1].toLocaleString() }}</span>
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="price-row">
                <div class="price-main">
                  <span class="price-label">含税：</span>
                  <span class="price-value">{{ formatPriceDisplay(getDisplayPriceIncludingTax(row)) }}</span>
                </div>
                <div v-if="isValidPriceRange(row.rangeIncl)" class="price-range-inline" @click="handleMaterialDetail(row)">
                  <el-tooltip :content="'当前价格较区间：' + getPriceStatusHelper(getDisplayPriceIncludingTax(row), row.rangeIncl).label" placement="top" :show-after="1000">
                    <div class="status-icon-wrapper" :class="getPriceStatusHelper(getDisplayPriceIncludingTax(row), row.rangeIncl).class">
                      <el-icon class="status-icon" :style="{ color: getPriceStatusHelper(getDisplayPriceIncludingTax(row), row.rangeIncl).color }">
                        <component :is="getPriceStatusHelper(getDisplayPriceIncludingTax(row), row.rangeIncl).icon" />
                      </el-icon>
                      <span class="range-value">¥{{ row.rangeIncl[0].toLocaleString() }} ~ ¥{{ row.rangeIncl[1].toLocaleString() }}</span>
                    </div>
                  </el-tooltip>
                </div>
              </div>
              <div class="price-meta">
                <span>税率：{{ formatTaxRateDisplay(row.taxRate) }}</span>
                <span class="meta-separator">|</span>
                <span>数量：{{ formatQuantityDisplay(row.quantity) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- 列3: 来源信息 (20%) -->
        <el-table-column label="来源信息" width="240">
          <template #default="{ row }">
            <div class="source-cell">
              <div class="source-supplier">
                <el-icon class="source-icon"><OfficeBuilding /></el-icon>
                <span class="supplier-link" @click="handleSupplierClick(row)">{{ row.supplierCompany }}</span>
              </div>
              <el-tooltip effect="dark" :content="row.sourceProject" placement="top-start" :show-after="300">
                <div class="source-project">
                  <el-icon class="source-icon"><Document /></el-icon>
                  <span class="project-text">{{ row.sourceProject }}</span>
                </div>
              </el-tooltip>
              <div class="source-meta">
                <el-icon class="source-icon"><Calendar /></el-icon>
                <span>{{ row.purchaseTime }}</span>
                <span class="meta-separator">|</span>
                <el-tag :type="row.priceType === '中标价' ? 'success' : 'warning'" size="small">
                  {{ row.priceType }}
                </el-tag>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- 列4: 操作 (15%) -->
        <el-table-column label="操作" width="90" align="center" fixed="right">
          <template #default="{ row }">
            <div class="action-btns">
              <el-tooltip content="暂存" placement="top" :show-after="1000">
                <el-button link type="primary" @click="handleStash(row)">
                  <el-icon><Collection /></el-icon>
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical" />
              <el-button link type="primary" @click="handleEdit(row)">
                <el-icon><EditPen /></el-icon>
              </el-button>
              <el-divider direction="vertical" />
              <el-button link type="danger" @click="handleDelete(row)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[20, 50, 100]"
          :total="totalCount"
          layout="total, sizes, prev, pager, next, jumper"
          background
          size="small"
        />
      </div>
    </section>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="700px"
      :close-on-click-modal="false"
      class="custom-glass-dialog"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="110px"
        size="default"
        class="compact-form"
      >
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-header">
            <el-icon><InfoFilled /></el-icon>
            <span>基础信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="材料名称" prop="materialName">
                <el-input v-model="formData.materialName" placeholder="请输入材料名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="规格型号" prop="specification">
                <el-input v-model="formData.specification" placeholder="请输入规格型号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所属分类" prop="categoryName">
                <el-select v-model="formData.categoryName" placeholder="请选择分类" style="width: 100%" filterable clearable allow-create>
                   <el-option v-for="item in uniqueValues.categories" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位" prop="unit">
                <el-select v-model="formData.unit" placeholder="单位" style="width: 100%" filterable clearable allow-create>
                   <el-option v-for="item in unitOptions" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="品牌" prop="brand">
                <el-select v-model="formData.brand" placeholder="品牌" style="width: 100%" filterable clearable allow-create>
                  <el-option v-for="item in brandOptions" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="数量" prop="quantity">
                <el-input-number v-model="formData.quantity" :min="0" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        
        <!-- 价格详情 -->
        <div class="form-section">
          <div class="section-header">
            <el-icon><Money /></el-icon>
            <span>价格详情</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="不含税价" prop="priceExcludingTax">
                <el-input-number v-model="formData.priceExcludingTax" :min="0" :precision="2" style="width: 100%" />
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="税率(%)" prop="taxRate">
                 <el-input-number v-model="formData.taxRate" :precision="0" :min="0" :max="100" style="width: 100%" placeholder="请输入税率" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="含税价" prop="priceIncludingTax">
                <el-input-number v-model="formData.priceIncludingTax" :min="0" :precision="2" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="价格类型" prop="priceType">
                <el-select v-model="formData.priceType" placeholder="请选择价格类型" style="width: 100%" clearable>
                  <el-option label="投标价" value="投标价" />
                  <el-option label="中标价" value="中标价" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
           <el-row :gutter="20">
            <el-col :span="12">
               <el-form-item label="采购时间" prop="purchaseTime">
                <el-date-picker
                  v-model="formData.purchaseTime"
                  type="month"
                  placeholder="选择年月"
                  format="YYYY-MM"
                  value-format="YYYY-MM"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="来源项目" prop="sourceProject">
                <el-select v-model="formData.sourceProject" placeholder="请选择或输入" style="width: 100%" filterable clearable allow-create>
                   <el-option v-for="item in uniqueValues.sourceProjects" :key="item" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 供应商信息 -->
        <div class="form-section">
          <div class="section-header">
            <el-icon><OfficeBuilding /></el-icon>
            <span>供应商信息</span>
          </div>
          <el-form-item label="报价供应商" prop="supplierCompany">
              <el-select 
                v-model="formData.supplierCompany" 
                placeholder="请选择或输入供应商" 
                style="width: 100%" 
                filterable 
                clearable 
                allow-create
              >
                <el-option 
                  v-for="item in supplierOptions" 
                  :key="item" 
                  :label="item" 
                  :value="item" 
                />
              </el-select>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="btn-cancel" @click="dialogVisible = false">取消</el-button>
          <el-button class="btn-submit" type="primary" @click="handleSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 暂存列表弹窗 -->
    <el-dialog
      v-model="stashListVisible"
      title="暂存材价列表"
      width="1000px"
      class="custom-glass-dialog"
    >
      <div class="stash-list-header">
        <el-button type="success" @click="exportStash">
          <el-icon style="margin-right: 4px;"><Download /></el-icon>
          导出 Excel
        </el-button>
      </div>
      <el-table 
        :data="stashStore.list" 
        stripe 
        border 
        style="width: 100%; margin-top: 16px;"
        max-height="500px"
      >
        <el-table-column type="index" label="序号" width="60" align="center" fixed />
        <el-table-column prop="materialName" label="材料名称" width="150" show-overflow-tooltip fixed />
        <el-table-column prop="specification" label="规格型号" min-width="200" show-overflow-tooltip />
        <el-table-column prop="categoryName" label="分类" width="120" />
        <el-table-column prop="unit" label="单位" width="70" align="center" />
        <el-table-column prop="brand" label="品牌" width="100" />
        <el-table-column prop="priceExcludingTax" label="不含税价" width="100" align="right">
          <template #default="{ row }">{{ formatPriceDisplay(row.priceExcludingTax) }}</template>
        </el-table-column>
        <el-table-column prop="taxRate" label="税率" width="70" align="center">
          <template #default="{ row }">{{ formatTaxRateDisplay(row.taxRate) }}</template>
        </el-table-column>
        <el-table-column prop="supplierCompany" label="供应商" min-width="150" show-overflow-tooltip />
        <el-table-column label="操作" width="80" align="center" fixed="right">
          <template #default="{ $index }">
            <el-button link type="danger" @click="stashStore.remove($index)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 悬浮球 -->
    <StashFloatBall @open-list="stashListVisible = true" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Filter, Search, Refresh, ArrowUp, ArrowDown, EditPen, Delete, Plus, InfoFilled, Money, OfficeBuilding, Collection, Download, FolderOpened, Expand, Fold, TrendCharts, Document, Calendar, CaretTop, CaretBottom, Minus, PriceTag, Medal, Box } from '@element-plus/icons-vue'
import { uniqueValues } from './mockMaterialData'
import { materialDataStore } from '@/store/materialDataStore'
import { pageSupplierList } from '@/api/supplier'
import { getCategoryTree } from '@/api/material'
import { pageMaterialPrice, updateMaterialPrice, deleteMaterialPrice } from '@/api/materialPrice'
import { ElMessage, ElMessageBox } from 'element-plus'
import * as XLSX from 'xlsx'
import { stashStore } from '@/store/stashStore'
import StashFloatBall from '@/components/GzComponents/StashFloatBall/index.vue'
import { createEmptyMaterialPriceForm, materialPriceFormRules } from './materialPriceSchema'

const router = useRouter()

// 动态选项 (Local state for dynamic options)
const unitOptions = ref([...uniqueValues.units])
const brandOptions = ref([...uniqueValues.brands])
const supplierOptions = ref([])

// 加载供应商列表
const loadSuppliers = async () => {
  const res = await pageSupplierList({ pageNum: 1, pageSize: 1000 })
  const names = (res.records || []).map(s => s.supplierName)
  // 合并 mockMaterialData 中的供应商和供应商模块中的供应商
  supplierOptions.value = [...new Set([...uniqueValues.suppliers, ...names])]
}

/**
 * 获取价格状态辅助函数
 * @param price 当前价
 * @param range 区间 [min, max]
 */
const getPriceStatusHelper = (price, range) => {
  const currentPrice = Number(price)
  if (!Number.isFinite(currentPrice)) {
    return { icon: Minus, color: '#409eff', label: '持平', class: 'status-steady' }
  }

  if (!range || range.length < 2) {
    return { icon: Minus, color: '#409eff', label: '持平', class: 'status-steady' }
  }
  const min = Number(range[0])
  const max = Number(range[1])

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { icon: Minus, color: '#409eff', label: '持平', class: 'status-steady' }
  }

  if (max === min) {
    if (currentPrice > max) {
      return { icon: CaretTop, color: '#f56c6c', label: '偏高', class: 'status-high' }
    } else if (currentPrice < min) {
      return { icon: CaretBottom, color: '#67c23a', label: '偏低', class: 'status-low' }
    }
    return { icon: Minus, color: '#409eff', label: '持平', class: 'status-steady' }
  }

  const percent = (currentPrice - min) / (max - min)
  
  if (percent > 0.66) {
    return { icon: CaretTop, color: '#f56c6c', label: '偏高', class: 'status-high' }
  } else if (percent < 0.33) {
    return { icon: CaretBottom, color: '#67c23a', label: '偏低', class: 'status-low' }
  } else {
    return { icon: Minus, color: '#409eff', label: '持平', class: 'status-steady' }
  }
}

const isEmptyOrZeroValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return true
  }
  const numericValue = Number(value)
  return Number.isNaN(numericValue) || numericValue === 0
}

const isValidPriceRange = (range) => {
  if (!Array.isArray(range) || range.length < 2) {
    return false
  }
  const min = Number(range[0])
  const max = Number(range[1])
  if (Number.isNaN(min) || Number.isNaN(max)) {
    return false
  }
  // 区间两端都需要是有效正数，避免展示“¥0 ~ ¥0”等无效内容
  return min > 0 && max > 0 && max >= min
}

const formatPriceDisplay = (value) => {
  if (isEmptyOrZeroValue(value)) {
    return '-'
  }
  return `¥${Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatTaxRateDisplay = (value) => {
  if (isEmptyOrZeroValue(value)) {
    return '-'
  }
  return `${Number(value)}%`
}

const formatQuantityDisplay = (value) => {
  if (isEmptyOrZeroValue(value)) {
    return '-'
  }
  return `${value}`
}

onMounted(() => {
  loadSuppliers()
  loadCategoryTree()
  handleQuery(true)
})

// --- 侧边栏逻辑 ---
const sidebarCollapsed = ref(false)
const categoryTreeRef = ref()
const categoryTree = ref([])
const filteredCategoryTree = ref([])
const categorySearchText = ref('')
const isExpandAll = ref(true)
const ALL_CATEGORY_KEY = 'ALL'
const selectedCategoryKey = ref(ALL_CATEGORY_KEY)

// 加载分类树
const loadCategoryTree = async () => {
  const res = await getCategoryTree()
  categoryTree.value = res.data || res || []
  filteredCategoryTree.value = categoryTree.value
  handleSelectAllCategory(false)
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleExpandAll = () => {
  isExpandAll.value = !isExpandAll.value
  const nodes = categoryTreeRef.value.store._getAllNodes()
  nodes.forEach(node => {
     node.expanded = isExpandAll.value
  })
}

// 分类搜索
const handleCategorySearch = (value) => {
  categoryTreeRef.value.filter(value)
}

const filterNode = (value, data) => {
  if (!value) return true
  return data.categoryName.includes(value)
}

const formatDisplayCategoryCode = (node, data) => {
  if (!node || !data) return ''

  const codeParts = []
  let current = node
  while (current && current.level > 0 && current.data) {
    const rawCode = String(current.data.categoryCode ?? '').trim()
    if (rawCode) {
      codeParts.unshift(rawCode.slice(-2).padStart(2, '0'))
    }
    current = current.parent
  }

  if (!codeParts.length) {
    return String(data.categoryCode ?? '')
  }

  const mergedCode = codeParts.join('')
  return mergedCode.startsWith('26') ? mergedCode : `26${mergedCode}`
}

const setOverflowTitle = (el, text) => {
  const value = text == null ? '' : String(text)
  if (el.scrollWidth > el.clientWidth) {
    el.setAttribute('title', value)
  } else {
    el.removeAttribute('title')
  }
}

const vOverflowTitle = {
  mounted(el, binding) {
    const handler = () => setOverflowTitle(el, binding.value)
    el.__overflowTitleHandler__ = handler
    el.addEventListener('mouseenter', handler)
    window.addEventListener('resize', handler)
    requestAnimationFrame(handler)
  },
  updated(el, binding) {
    setOverflowTitle(el, binding.value)
  },
  unmounted(el) {
    const handler = el.__overflowTitleHandler__
    if (!handler) return
    el.removeEventListener('mouseenter', handler)
    window.removeEventListener('resize', handler)
    delete el.__overflowTitleHandler__
  }
}

// 分类点击联动
const handleCategorySelect = (data) => {
  selectedCategoryKey.value = data.id
  // 递归获取当前节点及其所有子节点的名称
  const getAllCategoryNames = (node, names = []) => {
    if (node.categoryName) {
      names.push(node.categoryName)
    }
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => getAllCategoryNames(child, names))
    }
    return names
  }

  const allNames = getAllCategoryNames(data)
  // 服务端模式使用单值过滤，本地回退模式继续支持数组
  if (useServerData.value) {
    filterForm.value.categoryName = data.categoryName
  } else {
    filterForm.value.categoryName = allNames.length > 1 ? allNames : data.categoryName
  }
  handleQuery(true)
}

const handleSelectAllCategory = (withQuery = true) => {
  selectedCategoryKey.value = ALL_CATEGORY_KEY
  filterForm.value.categoryName = ''
  nextTick(() => {
    categoryTreeRef.value?.setCurrentKey(null)
  })
  if (withQuery) {
    handleQuery(true)
  }
}

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
  supplierCompany: '',
  categoryName: '',
  dataViewMode: 'NON_STANDARD'
})

// 高级筛选展开状态
const showAdvanced = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(20)
const totalCount = ref(0)
const useServerData = ref(true)

// 当前页数据
const filteredData = ref([])
const isStandardMode = computed(() => filterForm.value.dataViewMode === 'STANDARD')

const getDisplayMaterialName = (row) => {
  if (!isStandardMode.value) return row.materialName || '-'
  return row.standardStdName || '-'
}

const getDisplaySpecification = (row) => {
  if (!isStandardMode.value) return row.specification || '-'
  return row.standardSpecSummary || '-'
}

const getDisplayUnitName = (row) => {
  if (!isStandardMode.value) return row.unit || '-'
  return row.standardUnitName || '-'
}

const getDisplayCategoryName = (row) => {
  if (!isStandardMode.value) return row.categoryName || '-'
  return row.standardCategoryLevel3Name || '-'
}

const getDisplayBrandName = (row) => row.brand || '-'

const getDisplayPriceExcludingTax = (row) => {
  if (!isStandardMode.value) return row.priceExcludingTax
  return row.normalizedPriceExcludingTax ?? row.priceExcludingTax
}

const getDisplayPriceIncludingTax = (row) => {
  if (!isStandardMode.value) return row.priceIncludingTax
  return row.normalizedPriceIncludingTax ?? row.priceIncludingTax
}

// 查询
const handleQuery = async (resetPage = false) => {
  if (resetPage) {
    currentPage.value = 1
  }
  if (useServerData.value) {
    try {
      const res = await pageMaterialPrice({
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        ...filterForm.value
      })
      filteredData.value = res.records || []
      totalCount.value = Number(res.total || 0)
      return
    } catch (error) {
      useServerData.value = false
      ElMessage.warning('材价服务暂不可用，已切换本地演示数据')
    }
  }

  const local = materialDataStore.filter(filterForm.value)
  totalCount.value = local.length
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  filteredData.value = local.slice(start, end)
}

const handleDataViewModeChange = () => {
  // 避免此前服务端短暂异常后一直停留在本地回退数据
  useServerData.value = true
  handleQuery(true)
}

const setDataViewMode = (mode) => {
  if (filterForm.value.dataViewMode === mode) return
  filterForm.value.dataViewMode = mode
  handleDataViewModeChange()
}

// 重置
const handleReset = async () => {
  const currentDataViewMode = filterForm.value.dataViewMode || 'NON_STANDARD'
  filterForm.value = {
    materialName: '',
    specification: '',
    brand: '',
    purchaseTime: '',
    sourceProject: '',
    priceType: '',
    unit: '',
    taxRate: null,
    supplierCompany: '',
    categoryName: '',
    dataViewMode: currentDataViewMode
  }
  handleSelectAllCategory(false)
  await handleQuery(true)
}

// 跳转到供应商详情
const handleSupplierClick = (row) => {
  // 由于模拟数据中没有 supplierId，这里暂时使用固定 ID 或根据名称生成的哈希 ID
  // 在实际业务中应从 row.supplierId 获取
  const dummyId = 1 
  const { href } = router.resolve({
    name: 'SupplierDetail',
    params: { id: dummyId },
    query: { name: row.supplierCompany }
  })
  window.open(href, '_blank')
}

// 跳转到材价详情
const handleMaterialDetail = (row) => {
  // 新窗口打开带侧边栏的详情页面
  const { href } = router.resolve({
    path: '/workbench',
    query: { 
        tab: '材价详情',
        id: row.id,
        name: row.materialName,
        spec: row.specification,
        standardCode: row.standardCode,
        dataViewMode: filterForm.value.dataViewMode || 'NON_STANDARD'
    }
  })
  window.open(href, '_blank')
}

// --- 新增/编辑逻辑 ---

const dialogVisible = ref(false)
const dialogTitle = ref('新增材价')
const formRef = ref(null)
// 记录正在编辑的行，用于更新数据
const editingRow = ref(null)

const formData = reactive({
  id: null,
  ...createEmptyMaterialPriceForm()
})

const formRules = materialPriceFormRules

// 自动计算逻辑：
// 若修改了不含税价或税率，自动计算含税价：含税价 = 不含税价 * (1 + 税率/100)
watch(() => [formData.priceExcludingTax, formData.taxRate], ([p, t]) => {
  if (p !== undefined && t !== undefined) {
    // 简单演示：修改不含税或税率 -> 更新含税
    // 实际项目中应注意避免循环更新
    // formData.priceIncludingTax = parseFloat((p * (1 + t / 100)).toFixed(2))
  }
})

const handleAdd = () => {
  router.push({ path: '/workbench', query: { tab: '新增材价' } })
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑材价'
  dialogVisible.value = true
  editingRow.value = row // 保存引用
  Object.assign(formData, row)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确定要删除该条材价记录吗？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      if (useServerData.value) {
        return deleteMaterialPrice(row.id).then(() => {
          handleQuery()
          ElMessage({ type: 'success', message: '删除成功' })
        })
      }
      materialDataStore.remove(row)
      handleQuery()
      ElMessage({ type: 'success', message: '删除成功' })
    })
    .catch(() => {
    })
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      // 检查并保存新的单位/品牌/供应商
      if (formData.unit && !unitOptions.value.includes(formData.unit)) {
        unitOptions.value.push(formData.unit)
      }
      if (formData.brand && !brandOptions.value.includes(formData.brand)) {
        brandOptions.value.push(formData.brand)
      }
      if (formData.supplierCompany && !supplierOptions.value.includes(formData.supplierCompany)) {
        supplierOptions.value.push(formData.supplierCompany)
      }

      if (useServerData.value) {
        if (!editingRow.value) {
          ElMessage.warning('请使用“新增材价”页面进行新增')
          return
        }
        updateMaterialPrice({ ...formData, id: editingRow.value.id }).then(() => {
          ElMessage.success('更新成功')
          handleQuery()
          dialogVisible.value = false
        })
        return
      }

      if (!editingRow.value) {
        materialDataStore.add({ ...formData })
        ElMessage.success('新增成功')
      } else {
        materialDataStore.update({ ...formData })
        ElMessage.success('更新成功')
      }
      handleQuery()
      dialogVisible.value = false
    }
  })
}

// 暂存列表弹窗控制
const stashListVisible = ref(false)

// 处理暂存
const handleStash = (row) => {
  const success = stashStore.add(row)
  if (success) {
    ElMessage.success({
      message: `已暂存: ${row.materialName}`,
      duration: 1500
    })
  } else {
    ElMessage.warning('该材价已在暂存列表中')
  }
}

// 导出暂存列表
const exportStash = () => {
  if (stashStore.list.length === 0) {
    ElMessage.warning('暂存列表为空，无法导出')
    return
  }

  const data = stashStore.list.map((item, index) => ({
    '序号': index + 1,
    '材料名称': item.materialName,
    '规格型号': item.specification,
    '所属分类': item.categoryName,
    '单位': item.unit,
    '品牌': item.brand,
    '数量': item.quantity,
    '不含税价(元)': item.priceExcludingTax,
    '税率(%)': item.taxRate,
    '含税价(元)': item.priceIncludingTax,
    '来源项目': item.sourceProject,
    '采购时间': item.purchaseTime,
    '价格类型': item.priceType,
    '报价供应商': item.supplierCompany
  }))

  const worksheet = XLSX.utils.json_to_sheet(data)
  
  // 设置列宽
  worksheet['!cols'] = [
    { wch: 6 }, // 序号
    { wch: 25 }, // 材料名称
    { wch: 40 }, // 规格型号
    { wch: 15 }, // 分类
    { wch: 8 },  // 单位
    { wch: 12 }, // 品牌
    { wch: 8 },  // 数量
    { wch: 15 }, // 不含税价
    { wch: 8 },  // 税率
    { wch: 15 }, // 含税价
    { wch: 30 }, // 来源项目
    { wch: 12 }, // 采购时间
    { wch: 12 }, // 价格类型
    { wch: 35 }  // 报价供应商
  ]
  
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '暂存材价')
  
  // 生成文件名：暂存材价_20240204.xlsx
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '')
  XLSX.writeFile(workbook, `暂存材价_${date}.xlsx`)
  
  ElMessage.success('导出成功')
}

watch([currentPage, pageSize], () => {
  handleQuery()
})
</script>

<style lang="scss" scoped>
$sidebar-width: 248px;
$sidebar-collapsed-width: 64px;
$primary-blue: #377cfd;
$bg-glass: rgba(255, 255, 255, 0.75);
$border-glass: rgba(255, 255, 255, 0.5);
$glass-bg: rgba(255, 255, 255, 0.75);
$glass-border: rgba(255, 255, 255, 0.5);
$text-main: #1d1d1f;

.material-price-query-container {
  display: flex;
  gap: 12px;
  height: 100%;
  width: 100%;
  padding: 0;
  overflow: hidden;
  flex: 1;
  min-height: 0;
}

// 玻璃拟态卡片通用
.glass-panel {
  background: $bg-glass;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $border-glass;
  border-radius: 8px;
}

// 左侧分类树
.category-sidebar-glass {
  @extend .glass-panel;
  width: $sidebar-width;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &.collapsed {
    width: $sidebar-collapsed-width;

    .sidebar-header {
      padding: 16px 0;
      justify-content: center;

      .header-content { display: none; }
    }
  }

  .sidebar-header {
    padding: 12px 4px 12px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
    min-width: 0;
    width: calc(100% + 14px);
    margin-left: -7px;

    .header-content {
      display: flex;
      align-items: center;
      gap: 3px;
      flex: 1;
      min-width: 0;

      .title-icon { color: $primary-blue; font-size: 16px; flex-shrink: 0; }
      h3 {
        margin: 0;
        font-size: 13px;
        font-weight: 700;
        color: #1d1d1f;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .header-action {
      display: flex;
      gap: 1px;
      flex-shrink: 0;
      margin-left: 2px;
      align-items: center;
    }

    .edit-btn, .expand-btn, .toggle-btn {
      color: #86868b;
      background: rgba(0, 0, 0, 0.03);
      border: none;
      width: 24px !important;
      height: 24px !important;
      padding: 0;
    }
  }

  .tree-container-custom {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
    width: calc(100% + 14px);
    margin-left: -7px;

    &::-webkit-scrollbar { width: 0; }

    :deep(.el-tree) {
      background: transparent;
      .el-tree-node__content {
        height: 34px;
        border-radius: 8px;
        margin-bottom: 4px;
        padding-right: 4px;
      }
    }

    .custom-tree-node {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      width: 100%;
      min-width: 0;

      .node-prefix {
        font-family: 'Monaco', monospace;
        font-size: 11px;
        font-weight: 600;
        color: #8e8e93;
        width: auto;
        text-align: left;
        flex-shrink: 0;
      }

      .node-label {
        color: #1d1d1f;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .search-box {
      margin-bottom: 12px;
      padding: 0;
    }

    .all-category-option {
      height: 34px;
      line-height: 34px;
      margin-bottom: 8px;
      padding: 0 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #606266;
      cursor: pointer;
      user-select: none;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(55, 124, 253, 0.08);
        color: #377cfd;
      }

      &.active {
        background: rgba(55, 124, 253, 0.12);
        color: #377cfd;
        font-weight: 600;
      }
    }
  }
}

// 右侧主内容区
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  min-height: 0;
  height: 100%;
  transition: all 0.3s ease;
  overflow: hidden; // Ensure inner scrolling
}


// 文本省略通用样式
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  white-space: nowrap;
  cursor: help; // 提示用户可悬停
}

.supplier-link {
  color: $primary-blue;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
}

.material-price-query {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px; 
  flex: 1;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: transparent;

  .glass-card {
    background: $glass-bg;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid $glass-border;
    border-radius: 8px; // 与驾驶舱容器圆角统一
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
    padding: 16px 20px; // 减小内边距
  }

  .filter-section {
    flex-shrink: 0;
    margin: 0 0 0 0;
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
            
            .el-button {
              font-size: 13px;
              padding: 8px 16px;
              height: 32px;
            }

            :deep(.btn-reset-shift) {
              transform: translateX(-10px);
            }

            :deep(.btn-query-shift) {
              transform: translateX(-5px);
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
    margin: 0 0 0 0;

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
        padding: 8px 6px; // 进一步减少内边距
        font-size: 13px;
        vertical-align: middle;
      }

      .el-table__body tr:hover > td {
        background-color: #e6f0ff !important;
      }
      
      // 确保行高足够
      .el-table__row {
        height: 70px; // 减少行高压缩纵向空间
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
  
  // ========== 多行单元格样式 ==========
  
  // 列1: 材料基础信息
  .material-info-cell {
    display: flex;
    flex-direction: column;
    gap: 2px; // 压缩间距
    padding: 2px 0;
    
    .material-name {
      font-size: 14px; // 按要求改为14px
      font-weight: 600;
      color: #303133;
      line-height: 1.3;
      
      &.link-text {
        color: $primary-blue;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
          opacity: 0.8;
        }
      }
    }
    
    .material-spec {
      font-size: 13px; // 统一为13px
      color: #909399;
      line-height: 1.4; // 压缩行高
      // 移除行数限制，允许换行
      word-break: break-word;
    }
    
    .material-tags {
      display: flex;
      align-items: center;
      gap: 4px; // 压缩间距
      font-size: 13px; // 统一为13px
      color: #606266;
      margin-top: 1px;
      
      .tag-item {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 1px 6px;
        border-radius: 4px;
        font-size: 11px;
        white-space: nowrap;
        border: 1px solid transparent;
        line-height: 1.4;
        
        .el-icon {
          font-size: 12px;
        }

        &.tag-category {
          background: rgba(55, 124, 253, 0.08);
          color: #377cfd;
          border-color: rgba(55, 124, 253, 0.15);
        }

        &.tag-brand {
          background: rgba(230, 162, 60, 0.08);
          color: #e6a23c;
          border-color: rgba(230, 162, 60, 0.15);
        }

        &.tag-unit {
          background: rgba(103, 194, 58, 0.08);
          color: #67c23a;
          border-color: rgba(103, 194, 58, 0.15);
        }

      }
    }
  }
  
  // 列2: 价格分析
  .price-cell {
    display: flex;
    flex-direction: column;
    gap: 2px; // 压缩间距
    padding: 2px 0;
    
    .price-row {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .price-main {
        display: flex;
        align-items: center;
        gap: 4px;
        
        .price-label {
          font-size: 13px; // 统一为13px
          color: #606266;
          white-space: nowrap;
        }
        
        .price-value {
          font-size: 13px; // 统一为13px，不加粗
          font-weight: normal; // 不加粗
          color: #303133; // 普通颜色，不用蓝色
          white-space: nowrap;
        }
        
        .price-tag {
          margin-left: 2px;
        }
      }
      
      .price-range-inline {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 13px; // 统一为13px
        color: $primary-blue; // 设为蓝色
        cursor: pointer; // 增加手型光标
        white-space: nowrap;
        
        .range-icon {
          font-size: 14px;
        }
        
        .range-value {
          font-size: 13px;
          font-weight: 500;
        }

        &:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
      }
    }
    
    .price-meta {
      display: flex;
      align-items: center;
      gap: 6px; // 压缩间距
      font-size: 13px; // 统一为13px
      color: #909399;
      margin-top: 1px;
      
      .meta-separator {
        color: #dcdfe6;
      }
    }
  }
  
  // 列3: 来源信息
  .source-cell {
    display: flex;
    flex-direction: column;
    gap: 2px; // 压缩间距
    padding: 2px 0;
    
    .source-supplier {
      display: flex;
      align-items: center;
      gap: 4px; // 压缩间距
      
      .source-icon {
        font-size: 13px;
        color: #909399;
        flex-shrink: 0;
      }
      
      .supplier-link {
        font-size: 13px; // 统一为13px
        font-weight: 500;
      }
    }
    
    .source-project {
      display: flex;
      align-items: center;
      gap: 4px; // 压缩间距
      
      .source-icon {
        font-size: 13px;
        color: #909399;
        flex-shrink: 0;
      }
      
      .project-text {
        font-size: 13px; // 统一为13px
        color: #606266;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    
    .source-meta {
      display: flex;
      align-items: center;
      gap: 4px; // 压缩间距
      font-size: 13px; // 统一为13px
      color: #909399;
      
      .source-icon {
        font-size: 13px;
        flex-shrink: 0;
      }
      
      .meta-separator {
        color: #dcdfe6;
      }
    }
  }
  
  // 列4: 操作按钮
  .action-btns {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0; // 移除间距使图标靠近
    height: 100%;
    
    .el-divider--vertical {
      margin: 0 2px; // 减少分隔符边距
    }
  }
}

// 弹窗样式优化 (Hide outer scrollbar and use internal body scrolling)
:deep(.el-overlay) {
  overflow: hidden !important;
}

:deep(.custom-glass-dialog) {
  display: flex !important;
  flex-direction: column;
  margin-top: 8vh !important;
  margin-bottom: 8vh !important;
  max-height: 84vh;
  
  background: #ffffff; // 纯白背景
  border-radius: 8px;   // 标准圆角
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .el-dialog__header {
    margin: 0;
    padding: 12px 16px; // 压缩页眉高度
    border-bottom: 1px solid #f0f0f0;
    .el-dialog__title {
      font-weight: 600;
      font-size: 15px; // 标题保持略大
      color: #1d1d1f;
    }
    .el-dialog__headerbtn {
      top: 14px; 
      right: 16px;
      font-size: 18px; // 增大图标容器
      
      .el-dialog__close {
        color: #909399;
        font-weight: 700;
        transition: all 0.2s;
        
        &:hover {
          color: #f56c6c;
          transform: rotate(90deg);
        }
      }
    }
  }

  .el-dialog__body {
    padding: 16px; 
    overflow-y: auto; // 恢复纵向滚动
    flex: 1;
    font-size: 13px; 
    
    /* 自定义滚动条 */
    &::-webkit-scrollbar { width: 5px; }
    &::-webkit-scrollbar-thumb { background: #e8e8e8; border-radius: 10px; }
  }

  .el-dialog__footer {
    padding: 10px 16px 16px; // 压缩页脚高度
    border-top: 1px solid #f0f0f0;
    background: #ffffff;
    font-size: 13px; // 统一 footer 字体
  }
}

.form-section {
  margin-bottom: 24px;
  
  &:last-child { margin-bottom: 0; }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    padding-left: 0;
    position: relative;
    
    // 蓝色竖线条装饰
    &::before {
      content: '';
      width: 4px;
      height: 16px;
      background: $primary-blue;
      border-radius: 2px;
    }
    
    .el-icon { 
      display: none; // 隐藏原有图标以符合截图风格
    }
    
    span {
      font-size: 13px; // 模块标题也统一为 13px
      font-weight: 700;
      color: #1d1d1f;
    }
  }
}

.compact-form {
  :deep(.el-form-item) {
    margin-bottom: 18px;
    .el-form-item__label {
      font-weight: 500;
      color: #606266;
      font-size: 13px;
    }
    .el-input__inner, .el-textarea__inner {
      border-radius: 4px;
      background-color: #ffffff;
      border-color: #dcdfe6;
      &:focus {
        border-color: $primary-blue;
      }
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  
  .btn-cancel {
    border-radius: 4px;
    padding: 8px 20px;
    border: 1px solid #dcdfe6;
    background: #ffffff;
    color: #606266;
    height: 32px;
    &:hover { background: #f5f7fa; color: #1d1d1f; border-color: #c0c4cc; }
  }

  .btn-submit {
    border-radius: 4px;
    padding: 8px 24px;
    background: $primary-blue;
    border: none;
    font-weight: 500;
    color: #ffffff;
    height: 32px;
    box-shadow: none;
    &:hover {
      background: #5c96ff;
      transform: none;
    }
  }
}

.stash-list-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0;
  
  .el-button--success {
    background-color: #00b42a;
    border-color: #00b42a;
    border-radius: 4px;
    height: 32px;
    padding: 8px 16px;
    
    &:hover {
      background-color: #23c343;
      border-color: #23c343;
    }
  }
}

// 弹窗内表格样式定制
:deep(.el-dialog) {
  .el-table {
    border-radius: 4px;
    font-size: 13px; // 统一表格字体
    
    th {
      background-color: #f7f8fa !important;
      color: #1d1d1f;
      font-weight: 600;
      height: 38px; // 进一步压缩表头高度
      font-size: 13px;
    }
    
    td {
      padding: 4px 0; // 压缩行高
      font-size: 13px;
    }
  }
}
</style>
