<template>
	<div class="gz-tabs-carousel">
		<el-icon @click="prew"><CaretLeft /></el-icon>
		<div class="content" ref="contRef">
			<div class="ul" ref="ulRef">
				<div class="item" v-if="showIndex > 0">...</div>
				<template v-for="(item, index) in data" :key="index">
					<!-- v-show="index >= showIndex" -->
					<div
						:ref="el => (buttonsRefs[index] = el)"
						class="item"
						:class="{ active: curIndex == index }"
						@click="toggle(item, index)"
					>
						{{ item.name }}
					</div></template
				>
			</div>
		</div>
		<el-icon @click="next"><CaretRight /></el-icon>
	</div>
</template>
<script setup>
import { computed, ref, reactive, onMounted, watch, nextTick } from 'vue';
import { useWindowSize } from '@vueuse/core';
const { width } = useWindowSize();
const props = defineProps({
	data: {
		type: Array,
		default: () => []
	},
	activeIndex: {
		type: Number,
		default: null
	}
});
const contRef = ref(null);
const contWidth = ref(0);
const ulRef = ref(null);
const ulWidth = ref(0);
const buttonsRefs = reactive([]);
const buttonWidths = ref([]);
const curIndex = ref(0);
const emit = defineEmits(['change']);
const toggle = (item, index) => {
	curIndex.value = index;
	emit('change', item, index);
};
if (props.activeIndex !== null) toggle(props.data[props.activeIndex], props.activeIndex);
const showIndex = ref(0);
let currentTranslateX = ref(0);

const next = () => {
	let requestId;
	// if (currentTranslateX.value + contWidth.value > ulWidth.value) return;
	if (!ulWidth.value) logButtonWidths();
	let w = (contWidth.value * 1) / 2 + currentTranslateX.value;
	let max = ulWidth.value - (contWidth.value * 1) / 2;
	let l = 50;
	const step = () => {
		if (w > currentTranslateX.value && currentTranslateX.value < max) {
			currentTranslateX.value = currentTranslateX.value + l;
			currentTranslateX.value = currentTranslateX.value >= w ? w : currentTranslateX.value;
			// currentTranslateX.value = currentTranslateX.value >= max ? max : currentTranslateX.value;
			ulRef.value.style.transform = `translateX(-${currentTranslateX.value}px)`;
			//cancelAnimationFrame(requestId);
			requestId = requestAnimationFrame(step);
			l = l + 5;
		} else {
			cancelAnimationFrame(requestId);
		}
		// console.log(currentTranslateX.value);
	};
	requestId = requestAnimationFrame(step);
};
const prew = () => {
	let requestId;
	// if (currentTranslateX.value <= 0) return;
	if (!ulWidth.value) logButtonWidths();
	let w = currentTranslateX.value - (contWidth.value * 1) / 2;
	let l = 50;
	const step1 = () => {
		if (w < currentTranslateX.value && currentTranslateX.value >= 0) {
			currentTranslateX.value = currentTranslateX.value - l;
			currentTranslateX.value = currentTranslateX.value < w ? w : currentTranslateX.value;
			currentTranslateX.value = currentTranslateX.value <= 0 ? 0 : currentTranslateX.value;
			ulRef.value.style.transform = `translateX(-${currentTranslateX.value}px)`;
			//cancelAnimationFrame(requestId);
			requestId = requestAnimationFrame(step1);
			l = l + 5;
		} else {
			cancelAnimationFrame(requestId);
		}
		// console.log(currentTranslateX.value);
	};
	requestId = requestAnimationFrame(step1);
};
function logButtonWidths() {
	buttonWidths.value = buttonsRefs.map(button => button?.offsetWidth);
	contWidth.value = contRef.value?.offsetWidth;
	ulWidth.value = buttonWidths.value.reduce((acc, curr) => acc + curr + 20, 0);
}

onMounted(() => {
	// console.log(buttonWidths.value, ulWidth.value, contWidth.value);
	nextTick(() => {
		logButtonWidths();
	});
});
watch(width, (n, o) => {
	logButtonWidths();
});
watch(props.data, (n, o) => {
	nextTick(() => {
		logButtonWidths();
	});
});
window.onresize = () => {
	logButtonWidths();
};
</script>
<style lang="scss" scoped>
.gz-tabs-carousel {
	// height: 100%;
	height: 76px;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #ffffff;
	padding: 0 20px;

	.el-icon {
		color: rgba(51, 51, 51, 0.7);
		cursor: pointer;
		opacity: 0.5;
		border: 1px solid rgba(161, 169, 179, 0.7);
		border-radius: 6px;
		padding: 4px;
		width: 24px;
		height: 24px;
		&:hover {
			// opacity: 1;
			// transform: scale(1.2);
			color: rgba(0, 0, 0, 1);
			border: 1px solid rgba(161, 169, 179);
		}
	}

	.content {
		width: calc(100% - 60px);
		height: calc(100% + 1px);

		position: relative;
		overflow: hidden;

		.ul {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 100%;
			position: relative;
			overflow: visible;
		}

		.item {
			margin-right: 20px;
			margin-left: 20px;
			white-space: nowrap;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			border-bottom: 2px solid rgba(0, 0, 0, 0);
			font-size: 15px;
			// min-width: 70px;
			// padding: 0 5px;
			&.active {
				font-weight: 700;
				color: #377cfd;
				border-bottom: 2px solid #377cfd;
				font-size: 15px;
			}
		}
	}
}
</style>
