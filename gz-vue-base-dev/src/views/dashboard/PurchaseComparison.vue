<template>
  <div class="purchase-comparison">


    <!-- 主体：左右分栏 -->
    <div class="main-layout">
      <!-- 左：树形列表 -->
      <aside class="tree-panel glass-card">
        <div class="tree-header">
          <h3>项目材料清单</h3>
          <el-select 
            v-model="searchLevel" 
            placeholder="展开层级" 
            size="small" 
            style="width: 100px"
            clearable
          >
            <el-option label="项目" value="project" />
            <el-option label="工艺段" value="stage" />
            <el-option label="材料" value="material" />
          </el-select>
        </div>
        <div class="tree-search">
          <el-input 
            v-model="searchKeyword" 
            placeholder="搜索项目/工艺段/材料" 
            prefix-icon="Search"
            size="small"
            clearable
            style="width: 100%"
          />
        </div>
        <el-tree
          ref="treeRef"
          :data="defaultTreeData"
          node-key="id"
          :props="{ label: 'name', children: 'children' }"
          :default-expanded-keys="defaultExpandedKeys"
          :default-expand-all="false"
          :highlight-current="true"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <span class="tree-node">
              <el-icon v-if="data.type === 'project'" class="node-icon project-icon"><Folder /></el-icon>
              <el-icon v-else-if="data.type === 'stage'" class="node-icon stage-icon"><Operation /></el-icon>
              <el-icon v-else class="node-icon material-icon"><Box /></el-icon>
              <span class="node-label">{{ node.label }}</span>
              <el-tag 
                v-if="data.type === 'material' && data.data.winningBid" 
                size="small" 
                type="success" 
                effect="plain"
                class="winning-tag"
              >
                已中标
              </el-tag>
            </span>
          </template>
        </el-tree>
      </aside>

      <!-- 右：详情面板 -->
      <main class="detail-panel" v-if="selectedMaterial">
        <!-- 材料基本信息 -->
        <section class="material-info glass-card">
          <div class="info-header">
            <div>
              <h2>{{ selectedMaterial.name }}</h2>
              <p class="meta-info">
                <span><el-icon><Location /></el-icon> {{ selectedMaterial.projectName }}</span>
                <span><el-icon><MagicStick /></el-icon> {{ selectedMaterial.stageName }}</span>
              </p>
            </div>
            <div class="winning-info" v-if="selectedMaterial.winningBid">
              <div class="winning-label">中标价格</div>
              <div class="winning-price">¥{{ selectedMaterial.winningBid.price.toLocaleString() }}</div>
              <div class="winning-bidder">{{ selectedMaterial.winningBid.bidder }}</div>
            </div>
          </div>
          <div class="spec-info">
            <span><strong>规格：</strong>{{ selectedMaterial.specification }}</span>
            <span><strong>单位：</strong>{{ selectedMaterial.unit }}</span>
          </div>
        </section>

        <!-- 投标人报价对比 -->
        <section class="bid-comparison glass-card">
          <h3><el-icon><TrendCharts /></el-icon> 投标人报价对比</h3>
          <el-table 
            :data="selectedMaterial.bids" 
            stripe
            :row-class-name="getRowClassName"
            style="width: 100%; font-size: 13px"
            :header-cell-style="{ background: '#f7f8fa', color: '#1d1d1f', fontWeight: '600', fontSize: '13px' }"
          >
            <el-table-column label="投标企业" prop="bidder" min-width="180" show-overflow-tooltip />
            <el-table-column label="品牌" prop="brand" width="100" show-overflow-tooltip />
            <el-table-column label="不含税价(元)" prop="priceExcludingTax" width="115" align="right">
              <template #default="{ row }">
                {{ row.priceExcludingTax.toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column label="税率" prop="taxRate" width="70" align="center">
              <template #default="{ row }">{{ row.taxRate }}%</template>
            </el-table-column>
            <el-table-column label="含税价(元)" prop="priceIncludingTax" width="115" align="right">
              <template #default="{ row }">
                <strong style="color: #303133">{{ row.priceIncludingTax.toLocaleString() }}</strong>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="note" min-width="120" show-overflow-tooltip />
            <el-table-column label="状态" width="80" align="center">
              <template #default="{ row }">
                <el-tag v-if="row.isWinning" type="success" size="small">中标</el-tag>
                <span v-else style="color: #909399">未中标</span>
              </template>
            </el-table-column>
          </el-table>
        </section>

        <!-- 历史项目价格参考 -->
        <section class="historical-comparison glass-card">
          <div class="section-header-with-action">
            <h3><el-icon><DataLine /></el-icon> 历史项目价格参考</h3>
            <el-button 
              type="primary" 
              size="small" 
              @click="openProjectDialog"
              :icon="Filter"
            >
              参考项目选择
            </el-button>
          </div>
          <div class="price-cards">
            <!-- 当前项目卡片 -->
            <div class="price-card current-project">
              <div class="card-header">
                <el-icon class="project-icon"><Star /></el-icon>
                <span class="project-label">当前项目</span>
              </div>
              <div class="project-name">{{ selectedMaterial.projectName }}</div>
              <div class="price-amount" v-if="selectedMaterial.winningBid">¥{{ selectedMaterial.winningBid.price.toLocaleString() }}</div>
              <div class="price-amount" style="color: #909399; font-size: 16px;" v-else>未定标</div>
              <div class="card-footer">
                <span class="bidder-name" v-if="selectedMaterial.winningBid">{{ selectedMaterial.winningBid.bidder }}</span>
                <span class="bidder-name" v-else>---</span>
              </div>
            </div>

            <!-- 历史/参考项目卡片 -->
            <div 
              v-for="(item, index) in displayedHistoricalPrices.slice(0, 3)" 
              :key="index" 
              class="price-card"
            >
              <div class="card-header">
                <el-icon class="project-icon"><Memo /></el-icon>
                <span class="project-label">{{ selectedProjects.length > 0 ? '参考项目' : '历史参考' }}</span>
              </div>
              <div class="project-name">{{ item.projectName }}</div>
              <div class="price-amount" v-if="item.winningPrice">¥{{ item.winningPrice.toLocaleString() }}</div>
              <div class="price-amount" style="color: #909399; font-size: 16px;" v-else>暂无数据</div>
              <div class="change-rate" v-if="item.winningPrice && selectedMaterial.winningBid" :class="{ 'rate-up': item.changeRate > 0, 'rate-down': item.changeRate < 0 }">
                <el-icon v-if="item.changeRate > 0"><Top /></el-icon>
                <el-icon v-else-if="item.changeRate < 0"><Bottom /></el-icon>
                <span v-if="item.changeRate !== 0">{{ Math.abs(item.changeRate) }}%</span>
                <span v-else>--</span>
              </div>
              <div class="card-footer">
                <span class="bidder-name">{{ item.winningBidder }}</span>
                <el-button 
                  v-if="item.winningPrice"
                  link 
                  type="primary" 
                  size="small"
                  class="detail-btn"
                  @click="handleViewDetail(item)"
                >
                  详情<el-icon class="el-icon--right"><DArrowRight /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </section>

        <section class="gz-material-reference glass-card">
          <div class="section-header-with-action">
            <h3><el-icon><DataLine /></el-icon> 广咨材价库价格参考</h3>
          </div>
          <el-tabs v-model="activeFilterTab" class="material-reference-tabs">
            <el-tab-pane label="全部" name="all" />
            <el-tab-pane label="项目价" name="project" />
            <el-tab-pane label="厂商报价" name="vendor" />
            <el-tab-pane label="市场询价" name="market" />
            <el-tab-pane label="交易中标价" name="bid" />
            <el-tab-pane label="信息价" name="info" />
          </el-tabs>

          <div class="tab-content-wrapper">
            <el-table 
              :data="gzMaterialPriceReference" 
              stripe
              style="width: 100%; font-size: 13px"
              :header-cell-style="{ background: '#f7f8fa', color: '#1d1d1f', fontWeight: '600', fontSize: '13px' }"
            >
              <el-table-column label="序号" type="index" width="55" align="center" fixed />
              <el-table-column label="材料名称" width="100" show-overflow-tooltip fixed>
                <template #default="{ row }">
                  <span class="material-link">{{ row.materialName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格型号" min-width="120">
                <template #default="{ row }">
                  <el-tooltip 
                    :content="row.specification" 
                    placement="top" 
                    effect="dark"
                    :show-after="500"
                  >
                    <span style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: default;">
                      {{ row.specification }}
                    </span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="单位" prop="unit" width="50" align="center" />
              <el-table-column label="不含税价(元)" prop="priceExcludingTax" width="105" align="right">
                <template #default="{ row }">
                  <strong>{{ row.priceExcludingTax.toLocaleString() }}</strong>
                </template>
              </el-table-column>
              <el-table-column label="税率" prop="taxRate" width="55" align="center">
                <template #default="{ row }">
                  {{ row.taxRate }}%
                </template>
              </el-table-column>
              <el-table-column label="含税价(元)" prop="priceIncludingTax" width="105" align="right">
                <template #default="{ row }">
                  {{ row.priceIncludingTax.toLocaleString() }}
                </template>
              </el-table-column>
              <el-table-column label="发布日期" prop="period" width="90" align="center" />
              <el-table-column label="地区" prop="region" width="70" align="center" />
              <el-table-column label="数据渠道" prop="source" width="90" align="center" />
            </el-table>
          </div>
        </section>
      </main>

      <!-- 空状态 -->
      <main class="empty-panel glass-card" v-else>
        <el-empty description="请从左侧选择材料查看详情">
          <template #image>
            <el-icon style="font-size: 64px; color: #c8c9cc"><Box /></el-icon>
          </template>
        </el-empty>
      </main>
    </div>

    <!-- 项目选择对话框 -->
    <el-dialog
      v-model="projectDialogVisible"
      title="选择参考项目"
      width="600px"
      :close-on-click-modal="false"
      class="custom-glass-dialog"
    >
      <!-- 搜索框 -->
      <el-input
        v-model="projectSearchKeyword"
        placeholder="搜索项目名称"
        prefix-icon="Search"
        clearable
        style="margin-bottom: 20px"
      />

      <!-- 项目列表 -->
      <div class="project-list">
        <div
          v-for="project in availableProjects"
          :key="project.id"
          :class="['project-item', { 
            'selected': isProjectSelected(project.id),
            'disabled': !isProjectSelectable(project.id)
          }]"
          @click="isProjectSelectable(project.id) && handleProjectToggle(project.id)"
        >
          <div class="project-item-inner">
            <el-checkbox 
              :model-value="isProjectSelected(project.id)"
              :disabled="!isProjectSelectable(project.id)"
              @click.stop
              @change="handleProjectToggle(project.id)"
            />
            <div class="project-info">
              <div class="project-name-text">{{ project.name }}</div>
              <div class="project-meta">
                <span>{{ project.stageCount }} 个工艺段</span>
                <span>{{ project.materialCount }} 种材料</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 已选提示 -->
      <div class="selection-tip">
        已选 {{ selectedProjects.length }}/3 个项目
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button class="btn-cancel" @click="projectDialogVisible = false">取消</el-button>
          <el-button class="btn-submit" type="primary" @click="confirmProjectSelection">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { 
  Search, Folder, Operation, Box, Location, MagicStick, 
  TrendCharts, DataLine, Star, Memo, Top, Bottom, Filter, DArrowRight 
} from '@element-plus/icons-vue'
import { defaultTreeData, findMaterialById, getAllProjectsInfo, findMaterialInProjectById, findMaterialIdByProjectName } from './mockPurchaseData'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 搜索关键词和层级控制
const searchKeyword = ref('')
const searchLevel = ref('')

// 树形数据
const treeRef = ref(null)
const defaultExpandedKeys = ref([])

// 项目选择对话框
const projectDialogVisible = ref(false)
const selectedProjects = ref([]) // 用户选择的项目ID列表
const projectSearchKeyword = ref('') // 项目搜索关键词

// 监听搜索关键词变化
watch(searchKeyword, (val) => {
  treeRef.value?.filter(val)
})

// 监听层级选择变化
watch(searchLevel, (level) => {
  if (!level) return
  setTreeExpansion(level)
})

// 设置树展开层级
const setTreeExpansion = (level) => {
  const store = treeRef.value?.store
  if (!store) return

  // 递归设置节点展开状态
  const traverse = (nodes) => {
    nodes.forEach(node => {
      // 这里的 node 是 el-tree 的 Node 对象
      
      if (level === 'project') {
        // 项目级别：只显示项目，意味着项目节点本身折叠
        if (node.level === 1) node.expanded = false
      } 
      else if (level === 'stage') {
        // 工艺段级别：展开项目，折叠工艺段
        if (node.level === 1) node.expanded = true
        if (node.level === 2) node.expanded = false
      } 
      else if (level === 'material') {
        // 材料级别：全部展开
        node.expanded = true
      }
      
      // 递归处理子节点
      if (node.childNodes && node.childNodes.length > 0) {
        traverse(node.childNodes)
      }
    })
  }
  
  traverse(store.root.childNodes)
}

// 树节点筛选方法（仅搜索关键词）
const filterNode = (value, data, node) => {
  if (!value) return true
  
  if (data.name.includes(value)) return true
  
  let parent = node.parent
  while (parent && parent.level > 0) {
    if (parent.data.name && parent.data.name.includes(value)) {
      return true
    }
    parent = parent.parent
  }
  
  return false
}

// 选中的材料
const selectedMaterial = ref(null)

// 广咨材价库过滤选项卡
const activeFilterTab = ref('all')

// 图表引用
const priceChartRef = ref(null)

// 可选项目列表(过滤后)
const availableProjects = computed(() => {
  const allProjects = getAllProjectsInfo()
  if (!projectSearchKeyword.value) return allProjects
  
  return allProjects.filter(p => 
    p.name.includes(projectSearchKeyword.value)
  )
})

// 动态历史价格数据
const displayedHistoricalPrices = computed(() => {
  if (!selectedMaterial.value) return []
  
  // 如果没有选择项目,使用默认数据
  if (selectedProjects.value.length === 0) {
    return selectedMaterial.value.historicalPrices || []
  }
  
  // 根据选中项目动态生成对比数据
  const currentPrice = selectedMaterial.value.winningBid?.price
  const materialName = selectedMaterial.value.name
  const specification = selectedMaterial.value.specification
  
  const comparisonData = []
  
  for (const projectId of selectedProjects.value) {
    const material = findMaterialInProjectById(projectId, materialName, specification)
    
    if (material && material.winningBid) {
      const referencePrice = material.winningBid.price
      let changeRate = 0
      
      // 只有当前材料有中标价时才计算涨跌幅
      if (currentPrice) {
        changeRate = parseFloat((((referencePrice - currentPrice) / currentPrice) * 100).toFixed(1))
      }
      
      comparisonData.push({
        projectName: material.projectName,
        winningPrice: referencePrice,
        changeRate: changeRate,
        winningBidder: material.winningBid.bidder
      })
    } else {
      // 项目中没有找到匹配材料
      comparisonData.push({
        projectName: findProjectNameById(projectId),
        winningPrice: null,
        changeRate: 0,
        winningBidder: '暂无数据'
      })
    }
  }
  
  return comparisonData
})

// 根据项目ID查找项目名称
const findProjectNameById = (projectId) => {
  const project = getAllProjectsInfo().find(p => p.id === projectId)
  return project?.name || '未知项目'
}

// 广咨材价库价格参考数据
const gzMaterialPriceReference = computed(() => {
  if (!selectedMaterial.value) return []
  
  const materialName = selectedMaterial.value.name
  const specification = selectedMaterial.value.specification
  const unit = selectedMaterial.value.unit || '台'
  const basePrice = selectedMaterial.value.winningBid?.price || 5000
  
  // 生成模拟的材价库参考数据
  const months = ['2025-01', '2024-12', '2024-11', '2024-10', '2024-09', '2024-08']
  const regions = ['广州市', '深圳市', '佛山市', '珠海市', '东莞市']
  const sources = ['广材网', '指标库', '慧讯网', '交易中心']
  
  return months.map((month, index) => {
    // 基于基础价格和随机波动生成模拟价格
    const fluctuation = (Math.random() - 0.5) * 0.1 // ±5% 波动
    const priceExcludingTax = Math.round(basePrice * (1 + fluctuation))
    const taxRate = 13
    const priceIncludingTax = Math.round(priceExcludingTax * (1 + taxRate / 100))
    
    return {
      materialName: materialName,
      specification: specification,
      unit: unit,
      priceExcludingTax: priceExcludingTax,
      taxRate: taxRate,
      priceIncludingTax: priceIncludingTax,
      period: month,
      region: regions[index % regions.length],
      source: sources[index % sources.length]
    }
  })
})

// 监听当前选中材料变化
watch(selectedMaterial, () => {
  // 可以根据需要添加选中新材料后的逻辑
})

// 打开项目选择对话框
const openProjectDialog = () => {
  projectDialogVisible.value = true
}

// 确认选择
const confirmProjectSelection = () => {
  projectDialogVisible.value = false
  projectSearchKeyword.value = '' // 清空搜索
}

// 处理项目选择变化
const handleProjectToggle = (projectId) => {
  const index = selectedProjects.value.indexOf(projectId)
  if (index > -1) {
    // 取消选择
    selectedProjects.value.splice(index, 1)
  } else {
    // 选择项目(最多3个)
    if (selectedProjects.value.length < 3) {
      selectedProjects.value.push(projectId)
    }
  }
}

// 判断项目是否已选中
const isProjectSelected = (projectId) => {
  return selectedProjects.value.includes(projectId)
}

// 判断项目是否可选
const isProjectSelectable = (projectId) => {
  return isProjectSelected(projectId) || selectedProjects.value.length < 3
}

// 节点点击事件
const handleNodeClick = (data) => {
  // 只有点击材料节点才加载详情
  if (data.type === 'material') {
    selectedMaterial.value = findMaterialById(data.id)
  }
}

// 查看历史参考项目详情
const handleViewDetail = (item) => {
  if (!item.winningPrice || !selectedMaterial.value) return
  
  // 查找该材料在参考项目中的ID
  const materialInfo = findMaterialIdByProjectName(
    item.projectName,
    selectedMaterial.value.name,
    selectedMaterial.value.specification
  )
  
  if (materialInfo) {
    // 构造URL
    const url = `/workbench?tab=采购比价&projectId=${materialInfo.projectId}&stageId=${materialInfo.stageId}&materialId=${materialInfo.materialId}`
    // 在新标签页打开
    window.open(url, '_blank')
  }
}

// 初始化：默认展开并选中第一个材料，或根据URL参数展开指定材料
onMounted(() => {
  // 检查URL参数
  const urlProjectId = route.query.projectId
  const urlStageId = route.query.stageId
  const urlMaterialId = route.query.materialId
  
  if (urlProjectId && urlStageId && urlMaterialId) {
    // 从URL参数定位材料
    nextTick(() => {
      const keysToExpand = [urlProjectId, urlStageId]
      defaultExpandedKeys.value = keysToExpand
      
      nextTick(() => {
        if (treeRef.value) {
          treeRef.value.setCurrentKey(urlMaterialId)
          selectedMaterial.value = findMaterialById(urlMaterialId)
        }
      })
    })
  } else if (defaultTreeData.length > 0) {
    // 默认行为：展开第一个材料
    const firstProject = defaultTreeData[0]
    // 默认展开第一个项目
    const keysToExpand = [firstProject.id]
    
    if (firstProject.children && firstProject.children.length > 0) {
      const firstStage = firstProject.children[0]
      // 默认展开第一个工艺段
      keysToExpand.push(firstStage.id)
      
      if (firstStage.children && firstStage.children.length > 0) {
        const firstMaterial = firstStage.children[0]
        
        defaultExpandedKeys.value = keysToExpand
        
        // 自动选中第一个材料
        nextTick(() => {
          if (treeRef.value) {
            treeRef.value.setCurrentKey(firstMaterial.id)
            selectedMaterial.value = findMaterialById(firstMaterial.id)
          }
        })
      }
    }
  }
})

// 表格行样式
const getRowClassName = ({ row }) => {
  return row.isWinning ? 'winning-row' : ''
}

</script>

<style lang="scss" scoped>
$glass-bg: rgba(255, 255, 255, 0.75);
$glass-border: rgba(255, 255, 255, 0.5);
$primary-blue: #377cfd;
$success-green: #67c23a;
$text-main: #1d1d1f;

.purchase-comparison {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  height: 100%;
  min-height: 0;
  overflow: hidden;


  .glass-card {
    background: $glass-bg;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid $glass-border;
    border-radius: 8px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);
    padding: 12px 16px;
    
    &.compact {
      padding: 10px 16px;
    }

    h3 {
      font-size: 14px;
      font-weight: 700;
      color: $text-main;
      margin: 0 0 10px 0;
      display: flex;
      align-items: center;
      gap: 8px;

      .el-icon {
        color: $primary-blue;
        font-size: 18px;
      }
    }
  }

  .filter-bar {
    flex-shrink: 0;
  }

  .main-layout {
    flex: 1;
    display: flex;
    gap: 12px;
    min-height: 0;
    overflow: hidden;
    align-items: stretch;

    .tree-panel {
      width: 300px;
      height: 100%;
      min-height: 0;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .tree-header {
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(0,0,0,0.06);
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          font-size: 14px;
          font-weight: 700;
          margin: 0;
        }
      }

      .tree-search {
        margin-bottom: 12px;
        padding: 0 4px;
      }

      .el-tree {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        font-size: 13px;

        :deep(.el-tree-node__content) {
          height: 36px;
          padding-right: 8px;
          
          &:hover {
            background-color: #e6f0ff;
          }
        }

        :deep(.is-current > .el-tree-node__content) {
          background-color: rgba($primary-blue, 0.1);
          font-weight: 600;
        }

        .tree-node {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;

          .node-icon {
            font-size: 16px;
            
            &.project-icon { color: #409eff; }
            &.stage-icon { color: #67c23a; }
            &.material-icon { color: #e6a23c; }
          }

          .node-label {
            flex: 1;
          }

          .winning-tag {
            font-size: 11px;
            padding: 0 4px;
            height: 18px;
            line-height: 18px;
          }
        }
      }
    }

    .detail-panel {
      flex: 1;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;
      min-width: 0;

      .material-info {
        flex-shrink: 0;
        // 覆盖默认卡片内边距，使其更紧凑
        &.glass-card {
          padding: 12px 20px !important;
        }

        .info-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px; // 减小标题与规格区的间距

          h2 {
            font-size: 18px; // 稍微减小标题字号
            font-weight: 700;
            margin: 0 0 4px 0;
            color: $text-main;
          }

          .meta-info {
            display: flex;
            gap: 20px;
            font-size: 12px;
            color: #606266;
            margin: 0;

            span {
              display: flex;
              align-items: center;
              gap: 4px;

              .el-icon {
                font-size: 14px;
              }
            }
          }

          .winning-info {
            text-align: right;
            padding: 8px 12px; // 减小中标价卡片内边距
            background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
            border-radius: 8px;
            border: 1px solid #bae7ff;
            min-width: 140px;

            .winning-label {
              font-size: 11px;
              color: #606266;
              margin-bottom: 2px;
            }

            .winning-price {
              font-size: 20px; // 稍微减小价格字号
              font-weight: 700;
              color: $success-green;
              margin-bottom: 2px;
            }

            .winning-bidder {
              font-size: 11px;
              color: #909399;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        .spec-info {
          display: flex;
          gap: 32px;
          padding: 8px 12px; // 减小规格区内边距
          background: rgba(0,0,0,0.02);
          border-radius: 6px;
          font-size: 12px; // 减小规格字体
          color: #606266;
          line-height: 1.4;
        }
      }

      .bid-comparison {
        flex-shrink: 0;
        :deep(.el-table) {
          border-radius: 12px;
          overflow: hidden;

          .winning-row {
            background-color: #e6f7ed !important;
            font-weight: 600;

            &:hover > td {
              background-color: #d9f2e1 !important;
            }
          }

          tr:hover > td {
            background-color: #e6f0ff !important;
          }
        }
      }

      .historical-comparison {
        flex: none;
        min-height: auto;
        
        .section-header-with-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          
          h3 {
            margin: 0;
          }
        }
        
        .price-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          width: 100%;
          box-sizing: border-box;

          .price-card {
            padding: 12px;
            background: white;
            border-radius: 12px;
            border: 1px solid #e4e7ed;
            transition: all 0.3s;
            min-width: 0;
            overflow: hidden;
            display: flex;
            flex-direction: column;

            &:hover {
              box-shadow: 0 6px 16px rgba(0,0,0,0.08);
              transform: translateY(-2px);
            }

            &.current-project {
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              border-color: $primary-blue;
            }

            .card-header {
              display: flex;
              align-items: center;
              gap: 6px;
              margin-bottom: 4px;

              .project-icon {
                font-size: 16px;
                color: $primary-blue;
              }

              .project-label {
                font-size: 12px;
                color: #909399;
              }
            }

            .project-name {
              font-size: 13px;
              font-weight: 600;
              color: $text-main;
              margin-bottom: 4px;
              min-height: 32px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }

            .price-amount {
              font-size: 20px;
              font-weight: 700;
              color: #303133;
              margin-bottom: 4px;
            }

            .change-rate {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 4px;

              &.rate-up {
                color: #f56c6c;

                .el-icon {
                  color: #f56c6c;
                }
              }

              &.rate-down {
                color: $success-green;

                .el-icon {
                  color: $success-green;
                }
              }
            }

            .card-footer {
              padding-top: 8px;
              border-top: 1px solid #e4e7ed;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .bidder-name {
                font-size: 11px;
                color: #909399;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex: 1;
                margin-right: 8px;
              }
              
              .detail-btn {
                font-size: 12px;
                padding: 2px 8px;
                flex-shrink: 0;
                
                &:hover {
                  background: rgba($primary-blue, 0.1);
                }
              }
            }
          }
        }
      }
      
      .gz-material-reference {
        flex: none;
        min-height: auto;
        
        .section-header-with-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          
          h3 {
            margin: 0;
          }
        }
        
        .price-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;

          .price-card {
            padding: 16px;
            background: white;
            border-radius: 12px;
            border: 1px solid #e4e7ed;
            transition: all 0.3s;

            &:hover {
              box-shadow: 0 6px 16px rgba(0,0,0,0.08);
              transform: translateY(-4px);
            }

            .card-header {
              display: flex;
              align-items: center;
              gap: 6px;
              margin-bottom: 8px;

              .project-icon {
                font-size: 16px;
                color: $primary-blue;
              }

              .project-label {
                font-size: 12px;
                color: #909399;
              }
            }

            .project-name {
              font-size: 13px;
              font-weight: 600;
              color: $text-main;
              margin-bottom: 4px;
              min-height: 32px;
            }

            .price-amount {
              font-size: 20px;
              font-weight: 700;
              color: #303133;
              margin-bottom: 8px;
            }

            .change-rate {
              display: flex;
              align-items: center;
              gap: 4px;
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 8px;

              &.rate-up {
                color: #f56c6c;

                .el-icon {
                  color: #f56c6c;
                }
              }

              &.rate-down {
                color: $success-green;

                .el-icon {
                  color: $success-green;
                }
              }
            }

            .card-footer {
              padding-top: 8px;
              border-top: 1px solid #e4e7ed;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .bidder-name {
                font-size: 11px;
                color: #909399;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex: 1;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }

    .empty-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

// 项目选择对话框样式
:deep(.custom-glass-dialog) {
  .el-dialog__body {
    padding: 20px;
  }
  
  .project-list {
    max-height: 400px;
    overflow-y: auto;
    padding: 4px;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.1);
      border-radius: 3px;
      
      &:hover {
        background: rgba(0,0,0,0.2);
      }
    }
    
    .project-item {
      padding: 16px; // 增加内边距
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      margin-bottom: 12px; // 增加项之间的间距
      cursor: pointer;
      transition: all 0.2s;
      background: white;
      
      &:hover:not(.disabled) {
        background: #f8faff;
        border-color: #377cfd;
        box-shadow: 0 4px 12px rgba(55, 124, 253, 0.08);
      }
      
      &.selected {
        background: #f0f7ff;
        border-color: #377cfd;
      }
      
      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .project-item-inner {
        display: flex;
        align-items: flex-start; // 顶部对齐

        :deep(.el-checkbox) {
          margin-top: 2px; // 复选框稍微下移一点，对齐首行文字
          height: auto;
        }
      }
      
      .project-info {
        margin-left: 14px; // 增加复选框与文字的间距
        flex: 1;
        
        .project-name-text {
          font-size: 14px;
          font-weight: 600;
          color: #1d1d1f;
          margin-bottom: 6px; // 增加标题与副标题的间距
          line-height: 1.4;
        }
        
        .project-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #86868b;
          
          span {
            display: flex;
            align-items: center;
            
            &:before {
              content: '';
              width: 3px;
              height: 3px;
              border-radius: 50%;
              background: #d1d1d6;
              margin-right: 6px;
            }
          }
        }
      }
    }
  }
  
  .selection-tip {
    text-align: center;
    color: #909399;
    font-size: 13px;
    margin-top: 12px;
    padding: 8px;
    background: rgba($primary-blue, 0.05);
    border-radius: 6px;
  }
  .gz-material-reference {
    .material-reference-tabs {
      margin-top: -10px;
      margin-bottom: 5px;
      
      :deep(.el-tabs__header) {
        margin-bottom: 0px;
        border-bottom: none;
      }
      
      :deep(.el-tabs__nav-wrap::after) {
        display: none;
      }
    }
    
    .tab-content-wrapper {
      padding-top: 10px;
    }

    .material-link {
      color: $primary-blue;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
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
  margin-top: 12vh !important; // 居中一些
  margin-bottom: 8vh !important;
  max-height: 75vh;
  
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
    overflow: hidden; // 移除外侧不必要的滚动条
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
