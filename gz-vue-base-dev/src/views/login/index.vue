<template>
	<el-row class="bg">
		<el-col :span="14">
			<BannerBg />
		</el-col>
		<el-col :span="10">
			<LoginForm />
		</el-col>
	</el-row>
</template>

<script setup>
import LoginForm from './login.vue';
import BannerBg from './BannerBg.vue';
</script>
<style lang="scss" scoped>
.bg {
	height: 100%;
	width: 100%;
	overflow: hidden;
	// background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
	background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
}
</style>
