<template>
	<el-breadcrumb class="app-breadcrumb" :class="'app-breadcrumb-' + sideTheme" separator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
				<span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
					item.meta.title
				}}</span>
				<a v-else class="breadcrumb-item-link" @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useSettingsStore from '@/store/modules/settings';
const settingsStore = useSettingsStore();
const sideTheme = computed(() => settingsStore.sideTheme);
const route = useRoute();
const router = useRouter();
const levelList = ref([]);

function getBreadcrumb() {
	// only show routes with meta.title
	let matched = route.matched.filter(item => item.meta && item.meta.title);
	const first = matched[0];
	// 判断是否为首页
	if (!isDashboard(first)) {
		matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched);
	}

	levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
}
function isDashboard(route) {
	const name = route && route.name;
	if (!name) {
		return false;
	}
	return name.trim() === 'Index';
}
function handleLink(item) {
	const { redirect, path } = item;
	if (redirect) {
		router.push(redirect);
		return;
	}
	router.push(path);
}

watchEffect(() => {
	// if you go to the redirect page, do not update the breadcrumbs
	if (route.path.startsWith('/redirect/')) {
		return;
	}
	getBreadcrumb();
});
getBreadcrumb();
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.app-breadcrumb.el-breadcrumb {
	display: inline-block;
	margin-left: 8px;
	font-size: 14px;
	line-height: $top-nav-height;
	.no-redirect {
		color: $sub-text-color;
		cursor: text;
	}
}
.navbar-theme-dark {
	.app-breadcrumb.el-breadcrumb {
		color: $base-menu-color !important;
		.no-redirect {
			color: $base-menu-color !important;
		}
	}
	.breadcrumb-item-link {
		color: $base-menu-color-active !important;
	}
}
</style>
