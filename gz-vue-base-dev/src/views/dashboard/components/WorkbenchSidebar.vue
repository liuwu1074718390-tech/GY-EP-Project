<template>
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
        :class="['menu-item', { active: isActive(item.name) }]"
        @click="emit('menu-click', item.name)"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <span class="menu-text">{{ item.label }}</span>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="user-avatar-section" @click="emit('user-center')">
        <img :src="avatarSrc" class="user-avatar" alt="User" />
        <span class="user-name-text">{{ userName || '用户' }}</span>
      </div>
      <div class="footer-actions">
        <el-tooltip content="个人中心" placement="top">
          <div class="action-item" @click="emit('user-center')">
            <el-icon><User /></el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="退出登录" placement="top">
          <div class="action-item" @click="emit('logout')">
            <el-icon><SwitchButton /></el-icon>
          </div>
        </el-tooltip>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { User, SwitchButton } from '@element-plus/icons-vue'
import defaultAvatar from '@/assets/images/touxiang.png'

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => []
  },
  activeMenu: {
    type: String,
    default: ''
  },
  activeMatcher: {
    type: Function,
    default: null
  },
  userName: {
    type: String,
    default: ''
  },
  userAvatar: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['menu-click', 'user-center', 'logout'])

const avatarSrc = computed(() => props.userAvatar || defaultAvatar)

const isActive = (menuName) => {
  if (typeof props.activeMatcher === 'function') {
    return props.activeMatcher(menuName)
  }
  return props.activeMenu === menuName
}
</script>

<style lang="scss" scoped>
$glass-bg: rgba(255, 255, 255, 0.75);
$glass-border: rgba(255, 255, 255, 0.5);
$primary-blue: #377cfd;
$text-sub: #86868b;

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
    flex-shrink: 0;
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
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    padding: 10px 12px 0;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .menu-item {
      flex-shrink: 0;
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
        background: rgba(255, 255, 255, 0.8);
        color: $primary-blue;

        .el-icon {
          transform: scale(1.1);
        }
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
    flex-shrink: 0;
    margin-top: auto;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
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
      min-width: 0;

      .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
        flex-shrink: 0;

        &:hover {
          transform: scale(1.05);
        }
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
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .el-icon {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
