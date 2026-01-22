<template>
	<div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
		<div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<Sidebar v-if="!sidebar.hide" class="sidebar-container" />
		<div :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }" class="main-container">
			<div :class="{ 'fixed-header': fixedHeader }">
				<AppNavbar @setLayout="setLayout" />
				<tags-view v-if="needTagsView" />
			</div>
			<app-main />
			<settings ref="settingRef" />
		</div>
	</div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useWindowSize } from '@vueuse/core';
import Sidebar from './components/Sidebar/index.vue';
import { AppMain, AppNavbar, Settings, TagsView } from './components';
// import defaultSettings from '@/config/settings';

import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';

const settingsStore = useSettingsStore();
const theme = computed(() => settingsStore.theme);
// const sideTheme = computed(() => settingsStore.sideTheme);
const sidebar = computed(() => useAppStore().sidebar);
const device = computed(() => useAppStore().device);
const needTagsView = computed(() => settingsStore.tagsView);
const fixedHeader = computed(() => settingsStore.fixedHeader);

const classObj = computed(() => ({
	hideSidebar: !sidebar.value.opened,
	openSidebar: sidebar.value.opened,
	withoutAnimation: sidebar.value.withoutAnimation,
	mobile: device.value === 'mobile',
	[`${settingsStore.topNav}-layout`]: !!settingsStore.topNav
}));

const { width } = useWindowSize();
const WIDTH = 992; // refer to Bootstrap's responsive design

watchEffect(() => {
	if (device.value === 'mobile' && sidebar.value.opened) {
		useAppStore().closeSideBar({ withoutAnimation: false });
	}
	if (width.value - 1 < WIDTH) {
		useAppStore().toggleDevice('mobile');
		useAppStore().closeSideBar({ withoutAnimation: true });
	} else {
		useAppStore().toggleDevice('desktop');
	}
});

function handleClickOutside() {
	useAppStore().closeSideBar({ withoutAnimation: false });
}

const settingRef = ref(null);
function setLayout() {
	settingRef.value.openSetting();
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';
.app-wrapper {
	@include clearfix;

	position: relative;
	width: 100%;
	height: 100%;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}
.drawer-bg {
	position: absolute;
	top: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background: #000000;
	opacity: 0.3;
}
.fixed-header {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	width: calc(100% - #{$base-sidebar-width});
	transition: width 0.28s;
}
.hideSidebar .fixed-header {
	width: calc(100% - 54px);
}
.sidebarHide .fixed-header {
	width: 100%;
}
.mobile .fixed-header {
	width: 100%;
}
</style>
