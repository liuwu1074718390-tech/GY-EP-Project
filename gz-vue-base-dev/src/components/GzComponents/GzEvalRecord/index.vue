<template>
	<div class="gz-select-enterprise-table" v-loading="loading">
		<el-dialog v-model="show" :title="title" width="87.5%" :show-close="false" append-to-body destroy-on-close>
			<div class="title_class">
				专家姓名： {{ expertData.expertName }} ，共参与 {{ expertData.reviewNum }} 次评审，当前待评审任务
				{{ expertData.waitReviewNum }} 个
			</div>

			<div v-if="!hasData" class="empty-datas flex-center-all">
				<div class="text-c">
					<svg-icon class="icon-class" icon-class="qs-02" />
					<p>该专家目前未参与过任何评审且没有待评审任务</p>
				</div>
			</div>
			<div v-else>
				<SearchQuery ref="searchRef" @handleQuery="handleQuery" />
				<div class="gz-table-detail mb-40">
					<el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
						<el-table-column label="序号" type="index" align="center" width="60" />
						<el-table-column prop="projectName" label="项目名称" />
						<el-table-column prop="projectCode" label="项目编号" />
						<el-table-column prop="sectionName" label="标段名称" />
						<el-table-column prop="sectionCode" label="标段编号" />
						<el-table-column prop="startTime" label="启动时间" />
						<el-table-column prop="endTime" label="结束时间" />
						<el-table-column label="评审状态">
							<template #default="scope">
								<div class="status-wrapper" :class="scope.row.reviewStatus">
									{{ scope.row.reviewStatusLabel }}
								</div>
							</template>
						</el-table-column>
					</el-table>
					<gz-pagination
						v-show="page.total > 0"
						:total="page.total"
						v-model:page="page.pageNum"
						v-model:limit="page.pageSize"
						@pagination="getList"
					/>
				</div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="show = false">关 闭</el-button>
					<!-- <el-button type="primary" @click="ok(item, index)">确 定</el-button> -->
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
import { nextTick, onMounted, ref, watch, getCurrentInstance } from 'vue';
import SearchQuery from './SearchQuery.vue';
import { reviewRecord } from '@/api/expert/expert.js';
const show = ref(false);
const multipleTableRef = ref(null);
const { proxy } = getCurrentInstance();
const dataTableRef = ref(null);
const model = ref({});
const hasData = ref(false);
const expertData = ref({});
const props = defineProps({
	title: {
		type: String,
		default: '专家评审记录'
	},
	idKey: {
		//
		type: String,
		default: 'id'
	},
	nameKey: {
		type: String,
		default: 'name'
	}
});
onMounted(() => {
	page.value.pageNum = 1;
});
let loading = ref(false);

// 查询全量数据
const tableData = ref([]);
const page = ref({
	expertId: undefined,
	total: 0,
	pageNum: 1,
	pageSize: 10
});
let params = {};
const queryData = ref();
const handleQuery = data => {
	page.value.pageNum = 1;
	queryData.value = data;
	// console.log(data);
	params = { ...data, ...page.value };
	getList();
};
const getList = () => {
	params = { ...queryData.value, ...page.value };
	loading.value = true;
	reviewRecord(params)
		.then(res => {
			page.value.total = res.data.pageData.total;
			tableData.value = res.data.pageData.records;
			expertData.value = res.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

const initList = () => {
	params = { ...queryData.value, ...page.value };
	loading.value = true;
	reviewRecord(params)
		.then(res => {
			page.value.total = res.data.pageData.total;
			tableData.value = res.data.pageData.records;
			expertData.value = res.data;
			hasData.value = tableData.value.length > 0;
		})
		.finally(() => {
			loading.value = false;
		});
};

const open = item => {
	page.value.expertId = item.id;
	show.value = true;
	queryData.value = {};
	initList();
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
.flex-space-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.gz-select-enterprise-table {
	width: 100%;
	:deep(.el-input.is-disabled) {
		cursor: default;
		.el-input__inner {
			cursor: default;
		}
	}
}
.status-wrapper {
	height: 22px;
	line-height: 20px;
	border-radius: 4px;
	font-size: 14px;
	padding: 0 10px;
	display: inline-block;

	&.finish {
		background: #f0f9eb;
		border: 1px solid #e1f3d8;
		color: #67c23a;
	}

	&.cancel {
		background: #fef0f0;
		border: 1px solid #fde2e2;
		color: #f56c6c;
	}
}
.empty-datas {
	height: calc(50vh);
	.icon-class {
		height: calc(6.2vw);
		width: calc(6.2vw);
	}
}
</style>
