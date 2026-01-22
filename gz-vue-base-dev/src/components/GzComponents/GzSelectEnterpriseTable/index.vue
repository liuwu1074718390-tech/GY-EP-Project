<template>
	<div class="gz-select-enterprise-table" v-loading="loading">
		<div class="gz-table-detail mb-20" v-if="finalSelection && finalSelection.length > 0">
			<el-table ref="dataTableRef" :data="finalSelection" style="width: 100%">
				<el-table-column label="序号" type="index" align="center" width="60" />
				<el-table-column prop="name" label="企业名称" />
				<el-table-column prop="code" label="企业代码" />
				<el-table-column prop="contactName" label="联系人" />
				<el-table-column prop="contactPhone" label="联系方式" />
				<el-table-column label="操作" fixed="right" width="160">
					<template #default="scope">
						<span class="status-btn cur-p color-pr" @click="handleDelete(scope.row)">删除</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="flex-space-between">
			<el-button
				plain
				@click="
					show = true;
					getList();
				"
			>
				<el-icon><Plus /></el-icon> &nbsp;{{ props.title }}</el-button
			>
		</div>
		<el-dialog
			class="gz-dialog-form"
			v-model="show"
			:title="title"
			width="1260px"
			:show-close="false"
			append-to-body
			destroy-on-close
		>
			<div class="title_class">
				当前共选中 {{ multipleSelectionMy.length + multipleSelectionOther.length }} 家企业，我的供应商：已选中
				{{ multipleSelectionMy.length }} 家，平台其他供应商：已选中 {{ multipleSelectionOther.length }} 家
			</div>
			<el-tabs v-model="activeName" class="hw100 p-20" @tab-click="handleClick">
				<el-tab-pane label="我的供应商库" name="my">
					<SearchQuery v-if="activeName === 'my'" @handleQuery="handleQuery" />
					<div class="gz-table-detail mb-40">
						<el-table ref="multipleTableRefMy" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55" />
							<el-table-column label="序号" type="index" align="center" width="60" />
							<el-table-column prop="supplyName" min-width="180px" :show-overflow-tooltip="true" label="企业名称" />
							<el-table-column prop="industryName" min-width="110px" :show-overflow-tooltip="true" label="所属行业" />
							<el-table-column prop="regAreaName" min-width="160px" :show-overflow-tooltip="true" label="注册地" />
							<el-table-column prop="contactPhone" min-width="190px" :show-overflow-tooltip="true" label="联系电话">
								<template #default="scope">
									<span v-if="scope.row.contactPhone">{{ scope.row.contactPhone }}</span>
									<span v-if="scope.row.contactPhone && scope.row.contactTel">、</span>
									<span v-if="scope.row.contactTel">{{ scope.row.contactTel }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="registerCount" min-width="180px" label="登记我的项目(次)" />
							<el-table-column prop="bidCount" min-width="90px" label="中标(次)" />
							<el-table-column prop="supplySourceLabel" min-width="100px" label="供应商来源" />
						</el-table>
						<gz-pagination
							v-show="page.total > 0"
							:total="page.total"
							v-model:page="page.pageNum"
							v-model:limit="page.pageSize"
							@pagination="getList"
						/>
					</div>
				</el-tab-pane>
				<el-tab-pane label="平台其他供应商" name="other">
					<SearchQuery v-if="activeName === 'other'" @handleQuery="handleQuery" type="other" />
					<div class="gz-table-detail mb-40">
						<el-table ref="multipleTableRefOther" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55" />
							<el-table-column label="序号" type="index" align="center" width="60" />
							<el-table-column prop="name" min-width="180px" :show-overflow-tooltip="true" label="企业名称" />
							<el-table-column prop="industryName" min-width="110px" :show-overflow-tooltip="true" label="所属行业" />
							<el-table-column prop="regAreaName" min-width="160px" :show-overflow-tooltip="true" label="注册地" />
							<el-table-column prop="contactPhone" min-width="190px" :show-overflow-tooltip="true" label="联系电话">
								<template #default="scope">
									<span v-if="scope.row.contactPhone">{{ scope.row.contactPhone }}</span>
									<span v-if="scope.row.contactPhone && scope.row.contactTel">、</span>
									<span v-if="scope.row.contactTel">{{ scope.row.contactTel }}</span>
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
				</el-tab-pane>
			</el-tabs>
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
import { otherSupplyPage, pageSupply } from '@/api/supplier/supplier';
import { ElMessage } from 'element-plus';
const show = ref(false);
const multipleTableRefMy = ref(null);
const multipleTableRefOther = ref(null);
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
	identity: {
		type: String,
		default: undefined
	},
	multiple: {
		type: Boolean,
		default: false
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
	dataList: {
		type: Array
	},
	maxMember: {
		type: Number,
		default: 0
	},
	projectId: {
		type: String,
		default: undefined
	}
});
// console.log(props.selected);
model.value = props.selected;
const emit = defineEmits(['change']);
let loading = ref(false);
// 回显表格数据
const finalSelection = ref([]);
const mySelection = ref([]);
const otherSelection = ref([]);
const activeName = ref('my');
// 选择操作
const multipleSelectionMy = ref([]);
const multipleSelectionOther = ref([]);

onMounted(() => {
	page.value.pageNum = 1;
	if (props.dataList) {
		props.dataList.forEach(item => {
			finalSelection.value.push({
				id: item.entId,
				name: item.entName,
				code: item.entCode,
				contactName: item.contactName,
				contactPhone: item.contactPhone
			});
		});
		let ids = [],
			names = [];
		finalSelection?.value.forEach(e => {
			ids.push(e[props.idKey]);
			names.push(e[props.nameKey]);
		});
		model.value = ids;
		emit('change', model.value, finalSelection?.value);
	}
});

// tab change
const handleClick = panel => {
	// if(activeName.value == 'my'){

	// }
	// if(activeName.value == 'other'){

	// }
	// console.log(panel.props.name);
	activeName.value = panel.props.name;
	handleQuery();
};
// 提交操作
const ok = () => {
	if (props.multiple) {
		if (props.maxMember > 0 && multipleSelectionMy.value.length + multipleSelectionOther.value.length > props.maxMember) {
			ElMessage.warning(`最多邀请 ${props.maxMember} 个供应商`);
			return;
		}
	}
	finalSelection.value = [];
	let mySelect = JSON.parse(JSON.stringify(multipleSelectionMy.value));
	let otherSelect = JSON.parse(JSON.stringify(multipleSelectionOther.value));
	finalSelection.value.push(...mySelect);
	finalSelection.value.push(...otherSelect);
	show.value = false;
	let ids = [],
		names = [];
	finalSelection?.value.forEach(e => {
		ids.push(e[props.idKey]);
		names.push(e[props.nameKey]);
	});
	model.value = ids;
	// console.log(model.value);
	emit('change', model.value, finalSelection?.value);
};
// table 删除
const handleDelete = row => {
	// console.log('[删除:before]', finalSelection.value, row.id);
	finalSelection.value = finalSelection.value.filter(item => item.id != row.id);
	// console.log('[删除:after]', finalSelection.value);
	//刷新选择框-已选择数据
	{
		// console.log('[multipleSelectionMy:before]', multipleSelectionMy.value, row.id);
		multipleSelectionMy.value = multipleSelectionMy.value.filter(item => item.id != row.id);
		// console.log('[multipleSelectionMy:after]', multipleSelectionMy.value);

		// console.log('[multipleSelectionOther:after]',multipleSelectionOther.value)
		multipleSelectionOther.value = multipleSelectionOther.value.filter(item => item.id != row.id);
		// console.log('[multipleSelectionOther:before]',multipleSelectionOther.value,row.id)
	}
	show.value = false;
	let ids = [],
		names = [];
	finalSelection?.value.forEach(e => {
		ids.push(e[props.idKey]);
		names.push(e[props.nameKey]);
	});
	model.value = ids;
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
	params = { ...queryData.value, ...page.value, identity: props.identity, projectId: props.projectId };
	loading.value = true;

	if (activeName.value == 'my') {
		pageSupply(params)
			.then(res => {
				// console.log(res);
				// 查询、翻页先保存已经选取的数据
				const arr = JSON.parse(JSON.stringify(multipleSelectionMy.value));
				page.value.total = res.data.total;
				tableData.value = res.data.records;
				// 重选数据
				nextTick(() => {
					tableData.value.forEach(row => {
						multipleSelectionMy.value = arr;
						// 重新赋值ids
						// console.log('reset: ', arr);
						if (
							multipleSelectionMy.value !== undefined &&
							multipleSelectionMy.value.filter(item => item.id === row.supplyId).length > 0
						) {
							// 选取数据
							multipleTableRefMy.value.toggleRowSelection(row, true);
						}
					});
				});
			})
			.finally(() => {
				loading.value = false;
			});
	} else {
		if (params.industryId) params.industryList = params.industryId?.split(',');
		otherSupplyPage({ ...params, projectId: props.projectId })
			.then(res => {
				// console.log(res);
				// 查询、翻页先保存已经选取的数据
				const arr = JSON.parse(JSON.stringify(multipleSelectionOther.value));
				// console.log(arr);
				page.value.total = res.data.total;
				tableData.value = res.data.records;
				// 重选数据
				nextTick(() => {
					tableData.value.forEach(row => {
						multipleSelectionOther.value = arr;
						// 重新赋值ids
						if (
							multipleSelectionOther.value !== undefined &&
							multipleSelectionOther.value.filter(item => item.id === row.id).length > 0
						) {
							// 选取数据
							multipleTableRefOther.value.toggleRowSelection(row, true);
						}
					});
				});
			})
			.finally(() => {
				loading.value = false;
			});
	}
};
// select change
const handleSelectionChange = val => {
	// 当前页数据id
	let pageIdList = [];
	tableData.value.forEach(item => {
		pageIdList.push(item);
	});

	if (activeName.value == 'my') {
		// 清除当前页
		if (multipleSelectionMy.value !== undefined) {
			multipleSelectionMy.value = multipleSelectionMy.value.filter(item => {
				return !pageIdList.filter(row => item.id === row.supplyId).length > 0;
			});
		}
		// 翻页累计
		val.map(item => {
			multipleSelectionMy.value.push({
				id: item.supplyId,
				name: item.supplyName,
				code: item.entCode,
				contactName: item.contactName,
				contactPhone: item.contactPhone
			});
		});
		// 去重
		// console.log('[去重:before]',multipleSelectionMy.value)
		multipleSelectionMy.value = uniqueArrayById(multipleSelectionMy.value);
		// console.log('[去重:after]', multipleSelectionMy.value)
	}

	if (activeName.value == 'other') {
		// 清除当前页
		if (multipleSelectionOther.value !== undefined) {
			multipleSelectionOther.value = multipleSelectionOther.value.filter(item => {
				return !pageIdList.filter(row => item.id === row.id).length > 0;
			});
		}
		// 翻页累计
		val.map(item => {
			multipleSelectionOther.value.push({
				id: item.id,
				name: item.name,
				code: item.code,
				contactName: item.contactName,
				contactPhone: item.contactPhone
			});
		});
		// 去重
		multipleSelectionOther.value = uniqueArrayById(multipleSelectionOther.value);
	}

	function uniqueArrayById(arr) {
		const map = new Map();
		arr.forEach(item => {
			if (!map.has(item.id)) {
				map.set(item.id, item);
			}
		});
		return Array.from(map.values());
	}
};
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
</style>
