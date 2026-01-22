<template>
	<div class="gz-dept-tree">
		<el-tree
			ref="treeRef"
			:data="treeData"
			:props="defaultProps"
			:filter-node-method="filterNode"
			accordion
			highlight-current
			style="max-width: 600px"
			@node-click="handleNodeClick"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { deptTree } from '@/api/enterprise/organization';
import { deepCopyAndAddProperties } from '@/utils';
const emit = defineEmits(['node-click']);

const props = defineProps({
	search: {
		type: String,
		default: ''
	}
});

const treeRef = ref();

const treeData = ref([]);
const handleNodeClick = data => {
	emit('node-click', data);
};

const defaultProps = {
	children: 'children',
	label: 'label'
};

const filterNode = (value, data) => {
	if (!value) return true;
	return data.label.includes(value);
};

watch(
	() => props.search,
	val => {
		treeRef.value.filter(val);
	}
);

const getDeptTree = () => {
	deptTree().then(
		res => {
			initData(res.data.childDeptList);
			emit('node-click', res.data);
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
	treeData.value = _d;
};

onMounted(() => {
	getDeptTree();
});
</script>

<style lang="scss" scoped>
:deep(.el-tree-node) {
	background: #f5f7fa;
}

:deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content .el-tree-node__label) {
	color: #377cfd;
}
</style>
