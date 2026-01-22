<template>
	<div class="gz-count-down-date-clock flex-center-horizontal" :style="`gap: ${(props.size / 118) * 8}px`">
		<template v-for="(item, index) in timeArr" :key="index">
			<div
				v-if="props.showKey.includes(unit[index])"
				:style="`width: ${props.size}px; height: ${props.size}px;`"
				class="item-number flex-center-vertical"
			>
				<p class="f-700 flex-center-vertical" :style="`font-size:${(props.size / 118) * 42}px;color: ${fontColor[0]};height:52%`">
					{{ item }}
				</p>
				<p class="flex-center-vertical" :style="`font-size:${(props.size / 118) * 26}px;color: ${fontColor[1]};height:48%`">
					{{ unit[index] }}
				</p>
			</div>
		</template>
	</div>
</template>
<script setup>
import { computed, ref, watch, inject, onMounted, onUnmounted } from 'vue';
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
		default: 118
	},
	fontColor: {
		type: Array,
		default: () => ['#333333', '#8A9099']
	},
	showKey: {
		type: Array,
		default: () => ['天', '时', '分', '秒']
	}
});
const unit = ref(['天', '时', '分', '秒']);
const { countdown, setCallback, setEndCallback, resetCountdown, resetInterval, destroy } = useRafCountdown(
	props.time,
	props.interval,
	true
);
const timeArr = computed(() => countdown.value.split(':'));
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
.flex-center-vertical {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.gz-count-down-date-clock {
	.item-number {
		width: 118px;
		height: 118px;
		// background: linear-gradient(180deg, #29293a 3%, #3e3e52 100%);
		// box-shadow:
		// 	0px 6px 20px 0px rgba(0, 0, 0, 0.16),
		// 	inset 0px 3px 2px 0px rgba(255, 255, 255, 0.1);
		background: url('@/assets/purchase/bidding/date-clock-bg.png') no-repeat;
		background-size: cover;
		// border-radius: 14px 14px 14px 14px;
		// border: 1px solid #5e5e6a;

		font-family:
			DIN Black,
			DIN Black;
		// font-weight: 900;
		// font-size: 54px;
		// color: #fffcf9;
		// text-shadow:
		// 	0px 6px 20px rgba(0, 0, 0, 0.16),
		// 	inset 0px 3px 2px rgba(255, 255, 255, 0.1);
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
