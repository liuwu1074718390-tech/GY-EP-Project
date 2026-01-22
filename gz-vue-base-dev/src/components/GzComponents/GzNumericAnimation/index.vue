<!-- NumericAnimation.vue -->
<template>
	<span ref="numberElement">{{ currentNumber }}</span>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';

// 接收props
const props = defineProps({
	startValue: {
		type: Number,
		default: 0
	},
	endValue: {
		type: Number,
		required: true
	},
	duration: {
		type: Number,
		default: 1000
	},
	fixed: {
		type: Number,
		default: 0
	},
	isAmount: {
		type: Boolean,
		default: false
	}
});

const numberElement = ref(null);
const currentNumber = ref(props.startValue);
let animationFrameId;

const animate = () => {
	const startTime = Date.now();
	const endTime = startTime + props.duration;

	const animateNumber = () => {
		const now = Date.now();
		const progress = Math.min((now - startTime) / props.duration, 1);

		// 计算当前值
		const currentValue = props.startValue + (props.endValue - props.startValue) * progress;
		currentNumber.value = parseFloat(currentValue.toFixed(props.fixed)); // 可以调整小数点后几位
		if (props.isAmount) {
			currentNumber.value = formatAmountManual(currentNumber.value);
		}
		// 如果动画还没结束，继续请求下一帧
		if (now < endTime) {
			animationFrameId = requestAnimationFrame(animateNumber);
		}
	};

	animationFrameId = requestAnimationFrame(animateNumber);
};

watchEffect(() => {
	if (props.startValue !== props.endValue) {
		animate();
	} else {
		cancelAnimationFrame(animationFrameId);
	}
});

onMounted(() => {
	// 初始化时如果有数值变化，开始动画
	if (props.startValue !== props.endValue) {
		animate();
	}
});

function formatAmountManual(number) {
	// 分离整数部分和小数部分
	let parts = number.toString().split('.');
	let integerPart = parts[0];
	let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

	// 添加千位分隔符
	integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	// 返回格式化的金额
	return integerPart + decimalPart;
}
</script>
