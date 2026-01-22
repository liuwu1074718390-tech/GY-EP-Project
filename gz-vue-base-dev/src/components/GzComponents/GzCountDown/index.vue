<template>
	<div>
		<p>{{ formattedTime }}</p>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const props = defineProps({
	initialTime: {
		type: Number,
		default: 0
	},
	initialYMDHMS: {
		type: String,
		default: ''
	},
	onFinish: {
		type: Function,
		default: () => {}
	},
	format: {
		type: String,
		default: ''
	}
});
const timeRemaining = ref(0);
if (props.initialYMDHMS) timeRemaining.value = getMillisecondsUntil(props.initialYMDHMS);
if (props.initialTime > 0) timeRemaining.value = Math.max(0, props.initialTime);
let startTime = 0;
let animationFrameId = null;

// 格式化时间
const formattedTime = computed(() => {
	const seconds = Math.floor((timeRemaining.value / 1000) % 60);
	const minutes = Math.floor((timeRemaining.value / (1000 * 60)) % 60);
	const hours = Math.floor((timeRemaining.value / (1000 * 60 * 60)) % 24);
	const days = Math.floor(timeRemaining.value / (1000 * 60 * 60 * 24));

	let str = '';
	if (props.format.includes('天') && days * 1 > 0) {
		str = days + ' 天 ';
	} else if (props.format.includes('日') && days * 1 > 0) {
		str = days + ' 日 ';
	} else if (props.format.includes('dd') && days * 1 > 0) {
		str = days + ' : ';
	}
	if (props.format.includes('时') && hours * 1 > 0) {
		str = str + hours + ' 时 ';
	} else if (props.format.includes('hh') && hours * 1 > 0) {
		str = str + hours + ' : ';
	}
	if (props.format.includes('分') && minutes * 1 > 0) {
		str = str + minutes + ' 分 ';
	} else if (props.format.includes('mm') && minutes * 1 > 0) {
		str = str + minutes + ' : ';
	}
	if (props.format.includes('秒') && seconds * 1 > 0) {
		str = str + seconds + ' 秒 ';
	} else if (props.format.includes('ss') && seconds * 1 > 0) {
		str = str + seconds;
	}
	if (str === '') {
		str = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}
	return str;
});

function getMillisecondsUntil(targetTimeString) {
	// 将输入的时间字符串转换为 Date 对象
	const targetTime = new Date(targetTimeString);

	// 获取当前时间的 Date 对象
	const currentTime = new Date();

	// 计算两个时间之间的差值（以毫秒为单位）
	const millisecondsUntil = targetTime.getTime() - currentTime.getTime();

	// 如果目标时间在当前时间之前，返回 0
	if (millisecondsUntil <= 0) {
		return 0;
	}

	// 返回差值
	return millisecondsUntil;
}

// 倒计时逻辑
function tick() {
	if (timeRemaining.value > 0) {
		timeRemaining.value -= performance.now() - startTime;
		startTime = performance.now();
		animationFrameId = requestAnimationFrame(tick);
	} else {
		timeRemaining.value = 0;
		props.onFinish();
	}
}

// 启动倒计时
function start() {
	startTime = performance.now();
	animationFrameId = requestAnimationFrame(tick);
}

// 在组件挂载时启动倒计时
onMounted(start);

// 在组件卸载前停止倒计时
onBeforeUnmount(() => {
	if (animationFrameId !== null) {
		cancelAnimationFrame(animationFrameId);
	}
});
</script>
