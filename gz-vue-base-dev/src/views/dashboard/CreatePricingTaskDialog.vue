<template>
  <el-dialog
    v-model="visible"
    title="新建组价任务"
    width="600px"
    :close-on-click-modal="false"
    class="custom-glass-dialog"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="110px"
      size="default"
    >
      <!-- Excel模板下载 -->
      <el-form-item label="Excel模板">
        <el-button 
          type="primary" 
          icon="Download" 
          @click="downloadTemplate"
          plain
        >
          下载组价模板
        </el-button>
        <div class="help-text">
          模板包含字段:序号、材料名称、规格型号、单位、数量、备注
        </div>
      </el-form-item>

      <!-- 文件上传 -->
      <el-form-item label="组价文件" prop="file">
        <el-upload
          ref="uploadRef"
          class="upload-demo"
          :auto-upload="false"
          :limit="1"
          :on-change="handleFileChange"
          :on-remove="handleFileRemove"
          accept=".xlsx,.xls"
          drag
          :show-file-list="false"
        >
          <!-- 未上传状态 -->
          <div v-if="!formData.file" class="upload-trigger-area">
            <el-icon class="el-icon--upload"><Upload /></el-icon>
            <div class="el-upload__text">
              拖拽文件到此处,或<em>点击上传</em>
            </div>
            <div class="el-upload__tip">
              仅支持 .xlsx / .xls 格式的Excel文件
            </div>
          </div>
          
          <!-- 已上传状态 -->
          <div v-else class="custom-file-card" @click.stop>
            <div class="file-info">
              <div class="file-icon">
                <el-icon><Document /></el-icon>
              </div>
              <div class="file-details">
                <div class="file-name">{{ formData.file.name }}</div>
                <div class="file-meta">
                  <span class="file-size">{{ (formData.file.size / 1024).toFixed(2) }} KB</span>
                  <span class="parse-status success" v-if="parsedMaterials.length > 0">
                    <el-icon><Check /></el-icon> 解析成功 ({{ parsedMaterials.length }}条)
                  </span>
                </div>
              </div>
            </div>
            <div class="file-actions">
              <el-button 
                type="danger" 
                icon="Delete" 
                circle 
                size="small"
                plain 
                @click="handleFileRemove"
              />
            </div>
          </div>
        </el-upload>
      </el-form-item>

      <!-- 任务名称 -->
      <el-form-item label="任务名称" prop="taskName">
        <el-input 
          v-model="formData.taskName" 
          placeholder="请输入任务名称"
          clearable
        >
          <template #suffix>
            <el-tooltip 
              content="默认提取第一个材料名称+等+材料数量+个材料组价" 
              placement="top"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </template>
        </el-input>
      </el-form-item>

      <!-- 取价方式 -->
      <el-form-item label="取价方式" prop="pricingMethod">
        <el-radio-group v-model="formData.pricingMethod">
          <el-radio value="trimmed_mean">去极值平均价</el-radio>
          <el-radio value="average">平均价</el-radio>
          <el-radio value="lowest">最低价</el-radio>
          <el-radio value="highest">最高价</el-radio>
        </el-radio-group>
        <div class="method-tip">
          <el-icon><InfoFilled /></el-icon>
          <span>组价任务的最终取价将按照此选择自动调整</span>
        </div>
      </el-form-item>


    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button 
          type="primary" 
          @click="handleSubmit"
          :loading="submitting"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Download, Upload, QuestionFilled, InfoFilled, Document, Delete, Check } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import { createPricingTask } from '@/api/pricing'
import useUserStore from '@/store/modules/user'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'success'])

const userStore = useUserStore()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const formRef = ref(null)
const uploadRef = ref(null)
const submitting = ref(false)

const formData = ref({
  taskName: '',
  file: null,
  pricingMethod: 'trimmed_mean' // 默认为去极值平均价
})

const parsedMaterials = ref([])

const formRules = {
  file: [
    { required: true, message: '请上传待组价文件', trigger: 'change' }
  ],
  taskName: [
    { required: true, message: '请输入任务名称', trigger: 'blur' }
  ]
}

// 下载Excel模板
const downloadTemplate = () => {
  // 创建工作簿
  const wb = XLSX.utils.book_new()
  
  // 定义模板数据
  const templateData = [
    ['序号', '材料名称', '规格型号', '单位', '数量', '备注'],
    [1, '球墨铸铁管', 'DN300 K9级', '米', 500, '主干管线'],
    [2, '潜水排污泵', 'QW50-15-15-1.5', '台', 4, '二沉池配泵'],
    [3, '变频控制柜', '一控二 15kW', '套', 2, '含基础安装']
  ]
  
  // 创建工作表
  const ws = XLSX.utils.aoa_to_sheet(templateData)
  
  // 设置列宽
  ws['!cols'] = [
    { wch: 8 },  // 序号
    { wch: 20 }, // 材料名称
    { wch: 25 }, // 规格型号
    { wch: 10 }, // 单位
    { wch: 10 }, // 数量
    { wch: 20 }  // 备注
  ]
  
  // 添加工作表到工作簿
  XLSX.utils.book_append_sheet(wb, ws, '待组价材料清单')
  
  // 导出文件
  XLSX.writeFile(wb, '组价任务模板.xlsx')
  
  ElMessage.success('模板下载成功')
}

// 处理文件选择
const handleFileChange = (file) => {
  formData.value.file = file.raw
  parseExcelFile(file.raw)
}

// 处理文件移除
const handleFileRemove = () => {
  formData.value.file = null
  formData.value.taskName = ''
  parsedMaterials.value = []
  uploadRef.value?.clearFiles()
}

// 解析Excel文件
const parseExcelFile = (file) => {
  const reader = new FileReader()
  
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      
      // 读取第一个工作表
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      
      // 转换为JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      
      // 提取数据 (跳过表头)
      const headers = jsonData[0]
      const materials = []
      
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i]
        if (!row || row.length === 0 || !row[1]) continue // 跳过空行或材料名称为空的行
        
        const material = {
          序号: row[0] || i,
          材料名称: row[1] || '',
          规格型号: row[2] || '',
          单位: row[3] || '',
          数量: row[4] || 0,
          备注: row[5] || ''
        }
        
        materials.push(material)
      }
      
      if (materials.length === 0) {
        ElMessage.warning('Excel文件中未找到有效的材料数据')
        return
      }
      
      parsedMaterials.value = materials
      
      // 生成默认任务名称
      if (!formData.value.taskName) {
        const firstMaterialName = materials[0]?.材料名称 || '材料'
        formData.value.taskName = `${firstMaterialName}等${materials.length}个材料组价`
        // 自动提取名称后，清除校验提示
        if (formRef.value) {
          formRef.value.validateField('taskName')
        }
      }
      
      ElMessage.success(`成功解析${materials.length}条材料数据`)
    } catch (error) {
      console.error('解析Excel文件失败:', error)
      ElMessage.error('解析Excel文件失败,请检查文件格式')
    }
  }
  
  reader.readAsArrayBuffer(file)
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      if (parsedMaterials.value.length === 0) {
        ElMessage.warning('请先上传并解析待组价文件')
        return
      }
      
      submitting.value = true
      
      try {
        await createPricingTask({
          taskName: formData.value.taskName,
          materials: parsedMaterials.value,
          userId: userStore.userId || 1001,
          creator: userStore.nickName || userStore.userName || '当前用户',
          pricingMethod: formData.value.pricingMethod // 传递取价方式
        })
        
        ElMessage.success('任务创建成功,系统正在自动组价中...')
        emit('success')
        handleClose()
      } catch (error) {
        console.error('创建任务失败:', error)
        ElMessage.error('创建任务失败')
      } finally {
        submitting.value = false
      }
    }
  })
}

// 关闭弹窗
const handleClose = () => {
  formRef.value?.resetFields()
  formData.value = {
    taskName: '',
    file: null,
    pricingMethod: 'trimmed_mean'
  }
  parsedMaterials.value = []
  uploadRef.value?.clearFiles()
  visible.value = false
}
</script>

<style lang="scss" scoped>
.custom-glass-dialog {
  :deep(.el-dialog__header) {
    border-bottom: 1px solid #ebeef5;
  }
  
  :deep(.el-dialog__footer) {
    border-top: 1px solid #ebeef5;
  }
}

.help-text {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}

.upload-demo {
  width: 100%;
  
  :deep(.el-upload-dragger) {
    width: 100%;
    height: auto;
    min-height: 100px;
    padding: 0; // 由内容自适应
    border: 2px dashed #dcdfe6;
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: visible;
    
    &:hover {
      border-color: #377cfd;
      background: rgba(55, 124, 253, 0.05);
    }
    
    &.is-dragover {
      border-color: #377cfd;
      background: rgba(55, 124, 253, 0.1);
    }
  }

  .upload-trigger-area {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .el-icon--upload {
      font-size: 32px;
      margin-bottom: 5px;
      color: #909399;
    }
    
    .el-upload__text {
      font-size: 13px;
      color: #606266;
      em {
        color: #377cfd;
        font-style: normal;
        font-weight: 600;
      }
    }

    .el-upload__tip {
      margin-top: 5px;
      font-size: 12px;
      color: #909399;
    }
  }
}

.custom-file-card {
  width: 100%;
  background: white;
  border-radius: 10px; // 略微减小圆角以适应容器
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  animation: slideUp 0.3s ease-out;
  cursor: default; // 防止点击文字触发上传
  box-sizing: border-box;

  .file-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .file-icon {
      width: 40px;
      height: 40px;
      background: #f0f7ff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #377cfd;
      font-size: 20px;
    }

    .file-details {
      text-align: left;
      
      .file-name {
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        margin-bottom: 4px;
        max-width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .file-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 12px;
        color: #909399;

        .parse-status {
          display: flex;
          align-items: center;
          gap: 2px;
          
          &.success {
            color: #67c23a;
            font-weight: 600;
          }
        }
      }
    }
  }

  .file-actions {
    opacity: 0.8;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.method-tip {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #909399;
  margin-left: 12px;
}



.dialog-footer {
  .el-button {
    min-width: 80px;
  }
}
</style>
