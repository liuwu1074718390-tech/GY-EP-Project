<template>
	<div class="gz-count-down-clock flex-center-horizontal" :style="`gap: ${(props.size / 72) * 8}px`">
		<template v-for="(item, index) in timeArr" :key="index">
			<div
				v-if="item === ':'"
				:style="`height: ${props.size}px;font-size:${(props.size / 72) * 54}px;border-radius: ${(props.size / 72) * 10}px`"
				class="split-str flex-center-vertical"
			>
				:
			</div>
			<div
				v-else
				:style="`width: ${props.size}px; height: ${props.size}px;font-size:${(props.size / 72) * 54}px`"
				class="item-number flex-center-vertical"
			>
				{{ item }}
			</div>
		</template>
	</div>
</template>
<script setup>
import { computed, watch, inject, onMounted, onUnmounted } from 'vue';
import useRafCountdown from '@/hooks/useRafCountdown';
const props = defineProps({
	time: {
		type: Number,
		default: 0
	},
	interval: {
		type: Number,
		default: 1000
	},
	size: {
		type: Number,
		default: 72
	}
});
const { countdown, setCallback, setEndCallback, resetCountdown, resetInterval, destroy } = useRafCountdown(
	props.time,
	props.interval
);
const timeArr = computed(() => countdown.value.split(''));
onUnmounted(() => {
	destroy();
});
defineExpose({
	setCallback,
	setEndCallback,
	resetCountdown,
	resetInterval,
	destroy
});
</script>
<style lang="scss" scoped>
.gz-count-down-clock {
	.item-number {
		width: 72px;
		height: 72px;
		background: linear-gradient(180deg, #29293a 3%, #3e3e52 100%);
		box-shadow:
			0px 6px 20px 0px rgba(0, 0, 0, 0.16),
			inset 0px 3px 2px 0px rgba(255, 255, 255, 0.1);
		border-radius: 14px 14px 14px 14px;
		border: 1px solid #5e5e6a;

		font-family:
			DIN Black,
			DIN Black;
		font-weight: 900;
		font-size: 54px;
		color: #fffcf9;
		text-shadow:
			0px 6px 20px rgba(0, 0, 0, 0.16),
			inset 0px 3px 2px rgba(255, 255, 255, 0.1);
		text-align: center;
		font-style: normal;
		text-transform: none;
	}
	.split-str {
		width: 11px;
		height: 52px;
		font-family:
			DIN Alternate,
			DIN Alternate;
		font-weight: 400;
		font-size: 40px;
		color: #29293a;
		text-align: left;
		font-style: normal;
		text-transform: none;
	}
	.flex-center-vertical {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
}
</style>
