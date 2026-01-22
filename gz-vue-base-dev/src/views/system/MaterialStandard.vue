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
        <el-tree
          :data="categoryTree"
          :props="{ children: 'children', label: 'categoryName' }"
          node-key="id"
          highlight-current
          @node-click="handleCategorySelect"
          default-expand-all
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
          <el-table-column label="操作" width="140" align="center" fixed="right">
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
import { FolderOpened, Folder, Memo, Top, Bottom, Search, Refresh, Plus, EditPen, Delete } from '@element-plus/icons-vue'

// 侧边栏状态
const sidebarCollapsed = ref(false)
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 数据源
const categoryTree = ref([])
const specList = ref([])
const unitList = ref([])

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
  gap: 20px;
  height: 100%;
  width: 100%;
  padding: 0;
  overflow: hidden;
}

// 玻璃拟态卡片通用
.glass-panel {
  background: $bg-glass;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $border-glass;
  border-radius: 24px;
}

// 左侧分类树
.category-sidebar-glass {
  @extend .glass-panel;
  width: $sidebar-width;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);

  &.collapsed {
    width: $sidebar-collapsed-width;
  }

  .sidebar-header {
    padding: 24px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    .header-content {
      display: flex;
      align-items: center;
      gap: 10px;
      
      .title-icon { color: $primary-blue; font-size: 20px; }
      h3 { margin: 0; font-size: 16px; font-weight: 700; color: #1d1d1f; }
    }

    .toggle-btn {
      color: #86868b;
      background: rgba(0, 0, 0, 0.03);
      border: none;
      &:hover { color: $primary-blue; background: rgba($primary-blue, 0.1); }
    }
  }

  .tree-container-custom {
    flex: 1;
    overflow-y: auto;
    padding: 16px 12px;
    
    &::-webkit-scrollbar { width: 0; }

    :deep(.el-tree) {
      background: transparent;
      .el-tree-node__content {
        height: 40px;
        border-radius: 12px;
        margin-bottom: 4px;
        &:hover { background: rgba(0, 0, 0, 0.03); }
      }
      .el-tree-node.is-current > .el-tree-node__content {
        background: $primary-blue;
        color: white;
        .node-prefix { background: rgba(255,255,255,0.2) !important; color: white !important; }
      }
    }

    .custom-tree-node {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      position: relative;
      
      .node-prefix {
        font-family: 'Monaco', monospace;
        font-size: 11px;
        font-weight: 500;
        color: #8e8e93;
        min-width: 24px;
        transition: all 0.3s;
      }

      .node-label {
        color: #3a3a3c;
        transition: all 0.3s;
      }

      // 层级符号设计
      &.level-1 {
        font-weight: 700;
        .node-prefix { color: $primary-blue; font-size: 12px; }
        .node-label { color: #1c1c1e; font-size: 15px; }
      }
      
      &.level-2 {
        .node-prefix { color: #8e8e93; }
        &::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          width: 4px;
          height: 4px;
          background: #d1d1d6;
          border-radius: 50%;
          transform: translateY(-50%);
        }
      }

      &.level-3 {
        .node-prefix { color: #aeaeb2; font-weight: 400; }
        .node-label { color: #636366; font-size: 13px; }
      }
    }

    :deep(.el-tree-node.is-current) > .el-tree-node__content {
      background: rgba($primary-blue, 0.08) !important;
      border-right: 3px solid $primary-blue;
      .node-label { color: $primary-blue; font-weight: 700; }
      .node-prefix { color: $primary-blue; font-weight: 700; }
    }
  }
}

// 右侧主内容
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
  transition: all 0.3s ease;
}

// 筛选面板
.filter-panel-glass {
  @extend .glass-panel;
  padding: 16px 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  
  .custom-query-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    .filter-inputs { display: flex; flex-wrap: wrap; align-items: center; }

    :deep(.el-form-item) { margin-bottom: 0; margin-right: 20px; }
    :deep(.el-input__wrapper), :deep(.el-select__wrapper) {
      border-radius: 12px;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.08) inset;
      &:hover { box-shadow: 0 0 0 1px $primary-blue inset; }
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.03);

  .custom-modern-table {
    --el-table-border-color: rgba(0,0,0,0.03);
    --el-table-header-bg-color: transparent;
    background: transparent;
    
    :deep(th.el-table__cell) {
      color: #86868b;
      font-weight: 700;
      border-bottom: 2px solid rgba(0,0,0,0.05);
      padding: 16px 0;
    }

    :deep(td.el-table__cell) {
      padding: 16px 0;
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
      .name-text { font-size: 14px; font-weight: 600; color: #1d1d1f; }
      .remark-text { font-size: 12px; color: #86868b; }
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

// 弹窗样式
:deep(.el-dialog) {
  border-radius: 28px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.8);
  box-shadow: 0 32px 64px rgba(0,0,0,0.15);

  .el-dialog__header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 24px 32px;
    .el-dialog__title { font-weight: 700; color: #1d1d1f; }
  }

  .el-form-item__label { font-weight: 600; color: #48484a; }
}

</style>
