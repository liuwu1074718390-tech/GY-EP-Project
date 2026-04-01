<template>
  <div class="material-standard-container">
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
      <section class="tabs-panel-glass">
        <div class="tabs-header-row">
          <el-tabs v-model="activeTab" class="material-tabs" @tab-change="handleTabChange">
            <el-tab-pane label="标准工料机" name="standard_material" />
            <el-tab-pane label="标准规格型号" name="standard_spec_model" />
            <el-tab-pane label="标准单位" name="standard_unit" />
            <el-tab-pane label="标准工艺段" name="standard_process_segment" />
            <el-tab-pane label="标准化复核" name="standard_review" />
          </el-tabs>
          <el-button
            type="primary"
            :loading="knowledgeSyncLoading"
            icon="RefreshRight"
            class="knowledge-sync-btn"
            @click="handleSyncKnowledge"
          >
            更新知识库
          </el-button>
        </div>
      </section>

      <template v-if="activeTab === 'standard_material'">
        <section class="filter-panel-glass">
          <el-form :model="queryForm" size="default" class="custom-query-form standard-material-query-form">
            <div class="filter-row-primary">
              <div class="filter-inputs">
                <el-form-item>
                  <el-input v-model="queryForm.materialName" placeholder="输入材料名称" clearable style="width: 220px" />
                </el-form-item>
                <el-form-item>
                  <el-input v-model="queryForm.specification" placeholder="输入规格型号" clearable style="width: 220px" />
                </el-form-item>
              </div>
              <div class="action-group">
                <el-button type="primary" @click="handleQuery" icon="Search" class="btn-search">查询</el-button>
                <el-button @click="handleReset" icon="Refresh" class="btn-reset">重置</el-button>
                <el-button link type="primary" @click="showMaterialAdvanced = !showMaterialAdvanced" class="btn-advanced">
                  {{ showMaterialAdvanced ? '收起' : '高级' }}
                  <el-icon class="el-icon--right"><component :is="showMaterialAdvanced ? 'ArrowUp' : 'ArrowDown'" /></el-icon>
                </el-button>
              </div>
            </div>

            <el-collapse-transition>
              <div v-show="showMaterialAdvanced" class="filter-row-secondary">
                <el-form-item>
                  <el-input v-model="queryForm.materialCode" placeholder="输入编码" clearable style="width: 180px" />
                </el-form-item>
                <el-form-item>
                  <el-select v-model="queryForm.unitId" placeholder="单位" clearable style="width: 140px">
                    <el-option v-for="item in unitList" :key="item.id" :label="getUnitDisplayName(item)" :value="item.id" />
                  </el-select>
                </el-form-item>
              </div>
            </el-collapse-transition>
          </el-form>
        </section>

        <section class="table-container-glass">
          <el-table :data="tableData" style="width: 100%" v-loading="loading" class="custom-modern-table">
            <el-table-column type="index" label="序号" width="60" align="center" fixed="left" />
            <el-table-column prop="materialCode" label="材料编码" width="130" align="center" fixed="left" />
            <el-table-column prop="materialName" label="材料名称" min-width="220" fixed="left" show-overflow-tooltip />
            <el-table-column prop="specification" label="规格型号" min-width="200" show-overflow-tooltip />
            <el-table-column label="单位" width="80" align="center">
              <template #default="{ row }">
                {{ getUnitDisplayName(row) }}
              </template>
            </el-table-column>
            <el-table-column label="分类" min-width="240" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.categoryPath || [row.categoryLevel1Name, row.categoryLevel2Name, row.categoryLevel3Name].filter(Boolean).join('/') }}
              </template>
            </el-table-column>
          </el-table>

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
      </template>

      <template v-else-if="activeTab === 'standard_spec_model'">
        <section class="filter-panel-glass">
          <el-form :model="specQueryForm" inline size="default" class="custom-query-form" @submit.prevent>
            <div class="filter-inputs">
              <el-form-item>
                <el-input
                  v-model="specQueryForm.standardName"
                  placeholder="输入标准名称"
                  clearable
                  style="width: 220px"
                  @keydown.enter.prevent="handleSpecQuery"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="specQueryForm.specKeyword"
                  placeholder="输入规格型号"
                  clearable
                  style="width: 220px"
                  @keydown.enter.prevent="handleSpecQuery"
                />
              </el-form-item>
            </div>
            <div class="filter-btns">
              <el-button type="primary" @click="handleSpecQuery" icon="Search" class="btn-search">查询</el-button>
              <el-button @click="handleSpecReset" icon="Refresh" class="btn-reset">重置</el-button>
              <el-button type="success" @click="handleAddSpecModel" icon="Plus" class="btn-add">新增标准规格型号</el-button>
            </div>
          </el-form>
        </section>

        <section class="table-container-glass">
          <el-table :data="specTableData" style="width: 100%" v-loading="specLoading" class="custom-modern-table">
            <el-table-column type="index" label="序号" width="60" align="center" fixed="left" />
            <el-table-column prop="standardName" label="标准材料名称" min-width="200" fixed="left" />
            <el-table-column prop="specSummary" label="规格型号" min-width="360" show-overflow-tooltip />
            <el-table-column label="单位" width="110">
              <template #default="{ row }">
                <el-space wrap>
                  <el-tag v-for="u in getSpecUnitLabels(row)" :key="u" size="small" effect="plain">{{ u }}</el-tag>
                </el-space>
              </template>
            </el-table-column>
            <el-table-column label="所属分类" min-width="240" show-overflow-tooltip>
              <template #default="{ row }">
                {{ getSpecCategoryFullPath(row) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="110" align="center" fixed="right">
              <template #default="{ row }">
                <div class="action-btns">
                  <el-button link type="primary" @click="handleEditSpecModel(row)">
                    <el-icon><EditPen /></el-icon>
                  </el-button>
                  <el-divider direction="vertical" />
                  <el-button link type="danger" @click="handleDeleteSpecModel(row)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="specQueryForm.pageNum"
              v-model:page-size="specQueryForm.pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="specTotal"
              layout="total, sizes, prev, pager, next, jumper"
              background
              @size-change="handleSpecQuery"
              @current-change="handleSpecQuery"
            />
          </div>
        </section>
      </template>

      <template v-else-if="activeTab === 'standard_unit'">
        <section class="filter-panel-glass">
          <el-form :model="unitQueryForm" inline size="default" class="custom-query-form">
            <div class="filter-inputs">
              <el-form-item>
                <el-input v-model="unitQueryForm.unitName" placeholder="输入单位名称" clearable style="width: 220px" />
              </el-form-item>
            </div>
            <div class="filter-btns">
              <el-button type="primary" @click="handleUnitQuery" icon="Search" class="btn-search">查询</el-button>
              <el-button @click="handleUnitReset" icon="Refresh" class="btn-reset">重置</el-button>
              <el-button type="success" @click="handleAddUnit" icon="Plus" class="btn-add">新增标准单位</el-button>
            </div>
          </el-form>
        </section>

        <section class="table-container-glass">
          <el-table :data="unitTableData" style="width: 100%" v-loading="unitLoading" class="custom-modern-table">
            <el-table-column type="index" label="序号" width="60" align="center" fixed="left" />
            <el-table-column label="单位名称" min-width="220">
              <template #default="{ row }">
                {{ getUnitDisplayName(row) }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100" align="center">
              <template #default="{ row }">
                <el-tag size="small" :type="row.status === '1' ? 'success' : 'info'">
                  {{ row.status === '1' ? '正常' : '停用' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="110" align="center" fixed="right">
              <template #default="{ row }">
                <div class="action-btns">
                  <el-button link type="primary" @click="handleEditUnit(row)">
                    <el-icon><EditPen /></el-icon>
                  </el-button>
                  <el-divider direction="vertical" />
                  <el-button link type="danger" @click="handleDeleteUnit(row)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="unitQueryForm.pageNum"
              v-model:page-size="unitQueryForm.pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="unitTotal"
              layout="total, sizes, prev, pager, next, jumper"
              background
              @size-change="handleUnitQuery"
              @current-change="handleUnitQuery"
            />
          </div>
        </section>
      </template>

      <template v-else-if="activeTab === 'standard_process_segment'">
        <section class="filter-panel-glass">
          <el-form :model="processSegmentQueryForm" inline size="default" class="custom-query-form">
            <div class="filter-inputs">
              <el-form-item>
                <el-input v-model="processSegmentQueryForm.segmentName" placeholder="输入工艺段名称" clearable style="width: 220px" />
              </el-form-item>
            </div>
            <div class="filter-btns">
              <el-button type="primary" @click="handleProcessSegmentQuery" icon="Search" class="btn-search">查询</el-button>
              <el-button @click="handleProcessSegmentReset" icon="Refresh" class="btn-reset">重置</el-button>
              <el-button type="success" @click="handleAddProcessSegment" icon="Plus" class="btn-add">新增标准工艺段</el-button>
            </div>
          </el-form>
        </section>

        <section class="table-container-glass">
          <el-table :data="processSegmentTableData" style="width: 100%" v-loading="processSegmentLoading" class="custom-modern-table">
            <el-table-column type="index" label="序号" width="60" align="center" fixed="left" />
            <el-table-column prop="segmentName" label="工艺段名称" min-width="280" />
            <el-table-column label="操作" width="110" align="center" fixed="right">
              <template #default="{ row }">
                <div class="action-btns">
                  <el-button link type="primary" @click="handleEditProcessSegment(row)">
                    <el-icon><EditPen /></el-icon>
                  </el-button>
                  <el-divider direction="vertical" />
                  <el-button link type="danger" @click="handleDeleteProcessSegment(row)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-wrapper">
            <el-pagination
              v-model:current-page="processSegmentQueryForm.pageNum"
              v-model:page-size="processSegmentQueryForm.pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="processSegmentTotal"
              layout="total, sizes, prev, pager, next, jumper"
              background
              @size-change="handleProcessSegmentQuery"
              @current-change="handleProcessSegmentQuery"
            />
          </div>
        </section>
      </template>

      <template v-else>
        <MaterialStandardReviewTab :selected-category="selectedCategory" />
      </template>
    </main>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      :close-on-click-modal="false"
      @close="handleDialogClose"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" size="default">
        <el-form-item label="材料名称" prop="materialName">
          <el-input v-model="formData.materialName" placeholder="请输入材料名称" maxlength="200" show-word-limit />
        </el-form-item>

        <el-form-item label="材料分类" prop="categoryIds">
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

        <el-form-item label="规格型号" prop="specId">
          <el-select v-model="formData.specId" placeholder="请选择规格型号" filterable style="width: 100%" @change="generateCode">
            <el-option v-for="item in specList" :key="item.id" :label="`${item.specName} (${item.specCode})`" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="计量单位" prop="unitId">
          <el-select v-model="formData.unitId" placeholder="请选择计量单位" style="width: 100%" @change="generateCode">
            <el-option v-for="item in unitList" :key="item.id" :label="getUnitDisplayName(item)" :value="item.id" />
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
          <el-input v-model="formData.remark" type="textarea" :rows="3" placeholder="请输入备注信息" maxlength="500" show-word-limit />
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

    <el-dialog
      v-model="specDialogVisible"
      :title="specDialogTitle"
      width="760px"
      class="spec-model-dialog"
      align-center
      :close-on-click-modal="false"
      @close="handleSpecDialogClose"
    >
      <div ref="specDialogScrollRef" class="spec-dialog-scroll">
        <el-form ref="specFormRef" :model="specFormData" label-width="120px" size="default">
          <el-form-item label="标准材料名称" required>
            <el-input v-model="specFormData.standardName" placeholder="请输入标准材料名称" maxlength="200" />
          </el-form-item>

          <el-form-item label="所属分类" required>
            <el-cascader
              v-model="specFormData.categoryPath"
              :options="specCategoryOptions"
              :props="specCategoryCascaderProps"
              placeholder="请选择所属分类，如：设备/通用设备/闸门"
              clearable
              filterable
              style="width: 100%"
              @change="handleSpecCategoryChange"
            />
          </el-form-item>

          <el-form-item label="单位(可多选)" required>
            <el-select
              v-model="specFormData.unitIds"
              multiple
              filterable
              clearable
              style="width: 100%"
              placeholder="请选择单位库中的单位"
            >
              <el-option v-for="item in unitList" :key="item.id" :label="getUnitDisplayName(item)" :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item label="规格型号" class="spec-model-label">
            <div class="spec-items-box">
              <div class="spec-toolbar">
                <div class="spec-counter">共 {{ specFormData.specItems.length }} 项</div>
                <el-button type="primary" plain @click="addSpecItem">
                  <el-icon><Plus /></el-icon>
                  新增规格项
                </el-button>
              </div>

              <div v-if="!specFormData.specItems.length" class="spec-empty-panel">未填写规格项（选填）</div>

              <div v-for="(item, idx) in specFormData.specItems" :key="idx" :ref="(el) => setSpecItemCardRef(el, idx)" class="spec-item-card">
                <div class="spec-item-header">
                  <div class="spec-item-title">
                    <el-input
                      v-model="item.specKey"
                      class="spec-item-name-input"
                      placeholder="规格名称，如：功率"
                    />
                    <span class="spec-item-meta">{{ getSpecValueCount(item) }} 个规格值</span>
                  </div>
                  <div class="spec-item-actions">
                    <el-tooltip :content="item.collapsed ? '展开规格项' : '收起规格项'" placement="top">
                      <el-button text circle @click="toggleSpecItem(item)">
                        <el-icon><component :is="item.collapsed ? ArrowDown : ArrowUp" /></el-icon>
                      </el-button>
                    </el-tooltip>
                    <el-tooltip content="删除规格项" placement="top">
                      <el-button type="danger" text circle @click="removeSpecItem(idx)">
                        <el-icon><Delete /></el-icon>
                      </el-button>
                    </el-tooltip>
                  </div>
                </div>

                <div v-show="!item.collapsed" class="spec-card-body">
                  <div class="spec-values-list">
                    <div class="spec-value-adder">
                      <el-input
                        v-model="item.draftValue"
                        placeholder="输入规格值后按 Enter 添加，如：3kW"
                        @keydown.enter.prevent="addSpecValue(item)"
                      />
                      <el-button type="primary" plain @click="addSpecValue(item)">
                        <el-icon><Plus /></el-icon>
                      </el-button>
                    </div>

                    <div class="spec-values-tags">
                      <el-tag
                        v-for="(value, valueIdx) in item.specValues"
                        :key="valueIdx"
                        closable
                        effect="plain"
                        @close="removeSpecValue(item, valueIdx)"
                      >
                        {{ value.specValue }}
                      </el-tag>
                      <span v-if="!item.specValues?.length" class="spec-empty-text">暂无规格值，请添加</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="specFormData.status">
              <el-radio label="1">正常</el-radio>
              <el-radio label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <el-button @click="specDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="specSubmitLoading" @click="submitSpecModel">提交</el-button>
      </template>
    </el-dialog>

    <CategoryManageModal ref="categoryManageRef" @update="handleCategoryUpdate" />

    <el-dialog
      v-model="unitDialogVisible"
      :title="unitDialogTitle"
      width="520px"
      :close-on-click-modal="false"
      @close="handleUnitDialogClose"
    >
      <el-form ref="unitFormRef" :model="unitFormData" :rules="unitFormRules" label-width="96px" size="default">
        <el-form-item label="单位名称" prop="unitName">
          <el-input v-model="unitFormData.unitName" placeholder="请输入单位名称，如：套、台、kg" maxlength="20" />
        </el-form-item>
        <el-form-item label="单位符号">
          <el-input v-model="unitFormData.unitSymbol" placeholder="请输入单位符号，如：m³" maxlength="10" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="unitFormData.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="unitDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="unitSubmitLoading" @click="submitUnit">提交</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="processSegmentDialogVisible"
      :title="processSegmentDialogTitle"
      width="520px"
      :close-on-click-modal="false"
      @close="handleProcessSegmentDialogClose"
    >
      <el-form ref="processSegmentFormRef" :model="processSegmentFormData" :rules="processSegmentFormRules" label-width="96px" size="default">
        <el-form-item label="工艺段名称" prop="segmentName">
          <el-input v-model="processSegmentFormData.segmentName" placeholder="请输入工艺段名称" maxlength="100" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="processSegmentDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="processSegmentSubmitLoading" @click="submitProcessSegment">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getCategoryTree,
  getSpecList,
  getUnitList,
  pageUnitLibrary,
  saveUnitLibrary,
  updateUnitLibrary,
  deleteUnitLibrary,
  pageProcessSegment,
  saveProcessSegment,
  updateProcessSegment,
  deleteProcessSegment,
  pageMaterialStandard,
  saveMaterialStandard,
  updateMaterialStandard,
  deleteMaterialStandard,
  pageSpecModel,
  getSpecModelById,
  saveSpecModel,
  updateSpecModel,
  deleteSpecModel,
  syncMaterialKnowledge
} from '@/api/material'
import { FolderOpened, Memo, EditPen, Delete, Plus, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import CategoryManageModal from './CategoryManageModal.vue'
import MaterialStandardReviewTab from './MaterialStandardReviewTab.vue'

const sidebarCollapsed = ref(false)
const activeTab = ref('standard_material')
const showMaterialAdvanced = ref(false)

const categoryTree = ref([])
const specList = ref([])
const unitList = ref([])

const categorySearchText = ref('')
const categoryTreeRef = ref()
const filteredCategoryTree = ref([])
const isExpandAll = ref(true)
const categoryManageRef = ref(null)
const ALL_CATEGORY_KEY = 'ALL'
const selectedCategoryKey = ref(ALL_CATEGORY_KEY)

const selectedCategory = reactive({
  level: null,
  level1Id: null,
  level1Name: '',
  level2Id: null,
  level2Name: '',
  level3Id: null,
  level3Name: ''
})

const queryForm = reactive({
  materialCode: '',
  materialName: '',
  specification: '',
  categoryLevel1Id: null,
  categoryLevel2Id: null,
  categoryLevel3Id: null,
  unitId: null,
  pageNum: 1,
  pageSize: 20
})

const tableData = ref([])
const total = ref(0)
const loading = ref(false)

const specQueryForm = reactive({
  standardName: '',
  specKeyword: '',
  categoryLevel1Id: null,
  categoryLevel2Id: null,
  categoryLevel3Id: null,
  status: '1',
  pageNum: 1,
  pageSize: 20
})

const specTableData = ref([])
const specTotal = ref(0)
const specLoading = ref(false)

const unitQueryForm = reactive({
  unitName: '',
  status: '',
  pageNum: 1,
  pageSize: 20
})
const unitTableData = ref([])
const unitTotal = ref(0)
const unitLoading = ref(false)
const processSegmentQueryForm = reactive({
  segmentName: '',
  status: '1',
  pageNum: 1,
  pageSize: 20
})
const processSegmentTableData = ref([])
const processSegmentTotal = ref(0)
const processSegmentLoading = ref(false)

const dialogVisible = ref(false)
const submitLoading = ref(false)
const formRef = ref()
const generatedCode = ref('')
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

const formRules = {
  materialName: [{ required: true, message: '请输入材料名称', trigger: 'blur' }],
  categoryIds: [{ required: true, message: '请选择材料分类', trigger: 'change' }],
  specId: [{ required: true, message: '请选择规格型号', trigger: 'change' }],
  unitId: [{ required: true, message: '请选择计量单位', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}

const specDialogVisible = ref(false)
const specFormRef = ref()
const specSubmitLoading = ref(false)
const specDialogScrollRef = ref(null)
const specItemCardRefs = ref([])
const specFormData = reactive({
  id: null,
  standardName: '',
  categoryPath: [],
  linkedCategoryId: null,
  unitIds: [],
  specItems: [],
  status: '1'
})

const unitDialogVisible = ref(false)
const unitFormRef = ref()
const unitSubmitLoading = ref(false)
const knowledgeSyncLoading = ref(false)
const unitFormData = reactive({
  id: null,
  unitName: '',
  unitSymbol: '',
  status: '1'
})
const processSegmentDialogVisible = ref(false)
const processSegmentFormRef = ref()
const processSegmentSubmitLoading = ref(false)
const processSegmentFormData = reactive({
  id: null,
  segmentName: '',
  status: '1'
})

const unitFormRules = {
  unitName: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
}
const processSegmentFormRules = {
  segmentName: [{ required: true, message: '请输入工艺段名称', trigger: 'blur' }]
}

const dialogTitle = computed(() => formData.id ? '编辑材料标准' : '新增材料标准')
const specDialogTitle = computed(() => specFormData.id ? '编辑标准规格型号' : '新增标准规格型号')
const unitDialogTitle = computed(() => unitFormData.id ? '编辑标准单位' : '新增标准单位')
const processSegmentDialogTitle = computed(() => processSegmentFormData.id ? '编辑标准工艺段' : '新增标准工艺段')

const specCategoryCascaderProps = {
  value: 'id',
  label: 'categoryName',
  children: 'children',
  emitPath: true,
  checkStrictly: true
}

const specCategoryOptions = computed(() => categoryTree.value || [])
const getUnitDisplayName = (unit) => {
  if (!unit) return ''
  return String(unit.unitSymbol || '').trim() || String(unit.unitName || '').trim()
}
const getSpecUnitLabels = (row = {}) => {
  const fromItems = (row.unitItems || [])
    .map(item => getUnitDisplayName(item))
    .filter(Boolean)
  if (fromItems.length) return fromItems

  const unitIdToName = new Map((unitList.value || []).map(item => [item.id, getUnitDisplayName(item)]))
  const fromIds = (row.unitIds || []).map(id => unitIdToName.get(id)).filter(Boolean)
  if (fromIds.length) return fromIds

  return (row.units || []).map(unit => String(unit || '').trim()).filter(Boolean)
}

onMounted(() => {
  loadCategoryTree()
  loadSpecList()
  loadUnitList()
  handleQuery()
})

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const handleManageCategory = () => {
  categoryManageRef.value.open(categoryTree.value)
}

const handleCategoryUpdate = (newTree) => {
  categoryTree.value = newTree
  filteredCategoryTree.value = newTree
  ElMessage.success('分类数据同步成功')
}

const toggleExpandAll = () => {
  isExpandAll.value = !isExpandAll.value
  const nodes = categoryTreeRef.value?.store?._getAllNodes?.() || []
  nodes.forEach(node => {
    node.expanded = isExpandAll.value
  })
}

const handleCategorySearch = (value) => {
  categoryTreeRef.value.filter(value)
}

const filterNode = (value, data) => {
  if (!value) return true
  return data.categoryName.includes(value)
}

const loadCategoryTree = async () => {
  const res = await getCategoryTree()
  categoryTree.value = res || []
  filteredCategoryTree.value = categoryTree.value
  handleSelectAllCategory(false)
}

const loadSpecList = async () => {
  const res = await getSpecList()
  specList.value = res || []
}

const loadUnitList = async () => {
  const res = await getUnitList()
  unitList.value = res || []
}

const handleTabChange = (name) => {
  if (name === 'standard_material') {
    handleQuery()
  } else if (name === 'standard_spec_model') {
    handleSpecQuery()
  } else if (name === 'standard_unit') {
    handleUnitQuery()
  } else if (name === 'standard_process_segment') {
    handleProcessSegmentQuery()
  }
}

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

const handleReset = () => {
  Object.assign(queryForm, {
    materialCode: '',
    materialName: '',
    specification: '',
    categoryLevel1Id: null,
    categoryLevel2Id: null,
    categoryLevel3Id: null,
    unitId: null,
    pageNum: 1,
    pageSize: 20
  })
  handleSelectAllCategory(false)
  handleQuery()
}

const handleSpecQuery = async () => {
  specLoading.value = true
  try {
    const res = await pageSpecModel(specQueryForm)
    specTableData.value = res.records || []
    specTotal.value = res.total || 0
  } finally {
    specLoading.value = false
  }
}

const handleSpecReset = () => {
  Object.assign(specQueryForm, {
    standardName: '',
    specKeyword: '',
    categoryLevel1Id: selectedCategory.level === 1 ? selectedCategory.level1Id : null,
    categoryLevel2Id: selectedCategory.level === 2 ? selectedCategory.level2Id : null,
    categoryLevel3Id: selectedCategory.level === 3 ? selectedCategory.level3Id : null,
    status: '1',
    pageNum: 1,
    pageSize: 20
  })
  handleSpecQuery()
}

const handleUnitQuery = async () => {
  unitLoading.value = true
  try {
    const res = await pageUnitLibrary(unitQueryForm)
    unitTableData.value = res.records || []
    unitTotal.value = res.total || 0
  } finally {
    unitLoading.value = false
  }
}

const handleUnitReset = () => {
  Object.assign(unitQueryForm, {
    unitName: '',
    status: '',
    pageNum: 1,
    pageSize: 20
  })
  handleUnitQuery()
}

const handleProcessSegmentQuery = async () => {
  processSegmentLoading.value = true
  try {
    const res = await pageProcessSegment(processSegmentQueryForm)
    processSegmentTableData.value = res.records || []
    processSegmentTotal.value = res.total || 0
  } finally {
    processSegmentLoading.value = false
  }
}

const handleProcessSegmentReset = () => {
  Object.assign(processSegmentQueryForm, {
    segmentName: '',
    status: '1',
    pageNum: 1,
    pageSize: 20
  })
  handleProcessSegmentQuery()
}

const findCategoryPath = (nodes, targetId, path = []) => {
  for (const node of nodes || []) {
    const currentPath = [...path, node]
    if (node.id === targetId) {
      return currentPath
    }
    if (node.children?.length) {
      const found = findCategoryPath(node.children, targetId, currentPath)
      if (found) return found
    }
  }
  return null
}

const findCategoryNodeById = (nodes, targetId) => {
  for (const node of nodes || []) {
    if (node.id === targetId) return node
    if (node.children?.length) {
      const found = findCategoryNodeById(node.children, targetId)
      if (found) return found
    }
  }
  return null
}

const isCategoryActive = (node) => {
  if (!node) return false
  if (node.status === undefined || node.status === null || node.status === '') return true
  return String(node.status) === '1'
}

const resolveSpecSubmitCategoryId = (categoryPath, fallbackId) => {
  if (Array.isArray(categoryPath) && categoryPath.length) {
    const selectedId = categoryPath[categoryPath.length - 1]
    const selectedNode = findCategoryNodeById(categoryTree.value, selectedId)
    if (selectedNode && isCategoryActive(selectedNode) && [1, 2, 3].includes(Number(selectedNode.level))) {
      return selectedNode.id
    }
  }

  const fallbackNode = findCategoryNodeById(categoryTree.value, fallbackId)
  if (!fallbackNode || !isCategoryActive(fallbackNode)) return null
  return [1, 2, 3].includes(Number(fallbackNode.level)) ? fallbackNode.id : null
}

const getSpecCategoryPathByLevel2Id = (level2Id) => {
  if (!level2Id) return []
  const path = findCategoryPath(categoryTree.value, level2Id)
  if (!path) return []
  return path.map(item => item.id)
}

const getSpecCategoryFullPath = (row) => {
  const targetId = row?.linkedCategoryId
  if (!targetId) return ''

  // 按数据库真实挂载层级展示：二级只展示到二级，三级才展示到三级
  const pathNodes = findCategoryPath(categoryTree.value, targetId) || []
  if (!pathNodes.length) {
    return row?.categoryLevel2Name || ''
  }
  const nameParts = pathNodes
    .map(node => node?.categoryName)
    .filter(Boolean)
  return nameParts.length ? nameParts.join('/') : (row?.categoryLevel2Name || '')
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

const handleSpecCategoryChange = (value) => {
  if (Array.isArray(value) && value.length >= 1) {
    specFormData.linkedCategoryId = resolveSpecSubmitCategoryId(value, specFormData.linkedCategoryId)
    return
  }
  specFormData.linkedCategoryId = null
}

const handleCategorySelect = (data) => {
  selectedCategoryKey.value = data.id
  const path = findCategoryPath(categoryTree.value, data.id) || [data]
  const level1 = path.find(item => item.level === 1)
  const level2 = path.find(item => item.level === 2)

  selectedCategory.level = data.level
  selectedCategory.level1Id = level1?.id || null
  selectedCategory.level1Name = level1?.categoryName || ''
  selectedCategory.level2Id = level2?.id || null
  selectedCategory.level2Name = level2?.categoryName || ''
  selectedCategory.level3Id = data.level === 3 ? data.id : null
  selectedCategory.level3Name = data.level === 3 ? data.categoryName : ''

  if (data.level === 1) {
    queryForm.categoryLevel1Id = data.id
    queryForm.categoryLevel2Id = null
    queryForm.categoryLevel3Id = null
    specQueryForm.categoryLevel1Id = data.id
    specQueryForm.categoryLevel2Id = null
    specQueryForm.categoryLevel3Id = null
  } else if (data.level === 2) {
    queryForm.categoryLevel1Id = level1?.id || null
    queryForm.categoryLevel2Id = data.id
    queryForm.categoryLevel3Id = null
    specQueryForm.categoryLevel1Id = level1?.id || null
    specQueryForm.categoryLevel2Id = data.id
    specQueryForm.categoryLevel3Id = null
  } else {
    queryForm.categoryLevel1Id = level1?.id || null
    queryForm.categoryLevel2Id = level2?.id || null
    queryForm.categoryLevel3Id = data.id
    specQueryForm.categoryLevel1Id = level1?.id || null
    specQueryForm.categoryLevel2Id = null
    specQueryForm.categoryLevel3Id = data.id
  }

  queryForm.pageNum = 1
  specQueryForm.pageNum = 1

  if (activeTab.value === 'standard_material') {
    handleQuery()
  } else if (activeTab.value === 'standard_spec_model') {
    handleSpecQuery()
  } else if (activeTab.value === 'standard_review') {
    // 复核tab通过props监听selectedCategory后自行触发查询
  }
}

const handleSelectAllCategory = (withQuery = true) => {
  selectedCategoryKey.value = ALL_CATEGORY_KEY

  selectedCategory.level = null
  selectedCategory.level1Id = null
  selectedCategory.level1Name = ''
  selectedCategory.level2Id = null
  selectedCategory.level2Name = ''
  selectedCategory.level3Id = null
  selectedCategory.level3Name = ''

  queryForm.categoryLevel1Id = null
  queryForm.categoryLevel2Id = null
  queryForm.categoryLevel3Id = null
  queryForm.pageNum = 1

  specQueryForm.categoryLevel1Id = null
  specQueryForm.categoryLevel2Id = null
  specQueryForm.categoryLevel3Id = null
  specQueryForm.pageNum = 1

  nextTick(() => {
    categoryTreeRef.value?.setCurrentKey(null)
  })

  if (!withQuery) return
  if (activeTab.value === 'standard_material') {
    handleQuery()
  } else if (activeTab.value === 'standard_spec_model') {
    handleSpecQuery()
  }
}

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

const handleCategoryChange = (value) => {
  if (value && value.length === 3) {
    formData.categoryLevel1Id = value[0]
    formData.categoryLevel2Id = value[1]
    formData.categoryLevel3Id = value[2]
    generateCode()
  }
}

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

const formatDisplayCategoryCode = (node, data) => {
  if (!node || !data) return ''

  // 从当前节点向上收集编码，拼成完整层级编码
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
  // 材料标准分类编码前缀固定为 26，已存在则不重复追加
  return mergedCode.startsWith('26') ? mergedCode : `26${mergedCode}`
}

const generateCode = () => {
  if (!formData.categoryIds || formData.categoryIds.length !== 3 || !formData.specId || !formData.unitId) {
    generatedCode.value = ''
    return
  }

  const level1 = findCategoryCode(categoryTree.value, formData.categoryLevel1Id)
  const level2 = findCategoryCode(categoryTree.value, formData.categoryLevel2Id)
  const level3 = findCategoryCode(categoryTree.value, formData.categoryLevel3Id)
  const spec = specList.value.find(item => item.id === formData.specId)
  const unit = unitList.value.find(item => item.id === formData.unitId)

  if (level1 && level2 && level3 && spec && unit) {
    const toTwoDigits = (code) => String(code).slice(-2).padStart(2, '0')
    generatedCode.value = `${toTwoDigits(level1)}${toTwoDigits(level2)}${toTwoDigits(level3)}${spec.specCode}${unit.unitCode}`
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return

  submitLoading.value = true
  try {
    const data = { ...formData, categoryIds: undefined }
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

const handleDialogClose = () => {
  formRef.value?.resetFields()
  generatedCode.value = ''
}

const getSpecValueCount = (item = {}) => Array.isArray(item.specValues) ? item.specValues.length : 0

const createEmptySpecItem = () => ({
  specId: null,
  specKey: '',
  specValues: [],
  draftValue: '',
  collapsed: false
})

const setSpecItemCardRef = (el, idx) => {
  if (!el) return
  specItemCardRefs.value[idx] = el
}

const addSpecItem = async () => {
  specFormData.specItems.push(createEmptySpecItem())
  await nextTick()
  const latestIndex = specFormData.specItems.length - 1
  const latestCard = specItemCardRefs.value[latestIndex]
  const scrollContainer = specDialogScrollRef.value
  if (latestCard && scrollContainer) {
    scrollContainer.scrollTo({
      top: Math.max(0, latestCard.offsetTop - 12),
      behavior: 'smooth'
    })
  }
}

const removeSpecItem = (idx) => {
  specFormData.specItems.splice(idx, 1)
  specItemCardRefs.value = specItemCardRefs.value.filter(Boolean)
}

const toggleSpecItem = (item) => {
  item.collapsed = !item.collapsed
}

const addSpecValue = (specItem) => {
  const nextValue = String(specItem?.draftValue || '').trim()
  if (!nextValue) return
  if (!Array.isArray(specItem.specValues)) {
    specItem.specValues = []
  }
  if (specItem.specValues.some(item => String(item?.specValue || '').trim() === nextValue)) {
    specItem.draftValue = ''
    return
  }
  specItem.specValues.push({ specValueId: null, specValue: nextValue })
  specItem.draftValue = ''
}

const removeSpecValue = (specItem, valueIdx) => {
  if (!Array.isArray(specItem.specValues)) return
  specItem.specValues.splice(valueIdx, 1)
}

const handleAddSpecModel = () => {
  const defaultLevel2Id = selectedCategory.level === 3
    ? selectedCategory.level3Id
    : (selectedCategory.level === 2 ? selectedCategory.level2Id : selectedCategory.level1Id)
  const defaultCategoryPath = getSpecCategoryPathByLevel2Id(defaultLevel2Id)
  specDialogVisible.value = true
  Object.assign(specFormData, {
    id: null,
    standardName: '',
    categoryPath: defaultCategoryPath,
    linkedCategoryId: defaultCategoryPath[defaultCategoryPath.length - 1] || defaultLevel2Id,
    unitIds: [],
    specItems: [],
    status: '1'
  })
}

const handleEditSpecModel = async (row) => {
  const detail = await getSpecModelById(row.id)
  const categoryPath = getSpecCategoryPathByLevel2Id(detail.linkedCategoryId)
  const normalizedCategoryId = resolveSpecSubmitCategoryId(categoryPath, detail.linkedCategoryId)
  const normalizeSpecValuesForEdit = (item = {}) => {
    const detailValues = Array.isArray(item.specValueItems) ? item.specValueItems : []
    if (detailValues.length) {
      return detailValues.map(v => ({
        specValueId: v?.specValueId || null,
        specValue: String(v?.specValue || '').trim()
      })).filter(v => v.specValue)
    }
    const plainValues = Array.isArray(item.specValues) ? item.specValues : []
    return plainValues
      .map(v => (typeof v === 'string' ? v : v?.specValue))
      .map(v => ({ specValueId: null, specValue: String(v || '').trim() }))
      .filter(v => v.specValue)
  }
  specDialogVisible.value = true
  Object.assign(specFormData, {
    id: detail.id,
    standardName: detail.standardName,
    categoryPath,
    linkedCategoryId: normalizedCategoryId || categoryPath[categoryPath.length - 1] || detail.linkedCategoryId,
    unitIds: (detail.unitItems || []).map(item => item.unitId).filter(Boolean),
    specItems: (detail.specItems || []).map(item => ({
      specId: item.specId || null,
      specKey: item.specKey,
      specValues: normalizeSpecValuesForEdit(item),
      draftValue: '',
      collapsed: false
    })),
    status: detail.status || '1'
  })
  if (!specFormData.unitIds.length && Array.isArray(detail.units) && detail.units.length) {
    const unitNameMap = new Map();
    (unitList.value || []).forEach(item => {
      const displayName = getUnitDisplayName(item)
      if (item.unitName) unitNameMap.set(item.unitName, item.id)
      if (displayName) unitNameMap.set(displayName, item.id)
    })
    specFormData.unitIds = detail.units.map(name => unitNameMap.get(name)).filter(Boolean)
  }
  specFormData.specItems.forEach(item => {
    item.specValues = (item.specValues || []).map(value =>
      typeof value === 'string' ? { specValueId: null, specValue: value } : value
    ).filter(value => String(value?.specValue || '').trim())
    item.draftValue = String(item.draftValue || '')
    item.collapsed = Boolean(item.collapsed)
  })
}

const handleDeleteSpecModel = (row) => {
  ElMessageBox.confirm('确定要删除该标准规格型号吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteSpecModel(row.id)
    ElMessage.success('删除成功')
    handleSpecQuery()
  }).catch(() => {})
}

const submitSpecModel = async () => {
  if (!specFormData.standardName?.trim()) {
    ElMessage.error('请输入标准材料名称')
    return
  }
  if (!Array.isArray(specFormData.categoryPath) || specFormData.categoryPath.length < 1) {
    ElMessage.error('请选择所属分类（一级/二级/三级）')
    return
  }
  const resolvedCategoryId = resolveSpecSubmitCategoryId(specFormData.categoryPath, specFormData.linkedCategoryId)
  if (!resolvedCategoryId) {
    ElMessage.error('所属分类不可用，请重新选择')
    return
  }
  specFormData.linkedCategoryId = resolvedCategoryId
  if (!specFormData.linkedCategoryId) {
    ElMessage.error('请选择所属分类')
    return
  }
  if (!specFormData.unitIds?.length) {
    ElMessage.error('请至少填写一个单位')
    return
  }
  const availableUnits = new Set((unitList.value || []).map(item => item.id))
  const invalidUnits = specFormData.unitIds.filter(unitId => !availableUnits.has(unitId))
  if (invalidUnits.length) {
    ElMessage.error(`单位不在单位库中：${invalidUnits.join('、')}`)
    return
  }

  const validSpecItems = (specFormData.specItems || [])
    .filter(item => item.specKey?.trim())
    .map(item => ({
      specId: item.specId || undefined,
      specKey: item.specKey.trim(),
      specValueItems: (item.specValues || [])
        .map(v => ({
          specValueId: v?.specValueId || undefined,
          specValue: String(v?.specValue || '').trim()
        }))
        .filter(v => v.specValue)
    }))
    .filter(item => item.specValueItems.length)

  const payload = {
    id: specFormData.id || undefined,
    standardName: specFormData.standardName.trim(),
    linkedCategoryId: specFormData.linkedCategoryId,
    unitItems: Array.from(new Set(specFormData.unitIds)).map(unitId => ({ unitId })),
    specItems: validSpecItems.length ? validSpecItems : undefined,
    status: specFormData.status
  }

  specSubmitLoading.value = true
  try {
    if (specFormData.id) {
      await updateSpecModel(payload)
      ElMessage.success('更新成功')
    } else {
      await saveSpecModel(payload)
      ElMessage.success('新增成功')
    }
    specDialogVisible.value = false
    handleSpecQuery()
  } finally {
    specSubmitLoading.value = false
  }
}

const handleAddUnit = () => {
  unitDialogVisible.value = true
  Object.assign(unitFormData, {
    id: null,
    unitName: '',
    unitSymbol: '',
    status: '1'
  })
}

const handleEditUnit = (row) => {
  unitDialogVisible.value = true
  Object.assign(unitFormData, {
    id: row.id,
    unitName: row.unitName,
    unitSymbol: row.unitSymbol || '',
    status: row.status || '1'
  })
}

const handleDeleteUnit = (row) => {
  ElMessageBox.confirm('确定要删除该标准单位吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteUnitLibrary(row.id)
    ElMessage.success('删除成功')
    await loadUnitList()
    handleUnitQuery()
  }).catch(() => {})
}

const submitUnit = async () => {
  const valid = await unitFormRef.value.validate()
  if (!valid) return

  unitSubmitLoading.value = true
  try {
    const payload = {
      id: unitFormData.id || undefined,
      unitName: unitFormData.unitName?.trim(),
      unitSymbol: unitFormData.unitSymbol?.trim(),
      status: unitFormData.status
    }
    if (unitFormData.id) {
      await updateUnitLibrary(payload)
      ElMessage.success('更新成功')
    } else {
      await saveUnitLibrary(payload)
      ElMessage.success('新增成功')
    }
    unitDialogVisible.value = false
    await loadUnitList()
    handleUnitQuery()
  } finally {
    unitSubmitLoading.value = false
  }
}

const handleUnitDialogClose = () => {
  unitFormRef.value?.resetFields()
}

const handleAddProcessSegment = () => {
  processSegmentDialogVisible.value = true
  Object.assign(processSegmentFormData, {
    id: null,
    segmentName: '',
    status: '1'
  })
}

const handleEditProcessSegment = (row) => {
  processSegmentDialogVisible.value = true
  Object.assign(processSegmentFormData, {
    id: row.id,
    segmentName: row.segmentName,
    status: row.status || '1'
  })
}

const handleDeleteProcessSegment = (row) => {
  ElMessageBox.confirm('确定要删除该标准工艺段吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteProcessSegment(row.id)
    ElMessage.success('删除成功')
    handleProcessSegmentQuery()
  }).catch(() => {})
}

const submitProcessSegment = async () => {
  const valid = await processSegmentFormRef.value.validate()
  if (!valid) return
  processSegmentSubmitLoading.value = true
  try {
    const payload = {
      id: processSegmentFormData.id || undefined,
      segmentName: processSegmentFormData.segmentName?.trim(),
      status: processSegmentFormData.status
    }
    if (processSegmentFormData.id) {
      await updateProcessSegment(payload)
      ElMessage.success('更新成功')
    } else {
      await saveProcessSegment(payload)
      ElMessage.success('新增成功')
    }
    processSegmentDialogVisible.value = false
    handleProcessSegmentQuery()
  } finally {
    processSegmentSubmitLoading.value = false
  }
}

const handleProcessSegmentDialogClose = () => {
  processSegmentFormRef.value?.resetFields()
}

const handleSyncKnowledge = async () => {
  if (knowledgeSyncLoading.value) return
  knowledgeSyncLoading.value = true
  try {
    const res = await syncMaterialKnowledge()
    const materialCount = Number(res?.materialCount || 0)
    const processCount = Number(res?.processCount || 0)
    const categoryCount = Number(res?.categoryCount || 0)
    const totalCount = Number(res?.syncedItemCount || (materialCount + processCount + categoryCount))
    const msg = res?.message || '知识库已更新（覆盖）'
    ElMessage.success(`${msg}，标准材料 ${materialCount} 条，标准工艺段 ${processCount} 条，标准分类 ${categoryCount} 条（合计 ${totalCount} 条）`)
  } catch (error) {
    console.error('sync knowledge failed:', error)
  } finally {
    knowledgeSyncLoading.value = false
  }
}

const handleSpecDialogClose = () => {
  specFormRef.value?.resetFields?.()
  specFormData.categoryPath = []
  specFormData.linkedCategoryId = null
  specFormData.unitIds = []
  specFormData.specItems = []
  specItemCardRefs.value = []
}
</script>

<style lang="scss" scoped>
$sidebar-width: 248px;
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

.glass-panel {
  background: $bg-glass;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $border-glass;
  border-radius: 8px;
}

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

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  min-height: 0;
  height: 100%;
}

.tabs-panel-glass,
.filter-panel-glass,
.table-container-glass {
  @extend .glass-panel;
}

.tabs-panel-glass {
  padding: 8px 16px 0;
  .tabs-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    transform: translateY(-4px);
  }
  .material-tabs {
    flex: 1;
    min-width: 360px;
  }
  .knowledge-sync-btn {
    border-radius: 10px;
    padding: 0 16px;
    align-self: center;
  }
  :deep(.el-tabs__header) {
    margin: 0;
    display: flex;
    align-items: center;
  }
  :deep(.el-tabs__nav-wrap::after) {
    display: none;
  }
  :deep(.el-tabs__item.is-active) {
    color: $primary-blue;
    font-weight: 700;
  }
}

.filter-panel-glass {
  padding: 12px 20px;

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
  }

  .filter-btns {
    display: flex;
    gap: 10px;

    .btn-search { border-radius: 12px; padding: 0 20px; }
    .btn-reset { border-radius: 12px; background: rgba(0,0,0,0.03); border: none; }
    .btn-add { border-radius: 12px; background: #00c261; border: none; }
  }

  .standard-material-query-form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;

    .filter-row-primary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .filter-row-secondary {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      padding-top: 2px;
    }

    .action-group {
      display: flex;
      align-items: center;
      gap: 10px;

      .btn-search { border-radius: 12px; padding: 0 20px; }
      .btn-reset { border-radius: 12px; background: rgba(0, 0, 0, 0.03); border: none; }
      .btn-advanced { padding: 0 2px; }
    }

    :deep(.el-form-item) { margin-bottom: 0; margin-right: 0; }
  }
}

.table-container-glass {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;

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

    .material-info-cell {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .name-text { font-size: 13px; font-weight: 600; color: #1d1d1f; }
      .remark-text { font-size: 12px; color: #86868b; }
    }

    .action-btns {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .pagination-wrapper {
    margin-top: auto;
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }
}

.spec-model-dialog {
  :deep(.el-dialog) {
    max-height: calc(80vh + 70px);
    margin: 0 !important;
    display: flex;
    flex-direction: column;
  }

  :deep(.el-dialog__body) {
    flex: 1;
    min-height: 0;
    padding-top: 8px;
    padding-bottom: 8px;
    overflow: hidden;
  }

  :deep(.el-dialog__footer) {
    border-top: 1px solid #f0f2f5;
    padding-top: 12px;
  }

  :deep(.el-form-item__label),
  :deep(.el-input__inner),
  :deep(.el-textarea__inner),
  :deep(.el-tag),
  :deep(.el-radio__label),
  :deep(.el-button) {
    font-size: 13px;
  }

  :deep(.el-form-item__label) {
    white-space: nowrap;
  }
}

.spec-dialog-scroll {
  max-height: calc(60vh + 70px);
  overflow: auto;
  padding-right: 4px;
}

.spec-items-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.spec-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.spec-counter {
  color: #606266;
  font-size: 13px;
}

.spec-empty-panel {
  border: 1px dashed #dcdfe6;
  border-radius: 8px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 13px;
}

.spec-item-card {
  border: 1px solid #ebeef5;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
}

.spec-item-header {
  min-height: 44px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8fafc;
  border-bottom: 1px solid #f0f2f5;
}

.spec-item-title {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.spec-item-name-input {
  width: 240px;
  max-width: 100%;

  :deep(.el-input__wrapper) {
    background: #fff;
    box-shadow: inset 0 0 0 1px #dcdfe6;
    padding: 0 6px;
  }

  :deep(.el-input__inner) {
    font-size: 13px;
    font-weight: 600;
    color: #1f2937;
    height: 28px;
    line-height: 28px;
  }

  :deep(.el-input__wrapper.is-focus) {
    background: #fff;
    box-shadow: inset 0 0 0 1px #409eff;
  }
}

.spec-item-meta {
  font-size: 12px;
  color: #909399;
  margin-left: auto;
  width: 170px;
  text-align: right;
  flex: 0 0 170px;
}

.spec-item-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.spec-card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
}

.spec-values-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spec-values-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 30px;
}

.spec-empty-text {
  color: #b0b3ba;
  font-size: 12px;
}

.spec-value-adder {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;

  :deep(.el-button) {
    width: 42px;
    padding: 0;
  }
}

.spec-model-label {
  :deep(.el-form-item__label) {
    font-weight: 600;
  }
}

.code-hint {
  margin-top: 4px;
  color: #909399;
  font-size: 12px;
}
</style>
