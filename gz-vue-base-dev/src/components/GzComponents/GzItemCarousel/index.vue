<template>
	<div class="gz-item-carousel">
		<div class="handler">
			<el-icon @click="prew"><ArrowLeftBold /></el-icon>
		</div>

		<div class="content" ref="contRef">
			<div class="ul" ref="ulRef">
				<div class="item" v-if="showIndex > 0">...</div>
				<template v-for="(item, index) in data" :key="index">
					<!-- v-show="index >= showIndex" -->
					<!-- :ref="el => (buttonsRefs[index] = el)" -->
					<div
						:style="`min-width:${itemWith}px;max-width:${itemWith}px;margin-left:${gap / 2}px;margin-right:${gap / 2}px`"
						class="item of-h"
						:class="{ active: curIndex == index }"
						@click="toggle(item, index)"
					>
						<slot name="item" :item="{ ...item, index }"></slot></div
				></template>
			</div>
		</div>
		<div class="handler">
			<el-icon @click="next"><ArrowRightBold /></el-icon>
		</div>
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
	},
	gap: {
		type: Number,
		default: 15
	},
	itemNumber: {
		type: Number,
		default: 10
	}
});
// console.log(props.data);
const contRef = ref(null);
const contWidth = ref(0);
const ulRef = ref(null);
const ulWidth = ref(0);
// const buttonsRefs = reactive([]);
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
const itemWith = ref('');

const next = () => {
	let requestId;
	// if (currentTranslateX.value + contWidth.value > ulWidth.value) return;
	let item = itemWith.value + props.gap;
	let w = item * props.itemNumber + currentTranslateX.value;
	let max = itemWith.value * (props.data.length + 1);
	let l = item / 5;
	const step = () => {
		if (w > currentTranslateX.value && w <= max) {
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
	let item = itemWith.value + props.gap;
	let w = currentTranslateX.value - item * props.itemNumber;
	w = w > 0 ? w : 0;
	let l = item / 5;
	const step1 = () => {
		if (w < currentTranslateX.value && currentTranslateX.value >= 0) {
			currentTranslateX.value = currentTranslateX.value - l;
			currentTranslateX.value = currentTranslateX.value < w ? w : currentTranslateX.value;
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
	// buttonWidths.value = buttonsRefs.map(button => button.offsetWidth);
	contWidth.value = contRef.value?.offsetWidth;
	// ulWidth.value = buttonWidths.value.reduce((acc, curr) => acc + curr, 0);
	itemWith.value = contWidth.value / props.itemNumber - props.gap;
	// console.log(contWidth.value, itemWith.value + props.gap);
}

onMounted(() => {
	// console.log(buttonWidths.value, ulWidth.value, contWidth.value);
	nextTick(() => {
		logButtonWidths();
	});
	setTimeout(logButtonWidths, 500);
});
watch(width, () => {
	logButtonWidths();
});
</script>
<style lang="scss" scoped>
.gz-item-carousel {
	// height: 100%;
	height: 76px;
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	// background-color: #ffffff;
	padding: 0 20px;
	gap: 10px;
	.handler {
		border-radius: 4px 4px 4px 4px;
		border: 1px solid #dfe2e6;
		height: 30px;
		width: 30px;
		line-height: 32px;
		text-align: center;

		.el-icon {
			color: #333;
			cursor: pointer;
			opacity: 0.15;

			&:hover {
				opacity: 0.6;
				// transform: scale(1.2);
			}
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
			padding: 0 10px;
		}

		.item {
			// margin-right: 20px;
			// margin-left: 20px;
			white-space: nowrap;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// cursor: pointer;
			// border-bottom: 2px solid rgba(0, 0, 0, 0);
			font-size: 15px;
			// min-width: 70px;
			// padding: 0 5px;
			&.active {
				color: inherit;
				// font-weight: 700;
				// color: #377cfd;
				// border-bottom: 2px solid #377cfd;
				// font-size: 15px;
			}
		}
	}
	.tx-of {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
