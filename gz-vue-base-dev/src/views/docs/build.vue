<template>
	<div class="contant-wrap">
		<h4>前端框架搭建及进度清单：</h4>
		<div class="contant-body">
			<p>1. 初始化并升级原框架中依赖版本，引入 pnpm 生成 lock 文件锁定依赖（完成）</p>
			<p>2. 整改去掉无关信息及配置信息（完成）</p>
			<p>3. 安装自动化检测校验工具，使代码规范化标准化 （完成）</p>
			<ul>
				<li>3.1 安装 eslint 对 js 检测校验 （完成）</li>
				<li>3.2 安装 stylelint 对样式 css、scss 等进行检测校验 （完成）</li>
				<li>3.3 安装 lint-plus-vue 对 vue 文件进行检测校验 （完成）</li>
				<li>3.4 安装 commitlint 对 git 提交规范进行检测校验 （完成）</li>
				<li>3.5 安装 preetter-lint 对代码书写格式化重写（完成）</li>
			</ul>
			<p>4. 对原有代码自动检测报错修改 （25%）</p>
			<ul>
				<li>4.1 js 部分 （90%）</li>
				<li>4.2 style 部分 （未开始）</li>
			</ul>
			<p>5. 前端开发规范制定及文档编写 （未开始）</p>
			<ul>
				<li>5.1 技术栈选用</li>
				<li>5.2 命名及目录结构</li>
				<li>5.3 编程书写及语法</li>
				<li>5.4 git 提交</li>
				<li>5.5 前后端对接及文档</li>
				<li>5.6 UI 设计交付</li>
				<li>5.7 前端测试</li>
				<li>5.8 前端编辑器</li>
			</ul>
			<p>6. 全局 UI 调整，根据 UI 团队给出的规范调整，样式、色彩、间距，icon...等等。（40%）</p>
			<ul>
				<li>6.1 字体设置（完成）</li>
				<li>6.2 主题色配置（80%）</li>
				<li>6.3 菜单样式及配色（70%）</li>
				<li>6.4 菜单布局可以选择3种常见布局（完成）</li>
				<li>6.5 全局样式变量配置（60%）</li>
			</ul>
			<p>7. Utils 常用工具方法等编写或引入 （10%）</p>
			<p>8. 样式处理</p>
			<ul>
				<li>8.1 base样式，reset样式引入重置（完成）</li>
				<li>8.2 常用样式等等编写或引入（完成）</li>
			</ul>
			<p>9. 组件封装 （5%）</p>
			<ul>
				<li>9.1 UI 组件：基于 elementPlus 进行二次开发</li>
				<li>9.2 功能组件：如编辑器，图表等开源组件引用或二次开发</li>
				<li>9.3 业务组件。封装相同的业务逻辑或功能。待定</li>
			</ul>
			<p>10. hook 封装或引用 （未开始）</p>
			<p>11. 工程化-项目打包及构建优化（20%）</p>
			<p>12. CI/CD 前端自动化部署及配置脚本编写 （待定）</p>
			<ul>
				<li>12.1 docker配置 80%</li>
			</ul>
			<p>13. 前端埋点，数据采集，性能分析 （待定）</p>
			<p>14. 前端脚手架 npm 包化（待定）</p>
			<p>15. 其他建设，根据建设过程和需求再定（待定）</p>
			<p>16. 代码重构(10%)</p>
			<ul>
				<li>16.1 store由options写法变更为setup写法</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.contant-body {
	max-height: 700px;
	overflow-y: auto;
}
h4 {
	padding: 10px 0;
}
p {
	padding: 5px;
	font-weight: 500;
	margin-top: 20px;
}
li {
	text-indent: 3ch;
	margin-top: 5px;
}
</style>
