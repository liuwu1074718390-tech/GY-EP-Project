<template>
	<div class="gz-sidebar-transition">
		<transition name="sidebar-transition">
			<div class="sidebar" v-show="1" :style="{ width: sidebarWidth + 'px' }" key="sidebar">
				<span class="toggle-btn" @click="toggleSidebar">
					<el-icon v-if="isSidebarCollapsed"><DArrowRight /></el-icon>
					<el-icon v-else><DArrowLeft /></el-icon>
				</span>
				<!-- 其他导航栏内容 -->
				<slot name="sidebar">
					<span>菜单栏目</span>
				</slot>
			</div>
		</transition>
		<transition name="content-transition">
			<div class="content" v-show="1" key="content">
				<slot name="content">
					<h1>内容区域</h1>
					<p>这是内容区域，当导航栏折叠时，它会平滑地向左移动。</p>
				</slot>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	minWidth: {
		type: Number,
		default: 80
	},
	maxWidth: {
		type: Number,
		default: 280
	},
	isCollapsed: {
		type: Boolean,
		default: false
	}
});

const isSidebarCollapsed = ref(props.isCollapsed);
const sidebarWidth = ref(isSidebarCollapsed.value ? props.minWidth : props.maxWidth);

const toggleSidebar = () => {
	isSidebarCollapsed.value = !isSidebarCollapsed.value;
	sidebarWidth.value = isSidebarCollapsed.value ? props.minWidth : props.maxWidth;
};
</script>

<style scoped>
.gz-sidebar-transition {
	display: flex;
	width: 100%;
	height: 100%;
}

.sidebar {
	transition: width 0.3s ease;
	/* background-color: #f5f7fa; */
	/* padding: 10px; */
	position: relative;
	height: 100%;
}

.toggle-btn {
	width: 24px;
	height: 24px;
	line-height: 24px;
	background: #ffffff;
	border: 1px solid #eeeeee;
	text-align: center;
	position: absolute;
	right: -12px;
	top: 24px;
	cursor: pointer;
	border-radius: 30px;
	color: #8f959e;
	font-size: 13px;
	z-index: 99;
}

.content {
	flex: 1;
	padding: 20px;
	transition: padding-left 0.3s ease;
	background-color: #fff;
	height: 100%;
}

/* 左侧栏的过渡动画 */
.sidebar-transition-enter-active,
.sidebar-transition-leave-active {
	transition: width 0.3s ease;
}

.sidebar-transition-enter-from,
.sidebar-transition-leave-to {
	width: 280px; /* 初始宽度 */
}

/* 右侧内容区域的过渡动画 */
.content-transition-enter-active,
.content-transition-leave-active {
	transition: padding-left 0.3s ease;
}

.content-transition-enter-from,
.content-transition-leave-to {
	padding-left: 280px; /* 初始padding-left */
}
</style>
