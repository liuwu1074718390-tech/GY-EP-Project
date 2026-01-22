<template>
	<div :class="`gz-contant-card ${isShadow ? 'shadow' : ''}`">
		<div class="card-top flex-space-between p-20">
			<div class="flex-start-horizontal">
				<div class="icon"><slot name="title"></slot></div>
				<span class="title" v-if="title">{{ title }}</span>
			</div>
			<slot name="subtitle"></slot>
			<div class="arrow" @click="tolink" v-if="moreShow">
				{{ moreTitle }} <el-icon><ArrowRight /></el-icon>
			</div>
		</div>
		<div class="card-body">
			<slot name="body"></slot>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const Props = defineProps({
	title: {
		type: String,
		default: '',
		require: true
	},
	isShadow: {
		type: Boolean,
		default: false
	},
	moreShow: {
		type: Boolean,
		default: true
	},
	moreTitle: {
		type: String,
		default: '更多'
	},
	morePath: {
		type: String,
		default: ''
	},
	newWindow: {
		type: Boolean,
		default: true
	}
});
const tolink = () => {
	if (Props.newWindow) {
		window.open(Props.morePath, '_blank');
	} else {
		router.push({ path: Props.morePath });
	}
};
const router = useRouter();
</script>

<style scoped lang="scss">
.gz-contant-card {
	// background: #ffffff;
	border-radius: 30px;
	overflow: hidden;
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 120px;
}
.shadow {
	box-shadow: 7px 10px 30px 0px rgba(0, 0, 0, 0.16);
}
.card-top {
	height: 48px;
	line-height: 48px;
	// background: rgba(243, 246, 253, 0.8);
	border-radius: 20px 20px 0px 0px;
	justify-items: center;
	backdrop-filter: blur(15px) saturate(86%) !important;
	background-color: rgba(248, 248, 252, 0.6) !important;

	.icon {
		display: flex;
		justify-content: center;
		justify-items: center;
	}

	.title {
		font-size: 17px;
		color: #333333;
		cursor: pointer;
		margin-left: 12px;
		font-weight: 700;
	}

	.arrow {
		// height: 48px;
		// line-height: 48px;
		// position: absolute;
		// right: 20px;
		// top: 0;
		cursor: pointer;
		font-size: 12px;
		color: #377cfd;
		.el-icon {
			width: 17px;
			height: 17px;
			position: relative;
			top: 1px;
		}
	}
}
.card-body {
	position: absolute;
	top: 48px;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: auto;
	background-color: #ffffff;
}
.flex-start-horizontal {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.pos-r {
	position: relative;
}
.p-20 {
	padding: 20px;
}
</style>
