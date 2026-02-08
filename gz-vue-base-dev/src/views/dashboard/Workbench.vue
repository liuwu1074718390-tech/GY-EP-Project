<template>
  <div class="workbench-container">
    <!-- 背景层 (模拟截图中的渐变背景) -->
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
            :class="['menu-item', { active: activeMenu === item.name || (activeMenu === '材价详情' && item.name === '材价查询') || (activeMenu === '组价详情' && item.name === '智能组价') }]"
            @click="handleMenuClick(item.name)"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span class="menu-text">{{ item.label }}</span>
          </div>
        </nav>
        <div class="sidebar-footer">
          <div class="user-avatar-section" @click="goUserCenter">
            <img :src="userStore.avatar || '@/assets/images/touxiang.png'" class="user-avatar" alt="User" />
            <span class="user-name-text">{{ userStore.nickName || '用户' }}</span>
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

      <!-- 主内容区 -->
      <main class="main-content">
        <!-- 动态组件切换 -->
        <component :is="currentViewComponent" />
      </main>
    </div>
    
    <!-- 个人中心弹窗 -->
    <UserProfileModal ref="userProfileRef" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { 
  DataAnalysis, DataLine, Search, Collection, Postcard, 
  OfficeBuilding, PriceTag,
  HomeFilled, User, SwitchButton, CaretTop, CaretBottom,
  UserFilled
} from '@element-plus/icons-vue'
import MaterialPriceQuery from './MaterialPriceQuery.vue'
import PurchaseComparison from './PurchaseComparison.vue'
import MaterialDashboard from './MaterialDashboard.vue'
import PurchaseDashboard2 from './PurchaseDashboard2.vue'
import MaterialStandard from '../system/MaterialStandard.vue'
import SupplierQuery from '../system/SupplierQuery.vue'
import MaterialDetail from './MaterialDetail.vue'
import SmartPricing from './SmartPricing.vue'
import PricingDetail from './PricingDetail.vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import useUserStore from '@/store/modules/user'
import UserProfileModal from './UserProfileModal.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const userProfileRef = ref(null)

const goHome = () => {
  router.push('/index')
}

const goUserCenter = () => {
  // router.push('/user/profile')
  userProfileRef.value.open()
}

const handleLogout = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userStore.logOut().then(() => {
        location.href = '/'
      })
    })
    .catch(() => {})
}

// 动态组件映射
const componentMap = {
  '驾驶舱': MaterialDashboard,
  '驾驶舱2': PurchaseDashboard2,
  '材价查询': MaterialPriceQuery,
  '采购比价': PurchaseComparison,
  '供应商查询': SupplierQuery,
  '材料标准': MaterialStandard,
  '材价详情': MaterialDetail,
  '智能组价': SmartPricing,
  '组价详情': PricingDetail,
  // 后续可继续添加其他模块
  // '成员管理': MemberManagement,
  // '企业信息': CompanyInfo,
}

// 初始化 activeMenu，优先从 URL query 读取，实现刷新保持状态
const initialTab = route.query.tab
const isValidMenu = (name) => !!componentMap[name] || ['材料标准', '供应商查询', '材价详情', '智能组价', '组价详情'].includes(name)
const activeMenu = ref(isValidMenu(initialTab) ? initialTab : '驾驶舱')

// 当前视图组件
const currentViewComponent = computed(() => componentMap[activeMenu.value])

const menuItems = [
  { name: '驾驶舱', label: '驾驶舱', icon: 'DataAnalysis' },
  { name: '材价查询', label: '材价查询', icon: 'Search' },
  { name: '智能组价', label: '智能组价', icon: 'PriceTag' },
  { name: '采购比价', label: '采购比价', icon: 'DataLine' },
  { name: '供应商查询', label: '供应商查询', icon: 'OfficeBuilding' },
  { name: '材料标准', label: '材料标准', icon: 'Collection' },
]

// 菜单点击处理
const handleMenuClick = (menuName) => {
  activeMenu.value = menuName
  // 更新 URL query，不刷新页面
  router.replace({ query: { ...route.query, tab: menuName } })
}

// 监听路由参数变化，实现组件内部跳转同步
watch(() => route.query.tab, (newTab) => {
  if (isValidMenu(newTab) && activeMenu.value !== newTab) {
    activeMenu.value = newTab
  }
})
</script>

<style lang="scss" scoped>
// 变量定义
$glass-bg: rgba(255, 255, 255, 0.75);
$glass-border: rgba(255, 255, 255, 0.5);
$primary-blue: #377cfd;
$text-main: #1d1d1f;
$text-sub: #86868b;

.workbench-container {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: #f5f7fa;
  // overflow: hidden; // 已移除：允许子元素滚动以解决小屏幕内容溢出问题
  display: flex;
  justify-content: center;

  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(at 0% 0%, rgba(55, 124, 253, 0.1) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(92, 124, 250, 0.1) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.05) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(245, 158, 11, 0.05) 0px, transparent 50%);
    z-index: 0;
  }
}

.workbench-layout {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: stretch;
  gap: 20px;
  width: 100%;
  height: 100%;
  max-width: 1440px;
}

// 侧边栏样式
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
  padding: 20px 0 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);

  .logo-container {
    flex-shrink: 0; // 防止 Logo 被压缩
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 0 16px;

    .logo-box {
      width: 50px;
      height: 50px;
      background: white;
      border-radius: 18px;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(55, 124, 253, 0.15);
      transition: transform 0.3s ease;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      &:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 12px 32px rgba(55, 124, 253, 0.2);
      }
    }

    .app-name {
      font-size: 16px;
      font-weight: 700;
      color: #1d1d1f;
      letter-spacing: 1px;
      margin: 0;
      text-align: center;
      background: linear-gradient(135deg, #1d1d1f 0%, #4a4a4f 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.9;
    }
  }

  .side-menu {
    flex: 1;
    min-height: 0; // 关键：允许 flex 子项收缩
    overflow-y: auto; // 关键：内容溢出时滚动
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    padding: 10px 12px 0; // 增加顶部内边距，防止第一个菜单项被裁剪
    
    
    // 隐藏滚动条
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .menu-item {
      flex-shrink: 0; // 防止菜单项本身被压缩变形
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 13px 2px 7px;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      color: $text-sub;

      .el-icon {
        font-size: 20px;
        margin-bottom: 4px;
        transition: transform 0.3s;
      }

      .menu-text {
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      &:hover {
        background: rgba(255,255,255,0.8);
        color: $primary-blue;
        .el-icon { transform: scale(1.1); }
      }

      &.active {
        background: linear-gradient(135deg, $primary-blue 0%, #5c7cfa 100%);
        color: white;
        box-shadow: 0 8px 20px rgba($primary-blue, 0.3);
        transform: translateY(-2px);
      }
    }
  }

  .sidebar-footer {
    flex-shrink: 0; // 防止底部被压缩
    margin-top: auto;
    width: 100%;
    padding: 20px 0;
    border-top: 1px solid rgba(0,0,0,0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    
    .user-avatar-section {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      flex: 1;
      min-width: 0; // 允许 flex 子项收缩
      
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

// 主内容样式
  .main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0; // 防止 flex 溢出
  min-height: 0; // 关键：允许内容溢出时正确处理
  overflow: auto; // 允许滚动

  // 让动态组件填满主区域高度
  > :first-child {
    flex: 1;
    min-height: 0;
  }

  .workbench-home-scroll {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 2px; // 留白对齐
  }

  .glass-card {
    background: $glass-bg;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid $glass-border;
    border-radius: 28px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
  }

  .content-header {
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-name {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
      color: $text-main;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 20px;
      .tip-text {
        font-size: 13px;
        color: $text-sub;
      }
    }

    .quick-nav {
      display: flex;
      gap: 16px;
      .nav-item {
        background: rgba(255,255,255,0.8);
        padding: 12px 20px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        
        &:hover { 
          background: white; 
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .msg-icon { color: #5c7cfa; font-size: 18px; }
        .set-icon { color: #339af0; font-size: 18px; }
        .arrow { font-size: 12px; color: #ced4da; }
      }
    }
  }

  .center-layout {
    display: flex;
    gap: 20px;
    flex: 1;

    .attention-section {
      flex: 5;
      padding: 24px;
      display: flex;
      flex-direction: column;
    }

    .footprint-section {
      flex: 2;
      padding: 24px;
    }
  }

  .section-header {
    margin-bottom: 24px;
    .title-with-icon {
      display: flex;
      align-items: center;
      gap: 14px;
      h3 { font-size: 18px; font-weight: 700; color: $text-main; }
      .icon-box {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
        &.orange { background: linear-gradient(135deg, #ff922b, #f08c00); }
        &.green { background: linear-gradient(135deg, #40c057, #2f9e44); }
      }
    }
  }

  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 0;

    .empty-illustration {
      width: 140px;
      height: 140px;
      background: radial-gradient(circle, rgba($primary-blue, 0.08) 0%, transparent 70%);
      border-radius: 50%;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .bell-icon, .search-icon {
        font-size: 64px;
        color: rgba($primary-blue, 0.15);
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.05));
      }
    }

    p { margin-bottom: 24px; font-size: 15px; color: $text-sub; }

    &.mini {
      .empty-illustration { width: 100px; height: 100px; }
      p { font-size: 14px; }
    }
  }

  .bottom-actions {
    padding: 28px;
    .action-grid {
      display: flex;
      justify-content: space-around;
      
      .action-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        cursor: pointer;
        transition: all 0.3s;
        
        &:hover { 
          transform: translateY(-8px); 
          .action-icon { box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
        }

        span { font-size: 15px; color: $text-main; font-weight: 600; }

        .action-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: white;
          transition: all 0.3s;
          
          &.blue { background: linear-gradient(135deg, #377cfd, #215ecf); }
          &.indigo { background: linear-gradient(135deg, #5c7cfa, #4263eb); }
          &.emerald { background: linear-gradient(135deg, #10b981, #059669); }
          &.amber { background: linear-gradient(135deg, #f59e0b, #d97706); }
        }
      }
    }
  }
}

// Element Plus 深度定制
:deep(.custom-tabs) {
  .el-tabs__nav-wrap::after { display: none; }
  .el-tabs__active-bar {
    height: 4px;
    border-radius: 4px;
    background-color: $primary-blue;
    box-shadow: 0 2px 6px rgba($primary-blue, 0.3);
  }
  .el-tabs__item {
    font-size: 16px;
    font-weight: 600;
    color: $text-sub;
    padding: 0 20px 12px;
    &.is-active { color: $primary-blue; }
    &:hover { color: $primary-blue; }
  }
}
</style>
