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
// 覆盖 Dialog 样式使其更美观
.user-profile-dialog {
  border-radius: 20px;
  overflow: hidden;
  
  .el-dialog__header {
    margin: 0;
    padding: 20px 24px;
    background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
    border-bottom: 1px solid #eee;
    
    .el-dialog__title {
      font-weight: 700;
      color: #333;
    }
  }
  
  .el-dialog__body {
    padding: 0;
  }
}
</style>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  height: 550px;
  background-color: #f9fbfd;
}

.profile-sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  align-items: center;
  
  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    
    .user-name {
      margin-top: 15px;
      font-size: 20px;
      font-weight: 700;
      color: #333;
    }
    
    .user-role-badges {
      margin-top: 8px;
      .role-tag {
        background-color: #377cfd;
        border-color: #377cfd;
      }
    }
  }
  
  .user-meta-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    .meta-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: #f8fafc;
      border-radius: 12px;
      color: #555;
      font-size: 14px;
      transition: all 0.3s;
      
      &:hover {
        background: #f0f4f8;
        transform: translateX(4px);
      }
      
      .el-icon {
        font-size: 18px;
        color: #377cfd;
        margin-right: 12px;
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
  padding: 20px 30px;
  background-color: #fff;
  
  :deep(.custom-profile-tabs) {
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .el-tabs__nav-wrap::after {
      height: 1px;
      background-color: #f0f0f0;
    }
    
    .el-tabs__item {
      font-size: 16px;
      height: 50px;
      
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
      padding-right: 10px;
      padding-top: 10px;
      
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #e0e0e0;
        border-radius: 3px;
      }
    }
  }
}
</style>
