<template>
	<el-select v-model="selected" :multiple="multi" placeholder="请选择角色" value-key="id" @change="handleSelectChange">
		<el-option v-for="item in lists" :key="item.id" :label="item.name" :value="item"></el-option>
	</el-select>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { roleList } from '@/api/enterprise/roles';

const emit = defineEmits(['change']);

const props = defineProps({
	value: {
		type: Array,
		default: () => []
	},
	multi: {
		type: Boolean,
		default: true
	},
	roleData: {
		type: Object,
		default: () => {}
	}
});

const selected = ref(props.multi ? [...props.value] : props.value.join(''));

const lists = ref([]);

const getList = () => {
	if (props.roleData.length) {
		lists.value = props.roleData;
		return;
	}
	roleList({ name: '' }).then(res => {
		lists.value = res.data;
	});
};

const reset = () => {
	// selected.value = [];
};

const handleSelectChange = data => {
	emit('change', selected.value);
};

onMounted(() => {
	getList();
});

defineExpose({
	reset
});
</script>
