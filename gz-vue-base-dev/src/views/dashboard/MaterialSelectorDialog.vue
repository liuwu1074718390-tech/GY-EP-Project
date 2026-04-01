<template>
  <el-dialog
    v-model="visible"
    title="选择材价"
    width="1200px"
    :close-on-click-modal="false"
    class="custom-glass-dialog material-selector-dialog"
    @close="handleClose"
  >
    <!-- 筛选区域 -->
    <div class="filter-section">
      <el-form :model="filterForm" inline size="default">
        <el-form-item>
          <el-input 
            v-model="filterForm.materialName" 
            placeholder="请输入材料名称"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item>
          <el-input 
            v-model="filterForm.specification" 
            placeholder="请输入规格型号"
            clearable
            style="width: 180px"
          />
        </el-form-item>
        <el-form-item>
          <el-input 
            v-model="filterForm.brand" 
            placeholder="请输入品牌"
            clearable
            style="width: 150px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 材价列表 -->
    <el-table 
      :data="paginatedData" 
      stripe
      border
      highlight-current-row
      @row-click="handleRowClick"
      @row-dblclick="handleRowDoubleClick"
      style="width: 100%"
      :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: '600' }"
      height="450px"
    >
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column prop="materialName" label="材料名称" min-width="130" show-overflow-tooltip />
      <el-table-column prop="specification" label="规格型号" min-width="160" show-overflow-tooltip />
      <el-table-column prop="brand" label="品牌" width="100" show-overflow-tooltip />
      <el-table-column prop="unit" label="单位" width="70" align="center" />
      <el-table-column prop="priceIncludingTax" label="含税单价" width="110" align="right" sortable>
        <template #default="{ row }">
          ¥{{ formatPrice(row.priceIncludingTax) }}
        </template>
      </el-table-column>
      <el-table-column prop="taxRate" label="税率" width="70" align="center">
        <template #default="{ row }">{{ row.taxRate }}%</template>
      </el-table-column>
      <el-table-column prop="purchaseTime" label="采购时间" width="90" align="center" />
      <el-table-column prop="supplierCompany" label="报价供应商" min-width="140" show-overflow-tooltip />
      <el-table-column prop="sourceProject" label="来源项目" min-width="130" show-overflow-tooltip />
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleSelect(row)">
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        :total="filteredData.length"
        layout="total, sizes, prev, pager, next"
        background
        size="small"
      />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { materialDataStore } from '@/store/materialDataStore'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// 筛选表单
const filterForm = ref({
  materialName: '',
  specification: '',
  brand: ''
})

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

// 筛选后的数据
const filteredData = ref([...materialDataStore.allMaterials])

// 分页后的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredData.value.slice(start, end)
})

// 查询
const handleSearch = () => {
  filteredData.value = materialDataStore.filter(filterForm.value)
  currentPage.value = 1
}

// 重置
const handleReset = () => {
  filterForm.value = {
    materialName: '',
    specification: '',
    brand: ''
  }
  filteredData.value = [...materialDataStore.allMaterials]
  currentPage.value = 1
}

// 选中行
const selectedRow = ref(null)

const handleRowClick = (row) => {
  selectedRow.value = row
}

// 双击选择
const handleRowDoubleClick = (row) => {
  handleSelect(row)
}

// 选择材价
const handleSelect = (row) => {
  // 转换数据结构为匹配材价格式
  const priceData = {
    id: row.id,
    materialName: row.materialName,
    specification: row.specification,
    brand: row.brand,
    unit: row.unit,
    priceIncludingTax: row.priceIncludingTax, // 使用含税价
    taxRate: row.taxRate,
    purchaseTime: row.purchaseTime,
    supplierCompany: row.supplierCompany,
    sourceProject: row.sourceProject,
    priceType: row.priceType || '市场价',
    remarks: ''
  }
  
  emit('select', priceData)
  handleClose()
}

// 关闭弹窗
const handleClose = () => {
  selectedRow.value = null
  visible.value = false
}

// 工具函数
const formatPrice = (price) => {
  return price ? Number(price).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'
}
</script>

<style lang="scss" scoped>
.material-selector-dialog {
  :deep(.el-dialog__body) {
    padding: 16px 20px;
  }
  
  .filter-section {
    margin-bottom: 16px;
    padding: 16px;
    background: #f5f7fa;
    border-radius: 8px;
  }
  
  .pagination-wrapper {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
