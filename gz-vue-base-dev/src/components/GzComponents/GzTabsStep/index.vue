<template>
	<div class="gz-tabs-step">
		<div class="left-w" :style="`width:${props.leftWidth} ${props.hideLeft ? 'display:none' : ''}`">
			<div
				class="step-item"
				:class="{ active: curStep == index }"
				v-for="(item, index) in step"
				:key="item.title"
				@click="selectStep(item, index)"
			>
				{{ item.title }}
			</div>
		</div>
		<div
			class="right-w"
			:style="`left:${props.hideLeft ? '20px;' : props.leftWidth}`"
			:class="{ active: isFirst, radius: props.hideLeft }"
		>
			<slot name="step" :data="{ curStep, curItem }"></slot>
		</div>
		<div class="btns flex-end-horizontal">
			<slot name="btns" :data="{ curStep, nextStep, prevStep, selectStep, isFirst, isLast }"></slot>
		</div>
	</div>
</template>
<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
	step: {
		type: Array,
		default: () => []
	},
	canSelectStep: {
		type: Boolean,
		default: true
	},
	leftWidth: {
		type: String,
		default: '191px'
	},
	hideLeft: {
		type: Boolean,
		default: false
	},
	activeStep: {
		type: Number || String || null,
		default: 0
	}
});

const curStep = ref(props.activeStep);

const nextStep = () => {
	if (curStep.value < props.step.length) curStep.value++;
};

const prevStep = () => {
	if (curStep.value > 0) curStep.value--;
};

const selectStep = (item, index) => {
	if (!props.canSelectStep) return;
	curStep.value = index;
};

const isFirst = computed(() => curStep.value == 0);
const isLast = computed(() => curStep.value + 1 == props.step.length);
const curItem = computed(() => props.step[curStep.value]);
</script>
<style lang="scss" scoped>
.gz-tabs-step {
	position: relative;
	width: 100%;
	height: 100%;
	.left-w {
		position: absolute;
		left: 20px;
		top: 20px;
		bottom: 20px;
		width: 191px;
	}
	.step-item {
		width: 100%;
		height: 58px;

		border-radius: 12px 0px 0px 12px;

		font-family:
			Microsoft YaHei UI,
			Microsoft YaHei UI;
		font-weight: 400;
		font-size: 16px;
		color: #8a9099;
		line-height: 58px;
		padding-left: 20px;
		cursor: pointer;

		&.active {
			color: #377cfd;
			background: #f2f5fc;
			font-weight: 700;
		}
	}
	.right-w {
		position: absolute;
		left: 211px;
		top: 20px;
		right: 20px;
		bottom: 80px;
		background: #f2f5fc;
		border-radius: 12px;
		overflow: auto;
		padding: 20px;
		&.active {
			border-radius: 0px 12px 12px 12px;
		}
	}
	.btns {
		position: absolute;
		left: 20px;
		right: 20px;
		bottom: 20px;
		height: 40px;
	}
	.radius {
		border-radius: 12px !important;
	}
}
</style>
