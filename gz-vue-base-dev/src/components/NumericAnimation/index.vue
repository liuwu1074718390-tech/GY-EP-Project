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
		currentNumber.value = parseFloat(currentValue.toFixed(2)); // 可以调整小数点后几位

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
</script>
