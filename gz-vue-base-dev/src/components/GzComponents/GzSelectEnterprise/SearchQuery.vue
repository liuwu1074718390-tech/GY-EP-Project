<template>
	<div class="search-q">
		<el-form class="gz-form-search" :model="queryParams" ref="queryRef" :inline="true">
			<el-form-item v-show="!props.searchHideLabel.includes('所属行业')" label="所属行业" prop="industryId">
				<el-select
					v-model="queryParams.industryId"
					placeholder="请选择"
					clearable
					style="width: 160px"
					filterable
					@change="handleQuery"
				>
					<el-option v-for="item in industryTypeList" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item v-show="!props.searchHideLabel.includes('注册地')" label="注册地" prop="reAreaId">
				<GzAreaSelect
					ref="selectAreaRef"
					:code="queryParams.regAreaId"
					@areaChange="
						data => {
							queryParams.regAreaId = data.area.adCode;
							handleQuery();
						}
					"
				></GzAreaSelect>
			</el-form-item>
			<el-form-item v-show="!props.searchHideLabel.includes('企业身份')" label="企业身份" prop="supplySource">
				<el-select
					v-model="queryParams.identity"
					collapse-tags
					placeholder="请选择"
					style="width: 160px"
					@change="handleQuery"
					clearable
				>
					<el-option v-for="item in identityTypeList" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
				</el-select>
			</el-form-item>
			<el-form-item label="搜索" prop="name">
				<el-input
					v-model="queryParams.name"
					v-show="!props.searchHideLabel.includes('企业名称')"
					placeholder="企业名称"
					clearable
					style="width: 160px"
				/>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
				<el-button icon="Refresh" @click="resetQuery(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script setup>
import { ref, reactive, toRefs, watch, onBeforeMount, getCurrentInstance, defineAsyncComponent, onMounted } from 'vue';
import { selectType, getIndustryTree } from '@/api/account/ent.js';
const { proxy } = getCurrentInstance();
const { supply_source } = proxy.useDict('supply_source');
const { institutional_type } = proxy.useDict('institutional_type');
const GzAreaSelect = defineAsyncComponent(() => import('@/components/GzAreaSelect'));
const selectAreaRef = ref();
const emit = defineEmits(['handleQuery']);
const props = defineProps({
	type: {
		type: String
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

const industryTypeList = ref([]);
const identityTypeList = ref([]);
console.log(props.searchDefault);
const data = reactive({
	form: {},
	queryParams: {
		name: '',
		industryId: undefined,
		regAreaId: undefined,
		identity: undefined,
		...props.searchDefault
	},
	rules: {
		// name: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
		// dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }]
	}
});

const queryRef = ref();
const { queryParams } = toRefs(data);
console.log(queryParams);
/** 取消按钮 */
// function cancel() {
// 	open.value = false;
// 	reset();
// }

/** 表单重置 */
function reset(queryRef) {
	// queryParams.value = {
	// 	pageNum: 1,
	// 	pageSize: 10,
	// 	status: undefined,
	// 	name: ''
	// };
	queryRef.resetFields();
}
/** 搜索按钮操作 */
function handleQuery() {
	// queryParams.value.pageNum = 1;
	emit('handleQuery', queryParams.value);
}
/** 重置按钮操作 */
function resetQuery() {
	queryParams.value.name = undefined;
	// queryParams.value.dateRange = [];
	selectAreaRef.value.reset();
	queryParams.value.regAreaId = null;
	queryParams.value.supplySource = null;
	queryParams.value.identity = null;
	queryRef.value.resetFields();
	handleQuery();
}
function getQueryParam() {
	return queryParams.value;
}

onBeforeMount(() => {
	selectType().then(res => {
		identityTypeList.value = res.data.identityTypeList;
	});
	getIndustryTree().then(res => {
		industryTypeList.value = res.data;
	});
});
onMounted(() => {
	handleQuery();
});
defineExpose({
	getQueryParam
});
</script>
<style lang="scss" scoped>
.search-q {
	padding: 18px;
	background: #f5f7fa;
	border-radius: 12px 12px 12px 12px;
	margin: 18px 0;

	:deep(.el-date-editor.el-input__wrapper) {
		width: 280px;
	}

	:deep(.el-date-editor--daterange.el-input__wrapper) {
		border-radius: 6px 0 0 6px !important;
	}

	:deep(.el-radio-group) {
		.el-radio-button:first-child .el-radio-button__inner {
			border-radius: 0 !important;
			border-left: 0;
		}
	}
	:deep(.el-form-item__label) {
		// line-height: 40px !important;
		// margin-bottom: 0 !important;
	}
}
</style>
