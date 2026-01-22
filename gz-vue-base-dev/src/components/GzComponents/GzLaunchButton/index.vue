<template>
	<div class="launch-button flex-center-all" :style="`transform: scale(${props.scale})`">
		<div>
			<div class="btn-w" :class="curItem.btnType" @click="curItem.clickFun(curItem)">
				<div class="circle-0 center">
					<div :class="curItem.bgAnm"><div class="circle-1 center"></div></div>
				</div>

				<div class="circle-2 center"></div>

				<img v-if="curItem.img" class="circle-3 center hide" :src="curItem.img" />
				<div class="circle-3 center"><svg-icon :class="curItem.iconAnm" :icon-class="curItem.icon" /></div>
				<div v-if="curItem.img" class="circle-4 center"><div></div></div>
			</div>
			<p class="btn-txt mt-8" :style="`font-size: ${props.fontSise / props.scale}px`">{{ curItem.name }}</p>
		</div>
	</div>
</template>
<script setup>
import { computed, ref, getCurrentInstance, watch, inject } from 'vue';

const emit = defineEmits(['change']);
const props = defineProps({
	data: {
		type: Object,
		default: function () {
			return {
				name: '点击按钮',
				icon: 'open-btn-icon-0',
				iconAnm: 'anm-icon', // 图标的动画类名
				btnType: 'pr', // 按钮类型，如 'pr'（主要按钮）、'info'（信息提示按钮）
				bgAnm: 'bg-anm', // 背景动画类名
				img: new URL('@/assets/purchase/open/open-btn-icon-0.png', import.meta.url).href // 图片路径
			};
		}
	},
	scale: {
		type: Number,
		default: 1
	},
	fontSise: {
		type: Number,
		default: 14
	}
});

const curItem = ref({
	...props.data,
	clickFun: () => {
		emit('change', curItem.value);
	} // 点击按钮时调用的函数
});
</script>
<style lang="scss" scoped>
.btn-w {
	width: 196px;
	height: 196px;
	position: relative;
	&:hover {
		img {
			display: inherit;
			& + .circle-3 {
				display: none;
			}
		}
		.circle-2 {
			filter: drop-shadow(1px 2px 3px rgba(21, 86, 202, 0.5));
			box-shadow:
				2px 4px 10px 0px rgba(55, 124, 253, 0.3),
				inset 0px 0px 20px 5px #8db5fe;
			border: 6px solid #d5e2f7;
			box-sizing: content-box;
		}
	}

	.circle-0 {
		width: 196px;
		height: 196px;
		margin: 0 auto;
		z-index: 1;
		& > div {
			width: 100%;
			height: 100%;
			background: rgba(55, 124, 253, 0.1);
			border-radius: 200px;
			opacity: 0.5;
		}
		.bg-anm {
			opacity: 1;
			animation: breathing 4s ease-in-out infinite;
		}
	}
	.circle-1 {
		width: 172px;
		height: 172px;
		background: rgba(55, 124, 253, 0.2);
		border-radius: 200px;
		z-index: 2;
	}
	.circle-2 {
		width: 148px;
		height: 148px;
		background: linear-gradient(180deg, #377cfd 0%, #377cfd 100%);
		border-radius: 200px;
		box-shadow:
			2px 4px 2px 0px rgba(55, 124, 253, 0.3),
			inset 0px 0px 20px 5px #8db5fe;
		cursor: pointer;
		z-index: 3;
	}
	.circle-3 {
		width: 92px;
		height: 92px;
		z-index: 4;
		cursor: pointer;

		.svg-icon {
			height: 100%;
			width: 100%;
		}
		.anm-icon {
			animation: swing 5s infinite;
		}
	}
	.circle-4 {
		width: 160px;
		height: 160px;
		z-index: 5;
		cursor: pointer;

		div {
			width: 100%;
			height: 100%;
			background: url(@/assets/purchase/open/anniu-bg-shine.png) no-repeat top center;
			animation: rotateDisk 2s linear infinite;
		}
	}
}

.btn-w.info {
	.circle-0 > div {
		background: rgba(194, 198, 212, 0.2);
	}
	.circle-1 {
		background: rgba(194, 198, 212, 0.4);
	}
	.circle-2 {
		background: linear-gradient(180deg, #d7dbe9 0%, #b4b8c6 100%);
		box-shadow:
			2px 4px 2px 0px rgba(153, 153, 153, 0.1),
			inset 0px 0px 20px 5px rgba(255, 255, 255, 0.1);
	}

	&:hover {
		.circle-2 {
			filter: drop-shadow(1px 2px 3px rgba(153, 153, 153, 0.5));
			box-shadow:
				2px 4px 10px 0px rgba(153, 153, 153, 0.3),
				inset 0px 0px 20px 5px #878d97;
		}
	}
}

.btn-txt {
	font-family:
		Microsoft YaHei UI,
		Microsoft YaHei UI;
	font-weight: 400;
	font-size: 16px;
	color: #333333;
	text-align: center;
}

@keyframes rotateDisk {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(-360deg);
	}
}
@keyframes breathing {
	0% {
		transform: scale(1.1);
		opacity: 1;
	}
	50% {
		transform: scale(0.75);
		opacity: 0.5;
	}
	100% {
		transform: scale(1.1);
		opacity: 1;
	}
}
@keyframes swing {
	0%,
	100% {
		transform: rotate(0deg);
	}
	25% {
		transform: rotate(3deg); /* 向右摇摆 */
	}
	50% {
		transform: rotate(-3deg); /* 向左摇摆 */
	}
	75% {
		transform: rotate(3deg); /* 再次向右摇摆 */
	}
}
</style>
