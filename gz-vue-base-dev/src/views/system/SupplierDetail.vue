<template>
  <div class="workbench-container">
    <div class="background-overlay"></div>
    <div class="workbench-layout">
      <!-- 左侧菜单卡片 -->
      <aside class="sidebar-glass">
        <div class="logo-container">
          <div class="logo-box">
            <img src="@/assets/images/user-logo.png" alt="Logo" />
          </div>
          <h1 class="app-name">广业环保</h1>
        </div>
        <nav class="side-menu">
          <div 
            v-for="item in menuItems" 
            :key="item.name" 
            :class="['menu-item', { active: activeMenu === item.name }]"
            @click="handleMenuClick(item)"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span class="menu-text">{{ item.label }}</span>
          </div>
        </nav>
        <div class="sidebar-footer">
          <div class="user-avatar-section">
            <img src="@/assets/images/touxiang.png" class="user-avatar" alt="User" />
            <span class="user-name-text">张三</span>
          </div>
          <div class="footer-actions">
            <el-tooltip content="个人中心" placement="top">
              <div class="action-item" @click="goUserCenter">
                <el-icon><User /></el-icon>
              </div>
            </el-tooltip>
            <el-tooltip content="退出登录" placement="top">
              <div class="action-item" @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
              </div>
            </el-tooltip>
          </div>
        </div>
      </aside>

      <!-- 右侧主内容区 -->
      <main class="main-content">
        <div class="detail-wrapper">
             <div class="supplier-detail-container">
                <!-- 头部预览卡片 -->
                <div class="glass-panel header-compact-panel">
                  <div class="header-main">
                    <div class="company-logo-mini">
                      <el-icon><OfficeBuilding /></el-icon>
                    </div>
                    <div class="company-info-flex">
                      <div class="title-row">
                        <h1>{{ supplierInfo.supplierName }}</h1>
                      </div>
                      <div class="stats-line">
                         <span class="stat-tag">入库时间: {{ supplierInfo.entryTime }}</span>
                         <el-divider direction="vertical" />
                         <span class="stat-tag">联系人: {{ supplierInfo.contactPerson }}</span>
                         <el-divider direction="vertical" />
                         <span class="stat-tag">联系电话: {{ supplierInfo.contactPhone }}</span>
                      </div>
                    </div>
                    <div class="header-actions">
                        <!-- <el-button type="primary" plain icon="Edit" @click="handleEdit">完善信息</el-button> -->
                    </div>
                  </div>
                </div>

                <!-- 核心数据区 -->
                <div class="info-grid">
                  <!-- 注册信息 -->
                  <div class="glass-panel info-section">
                    <div class="section-title">
                        <el-icon><list /></el-icon> 注册信息
                    </div>
                    <el-descriptions :column="3" border size="small" class="compact-descriptions">
                      <el-descriptions-item label="统一社会信用代码">{{ supplierInfo.creditCode }}</el-descriptions-item>
                      <el-descriptions-item label="法定代表人">{{ supplierInfo.legalRep }}</el-descriptions-item>
                      <el-descriptions-item label="所属行业">{{ supplierInfo.industry }}</el-descriptions-item>

                      <el-descriptions-item label="注册资金">{{ supplierInfo.capital }}万</el-descriptions-item>
                      <el-descriptions-item label="机构类型">{{ supplierInfo.orgType }}</el-descriptions-item>
                      <el-descriptions-item label="入库时间">{{ supplierInfo.entryTime }}</el-descriptions-item>

                      <el-descriptions-item label="供应材料类别">{{ supplierInfo.categoryNames }}</el-descriptions-item>
                      <el-descriptions-item label="供应品牌">{{ supplierInfo.brandNames }}</el-descriptions-item>
                      <el-descriptions-item label="所在地区">{{ supplierInfo.regAddress }}</el-descriptions-item>

                      <el-descriptions-item label="联系人">{{ supplierInfo.contactPerson }}</el-descriptions-item>
                      <el-descriptions-item label="联系电话">{{ supplierInfo.contactPhone }}</el-descriptions-item>
                      <el-descriptions-item label="企业邮箱">{{ supplierInfo.email }}</el-descriptions-item>

                      <el-descriptions-item label="联系地址" :span="3">{{ supplierInfo.contactAddress }}</el-descriptions-item>
                    </el-descriptions>
                  </div>

                  <!-- 证照附件 -->
                  <div class="glass-panel info-section">
                    <div class="section-title">
                        <el-icon><Memo /></el-icon> 证照附件
                    </div>
                    <div class="attachment-horizontal">
                      <div class="attach-card" v-for="(file, index) in attachments" :key="index">
                        <div class="file-info">
                          <el-icon :class="['f-icon', file.type]"><Document /></el-icon>
                          <span class="f-name">{{ file.name }}</span>
                        </div>
                        <el-button link type="primary" size="small">预览</el-button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 供应材料信息 -->
                <div class="glass-panel material-section">
                  <div class="section-header-modern">
                    <div class="title-with-bar">
                      <h3>供应材料信息</h3>
                      <el-tag size="small" type="info" effect="plain" class="count-tag">
                        共 {{ filteredMaterialList.length }} 项
                      </el-tag>
                    </div>
                    <div class="filter-mini">
                       <el-input v-model="searchKeyword" size="small" placeholder="搜索材料..." prefix-icon="Search" style="width: 200px" clearable />
                    </div>
                  </div>
                  <div class="table-container">
                    <el-table 
                      :data="filteredMaterialList" 
                      style="width: 100%" 
                      size="small"
                      class="custom-modern-table"
                      :header-cell-style="{ color: '#1d1d1f', fontWeight: 'bold' }"
                    >
                      <el-table-column type="index" label="序号" width="55" align="center" fixed />
                      <el-table-column prop="materialName" label="材料名称" min-width="150" show-overflow-tooltip fixed />
                      <el-table-column prop="spec" label="规格型号" min-width="150" show-overflow-tooltip />
                      <el-table-column prop="unit" label="单位" width="60" align="center" />
                      <el-table-column prop="brand" label="品牌" width="80" align="center" show-overflow-tooltip />
                      <el-table-column prop="quantity" label="数量" width="70" align="center" />
                      <el-table-column prop="priceExclTax" label="不含税价" width="100" align="right">
                        <template #default="{ row }"><span class="price-val">¥{{ row.priceExclTax }}</span></template>
                      </el-table-column>
                      <el-table-column prop="taxRate" label="税率" width="60" align="center">
                        <template #default="{ row }">{{ row.taxRate }}%</template>
                      </el-table-column>
                      <el-table-column prop="priceInclTax" label="含税价" width="100" align="right">
                         <template #default="{ row }"><span class="price-val">¥{{ row.priceInclTax }}</span></template>
                      </el-table-column>
                      <el-table-column prop="projectName" label="项目名称" min-width="200" show-overflow-tooltip />
                      <el-table-column prop="purchaseTime" label="时间" width="100" align="center" />
                      <el-table-column prop="priceType" label="类型" width="80" align="center">
                        <template #default="{ row }">
                          <el-tag :type="row.priceType === '中标价' ? 'success' : 'warning'" size="small" effect="plain">{{ row.priceType }}</el-tag>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
             </div>
        </div>
      </main>
    </div>

    <!-- 完善信息弹窗 (与列表页编辑弹窗完全一致) -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="850px"
      :close-on-click-modal="false"
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
import { ref, onMounted, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  OfficeBuilding, Document, Plus, List, Memo, Edit, Search,
  DataAnalysis, PriceTag, UserFilled, Postcard,
  HomeFilled, User, SwitchButton, CaretTop, CaretBottom,
  InfoFilled, PhoneFilled, DataLine, Collection
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getCategoryTree } from '@/api/material'
import { getBrandList, getRegionTree, updateSupplier } from '@/api/supplier'

const route = useRoute()
const router = useRouter()
const activeMenu = ref('供应商查询')
const menuItems = [
  { name: '驾驶舱', label: '驾驶舱', icon: 'DataAnalysis', path: '/workbench?tab=驾驶舱' },
  { name: '材价查询', label: '材价查询', icon: 'Search', path: '/workbench?tab=材价查询' },
  { name: '智能组价', label: '智能组价', icon: 'PriceTag', path: '/workbench?tab=智能组价' },
  { name: '采购比价', label: '采购比价', icon: 'DataLine', path: '/workbench?tab=采购比价' },
  { name: '供应商查询', label: '供应商查询', icon: 'OfficeBuilding', path: '/workbench?tab=供应商查询' },
  { name: '材料标准', label: '材料标准', icon: 'Collection', path: '/workbench?tab=材料标准' }
]

const handleMenuClick = (item) => router.push(item.path)
const goHome = () => router.push('/index')
const goUserCenter = () => router.push('/user/profile')
const handleLogout = () => {
    ElMessageBox.confirm('确定注销并退出系统吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
    .then(() => { location.href = '/' })
    .catch(() => {})
}

// 修改供应商名称为 URL 传递的名称或默认名称
const supplierInfo = ref({
  supplierName: route.query.name || '宁德时代房地产开发有限公司',
  entryTime: '2025-07-15',
  creditCode: '91350902678471527P',
  capital: '100.00',
  industry: '生态保护和环境治理业',
  regAddress: '北京市-北京城区-东城区',
  legalRep: '陈宁章',
  email: 'service@gy-ep.com',
  contactPhone: '13250730772',
  orgType: '境内企业',
  contactAddress: '北京市东城区xxx街道xxx号',
  contactPerson: '周丽',
  categoryNames: '通用设备/水泵, 专用设备/水处理设备',
  brandNames: '凯泉, 威乐, 格兰富'
})

const attachments = [
  { name: '营业执照', type: 'img' },
  { name: '企业授权委托书', type: 'pdf' },
  { name: '产品质量承诺书', type: 'pdf' },
  { name: '公司资料', type: 'pdf' }
]

// 针对水务行业特点扩充材料列表 (20条)
const materialList = ref([
  { materialName: '潜水排污泵', spec: 'WQ100-15-7.5', unit: '台', brand: '凯泉', quantity: 12, priceExclTax: '8500.00', taxRate: 13, priceInclTax: '9605.00', projectName: '东莞市南城污水处理厂提标工程', purchaseTime: '2025-09-20', priceType: '中标价' },
  { materialName: '板框式压滤机', spec: 'XMZG100/1000-UB', unit: '台', brand: '景津', quantity: 2, priceExclTax: '125000.00', taxRate: 13, priceInclTax: '141250.00', projectName: '佛山市镇级污水污泥处置项目', purchaseTime: '2025-10-15', priceType: '市场价' },
  { materialName: '次氯酸钠发生器', spec: '500g/h', unit: '套', brand: '和创', quantity: 3, priceExclTax: '45000.00', taxRate: 13, priceInclTax: '50850.00', projectName: '清远市农村饮用水达标工程', purchaseTime: '2025-11-02', priceType: '中标价' },
  { materialName: '不锈钢调节溢流堰', spec: 'W=1500mm', unit: '个', brand: '恒大', quantity: 8, priceExclTax: '12000.00', taxRate: 13, priceInclTax: '13560.00', projectName: '珠海市横琴污水系统改造', purchaseTime: '2025-12-01', priceType: '中标价' },
  { materialName: 'MBR帘式膜组件', spec: 'NTR80', unit: '支', brand: '碧水源', quantity: 240, priceExclTax: '1850.00', taxRate: 13, priceInclTax: '2090.50', projectName: '广州市天河区金融城一期项目', purchaseTime: '2026-01-10', priceType: '询价' },
  { materialName: '电磁流量计', spec: 'DN200 PN16', unit: '台', brand: '科隆', quantity: 15, priceExclTax: '3200.00', taxRate: 13, priceInclTax: '3616.00', projectName: '肇庆市智慧供水二期', purchaseTime: '2026-01-12', priceType: '中标价' },
  { materialName: '三叶罗茨风机', spec: 'SSR-125', unit: '台', brand: '百事德', quantity: 4, priceExclTax: '15800.00', taxRate: 13, priceInclTax: '17854.00', projectName: '中山市工业园区污水联通工程', purchaseTime: '2026-01-15', priceType: '市场价' },
  { materialName: '变频控制柜', spec: '37kW一用一备', unit: '套', brand: '德力西', quantity: 6, priceExclTax: '9500.00', taxRate: 13, priceInclTax: '10735.00', projectName: '惠州市水厂泵站改造', purchaseTime: '2026-01-18', priceType: '中标价' },
  { materialName: '不锈钢格栅除污机', spec: 'GSL-1000', unit: '台', brand: '中源', quantity: 2, priceExclTax: '28000.00', taxRate: 13, priceInclTax: '31640.00', projectName: '江门市蓬江区河道治理工程', purchaseTime: '2026-01-20', priceType: '中标价' },
  { materialName: '氨氮在线分析仪', spec: '0-100mg/L', unit: '台', brand: '哈希', quantity: 2, priceExclTax: '68000.00', taxRate: 13, priceInclTax: '76840.00', projectName: '汕头市重点排污口监测', purchaseTime: '2026-01-22', priceType: '中标价' },
  { materialName: '自清洗过滤器', spec: 'DN300 PN10', unit: '台', brand: '阿卡德', quantity: 5, priceExclTax: '12000.00', taxRate: 13, priceInclTax: '13560.00', projectName: '湛江市钢铁配套循环水', purchaseTime: '2026-01-25', priceType: '市场价' },
  { materialName: '污泥脱水专用絮凝剂', spec: 'PAM 阴离子', unit: 't', brand: '聚合', quantity: 10, priceExclTax: '15500.00', taxRate: 13, priceInclTax: '17515.00', projectName: '污水处理厂药剂采购', purchaseTime: '2026-01-27', priceType: '年度供货' },
  { materialName: '防爆潜水轴流泵', spec: '700ZLB-100', unit: '台', brand: '天一', quantity: 3, priceExclTax: '45000.00', taxRate: 13, priceInclTax: '50850.00', projectName: '珠海高新区排涝泵站', purchaseTime: '2026-01-28', priceType: '中标价' },
  { materialName: '不锈钢闸阀', spec: 'Z41W-16P DN150', unit: '台', brand: '远大', quantity: 20, priceExclTax: '2100.00', taxRate: 13, priceInclTax: '2373.00', projectName: '自来水管网更新工程', purchaseTime: '2026-01-29', priceType: '市场价' },
  { materialName: '微孔曝气软管', spec: 'φ65 硅橡胶', unit: 'm', brand: '国祯', quantity: 2000, priceExclTax: '45.00', taxRate: 13, priceInclTax: '50.85', projectName: '氧化沟技术改造', purchaseTime: '2026-01-30', priceType: '中标价' },
  { materialName: '液位超声波变送器', spec: '0-5m 24VDC', unit: '台', brand: '西门子', quantity: 8, priceExclTax: '4200.00', taxRate: 13, priceInclTax: '4746.00', projectName: '泵站自动化升级', purchaseTime: '2026-02-01', priceType: '中标价' },
  { materialName: '聚氯化铝(PAC)', spec: '含量28% 工业级', unit: 't', brand: '丰源', quantity: 50, priceExclTax: '1800.00', taxRate: 13, priceInclTax: '2034.00', projectName: '自来水厂常规耗材', purchaseTime: '2026-02-01', priceType: '中标价' },
  { materialName: '一体化净水设备', spec: '100m³/d', unit: '套', brand: '宏源', quantity: 1, priceExclTax: '58000.00', taxRate: 13, priceInclTax: '65540.00', projectName: '偏远山区供水保障', purchaseTime: '2026-02-02', priceType: '中标价' },
  { materialName: '加氯机', spec: '5kg/h 真空式', unit: '台', brand: '贝尔', quantity: 2, priceExclTax: '35000.00', taxRate: 13, priceInclTax: '39550.00', projectName: '第二水厂应急设备', purchaseTime: '2026-02-02', priceType: '市场价' },
  { materialName: '污泥输送无轴螺旋', spec: 'WLS300-6m', unit: '台', brand: '扬子', quantity: 2, priceExclTax: '22000.00', taxRate: 13, priceInclTax: '24860.00', projectName: '脱水机房改造', purchaseTime: '2026-02-02', priceType: '询价' }
])

const searchKeyword = ref('')
const filteredMaterialList = computed(() => {
    if (!searchKeyword.value) return materialList.value
    const lowerKey = searchKeyword.value.toLowerCase()
    return materialList.value.filter(item => 
        (item.materialName && item.materialName.toLowerCase().includes(lowerKey)) ||
        (item.spec && item.spec.toLowerCase().includes(lowerKey)) ||
        (item.brand && item.brand.toLowerCase().includes(lowerKey))
    )
})

// --- 弹窗复用逻辑 ---
const dialogVisible = ref(false)
const dialogTitle = ref('编辑供应商')
const submitLoading = ref(false)
const formRef = ref()
const categoryTree = ref([])
const brandList = ref([])
const regionOptions = ref([])

const formData = reactive({
  id: route.params.id,
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

const validatePhone = (rule, value, callback) => {
  if (!value) callback(new Error('请输入联系电话'))
  else if (!/^1[3-9]\d{9}$/.test(value)) callback(new Error('请输入正确的手机号码'))
  else callback()
}

const validateEmail = (rule, value, callback) => {
  if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) callback(new Error('请输入正确的邮箱地址'))
  else callback()
}

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

const loadEditData = async () => {
  const [catRes, brandRes, regRes] = await Promise.all([
    getCategoryTree(),
    getBrandList(),
    getRegionTree()
  ])
  categoryTree.value = catRes.data || catRes || []
  brandList.value = brandRes.data || brandRes || []
  regionOptions.value = (regRes.data || regRes || []).map(p => ({
    name: p.province,
    children: p.cities.map(c => ({
      name: c.city,
      children: c.districts.map(d => ({ name: d }))
    }))
  }))
}

const handleEdit = () => {
  dialogVisible.value = true
  // 将当前详情页数据同步到表单
  Object.assign(formData, {
    ...supplierInfo.value,
    id: route.params.id,
    region: [supplierInfo.value.province, supplierInfo.value.city, supplierInfo.value.district],
    categoryIds: [supplierInfo.value.categoryLevel1Id, supplierInfo.value.categoryLevel2Id, supplierInfo.value.categoryLevel3Id]
  })
}

const handleCategoryChange = (value) => {
  if (value && value.length === 3) {
    formData.categoryLevel1Id = value[0]; formData.categoryLevel2Id = value[1]; formData.categoryLevel3Id = value[2]
  }
}

const handleFormRegionChange = (value) => {
  if (value && value.length === 3) {
    formData.province = value[0]; formData.city = value[1]; formData.district = value[2]
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (!valid) return
  submitLoading.value = true
  try {
    await updateSupplier({ ...formData, categoryIds: undefined, region: undefined })
    ElMessage.success('更新成功')
    dialogVisible.value = false
    // 这里理想情况应该重新拉取详情接口，由于目前是 mock，暂不处理
  } finally {
    submitLoading.value = false
  }
}

onMounted(() => {
  console.log('Supplier loaded:', supplierInfo.value.supplierName)
  loadEditData()
})
</script>

<style lang="scss" scoped>
$glass-bg: rgba(255, 255, 255, 0.75);
$glass-border: rgba(255, 255, 255, 0.5);
$primary-blue: #377cfd;
$text-main: #1d1d1f;
$text-sub: #86868b;

.workbench-container {
  position: relative; width: 100%; height: 100vh; padding: 10px; background-color: #f5f7fa; display: flex; justify-content: center; overflow: hidden;
  .background-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(at 0% 0%, rgba(55, 124, 253, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(92, 124, 250, 0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.05) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(245, 158, 11, 0.05) 0px, transparent 50%); z-index: 0; }
}

.workbench-layout { position: relative; z-index: 1; display: flex; gap: 20px; width: 100%; height: 100%; max-width: 1440px; }

.sidebar-glass {
  width: 200px;
  height: 100%;
  background: $glass-bg;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  .logo-container { flex-shrink: 0; margin-bottom: 32px; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 0 16px;
    .logo-box { width: 72px; height: 72px; background: white; border-radius: 18px; padding: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(55, 124, 253, 0.15); img { width: 100%; height: 100%; object-fit: contain; } }
    .app-name { font-size: 16px; font-weight: 700; color: #1d1d1f; letter-spacing: 1px; margin: 0; text-align: center; }
  }
  .side-menu { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; width: 100%; padding: 0 12px; &::-webkit-scrollbar { width: 0; height: 0; }
    .menu-item { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 15px 2px 5px; border-radius: 16px; cursor: pointer; transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); color: $text-sub;
      .el-icon { font-size: 24px; margin-bottom: 4px; transition: transform 0.3s; }
      .menu-text { font-size: 13px; font-weight: 500; letter-spacing: 0.5px; }
      &:hover { background: rgba(255,255,255,0.8); color: $primary-blue; .el-icon { transform: scale(1.1); } }
      &.active { background: linear-gradient(135deg, $primary-blue 0%, #5c7cfa 100%); color: white; box-shadow: 0 8px 20px rgba($primary-blue, 0.3); transform: translateY(-2px); }
    }
  }
  .sidebar-footer {
    flex-shrink: 0;
    margin-top: auto;
    width: 100%;
    padding: 20px 16px;
    border-top: 1px solid rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .user-avatar-section {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      flex: 1;
      min-width: 0;
      
      .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transition: transform 0.3s;
        flex-shrink: 0;
        &:hover { transform: scale(1.05); }
      }
      
      .user-name-text {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 80px;
      }
    }

    .footer-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
      
      .action-item {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $text-sub;
        cursor: pointer;
        transition: all 0.2s;
        
        &:hover {
          background: white;
          color: $primary-blue;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        
        .el-icon { font-size: 18px; }
      }
    }
  }
}

.main-content { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden; }
.detail-wrapper { flex: 1; overflow-y: auto; padding-right: 8px; &::-webkit-scrollbar { width: 4px; } &::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; } }

.supplier-detail-container { display: flex; flex-direction: column; gap: 16px; width: 100%; padding: 4px 0; }

.glass-panel { background: $glass-bg; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid $glass-border; border-radius: 20px; padding: 16px 20px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04); }

/* --- 紧凑头部 --- */
.header-compact-panel {
  .header-main { display: flex; align-items: center; gap: 16px; }
  .company-logo-mini { width: 48px; height: 48px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: $primary-blue; font-size: 24px; }
  .company-info-flex { flex: 1;
    .title-row { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; h1 { margin: 0; font-size: 18px; font-weight: 700; color: $text-main; } }
    .stats-line { font-size: 12px; color: $text-sub; display: flex; align-items: center; gap: 8px; }
  }
}

/* --- 数据网格 --- */
.info-grid { 
  display: grid; 
  grid-template-columns: 3fr 1fr; 
  gap: 16px; 
  align-items: stretch;
}
.info-section {
  min-height: 220px; /* 缩短高度 (从 270px -> 220px) */
  display: flex;
  flex-direction: column;
}
.section-title { font-size: 14px; font-weight: 700; color: $text-main; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; color: $primary-blue; }

.compact-descriptions {
  flex: 1;
  display: flex;
  flex-direction: column;
  
  :deep(.el-descriptions__body) {
    flex: 1;
    .el-descriptions__table {
       height: 100%;
    }
  }

  :deep(.el-descriptions__label) { 
    width: 140px; 
    color: #86868b; 
    background: rgba(0,0,0,0.01) !important; 
    font-size: 12px;
    white-space: nowrap;
    padding: 6px 12px !important; /* 进一步缩回内边距以降低高度 */
  }
  :deep(.el-descriptions__content) { 
    color: #1d1d1f; 
    font-weight: 500; 
    font-size: 13px;
    padding: 6px 12px !important; /* 进一步缩回内边距以降低高度 */
  }
}

/* --- 附件展示 --- */
.attachment-horizontal { 
  display: flex; 
  flex-direction: column; 
  gap: 10px;
  flex: 1;
  .attach-card { width: 100%; background: rgba(255,255,255,0.4); border: 1px solid rgba(0,0,0,0.05); border-radius: 8px; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center; transition: 0.2s;
    &:hover { background: white; border-color: $primary-blue; }
    .file-info { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0;
      .f-icon { font-size: 16px; &.img { color: #ff9800; } &.pdf { color: #f44336; } }
      .f-name { font-size: 13px; color: $text-main; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    }
  }
}

/* --- 材料表格区 --- */
.material-section {
  .section-header-modern { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;
    .title-with-bar { display: flex; align-items: center; gap: 10px; border-left: 4px solid $primary-blue; padding-left: 12px;
      h3 { margin: 0; font-size: 15px; font-weight: 700; color: #1d1d1f; }
    }
  }
  
  /* 修复固定列透明及背景问题 */
  .custom-modern-table {
    background-color: transparent !important;
    
    :deep(tr) {
      background-color: transparent !important;
    }

    :deep(.el-table__cell) {
      background-color: #ffffff !important; /* 默认所有单元格不透明白底 */
    }

    :deep(.el-table__header .el-table__cell) {
      background-color: #f8f9fb !important; /* 所有表头不透明淡灰 */
    }

    /* 针对 fixed 列的特殊处理，确保层级和背景 */
    :deep(.el-table__fixed), :deep(.el-table__fixed-left) {
      height: 100% !important;
      box-shadow: 10px 0 15px -10px rgba(0, 0, 0, 0.1);
      
      .el-table__fixed-body-wrapper .el-table__cell {
        background-color: #ffffff !important;
      }
      .el-table__fixed-header-wrapper .el-table__cell {
        background-color: #f8f9fb !important;
      }
    }

    /* 最后一个左固定列的阴影过渡 */
    :deep(.el-table__cell.is-fixed-left--last::after) {
      box-shadow: inset 10px 0 15px -10px rgba(0, 0, 0, 0.1) !important;
    }
  }
}

.price-val { color: $text-sub; font-size: 12px; }
.price-val-emphasis { color: $text-main; font-weight: 700; font-size: 13px; }

:deep(.el-tag--plain) { background-color: transparent; }

// 弹窗高级样式
:deep(.custom-glass-dialog) {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .el-dialog__header {
    margin: 0;
    padding: 16px 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    .el-dialog__title {
      font-weight: 700;
      font-size: 18px;
      color: #1d1d1f;
    }
  }

  .el-dialog__body {
    padding: 20px 24px;
    max-height: 75vh;
    overflow-y: auto;
    /* 自定义滚动条 */
    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
  }

  .el-dialog__footer {
    padding: 12px 24px 24px;
    border-top: none;
    background: transparent;
  }
}

.form-section {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }

  &:last-child { margin-bottom: 0; }

  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
    color: $primary-blue;
    
    .el-icon { font-size: 18px; }
    span {
      font-size: 14px;
      font-weight: 700;
      color: #1d1d1f;
    }
  }
}

.compact-form {
  :deep(.el-form-item) {
    margin-bottom: 14px;
    .el-form-item__label {
      font-weight: 600;
      color: #1d1d1f;
      font-size: 13px;
      white-space: nowrap;
    }
    .el-input__inner, .el-textarea__inner {
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.8);
      border-color: rgba(0,0,0,0.1);
    }
    .el-input-group__append {
      background-color: rgba(0,0,0,0.02);
      border-radius: 0 8px 8px 0;
      color: #86868b;
      font-size: 12px;
    }
  }
}

.custom-radio-group {
  :deep(.el-radio-button__inner) {
    border-radius: 8px !important;
    margin-right: 8px;
    border: 1px solid rgba(0,0,0,0.1) !important;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: none !important;
    transition: all 0.2s;
    &:hover { color: $primary-blue; }
  }
  :deep(.is-active .el-radio-button__inner) {
    background: $primary-blue !important;
    border-color: $primary-blue !important;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  
  .btn-cancel {
    border-radius: 8px;
    padding: 8px 20px;
    border: 1px solid rgba(0,0,0,0.1);
    background: transparent;
    color: #48484a;
    &:hover { background: rgba(0,0,0,0.05); color: #1d1d1f; }
  }

  .btn-submit {
    border-radius: 10px;
    padding: 8px 24px;
    background: linear-gradient(135deg, $primary-blue 0%, #5c7cfa 100%);
    border: none;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba($primary-blue, 0.3);
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba($primary-blue, 0.4);
    }
  }
}
</style>
