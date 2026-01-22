<template>
	<div>
		<el-drawer v-model="showSettings" :withHeader="false" direction="rtl" size="300px">
			<h4 class="drawer-title">系统UI配置</h4>
			<el-divider />
			<div class="setting-drawer-title">
				<h3 class="drawer-title">菜单布局</h3>
			</div>
			<div class="setting-drawer-block-checbox">
				<div class="setting-drawer-block-checbox-item" @click="topNavChange('top-default')">
					<img src="@/assets/images/top-default.svg" alt="top-default" />
					<div
						v-if="settingsStore.topNav == 'top-default'"
						class="setting-drawer-block-checbox-selectIcon"
						style="display: block"
					>
						<i aria-label="图标: check" class="anticon anticon-check">
							<svg-icon icon-class="check" />
						</i>
					</div>
					<p class="text-c">left</p>
				</div>
				<div class="setting-drawer-block-checbox-item" @click="topNavChange('top-nav')">
					<img src="@/assets/images/top-nav.svg" alt="top-nav" />
					<div v-if="settingsStore.topNav == 'top-nav'" class="setting-drawer-block-checbox-selectIcon" style="display: block">
						<i aria-label="图标: check" class="anticon anticon-check">
							<svg-icon icon-class="check" />
						</i>
					</div>
					<p class="text-c">left-top</p>
				</div>
				<div class="setting-drawer-block-checbox-item" @click="topNavChange('top-menu')">
					<img src="@/assets/images/top-menu.svg" alt="top-menu" />
					<div v-if="settingsStore.topNav == 'top-menu'" class="setting-drawer-block-checbox-selectIcon" style="display: block">
						<i aria-label="图标: check" class="anticon anticon-check">
							<svg-icon icon-class="check" />
						</i>
					</div>
					<p class="text-c">top</p>
				</div>
			</div>

			<div class="setting-drawer-title">
				<h3 class="drawer-title">主题配色</h3>
			</div>
			<div class="setting-drawer-block-checbox">
				<div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-dark')">
					<img src="@/assets/images/dark.svg" alt="dark" />
					<div v-if="sideTheme === 'theme-dark'" class="setting-drawer-block-checbox-selectIcon" style="display: block">
						<i aria-label="图标: check" class="anticon anticon-check">
							<svg-icon icon-class="check" />
						</i>
					</div>
					<p class="text-c">dark</p>
				</div>
				<div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-light')">
					<img src="@/assets/images/light.svg" alt="light" />
					<div v-if="sideTheme === 'theme-light'" class="setting-drawer-block-checbox-selectIcon" style="display: block">
						<i aria-label="图标: check" class="anticon anticon-check">
							<svg-icon icon-class="check" />
						</i>
					</div>
					<p class="text-c">light</p>
				</div>
			</div>

			<div class="setting-drawer-title">
				<h3 class="drawer-title">UI风格</h3>
			</div>

			<!-- <div class="drawer-item">
			<span>主题颜色</span>
			<span class="comp-style">
				<el-color-picker v-model="theme" :predefine="predefineColors" @change="themeChange" />
			</span>
		</div> -->

			<!-- <div class="drawer-item">
			<span>开启 TopNav</span>
			<span class="comp-style">
				<el-switch v-model="settingsStore.topNav" @change="topNavChange" class="drawer-switch" />
			</span>
		</div> -->

			<div class="drawer-item">
				<span>开启 Tags-Views</span>
				<span class="comp-style">
					<el-switch v-model="settingsStore.tagsView" class="drawer-switch" />
				</span>
			</div>

			<div class="drawer-item">
				<span>固定 Header</span>
				<span class="comp-style">
					<el-switch v-model="settingsStore.fixedHeader" class="drawer-switch" />
				</span>
			</div>

			<div class="drawer-item">
				<span>显示 Logo</span>
				<span class="comp-style">
					<el-switch v-model="settingsStore.sidebarLogo" class="drawer-switch" />
				</span>
			</div>

			<div class="drawer-item">
				<span>动态标题</span>
				<span class="comp-style">
					<el-switch v-model="settingsStore.dynamicTitle" class="drawer-switch" />
				</span>
			</div>

			<el-divider />

			<el-button type="primary" plain icon="DocumentAdd" @click="saveSetting">保存配置</el-button>
			<el-button plain icon="Refresh" @click="resetSetting">重置配置</el-button>
		</el-drawer>

		<div v-if="storeSettings" class="switch-setting" @click="openSetting">
			<el-icon><Setting /></el-icon>
		</div>
	</div>
</template>

<script setup>
// import variables from '@/styles/variables.module.scss';
// import axios from 'axios';
// import { ElLoading, ElMessage } from 'element-plus';
// import { useDynamicTitle } from '@/utils/dynamicTitle';
import { computed, getCurrentInstance } from 'vue';
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';
import { handleThemeStyle } from '@/utils/theme';
import { ref } from 'vue';

const { proxy } = getCurrentInstance();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const showSettings = ref(false);
const theme = ref(settingsStore.theme);
const sideTheme = ref(settingsStore.sideTheme);
const storeSettings = computed(() => settingsStore.showSettings);
const predefineColors = ref(['#377CFD', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']);

/** 是否需要topnav */
function topNavChange(val) {
	settingsStore.topNav = val;
	if (val == 'top-nav') {
		appStore.toggleSideBarHide(false, 0);
		permissionStore.setSidebarRouters(permissionStore.defaultRoutes);
	} else if (val == 'top-menu') {
		appStore.toggleSideBarHide(true, 1);
		permissionStore.setSidebarRouters(permissionStore.defaultRoutes);
	} else {
		appStore.toggleSideBarHide(false, 2);
		permissionStore.setSidebarRouters(permissionStore.defaultRoutes);
	}
}

function themeChange(val) {
	settingsStore.theme = val;
	handleThemeStyle(val);
}
function handleTheme(val) {
	settingsStore.sideTheme = val;
	sideTheme.value = val;
}
function saveSetting() {
	proxy.$modal.loading('正在保存到本地，请稍候...');
	let layoutSetting = {
		topNav: storeSettings.value.topNav,
		tagsView: storeSettings.value.tagsView,
		fixedHeader: storeSettings.value.fixedHeader,
		sidebarLogo: storeSettings.value.sidebarLogo,
		dynamicTitle: storeSettings.value.dynamicTitle,
		sideTheme: storeSettings.value.sideTheme,
		theme: storeSettings.value.theme
	};
	localStorage.setItem('layout-setting', JSON.stringify(layoutSetting));
	setTimeout(proxy.$modal.closeLoading(), 1000);
}
function resetSetting() {
	proxy.$modal.loading('正在清除设置缓存并刷新，请稍候...');
	localStorage.removeItem('layout-setting');
	setTimeout('window.location.reload()', 1000);
}
function openSetting() {
	showSettings.value = true;
}

defineExpose({
	openSetting
});
</script>

<style lang="scss" scoped>
.setting-drawer-title {
	margin-bottom: 12px;
	font-weight: bold;
	line-height: 22px;
	color: rgb(0 0 0 / 85%);
	.drawer-title {
		font-size: 14px;
	}
}
.setting-drawer-block-checbox {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-top: 10px;
	margin-bottom: 20px;
	.setting-drawer-block-checbox-item {
		position: relative;
		margin-right: 16px;
		cursor: pointer;
		border-radius: 2px;
		img {
			width: 48px;
			height: 48px;
		}
		.custom-img {
			width: 48px;
			height: 38px;
			border-radius: 5px;
			box-shadow: 1px 1px 2px #898484;
		}
		.setting-drawer-block-checbox-selectIcon {
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			padding-top: 15px;
			padding-left: 24px;
			font-size: 14px;
			font-weight: 700;
			color: #1890ff;
		}
	}
}
.drawer-item {
	padding: 12px 0;
	font-size: 14px;
	color: rgb(0 0 0 / 65%);
	.comp-style {
		float: right;
		margin: -3px 8px 0 0;
	}
}
.switch-setting {
	position: fixed;
	top: 50%;
	right: 0;
	padding: 5px;
	width: 30px;
	height: 30px;
	border: 1px solid #377cfd;
	border-right: 0;
	border-radius: 5px 0 0 5px;
	cursor: pointer;
	opacity: 0.7;
	.el-icon {
		font-size: 20px;
		color: #377cfd;
	}

	&:hover {
		opacity: 1;
		background-color: #377cfd;
		.el-icon {
			font-size: 20px;
			color: #ffffff;
		}
	}
}
</style>
