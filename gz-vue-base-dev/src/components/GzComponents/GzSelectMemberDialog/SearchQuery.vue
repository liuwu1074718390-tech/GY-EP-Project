<template>
	<div class="search-q">
		<el-form class="gz-form-search flex-space-between" :model="queryParams" ref="queryRef" :inline="true">
			<div>
				<el-form-item label="组织" prop="status">
					<gz-dept-tree-select style="width: 360px" v-model="queryParams.depts" @change="changeDept" ref="deptSelect" />
				</el-form-item>
				<el-form-item label="真实姓名" prop="name">
					<el-input v-model="queryParams.name" placeholder="请输入" clearable style="width: 240px" @keyup.enter="handleQuery" />
				</el-form-item>
			</div>
			<el-form-item style="min-width: 172px; margin-right: 0">
				<el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
				<el-button icon="Refresh" @click="resetQuery(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script setup>
import { getCurrentInstance, ref, reactive, toRefs, watch } from 'vue';
// import { getLastSevenDays, getLastMonth } from '@/utils/common';
import GzDeptTreeSelect from '@/components/GzDeptTreeSelect';
const emit = defineEmits(['handleQuery']);
const { proxy } = getCurrentInstance();
const data = reactive({
	form: {},
	queryParams: {
		// pageNum: 1,
		// pageSize: 10,
		name: '',
		// dateRange: [],
		depts: []
	},
	rules: {
		// name: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
		// dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }]
	}
});
const queryRef = ref();
const { queryParams } = toRefs(data);

const changeDept = d => {
	queryParams.value.depts = d;
};

/** 取消按钮 */
// function cancel() {
// 	open.value = false;
// 	reset();
// }

/** 表单重置 */
function reset(queryRef) {
	queryParams.value = {
		name: '',
		depts: []
	};
	// queryRef.resetFields();
	proxy.$refs.deptSelect.reset();
}
/** 搜索按钮操作 */
function handleQuery() {
	// queryParams.value.pageNum = 1;
	emit('handleQuery', queryParams.value);
}
/** 重置按钮操作 */
function resetQuery() {
	reset(queryRef);
	handleQuery();
}
</script>
<style lang="scss" scoped>
.search-q {
	padding: 18px;
	background: #f5f7fa;
	border-radius: 12px 12px 12px 12px;
	margin: 18px 0;
	margin-top: 0;
	padding-bottom: 0;

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
		line-height: 40px !important;
		margin-bottom: 0 !important;
	}
}
</style>
