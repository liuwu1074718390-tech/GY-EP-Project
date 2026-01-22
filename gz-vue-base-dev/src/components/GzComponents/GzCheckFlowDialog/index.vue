<template>
	<el-dialog
		v-model="model"
		:title="props.title"
		width="642px"
		:show-close="false"
		class="gz-dialog-form"
		append-to-body
		destroy-on-close
	>
		<el-alert v-if="props.warnMsg" :title="props.warnMsg" type="warning" :closable="false" />
		<div class="gz-dialog-form-cust">
			<svg-icon class="icon flex-center-horizontal" v-if="type == 'wait'" icon-class="open-btn-icon-000" />
			<svg-icon class="icon flex-center-horizontal" v-if="type == 'ok'" icon-class="f4n" />
			<svg-icon class="icon flex-center-horizontal" v-if="type == 'error'" icon-class="f4o" />
		</div>
		<div v-if="props.result" class="gz-dialog-form-cust">
			<p class="rtext flex-center-horizontal">{{ props.result }}</p>
		</div>
		<div v-if="props.result" class="mb-48">
			<slot> </slot>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="model = false">{{ props.closeText }}</el-button>
				<el-button v-if="props.subFun" type="primary" @click="ok">{{ props.subText }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const model = defineModel({
	type: Boolean,
	default: true
});
const props = defineProps({
	title: {
		type: String,
		default: '弹窗标题'
	},
	// 警告提示语
	warnMsg: {
		type: String
	},
	// 图标类型
	type: {
		type: String
	},
	// 图标文字
	result: {
		type: String
	},
	// 是否显示确认 + @change
	subFun: {
		type: Boolean,
		default: false
	},
	closeText: {
		type: String,
		default: '关 闭'
	},
	subText: {
		type: String,
		default: '确 认'
	}
});

const emit = defineEmits(['change']);

const param = ref({});

const ok = () => {
	emit('change', param);
	model.value = false;
};
</script>
<style lang="scss" scoped>
.icon {
	width: 90px;
	height: 90px;
	margin: auto;
	margin-top: 60px;
}
.rtext {
	margin-top: 18px;
	font-family:
		Microsoft YaHei UI,
		Microsoft YaHei UI;
	font-weight: 700;
	font-size: 24px;
	color: #333333;
	line-height: 30px;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
</style>
