<template>
	<div class="p-30">
		<h3 class="mb-20">element图标</h3>
		<div class="icons-container">
			<div v-for="(item, index) in icons" :key="index" class="icon-item" @click="copyIconName(item, 'el')">
				<ElIcon :size="24">
					<component :is="item" />
				</ElIcon>
				<p>{{ item.name }}</p>
			</div>
		</div>

		<h3 class="mb-20 mt-40">svg图标</h3>
		<p>可自行导入.svg到目录：src\assets\icons\svg</p>
		<div class="icons-container mt-40">
			<div class="icon-item" v-for="(item, index) in iconList" :key="index" @click="copyIconName(item, 'svg')">
				<svg-icon :icon-class="item" class-name="icon" style="font-size: 24px" />
				<p>{{ item }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import * as ElIcons from '@element-plus/icons-vue';
const { proxy } = getCurrentInstance();
const icons = Object.keys(ElIcons).map(key => ElIcons[key]);

const copyIconName = async (item, type) => {
	console.log(item);
	try {
		let tag = {
			el: `<el-icon><${item.name} /></el-icon>`,
			svg: `<svg-icon icon-class="${item}" />`
		};

		await navigator.clipboard.writeText(tag[type]);
		console.log('已复制到剪贴板：' + tag[type]);
		proxy.$modal.msgSuccess('已复制到剪贴板：' + tag[type]);
	} catch (err) {
		console.error('复制失败:', err);
		proxy.$modal.msgError('复制失败:' + err);
	}
};

//
import iconSvgs from '@/components/IconSelect/requireIcons';

// const iconName = ref('');
const iconList = ref(iconSvgs);
</script>

<style lang="scss" scoped>
.icons-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
	// gap: 1rem;
	gap: 0;
	justify-items: center;
	border-left: 1px solid #eeeeee;
	border-top: 1px solid #eeeeee;
}

.icon-item {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	border: 1px solid #eeeeee;
	border-left: 0;
	border-top: 0;
	padding: 20px;

	&:hover {
		background-color: aliceblue;
	}
}
</style>
