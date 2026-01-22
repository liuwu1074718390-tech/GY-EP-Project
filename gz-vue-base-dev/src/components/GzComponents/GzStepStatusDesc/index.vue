<template>
	<div :class="`gz-step-status-desc ${props.skin}`">
		<div class="step-warpper">
			<template v-for="(item, index) in data" :key="index">
				<div class="step" :class="{ active: index == curIndex }">
					<span class="text-of">{{ item.name || item }}</span>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
	data: {
		type: Array,
		default: () => []
	},
	activeIndex: {
		type: Number,
		default: null
	},
	skin: {
		type: String,
		default: ''
	}
});

const curIndex = computed(() => {
	if (props.activeIndex !== null && props.activeIndex >= 0) {
		return props.activeIndex;
	} else {
		let index = 0;
		props.data.forEach((e, i) => {
			if (e.status == 1) index = i;
		});
		return index;
	}
});
</script>
<style lang="scss" scoped>
.gz-step-status-desc {
	width: 100%;
	height: 100%;
	max-height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 18px;
	cursor: default;

	.step-warpper {
		// width: calc(100% - 130px);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.step {
			height: 100%;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			// background-color: #ffffff;
			position: relative;
			margin-right: 20px;
			margin-left: 10px;
			font-size: 14px;
			color: #8a9099;

			&.active {
				font-weight: 700;
				font-size: 14px;
				color: #377cfd;
			}
		}
	}
}
.gz-step-status-desc.golden {
	.step {
		&.active {
			color: #ffffff;
		}
	}
}
</style>
