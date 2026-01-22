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
		<div class="gz-dialog-form-cust mt-5">
			<el-alert :title="props.warnning" type="warning" show-icon :closable="false" />
		</div>
		<div class="gz-dialog-form-cust mt-30 mb-30">
			<el-input :class="{ 'is-match': isMatch }" v-model="inputConfirm" :placeholder="placeholder" />
			<div class="f-700 mt-8">
				<slot>
					如要执行操作，请在文本框输入“<span style="color: red">{{ props.confirmText }}</span
					>”后点击下方【{{ props.btnOk }}】按钮
				</slot>
			</div>
		</div>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="model = false">{{ props.btnCancel }}</el-button>
				<el-button type="primary" :disabled="!isMatch" @click="ok">{{ props.btnOk }}</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';

const model = defineModel({
	type: Boolean,
	default: true
});
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	warnning: {
		type: String,
		default: '此动作慎重操作，确认执行吗'
	},
	placeholder: {
		type: String,
		default: '请输入‘我确认执行’'
	},
	confirmText: {
		type: String,
		default: '我确认执行'
	},
	btnOk: {
		type: String,
		default: '确认'
	},
	btnCancel: {
		type: String,
		default: '取消'
	}
});
// console.log(props);

const emit = defineEmits(['change']);
const inputConfirm = ref('');

const isMatch = computed(() => inputConfirm.value === props.confirmText);

const ok = () => {
	model.value = false;
	emit('change');
};
</script>
<style lang="scss" scoped>
.timer {
	border-radius: 6px 6px 6px 6px;
	border: 1px solid #e9ecf0;
	padding: 16px;
	text-align: center;
	& > p {
		font-family:
			Microsoft YaHei UI,
			Microsoft YaHei UI;
		font-weight: 400;
		font-size: 16px;
		color: #333333;
		line-height: 24px;
		padding-bottom: 8px;
	}
	& > div {
		font-family:
			DIN Alternate,
			DIN Alternate;
		font-weight: 400;
		font-size: 38px;
		color: #333333;
		line-height: 24px;
		padding: 8px;
	}
}
:deep(.el-input__wrapper) {
	background-color: rgba(255, 255, 255, 0) !important;
}
.default {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 40px;
	opacity: 0.7;
}
.is-match :deep(.el-input__inner) {
	color: red !important;
	font-weight: 700;
}
</style>
