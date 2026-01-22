<template>
	<div
		class="navbar"
		:class="'navbar-' + sideTheme"
		:style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }"
	>
		<TopMenuLogo :collapse="isCollapse" class="top-menu-logo-container" v-if="settingsStore.topNav == 'top-menu'"></TopMenuLogo>
		<hamburger
			v-if="settingsStore.topNav !== 'top-menu'"
			v-show="!appStore.sidebar.hide"
			id="hamburger-container"
			:is-active="appStore.sidebar.opened"
			class="hamburger-container"
			@toggleClick="toggleSideBar"
		/>

		<breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="settingsStore.topNav == 'top-default'" />
		<top-nav id="topnav-container" class="topnav-container" v-if="settingsStore.topNav == 'top-nav'" />
		<top-menu id="topmenu-container" class="topmenu-container" v-if="settingsStore.topNav == 'top-menu'" />

		<div class="right-menu">
			<!-- <template v-if="appStore.device !== 'mobile'">
				<header-search id="header-search" class="right-menu-item" />

				<screenfull id="screenfull" class="right-menu-item hover-effect" />

				<el-tooltip content="布局大小" effect="dark" placement="bottom">
					<size-select id="size-select" class="right-menu-item hover-effect" />
				</el-tooltip>
			</template> -->
			<div class="avatar-container">
				<el-dropdown @command="handleCommand" class="right-menu-item hover-effect" trigger="click">
					<div class="avatar-wrapper">
						<img :src="userStore.avatar" class="user-avatar" />
						<el-icon><caret-bottom /></el-icon>
					</div>
					<template #dropdown>
						<el-dropdown-menu>
							<router-link to="/user/profile">
								<el-dropdown-item>个人中心</el-dropdown-item>
							</router-link>
							<el-dropdown-item command="setLayout" v-if="settingsStore.showSettings">
								<span>布局设置</span>
							</el-dropdown-item>
							<el-dropdown-item divided command="logout">
								<span>退出登录</span>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { ElMessageBox } from 'element-plus';
import Breadcrumb from '@/components/Breadcrumb';
import TopNav from './TopNav';
import TopMenu from './TopMenu';
import TopMenuLogo from './TopMenu/Logo';
import Hamburger from '@/components/Hamburger';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import HeaderSearch from '@/components/HeaderSearch';
import useAppStore from '@/store/modules/app';
import useUserStore from '@/store/modules/user';
import useSettingsStore from '@/store/modules/settings';
import variables from '@/styles/variables.module.scss';

const appStore = useAppStore();
const userStore = useUserStore();
const settingsStore = useSettingsStore();

const sideTheme = computed(() => settingsStore.sideTheme);
const isCollapse = computed(() => !appStore.sidebar.opened);

function toggleSideBar() {
	appStore.toggleSideBar();
}

function handleCommand(command) {
	switch (command) {
		case 'setLayout':
			setLayout();
			break;
		case 'logout':
			logout();
			break;
		default:
			break;
	}
}

function logout() {
	ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			userStore.logOut().then(() => {
				location.href = '/index';
			});
		})
		.catch(() => {});
}

const emits = defineEmits(['setLayout']);
function setLayout() {
	emits('setLayout');
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.navbar {
	position: relative;
	height: $top-nav-height;
	overflow: hidden;
	background: $base-menu-background;
	box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
	.hamburger-container {
		float: left;
		height: 100%;
		line-height: $top-nav-height;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;
		&:hover {
			background: $base-sub-menu-hover;
		}
	}
	.top-menu-logo-container {
		float: left;
		height: 100%;
		line-height: $top-nav-height;
	}
	.breadcrumb-container {
		float: left;
	}
	.topnav-container {
		position: absolute;
		left: 50px;
		border: none !important;
	}
	.topmenu-container {
		position: absolute;
		left: $topmenu-logo;
		border: none !important;
	}
	.errLog-container {
		display: inline-block;
		vertical-align: top;
	}
	.right-menu {
		display: flex;
		float: right;
		height: 100%;
		line-height: $top-nav-height;
		&:focus {
			outline: none;
		}
		.right-menu-item {
			display: inline-block;
			height: 100%;
			padding: 0 8px;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;
			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;
				&:hover {
					background: rgb(0 0 0 / 2.5%);
				}
			}
		}
		.avatar-container {
			margin-right: 40px;
			.avatar-wrapper {
				position: relative;
				margin-top: -20px;
				top: 50%;
				.user-avatar {
					width: 40px;
					height: 40px;
					cursor: pointer;
					border-radius: 40px;
				}
				i {
					position: absolute;
					top: 25px;
					right: -20px;
					font-size: 12px;
					cursor: pointer;
				}
			}
		}
	}
}

.navbar-theme-dark {
	.right-menu-item,
	:deep(.size-icon) {
		color: $base-menu-color !important;
	}
}
</style>
