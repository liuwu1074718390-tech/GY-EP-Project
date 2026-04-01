<template>
  <div class="smart-pricing-container">
    <!-- 筛选区域（独立容器） -->
    <section class="filter-section glass-panel compact">
      <el-form :model="filterForm" class="filter-form" size="default">
        <div class="filter-row-primary">
          <!-- 核心筛选条件 -->
          <div class="filter-items">
            <el-form-item>
              <el-input 
                v-model="filterForm.taskName" 
                placeholder="输入名称" 
                class="filter-input-large"
                clearable 
              />
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="filterForm.createTimeRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 240px"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-select 
                v-model="filterForm.status" 
                placeholder="全部状态" 
                clearable 
                style="width: 120px"
              >
                <el-option label="待开始" value="pending" />
                <el-option label="组价中" value="processing" />
                <el-option label="组价完成" value="completed" />
                <el-option label="组价失败" value="failed" />
              </el-select>
            </el-form-item>
          </div>

          <!-- 操作按钮组 -->
          <div class="filter-btns">
            <el-button type="primary" @click="handleQuery" icon="Search" class="btn-search">查询</el-button>
            <el-button @click="handleReset" icon="Refresh" class="btn-reset">重置</el-button>
            <el-button 
              type="success" 
              icon="Plus" 
              @click="handleCreateTask"
              class="btn-add"
            >
              新建组价任务
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

        <!-- 高级筛选区域 -->
        <el-collapse-transition>
          <div v-show="showAdvanced" class="filter-row-secondary">
            <el-form-item>
              <el-input 
                v-model="filterForm.creator" 
                placeholder="输入人名" 
                class="filter-input-small"
                clearable 
              />
            </el-form-item>
          </div>
        </el-collapse-transition>
      </el-form>
    </section>

    <!-- 列表区域（独立容器） -->
    <section class="table-container-glass">
      <div class="table-body">
        <el-table 
          :data="paginatedData" 
          stripe
          class="custom-modern-table"
          style="width: 100%;"
          height="100%"
        >
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="60" align="center" fixed="left">
            <template #default="{ $index }">
              <span class="index-badge">{{ $index + 1 }}</span>
            </template>
          </el-table-column>

          <!-- 任务名称 -->
          <el-table-column label="组价任务名称" min-width="240">
            <template #default="{ row }">
              <div class="task-info-cell">
                <span class="task-name-text link-text" @click="handleView(row)">{{ row.taskName }}</span>
              </div>
            </template>
          </el-table-column>

          <!-- 组价进度 -->
          <el-table-column label="组价进度" width="180" align="center">
            <template #default="{ row }">
              <div class="progress-info-cell">
                <div class="progress-text-row">
                  <span class="progress-info">{{ row.pricedCount }}/{{ row.materialCount }}</span>
                </div>
                <el-progress 
                  :percentage="Math.round((row.pricedCount / row.materialCount) * 100)" 
                  :stroke-width="8"
                  :show-text="false"
                  :color="getProgressColor(row)"
                  class="task-progress-bar"
                />
              </div>
            </template>
          </el-table-column>

          <!-- 新增：创建人独立列 -->
          <el-table-column label="创建人" width="100" align="center">
            <template #default="{ row }">
              <span class="creator-text">{{ row.creator }}</span>
            </template>
          </el-table-column>

          <!-- 新增：创建时间独立列 -->
          <el-table-column label="创建时间" width="160" align="center">
            <template #default="{ row }">
              <span class="time-text">{{ row.createTime }}</span>
            </template>
          </el-table-column>

          <!-- 任务状态 -->
          <el-table-column label="状态" width="120" align="center">
            <template #default="{ row }">
              <div class="status-cell">
                <el-tooltip 
                  v-if="row.status === 'failed' && row.failReason" 
                  :content="row.failReason" 
                  placement="top"
                >
                  <el-tag :type="getStatusType(row.status)" effect="plain" class="status-tag">
                    {{ getStatusLabel(row.status) }}
                  </el-tag>
                </el-tooltip>
                <el-tag v-else :type="getStatusType(row.status)" effect="plain" class="status-tag">
                  {{ getStatusLabel(row.status) }}
                </el-tag>
              </div>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作" width="120" align="center" fixed="right">
            <template #default="{ row }">
              <div class="action-btns">
                <el-tooltip content="查看详情" placement="top">
                  <el-button link type="primary" @click="handleView(row)">
                    <el-icon><View /></el-icon>
                  </el-button>
                </el-tooltip>
                <el-divider direction="vertical" />
                <el-tooltip content="删除任务" placement="top">
                  <el-button link type="danger" @click="handleDelete(row)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页器 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="filteredData.length"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="handleQuery"
          @current-change="handleQuery"
        />
      </div>
    </section>

    <!-- 新建任务弹窗 -->
    <CreatePricingTaskDialog 
      v-model="createDialogVisible" 
      @success="handleTaskCreated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Refresh, Plus, View, Delete, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPricingTaskList, deletePricingTask } from '@/api/pricing'
import { TASK_STATUS_MAP } from '@/views/dashboard/mockPricingData'
import CreatePricingTaskDialog from './CreatePricingTaskDialog.vue'
import useUserStore from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

// 筛选表单
const filterForm = ref({
  taskName: '',
  creator: '',
  createTimeRange: null,
  status: ''
})

// 高级筛选展开状态
const showAdvanced = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(20)

// 任务列表数据
const taskList = ref([])
const filteredData = ref([])

// 分页后的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredData.value.slice(start, end)
})

// 加载任务列表
const loadTaskList = async () => {
  try {
    const res = await getPricingTaskList({
      taskName: filterForm.value.taskName,
      creator: filterForm.value.creator,
      createTimeStart: filterForm.value.createTimeRange?.[0],
      createTimeEnd: filterForm.value.createTimeRange?.[1],
      status: filterForm.value.status,
      userId: userStore.userId || 1001,
      userRole: userStore.roles?.[0] || 'user',
      pageNum: currentPage.value,
      pageSize: pageSize.value
    })
    taskList.value = res.records || []
    filteredData.value = taskList.value
  } catch (error) {
    ElMessage.error('加载任务列表失败')
  }
}

onMounted(() => {
  loadTaskList()
})

const handleQuery = () => {
  loadTaskList()
}

const handleReset = () => {
  filterForm.value = {
    taskName: '',
    creator: '',
    createTimeRange: null,
    status: ''
  }
  currentPage.value = 1
  loadTaskList()
}

const createDialogVisible = ref(false)
const handleCreateTask = () => {
  createDialogVisible.value = true
}

const handleTaskCreated = () => {
  loadTaskList()
  ElMessage.success('任务创建成功')
}

const handleView = (row) => {
  const { href } = router.resolve({
    path: '/workbench',
    query: { 
      tab: '组价详情',
      taskId: row.id,
      taskName: row.taskName
    }
  })
  window.open(href, '_blank')
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    '确定要删除该组价任务吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      try {
        await deletePricingTask(row.id)
        ElMessage.success('删除成功')
        loadTaskList()
      } catch (error) {
        ElMessage.error('删除失败')
      }
    })
    .catch(() => {})
}

const getStatusLabel = (status) => {
  return TASK_STATUS_MAP[status]?.label || status
}

const getStatusType = (status) => {
  return TASK_STATUS_MAP[status]?.type || 'info'
}

const getProgressColor = (row) => {
  if (row.status === 'completed') return '#67c23a'
  if (row.status === 'failed') return '#f56c6c'
  if (row.status === 'processing') return '#e6a23c'
  return '#1890ff'
}
</script>

<style lang="scss" scoped>
$primary-blue: #377cfd;
$bg-glass: rgba(255, 255, 255, 0.75);
$border-glass: rgba(255, 255, 255, 0.5);

.smart-pricing-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

// 玻璃拟态面板
.glass-panel {
  background: $bg-glass;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $border-glass;
  border-radius: 8px;
}

// 筛选区域
.filter-section {
  padding: 12px 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  
  .filter-form {
    .filter-row-primary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      
      .filter-items {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        :deep(.el-form-item) {
          margin-bottom: 0;
          margin-right: 12px;
          
          .el-form-item__label {
            font-size: 13px;
            font-weight: 700;
            color: #1d1d1f;
            padding-right: 8px;
          }
          
          .el-input__wrapper, .el-select__wrapper {
            border-radius: 8px;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.08) inset;
            &:hover { box-shadow: 0 0 0 1px $primary-blue inset; }
          }
        }
        
        .filter-input-large { width: 140px; }
      }
      
      .filter-btns {
        display: flex;
        align-items: center;
        gap: 10px;
        
        .btn-search { border-radius: 12px; padding: 0 20px; }
        .btn-reset { border-radius: 12px; background: rgba(0,0,0,0.03); border: none; color: #606266; }
        .btn-add { border-radius: 12px; background: #00c261; border: none; }
        
        .toggle-btn {
          font-size: 13px;
          color: $primary-blue;
          margin-left: 4px;
        }
      }
    }

    .filter-row-secondary {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px dashed rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;

      :deep(.el-form-item) {
        margin-bottom: 0;
        .el-form-item__label {
          font-size: 13px;
          font-weight: 700;
          color: #1d1d1f;
        }
        .el-input__wrapper {
          border-radius: 8px;
        }
      }
      .filter-input-small { width: 140px; }
    }
  }
}

// 表格区域
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
      padding: 12px 0;
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
    
    .creator-text {
      color: #1d1d1f;
      font-size: 13px;
    }
    
    .time-text {
      color: #1d1d1f;
      font-size: 13px;
      font-family: 'Monaco', monospace;
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

// 单元格内容
.task-info-cell {
  .task-name-text {
    font-size: 13px;
    font-weight: 600;
    color: #1d1d1f;
    
    &.link-text {
      color: $primary-blue;
      cursor: pointer;
      &:hover { text-decoration: underline; }
    }
  }
}

.progress-info-cell {
  width: 150px;
  margin: 0 auto;
  
  .progress-text-row {
    display: flex;
    justify-content: center;
    font-size: 12px;
    margin-bottom: 4px;
    .progress-info { color: #1d1d1f; font-weight: 700; }
  }
}

.status-cell {
  .status-tag {
    border-radius: 4px;
    font-weight: 600;
  }
}

.action-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  
  .el-button {
    font-size: 18px;
    transition: all 0.2s;
    &:hover { transform: scale(1.15); }
  }
  
  .el-divider { margin: 0 4px; border-color: rgba(0,0,0,0.05); }
}
</style>
