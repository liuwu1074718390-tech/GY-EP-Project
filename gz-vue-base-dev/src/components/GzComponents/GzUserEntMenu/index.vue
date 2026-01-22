<template>
	<div
		class="gz-user-ent-menu"
		:style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }"
	>
		<div class="gz-user-ent-menu-list" :class="isCollapse ? 'flex-space-between-vertical' : 'flex-space-between'">
			<el-popover placement="top-start" trigger="hover" width="290">
				<template #reference>
					<div class="flex-start-horizontal cur-info">
						<el-avatar shape="square" class="cur-p" :size="28" :src="curEntInfo.ossHeadImg || logoEnt" />
						<svg-icon class="menu-show" icon-class="menu-show" />
						<!-- <p class="flex-space-between">
						<span class="tx-of f-13" :title="curEntInfo.name">{{ curEntInfo.name }}</span>
						<el-icon style="width: 16px; height: 16px"><CaretBottom /></el-icon>
					</p> -->
					</div>
				</template>
				<template #default>
					<!-- <div class="flex-space-between">
					<el-button type="primary" @click="toHome"
						><el-icon class="f-22 mr-5"><Position /></el-icon> 进入交易平台</el-button
					>
					<el-button plain @click="logout">
						<svg-icon class="mr-5" style="width: 16px; height: 16px" icon-class="logout-box-r-line" />
						<span style="color: #333333">退出登录</span>
					</el-button>
				</div> -->
					<p class="f-14 f-700 pb-10">切换登录</p>
					<div class="ent-list">
						<div class="ent-item flex-start-horizontal pos-r" @click="toPersonal">
							<el-avatar shape="square" :size="32" :src="userStore.avatar || logo" />
							<p class="tx-of f-15 ml-5">个人用户端</p>
							<el-icon v-if="!curEntId" style="color: #377cfd" class="f-18"><Select /></el-icon>
						</div>
						<div
							v-for="(item, index) in userStore.entList"
							:key="index"
							class="ent-item flex-start-horizontal pos-r"
							@click="toEnterprise(item)"
						>
							<el-avatar shape="square" :size="32" :src="item.ossHeadImg || logoEnt" />
							<p class="tx-of f-15 ml-5">{{ item.name }}</p>
							<el-icon v-if="curEntId == item.id" style="color: #377cfd" class="f-18"><Select /></el-icon>
						</div>
					</div>
					<el-button plain class="w100 mt-20" @click="joinUs"
						><el-icon class="f-22 mr-5"><Plus /></el-icon>注册/加入企业</el-button
					>
				</template>
			</el-popover>

			<!-- home -->
			<el-popover trigger="hover" :placement="isCollapse ? 'right' : 'top-start'">
				<template #reference>
					<div class="cur-p gz-user-ent-menu-item" @click="toHome">
						<svg-icon style="width: 18px; height: 18px" icon-class="menu-home" />
					</div>
				</template>
				<template #default><p class="text-c cur-p" @click="toHome">广咨智采首页</p></template>
			</el-popover>

			<!-- user -->
			<el-popover trigger="hover" :placement="isCollapse ? 'right' : 'top-start'">
				<template #reference>
					<div class="cur-p gz-user-ent-menu-item" @click="toUser">
						<svg-icon style="width: 18px; height: 18px" icon-class="menu-user" />
					</div>
				</template>
				<template #default>
					<p class="text-c cur-p" @click="toUser">账号设置</p>
				</template>
			</el-popover>

			<!-- logout -->
			<el-popover trigger="hover" :placement="isCollapse ? 'right' : 'top-start'">
				<template #reference>
					<div class="cur-p gz-user-ent-menu-item" @click="logout">
						<svg-icon style="width: 18px; height: 18px" icon-class="menu-logout" />
					</div>
				</template>
				<template #default>
					<p class="text-c cur-p" @click="logout">退出登录</p>
				</template>
			</el-popover>
		</div>
	</div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue';
import variables from '@/styles/variables.module.scss';
import logo from '@/assets/icons/other/head-icon-user@2x.png';
import logoEnt from '@/assets/icons/other/head-icon-business@2x.png';
import useSettingsStore from '@/store/modules/settings';
import { ElMessageBox } from 'element-plus';
import useUserStore from '@/store/modules/user';
import configCommon from '@/config/common';
import { getEntInfo } from '@/api/enterprise/info';
import { useRouter } from 'vue-router';
import useEnterpriseStore from '@/store/modules/enterprise';
import useAppStore from '@/store/modules/app';
const enterpriseStore = useEnterpriseStore();
const router = useRouter();
// const title = import.meta.env.VITE_APP_TITLE;
const settingsStore = useSettingsStore();
const appStore = useAppStore();
const sideTheme = computed(() => settingsStore.sideTheme);
const isCollapse = computed(() => !appStore.sidebar.opened);
const userStore = useUserStore();
const { proxy } = getCurrentInstance();
// userStore.getInfo({ quiet: true }).then(
// 	res => {
// 		// console.log(res);
// 	},
// 	err => {
// 		// console.log(err);
// 		userStore.logOut();
// 	}
// );

const curEntId = computed(() => enterpriseStore.getCurTabEntID() || null);
const curEntInfo = computed(() => {
	if (enterpriseStore?.entInfo?.id) {
		return enterpriseStore.entInfo;
	} else {
		return {
			name: userStore.nickName || userStore.phone,
			ossHeadImg: userStore.avatar || logo
		};
	}
});
// defineProps({
// 	collapse: {
// 		type: Boolean,
// 		required: true
// 	}
// });

// console.log(userStore);
const handleCommand = command => {
	switch (command) {
		case 'logout':
			logout();
			break;
		case 'home':
			toHome();
			break;
		case 'setting':
			toSetting();
			break;
		case 'joinUs':
		default:
			break;
	}
};
const toHome = () => {
	// if (!_IPC.pubSub.emitOnce('checkUserIsLogin')) return;
	router.push({ path: '/' });
	//location.href = useUserStore().getDefaultPath();
};
const toSetting = () => {
	// router.push({ path: configCommon.afterLoginPath });
	// router.push({ path: '/setting/account-setting' });
	window.open('/setting/account-setting');
};
const logout = () => {
	ElMessageBox.confirm('确定退出当前账户吗？', '系统提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			userStore.logOut().then(() => {
				// location.href = useUserStore().getDefaultPath();
				// location.href = '/login';
				// window.location.reload();
				router.push({ path: '/' });
			});
		})
		.catch(() => {});
};

const joinUs = () => {
	proxy.$modal.loading();
	location.href = '/account';
};

const toPersonal = () => {
	proxy.$modal.loading();
	getEntInfo({ entId: null }).then(() => {
		enterpriseStore.setEntInfo({ id: null });
		location.href = '/personal';
		// router.push({ path: '/personal' });
		// location.reload();
	});
};

const toEnterprise = item => {
	proxy.$modal.loading();
	enterpriseStore.setEntInfo(item);
	// console.log(location.href);
	// if (location.href.includes('/personal')) {
	location.href = '/enterprise';
	// } else {
	// 	location.reload();
	// }
};

const toUser = () => {
	// isPerson.value ? router.push({ path: '/setting/account-setting' }) : router.push({ path: '/personal' });
	window.open('/setting/account-setting');
};
</script>

<style lang="scss" scoped>
// $home-height: 40px;
.sidebarLogoFade-enter-active {
	transition: opacity 1.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
	opacity: 0;
}

.el-dropdown {
	width: 100%;
	height: 100%;
}

.ent-list {
	max-height: 600px;
	overflow: auto;
}
.ent-item {
	height: 50px;
	line-height: 50px;
	padding-right: 25px;
	padding-left: 10px;
	margin-right: 2px;
	cursor: pointer;

	& > p {
		width: calc(100% - 35px);
		text-align: left;
	}
	&:hover {
		background: #f1f5ff;
	}
	& > .el-icon {
		position: absolute;
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
	}
}
.gz-user-ent-menu {
	width: 100%;
	// height: $home-height;
	overflow: hidden;
	// line-height: $home-height;
	text-align: center;
	// background-color: inherit !important;
	// position: relative;
	// z-index: 999;
	// box-shadow: 0 0 4px #e0e5ed;
	border: 1px solid #f3f5f9;
	border-radius: 8px;
}
.gz-user-ent-menu-list {
	width: 100%;
	background: #f5f8fd;
	padding: 6px 10px;

	.cur-info {
		cursor: pointer;
		// height: 100%;
		// width: 100%;
		& > p {
			width: calc(100% - 45px);
			span {
				width: calc(100% - 10px);
				text-align: left;
			}
		}

		.el-avatar {
			border: 2px solid #ffffff;
		}

		.menu-show {
			width: 18px !important;
			height: 18px !important;
			margin-left: -2px !important;
			margin-right: 0 !important;
		}
	}

	.svg-icon {
		margin-right: 0 !important;
	}

	&.flex-space-between-vertical {
		> .gz-user-ent-menu-item .svg-icon {
			margin: 8px !important;
		}

		.cur-info {
			margin-left: 14px;
			margin-top: 4px;
			margin-bottom: 4px;
		}
	}
}
</style>
