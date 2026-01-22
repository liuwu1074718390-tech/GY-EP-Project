<template>
	<div class="gz-select-member-btn" v-loading="loading">
		<div class="flex-space-between">
			<el-input v-model="model.name" disabled :placeholder="props.placeholder" />
			<el-button type="primary" class="ml-15" @click="show = true">选择</el-button>
		</div>
		<gz-select-member-dialog
			v-if="show"
			v-model="show"
			:selected="selArry"
			:multiple="multiple"
			:title="title"
			@change="change"
		/>
	</div>
</template>
<script setup>
import GzSelectMemberDialog from '@/components/GzSelectMemberDialog';
import { nextTick, onMounted, ref, watch } from 'vue';
const show = ref(false);
const model = ref({});
const props = defineProps({
	selected: {
		type: Object,
		default: () => {
			return { name: '', id: '' };
		}
	},
	title: {
		type: String,
		default: '选择人员'
	},
	multiple: {
		type: Boolean,
		default: false
	},
	idKey: {
		//
		type: String,
		default: 'id'
	},
	nameKey: {
		type: String,
		default: 'name'
	},
	placeholder: {
		type: String,
		default: '请选择人员'
	}
});
// console.log(props.selected);
model.value = props.selected;
const selArry = [];
let names = (props.selected.name + '').split(',');
let ids = (props.selected.id + '').split(',');
for (let v in ids) {
	selArry.push({ id: ids[v], name: names[v] });
}
const emit = defineEmits(['change']);
let loading = ref(false);
const change = dd => {
	show.value = false;
	let ids = [],
		names = [];
	dd.forEach(e => {
		ids.push(e[props.idKey]);
		names.push(e[props.nameKey]);
	});
	model.value = { id: ids.join(','), name: names.join(',') };
	emit('change', model.value);
};
const tableData = ref([]);
</script>
<style lang="scss" scoped>
.flex-space-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.gz-select-member-btn {
	width: 100%;
	:deep(.el-input.is-disabled) {
		cursor: default;
		.el-input__inner {
			cursor: default;
		}
	}
}
</style>
