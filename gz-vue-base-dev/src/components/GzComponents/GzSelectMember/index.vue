<template>
	<div class="gz-select-member" v-loading="loading">
		<div class="label-wrapper">
			<el-button
				type="primary"
				style="margin-right: 12px"
				:disabled="props.maxMember != 0 && selectedList.length >= props.maxMember"
				@click="show = true"
			>
				<el-icon style="margin-right: 4px"><Plus /></el-icon>添加成员
			</el-button>
			<div v-for="(item, index) in selectedList" :key="item.id" class="label-item">
				{{ item.name }}
				<el-icon :size="16" class="label-close" @click="deleteMember(index)"><Close /></el-icon>
			</div>
		</div>
		<gz-select-member-dialog
			v-if="show"
			v-model="show"
			:selected="selectedList"
			:multiple="true"
			:title="title"
			:maxMember="maxMember"
			@change="change"
		/>
	</div>
</template>
<script setup>
import GzSelectMemberDialog from '@/components/GzSelectMemberDialog';
import { nextTick, onMounted, ref, watch } from 'vue';

const show = ref(false);
const model = ref({});
const selectedList = ref([]);

const props = defineProps({
	selected: {
		type: Object,
		default: () => {
			return { name: '', id: '' };
		}
	},
	title: {
		type: String,
		default: '选择成员'
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
	maxMember: {
		type: Number,
		default: 0
	}
});

model.value = props.selected;
selectedList.value = props.selected.map(item => {
	return {
		id: item.handleBy,
		name: item.handleName
	};
});
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
	selectedList.value = dd;
	emit('change', selectedList.value);
};

const deleteMember = index => {
	selectedList.value.splice(index, 1);
	emit('change', selectedList.value);
};
</script>
<style lang="scss" scoped>
.flex-space-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.gz-select-member {
	width: 100%;
	:deep(.el-input.is-disabled) {
		cursor: default;
		.el-input__inner {
			cursor: default;
		}
	}
}

.label-wrapper {
	display: flex;
	flex-wrap: wrap;

	.label-item {
		height: 32px;
		background: #f5f7fa;
		border-radius: 4px;
		margin-right: 12px;
		font-weight: 400;
		font-size: 14px;
		color: #333333;
		line-height: 32px;
		padding: 0 8px 0 12px;
		margin-bottom: 8px;
	}

	.label-close {
		transform: translateY(3px);
		cursor: pointer;
		opacity: 0.5;
		&:hover {
			opacity: 1;
		}
	}
}
</style>
