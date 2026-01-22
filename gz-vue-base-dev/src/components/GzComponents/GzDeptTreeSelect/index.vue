<template>
	<div class="gz-dept-tree-select">
		<el-tree-select
			v-model="selected"
			:data="treeData"
			:multiple="multi"
			:render-after-expand="false"
			show-checkbox
			:placeholder="props.placeholder"
			:check-strictly="checkStrictly"
			@check-change="handleCheckChange"
		/>
	</div>
</template>
<script setup>
import { ref, nextTick, onMounted, onActivated } from 'vue';
import { deptTree } from '@/api/enterprise/organization';
import { deepCopyAndAddProperties } from '@/utils';
const emit = defineEmits(['change']);

const props = defineProps({
	value: {
		type: Array,
		default: () => []
	},
	multi: {
		type: Boolean,
		default: true
	},
	checkStrictly: {
		type: Boolean,
		default: false
	},
	disabledLevel: {
		type: String || Number,
		default: ''
	},
	deptData: {
		type: Object,
		default: () => {}
	},
	placeholder: {
		type: String,
		default: '请选择'
	}
});
// console.log([...props.value]);
const selected = ref(props.multi ? [...props.value] : props.value.join(''));
// console.log(selected.value);

const treeData = ref([
	// {
	// 	value: '1',
	// 	label: 'Level one 1',
	// 	children: [
	// 		{
	// 			value: '1-1',
	// 			label: 'Level two 1-1',
	// 			children: [
	// 				{
	// 					value: '1-1-1',
	// 					label: 'Level three 1-1-1'
	// 				}
	// 			]
	// 		}
	// 	]
	// },
]);
function handleCheckChange(data, checked, indeterminate) {
	if (checked) {
		// 当前节点被选中
		//console.log('Selected:', data.label);
	} else if (indeterminate) {
		// 当前节点处于半选状态
		//console.log('Indeterminate:', data.label);
	} else {
		// 当前节点被取消选中
		//console.log('Unselected:', data.label);
	}
	nextTick(() => {
		emit('change', selected.value);
		// console.log(selected.value);
	});
}
const getDeptTree = () => {
	if (props.deptData?.id) {
		initData([props.deptData]);
		return;
	}
	deptTree().then(
		res => {
			// console.log(res);
			initData([res.data]);
		},
		err => {
			console.log(err);
		}
	);
};

const initData = data => {
	const fieldsToCopy = {
		name: 'label',
		childDeptList: 'children',
		id: 'value'
	};
	const newFieldNames = ['label', 'children', 'value'];
	const toStr = ['value'];
	const _d = deepCopyAndAddProperties({ data, fieldsToCopy, newFieldNames, toStr });

	// console.log(treeData.value);
	if (props.disabledLevel) {
		setDisabledLevel(_d);
	}

	treeData.value = _d;
};

onMounted(() => {
	getDeptTree();
});

const reset = () => {
	selected.value = [];
};

function setDisabledLevel(data) {
	for (const item of data) {
		if (props.disabledLevel == item.level) {
			item.disabled = true;
		}

		if (item.children) {
			setDisabledLevel(item.children);
		}
	}
}

defineExpose({
	reset
});
</script>
<style lang="scss">
.gz-dept-tree-select {
	.gz-dialog-form .gz-dialog-form-cust .el-select .el-select__wrapper {
		height: inherit;
	}
}
</style>
