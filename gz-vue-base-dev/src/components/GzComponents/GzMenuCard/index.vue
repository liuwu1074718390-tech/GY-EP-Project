<template>
	<div class="gz-menu-card pos-r p-15">
		<div class="flex-start-horizontal hw100" @click="tolink">
			<div class="icon"><slot></slot></div>
			<span v-if="childrenData && childrenData.length > 0" class="arrow"><ArrowRight /></span>
			<span class="title">{{ title }}</span>
			<span class="badge" v-if="badge * 1 > 0">{{ badge }}</span>
			<el-icon class="arrow"><ArrowRight /></el-icon>
		</div>
		<div class="children-wrap" v-if="childrenData && childrenData.length > 0">
			<el-popover placement="top-start" :width="200" trigger="hover">
				<template #reference>
					<el-button style="height: 100%; width: 100%; opacity: 0"></el-button>
				</template>
				<template #default>
					<a
						v-for="(item2, index) in childrenData"
						:key="index"
						class="gz-menu-card_children-item flex-start-horizontal hw100"
						@click="tolink2(item2)"
					>
						{{ item2.label }}</a
					>
				</template>
			</el-popover>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const Props = defineProps({
	title: {
		type: String,
		default: '',
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
	badge: {
		type: Number,
		default: 0
	},
	childrenData: {
		type: Array,
		default: () => []
	}
});
const tolink = () => {
	// console.log(Props.path);
	if (!Props.path) return;
	if (Props.newWindow) {
		window.open(Props.path, '_blank');
	} else {
		router.push({ path: Props.path, query: urlParamsToObject(Props.path) });
		// router.push({ path: encodeURIComponent(Props.path), query: urlParamsToObject(Props.path) });
	}
};
const tolink2 = item => {
	// console.log(Props.path);
	if (!item.path) return;
	if (Props.newWindow) {
		window.open(item.path, '_blank');
	} else {
		router.push({ path: item.path, query: urlParamsToObject(item.path) });
		// router.push({ path: encodeURIComponent(Props.path), query: urlParamsToObject(Props.path) });
	}
};
function urlParamsToObject(url) {
	const searchParams = new URLSearchParams(url.split('?')[1]);
	const paramsObject = {};
	for (const [key, value] of searchParams.entries()) {
		paramsObject[key] = value; // encodeURIComponent(value);
	}

	return paramsObject;
}
</script>

<style scoped lang="scss">
.gz-menu-card {
	width: 266px;
	height: 48px;
	background: #f0f4ff;
	border-radius: 12px 12px 12px 12px;
	justify-items: center;
	cursor: pointer;
	min-width: 150px;

	.icon {
		display: flex;
		justify-content: center;
		justify-items: center;
	}

	.title {
		font-size: 14px;
		color: #333333;
		cursor: pointer;
		margin-left: 5px;
	}

	.arrow {
		width: 14px;
		height: 14px;
		position: absolute;
		right: 14px;
		top: 17px;
		cursor: pointer;
		color: #8a9099;
	}
	.badge {
		position: absolute;
		right: 34px !important;
		top: 13px;
	}
	.flex-start-horizontal {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.children-wrap {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
}
</style>
<style>
.gz-menu-card_children-item {
	height: 32px;
	line-height: 32px;
	display: block;
	&:hover {
		color: #377cfd;
	}
}
</style>
