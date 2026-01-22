<template>
	<section class="app-main">
		<router-view v-slot="{ Component, route }">
			<transition name="fade-transform" mode="out-in">
				<keep-alive :include="tagsViewStore.cachedViews">
					<component v-if="!route.meta.link" :is="Component" :key="route.path" />
				</keep-alive>
			</transition>
		</router-view>
		<iframe-toggle />
	</section>
</template>

<script setup>
import iframeToggle from './IframeToggle/index';
import useTagsViewStore from '@/store/modules/tagsView';

const tagsViewStore = useTagsViewStore();
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

$total-height: $top-nav-height + $tags-view-height;
.app-main {
	position: relative;
	width: 100%;

	/* 50= navbar  50  */
	min-height: calc(100vh - #{$total-height});
	overflow: hidden;
}
.fixed-header + .app-main {
	padding-top: $top-nav-height;
}
.hasTagsView {
	.app-main {
		/* 84 = navbar + tags-view = 50 + 34 */
		min-height: calc(100vh - #{$total-height});
	}
	.fixed-header + .app-main {
		padding-top: $total-height;
	}
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
	.fixed-header {
		padding-right: 6px;
	}
}
::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
::-webkit-scrollbar-track {
	background-color: #f1f1f1;
}
::-webkit-scrollbar-thumb {
	background-color: #c0c0c0;
	border-radius: 3px;
}
</style>
