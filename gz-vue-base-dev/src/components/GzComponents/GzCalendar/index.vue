<template>
	<div class="gz-calendar">
		<el-calendar ref="calendar">
			<template #header="{ date }">
				<div class="header">
					<div class="text-l">
						<el-icon class="mr-15 cur-p" @click="selectDate('prev-year')"><DArrowLeft /></el-icon>
						<el-icon class="cur-p" @click="selectDate('prev-month')"><ArrowLeft /></el-icon>
					</div>
					<div class="text-c">
						<span class="cur-p" @click="selectDate('today')">{{ date }}</span>
					</div>
					<div class="text-r">
						<el-icon class="cur-p" @click="selectDate('next-month')"><ArrowRight /></el-icon>
						<el-icon class="ml-15 cur-p" @click="selectDate('next-year')"><DArrowRight /></el-icon>
					</div>
				</div>
			</template>
			<template #date-cell="{ data }">
				<p
					v-if="selectDateObj[data.day]"
					:class="`tag-selected ${selectDateObj[data.day].class}`"
					:style="selectDateObj[data.day].style"
					:title="selectDateObj[data.day].title"
					@click="selectDateObj[data.day].clickFun(data, selectDateObj[data.day])"
				>
					{{ data.day.split('-')[2] * 1 }}
					<small class="point" :style="selectDateObj[data.day].style"></small>
				</p>
				<span v-else-if="today == data.day" @click="selectDate('today')" style="position: relative"
					>{{ data.day.split('-')[2] * 1 }}
					<small class="point" style="background: rgba(55, 124, 253, 0.3)"></small>
				</span>
			</template>
		</el-calendar>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
const emit = defineEmits(['changeDateRange']);
const props = defineProps({
	selectedDates: {
		type: Object,
		default: () => {
			return [
				{
					date: '',
					class: '',
					style: '',
					clickFun: data => {}
				}
			];
		}
	}
});

onMounted(() => {
	let dd = getFirstAndLastDayOfMonth(new Date());
	emit('changeDateRange', dd);
});

const calendar = ref();

const today = getCurrentDateFormatted(new Date());
const selectDate = val => {
	calendar.value.selectDate(val);
	// console.log(val);
	// console.log(calendar.value.selectedDay.$d);
	// console.log(getFirstAndLastDayOfMonth(calendar.value.selectedDay.$d));
	if (calendar.value.selectedDay?.$d) {
		let dd = getFirstAndLastDayOfMonth(calendar.value.selectedDay?.$d);
		// console.log(dd);
		emit('changeDateRange', dd);
	}
};
function getCurrentDateFormatted(date) {
	const now = new Date(date);

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以需要加1
	const day = String(now.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

// 使用示例
//const currentDateFormatted = getCurrentDateFormatted();

const selectDateObj = computed(() => {
	let obj = {};
	props.selectedDates.forEach(e => {
		obj[getCurrentDateFormatted(e.date)] = e;
	});
	return obj;
});

function getFirstAndLastDayOfMonth(inputDate) {
	// 解析输入日期
	const date = new Date(inputDate);
	if (isNaN(date.getTime())) {
		throw new Error('Invalid date input.');
	}

	const year = date.getFullYear();
	const month = date.getMonth(); // 注意：月份是从 0 开始的

	// 获取当月的第一天
	const firstDay = new Date(year, month, 1);

	// 获取当月的最后一天
	const lastDay = new Date(year, month + 1, 0);

	// 获取今天的日期
	const today = new Date();

	// 格式化日期
	function formatDate(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
		const day = String(date.getDate()).padStart(2, '0'); // 补零
		return `${year}-${month}-${day}`;
	}

	// 返回格式化的日期数组
	return [formatDate(firstDay), formatDate(lastDay), formatDate(today)];
}
</script>
<style lang="scss" scoped>
.selected {
	background-color: red;
}
.gz-calendar {
	min-height: 280px;
	.header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		& > * {
			flex: 1;
		}
		.el-icon {
			opacity: 0.5;
			font-size: 14px;
		}
		.el-icon:hover {
			opacity: 1;
		}
	}
	:deep(.el-calendar) {
		font-weight: 400;
		font-size: 12px;
		thead th {
			padding: 8px 0;
			font-weight: 400;
			font-size: 12px;
			color: #303133;
		}
		td,
		th {
			border: none;
		}
		td {
			cursor: default;
			background: initial;

			span {
				display: inline-block;
				padding: 2px 5px;
				min-width: 24px;
				border-radius: 20px;
				cursor: default;
			}

			&.is-today {
				span {
					background-color: rgba(55, 124, 253, 0.3);
					color: #fff;
					cursor: pointer;
				}
			}
		}
		.tag-selected,
		.is-today {
			// display: inline-block;
			padding: 2px 5px;
			// min-width: 24px;
			border-radius: 20px;
			color: initial;
			position: relative;
			cursor: pointer;
			.point {
				content: '';
				position: absolute;
				bottom: -6px;
				height: 4px;
				width: 4px;
				border-radius: 20px;
				left: 10px;
				display: none;
			}
		}
		.tag-selected {
			display: inline-block;
			min-width: 24px;
		}
		.is-selected {
			.point {
				display: block;
			}
		}
		.el-calendar__body {
			padding-bottom: 10px;
			padding-top: 3px;
		}
		.el-calendar-day {
			text-align: center;
			height: auto;
			cursor: default;
			padding: 4px;
		}
		.el-calendar-day:hover {
			background: initial;
		}
	}
}
</style>
