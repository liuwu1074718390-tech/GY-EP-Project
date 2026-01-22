<template>
	<div class="gz-flow-result flex-center-all" v-loading="loading">
		<div class="suceess-warpper">
			<svg-icon style="width: 60px; height: 60px" icon-class="f4n" />
			<p class="f-24 f-700 mt-20">{{ isFolow ? suceessOption.title : suceessOption.noFlowTitle }}</p>
			<p class="color-info mt-10">{{ isFolow ? suceessOption.message : suceessOption.noFlowMessage }}</p>
			<div class="mt-20">
				<el-button @click="suceessOption.cancelCallback">{{ suceessOption.cancelBtn }}</el-button>
				<el-button v-if="isFolow" type="primary" @click="suceessOption.okCallback">{{ suceessOption.okBtn }}</el-button>
			</div>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref, getCurrentInstance, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { findSubmit } from '@/api/purchase/file';
const router = useRouter();
const route = useRoute();
const query = ref(route.query);
const { proxy } = getCurrentInstance();
const props = defineProps({
	businessId: {
		type: String,
		default: ''
	},
	businessType: {
		type: String,
		default: ''
		//'addProjectSet :新增项目集',
		// 'addProject :新增采购项目',
		// 'uploadProjectPurFile :上传采购文件',
		// 'publishProjectNotice :发布采购公告',
		// 'modifyProjectReviewMethod :修改评审办法',
		// 'publishCandidateAnnouncement :发布候选人公示',
		// 'publishWinnerNotice :发布中标结果公告',
		// 'publishWinnerPay :发布缴费通知书',
		// 'publishWinnerNote :发布成交通知书',
		// 'projectArchive :项目归档',
		// 'winnerChangeNotice :成交变更',
		// 'cancelBidNotice :发布废标公告',
		// 'publishClarifyNotice :发布澄清公告',
		// 'publishEvalResultPublicity :发布评标结果公示',
		// 'surveyTask :调研任务'
	},
	suceessOption: {
		type: Object,
		default: () => {}
	},
	isFolow: {
		// 是否需要流程审核
		type: Boolean,
		default: true
	}
});

const isFolow = ref(props.isFolow);
const loading = ref(false);
const close = data => {
	//proxy.$modal.msgSuccess('保存成功');
	router.go(-1);
};
const view = () => {
	router.push({ path: '/enterprise-todo/application' });
};
const suceessOption = computed(() => {
	return {
		title: '提交成功',
		message: '您的申请已提交，请耐心等待审核，可在【流程待办】中查看实时进度',
		okBtn: '去看看',
		okCallback: view,
		cancelBtn: '关闭窗口',
		cancelCallback: close,
		isFolow: props.isFolow,
		noFlowMessage: '当前流程操作无需审核，已自动保存并生效',
		noFlowTitle: '保存成功',
		...props.suceessOption
	};
});
const getFlowStatus = async () => {
	loading.value = true;
	findSubmit({ businessId: props.businessId, businessType: props.businessType })
		.then(res => {
			isFolow.value = res.data ? true : false;
		})
		.finally(() => {
			loading.value = false;
		});
};

onMounted(() => {
	getFlowStatus();
});
</script>
<style lang="scss" scoped>
.gz-flow-result {
	height: 100%;
	width: 100%;
	background-color: #ffffff;
}
.suceess-warpper {
	height: 80%;
	min-height: 300px;
	padding-top: 30px;
	text-align: center;
	.el-button {
		min-width: 90px;
	}
}
</style>
