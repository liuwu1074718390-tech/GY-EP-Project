<template>
	<div class="gz-top-tips" v-if="show">
		<div style="max-width: 1872px; margin: 0 auto" class="flex-space-between">
			<div class="flex-start-horizontal">
				<img src="@/assets/icons/other/microinterview_guide_tip@2x.png" />
				<div class="content">
					<slot></slot>
				</div>
			</div>

			<el-icon class="cur-p" style="color: #8a9099" @click="close"><Close /></el-icon>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onUnmounted, onDeactivated, onActivated, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const Prop = defineProps({
	name: {
		type: String,
		default: ''
	}
});

let _key = 'gzTopTipsHide_' + Prop.name;

const show = ref(!sessionStorage.getItem(_key));

// console.log(sessionStorage.getItem(_key));

const tolink = () => {
	router.push({ path: '/message/notification' });
};
const router = useRouter();
const close = () => {
	show.value = false;
	sessionStorage.setItem(_key, true);
	// removeClass(myElement, 'hasTopTips');
};

const addClassIfNotExist = (element, className) => {
	if (!element.classList.contains(className)) {
		element.classList.add(className);
	}
};

const removeClass = (element, className) => {
	element.classList.remove(className);
	// element.style.animation = 'animation3 0.5s ease forwards';
};

const myElement = document.getElementById('app');

onMounted(() => {
	if (show.value) addClassIfNotExist(myElement, 'hasTopTips');
});

onActivated(() => {
	if (show.value) addClassIfNotExist(myElement, 'hasTopTips');
});

watch(show, (n, o) => {
	// console.log(n, o);
	if (n === false) removeClass(myElement, 'hasTopTips');
});
onUnmounted(() => removeClass(myElement, 'hasTopTips'));
onDeactivated(() => removeClass(myElement, 'hasTopTips'));
</script>

<style lang="scss">
.hasTopTips {
	height: calc(100% - 48px) !important;
	position: relative;
	top: 48px;
	animation: animation1 0.5s ease forwards;
}
.gz-top-tips {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 48px;
	background: #fffaeb;
	border-radius: 0px 0px 0px 0px;
	padding: 0 30px;
	justify-items: center;
	z-index: 2;
	animation: animation2 0.3s ease forwards;

	.content {
		height: 48px;
		line-height: 48px;
		display: flex;
		align-items: center;
	}

	img {
		height: 30px;
		// width: 50px;
		margin-right: 15px;
		position: relative;
		top: -4px;
	}
}
.flex-space-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.cur-p {
	cursor: pointer;
}

@keyframes animation1 {
	from {
		// opacity: 0;
		// transform: translateY(-100%);
		top: 0;
	}
	to {
		// opacity: 1;
		// transform: translateY(0);
		top: 48px;
	}
}

@keyframes animation2 {
	from {
		opacity: 0;
		// transform: translateY(-100%);
		top: -100%;
	}
	to {
		opacity: 1;
		// transform: translateY(0);
		// top: 0;
		top: 0;
	}
}

@keyframes animation3 {
	from {
		// opacity: 0;
		// transform: translateY(-100%);
		top: 48px;
	}
	to {
		// opacity: 1;
		// transform: translateY(0);
		top: 0;
	}
}
</style>
