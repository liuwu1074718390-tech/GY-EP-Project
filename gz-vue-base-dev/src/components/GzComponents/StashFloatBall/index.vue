<template>
  <transition name="ball-fade">
    <div 
      v-if="stashStore.count > 0" 
      class="stash-float-ball-container"
      :class="{ 'is-expanded': isHovered }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- 默认球体状态 -->
      <div v-if="!isHovered" class="stash-ball">
        <el-icon class="ball-icon"><Collection /></el-icon>
        <div class="count-badge">{{ stashStore.count }}</div>
      </div>

      <!-- 展开菜单状态 -->
      <div v-else class="stash-menu">
        <div class="menu-item delete" @click="handleClear">
          <el-icon><Delete /></el-icon>
          <span>清空</span>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item" @click="handleView">
          <el-icon><View /></el-icon>
          <span>查看</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { Collection, View, Delete } from '@element-plus/icons-vue'
import { stashStore } from '@/store/stashStore'
import { ElMessageBox, ElMessage } from 'element-plus'

const isHovered = ref(false)

const emit = defineEmits(['open-list'])

const handleView = () => {
  emit('open-list')
}

const handleClear = () => {
  ElMessageBox.confirm('确定清空已暂存的材价吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    stashStore.clear()
    ElMessage.success('已清空暂存材价')
  }).catch(() => {})
}
</script>

<style lang="scss" scoped>
.stash-float-ball-container {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  
  &.is-expanded {
    transform: scale(1.05);
  }
}

.stash-ball {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #377cfd 0%, #2059cc 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(55, 124, 253, 0.3);
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.2);

  .ball-icon {
    font-size: 24px;
    color: white;
  }

  .count-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    background: #ff4d4f;
    color: white;
    font-size: 12px;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.stash-menu {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 28px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  height: 56px;

  .menu-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 20px;
    transition: all 0.2s;
    color: #1d1d1f;
    font-size: 14px;
    font-weight: 500;

    &:hover {
      background: rgba(55, 124, 253, 0.1);
      color: #377cfd;
    }

    &.delete:hover {
      background: rgba(255, 77, 79, 0.1);
      color: #ff4d4f;
    }
  }

  .menu-divider {
    width: 1px;
    height: 20px;
    background: rgba(0, 0, 0, 0.08);
  }
}

/* 过渡动画 */
.ball-fade-enter-active, .ball-fade-leave-active {
  transition: all 0.3s ease;
}
.ball-fade-enter-from, .ball-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.5);
}
</style>
