<template>
	<div class="gz-step-btn-list">
		<div class="cate-w">
			<div class="cate" v-for="(item, index) in props.cateList" :key="index">
				<template v-for="(item1, index1) in props.btnList" :key="index1">
					<span v-if="item == item1.cate" :class="{ active: curId == item1.id }" plain @click="toBtns(item1, index1)"
						><svg-icon v-if="props.iconMap[item.name]" style="width: 16px; height: 16px" :icon-class="props.iconMap[item.name]" />
						{{ item1.name }}
						<small v-if="item1.tagName" class="tag">{{ item1.tagName }}</small>
					</span>
				</template>
			</div>
		</div>
		<div class="btn-w">
			<div class="other">
				<b>其他功能</b>
				<template v-for="(item, index) in props.otherList" :key="index">
					<span :class="{ active: curId == item.id }" plain @click="toBtns(item, index)">
						<svg-icon v-if="props.iconMap[item.name]" style="width: 16px; height: 16px" :icon-class="props.iconMap[item.name]" />
						{{ item.name }}
						<small v-if="item.tagName" class="tag">{{ item.tagName }}</small>
					</span>
				</template>
			</div>
			<div class="record">
				<b>过程记录</b>
				<template v-for="(item, index) in props.recordList" :key="index">
					<span :class="{ active: curId == item.id }" plain @click="toBtns(item, index)"
						><svg-icon
							v-if="props.iconMap[item.name]"
							style="width: 16px; height: 16px"
							:icon-class="props.iconMap[item.name]"
						/>{{ item.name }}
						<small v-if="item.tagName" class="tag">{{ item.tagName }}</small>
					</span>
				</template>
			</div>
		</div>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps({
	cateList: {
		type: Array,
		default: () => []
	},
	btnList: {
		type: Array,
		default: () => []
	},
	otherList: {
		type: Array,
		default: () => []
	},
	recordList: {
		type: Array,
		default: () => []
	},
	activeId: {
		type: String,
		default: ''
	},
	activeDefault: {
		type: Boolean,
		default: true
	},
	iconMap: {
		type: Object,
		default: () => ({
			下载投标工具: 'download2'
		})
	}
});
const curId = ref('');
const emit = defineEmits(['change']);
const toBtns = (item, index) => {
	curId.value = item.id;
	emit('change', item);
};
onMounted(() => {
	if (props.activeId) {
		curId.value = props.activeId;
		let curItem = [...props.btnList, ...props.otherList, ...props.recordList].filter(e => e.id == props.activeId);
		curItem[0] && toBtns(curItem[0]);
	} else if (props.activeDefault) {
		toBtns([...props.btnList, ...props.otherList, ...props.recordList][0]);
	}
});
</script>
<style lang="scss" scoped>
.gz-step-btn-list {
	width: 100%;

	padding: 18px;
	// background: linear-gradient(360deg, rgba(55, 124, 253, 0.05) 0%, rgba(55, 124, 253, 0.1) 100%) #ffffff;

	.cate-w {
		// width: calc(100% - 130px);
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}

	.cate {
		background: #ffffff;
		border-radius: 12px 12px 12px 12px;
		flex: 1;
		margin: 0 10px;
		padding-bottom: 10px;

		&:first-child {
			margin-left: 0;
		}
		&:last-child {
			margin-right: 0;
		}

		span {
			display: block;
			width: calc(100% - 24px);
			height: 24px;
			line-height: 22px;
			background: #ffffff;
			border-radius: 4px 4px 4px 4px;
			border: 1px solid #dfe2e6;
			margin: 10px auto 0;
			text-align: center;
			font-size: 13px;
			color: #333333;
			cursor: pointer;
			position: relative;

			&.active {
				background: rgba(55, 124, 253, 0.1);
				border-radius: 4px 4px 4px 4px;
				border: 1px solid #377cfd;
				color: #377cfd;
				.svg-icon {
					fill: #377cfd;
				}
			}
		}
	}

	.btn-w {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 40px;
		margin: 20px 0;
		margin-bottom: 0;

		b {
			font-weight: 400;
			font-size: 12px;
			color: #333333;
			margin-right: 8px;
		}

		span {
			display: inline-block;
			height: 24px;
			background: #eaeef4;
			border-radius: 4px 4px 4px 4px;
			font-weight: 400;
			font-size: 12px;
			color: #565f6c;
			border: 1px solid #d9dde2;
			line-height: 24px;
			padding: 0 15px;
			margin: 8px;
			cursor: pointer;
			position: relative;

			&.active {
				background: rgba(55, 124, 253, 0.1);
				border-radius: 4px 4px 4px 4px;
				border: 1px solid #377cfd;
				color: #377cfd;
			}

			.tag {
				top: 3px;
			}
		}
	}

	.tag {
		padding: 0 8px;
		background: rgb(255, 38, 38, 0.95);
		color: #ffffff;
		border-radius: 4px;
		position: absolute;
		right: -10px;
		top: 13px;
		transform: translate(0, -100%);
	}
}
</style>
