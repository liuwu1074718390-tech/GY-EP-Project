<template>
	<div class="gz-login-remind pt-24 text-center" v-if="!userStore.token">
		<svg-icon style="width: 60px; height: 60px" icon-class="qs-05" />
		<div class="color-link color-info f-13 mt-8" @click="doLogin">请登录后查看</div>
	</div>
</template>
<script setup>
// import img from '@/assets/icons/other/head-icon-user@2x.png';
import useUserStore from '@/store/modules/user';
const userStore = useUserStore();
const doLogin = () => {
	_IPC.pubSub.emitOnce('checkUserIsLogin');
};

defineExpose({
	isLoginNow: () => {
		return userStore.token;
	},
	doLogin
});
</script>
<style lang="scss" scoped>
.gz-login-remind {
}
</style>
