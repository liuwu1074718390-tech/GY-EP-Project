<template>
	<div class="gz-date-picker">
		<el-date-picker
			v-model="dateRange"
			value-format="YYYY-MM-DD"
			type="daterange"
			range-separator="~"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
		></el-date-picker>
		<el-radio-group v-model="shortTimer" is-button>
			<el-radio-button v-for="item in shortTimerList" :value="item.value" :key="item.label">{{ item.label }}</el-radio-button>
		</el-radio-group>
	</div>
</template>
<script setup>
// <gz-date-picker v-model:start="queryParams.startReviewTime" v-model:end="queryParams.endReviewTime" :days="7" :labels="['今天', '近七天', '近一个月', '历史总量']"/>
import { ref, watch } from 'vue';
import { getLastSevenDays, getLastMonth, getTomorrowDays, getNextSevenDays } from '@/utils/common';
const start = defineModel('start', {
	type: String,
	default: ''
});
const end = defineModel('end', {
	type: String,
	default: ''
});
const props = defineProps({
	valueFormat: {
		type: String,
		default: 'YYYY-MM-DD'
	},
	type: {
		type: String,
		default: 'daterange'
	},
	rangeSeparator: {
		type: String,
		default: '~'
	},
	startPlaceholder: {
		type: String,
		default: '开始日期'
	},
	endPlaceholder: {
		type: String,
		default: '结束日期'
	},
	days: {
		type: Number,
		default: 30
	},
	labels: {
		type: Array,
		default: () => []
	}
});
const shortTimer = ref('');
const dateRange = ref([]);

let shortTimerList = [];

const labelList = [
	{ label: '全部', value: `,` },
	{ label: '最近一周', value: `${getLastSevenDays()}` },
	{ label: '最近一个月', value: `${getLastMonth()}` },
	{ label: '今天', value: `${getTomorrowDays()[0]},${getTomorrowDays()[0]}` },
	{ label: '明天', value: `${getTomorrowDays()[1]},${getTomorrowDays()[1]}` },
	{ label: '近七天', value: `${getLastSevenDays()}` },
	{ label: '近一个月', value: `${getLastMonth()}` },
	{ label: '历史总量', value: `,` },
	{ label: '未来七天', value: `${getNextSevenDays()}` }
];

// console.log(labelList);

if (props.labels && props.labels.length > 0) {
	shortTimerList = labelList.filter(item => props.labels.includes(item.label));
} else if (props.days == 30) {
	shortTimerList = labelList.filter(item => ['全部', '最近一周', '最近一个月'].includes(item.label));
} else if (props.days == 7) {
	shortTimerList = labelList.filter(item => ['全部', '明天', '近七天'].includes(item.label));
}

watch(shortTimer, (n, o) => {
	if (n != o) {
		[start.value, end.value] = (n || '').split(',');
	}
});

watch(dateRange, (n, o) => {
	[start.value, end.value] = n || [];
});
watch([start, end], ([n1, n2], [o1, o2]) => {
	if (n1 + n2 != o1 + o2) {
		dateRange.value = [n1, n2];
		shortTimer.value = [n1, n2].join(',');
	}
});
</script>
<style lang="scss" scoped>
.gz-date-picker {
	display: flex;
	justify-content: center;
	align-items: center;
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
}
</style>
