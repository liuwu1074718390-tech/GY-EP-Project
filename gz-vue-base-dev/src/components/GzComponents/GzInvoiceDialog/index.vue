<template>
	<el-dialog
		v-model="model"
		title="申请开票"
		width="642px"
		:show-close="false"
		class="gz-dialog-form"
		append-to-body
		destroy-on-close
	>
		<el-form class="gz-form-search" :model="form" ref="queryRef" :rules="rules" label-position="top">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="抬头类型">
						<div class="btns">
							<div class="left" :class="form.ttlx === 0 ? 'active' : ''" @click="changeBtn('ttlx', 0, 0)">一般纳税人</div>
							<div class="right" :class="form.ttlx === 1 ? 'active' : ''" @click="changeBtn('ttlx', 1, 0)">小规模纳税人</div>
						</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="发票性质">
						<div class="btns">
							<div class="left" :class="form.fpxz === 0 ? 'active' : ''" @click="changeBtn('fpxz', 0, 0)">电子发票</div>
							<div class="right disabled" :class="form.fpxz === 1 ? 'active' : ''" @click="changeBtn('fpxz', 1, 1)">纸质发票</div>
						</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="发票类型">
						<div class="btns">
							<div class="left" :class="form.fplx === 0 ? 'active' : ''" @click="changeBtn('fplx', 0, 0)">普通发票</div>
							<div
								class="right"
								:class="[form.fplx === 1 ? 'active' : '', form.ttlx === 1 ? 'disabled' : '']"
								@click="changeBtn('fplx', 1, form.ttlx === 1)"
							>
								增值税专用发票
							</div>
						</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="税率">
						<div class="btns">
							<div class="left" :class="form.sl === 0 ? 'active' : ''" @click="changeBtn('sl', 0, 0)">1%</div>
							<div
								class="right"
								:class="[form.sl === 1 ? 'active' : '', form.fplx === 0 ? 'disabled' : '']"
								@click="changeBtn('sl', 1, form.fplx === 0)"
							>
								3%
							</div>
						</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="抬头名称" prop="ttmc">
						<el-input disabled v-model="form.ttmc" placeholder="默认填入当前企业"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="纳税人识别号" prop="nsrsbh">
						<el-input disabled v-model="form.nsrsbh" placeholder="默认填入当前企业信息"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="企业邮箱" prop="qyyx">
						<el-input v-model="form.qyyx" placeholder="请输入企业邮箱"></el-input>
						<div class="notice">开票成功后，将自动将电子发票发送至企业邮箱</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="备注信息" prop="bzxx" style="margin-bottom: 12px">
				<el-input v-model="form.bzxx" type="textarea" placeholder="请输入备注"></el-input>
			</el-form-item>
		</el-form>
		<div class="error-notice">
			请按照电子商务法及发票管理办法等规定填与发票信息，若因填写无效信息或非法信息等造成包括但不限于无法成功开具发票等后果或法律责任，请您自行承拍
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="model = false">取消</el-button>
				<el-button type="primary" @click="submit">提交</el-button>
			</span>
		</template>
		<el-dialog
			v-model="dialogVisible"
			width="589px"
			:show-close="false"
			class="gz-dialog-form"
			append-to-body
			destroy-on-close
			:before-close="handleClose"
			style="margin-top: 30vh !important"
		>
			<div class="message-content">
				<svg-icon icon-class="ch3" />
				<div class="message-box">
					<p class="message-title">提交成功</p>
					<div class="message-body">
						您的申请已提交，平台请耐心等待平台方为您开具发票<span style="color: #377cfd">({{ countdown }}s后自动关闭)</span>
					</div>
				</div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="suceessClose">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
	</el-dialog>
</template>
<script setup>
import { ref, onMounted, inject, getCurrentInstance, computed, reactive, nextTick } from 'vue';
import useBidOpenStoreStore from '@/store/modules/open-bid';
import { regexMail } from '@/utils/form-validator';
import { ElMessageBox } from 'element-plus';
import useEnterpriseStore from '@/store/modules/enterprise';
const enterpriseStore = useEnterpriseStore();
// import { number } from 'echarts';

import { invoiceAdd } from '@/api/bid/platform-service-fee';
// const bidOpenStore = useBidOpenStoreStore();
// const sectionId = inject('sectionId');
const { proxy } = getCurrentInstance();
const model = defineModel({
	type: Boolean,
	default: true
});
const props = defineProps({
	infoData: {
		type: Object,
		default: () => {}
	}
});

const emit = defineEmits(['invoiceAddSuccess']);

const form = ref({
	ttlx: 0, //抬头类型：0-一般纳税人 1-小规模纳税人
	fpxz: 0, // 发票性质：0-电子发票 1-纸质发票
	fplx: 0, //发票类型：0-普通发票 1-增值税专用发票
	sl: 0, //税率：0-1% 1-3%
	ttmc: enterpriseStore.entInfo.name, //抬头名称
	nsrsbh: enterpriseStore.entInfo.taxNo, //纳税人识别号
	qyyx: '', //企业邮箱
	bzxx: '' //备注信息
});
const queryRef = ref();
const countdown = ref(15);
const timer = ref();
const dialogVisible = ref(false);

// 汇款支付-付款信息-校验
const rules = reactive({
	ttmc: [{ required: true, message: '请输入', trigger: 'blur' }],
	nsrsbh: [{ required: true, message: '请输入', trigger: 'blur' }],
	qyyx: [
		{ required: true, message: '请输入', trigger: 'blur' },
		{ required: true, message: '格式错误', trigger: 'blur', pattern: regexMail }
	]
});

const changeBtn = (label, value, disabled) => {
	if (!disabled) {
		form.value[label] = value;
	}
};

const submit = () => {
	queryRef.value.validate(vaild => {
		if (vaild) {
			let params = {
				orderCode: props.infoData.orderCode,
				payEntType: ['ordinary', 'small'][form.value.ttlx],
				invoiceType: ['ordinary', 'add'][form.value.fplx],
				email: form.value.qyyx,
				invoiceMemo: form.value.bzxx,
				taxRate: [1, 3][form.value.sl]
			};
			// console.log(params);
			invoiceAdd(params).then(res => {
				// console.log(res);
				showMessageBox();
				emit('invoiceAddSuccess', res.data);
			});
		}
	});
};

// 倒计时
function showMessageBox() {
	dialogVisible.value = true;
	countdown.value = 15; // 重置倒计时
	startTimer();
}

function startTimer() {
	timer.value = setInterval(() => {
		if (countdown.value > 0) {
			countdown.value -= 1;
		} else {
			clearInterval(timer);
			dialogVisible.value = false; // 倒计时结束，关闭对话框
			model.value = false;
		}
	}, 1000);
}
function handleClose(done) {
	if (timer.value) {
		clearInterval(timer); // 清除定时器
	}
	nextTick(() => {
		done();
	});
}

const suceessClose = () => {
	dialogVisible.value = false;
	model.value = false;
};
</script>

<style lang="scss" scoped>
.btns {
	display: flex;
	align-items: center;
	font-family:
		Microsoft YaHei UI,
		Microsoft YaHei UI;
	font-weight: 400;
	font-size: 14px;
	color: #333333;
	text-align: center;
	font-style: normal;
	text-transform: none;
	.left {
		height: 32px;
		border-radius: 4px 0px 0px 4px;
		border: 1px solid #edf0f3;
		padding: 0 16px;
		cursor: pointer;
	}
	.right {
		height: 32px;
		border-radius: 0px 4px 4px 0px;
		border: 1px solid #edf0f3;
		padding: 0 16px;
		margin-left: -1px;
		cursor: pointer;
	}
	.left.active {
		background: rgba(55, 124, 253, 0.1);
		border-radius: 4px 0px 0px 4px;
		border: 1px solid #377cfd;
		z-index: 1;
		color: #377cfd;
	}

	.right.active {
		background: rgba(55, 124, 253, 0.1);
		border-radius: 0px 4px 4px 0px;
		border: 1px solid #377cfd;
		z-index: 1;
		color: #377cfd;
	}
	.left.disabled {
		background: #ffffff;
		border-radius: 4px 0px 0px 4px;
		border: 1px solid #edf0f3;
		color: #b6babf;
		cursor: not-allowed;
	}
	.right.disabled {
		background: #ffffff;
		border-radius: 0px 4px 4px 0px;
		border: 1px solid #edf0f3;
		color: #b6babf;
		cursor: not-allowed;
	}
}
.notice {
	font-family:
		Microsoft YaHei UI,
		Microsoft YaHei UI;
	font-weight: 400;
	font-size: 12px;
	color: #8a9099;
	line-height: 21px;
	margin-top: 8px;
}
.error-notice {
	width: 100%;
	padding: 8px 12px;
	background: #fffaeb;
	border-radius: 6px 6px 6px 6px;
	border: 1px solid #ffe28d;
	font-family:
		Microsoft YaHei UI,
		Microsoft YaHei UI;
	font-weight: 400;
	font-size: 12px;
	color: #333333;
	line-height: 18px;
	text-align: left;
	font-style: normal;
	text-transform: none;
}
.message-content {
	display: flex;
	.svg-icon {
		width: 60px;
		height: 60px;
		margin-right: 20px;
	}
	.message-box {
		flex: 1;
		font-family:
			Microsoft YaHei UI,
			Microsoft YaHei UI;
		.message-title {
			font-weight: 700;
			font-size: 22px;
			color: #333333;
			line-height: 22px;
		}
		.message-body {
			font-weight: 400;
			font-size: 14px;
			color: #333333;
			line-height: 24px;
			margin-top: 9px;
		}
	}
}
</style>
