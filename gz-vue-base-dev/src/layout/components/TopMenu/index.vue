<template>
	<el-menu
		:class="'top-menu-' + sideTheme"
		:default-active="activeMenu"
		:ellipsis="false"
		:background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
		:text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
		:unique-opened="true"
		:active-text-color="sideTheme === 'theme-dark' ? variables.menuColorActive : theme"
		:collapse-transition="false"
		mode="horizontal"
	>
		<sidebar-item v-for="(route, index) in sidebarRouters" :key="route.path + index" :item="route" :base-path="route.path" />
	</el-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// import Logo from './Logo';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.module.scss';
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';

const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const sidebarRouters = computed(() => permissionStore.sidebarRouters);
// const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
// const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
	const { meta, path } = route;
	// if set path, the sidebar will highlight the path you set
	if (meta.activeMenu) {
		return meta.activeMenu;
	}
	return path;
});
</script>
<style lang="scss">
@import '@/styles/variables.module.scss';

.topmenu-container {
	.el-menu-item {
		float: left;
		height: $top-nav-height !important;
		padding: 0 10px !important;
		margin: 0 !important;
		line-height: $top-nav-height !important;
		&:hover {
			background-color: rgb(0 0 0 / 6%) !important;
		}
	}
	.menu-title {
		margin: 0 8px !important;
	}
	.el-sub-menu {
		position: relative;
		height: 100%;
		.el-sub-menu__title {
			float: left;
			height: $top-nav-height !important;
			padding: 0 10px 0 20px !important;
			margin: 0 !important;
			line-height: $top-nav-height !important;

			// color: #999093 !important;
			&:hover {
				background-color: rgb(0 0 0 / 6%) !important;
			}
		}
		.el-sub-menu__icon-arrow {
			position: static;
			margin-top: 0;
			margin-left: 8px;
			vertical-align: middle;
		}
	}
	.el-menu-item.is-active,
	.el-sub-menu.is-active .el-sub-menu__title {
		color: $--color-primary-active;
	}
}
.el-menu--horizontal {
	.el-menu-item {
		&:hover {
			background-color: rgb(0 0 0 / 6%) !important;

			// color: $--color-primary !important;
		}
		.menu-title {
			display: inline-block;
			margin: 0 8px !important;
		}
	}
}
.navbar-theme-dark {
	.topmenu-container {
		.el-menu-item {
			&:hover {
				background-color: $base-sub-menu-active !important;
				color: $base-menu-color-active !important;
			}
			.menu-title {
				display: inline-block;
				margin: 0 8px !important;
			}
			&.is-active {
				background-color: $base-sub-menu-active;
				.menu-title {
					color: $base-menu-color-active;
				}
			}
		}
		.el-menu-item.is-active,
		.el-sub-menu.is-active .el-sub-menu__title {
			background-color: rgb(0 0 0 / 6%) !important;
			color: $base-menu-color-active;
			&::after {
				content: ' ';
				display: inline-block;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 4px;
				background-color: $--color-primary;
				box-shadow: 0 0 1px $--color-primary;
			}
		}
	}
}
</style>
