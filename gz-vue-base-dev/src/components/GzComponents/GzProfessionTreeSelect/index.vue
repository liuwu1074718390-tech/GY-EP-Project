<template>
	<div class="gz-dept-tree-select">
		<el-tree-select
			v-model="selected"
			:data="treeData"
			:multiple="multi"
			:render-after-expand="false"
			show-checkbox
			:check-strictly="checkStrictly"
			@check-change="handleCheckChange"
		/>
	</div>
</template>
<script setup>
import { ref, nextTick, onMounted, toRefs, watch } from 'vue';
import { professionTree } from '@/api/expert/profession';
import { deepCopyAndAddProperties } from '@/utils';
const emit = defineEmits(['change']);

const props = defineProps({
	modelValue: {
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
	}
});

const treeData = ref([]);
const selected = ref([]);
// console.log('tree select',[...props.value]);
// const selected = ref(props.multi ? [...props.value] : props.value.join(''));
// console.log('tree selected',selected.value);

const modelValueT = toRefs(props).modelValue;
watch(modelValueT, (newValue, oldValue) => {
	if (modelValueT.value) {
		selected.value = modelValueT.value;
	}
});

onMounted(() => {
	selected.value = modelValueT.value;
	console.log('tree select', modelValueT.value);
	console.log('tree selected', selected.value);
	getProfessionTree();
});

const reset = () => {
	selected.value = [];
};

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
		emit('update:modelValue', selected.value);
		emit('change', selected.value);
		// console.log(selected.value);
	});
}
const getProfessionTree = () => {
	professionTree().then(
		res => {
			// console.log(res);
			initData(res.data);
		},
		err => {
			console.log(err);
		}
	);
};

const initData = data => {
	console.log(data);
	const fieldsToCopy = {
		majorName: 'label',
		children: 'children',
		majorCode: 'value'
	};
	const newFieldNames = ['label', 'children', 'value'];
	const toStr = ['value'];
	const _d = deepCopyAndAddProperties({ data, fieldsToCopy, newFieldNames, toStr });

	if (props.disabledLevel) {
		setDisabledLevel(_d);
	}
	treeData.value = _d;
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
