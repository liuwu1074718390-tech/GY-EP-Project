<template>
	<div :class="`gz-step-status ${props.skin}`">
		<div class="step-warpper">
			<template v-for="(item, index) in data" :key="index">
				<div class="step" :class="{ active: activeIndex == index }" @click="handleClick(item)">
					<!-- <span class="tick" v-if="index < curIndex">
						<svg-icon style="width: 15px" :icon-class="`tick${props.skin ? '-' + props.skin : ''}`" />
					</span> -->
					<span class="index">{{ index + 1 }}</span>
					<span class="text-of">{{ item.name }}</span>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
	collapse: {
		type: Boolean,
		default: false
	},
	data: {
		type: Array,
		default: () => []
	},
	activeIndex: {
		type: Number,
		default: 0
	},
	skin: {
		type: String,
		default: ''
	}
});
const emit = defineEmits(['changeStep']);

// const curIndex = computed(() => {
// 	if (props.active) {
// 		return props.active;
// 	} else {
// 		const lastAccessOne = props.data.filter(item => item.access == 1).reduce((last, current) => current, null);
// 		return lastAccessOne.id;
// 	}
// });

const handleClick = item => {
	if (item.access == 1) {
		emit('changeStep', item);
	}
};
</script>
<style lang="scss" scoped>
.gz-step-status {
	width: 100%;
	height: 100%;
	max-height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 18px;
	cursor: default;
	// background: linear-gradient(360deg, rgba(55, 124, 253, 0.05) 0%, rgb(55, 124, 253, 0.1) 100%), rgb(53, 123, 253, 0.1);
	// &.collapse {
	// 	height: 20px !important;
	// 	.step-warpper {
	// 		opacity: 0;
	// 	}
	// }

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
			background-color: #ffffff;
			position: relative;
			margin-right: 20px;
			margin-left: 10px;

			&:first-child {
				border-radius: 12px 0px 0px 12px;
				margin-left: 0;
			}
			&:last-child {
				border-radius: 0px 12px 12px 0px;
				margin-right: 0;
			}

			&:not(:last-child)::after {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				right: -20px;

				border-top: 20px solid transparent;
				border-bottom: 20px solid transparent;
				border-left: 20px solid #fff;
			}

			&:not(:first-child)::before {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				left: -20px;

				border-top: 20px solid #fff;
				border-bottom: 20px solid #fff;
				border-left: 20px solid transparent;
			}

			&.active {
				background-color: #377cfd;
				color: #ffffff;
				font-weight: 700;

				.index {
					font-weight: 700;
					color: #f4f8ff;
					background-color: rgba(255, 255, 255, 0.2);
					border-color: rgba(255, 255, 255, 0.1);
				}

				&:not(:last-child)::after {
					border-left: 20px solid #377cfd;
				}
				&:not(:first-child)::before {
					border-top: 20px solid #377cfd;
					border-bottom: 20px solid #377cfd;
				}
			}
		}
	}

	.index {
		width: 20px;
		height: 20px;
		border: 1px solid rgb(0, 0, 0, 0.2);
		border-radius: 20px;
		font-weight: 700;
		font-size: 12px;
		color: #333333;
		line-height: 20px;
		text-align: center;
		margin-right: 8px;
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
		margin-right: 8px;
		.svg-icon {
			width: 16px;
			height: 16px;
		}
	}
}
.gz-step-status.golden .step-warpper {
	.step {
		background: rgba(255, 255, 255, 0.3);
		color: #ffffff;

		&:not(:last-child)::after {
			border-left: 20px solid rgba(255, 255, 255, 0.3);
		}
		&:not(:first-child)::before {
			border-top: 20px solid rgba(255, 255, 255, 0.3);
			border-bottom: 20px solid rgba(255, 255, 255, 0.3);
		}
		.index {
			background: #ffffff;
			border: 1px solid #dfe2e6;
			color: #333333;
		}
		.tick {
			background: rgba(255, 255, 255, 0.1);
			border: 1px solid rgba(255, 255, 255, 0.05);
			.svg-icon use {
				fill: #fec77f;
			}
		}

		&.active {
			background: linear-gradient(90deg, #fbe9cf 0%, #eab369 100%);
			box-shadow: inset 0px 0px 20px 5px #ffc77c;
			color: #4e1d00;
			&:not(:last-child)::after {
				border-left: 20px solid #fbc379;
			}
			&:not(:first-child)::before {
				border-top: 20px solid #fed195;
				border-bottom: 20px solid #fed196;
			}
			.index {
				background: rgba(78, 29, 0, 0.1);
				border: 1px solid rgba(78, 29, 0, 0.05);
				color: #4e1d00;
			}
		}
	}
}
</style>
