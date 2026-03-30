<template>
  <div class="supplier-query-container">
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

        <el-tree
          ref="categoryTreeRef"
          :data="filteredCategoryTree"
          :props="{ children: 'children', label: 'categoryName' }"
          :indent="12"
          node-key="id"
          highlight-current
          @node-click="handleCategorySelect"
          :default-expand-all="true"
          :filter-node-method="filterNode"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <span class="node-prefix">{{ formatDisplayCategoryCode(node, data) }}</span>
              <span class="node-label">{{ node.label }}</span>
            </div>
          </template>
        </el-tree>
      </div>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="main-content" :class="{ expanded: sidebarCollapsed }">
      <!-- 筛选区 -->
      <section class="filter-panel-glass">
        <el-form :model="queryForm" inline size="default" class="custom-query-form">
          <div class="filter-inputs">
            <el-form-item label="供应商名称">
              <el-input v-model="queryForm.supplierName" placeholder="输入名称" clearable style="width: 140px" />
            </el-form-item>
            <el-form-item label="品牌">
              <el-select v-model="queryForm.brandName" placeholder="全部品牌" clearable filterable style="width: 140px">
                <el-option v-for="item in brandList" :key="item.id" :label="item.brandName" :value="item.brandName" />
              </el-select>
            </el-form-item>
            <el-form-item label="地区">
              <el-cascader
                v-model="queryForm.region"
                :options="regionOptions"
                :props="{ value: 'name', label: 'name', children: 'children' }"
                placeholder="选择地区"
                clearable
                style="width: 140px"
                @change="handleRegionChange"
              />
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="queryForm.contactPerson" placeholder="输入联系人" clearable style="width: 140px" />
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input v-model="queryForm.contactPhone" placeholder="输入电话" clearable style="width: 140px" />
            </el-form-item>
            <el-form-item label="入库时间">
              <el-date-picker
                v-model="queryForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 240px"
                @change="handleDateChange"
              />
            </el-form-item>
          </div>
          <div class="filter-btns">
            <el-button type="primary" @click="handleQuery" icon="Search" class="btn-search">查询</el-button>
            <el-button @click="handleReset" icon="Refresh" class="btn-reset">重置</el-button>
            <el-button type="success" @click="handleAdd" icon="Plus" class="btn-add">新增供应商</el-button>
          </div>
        </el-form>
      </section>

      <!-- 数据表格 -->
      <section class="table-container-glass">
        <div class="table-body">
          <el-table
            :data="tableData"
            style="width: 100%"
            height="100%"
            v-loading="loading"
            class="custom-modern-table"
          >
          <el-table-column type="index" label="序号" width="60" align="center" fixed="left">
            <template #default="{ $index }">
              <span class="index-badge">{{ $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="supplierName" label="供应商名称" min-width="180" fixed="left">
            <template #default="{ row }">
              <div class="supplier-info-cell" @click="handleDetail(row)">
                <span class="name-text link-text">{{ row.supplierName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="categoryNames" label="供应材料类别" min-width="180">
            <template #default="{ row }">
              <span class="category-path" :title="row.categoryNames">{{ formatCategoryDisplay(row.categoryNames) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="brandName" label="供应品牌" width="120" align="center">
            <template #default="{ row }">
              <el-tag size="small" effect="plain" type="primary">{{ row.brandName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="region" label="所在地区" width="180" align="center">
            <template #default="{ row }">
              <span class="region-text">{{ row.province }}-{{ row.city }}-{{ row.district }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="contactPerson" label="联系人" width="100" align="center" />
          <el-table-column prop="contactPhone" label="联系方式" width="130" align="center">
            <template #default="{ row }">
              <span class="phone-text">{{ row.contactPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="入库时间" width="160" align="center">
            <template #default="{ row }">
              <span class="time-text">{{ row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center" fixed="right">
            <template #default="{ row }">
              <div class="action-btns">
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
        </div>

        <!-- 分页器 -->
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
    </main>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="850px"
      :close-on-click-modal="false"
      @close="handleDialogClose"
      class="custom-glass-dialog"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="135px"
        size="default"
        class="compact-form"
      >
        <!-- 基础信息 -->
        <div class="form-section">
          <div class="section-header">
            <el-icon><InfoFilled /></el-icon>
            <span>基础信息</span>
          </div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="供应商名称" prop="supplierName">
                <el-input v-model="formData.supplierName" placeholder="请输入供应商名称" maxlength="200" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应品牌" prop="brandName">
                <el-select v-model="formData.brandName" placeholder="请选择品牌" filterable style="width: 100%">
                  <el-option v-for="item in brandList" :key="item.id" :label="item.brandName" :value="item.brandName" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="供应材料分类" prop="categoryIds">
                <el-cascader
                  v-model="formData.categoryIds"
                  :options="categoryTree"
                  :props="{ value: 'id', label: 'categoryName', children: 'children', expandTrigger: 'hover' }"
                  placeholder="请选择三级分类"
                  clearable
                  style="width: 100%"
                  @change="handleCategoryChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="当前状态" prop="status">
                <el-radio-group v-model="formData.status" class="custom-radio-group">
                  <el-radio-button label="1">正常</el-radio-button>
                  <el-radio-button label="0">停用</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 工商信息 -->
        <div class="form-section">
          <div class="section-header">
            <el-icon><OfficeBuilding /></el-icon>
            <span>工商信息</span>
          </div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="统一社会信用代码" prop="creditCode">
                <el-input v-model="formData.creditCode" placeholder="请输入信用代码" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纳税人识别号" prop="taxId">
                <el-input v-model="formData.taxId" placeholder="请输入纳税人识别号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="法定代表人" prop="legalRep">
                <el-input v-model="formData.legalRep" placeholder="姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册资金(万)" prop="capital">
                <el-input v-model="formData.capital" placeholder="金额">
                  <template #append>万元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="所属行业" prop="industry">
                <el-input v-model="formData.industry" placeholder="如：制造业" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <!-- 联系信息 -->
        <div class="form-section">
          <div class="section-header">
            <el-icon><PhoneFilled /></el-icon>
            <span>联系信息</span>
          </div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="联系人" prop="contactPerson">
                <el-input v-model="formData.contactPerson" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="contactPhone">
                <el-input v-model="formData.contactPhone" placeholder="请输入电话" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="电子邮箱" prop="contactEmail">
                <el-input v-model="formData.contactEmail" placeholder="请输入邮箱" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在地区" prop="region">
                <el-cascader
                  v-model="formData.region"
                  :options="regionOptions"
                  :props="{ value: 'name', label: 'name', children: 'children' }"
                  placeholder="省/市/区"
                  clearable
                  style="width: 100%"
                  @change="handleFormRegionChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="formData.address" placeholder="街道、门牌号等" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注信息" prop="remark">
            <el-input v-model="formData.remark" type="textarea" :rows="2" placeholder="请输入其他说明事项" maxlength="500" show-word-limit />
          </el-form-item>
        </div>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false" class="btn-cancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitLoading" class="btn-submit">确认提交</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { 
  getCategoryTree
} from '@/api/material'
import {
  getBrandList,
  getRegionTree,
  pageSupplierList,
  saveSupplier,
  updateSupplier,
  deleteSupplier
} from '@/api/supplier'
import { FolderOpened, Search, Refresh, Plus, EditPen, Delete, ArrowUp, ArrowDown, InfoFilled, PhoneFilled, OfficeBuilding } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * 格式化供应材料类别显示
 * 只显示最后一级分类，多个分类用“、”隔开
 */
const formatCategoryDisplay = (categoryNames) => {
  if (!categoryNames) return ''
  // 以“、”分隔多个路径
  const categories = categoryNames.split('、')
  // 提取每个路径的最后一级
  const lastLevels = categories.map(cat => {
    const paths = cat.split(' / ')
    return paths[paths.length - 1].trim()
  })
  // 重新拼接
  return lastLevels.join('、')
}

const handleDetail = (row) => {
  const { href } = router.resolve({
    name: 'SupplierDetail',
    params: { id: row.id },
    query: { name: row.supplierName }
  })
  window.open(href, '_blank')
}

// 侧边栏状态
const sidebarCollapsed = ref(false)
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 数据源
const categoryTree = ref([])
const brandList = ref([])
const regionData = ref([])
const regionOptions = ref([])

// 分类树搜索
const categorySearchText = ref('')
const categoryTreeRef = ref()
const filteredCategoryTree = ref([])
const isExpandAll = ref(true)
const expandedKeys = ref([])

const toggleExpandAll = () => {
  isExpandAll.value = !isExpandAll.value
  const nodes = categoryTreeRef.value.store._getAllNodes()
  nodes.forEach(node => {
    node.expanded = isExpandAll.value
  })
}

// 查询表单
const queryForm = reactive({
  supplierName: '',
  brandName: '',
  province: '',
  city: '',
  district: '',
  region: [],
  contactPerson: '',
  contactPhone: '',
  dateRange: [],
  startTime: '',
  endTime: '',
  categoryLevel1Id: null,
  categoryLevel2Id: null,
  categoryLevel3Id: null,
  pageNum: 1,
  pageSize: 20
})

// 表格数据
const tableData = ref([])
const total = ref(0)
const loading = ref(false)

// 弹窗状态
const dialogVisible = ref(false)
const dialogTitle = computed(() => formData.id ? '编辑供应商' : '新增供应商')
const submitLoading = ref(false)

// 表单数据
const formRef = ref()
const formData = reactive({
  id: null,
  supplierName: '',
  categoryIds: [],
  categoryLevel1Id: null,
  categoryLevel2Id: null,
  categoryLevel3Id: null,
  categoryNames: '',
  brandName: '',
  region: [],
  province: '',
  city: '',
  district: '',
  address: '',
  contactPerson: '',
  contactPhone: '',
  contactEmail: '',
  remark: '',
  status: '1',
  // 新增加的工商信息字段
  creditCode: '',     // 统一社会信用代码
  taxId: '',          // 纳税人识别号
  industry: '',       // 所属行业
  legalRep: '',       // 法定代表人
  capital: '',        // 注册资金
  tradeIdentity: '供应商', // 交易身份
  orgType: '境内企业'     // 机构类型
})

// 手机号验证规则
const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入联系电话'))
  } else if (!/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

// 邮箱验证规则
const validateEmail = (rule, value, callback) => {
  if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
    callback(new Error('请输入正确的邮箱地址'))
  } else {
    callback()
  }
}

// 表单验证规则
const formRules = {
  supplierName: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
  categoryIds: [{ required: true, message: '请选择供应材料分类', trigger: 'change' }],
  brandName: [{ required: true, message: '请选择供应品牌', trigger: 'change' }],
  region: [{ required: true, message: '请选择所在地区', trigger: 'change' }],
  contactPerson: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  contactPhone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
  contactEmail: [{ validator: validateEmail, trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  creditCode: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
  legalRep: [{ required: true, message: '请输入法定代表人', trigger: 'blur' }]
}

// 初始化数据
onMounted(() => {
  loadCategoryTree()
  loadBrandList()
  loadRegionData()
  handleQuery()
})

// 加载分类树
const loadCategoryTree = async () => {
  const res = await getCategoryTree()
  categoryTree.value = res.data || res || []
  filteredCategoryTree.value = categoryTree.value
}

// 加载品牌列表
const loadBrandList = async () => {
  const res = await getBrandList()
  brandList.value = res.data || res || []
}

// 加载地区数据
const loadRegionData = async () => {
  const res = await getRegionTree()
  regionData.value = res.data || res || []
  
  // 转换为级联选择器格式
  regionOptions.value = regionData.value.map(province => ({
    name: province.province,
    children: province.cities.map(city => ({
      name: city.city,
      children: city.districts.map(district => ({
        name: district
      }))
    }))
  }))
}

// 分类树搜索
const handleCategorySearch = (value) => {
  categoryTreeRef.value.filter(value)
}

// 分类树节点过滤
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

// 查询列表
const handleQuery = async () => {
  loading.value = true
  try {
    const res = await pageSupplierList(queryForm)
    tableData.value = res.records || []
    total.value = res.total || 0
  } finally {
    loading.value = false
  }
}

// 重置查询
const handleReset = () => {
  Object.assign(queryForm, {
    supplierName: '',
    brandName: '',
    province: '',
    city: '',
    district: '',
    region: [],
    contactPerson: '',
    contactPhone: '',
    dateRange: [],
    startTime: '',
    endTime: '',
    categoryLevel1Id: null,
    categoryLevel2Id: null,
    categoryLevel3Id: null,
    pageNum: 1,
    pageSize: 20
  })
  categorySearchText.value = ''
  filteredCategoryTree.value = categoryTree.value
  expandedKeys.value = []
  handleQuery()
}

// 地区选择变化
const handleRegionChange = (value) => {
  if (value && value.length === 3) {
    queryForm.province = value[0]
    queryForm.city = value[1]
    queryForm.district = value[2]
  } else {
    queryForm.province = ''
    queryForm.city = ''
    queryForm.district = ''
  }
}

// 日期范围变化
const handleDateChange = (value) => {
  if (value && value.length === 2) {
    queryForm.startTime = value[0]
    queryForm.endTime = value[1]
  } else {
    queryForm.startTime = ''
    queryForm.endTime = ''
  }
}

// 分类树节点点击
const handleCategorySelect = (data) => {
  if (data.level === 1) {
    queryForm.categoryLevel1Id = data.id
    queryForm.categoryLevel2Id = null
    queryForm.categoryLevel3Id = null
  } else if (data.level === 2) {
    queryForm.categoryLevel2Id = data.id
    queryForm.categoryLevel3Id = null
  } else if (data.level === 3) {
    queryForm.categoryLevel3Id = data.id
  }
  queryForm.pageNum = 1
  handleQuery()
}

// 新增
const handleAdd = () => {
  dialogVisible.value = true
  Object.assign(formData, {
    id: null,
    supplierName: '',
    categoryIds: [],
    categoryLevel1Id: null,
    categoryLevel2Id: null,
    categoryLevel3Id: null,
    categoryNames: '',
    brandName: '',
    region: [],
    province: '',
    city: '',
    district: '',
    address: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    remark: '',
    status: '1',
    creditCode: '',
    taxId: '',
    industry: '',
    legalRep: '',
    capital: '',
    tradeIdentity: '供应商',
    orgType: '境内企业'
  })
}

// 编辑
const handleEdit = (row) => {
  dialogVisible.value = true
  Object.assign(formData, {
    id: row.id,
    supplierName: row.supplierName,
    categoryIds: [row.categoryLevel1Id, row.categoryLevel2Id, row.categoryLevel3Id],
    categoryLevel1Id: row.categoryLevel1Id,
    categoryLevel2Id: row.categoryLevel2Id,
    categoryLevel3Id: row.categoryLevel3Id,
    categoryNames: row.categoryNames,
    brandName: row.brandName,
    region: [row.province, row.city, row.district],
    province: row.province,
    city: row.city,
    district: row.district,
    address: row.address,
    contactPerson: row.contactPerson,
    contactPhone: row.contactPhone,
    contactEmail: row.contactEmail,
    remark: row.remark,
    status: row.status,
    creditCode: row.creditCode || '',
    taxId: row.taxId || '',
    industry: row.industry || '',
    legalRep: row.legalRep || '',
    capital: row.capital || '',
    tradeIdentity: row.tradeIdentity || '供应商',
    orgType: row.orgType || '境内企业'
  })
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该供应商吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteSupplier(row.id)
    ElMessage.success('删除成功')
    handleQuery()
  }).catch(() => {})
}

// 分类选择变化
const handleCategoryChange = (value) => {
  if (value && value.length === 3) {
    formData.categoryLevel1Id = value[0]
    formData.categoryLevel2Id = value[1]
    formData.categoryLevel3Id = value[2]
    
    // 生成分类路径字符串
    const getCategoryPath = (tree, ids, level = 0) => {
      for (const node of tree) {
        if (node.id === ids[level]) {
          if (level === 2) {
            return node.categoryName
          }
          if (node.children) {
            const childPath = getCategoryPath(node.children, ids, level + 1)
            return childPath ? `${node.categoryName} / ${childPath}` : node.categoryName
          }
        }
      }
      return ''
    }
    
    formData.categoryNames = getCategoryPath(categoryTree.value, value)
  }
}

// 表单地区选择变化
const handleFormRegionChange = (value) => {
  if (value && value.length === 3) {
    formData.province = value[0]
    formData.city = value[1]
    formData.district = value[2]
  } else {
    formData.province = ''
    formData.city = ''
    formData.district = ''
  }
}

// 提交表单
const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return

  submitLoading.value = true
  try {
    const data = {
      ...formData,
      categoryIds: undefined,
      region: undefined
    }

    if (formData.id) {
      await updateSupplier(data)
      ElMessage.success('更新成功')
    } else {
      await saveSupplier(data)
      ElMessage.success('新增成功')
    }

    dialogVisible.value = false
    handleQuery()
  } finally {
    submitLoading.value = false
  }
}

// 弹窗关闭
const handleDialogClose = () => {
  formRef.value?.resetFields()
}
</script>

<style lang="scss" scoped>
$sidebar-width: 248px;
$sidebar-collapsed-width: 64px;
$primary-blue: #377cfd;
$bg-glass: rgba(255, 255, 255, 0.75);
$border-glass: rgba(255, 255, 255, 0.5);

.supplier-query-container {
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
  }
}

// 右侧主内容
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  min-height: 0;
  height: 100%;
  transition: all 0.3s ease;
}

// 筛选面板
.filter-panel-glass {
  @extend .glass-panel;
  padding: 12px 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  
  .custom-query-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    .filter-inputs { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }

    :deep(.el-form-item) { margin-bottom: 4px; margin-right: 12px; }
    :deep(.el-form-item__label) {
      font-size: 13px;
      font-weight: 700;
      color: #1d1d1f;
      padding-right: 8px;
    }
    :deep(.el-input__wrapper), :deep(.el-select__wrapper) {
      border-radius: 8px;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.08) inset;
      &:hover { box-shadow: 0 0 0 1px $primary-blue inset; }
      .el-input__inner, .el-select__placeholder {
        font-size: 13px;
        color: #1d1d1f;
      }
    }
  }

  .filter-btns {
    display: flex;
    gap: 10px;
    
    .btn-search { border-radius: 12px; padding: 0 20px; }
    .btn-reset { border-radius: 12px; background: rgba(0,0,0,0.03); border: none; }
    .btn-add { border-radius: 12px; background: #00c261; border: none; }
  }
}

// 表格面板
.table-container-glass {
  @extend .glass-panel;
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.03);

  .table-body {
    flex: 1;
    min-height: 0;
  }

  .custom-modern-table {
    --el-table-border-color: rgba(0,0,0,0.03);
    
    :deep(th.el-table__cell) {
      background-color: #f7f8fa !important;
      color: #1d1d1f;
      font-weight: 600;
      border-bottom: 1px solid #f0f0f0;
      padding: 8px 0;
      font-size: 13px;
    }

    :deep(td.el-table__cell) {
      padding: 10px 0;
    }

    // 针对 Element Plus sticky 模式的固定列修复
    :deep(.el-table__cell.is-fixed-right),
    :deep(.el-table__cell.is-fixed-left) {
      background-color: white !important;
      z-index: 2; // 确保在普通单元格之上
      
      &.is-fixed-right::before {
        content: "";
        position: absolute;
        top: 0;
        left: -10px;
        width: 10px;
        height: 100%;
        background: linear-gradient(to right, transparent, rgba(0,0,0,0.02));
        pointer-events: none;
      }

      &.is-fixed-left::after {
        content: "";
        position: absolute;
        top: 0;
        right: -10px;
        width: 10px;
        height: 100%;
        background: linear-gradient(to left, transparent, rgba(0,0,0,0.02));
        pointer-events: none;
      }
    }

    // 修复表头右侧补丁位透明
    :deep(.el-table__fixed-right-patch) {
      background-color: white !important;
    }

    .index-badge {
      display: inline-block;
      width: 24px;
      height: 24px;
      line-height: 24px;
      background: rgba(0,0,0,0.04);
      border-radius: 50%;
      font-size: 11px;
      font-weight: 700;
      color: #86868b;
    }

    .supplier-info-cell {
      .name-text { 
        font-size: 13px; 
        font-weight: 600; 
        color: #1d1d1f;
        
        &.link-text {
          color: $primary-blue;
          cursor: pointer;
          transition: all 0.2s;
          
          &:hover {
            color: darken($primary-blue, 15%);
            text-decoration: underline;
          }
        }
      }
    }

    .category-path {
      font-size: 13px;
      color: #1d1d1f;
    }

    .region-text {
      font-size: 13px;
      color: #1d1d1f;
    }

    .phone-text {
      font-family: 'Monaco', monospace;
      font-size: 13px;
      color: #1d1d1f;
    }

    .time-text {
      font-size: 13px;
      color: #1d1d1f;
    }

    .action-btns {
      display: flex;
      align-items: center;
      justify-content: center;
      .el-button {
        font-size: 18px;
        &:hover { transform: scale(1.15); transition: 0.2s; }
      }
    }
  }

  .pagination-wrapper {
    margin-top: auto;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    
    :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
      background-color: $primary-blue;
    }
  }
}

// 弹窗样式优化
:deep(.el-overlay) {
  overflow: hidden !important;
}

:deep(.custom-glass-dialog) {
  display: flex !important;
  flex-direction: column;
  margin-top: 8vh !important;
  margin-bottom: 8vh !important;
  max-height: 84vh;
  
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .el-dialog__header {
    margin: 0;
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
    .el-dialog__title {
      font-weight: 600;
      font-size: 15px;
      color: #1d1d1f;
    }
    .el-dialog__headerbtn {
      top: 14px;
      right: 16px;
      font-size: 18px;
      .el-dialog__close {
        color: #909399;
        font-weight: 700;
        transition: all 0.2s;
        &:hover { color: #f56c6c; transform: rotate(90deg); }
      }
    }
  }

  .el-dialog__body {
    padding: 16px;
    overflow-y: auto;
    flex: 1;
    font-size: 13px;
    &::-webkit-scrollbar { width: 5px; }
    &::-webkit-scrollbar-thumb { background: #e8e8e8; border-radius: 10px; }
  }

  .el-dialog__footer {
    padding: 10px 16px 16px;
    border-top: 1px solid #f0f0f0;
    background: #ffffff;
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
    position: relative;
    &::before {
      content: '';
      width: 4px;
      height: 16px;
      background: $primary-blue;
      border-radius: 2px;
    }
    .el-icon { display: none; }
    span {
      font-size: 13px;
      font-weight: 700;
      color: #1d1d1f;
    }
  }
}

.compact-form {
  :deep(.el-form-item) {
    margin-bottom: 18px;
    .el-form-item__label { font-weight: 500; color: #606266; font-size: 13px; }
    .el-input__inner, .el-textarea__inner {
      border-radius: 4px;
      background-color: #ffffff;
      border-color: #dcdfe6;
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
    &:hover { background: #f5f7fa; color: #1d1d1f; }
  }
  .btn-submit {
    border-radius: 4px;
    padding: 8px 24px;
    background: $primary-blue;
    border: none;
    font-weight: 500;
    color: #ffffff;
    height: 32px;
    &:hover { background: #5c96ff; }
  }
}
</style>
