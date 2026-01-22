<template>
	<div class="p-20 layout-card-container hw100 pos-r">
		<div class="title flex-space-between">
			<h2 class="f-21 f-700">{{ Props.title }}</h2>
			<p class="f-16 flex-center-horizontal mr-30 read-btn">
				<svg-icon icon-class="read-all" />
				<span class="f-12 ml-5" @click="readAll">全部已读</span>
			</p>
		</div>
		<div class="gz-table-detail">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="date" label="通知详情">
					<template #default="scoped">
						<div class="flex-start-horizontal mt-10 mb-10">
							<span v-if="scoped.row.hasRead * 1 != 1" class="tag mr-5">未读</span>
							<p class="f-14 tx-of" style="padding-top: 2px">{{ scoped.row.noticeTitle }}</p>
						</div>
						<p class="color-info f-12 mb-10 tx-of">{{ scoped.row.noticeContent }}</p>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" width="180" label="发布时间" />
				<el-table-column label="操作" width="100">
					<template #default="scoped"> <span class="cur-p color-pr" @click="tolink(scoped.row)">查看详情</span> </template>
				</el-table-column>
			</el-table>
			<gz-pagination
				v-show="total > 0"
				:total="total"
				v-model:page="queryParams.pageNum"
				v-model:limit="queryParams.pageSize"
				@pagination="getList"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { noticePage } from '@/api/message';
import useMessageStore from '@/store/modules/message';
import { detailLinkMap } from './todetail';
const messageStore = useMessageStore();
const router = useRouter();

const Props = defineProps({
	title: {
		type: String,
		default: '',
		require: true
	},
	userType: {
		type: Number,
		default: null,
		require: true
	},
	noticeType: {
		type: Number,
		default: null,
		require: true
	}
});

const tableData = ref([
	// {
	// 	noticeId: 0,
	// 	noticeTitle: '已经对接，现在是没有数据的',
	// 	noticeType: '',
	// 	noticeContent: '',
	// 	status: '',
	// 	receiveUser: '',
	// 	receiveGroup: '',
	// 	hasRead: 0,
	// 	createBy: '',
	// 	createTime: '2024-7-29 19:00:22',
	// 	updateBy: '11',
	// 	updateTime: '2024-7',
	// 	remark: '没有备注。。。。。'
	// }
]);
const tolink = item => {
	// window.open(Props.path, '_blank');
	// router.push({ path: '/message/detail' });
	// router.push({ path: '/enterprise-message/process/detail' });
	detailLinkMap['type_' + item.jumpType] &&
		detailLinkMap['type_' + item.jumpType](item, async () => {
			await messageStore.clearUnRead([item.noticeId]);
			getList();
			messageStore.getMsgCount({ userType: Props.userType, noticeType: Props.noticeType });
		});
};

const data = reactive({
	queryParams: {
		pageNum: 1,
		pageSize: 10,
		userType: Props.userType,
		noticeType: Props.noticeType
	}
});

const { queryParams } = toRefs(data);

const total = ref(0);
const getList = () => {
	noticePage(queryParams.value).then(res => {
		// console.log(res);
		total.value = res.data.total;
		tableData.value = res.data.records;
	});
};
getList();
messageStore.getMsgCount({ userType: Props.userType, noticeType: Props.noticeType });

const readAll = async () => {
	let ids = tableData.value.filter(e => !(e.hasRead * 1)).map(e => e.noticeId);
	if (!ids.length) return;
	await messageStore.clearUnRead(ids);
	getList();
	messageStore.getMsgCount({ userType: Props.userType, noticeType: Props.noticeType });
};
</script>

<style scoped lang="scss">
.read-btn {
	height: 32px;
	background: #ffffff;
	border: 1px solid #e9ecf0;
	padding: 0 15px;
	border-radius: 6px;
	cursor: pointer;
}
.gz-table-detail {
	position: absolute;
	top: 80px;
	bottom: 20px;
	left: 20px;
	right: 20px;
	overflow: auto;
}
</style>
