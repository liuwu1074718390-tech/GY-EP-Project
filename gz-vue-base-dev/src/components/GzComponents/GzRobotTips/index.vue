<template>
	<div class="robot-tips" @click="tolink" :title="Props.tips">
		<div class="robot-bg">
			<div class="robot-content">
				<img src="@/assets/images/robot.png" />
				{{ title }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const Props = defineProps({
	title: {
		type: String,
		default: '客服机器人',
		require: true
	},
	path: {
		type: String,
		default: ''
	},
	newWindow: {
		type: Boolean,
		default: true
	},
	tips: {
		type: String,
		default: '客服机器人，即将上线，敬请期待'
	}
});
const tolink = () => {
	// if (Props.newWindow) {
	// 	window.open(Props.path, '_blank');
	// } else {
	// 	router.push({ path: Props.path });
	// }
};
const router = useRouter();
</script>

<style scoped lang="scss">
.robot-tips {
	position: absolute;
	cursor: pointer;
	top: 26px;
	right: 26px;
	.robot-bg {
		border-radius: 6px 6px 6px 6px;
		// width: 116px;
		// height: 32px;
		width: 116px;
		height: 32px;
		line-height: 32px;
		background: linear-gradient(
			90deg,
			rgba(59.00000028312206, 169.00000512599945, 255, 1),
			rgba(168.0000051856041, 145.00000655651093, 255, 1),
			rgba(30.00000011175871, 219.0000021457672, 255, 1),
			rgba(1.0000000591389835, 88.00000235438347, 255, 1)
		);
		// border-radius: 88px 88px 88px 88px;
		position: relative;
		top: 0;
		right: 0;

		&::after {
			content: '';
			width: 114px;
			height: 30px;
			background: #fff;
			position: absolute;
			top: 1px;
			left: 1px;
			border-radius: 5px 5px 5px 5px;
		}
		.robot-content {
			position: absolute;
			left: 12px;
			z-index: 1;
			font-family:
				Microsoft YaHei UI,
				Microsoft YaHei UI;
			font-weight: 400;
			font-size: 13px;
			color: #333333;
			img {
				width: 18px;
				height: 18px;
				margin-right: 7px;
			}
		}
	}
}
</style>
