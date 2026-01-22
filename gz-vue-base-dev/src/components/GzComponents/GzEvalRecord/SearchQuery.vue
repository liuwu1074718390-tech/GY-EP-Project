<template>
	<div class="search-q">
		<el-form class="gz-form-search" :model="queryParams" ref="queryRef" :inline="true">
			<el-form-item label="评审日期" prop="startTime">
				<gz-date-picker v-model:start="queryParams.startTime" v-model:end="queryParams.endTime" :days="30" />
			</el-form-item>
			<el-form-item label="评审状态" prop="reviewStatus">
				<GzDictSelect v-model="queryParams.reviewStatus" title="评审状态" type="eval_review_status" />
			</el-form-item>
			<el-form-item label="搜索" prop="keyWord">
				<el-input
					v-model="queryParams.keyWord"
					placeholder="请输入项目名称或编号"
					clearable
					style="width: 160px"
					@keyup.enter="handleQuery"
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
import { ref, reactive, toRefs, watch, getCurrentInstance, defineAsyncComponent } from 'vue';
import GzDictSelect from '@/components/GzDictSelect/index.vue';
import GzDatePicker from '@/components/GzDatePicker';
const emit = defineEmits(['handleQuery']);

const props = defineProps({
	type: {
		type: String
	}
});

const data = reactive({
	form: {},
	queryParams: {
		keyWord: '',
		startTime: undefined,
		endTime: undefined,
		reviewStatus: undefined
	}
});

const queryRef = ref();
const { queryParams } = toRefs(data);

/** 搜索按钮操作 */
function handleQuery() {
	// queryParams.value.pageNum = 1;
	emit('handleQuery', queryParams.value);
}
/** 重置按钮操作 */
function resetQuery() {
	queryParams.value.startTime = undefined;
	queryParams.value.endTime = undefined;
	queryRef.value.resetFields();
	handleQuery();
}
function getQueryParam() {
	return queryParams.value;
}
defineExpose({
	getQueryParam,
	resetQuery
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
	}
}
</style>
