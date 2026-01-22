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
	</div>
</template>

<script setup>
import { reactive, computed, onBeforeMount, watch } from 'vue';
// import areaData1 from '@/assets/my-area/area.json';
import useJsonDataStore from '@/store/modules/json-data';
const areaData = useJsonDataStore().areaData;

const props = defineProps({
	code: {
		type: String,
		default: ''
	},
	selectWidth: {
		type: String,
		default: '130px;'
	}
});

let _code = props.code + '';

const emits = defineEmits();

const state = reactive({
	// 用于展示的省市数据
	showData: {
		province: [],
		cities: []
	},
	// 最终选择的省市
	params: {
		province: undefined,
		city: undefined
	}
});

onBeforeMount(() => {
	console.log('[areaData.value]: ', areaData);
	state.showData.province = areaData.map(item => ({ adCode: item.adCode, name: item.name }));

	if (_code) {
		console.log('[code]', _code);
		const result = traceUp(_code, areaData);
		console.log('[result]', result);

		state.params.province = result?.cityCode;
		state.params.city = _code;
	}
});
state.showData.cities = computed(() => {
	return areaData.find(item => item.adCode === state.params.province)?.childList;
});
state.showData.areas = computed(() => {
	return state.showData.cities?.find(item => item.adCode === state.params.city)?.childList;
});

watch(
	() => state.params.city,
	val => {
		console.log('change', val);
		// 区有值的时候，省市必定有值，此时就可以将数据返回给父组件
		if (val) {
			const paramsData = {
				province: {},
				city: {}
			};
			let tmp = areaData.find(item => item.adCode === state.params.province);
			paramsData.province.name = tmp?.name;
			paramsData.province.adCode = tmp?.adCode;
			tmp = tmp?.childList.find(item => item.adCode === state.params.city);
			paramsData.city.name = tmp?.name;
			paramsData.city.adCode = tmp?.adCode;

			emits('areaChange', paramsData);
		} else {
			const paramsData = {
				province: {},
				city: {}
			};
			paramsData.city.adCode = undefined;
			paramsData.province.adCode = undefined;
			emits('areaChange', paramsData);
		}
	}
);
watch(
	() => state.params.province,
	v => {
		console.log('change', v);
		if (v) {
			const paramsData = {
				province: {},
				city: {}
			};
			let tmp = areaData.find(item => item.adCode === state.params.province);
			paramsData.province.name = tmp?.name;
			paramsData.province.adCode = tmp?.adCode;
			tmp = tmp?.childList.find(item => item.adCode === state.params.city);
			paramsData.city.name = tmp?.name;
			paramsData.city.adCode = tmp?.adCode;

			emits('areaChange', paramsData);
		} else {
			const paramsData = {
				province: {},
				city: {}
			};
			paramsData.city.adCode = undefined;
			paramsData.province.adCode = undefined;
			emits('areaChange', paramsData);
		}
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
