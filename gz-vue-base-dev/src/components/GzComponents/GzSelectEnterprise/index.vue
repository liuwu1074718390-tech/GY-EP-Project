<template>
	<div class="gz-select-enterprise" v-loading="loading">
		<div class="flex-space-between">
			<el-input v-model="custModel" @change="custChange" @input="custChange" placeholder="" />
			<el-button
				type="primary"
				class="ml-15"
				@click="
					show = true
					// getList();
				"
				>选择</el-button
			>
		</div>
		<el-dialog
			class="gz-dialog-form"
			v-model="show"
			:title="title"
			style="max-width: 1400px"
			width="80%"
			top="8vh"
			:show-close="false"
			append-to-body
			destroy-on-close
		>
			<SearchQuery @handleQuery="handleQuery" :searchDefault="searchDefault" :searchHideLabel="searchHideLabel" />
			<div class="gz-table-detail mb-40">
				<el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column label="序号" type="index" align="center" width="60" />
					<el-table-column prop="name" label="企业名称" />
					<el-table-column prop="industryName" label="所属行业" />
					<el-table-column prop="contactPhone" label="联系电话" />
					<el-table-column prop="identityName" label="已认证身份" />
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
const model = ref({});
const custModel = ref('');
const props = defineProps({
	selected: {
		type: Object,
		default: () => {
			return { name: '', id: '' };
		}
	},
	title: {
		type: String,
		default: '选择企业'
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
	searchDefault: {
		type: Object,
		default: () => {
			return {};
		}
	},
	searchHideLabel: {
		type: Array,
		default: () => {
			return [];
		}
	}
});
// console.log(props.selected);
model.value = props.selected;
custModel.value = model.value.name;
const emit = defineEmits(['change']);
let loading = ref(false);
const ok = () => {
	show.value = false;
	let ids = [],
		names = [];
	multipleSelection?.value.forEach(e => {
		ids.push(e[props.idKey]);
		names.push(e[props.nameKey]);
	});
	model.value = { id: ids.join(','), name: names.join(',') };
	emit('change', model.value);
};
const custChange = () => {
	nextTick(() => {
		let _model = null;
		tableData.value?.forEach(e => {
			if (e.name == model.value.name) _model = e;
		});
		if (_model) {
			model.value = _model;
			emit('change', model.value);
		} else {
			model.value = { ...model.value, id: '' };
			emit('change', model.value);
		}
	});
};
const tableData = ref([]);

const page = ref({
	total: 0,
	pageNum: 1,
	pageSize: 10
});

let params = ref({});
const handleQuery = data => {
	page.value.pageNum = 1;
	// console.log(data);
	params.value = { ...data, ...page.value };
	getList();
};
const getList = () => {
	loading.value = true;
	getEntPage({ ...params.value, ...page.value })
		.then(res => {
			// console.log(res);
			page.value.total = res.data.total;
			tableData.value = res.data.records;
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
watch(model, (n, o) => {
	custModel.value = n.name;
});
watch(custModel, (n, o) => {
	model.value = { id: '', name: n };
});
</script>
<style lang="scss" scoped>
.flex-space-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.gz-select-enterprise {
	width: 100%;
	:deep(.el-input.is-disabled) {
		cursor: default;
		.el-input__inner {
			cursor: default;
		}
	}
}
</style>
