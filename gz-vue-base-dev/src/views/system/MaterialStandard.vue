<template>
  <div class="material-standard-container">
    <!-- 左侧分类树 -->
    <aside class="category-sidebar-glass" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="header-content" v-if="!sidebarCollapsed">
          <el-icon class="title-icon"><FolderOpened /></el-icon>
          <h3>材料分类库</h3>
        </div>
        <div class="header-action">
          <el-tooltip content="编辑分类" placement="top">
            <el-button 
              circle
              size="small"
              icon="Edit" 
              @click="handleManageCategory"
              class="edit-btn"
              v-if="!sidebarCollapsed"
            />
          </el-tooltip>
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
          node-key="id"
          highlight-current
          @node-click="handleCategorySelect"
          :default-expand-all="true"
          :filter-node-method="filterNode"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <span class="node-prefix" :class="'level-' + data.level">{{ data.categoryCode }}</span>
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
            <el-form-item label="材料编码">
              <el-input v-model="queryForm.materialCode" placeholder="输入编码" clearable style="width: 140px" />
            </el-form-item>
            <el-form-item label="材料名称">
              <el-input v-model="queryForm.materialName" placeholder="输入材料名称" clearable style="width: 160px" />
            </el-form-item>
            <el-form-item label="规格">
              <el-select v-model="queryForm.specId" placeholder="全部规格" clearable filterable style="width: 140px">
                <el-option v-for="item in specList" :key="item.id" :label="item.specName" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="单位">
              <el-select v-model="queryForm.unitId" placeholder="单位" clearable style="width: 90px">
                <el-option v-for="item in unitList" :key="item.id" :label="item.unitName" :value="item.id" />
              </el-select>
            </el-form-item>
          </div>
          <div class="filter-btns">
            <el-button type="primary" @click="handleQuery" icon="Search" class="btn-search">查询</el-button>
            <el-button @click="handleReset" icon="Refresh" class="btn-reset">重置</el-button>
            <el-button type="success" @click="handleAdd" icon="Plus" class="btn-add">新增材料</el-button>
          </div>
        </el-form>
      </section>

      <!-- 数据表格 -->
      <section class="table-container-glass">
        <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
          class="custom-modern-table"
        >
          <el-table-column type="index" label="序号" width="60" align="center">
            <template #default="{ $index }">
              <span class="index-badge">{{ $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="materialCode" label="材料编码" width="130" align="center">
            <template #default="{ row }">
              <span class="code-text">{{ row.materialCode }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="materialName" label="材料名称" min-width="220">
            <template #default="{ row }">
              <div class="material-info-cell">
                <span class="name-text">{{ row.materialName }}</span>
                <span class="remark-text" v-if="row.remark">{{ row.remark }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="unitName" label="单位" width="80" align="center">
            <template #default="{ row }">
              <el-tag size="small" effect="plain" type="info">{{ row.unitName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="categoryLevel1Name" label="一级分类" width="120" align="center" />
          <el-table-column prop="categoryLevel2Name" label="二级分类" width="120" align="center" />
          <el-table-column prop="categoryLevel3Name" label="三级分类" width="120" align="center" />
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
      width="600px"
      :close-on-click-modal="false"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        size="default"
      >
        <el-form-item label="材料名称" prop="materialName">
          <el-input v-model="formData.materialName" placeholder="请输入材料名称" maxlength="200" show-word-limit />
        </el-form-item>
        
        <el-form-item label="材料分类" prop="categoryIds">
          <el-cascader
            v-model="formData.categoryIds"
            :options="categoryTree"
            :props="{
              value: 'id',
              label: 'categoryName',
              children: 'children',
              expandTrigger: 'hover'
            }"
            placeholder="请选择三级分类"
            clearable
            style="width: 100%"
            @change="handleCategoryChange"
          />
        </el-form-item>

        <el-form-item label="规格型号" prop="specId">
          <el-select v-model="formData.specId" placeholder="请选择规格型号" filterable style="width: 100%" @change="generateCode">
            <el-option v-for="item in specList" :key="item.id" :label="`${item.specName} (${item.specCode})`" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="计量单位" prop="unitId">
          <el-select v-model="formData.unitId" placeholder="请选择计量单位" style="width: 100%" @change="generateCode">
            <el-option v-for="item in unitList" :key="item.id" :label="`${item.unitName} (${item.unitCode})`" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="材料编码">
          <el-input v-model="generatedCode" readonly disabled>
            <template #prepend>
              <el-icon color="#409eff"><Memo /></el-icon>
            </template>
          </el-input>
          <div class="code-hint">编码将根据分类、规格、单位自动生成（11位）</div>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            v-model="formData.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入备注信息"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitLoading">提交</el-button>
      </template>
    </el-dialog>
    <!-- 材料分类管理弹窗 -->
    <CategoryManageModal 
      ref="categoryManageRef" 
      @update="handleCategoryUpdate" 
    />
  </div>
</template>

<script setup>
import { 
  getCategoryTree, 
  getSpecList, 
  getUnitList, 
  pageMaterialStandard, 
  saveMaterialStandard, 
  updateMaterialStandard, 
  deleteMaterialStandard 
} from '@/api/material'
import { FolderOpened, Folder, Memo, Top, Bottom, Search, Refresh, Plus, Edit, EditPen, Delete, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import CategoryManageModal from './CategoryManageModal.vue'

// 侧边栏状态
const sidebarCollapsed = ref(false)
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 数据源
const categoryTree = ref([])
const specList = ref([])
const unitList = ref([])

// 分类树搜索
const categorySearchText = ref('')
const categoryTreeRef = ref()
const filteredCategoryTree = ref([])
const isExpandAll = ref(true)
const categoryManageRef = ref(null)

// 打开分类管理弹窗
const handleManageCategory = () => {
  categoryManageRef.value.open(categoryTree.value)
}

// 分类数据更新回调
const handleCategoryUpdate = (newTree) => {
  categoryTree.value = newTree
  filteredCategoryTree.value = newTree
  ElMessage.success('分类数据同步成功')
}

const toggleExpandAll = () => {
  isExpandAll.value = !isExpandAll.value
  const nodes = categoryTreeRef.value.store._getAllNodes()
  nodes.forEach(node => {
    node.expanded = isExpandAll.value
  })
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

// 查询表单
const queryForm = reactive({
  materialCode: '',
  materialName: '',
  categoryLevel1Id: null,
  categoryLevel2Id: null,
  categoryLevel3Id: null,
  specId: null,
  unitId: null,
  status: '1',
  pageNum: 1,
  pageSize: 20
})

// 表格数据
const tableData = ref([])
const total = ref(0)
const loading = ref(false)

// 弹窗状态
const dialogVisible = ref(false)
const dialogTitle = computed(() => formData.id ? '编辑材料标准' : '新增材料标准')
const submitLoading = ref(false)

// 表单数据
const formRef = ref()
const formData = reactive({
  id: null,
  materialName: '',
  categoryIds: [],
  categoryLevel1Id: null,
  categoryLevel2Id: null,
  categoryLevel3Id: null,
  specId: null,
  unitId: null,
  remark: '',
  status: '1'
})

// 生成的编码
const generatedCode = ref('')

// 表单验证规则
const formRules = {
  materialName: [{ required: true, message: '请输入材料名称', trigger: 'blur' }],
  categoryIds: [{ required: true, message: '请选择材料分类', trigger: 'change' }],
  specId: [{ required: true, message: '请选择规格型号', trigger: 'change' }],
  unitId: [{ required: true, message: '请选择计量单位', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

// 初始化数据
onMounted(() => {
  loadCategoryTree()
  loadSpecList()
  loadUnitList()
  handleQuery()
})

// 加载分类树
const loadCategoryTree = async () => {
  const res = await getCategoryTree()
  categoryTree.value = res.data || res || []
  filteredCategoryTree.value = categoryTree.value
}

// 加载规格列表
const loadSpecList = async () => {
  const res = await getSpecList()
  specList.value = res.data || res || []
}

// 加载单位列表
const loadUnitList = async () => {
  const res = await getUnitList()
  unitList.value = res.data || res || []
}

// 查询列表
const handleQuery = async () => {
  loading.value = true
  try {
    const res = await pageMaterialStandard(queryForm)
    tableData.value = res.records || []
    total.value = res.total || 0
  } finally {
    loading.value = false
  }
}

// 重置查询
const handleReset = () => {
  Object.assign(queryForm, {
    materialCode: '',
    materialName: '',
    categoryLevel1Id: null,
    categoryLevel2Id: null,
    categoryLevel3Id: null,
    specId: null,
    unitId: null,
    status: '1',
    pageNum: 1,
    pageSize: 20
  })
  categorySearchText.value = ''
  filteredCategoryTree.value = categoryTree.value
  handleQuery()
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
    materialName: '',
    categoryIds: [],
    categoryLevel1Id: null,
    categoryLevel2Id: null,
    categoryLevel3Id: null,
    specId: null,
    unitId: null,
    remark: '',
    status: '1'
  })
  generatedCode.value = ''
}

// 编辑
const handleEdit = (row) => {
  dialogVisible.value = true
  Object.assign(formData, {
    id: row.id,
    materialName: row.materialName,
    categoryIds: [row.categoryLevel1Id, row.categoryLevel2Id, row.categoryLevel3Id],
    categoryLevel1Id: row.categoryLevel1Id,
    categoryLevel2Id: row.categoryLevel2Id,
    categoryLevel3Id: row.categoryLevel3Id,
    specId: row.specId,
    unitId: row.unitId,
    remark: row.remark,
    status: row.status
  })
  generateCode()
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除该材料标准吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteMaterialStandard(row.id)
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
    generateCode()
  }
}

// 生成编码
const generateCode = () => {
  if (!formData.categoryIds || formData.categoryIds.length !== 3 || !formData.specId || !formData.unitId) {
    generatedCode.value = ''
    return
  }

  // 查找对应的编码
  const level1 = findCategoryCode(categoryTree.value, formData.categoryLevel1Id)
  const level2 = findCategoryCode(categoryTree.value, formData.categoryLevel2Id)
  const level3 = findCategoryCode(categoryTree.value, formData.categoryLevel3Id)
  const spec = specList.value.find(item => item.id === formData.specId)
  const unit = unitList.value.find(item => item.id === formData.unitId)

  if (level1 && level2 && level3 && spec && unit) {
    generatedCode.value = `${level1}${level2}${level3}${spec.specCode}${unit.unitCode}`
  }
}

// 递归查找分类编码
const findCategoryCode = (tree, id) => {
  for (const node of tree) {
    if (node.id === id) return node.categoryCode
    if (node.children) {
      const code = findCategoryCode(node.children, id)
      if (code) return code
    }
  }
  return null
}

// 提交表单
const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return

  submitLoading.value = true
  try {
    const data = {
      ...formData,
      categoryIds: undefined
    }

    if (formData.id) {
      await updateMaterialStandard(data)
      ElMessage.success('更新成功')
    } else {
      await saveMaterialStandard(data)
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
  generatedCode.value = ''
}
</script>

<style lang="scss" scoped>
$sidebar-width: 260px;
$sidebar-collapsed-width: 64px;
$primary-blue: #377cfd;
$bg-glass: rgba(255, 255, 255, 0.75);
$border-glass: rgba(255, 255, 255, 0.5);

.material-standard-container {
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);

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
    width: 100%;
    box-sizing: border-box;

    .header-content {
      display: flex;
      align-items: center;
      gap: 3px;
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      
      .title-icon { color: $primary-blue; font-size: 16px; flex-shrink: 0; }
      h3 { 
        margin: 0; 
        font-size: 13px; 
        font-weight: 700; 
        color: #1d1d1f; 
        overflow: hidden; 
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        letter-spacing: -0.2px;
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
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      
      &:hover { color: $primary-blue; background: rgba($primary-blue, 0.1); }
      
      :deep(.el-icon) {
        font-size: 13px;
      }
    }
  }

  .tree-container-custom {
    flex: 1;
    overflow-y: auto;
    padding: 12px 2px;
    
    &::-webkit-scrollbar { width: 0; }

    :deep(.el-tree) {
      background: transparent;
      .el-tree-node__content {
        height: 34px;
        border-radius: 8px;
        margin-bottom: 4px;
        transition: all 0.2s ease;
        &:hover { background: rgba($primary-blue, 0.05); }
      }
      .el-tree-node.is-current > .el-tree-node__content {
        background: rgba($primary-blue, 0.15) !important;
        border-right: 4px solid $primary-blue;
        .node-label { 
          color: $primary-blue; 
          font-weight: 700; 
        }
        .node-prefix { 
          color: $primary-blue !important; 
          font-weight: 700;
          opacity: 1;
        }
      }
    }

    .custom-tree-node {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      
      .node-prefix {
        font-family: 'Monaco', monospace;
        font-size: 11px;
        font-weight: 600;
        color: #8e8e93;
        min-width: 24px;
        transition: all 0.3s;
      }

      .node-label {
        color: #1d1d1f;
        transition: all 0.3s;
      }
    }

    .search-box {
      margin-bottom: 12px;
      padding: 0 4px;
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

    .code-text {
      font-family: 'Monaco', monospace;
      background: #f1f3f5;
      padding: 2px 8px;
      border-radius: 6px;
      color: $primary-blue;
      font-weight: 600;
      font-size: 12px;
    }

    .material-info-cell {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .name-text { font-size: 13px; font-weight: 600; color: #1d1d1f; }
      .remark-text { font-size: 12px; color: #86868b; }
    }

    :deep(.el-table__cell) {
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

:deep(.el-dialog) {
  display: flex !important;
  flex-direction: column;
  margin-top: 12vh !important;
  max-height: 76vh;
  
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
    padding: 16px 24px;
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

  .el-form-item__label { 
    font-weight: 500; 
    color: #606266; 
    font-size: 13px; 
  }
}

.code-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
  line-height: 1.4;
}
</style>
