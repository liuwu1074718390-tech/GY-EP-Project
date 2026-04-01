<template>
	<div class="login">
		<el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
			<h3 class="title">广咨材价库</h3>
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
					<template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="loginForm.password"
					type="password"
					size="large"
					auto-complete="off"
					placeholder="密码"
					@keyup.enter="handleLogin"
				>
					<template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
				</el-input>
			</el-form-item>
			<el-form-item prop="code" v-if="captchaEnabled">
				<el-input
					v-model="loginForm.code"
					size="large"
					auto-complete="off"
					placeholder="验证码"
					style="width: 63%"
					@keyup.enter="handleLogin"
				>
					<template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
				</el-input>
				<div class="login-code">
					<img :src="codeUrl" @click="getCode" class="login-code-img" />
				</div>
			</el-form-item>
			<el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px">记住密码</el-checkbox>
			<el-form-item style="width: 100%">
				<el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
					<span v-if="!loading">登 录</span>
					<span v-else>登 录 中...</span>
				</el-button>
				<div style="float: right" v-if="register">
					<router-link class="link-type" :to="'/register'">立即注册</router-link>
				</div>
			</el-form-item>
		</el-form>
		<!--  底部  -->
		<div class="el-login-footer">
			<span>Copyright © 2018-2024 _ All Rights Reserved.</span>
		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, getCurrentInstance } from 'vue';
import { getCodeImg } from '@/api/login';
import { Cookies } from '@/plugins/cache';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const loginForm = ref({
	username: 'admin',
	password: 'admin123',
	rememberMe: false,
	code: '',
	uuid: ''
});

const loginRules = {
	username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
	password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
	code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
};

const codeUrl = ref('');
const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(true);
// 注册开关
const register = ref(false);

function handleLogin() {
	proxy.$refs.loginRef.validate(valid => {
		if (valid) {
			loading.value = true;
			// 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
			if (loginForm.value.rememberMe) {
				Cookies.set('username', loginForm.value.username, { expires: 30 });
				Cookies.set('password', encrypt(loginForm.value.password), {
					expires: 30
				});
				Cookies.set('rememberMe', loginForm.value.rememberMe, { expires: 30 });
			} else {
				// 否则移除
				Cookies.remove('username');
				Cookies.remove('password');
				Cookies.remove('rememberMe');
			}
			// 调用action的登录方法
			userStore
				.login(loginForm.value)
				.then(() => {
					const query = route.query;
					const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
						if (cur !== 'redirect') {
							acc[cur] = query[cur];
						}
						return acc;
					}, {});
					router.push({ path: '/workbench', query: otherQueryParams });
				})
				.catch(() => {
					loading.value = false;
					// 重新获取验证码
					if (captchaEnabled.value) {
						getCode();
					}
				});
		}
	});
}

function getCode() {
	getCodeImg().then(res => {
		captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
		if (captchaEnabled.value) {
			codeUrl.value = 'data:image/gif;base64,' + res.img;
			loginForm.value.uuid = res.uuid;
		}
	});
}

function getCookie() {
	const username = Cookies.get('username');
	const password = Cookies.get('password');
	const rememberMe = Cookies.get('rememberMe');
	loginForm.value = {
		username: username === undefined ? loginForm.value.username : username,
		password: password === undefined ? loginForm.value.password : decrypt(password),
		rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
	};
}

getCode();
getCookie();
</script>

<style lang="scss" scoped>
.login {
	display: flex;
	align-items: center;
	justify-content: center;
	// height: 100%;
	// background-image: url('../assets/images/login-background.jpg');
	// background-size: cover;
	background-color: #fff;
	width: 460px;
	// height: 560px;
	border-radius: 12px;
	box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.05);
	margin: 0 auto;
	position: relative;
	top: 25%;
	padding: 40px 20px;

	.login-form {
		padding: 0;
	}
}
.title {
	margin: 0 auto 40px;
	color: #333333;
	text-align: left;
	font-size: 1.6rem;
	// padding-left: 12px;
	padding-top: 12px;
	font-weight: bold;
	text-align: center;
}
:deep(.el-form-item__label) {
	color: #333333;
	font-weight: 400;
	font-size: 16px;
	padding: 10px 0 5px 0;
	&::before {
		display: none;
	}
}
.login-form {
	width: 400px;
	padding: 25px 25px 5px;
	background: #ffffff;
	border-radius: 6px;
	.el-input {
		height: 40px;
		input {
			height: 40px;
		}
	}
	.input-icon {
		width: 14px;
		height: 39px;
		margin-left: 0;
	}
}
.login-tip {
	font-size: 13px;
	color: #bfbfbf;
	text-align: center;
}
.login-code {
	float: right;
	width: 33%;
	height: 40px;
	img {
		vertical-align: middle;
		cursor: pointer;
	}
}
.el-login-footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 40px;
	font-family: Arial;
	font-size: 12px;
	line-height: 40px;
	color: #ffffff;
	text-align: center;
	letter-spacing: 1px;
}
.login-code-img {
	height: 40px;
	padding-left: 12px;
}
</style>
