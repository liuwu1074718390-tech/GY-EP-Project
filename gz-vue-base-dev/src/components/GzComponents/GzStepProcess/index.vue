<template>
	<div class="gz-step-line h100">
		<div class="step-warpper h100" :style="`transform: translateX(${-firstItemWidth / 2}px)`">
			<template v-for="(item, index) in data" :key="index">
				<div class="step h100">
					<div class="line-w">
						<a v-if="index > 0" :class="item.type"></a><span class="tick" :class="item.type"><svg-icon icon-class="tick" /></span>
					</div>
					<p v-if="index > 0" :style="`max-width: ${itemMaxWidth}px;width: ${itemWidth}px`" class="line-title">
						{{ item.title }}
					</p>
					<p v-else ref="firstTitle" :style="`max-width: ${itemMaxWidth}px;width: ${itemWidth}px`" class="line-title">
						{{ item.title }}
					</p>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
const firstTitle = ref(null);
const props = defineProps({
	data: {
		type: Array,
		default: () => [
			{
				title: '步骤一',
				type: 'primary'
			},
			{
				title: '步骤二',
				type: 'success'
			},
			{
				title: '步骤三',
				type: 'info'
			}
		]
	},
	itemMaxWidth: {
		type: Number,
		default: 250
	},
	itemWidth: {
		type: Number,
		default: 150
	}
});
const firstItemWidth = ref(0);
onMounted(() => {
	nextTick(() => {
		firstItemWidth.value = firstTitle.value[0]?.offsetWidth;
		// console.log(firstItemWidth.value);
	});
});
</script>
<style lang="scss" scoped>
.gz-step-line {
	padding: 20px 10px;
	.step-warpper {
		display: flex;
		justify-content: space-around;
		align-items: start;
		gap: 0;
	}
	.step {
		// flex: 1;
	}
	.line-w {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		// :first-child {
		// 	justify-items: end;
		// }
		margin-right: -2px;

		a {
			border-bottom: 2px solid #377cfd;
			width: calc(100% - 22px);
			border-radius: 2px;
			opacity: 0.5;
			&.primary {
				border-bottom: 2px solid #377cfd;
			}
			&.success {
				border-bottom: 2px solid #00c261;
			}
			&.info {
				border-bottom: 2px solid #dfe2e6;
			}
			&.warning {
				border-bottom: 2px solid #ffa200;
			}
			&.danger {
				border-bottom: 2px solid #ff2626;
			}
		}
		.tick {
			width: 20px;
			height: 20px;
			background: #377cfd;
			border-radius: 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.svg-icon {
				width: 16px;
				height: 16px;
			}
			&.primary {
				background: #377cfd;
			}
			&.success {
				background: #00c261;
			}
			&.info {
				background: #dfe2e6;
			}
			&.warning {
				background: #ffa200;
			}
			&.danger {
				background: #ff2626;
			}
		}
	}

	.line-title {
		transform: translateX(calc(50% - 16px));
		padding: 8px 10px;
		white-space: break-spaces;
		word-wrap: break-word;
	}

	.tx-of {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
