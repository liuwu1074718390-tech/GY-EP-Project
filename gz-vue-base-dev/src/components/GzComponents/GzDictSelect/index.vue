<template>
	<el-select
		v-model="formData"
		:placeholder="`请选择${props.title}`"
		clearable
		filterable
		style="width: 160px"
		@change="changeData()"
	>
		<el-option v-for="dict in dataList" :key="dict.dictLabel" :label="dict.dictLabel" :value="dict.dictValue" />
	</el-select>
</template>

<script setup>
import { ref, watch, toRefs, onMounted } from 'vue';
import { getDicts } from '@/api/system/dict/data';
const emit = defineEmits(['update:modelValue']);
const formData = ref('');
const dataList = ref([]);
const props = defineProps({
	modelValue: String,
	title: {
		type: String,
		default: () => {
			return '';
		}
	},
	type: {
		type: String,
		default: () => {
			return '';
		}
	}
});
const modelValueT = toRefs(props).modelValue;
onMounted(() => {
	formData.value = modelValueT.value;
	init();
});

watch(modelValueT, (newValue, oldValue) => {
	console.log(modelValueT, newValue, oldValue);
	formData.value = newValue;
});

function changeData() {
	emit('update:modelValue', formData.value);
}

function init() {
	getDicts(props.type).then(response => {
		dataList.value = response.data;
	});
}
</script>
