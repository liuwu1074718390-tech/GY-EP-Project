<template>
	<div style="width: 100%">
		<el-select v-model="state.params.province" placeholder="请选择" clearable :style="`width: ${selectWidth}`">
			<el-option v-for="item in state.showData.province" :key="item.adCode" :label="item.name" :value="item.adCode"
		/></el-select>
		<el-select
			v-model="state.params.city"
			placeholder="请选择"
			:style="`width: ${selectWidth}; margin-left: 8px`"
			:disabled="!state.params.province"
			clearable
		>
			<el-option v-for="item in state.showData.cities" :key="item.adCode" :label="item.name" :value="item.adCode"
		/></el-select>
		<el-select
			v-model="state.params.area"
			placeholder="请选择"
			:style="`width: ${selectWidth}; margin-left: 8px`"
			:disabled="!state.params.province || !state.params.city"
			clearable
		>
			<el-option v-for="item in state.showData.areas" :key="item.adCode" :label="item.name" :value="item.adCode"
		/></el-select>
	</div>
</template>

<script setup>
import { reactive, computed, onBeforeMount, watch, nextTick } from 'vue';
// import areaData1 from '@/assets/my-area/area.json';
// const areaData = JSON.parse(sessionStorage.getItem('areaData'));
import useJsonDataStore from '@/store/modules/json-data';
const areaData = useJsonDataStore().areaData;

const props = defineProps({
	code: {
		type: String,
		default: ''
	},
	selectWidth: {
		type: String,
		default: '90px;'
	}
});

let _code = props.code + '';

const emits = defineEmits();

const state = reactive({
	// 用于展示的省市区数据
	showData: {
		province: [],
		cities: [],
		areas: []
	},
	// 最终选择的省市区
	params: {
		province: undefined,
		city: undefined,
		area: undefined
	}
});

onBeforeMount(() => {
	state.showData.province = areaData.map(item => ({ adCode: item.adCode, name: item.name }));

	if (_code) {
		const result = traceUp(_code, areaData);

		state.params.province = result?.provinceCode;
		state.params.city = result?.cityCode;
		state.params.area = _code;
		nextTick(() => {
			_code = null;
		});
	}
});
state.showData.cities = computed(() => {
	return areaData.find(item => item.adCode === state.params.province)?.childList;
});
state.showData.areas = computed(() => {
	return state.showData.cities?.find(item => item.adCode === state.params.city)?.childList;
});

watch(
	() => state.params.province,
	val => {
		if (!_code) {
			state.params.city = undefined;
			state.params.area = undefined;
		}

		const paramsData = {
			province: {},
			city: {},
			area: {}
		};

		if (val) {
			let tmp = areaData.find(item => item.adCode === state.params.province);
			paramsData.province.name = tmp?.name;
			paramsData.province.adCode = tmp?.adCode;
		}

		emits('areaChange', paramsData);
	}
);
watch(
	() => state.params.city,
	val => {
		if (!_code) {
			state.params.area = undefined;
		}

		const paramsData = {
			province: {},
			city: {},
			area: {}
		};
		let tmp = areaData.find(item => item.adCode === state.params.province);
		paramsData.province.name = tmp?.name;
		paramsData.province.adCode = tmp?.adCode;

		if (val) {
			tmp = tmp?.childList.find(item => item.adCode === state.params.city);
			paramsData.city.name = tmp?.name;
			paramsData.city.adCode = tmp?.adCode;
		}

		emits('areaChange', paramsData);
	}
);
watch(
	() => state.params.area,
	val => {
		const paramsData = {
			province: {},
			city: {},
			area: {}
		};

		let tmp = areaData.find(item => item.adCode === state.params.province);
		paramsData.province.name = tmp?.name;
		paramsData.province.adCode = tmp?.adCode;
		tmp = tmp?.childList.find(item => item.adCode === state.params.city);
		paramsData.city.name = tmp?.name;
		paramsData.city.adCode = tmp?.adCode;

		if (val) {
			tmp = tmp?.childList.find(item => item.adCode === state.params.area);
			paramsData.area.name = tmp?.name;
			paramsData.area.adCode = tmp?.adCode;
		}

		emits('areaChange', paramsData);
	}
);

// 辅助函数，用于递归查找区域
function findRegion(code, regions) {
	for (const region of regions) {
		if (region.adCode == code) {
			return region;
		}
		if (region.childList) {
			const found = findRegion(code, region.childList);
			if (found) {
				return found;
			}
		}
	}
	return null;
}

// 向上追溯parentCode以找到省市编码
function traceUp(code, regions) {
	const areaRegion = findRegion(code, regions);

	if (!areaRegion) {
		return null; // 没有找到对应的区域
	}

	const cityCode = areaRegion.parentAdCode;
	const cityRegion = findRegion(cityCode, regions);
	const provinceCode = cityRegion.parentAdCode;

	return {
		provinceCode,
		cityCode
	};
}
function reset(code) {
	state.params.province = null;
	state.params.city = null;
	state.params.area = null;
}
defineExpose({ reset });
</script>
