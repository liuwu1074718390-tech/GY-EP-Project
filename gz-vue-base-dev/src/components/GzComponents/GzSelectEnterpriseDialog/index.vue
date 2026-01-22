<template>
	<div class="gz-select-enterprise-table" v-loading="loading">
		<el-dialog
			class="gz-dialog-form"
			v-model="show"
			:title="title"
			width="1260px"
			:show-close="false"
			append-to-body
			destroy-on-close
		>
			<SearchQuery @handleQuery="handleQuery" />
			<div class="gz-table-detail mb-40">
				<div class="plain-text">
					当前共选中 <span style="color: #377cfd"> {{ multipleSelection.length }}</span> 家企业
				</div>
				<el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column label="序号" type="index" align="center" width="60" />
					<el-table-column prop="name" label="企业名称" />
					<el-table-column prop="code" label="企业代码" />
					<el-table-column prop="legalPerson" label="联系人" />
					<el-table-column prop="contactPhone" label="联系方式" />
				</el-table>
				<gz-pagination
					v-show="page.total > 0"
					:total="page.total"
					v-model:page="page.pageNum"
					v-model:limit="page.pageSize"
					@pagination="getList"
				/>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="show = false">关 闭</el-button>
					<el-button type="primary" @click="ok(item, index)">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import SearchQuery from './SearchQuery.vue';
import { getEntPage } from '@/api/enterprise/info';
const show = ref(false);
const multipleTableRef = ref(null);
const dataTableRef = ref(null);
const model = ref({});
const props = defineProps({
	selected: {
		type: Array,
		default: () => {
			return [];
		}
	},
	title: {
		type: String,
		default: '选择企业'
	},
	multiple: {
		type: Boolean,
		default: true
	},
	identity: {
		type: String,
		default: undefined
	},
	idKey: {
		//
		type: String,
		default: 'id'
	},
	nameKey: {
		type: String,
		default: 'name'
	},
	type: {
		type: String
	}
});
onMounted(() => {
	page.value.pageNum = 1;
	finalSelection.value = [];
	multipleSelection.value = [];
});
// console.log(props.selected);
model.value = props.selected;
const emit = defineEmits(['change']);
let loading = ref(false);
// 回显表格数据
const finalSelection = ref([]);
// 提交操作
const ok = () => {
	finalSelection.value = JSON.parse(JSON.stringify(multipleSelection.value));
	show.value = false;
	let ids = [],
		names = [];
	multipleSelection?.value.forEach(e => {
		ids.push(e[props.idKey]);
		names.push(e[props.nameKey]);
	});
	model.value = ids;
	console.log(model.value);
	emit('change', model.value, multipleSelection.value);
};
// table 删除
const handleDelete = row => {
	finalSelection.value = finalSelection.value.filter(item => item.id !== row.id);
	//刷新选择框-已选择数据
	if (finalSelection.value) {
		multipleSelection.value = JSON.parse(JSON.stringify(finalSelection.value));
	}
	show.value = false;
	let ids = [],
		names = [];
	finalSelection?.value.forEach(e => {
		ids.push(e[props.idKey]);
		names.push(e[props.nameKey]);
	});
	model.value = ids;
	console.log(model.value);
	emit('change', model.value);
};
// 查询全量数据
const tableData = ref([]);
const page = ref({
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
	// console.log(props.type)
	params = { ...queryData.value, ...page.value, identity: props.identity };
	if (props.type == 1) {
		params.getSupplyPage = 1;
	}
	if (props.type == 2) {
		params.getSupplyPage = 2;
	}
	loading.value = true;
	getEntPage(params)
		.then(res => {
			// console.log(res);
			// 查询、翻页先保存已经选取的数据
			const arr = JSON.parse(JSON.stringify(multipleSelection.value));
			page.value.total = res.data.total;
			tableData.value = res.data.records;
			// 重选数据
			nextTick(() => {
				tableData.value.forEach(row => {
					multipleSelection.value = arr;
					// 重新赋值ids
					if (multipleSelection.value !== undefined && multipleSelection.value.filter(item => item.id === row.id).length > 0) {
						// 选取数据
						multipleTableRef.value.toggleRowSelection(row, true);
					}
				});
			});
		})
		.finally(() => {
			loading.value = false;
		});
};

// 选择操作
const multipleSelection = ref([]);
const handleSelectionChange = val => {
	// 当前页数据id
	let pageIdList = [];
	tableData.value.forEach(item => {
		pageIdList.push(item);
	});

	// 清除当前页
	if (multipleSelection.value !== undefined) {
		multipleSelection.value = multipleSelection.value.filter(item => {
			return !pageIdList.filter(row => item.id === row.id).length > 0;
		});
	}
	// 翻页累计
	val.map(item => {
		multipleSelection.value.push(item);
	});

	// 去重
	multipleSelection.value = Array.from(new Set(multipleSelection.value));
};

const open = () => {
	page.value.pageNum = 1;
	finalSelection.value = [];
	multipleSelection.value = [];
	show.value = true;
	getList();
};

const clear = () => {
	finalSelection.value = [];
	multipleSelection.value = [];
};
defineExpose({ open, clear });
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

.plain-text {
	font-family:
		Microsoft YaHei UI,
		Microsoft YaHei UI;
	font-weight: 400;
	font-size: 14px;
	color: #8a9099;
	line-height: 24px;
	text-align: left;
	font-style: normal;
	text-transform: none;
	margin-bottom: 18px;
}
</style>
