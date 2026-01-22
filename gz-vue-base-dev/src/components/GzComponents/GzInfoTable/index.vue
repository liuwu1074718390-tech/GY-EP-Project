<template>
	<div class="gz-info-table">
		<h3 class="f-17 f-b mb-20" v-if="props.title">
			<svg-icon v-if="props.iconClass" class="mr-8" :icon-class="props.iconClass" />{{ props.title }}
		</h3>

		<el-table
			class="column-table"
			:data="props.data"
			:show-header="false"
			border
			style="width: 100%"
			:span-method="arraySpanMethod"
		>
			<el-table-column prop="label_1" :width="props.labelWidth" :align="props.align[0]" />
			<el-table-column prop="value_1" :align="props.align[1]">
				<template #default="scope">
					<slot v-if="scope.row.value_1_slot" name="value_1" :data="scope.row"></slot>
				</template>
			</el-table-column>
			<el-table-column
				prop="label_2"
				:width="props.labelWidth"
				:style="{ width: props.labelWidth + 'px' }"
				:align="props.align[0]"
			/>
			<el-table-column prop="value_2" :align="props.align[1]">
				<template #default="scope">
					<slot v-if="scope.row.value_2_slot" name="value_2" :data="scope.row"></slot>
				</template>
			</el-table-column>
			<el-table-column v-if="keys.includes('label_3')" prop="label_3" :width="props.labelWidth" :align="props.align[0]" />
			<el-table-column v-if="keys.includes('label_3')" prop="value_3" :align="props.align[1]">
				<template #default="scope">
					<slot v-if="scope.row.value_3_slot" name="value_3" :data="scope.row"></slot>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	data: {
		type: Object,
		default: () => {}
	},
	align: {
		type: Array,
		default: () => ['right', 'left']
	},
	labelWidth: {
		type: Number,
		default: 180
	},
	iconClass: {
		type: String
	}
});

// console.log(props.data);

const keys = computed(() => extractKeys(props.data));

// console.log(keys);

function extractKeys(data) {
	const keysSet = new Set();

	data?.forEach(item => {
		Object.keys(item).forEach(key => {
			keysSet.add(key);
		});
	});

	return Array.from(keysSet);
}

// data 格式
// const demoData = ref([
// 	{
// 		label_1: '流程ID',
// 		value_1: 'YHSQ-12345678（例）'
// 		// label_2: '审批状态',
// 		// value_2: '待审核'
// 	},
// 	{
// 		label_1: '截止时间',
// 		value_1: '2024-06-08 16:00',
// 		value_1_slot: true,
// 		label_2: '申请说明',
// 		value_2: '这里是申请说明，这里是申请说明，这里是申请说明，这里是申请说明，这里是申请',
// 		value_2_slot: true
// 	},
// 	{
// 		label_1: '截止时间',
// 		value_1: '2024-06-08 16:00',
// 		// value_1_slot: true,
// 		label_2: '申请说明',
// 		value_2: '这里是申请说明，这里是申请说明，这里是申请说明，这里是申请说明，这里是申请',
// 		// value_2_slot: true,
// 		label_3: '申请说明',
// 		value_3: '这里是申请说明，这里是申请说明，这里是申请说明，这里是申请说明，这里是申请'
// 		// value_3_slot: true
// 	}
// ]);

const arraySpanMethod = params => {
	let { row, columnIndex } = params;
	if (!row.label_2 && !row.value_2 && !row.label_3 && !row.value_3) {
		if (columnIndex == 1) return [1, keys.value?.includes('label_3') ? 5 : 3];
		if (columnIndex > 1) return [0, 0];
	} else if (!row.label_3 && !row.value_3) {
		if (columnIndex == 1) return [1, keys.value?.includes('label_3') ? 3 : 1];
		if (columnIndex == 3) return [1, keys.value?.includes('label_3') ? 1 : 1];
		if (columnIndex > 3) return [0, 0];
	}
};
</script>
<style scoped lang="scss">
.gz-info-table {
	.column-table {
		:deep(.el-table__row) {
			.cell {
				min-height: 24px;
				font-size: 14px;
				font-weight: 400;
				color: #333333;
			}
			.el-table tr,
			td.el-table__cell {
				background-color: transparent !important;
			}
			.el-table__cell:nth-child(odd) {
				background-color: #f9fafb !important;
				font-weight: 700;
			}
		}
	}
}
</style>
