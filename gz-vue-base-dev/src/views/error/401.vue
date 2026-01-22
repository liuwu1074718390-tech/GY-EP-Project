<template>
	<div class="errPage-container">
		<el-button icon="arrow-left" class="pan-back-btn" @click="back"> 返回 </el-button>
		<el-row>
			<el-col :span="14">
				<h1 class="text-jumbo text-ginormous">401错误!</h1>
				<h2>您没有访问权限！</h2>
				<h5>对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h5>
				<ul class="list-unstyled">
					<li class="link-type">
						<router-link to="/"> 回首页 </router-link>
					</li>
				</ul>
			</el-col>
			<el-col :span="10">
				<img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream." />
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import errImage from '@/assets/401-images/401.gif';

let { proxy } = getCurrentInstance();

const errGif = ref(errImage + '?' + +new Date());

function back() {
	if (proxy.$route.query.noGoBack) {
		proxy.$router.push({ path: '/' });
	} else {
		proxy.$router.go(-1);
	}
}
</script>

<style lang="scss" scoped>
.errPage-container {
	width: 800px;
	max-width: 100%;
	margin: 100px auto;
	.pan-back-btn {
		color: #ffffff;
		background: #008489;
		border: none !important;
	}
	.pan-gif {
		display: block;
		margin: 0 auto;
	}
	.pan-img {
		display: block;
		width: 100%;
		margin: 0 auto;
	}
	.text-jumbo {
		font-size: 60px;
		font-weight: 700;
		color: #484848;
		margin-top: 40px;
		margin-bottom: 30px;
	}
	.list-unstyled {
		font-size: 16px;
		li {
			padding-bottom: 5px;
		}
		a {
			color: #008489;
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
