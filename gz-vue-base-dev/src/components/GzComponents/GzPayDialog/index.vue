<template>
	<el-dialog
		v-model="model"
		:title="title"
		width="1260px"
		:show-close="false"
		class="gz-dialog-form"
		append-to-body
		destroy-on-close
		@close="closeDialog"
	>
		<div class="content" v-loading="loading">
			<div class="left">
				<div class="pay-message card">
					<div class="title">付款信息</div>
					<div class="line-a">付款方：{{ payMes.payName || '-' }}</div>
					<div class="line-a">收款方：{{ payMes.collectionName || '-' }}</div>
					<div class="line-a">
						<div class="flex-between" style="margin-bottom: 18px">
							<div>{{ (title + '').replace(/^支付/, '') }}</div>
							<div>￥{{ formatAmountManual(payMes.orderMoney) }}</div>
						</div>

						<div class="line-b">· {{ payMes.projectName }}-{{ payMes.projectCode }}</div>
						<div class="line-b">· 关联标段（包组）：{{ payMes.sectionName }}-{{ payMes.sectionCode }}</div>
					</div>
					<div class="line-total flex-between">
						<span>总计</span>
						<div class="amount">￥{{ formatAmountManual(payMes.orderMoney) }}</div>
					</div>
				</div>
				<div class="pay-way card">
					<div class="title">付款方式</div>
					<div class="body">
						<div v-if="scanPay" class="btn flex-center" :class="!payWay ? 'active' : ''" @click="payWay = 0">
							<svg-icon icon-class="bid-ptfwf-sm-active-pay" />
							<p>扫码支付</p>
							<span>仅微信、支付宝付款可用</span>
							<svg-icon class="check-active" v-if="!payWay" icon-class="check-pay-way" />
						</div>
						<div v-if="transferPay" class="btn flex-center" :class="payWay ? 'active' : ''" @click="payWay = 1">
							<svg-icon icon-class="bid-ptfwf-hk-pay" />
							<p>汇款支付</p>
							<span>汇款后需上传汇救凭证</span>
							<svg-icon class="check-active" v-if="payWay" icon-class="check-pay-way" />
						</div>
					</div>
				</div>
				<div class="solve card">
					<div class="title">使用遇到问题？</div>
					<div class="question">缴费成功了，为什么查询不到记录？</div>
					<div class="answer">
						答：平台缴费是实时到账的，可到<span class="btn">项目操作台</span
						>中查询缴费记录，若未查到记录可能是系统延时引起的，您可稍后查看。若超过一天仍未显示，请与平台客服联系。
					</div>
				</div>
			</div>
			<div class="right">
				<!-- 扫码支付-start -->
				<div class="sm-pay" v-if="!payWay">
					<div class="flex-between">
						<div class="title">请使用手机扫码支付</div>
						<div class="refresh">
							刷新二维码(<span class="time">{{ countdownText }}</span
							>)
						</div>
					</div>
					<div class="QR-code">
						<img :src="payMes.payImg" />
					</div>
					<div class="notice">使用微信或支付宝扫码支付后，点击“已完成支付”</div>
					<div class="error-notice">支付后未自动跳转点这里</div>
					<el-button type="primary" style="width: 100%" @click="finishPay(0)">已完成支付</el-button>
				</div>
				<!-- 扫码支付-end -->

				<!-- 汇款支付-start -->
				<div class="hk-pay" v-else>
					<div class="title">请确认收款方信息</div>
					<div class="notice flex-center">
						<div class="mes">
							您需汇款<span class="money">5,400.68</span>元至以下账户，汇款成功后请提交付款信息，审核通过后完成支付
						</div>
					</div>
					<div class="skf-message">
						<div class="skf-line">
							<div class="name">收款方户名</div>
							<div class="value">广东广咨国际信息科技有限公司</div>
						</div>
						<div class="skf-line">
							<div class="name">收款方开户行</div>
							<div class="value">平安银行股份有限公司广州XX支行</div>
						</div>
						<div class="skf-line">
							<div class="name">收款方账户</div>
							<div class="value">
								3515 0198 8701 0000 2552
								<div class="copy">复制</div>
							</div>
						</div>
					</div>
					<div class="title">请确认您的付款信息</div>
					<el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="auto">
						<el-form-item label="付款户名" prop="name">
							<el-input v-model="form.name" style="width: 100%" placeholder="请输入付款户名"></el-input>
						</el-form-item>
						<el-form-item label="付款账户" prop="zh">
							<el-input v-model="form.zh" style="width: 100%" placeholder="请输入付款账号"></el-input>
						</el-form-item>
						<el-form-item label="付款日期" prop="data">
							<el-date-picker
								v-model="form.data"
								value-format="YYYY-MM-DD"
								placeholder="请选择付款日期"
								style="width: 100%"
							></el-date-picker>
						</el-form-item>
						<el-form-item label="流水号" prop="lsh">
							<el-input v-model="form.lsh" style="width: 100%" placeholder="请输入转账流水号"></el-input>
						</el-form-item>
					</el-form>
					<el-button type="primary" style="width: 100%" @click="finishPay(1)">已汇款，提交付款信息</el-button>
				</div>
				<!-- 汇款支付-end -->
			</div>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="model = false">关 闭</el-button>
			</span>
		</template>

		<!-- 查询loadingDailog -->
		<el-dialog
			v-model="payLoading"
			width="589px"
			:show-close="false"
			class="gz-dialog-form"
			append-to-body
			destroy-on-close
			style="height: 200px; margin-top: 42.4vh !important"
		>
			<div v-loading="payLoading" style="width: 100%; height: 80px"></div>
			<div class="loading-notice">正在查询您的付款信息，请稍等片刻</div>
		</el-dialog>
	</el-dialog>
</template>
<script setup>
import { ref, onMounted, inject, getCurrentInstance, computed, watch } from 'vue';
import { payServiceFee } from '@/api/bid/project';
import { qrcodeGet } from '@/api/bid/platform-service-fee';
import { ElMessageBox, ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { formatAmountManual } from '@/utils/amount';
import { useRafInterval } from '@/hooks/useRafInterval';

const model = defineModel({
	type: Boolean,
	default: true
});

const props = defineProps({
	title: {
		type: String,
		default: '支付成交服务费'
	},
	// 扫码汇款
	scanPay: {
		type: Boolean,
		default: true
	},
	// 汇款支付
	transferPay: {
		type: Boolean,
		default: true
	},
	// 支付费用，判断不同的调不同接口
	type: {
		type: String,
		default: ''
	},
	// 接口参数
	apiParams: {
		type: Object,
		default: () => {
			return {
				sectionId: '',
				supplyEntId: ''
			};
		}
	},

	successAction: {
		type: Object,
		default: () => {
			return {
				title: '',
				message: '',
				okBtn: '',
				callback: null
			};
		}
	}
});

const emit = defineEmits(['paySuccess', 'payFail']);

console.log(props.successAction, props.apiParams);
const successAction = computed(() => ({
	title: '付款成功',
	message: '您已成功缴费',
	okBtn: '确定',
	callback: null,
	...props.successAction
}));

// 付款方式
const payWay = ref(0);
const formRef = ref();

// 手动查询弹窗loading
const payLoading = ref(false);

// 支付弹窗loading
const loading = ref(false);

// 倒计时
const countdown = ref(60);
// let timer = null;
// 倒计时文本
const countdownText = computed(() => {
	return `${countdown.value}s`;
});

const payMes = ref({
	// 付款方
	payName: '',
	// 收款方
	collectionName: '',
	// 金额
	orderMoney: 0,
	// 项目名称
	projectName: '',
	// 项目编号
	projectCode: '',
	// 标段名称
	sectionName: '',
	// 标段编号
	sectionCode: '',
	// 付款码
	payImg: '',
	// 支付状态：wait-待支付； doing-正在支付：success-已支付；drop-已作废；refund-已退款
	payStatus: 'wait'
});

// 汇款支付-付款信息
const form = ref({
	name: '',
	zh: '',
	data: '',
	lsh: ''
});

// 汇款支付-付款信息-校验
const rules = reactive({
	name: [{ required: true, message: '请输入', trigger: 'blur' }],
	zh: [{ required: true, message: '请输入', trigger: 'blur' }],
	data: [{ required: true, message: '请输入', trigger: 'blur' }],
	lsh: [{ required: true, message: '请输入', trigger: 'blur' }]
});

onMounted(() => {
	loading.value = true;
	start();
	getPayMes(props.type, 'auto');
});

// 开始倒计时
const startCountdown = () => {
	if (countdown.value <= 0) {
		countdown.value = 60;
		// 自动更新
		getPayMes(props.type, 'auto');
		return;
	} else if (countdown.value % 13 === 0) {
		getPayMes(props.type, 'auto', { isToPay: 0 });
	}
	countdown.value--;
};
const { start, stop, restart } = useRafInterval(1000, startCountdown);

const closeDialog = () => {
	stop();
	model.value = false;
};

const getPayMes = (type, way, cparam = {}) => {
	if (hasPaySuccess.value) return;
	if (type === 'biddingServiceFee') {
		getBiddingServiceFee(way, cparam);
	} else if (type === 'platformServiceFee') {
		getPlatformServiceFee(way, cparam);
	}
};

// 获取投标服务费信息
const getBiddingServiceFee = (way, cparam) => {
	payServiceFee({ ...props.apiParams, ...cparam })
		.then(response => {
			payMes.value.payName = response.data.payEntName;
			payMes.value.collectionName = response.data.receiveEntName;
			payMes.value.orderMoney = response.data.orderMoney.toLocaleString();
			payMes.value.projectName = response.data.projectName;
			payMes.value.projectCode = response.data.projectCode;
			payMes.value.sectionName = response.data.sectionName;
			payMes.value.sectionCode = response.data.sectionCode;
			payMes.value.payImg = response.data.qrcodeImg || payMes.value.payImg;
			// 状态：wait-待支付； doing-正在支付：success-已支付；drop-已作废；refund-已退款
			payMes.value.payStatus = response.data.payStatus;

			if (payMes.value.payStatus === 'success') {
				successPay(response.data);
			} else if (payMes.value.payStatus !== 'success') {
				if (way !== 'auto') {
					failPay();
				}
			}
		})
		.finally(() => {
			loading.value = false;
			payLoading.value = false;
		});
};

const getPlatformServiceFee = (way, cparam) => {
	qrcodeGet({ ...props.apiParams, ...cparam })
		.then(response => {
			payMes.value.payName = response.data.payEntName;
			payMes.value.collectionName = response.data.receiveEntName;
			payMes.value.orderMoney = response.data.orderMoney.toLocaleString();
			payMes.value.projectName = response.data.projectName;
			payMes.value.projectCode = response.data.projectCode;
			payMes.value.sectionName = response.data.sectionName;
			payMes.value.sectionCode = response.data.sectionCode;
			payMes.value.payImg = response.data.qrcodeImg || payMes.value.payImg;
			// 状态：wait-待支付； doing-正在支付：success-已支付；drop-已作废；refund-已退款
			payMes.value.payStatus = response.data.payStatus;

			if (payMes.value.payStatus === 'success') {
				closeDialog();
				successPay(response.data);
			} else if (payMes.value.payStatus !== 'success') {
				if (way !== 'auto') {
					failPay();
				}
			}
		})
		.finally(() => {
			loading.value = false;
			payLoading.value = false;
		});
};

// 手动点击查询
const finishPay = type => {
	if (type) {
		formRef.value.validate(valid => {
			if (valid) {
				payLoading.value = true;
			}
		});
	} else {
		payLoading.value = true;
		// 手动更新
		getPayMes(props.type, 'manual');
	}
};

const hasPaySuccess = ref(false);

// emit('paySuccess', { ...{}, btnStatus: 'ok' });
// 汇款成功
const successPay = data => {
	// console.log(props.successAction);
	hasPaySuccess.value = true;
	emit('paySuccess', { ...data, btnStatus: 'ok' });
	ElMessageBox.confirm(successAction.value.message, successAction.value.title, {
		// confirmButtonText: props.successAction.okBtn,
		showConfirmButton: false,
		cancelButtonText: '关闭',
		type: 'success'
	})
		.then(() => {
			// typeof props.successAction.callback === 'function' && props.successAction.callback();
			emit('paySuccess', { ...data, btnStatus: 'ok' });
			closeDialog();
		})
		.catch(() => {
			// typeof props.successAction.callback === 'function' && props.successAction.callback();
			// emit('paySuccess', { ...data, btnStatus: 'cancel' });
			closeDialog();
		});
};

// 汇款失败
const failPay = () => {
	ElMessageBox.confirm('暂未查询到您的付款记录，请检查支付信息或点击下方按钮重新查询', '付款失败', {
		cancelButtonText: '关闭',
		confirmButtonText: '重新查询',
		type: 'error'
	})
		.then(() => {
			payLoading.value = true;
			getPayMes(props.type, 'manual');
		})
		.catch(() => {});
};
</script>
<style lang="scss" scoped>
.content {
	display: flex;
	.flex-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.flex-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.left {
		flex: 1;
		.card {
			background: #ffffff;
			border-radius: 12px 12px 12px 12px;
			border: 1px solid #eaf0fd;
			padding: 18px;
			margin-bottom: 18px;
			.title {
				font-weight: 700;
				font-size: 17px;
				color: #333333;
				display: flex;
				align-items: center;
				padding-bottom: 16px;
			}
		}
		.pay-message {
			.title {
				padding-bottom: 18px;
				border-bottom: 1px solid #eaf0fd;
			}
			.line-a {
				font-family:
					Microsoft YaHei UI,
					Microsoft YaHei UI;
				font-weight: 400;
				font-size: 16px;
				color: #333333;
				line-height: 24px;
				text-align: left;
				font-style: normal;
				text-transform: none;
				padding: 12px 0;
				border-bottom: 1px solid #eaf0fd;
			}
			.line-b {
				font-family:
					Microsoft YaHei UI,
					Microsoft YaHei UI;
				font-weight: 400;
				font-size: 14px;
				color: #333333;
				line-height: 24px;
				text-align: left;
				font-style: normal;
				text-transform: none;
				margin-bottom: 10px;
			}
			.line-total {
				font-family:
					Microsoft YaHei UI,
					Microsoft YaHei UI;
				font-weight: 400;
				font-size: 16px;
				color: #333333;
				line-height: 24px;
				margin-top: 18px;
				.amount {
					font-family:
						DIN Black,
						DIN Black;
					font-weight: 900;
					font-size: 28px;
					color: #377cfd;
					line-height: 32px;
				}
			}
		}
		.pay-way {
			.body {
				display: flex;
				align-items: center;
				.btn {
					width: 316px;
					height: 36px;
					border-radius: 10px;
					border: 1px solid #d6dfe7;
					font-family:
						Microsoft YaHei UI,
						Microsoft YaHei UI;
					margin-right: 12px;
					position: relative;
					cursor: pointer;
					.svg-icon {
						width: 18px;
						height: 18px;
						margin-right: 6px;
					}
					.check-active {
						position: absolute;
						bottom: 0;
						right: 0;
						width: 28px;
						height: 28px;
						margin-right: 0;
					}
					p {
						font-weight: 700;
						font-size: 14px;
						color: #333333;
						line-height: 24px;
						text-align: left;
						font-style: normal;
						text-transform: none;
						margin-right: 8px;
					}
					span {
						font-weight: 400;
						font-size: 12px;
						color: #8a9099;
						line-height: 24px;
						text-align: left;
						font-style: normal;
						text-transform: none;
					}
				}
				.active {
					background: rgba(55, 124, 253, 0.1);
					border: 1px solid #377cfd;
					position: relative;
					&::before {
						content: '推荐';
						position: absolute;
						top: -1px;
						left: -1px;

						width: 33px;
						height: 20px;
						background: #377cfd;
						border-radius: 8px 0px 8px 0px;
						font-family:
							Microsoft YaHei UI,
							Microsoft YaHei UI;
						font-weight: 400;
						font-size: 12px;
						color: #ebf1fe;
						line-height: 20px;
						text-align: center;
						font-style: normal;
						text-transform: none;
					}
					// 	&::after {
					// 		content: '';
					// 		position: absolute;
					// 		bottom: -1px;
					// 		right: -1px;
					// 		border-radius: 0px 0px 8px 0px;

					// 		width: 0;
					// 		height: 0;
					// 		border-left: 28px solid transparent;
					// 		border-bottom: 28px solid #377cfd;
					// 	}
				}
			}
		}
		.solve {
			.question,
			.answer {
				font-family:
					Microsoft YaHei UI,
					Microsoft YaHei UI;
				font-weight: 400;
				font-size: 12px;
				color: #333333;
				line-height: 24px;
				text-align: left;
				font-style: normal;
				text-transform: none;
				.btn {
					color: #006aff;
					cursor: pointer;
				}
			}
		}
	}
	.right {
		width: 374px;
		background: #ffffff;
		border-radius: 12px 12px 12px 12px;
		border: 1px solid #eaf0fd;
		margin-left: 31px;
		padding: 18px;
		.title {
			font-family:
				Microsoft YaHei UI,
				Microsoft YaHei UI;
			font-weight: 700;
			font-size: 17px;
			color: #333333;
			line-height: 21px;
			text-align: left;
			font-style: normal;
			text-transform: none;
			margin-bottom: 18px;
		}
		.sm-pay {
			.refresh {
				font-family:
					Microsoft YaHei UI,
					Microsoft YaHei UI;
				font-weight: 400;
				font-size: 12px;
				color: #333333;
				line-height: 20px;
				text-align: left;
				font-style: normal;
				text-transform: none;
				.time {
					color: #377cfd;
				}
			}
			.QR-code {
				width: 100%;
				height: 280px;
				margin-top: 6px;
				margin-bottom: 7px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.notice {
				font-family:
					Microsoft YaHei UI,
					Microsoft YaHei UI;
				font-weight: 400;
				font-size: 12px;
				color: #333333;
				line-height: 20px;
				text-align: center;
				font-style: normal;
				text-transform: none;
			}
			.error-notice {
				width: 100%;
				height: 34px;
				background: #fffaeb;
				border-radius: 6px 6px 6px 6px;
				border: 1px solid #ffe28d;
				font-family:
					Microsoft YaHei UI,
					Microsoft YaHei UI;
				font-weight: 400;
				font-size: 14px;
				color: #333333;
				line-height: 34px;
				text-align: center;
				font-style: normal;
				text-transform: none;
				margin-top: 13px;
				margin-bottom: 17px;
			}
		}
		.hk-pay {
			.notice {
				width: 100%;
				background: #fffaeb;
				border-radius: 6px 6px 6px 6px;
				border: 1px solid #ffe28d;
				padding: 10px 12px;
				.mes {
					font-family:
						Microsoft YaHei UI,
						Microsoft YaHei UI;
					font-weight: 400;
					font-size: 14px;
					color: #333333;
					line-height: 20px;
					.money {
						color: #377cfd;
						font-weight: 700;
					}
				}
			}
			.skf-message {
				margin-top: 12px;
				width: 100%;
				margin-bottom: 35px;
				.skf-line {
					width: 100%;
					border-bottom: 1px solid #eaf0fd;
					display: flex;
					font-family:
						Microsoft YaHei UI,
						Microsoft YaHei UI;
					font-weight: 400;
					font-size: 14px;
					color: #333333;
					line-height: 24px;
					text-align: left;
					font-style: normal;
					text-transform: none;
					padding: 12px 0;
					.name {
						width: 84px;
						text-align: right;
						font-size: 14px;
						color: #8a9099;
						line-height: 24px;
						margin-right: 14px;
					}
					.value {
						flex: 1;
						.copy {
							width: 40px;
							height: 20px;
							border-radius: 2px 2px 2px 2px;
							border: 1px solid #006aff;
							font-family: PingFangSC-Regular, PingFangSC-Regular;
							font-weight: 400;
							font-size: 12px;
							color: #006aff;
							line-height: 20px;
							text-align: center;
							font-style: normal;
							text-transform: none;
							float: right;
							cursor: pointer;
						}
					}
				}
			}
		}
	}
}
</style>
<style lang="scss">
.loading-notice {
	font-family:
		Microsoft YaHei UI,
		Microsoft YaHei UI;
	font-weight: 400;
	font-size: 16px;
	color: #8a9099;
	line-height: 20px;
	text-align: center;
	font-style: normal;
	text-transform: none;
}
</style>
