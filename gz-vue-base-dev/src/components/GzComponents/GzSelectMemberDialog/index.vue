<template>
	<div class="gz-select-member-dialog" v-loading="loading" v-if="model">
		<el-dialog
			class="gz-dialog-form"
			v-model="model"
			:title="props.title"
			width="80%"
			:show-close="false"
			append-to-body
			destroy-on-close
		>
			<SearchQuery @handleQuery="handleQuery" />
			<p class="select-count mb-20">
				共 <span class="f-b" style="color: #000000">{{ page.total }}</span> 位企业成员，当前已选中
				<span class="f-b" style="color: #000000">{{ multipleSelection.length }}</span> 位
			</p>
			<div class="gz-table-detail mb-40">
				<el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column label="序号" type="index" align="center" width="60" />
					<el-table-column prop="name" label="真实姓名" />
					<el-table-column prop="nickName" label="用户昵称" />
					<el-table-column prop="phone" label="手机号" />
					<el-table-column prop="deptName" label="所属组织">
						<template #default="scope">
							<p class="w-100 tx-of" :title="scope.row.deptName">{{ scope.row.deptName }}</p>
						</template>
					</el-table-column>
					<el-table-column prop="roleName" label="角色权限" />
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
					<el-button @click="model = false">关 闭</el-button>
					<el-button type="primary" @click="ok(item, index)">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import SearchQuery from './SearchQuery.vue';
// import { pageValidMember } from '@/api/enterprise/valid-member.js';
import { deptStaffList } from '@/api/enterprise/organization';
import { ElMessage } from 'element-plus';
const model = defineModel({
	type: Boolean,
	default: false
});
const multipleTableRef = ref(null);
const props = defineProps({
	selected: {
		type: Array,
		default: () => [{ name: '', id: '' }]
	},
	title: {
		type: String,
		default: '选择人员'
	},
	multiple: {
		type: Boolean,
		default: false
	},
	maxMember: {
		type: Number,
		default: 0
	}
});
// console.log(props.selected);
const emit = defineEmits(['change']);
let loading = ref(false);
const ok = () => {
	if (props.maxMember > 0 && multipleSelection.value?.length > props.maxMember) {
		ElMessage.warning(`最多选择 ${props.maxMember} 个人`);
		return;
	}
	model.value = false;
	emit('change', multipleSelection.value);
};
const tableData = ref([]);

const page = ref({
	total: 0,
	pageNum: 1,
	pageSize: 10,
	name: undefined,
	deptIdList: undefined
});

let params = {};
const handleQuery = data => {
	page.value.pageNum = 1;
	// console.log(data);
	page.value.deptIdList = data.depts;
	page.value.name = data.name;
	getList();
};
const getList = () => {
	loading.value = true;
	params = { ...page.value };
	deptStaffList(params)
		.then(res => {
			page.value.total = res.data.total;
			tableData.value = res.data.records;
			nextTick(() => {
				let ids = props.selected.map(e => e.id + '');
				multipleSelection.value = props.selected;
				tableData.value.forEach(e => {
					if (ids.includes(e.id + '')) {
						multipleTableRef.value?.toggleRowSelection(e, true);
					}
				});
			});
		})
		.finally(() => {
			loading.value = false;
		});
};
const multipleSelection = ref([]);
const handleSelectionChange = val => {
	if (!props.multiple && val.length > 1) {
		let sel = val.pop();
		multipleSelection.value = sel;
		multipleTableRef.value?.clearSelection();
		nextTick(() => {
			multipleTableRef.value?.toggleRowSelection(sel, true);
		});
	} else {
		multipleSelection.value = val;
	}
};
onMounted(() => {
	getList();
});
// watch(model, (n, o) => {
// 	if (n) getList();
// });
</script>
<style lang="scss" scoped>
.flex-space-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.gz-select-member-dialog {
	width: 100%;
	:deep(.el-input.is-disabled) {
		cursor: default;
		.el-input__inner {
			cursor: default;
		}
	}
}
</style>
