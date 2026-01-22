<template>
	<el-carousel>
		<el-carousel-item v-for="item in lists" :key="item">
			<img class="banner-img" :src="item.img" />
			<!-- <div :class="`bg-color bg-color${index}`"></div> -->
		</el-carousel-item>
	</el-carousel>
	<!-- <img class="logo" src="@/assets/front/icon-black.png" /> -->
</template>
<script setup>
import { ref } from 'vue';
import ad1 from '@/assets/images/login-banner-new.png';
// import ad2 from '@/assets/images/login-background1.jpg';
// import ad3 from '@/assets/images/login-background.jpg';
// import ad4 from '@/assets/images/login-background.jpg';
const lists = ref([
	{
		img: ad1
	}
	// {
	// 	img: ad2
	// }
]);
</script>
<style lang="scss" scoped>
.el-carousel,
:deep(.el-carousel__container) {
	width: 100%;
	height: 100%;
}
.banner-img {
	height: 100%;
}
.logo {
	position: absolute;
	left: 50px;
	top: 40px;
	width: clamp(250px, 15vw, 345px);
}
.bg-color {
	height: 100%;
	width: 100%;
}
.bg-color0 {
	background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
}
.bg-color1 {
	background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
}
.bg-color2 {
	background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
}
</style>
