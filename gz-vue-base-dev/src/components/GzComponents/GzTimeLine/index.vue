<template>
	<div class="gz-time-line">
		<h3 class="f-17 f-b" v-if="props.title">{{ props.title }}</h3>
		<div class="project-list" :style="`top:${props.title ? 74 : 60}px`">
			<el-timeline>
				<el-timeline-item
					placement="top"
					v-for="(activity, index) in props.data"
					:key="index"
					:icon="activity.icon"
					:type="activity.btntype || 'primary'"
					:color="activity.color"
					:size="activity.size || 'large'"
					:hollow="activity.hollow === false ? false : true"
					:timestamp="activity.content"
				>
					<div class="pos-r tl-item">
						<div class="review">
							<slot name="review" :item="activity"></slot>
						</div>
						<p class="color-info f-12">
							{{ activity.timestamp }}
							<slot name="time" :item="activity"></slot>
						</p>
						<div class="f-12 operator">
							<gz-avatar-name v-if="activity.operator" :bgColor="``" :gap="8">{{ activity.operator }}</gz-avatar-name>
							<div v-else>
								<slot name="operator" :item="activity"></slot>
							</div>
						</div>
						<div class="info">
							<slot name="info" :item="activity"></slot>
						</div>
						<div class="cont">
							<slot name="comments" :item="activity"></slot>
						</div>

						<div class="pending">
							<slot name="pending" :item="activity"></slot>
						</div>

						<div>
							<slot name="remark" :item="activity"></slot>
						</div>
					</div>
				</el-timeline-item>
			</el-timeline>

			<div v-if="!props.data.length" class="no-data flex-center-vertical">
				<slot name="noData" :item="props.data"></slot>
			</div>
		</div>
	</div>
</template>
<script setup>
// import { MoreFilled } from '@element-plus/icons-vue';
import GzAvatarName from '@/components/GzAvatarName';
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	data: {
		type: Array,
		default: () => []
	},
	align: {
		type: Array,
		default: () => ['right', 'left']
	}
});
// const demoData = [
// 	{
// 		content: '发起申请',
// 		timestamp: '2018-04-03 20:46',
// 		size: 'large',
// 		btntype: 'primary',
// 		hollow: true,
// 		name: '刘华强',
// 		operation: '提交',
// 		comments: '这里是审批意见，最多100个字符，这里是审批意见，最多100个字符，这里是审'
// 		// color: '#0bbd87'
// 	}
// ];
</script>
<style lang="scss" scoped>
.gz-time-line {
	.project-list {
		position: absolute;
		top: 74px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;
		padding: 20px;
		padding-top: 0;

		.tl-item {
			border-bottom: 1px dashed #e9ecf0;
			padding: 0 0 30px 0;
		}

		img {
			height: 18px;
			width: 18px;
			border-radius: 30px;
			margin-right: 3px;
			position: relative;
			top: -2px;
		}

		.operator {
			position: absolute;
			right: 0;
			top: -30px;
			font-size: 14px;
		}

		.info {
			position: absolute;
			right: 0;
			top: -46px;
			font-size: 14px;
		}

		.review {
			margin-top: 4px;
		}

		:deep(.cont) {
			// padding: 12px;
			background-color: #f5f7fa;
			border-radius: 6px;
			color: #626973;
		}

		:deep(.el-timeline-item) {
			padding-top: 6px;
			padding-bottom: 15px;
			.el-timeline-item__tail {
				border-left: 1px solid #377cfd;
				box-shadow: 0 0 1px #377cfd;
			}
			.el-timeline-item__timestamp {
				font-weight: 400;
				font-size: 14px;
				color: #333333;
			}
		}
		.operator {
			:deep(.gz-avatar-name) {
				margin-top: 0;
			}
		}
	}
}
</style>
