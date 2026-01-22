<template>
	<el-menu
		:class="'top-nav-' + sideTheme"
		:default-active="activeMenu"
		mode="horizontal"
		@select="handleSelect"
		:ellipsis="false"
		:background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
		:text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
		:active-text-color="sideTheme === 'theme-dark' ? variables.menuColorActive : theme"
	>
		<template v-for="(item, index) in topMenus">
			<el-menu-item :style="{ '--theme': theme }" :index="item.path" :key="index" v-if="index < visibleNumber">
				<svg-icon v-if="item.meta && item.meta.icon && item.meta.icon !== '#'" :icon-class="item.meta.icon" />
				{{ item.meta.title }}
			</el-menu-item>
		</template>

		<!-- 顶部菜单超出数量折叠 -->
		<el-sub-menu :style="{ '--theme': theme }" index="more" v-if="topMenus.length > visibleNumber">
			<template #title>更多菜单</template>
			<template v-for="(item, index) in topMenus">
				<el-menu-item :index="item.path" :key="index" v-if="index >= visibleNumber">
					<svg-icon v-if="item.meta && item.meta.icon && item.meta.icon !== '#'" :icon-class="item.meta.icon" />
					{{ item.meta.title }}
				</el-menu-item>
			</template>
		</el-sub-menu>
	</el-menu>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { constantRoutes } from '@/router';
import { isHttp } from '@/utils/validate';
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';
import variables from '@/styles/variables.module.scss';

// 顶部栏初始数
const visibleNumber = ref(null);
// 当前激活菜单的 index
const currentIndex = ref(null);
// 隐藏侧边栏路由
const hideList = ['/index', '/user/profile'];

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const route = useRoute();
const router = useRouter();

// 主题颜色
const theme = computed(() => settingsStore.theme);
// 所有的路由信息
const routers = computed(() => permissionStore.topbarRouters);

const sideTheme = computed(() => settingsStore.sideTheme);

// 顶部显示菜单
const topMenus = computed(() => {
	let topMenus = [];
	routers.value.map(menu => {
		if (menu.hidden !== true) {
			// 兼容顶部栏一级菜单内部跳转
			if (menu.path === '/') {
				topMenus.push(menu.children[0]);
			} else {
				topMenus.push(menu);
			}
		}
	});
	return topMenus;
});

// 设置子路由
const childrenMenus = computed(() => {
	let childrenMenus = [];
	routers.value.map(router => {
		for (let item in router.children) {
			if (router.children[item].parentPath === undefined) {
				if (router.path === '/') {
					router.children[item].path = '/' + router.children[item].path;
				} else {
					if (!isHttp(router.children[item].path)) {
						router.children[item].path = router.path + '/' + router.children[item].path;
					}
				}
				router.children[item].parentPath = router.path;
			}
			childrenMenus.push(router.children[item]);
		}
	});
	return constantRoutes.concat(childrenMenus);
});

// 默认激活的菜单
const activeMenu = computed((newVal, oldVal) => {
	console.log('newVal, oldVal', newVal, oldVal);
	if (newVal == '/index' && typeof oldVal === 'undefined') return;
	const path = route.path;
	let activePath = path;
	if (path !== undefined && path.lastIndexOf('/') > 0 && hideList.indexOf(path) === -1) {
		const tmpPath = path.substring(1, path.length);
		activePath = '/' + tmpPath.substring(0, tmpPath.indexOf('/'));
		if (!route.meta.link) {
			appStore.toggleSideBarHide(false, 3);
		}
	} else if (!route.children) {
		activePath = path;
		appStore.toggleSideBarHide(true, 4);
	}
	activeRoutes(activePath);
	return activePath;
});

function setVisibleNumber() {
	const width = document.body.getBoundingClientRect().width / 3;
	visibleNumber.value = parseInt(width / 85);
}

function handleSelect(key) {
	//, keyPath
	currentIndex.value = key;
	const route = routers.value.find(item => item.path === key);
	console.log(key);
	if (isHttp(key)) {
		// http(s):// 路径新窗口打开
		window.open(key, '_blank');
	} else if (!route || !route.children) {
		// 没有子路由路径内部打开
		const routeMenu = childrenMenus.value.find(item => item.path === key);
		if (routeMenu && routeMenu.query) {
			let query = JSON.parse(routeMenu.query);
			router.push({ path: key, query: query });
		} else {
			router.push({ path: key });
		}
		appStore.toggleSideBarHide(true, 5);
	} else {
		// 显示左侧联动菜单
		activeRoutes(key);
		appStore.toggleSideBarHide(false, 6);
	}
}

function activeRoutes(key) {
	let routes = [];
	if (childrenMenus.value && childrenMenus.value.length > 0) {
		childrenMenus.value.map(item => {
			if (key == item.parentPath || (key == 'index' && '' == item.path)) {
				routes.push(item);
			}
		});
	}
	if (routes.length > 0) {
		permissionStore.setSidebarRouters(routes);
		appStore.toggleSideBarHide(false, 8);
	} else {
		appStore.toggleSideBarHide(true, 7);
	}
	return routes;
}

onMounted(() => {
	window.addEventListener('resize', setVisibleNumber);
});
onBeforeUnmount(() => {
	window.removeEventListener('resize', setVisibleNumber);
});

onMounted(() => {
	setVisibleNumber();
});
</script>

<style lang="scss">
@import '@/styles/variables.module.scss';
.topnav-container.el-menu--horizontal > .el-menu-item {
	float: left;
	height: $top-nav-height !important;
	padding: 0 5px !important;
	margin: 0 10px !important;
	line-height: $top-nav-height !important;

	// color: #999093 !important;
	&:hover {
		background-color: rgb(0 0 0 / 6%) !important;
	}
}
.topnav-container.el-menu--horizontal > .el-menu-item.is-active,
.el-menu--horizontal > .el-sub-menu.is-active .el-submenu__title {
	// color: $base-menu-light-color;
	border-bottom: 4px solid #{'var(--theme)'} !important;
}

/* sub-menu item */
.topnav-container.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
	float: left;
	height: $top-nav-height !important;
	padding: 0 5px !important;
	margin: 0 10px !important;
	line-height: $top-nav-height !important;

	// color: #999093 !important;
}

/* 背景色隐藏 */
// .topnav-container.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
// .topnav-container.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
// .topnav-container.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
// 	background-color: #ffffff !important;
// }

/* 图标右间距 */
.topnav-container .svg-icon {
	margin-right: 4px;
}

/* topmenu more arrow */
.topnav-container .el-sub-menu .el-sub-menu__icon-arrow {
	position: static;
	margin-top: 0;
	margin-left: 8px;
	vertical-align: middle;
}
</style>
