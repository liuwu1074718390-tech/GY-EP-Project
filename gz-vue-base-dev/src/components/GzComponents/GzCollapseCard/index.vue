<template>
	<div class="gz-collapse-card">
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item title="Consistency" name="1">
				<template #title>
					<div class="title cur-p">
						<div><slot name="title"></slot></div>
						<div class="toggle">{{ active ? '收起' : '展开' }}</div>
					</div>
				</template>
				<slot></slot>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
	isCollapse: {
		type: Boolean,
		default: true
	}
});

const emit = defineEmits(['change']);

const activeNames = ref(props.isCollapse ? ['1'] : []);
const handleChange = val => {
	// console.log(val);
	emit('change', active.value);
};
const active = computed(() => activeNames.value.length);
</script>
<style lang="scss" scoped>
.gz-collapse-card {
	background: #ffffff;
	border-radius: 12px 12px 12px 12px;
	border: 1px solid #e9ecf0;
	overflow: hidden;
	position: relative;

	:deep(.el-collapse) {
		border: none;
	}

	:deep(.el-collapse-item__content) {
		padding: 20px;
	}
	:deep(.el-collapse-item__arrow) {
		margin-right: 20px;
		color: #8a9099;
		font-size: 14px;
		font-weight: bold;
	}

	:deep(.el-collapse-item__header) {
		border-bottom: 1px solid #e9ecf0;
		height: 56px;
	}

	.title {
		height: 100%;
		background: #ffffff;
		border-radius: 12px 12px 0px 0px;

		padding: 0 5px 0 24px;
		font-weight: 700;
		font-size: 14px;
		color: #333333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		.svg-icon {
			width: 16px;
			height: 16px;
		}
	}
	.toggle {
		font-weight: 400;
		font-size: 14px;
		color: #8a9099;
		cursor: pointer;
		height: 56px;
		line-height: 56px;

		.el-icon {
			font-size: 13px;
			position: relative;
			top: 1px;
			margin-left: 1px;
		}
	}
	.content {
		overflow: hidden;
		transform-origin: top;
	}
}
</style>
