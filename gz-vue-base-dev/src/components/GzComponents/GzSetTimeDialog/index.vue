<template>
	<el-dialog
		v-model="model"
		:title="props.title"
		width="642px"
		:show-close="false"
		class="gz-dialog-form"
		append-to-body
		destroy-on-close
	>
		<div class="gz-dialog-form-cust">
			<div class="timer">
				<p class="f-16">{{ props.timeDesc }}</p>
				<div class="f-38">{{ showTime }}</div>
			</div>
		</div>
		<div class="gz-dialog-form-cust mt-40 mb-10 text-l">
			<span>{{ props.timeDesc }}</span>
			<p class="d-lb ml-8 mr-8 pos-r">
				<span class="default" v-if="props.defaultTime == time">(默认)</span>
				<el-input class="pos-r" v-model="time" type="number" style="width: 120px" placeholder="请输入" />
			</p>
			<span>分钟</span>
		</div>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="model = false">稍后操作</el-button>
				<el-button type="primary" @click="ok">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
const model = defineModel({
	type: Boolean,
	default: true
});
const props = defineProps({
	title: {
		type: String,
		default: '设置时间'
	},
	timeDesc: {
		type: String,
		default: '限制时间'
	},
	defaultTime: {
		type: Number,
		default: 30
	},
	miniTime: {
		type: Number,
		default: 5
	}
});
// console.log(props);

const emit = defineEmits(['change']);
const time = ref(props.defaultTime);
const showTime = computed(() => convertMinutesToTime(time.value));
const ok = () => {
	if (time.value < props.miniTime) {
		ElMessage.error(props.timeDesc + '最少为' + props.miniTime + '分钟');
		return;
	}
	model.value = false;
	emit('change', { time: time.value });
};
function convertMinutesToTime(minutes) {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = Math.floor(minutes % 60);
	const seconds = 0;

	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(remainingMinutes).padStart(2, '0');
	const formattedSeconds = String(seconds).padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
</script>
<style lang="scss" scoped>
.timer {
	border-radius: 6px 6px 6px 6px;
	border: 1px solid #e9ecf0;
	padding: 16px;
	text-align: center;
	& > p {
		font-family:
			Microsoft YaHei UI,
			Microsoft YaHei UI;
		font-weight: 400;
		font-size: 16px;
		color: #333333;
		line-height: 24px;
		padding-bottom: 8px;
	}
	& > div {
		font-family:
			DIN Alternate,
			DIN Alternate;
		font-weight: 400;
		font-size: 38px;
		color: #333333;
		line-height: 24px;
		padding: 8px;
	}
}
:deep(.el-input__wrapper) {
	background-color: rgba(255, 255, 255, 0) !important;
}
.default {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 40px;
	opacity: 0.7;
}
</style>
