<!-- 页面背景图 -->
<!-- demo
    <gz-page-bg> ... </gz-page-bg>
 -->
<template>
	<div class="gz-page-bg" :style="{ backgroundImage: `url(${Props.bgUrl})` }">
		<slot></slot>
		<div class="gz-page-logo" v-if="showLogo">
			<img style="cursor: pointer" @click="$router.push('/')" :src="Props.logoUrl" />
		</div>
	</div>
</template>

<script setup>
// import { ref } from 'vue';
// const backgroundImageUrl = ref('http://..');
// const backgroundImageUrl = new URL(Props.bgUrl, import.meta.url).href;
import backgroundImageUrl from '@/assets/login/login-bg@2x.png';
import logoImageUrl from '@/assets/login/logo@2x.png';

const Props = defineProps({
	bgUrl: {
		type: String,
		default: backgroundImageUrl
	},
	logoUrl: {
		type: String,
		default: logoImageUrl
	},
	showLogo: {
		type: Boolean,
		default: false
	}
});
</script>
<style lang="scss" scoped>
.gz-page-bg {
	height: 100%;
	width: 100%;
	overflow: hidden;

	// background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
	display: flex;
	justify-content: center;
	align-items: center;

	// background-image: url('@/assets/images/login-background.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	background-color: #e1eefe;

	.gz-page-logo {
		position: fixed;
		left: clamp(50px, 7vw, 164px);
		top: clamp(15px, 7vh, 48px);

		img {
			height: 60px;
		}
	}
	@media (max-width: 1440px) {
		.gz-page-logo {
			left: clamp(10px, 1vw, 20px);
		}
	}
	@media (max-height: 900px) {
		.gz-page-logo {
			top: clamp(10px, 2vh, 15px);
		}
	}
	@media (max-height: 750px) {
		.gz-page-logo {
			display: none;
		}
	}
}
</style>
