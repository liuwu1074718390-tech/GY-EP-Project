<template>
	<el-dialog
		v-model="model"
		:title="props.title"
		style="max-width: 1400px"
		width="80%"
		top="8vh"
		:show-close="false"
		append-to-body
		destroy-on-close
		class="gz-dialog-form"
	>
		<div class="gz-dialog-form-cust">
			<p class="gz-dialog-form-cust-tit mb-10">内容</p>
			<el-input v-model="param.tx" :rows="5" :autosize="false" type="textarea" placeholder="请输入相关描述" />
		</div>
		<div class="gz-dialog-form-cust mt-30">
			<p class="gz-dialog-form-cust-tit mb-10">附件</p>
			<gz-upload-file :moduleName="`tender`" v-model="param.file" />
		</div>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="model = false">关 闭</el-button>
				<el-button type="primary" @click="ok">确 定</el-button>
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
	}
});

const emit = defineEmits(['change']);

const param = ref({});

const ok = () => {
	emit('change', param);
	model.value = false;
};
</script>
<style lang="scss" scoped></style>
