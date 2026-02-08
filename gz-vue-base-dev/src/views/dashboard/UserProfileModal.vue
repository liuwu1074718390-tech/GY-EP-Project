<template>
  <el-dialog
    v-model="visible"
    title="个人中心"
    width="900px"
    class="user-profile-dialog"
    :close-on-click-modal="false"
    append-to-body
    destroy-on-close
  >
    <div class="profile-container">
      <!-- 左侧：个人概览卡片 -->
      <div class="profile-sidebar">
        <div class="avatar-section">
          <userAvatar :user="state.user" />
          <h2 class="user-name">{{ state.user.nickName || state.user.userName }}</h2>
          <div class="user-role-badges">
            <el-tag effect="dark" size="small" round class="role-tag">{{ state.roleGroup || '普通用户' }}</el-tag>
          </div>
        </div>
        
        <div class="user-meta-info">
          <div class="meta-item">
            <el-icon><Iphone /></el-icon>
            <span>{{ state.user.phonenumber }}</span>
          </div>
          <div class="meta-item">
            <el-icon><Message /></el-icon>
            <span :title="state.user.email">{{ state.user.email }}</span>
          </div>
          <div class="meta-item">
            <el-icon><OfficeBuilding /></el-icon>
            <span>{{ state.user.dept ? state.user.dept.deptName : '暂无部门' }}</span>
          </div>
          <div class="meta-item">
            <el-icon><Calendar /></el-icon>
            <span>{{ state.user.createTime }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧：功能操作区 -->
      <div class="profile-content">
        <el-tabs v-model="activeTab" class="custom-profile-tabs">
          <el-tab-pane label="基本资料" name="userinfo">
            <div class="tab-scroll-content">
              <userInfo :user="state.user" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="resetPwd">
            <div class="tab-scroll-content">
              <resetPwd />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { Iphone, Message, OfficeBuilding, Calendar } from '@element-plus/icons-vue';
import userAvatar from '@/views/system/user/profile/userAvatar';
import userInfo from '@/views/system/user/profile/userInfo';
import resetPwd from '@/views/system/user/profile/resetPwd';
import { getUserProfile } from '@/api/system/user';

const visible = ref(false);
const activeTab = ref('userinfo');
const state = reactive({
  user: {},
  roleGroup: '',
  postGroup: ''
});

// 公开打开方法
const open = () => {
  visible.value = true;
  getUser();
};

function getUser() {
  getUserProfile().then(response => {
    state.user = response.data;
    state.roleGroup = response.roleGroup;
    state.postGroup = response.postGroup;
  });
}

defineExpose({
  open
});
</script>

<style lang="scss">
.user-profile-dialog {
  display: flex !important;
  flex-direction: column;
  margin-top: 10vh !important;
  max-height: 80vh;
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
    padding: 0;
    overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  height: 520px;
  background-color: #ffffff;
}

.profile-sidebar {
  width: 260px;
  background: #f7f8fa;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  align-items: center;
  
  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
    
    .user-name {
      margin-top: 12px;
      font-size: 16px;
      font-weight: 700;
      color: #1d1d1f;
    }
    
    .user-role-badges {
      margin-top: 6px;
      .role-tag {
        background-color: #377cfd;
        border-radius: 4px;
        font-size: 11px;
      }
    }
  }
  
  .user-meta-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .meta-item {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      background: #ffffff;
      border: 1px solid #f0f0f0;
      border-radius: 6px;
      color: #606266;
      font-size: 13px;
      transition: all 0.2s;
      
      &:hover {
        border-color: #377cfd;
        background: #f0f7ff;
      }
      
      .el-icon {
        font-size: 16px;
        color: #377cfd;
        margin-right: 10px;
      }
      
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.profile-content {
  flex: 1;
  padding: 16px 24px;
  background-color: #fff;
  overflow: hidden;
  
  :deep(.custom-profile-tabs) {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .el-tabs__item {
      font-size: 14px;
      height: 40px;
      
      &.is-active {
        color: #377cfd;
        font-weight: 600;
      }
    }
    
    .el-tabs__content {
      flex: 1;
      overflow: hidden;
    }
    
    .tab-scroll-content {
      height: 100%;
      overflow-y: auto;
      padding-top: 8px;
      
      &::-webkit-scrollbar { width: 4px; }
      &::-webkit-scrollbar-thumb { background: #e8e8e8; border-radius: 10px; }
    }
  }
}
</style>
