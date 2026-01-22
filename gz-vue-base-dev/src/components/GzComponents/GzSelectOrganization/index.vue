<template>
	<el-dialog
		v-model="model"
		:title="props.title"
		width="742px"
		:show-close="false"
		class="gz-dialog-form"
		append-to-body
		destroy-on-close
	>
		<div class="gz-dialog-form-cust mt-10 mb-50">
			<p class="gz-dialog-form-cust-tit mb-10">指定组织<span>（可选填）</span></p>
			<gz-dept-tree-select v-if="model" :value="props.value" @change="changeDept" />
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="model = false">关 闭</el-button>
				<el-button type="primary" @click="ok(item, index)">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { ref } from 'vue';
// import { roleAdd, roleUpdate } from '@/api/enterprise/roles';
// import { ElMessage } from 'element-plus';
import GzDeptTreeSelect from '@/components/GzDeptTreeSelect';

const model = defineModel({
	type: Boolean,
	default: true
});
const props = defineProps({
	title: {
		type: String,
		default: '指定数据权限范围'
	},
	value: {
		type: Array,
		default: () => []
	}
});
// console.log(props);

let deptData = ref([]);

const changeDept = d => {
	deptData.value = d;
};

const emit = defineEmits(['ok']);

const ok = () => {
	model.value = false;
	emit('ok', deptData.value);
};
</script>
<style lang="scss" scoped>
:deep(.el-select .el-select__wrapper) {
	height: inherit !important;
}
</style>
