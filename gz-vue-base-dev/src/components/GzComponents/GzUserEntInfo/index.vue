<template>
	<div
		class="gz-user-ent-info"
		:style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }"
	>
		<el-popover placement="top-start" trigger="hover" width="290">
			<template #reference>
				<div class="flex-space-between cur-info">
					<el-avatar class="cur-p" :size="36" :src="curEntInfo.ossHeadImg || logoEnt" />
					<p class="flex-space-between">
						<span class="tx-of f-13" :title="curEntInfo.name">{{ curEntInfo.name }}</span>
						<el-icon style="width: 16px; height: 16px"><CaretBottom /></el-icon>
					</p>
				</div>
			</template>
			<template #default
				><div class="flex-space-between">
					<el-button type="primary" @click="toHome"
						><el-icon class="f-22 mr-5"><Position /></el-icon> 进入交易平台</el-button
					>
					<el-button plain @click="logout">
						<svg-icon class="mr-5" style="width: 16px; height: 16px" icon-class="logout-box-r-line" />
						<span style="color: #333333">退出登录</span>
					</el-button>
				</div>
				<p class="f-14 f-700 pt-20 pb-10">切换登录</p>
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
const enterpriseStore = useEnterpriseStore();
const router = useRouter();
// const title = import.meta.env.VITE_APP_TITLE;
const settingsStore = useSettingsStore();
const sideTheme = computed(() => settingsStore.sideTheme);
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
	if (!_IPC.pubSub.emitOnce('checkUserIsLogin')) return;
	router.push({ path: useUserStore().getDefaultPath() });
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
				window.location.reload();
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
		// location.href = '/personal';
		// router.push({ path: '/personal' });
		location.reload();
	});
};

const toEnterprise = item => {
	proxy.$modal.loading();
	enterpriseStore.setEntInfo(item);
	location.reload();
};
</script>

<style lang="scss" scoped>
$home-height: 40px;
.sidebarLogoFade-enter-active {
	transition: opacity 1.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
	opacity: 0;
}
.gz-user-ent-info {
	width: 100%;
	height: $home-height;
	overflow: hidden;
	line-height: $home-height;
	text-align: center;
	background-color: inherit !important;
	position: relative;
	z-index: 999;
}
.el-dropdown {
	width: 100%;
	height: 100%;
}

.cur-info {
	cursor: pointer;
	height: 100%;
	width: 100%;
	& > p {
		width: calc(100% - 45px);
		span {
			width: calc(100% - 10px);
			text-align: left;
		}
	}
}
.el-avatar {
	border: 2px solid #ffffff;
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
</style>
