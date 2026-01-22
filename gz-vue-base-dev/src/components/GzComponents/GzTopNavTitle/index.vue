<template>
	<div class="flex-start-horizontal gz-top-nav-title tx-of">
		<span class="back-btn flex-center-horizontal" v-if="showBackBtn && historyLength" @click="goBack"
			><el-icon style="margin-right: 2px"><ArrowLeftBold /></el-icon> 返回</span
		>
		<h2 class="tx-of" v-if="title" :title="title">{{ title }}</h2>
		<template v-else>
			<template v-for="item in matched" :key="item">
				<h2 v-if="level == 2 && item.path == activeMenu2">{{ item.meta.title }}</h2>
				<h2 v-if="level == 1 && item.path == activeMenu">{{ item.meta.title }}</h2>
				<h2 v-if="level == 0 && item.path == route.path">{{ item.meta.title }}</h2>
			</template>
		</template>
	</div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useInitSaasMenusData from '@/hooks/useInitSaasMenus';
const { activeMenu2, activeMenu, menusLevel } = useInitSaasMenusData();
const route = useRoute();
const router = useRouter();
const props = defineProps({
	showBackBtn: {
		// 是否显示返回按钮
		type: Boolean,
		default: false
	},
	title: {
		// 传入标题，则不读取路由
		type: String,
		default: ''
	},
	level: {
		// 1 一级菜单名称  2 二级菜单名称  0 当前菜单名称
		type: Number,
		default: 0
	},
	autoBack: {
		type: Boolean,
		default: true
	}
});
let matched = computed(() => route.matched.filter(item => item.meta && item.meta.title));
const emit = defineEmits(['goBack']);
const goBack = () => {
	if (props.autoBack) {
		// router.go(-1);
		handleBackOrClose();
	} else {
		emit('goBack', () => router.go(-1));
	}
};

const historyLength = computed(() => window.history.length > 1 && props.autoBack);

// 定义一个函数用于处理返回或关闭窗口的逻辑
const handleBackOrClose = () => {
	// 检查历史记录长度是否大于1，意味着有至少一条可以回退的历史记录
	if (window.history.length > 1) {
		// 如果有可回退的历史记录，则执行回退操作
		router.go(-1);
	} else {
		// 如果没有可回退的历史记录，则尝试关闭窗口
		// 注意：直接调用 window.close() 可能不会工作，除非是在新打开的窗口中调用它。
		// 对于普通页面，可能需要提示用户确认关闭。
		// confirmCloseWindow();
		router.push({ path: '/' });
	}
};
</script>
<style lang="scss" scoped>
.gz-top-nav-title {
	height: $saas-top-nav-height;
	line-height: $saas-top-nav-height;
	font-size: 18px;
	color: #333333;

	h2 {
		font-weight: 700;
		font-size: 18px;
		color: #333333;
	}

	.back-btn {
		width: 53px;
		height: 24px;
		line-height: 24px;
		background: #a2cfff;
		border-radius: 3px 3px 3px 3px;

		font-weight: 400;
		font-size: 12px;
		color: #377cfd;
		cursor: pointer;
		margin-right: 10px;
		padding: 5px;
		letter-spacing: 1px;
	}
}
.flex-start-horizontal {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.tx-of {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
