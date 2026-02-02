<template>
  <el-dialog
    v-model="visible"
    title="材料分类管理"
    width="700px"
    :close-on-click-modal="false"
    class="category-manage-dialog"
    destroy-on-close
  >
    <div class="manage-content">
      <div class="tree-section">
        <div class="tree-toolbar">
          <el-button type="primary" size="small" icon="Plus" @click="handleAddRoot">新增一级分类</el-button>
        </div>
        <el-tree
          ref="treeRef"
          :data="treeData"
          :props="treeProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          draggable
          @node-drop="handleDrop"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <span class="node-info">
                <span class="node-code">{{ data.categoryCode }}</span>
                <span class="node-label">{{ node.label }}</span>
              </span>
              <span class="node-ops">
                <el-button link type="primary" size="small" icon="Plus" @click.stop="handleAddChild(data)" v-if="data.level < 3" />
                <el-button link type="primary" size="small" icon="Edit" @click.stop="handleEdit(data)" />
                <el-button link type="danger" size="small" icon="Delete" @click.stop="handleRemove(node, data)" />
              </span>
            </div>
          </template>
        </el-tree>
      </div>
    </div>

    <!-- 内层编辑弹窗 -->
    <el-dialog
      v-model="editVisible"
      :title="editTitle"
      width="400px"
      append-to-body
      class="inner-edit-dialog"
    >
      <el-form :model="editForm" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="editForm.categoryName" placeholder="如：水处理专用设备" />
        </el-form-item>
        <el-form-item label="分类编码" prop="categoryCode">
          <el-input v-model="editForm.categoryCode" placeholder="如：01" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </template>
    </el-dialog>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定并保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update', 'close'])

const visible = ref(false)
const treeData = ref([])
const treeRef = ref(null)
const treeProps = {
  label: 'categoryName',
  children: 'children'
}

// 编辑相关
const editVisible = ref(false)
const editTitle = ref('')
const formRef = ref(null)
const editForm = reactive({
  id: null,
  categoryName: '',
  categoryCode: '',
  parentId: null,
  level: 1
})
const rules = {
  categoryName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  categoryCode: [{ required: true, message: '请输入分类编码', trigger: 'blur' }]
}

let currentNode = null
let currentParent = null

const open = (data) => {
  treeData.value = JSON.parse(JSON.stringify(data))
  visible.ref = false // 修复引用错误，应该是 .value
  visible.value = true
}

const handleAddRoot = () => {
  editTitle.value = '新增一级分类'
  Object.assign(editForm, { id: null, categoryName: '', categoryCode: '', parentId: 0, level: 1 })
  currentNode = null
  currentParent = treeData.value
  editVisible.value = true
}

const handleAddChild = (data) => {
  editTitle.value = `新增子分类 (${data.categoryName})`
  Object.assign(editForm, { id: null, categoryName: '', categoryCode: '', parentId: data.id, level: data.level + 1 })
  currentNode = null
  currentParent = data.children || (data.children = [])
  editVisible.value = true
}

const handleEdit = (data) => {
  editTitle.value = '编辑分类'
  Object.assign(editForm, JSON.parse(JSON.stringify(data)))
  currentNode = data
  editVisible.value = true
}

const saveEdit = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return

  if (currentNode) {
    // 修改
    Object.assign(currentNode, editForm)
  } else {
    // 新增
    const newItem = {
      ...editForm,
      id: Date.now(), // 模拟ID
      children: []
    }
    currentParent.push(newItem)
  }
  editVisible.value = false
}

const handleRemove = (node, data) => {
  if (data.children && data.children.length > 0) {
    ElMessage.warning('请先删除子分类')
    return
  }
  ElMessageBox.confirm(`确定要删除分类「${data.categoryName}」吗？`, '警告', {
    type: 'warning'
  }).then(() => {
    const parent = node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex(d => d.id === data.id)
    children.splice(index, 1)
  })
}

const handleConfirm = () => {
  emit('update', treeData.value)
  visible.value = false
  ElMessage.success('操作成功')
}

const handleDrop = (draggingNode, dropNode, dropType, ev) => {
  // 可以在这里处理拖拽逻辑，如更新 level 等
  updateLevels(treeData.value, 1)
}

const updateLevels = (nodes, level) => {
  nodes.forEach(node => {
    node.level = level
    if (node.children) {
      updateLevels(node.children, level + 1)
    }
  })
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.category-manage-dialog {
  :deep(.el-dialog__body) {
    padding: 0 20px 20px;
  }
}

.manage-content {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  overflow: hidden;
}

.tree-section {
  padding: 16px;
  max-height: 500px;
  overflow-y: auto;

  .tree-toolbar {
    margin-bottom: 16px;
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;

  .node-info {
    display: flex;
    align-items: center;
    gap: 8px;

    .node-code {
      font-family: monospace;
      font-size: 12px;
      color: #909399;
      background: #f4f4f5;
      padding: 0 4px;
      border-radius: 4px;
    }

    .node-label {
      font-size: 14px;
    }
  }

  .node-ops {
    opacity: 0;
    transition: opacity 0.2s;
    .el-button {
      padding: 0;
      margin-left: 8px;
    }
  }

  &:hover {
    .node-ops {
      opacity: 1;
    }
  }
}

:deep(.el-tree-node__content) {
  height: 40px;
  &:hover {
    background-color: #f5f7fa;
  }
}
</style>
