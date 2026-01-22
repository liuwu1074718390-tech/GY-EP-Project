<template>
	<div class="app-container home">
		<h2>vue3后台管理框架</h2>
		<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
			<el-tab-pane label="README" name="README">
				<img src="@/views/docs/README.png" />
			</el-tab-pane>
			<el-tab-pane label="前端规范文档" name="前端规范文档">
				<img src="@/views/docs/前端规范.png" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup name="Index">
// import docBuild from '@/views/docs/build';
// import docBuildLog from '@/views/docs/buildLog';
// import { ref } from 'vue';
// const version = ref('3.8.7');

// function goTarget(url) {
// 	window.open(url, '__blank');
// }
import { ref } from 'vue';

const activeName = ref('README');

const handleClick = (tab, event) => {
	// console.log(tab, event);
};
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
	padding: 32px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
:deep(.el-tabs__item) {
	margin-top: 30px;
	font-size: 16px !important;
}
.home {
	blockquote {
		padding: 10px 20px;
		margin: 0 0 20px;
		font-size: 17.5px;
		border-left: 5px solid #eeeeee;
	}
	hr {
		margin-top: 20px;
		margin-bottom: 20px;
		border: 0;
		border-top: 1px solid #eeeeee;
	}
	.col-item {
		margin-bottom: 20px;
	}
	ul {
		padding: 0;
		margin: 0;
	}

	overflow-x: hidden;
	font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-size: 13px;
	color: #676a6c;
	ul {
		list-style-type: none;
	}
	h4 {
		margin-top: 0;
	}
	h2 {
		margin-top: 10px;
		font-size: 26px;
		font-weight: 100;
	}
	p {
		margin-top: 10px;
		b {
			font-weight: 700;
		}
	}
	.update-log {
		ol {
			display: block;
			padding-inline-start: 40px;
			margin-block: 1em 1em;
			margin-inline: 0 0;
			list-style-type: decimal;
		}
	}
}
</style>
