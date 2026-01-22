<template>
	<div class="gz-audit-operation flex-center-horizontal" v-if="showList.length">
		<template v-for="(item, index) in lists" :key="item.icon">
			<div class="audit-type" v-if="!dialogModel && showList.includes(item.text)" @click="item.fun(item, index)">
				<img :src="item.icon" />
				<p>{{ item.text }}</p>
			</div>

			<!-- 同意 拒绝 -->
			<el-dialog
				v-if="['同意', '拒绝'].includes(item.text)"
				v-model="item.dialogVisible"
				:title="item.title"
				width="642px"
				:before-close="handleClose"
				:show-close="false"
				class="gz-dialog-form"
				append-to-body
				destroy-on-close
			>
				<div class="gz-dialog-form-cust">
					<p class="gz-dialog-form-cust-tit mb-10">{{ props.textConfig.topic }}</p>
					<el-radio-group v-model="item.type" is-button>
						<el-radio-button value="同意">{{ props.textConfig.btns[0] }}</el-radio-button>
						<el-radio-button value="拒绝">{{ props.textConfig.btns[1] }}</el-radio-button>
					</el-radio-group>
					<p class="gz-dialog-form-cust-tit mt-24 mb-10">
						{{ props.textConfig.remarkTit }} <span>（{{ item.type == '同意' ? '可选填' : '必填' }}）</span>
					</p>
					<el-input
						v-model="item.remark"
						:rows="5"
						:autosize="false"
						type="textarea"
						:placeholder="props.textConfig.remarkPlaceholder || `请输入详细内容`"
					/>
					<p v-if="props.textConfig.selectMember" class="gz-dialog-form-cust-tit mt-24 mb-10">
						{{ props.textConfig.memberTit }} <span>（可选填）</span>
					</p>
					<gz-select-member
						v-if="props.textConfig.selectMember"
						:multiple="true"
						:selected="item.people"
						@change="
							data => {
								item.people = data.map(item => item.id);
							}
						"
					/>
				</div>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="item.dialogVisible = false">关 闭</el-button>
						<el-button type="primary" @click="item.ok(item, index)">确 定</el-button>
					</span>
				</template>
			</el-dialog>
		</template>
	</div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import GzSelectMember from '@/components/GzSelectMember';
import { useRoute } from 'vue-router';
const { proxy } = getCurrentInstance();
const route = useRoute();
const id = route.query.id;
const emit = defineEmits(['agree', 'reject', 'warning', 'comment', 'revoke', 'change']);
const props = defineProps({
	showLists: {
		type: Array,
		default: () => ['同意', '拒绝']
		// default: () => ['同意', '拒绝', '提醒', '评论', '撤回']
	},
	dialogModel: {
		type: Boolean,
		default: false
	},
	textConfig: {
		type: Object,
		default: () => {
			return {
				title: '登记预审',
				topic: '审批结果',
				btns: ['通过', '不通过'],
				remarkTit: '原因',
				remarkPlaceholder: '请填写原因',
				selectMember: false,
				memberTit: '抄送'
			};
		}
	}
});
const showList = ref([...props.showLists]);
const lists = ref([
	{
		text: '同意',
		value: 'agree',
		icon: new URL('@/assets/icons/other/21013@2x.png', import.meta.url).href,
		dialogVisible: false,
		fun: (item, index) => {
			item.dialogVisible = true;
			item.type = '同意';
		},
		ok: (item, index) => {
			item.dialogVisible = false;
			item.type == '同意' ? emit('agree', item) : emit('reject', item);
			emit('change', item);
		},
		title: props.textConfig.title,
		type: '同意',
		remark: '',
		people: []
	},
	{
		text: '拒绝',
		value: 'reject',
		icon: new URL('@/assets/icons/other/21273@2x.png', import.meta.url).href,
		dialogVisible: false,
		fun: (item, index) => {
			item.dialogVisible = true;
			item.type = '拒绝';
		},
		ok: (item, index) => {
			item.dialogVisible = false;
			item.type == '同意' ? emit('agree', item) : emit('reject', item);
			emit('change', item);
		},
		title: props.textConfig.title,
		type: '拒绝',
		remark: '',
		people: []
	}
]);

const handleClose = done => {};

const showType = type => {
	let curItem = lists.value.filter(e => type == e.text).shift();
	curItem.fun(curItem);
	return new Promise((resolve, reject) => {
		curItem.ok = curItem => {
			emit('change', curItem);
			resolve(curItem);
		};
	});
};

onMounted(() => {});
defineExpose({ showType });
</script>

<style lang="scss" scoped>
.gz-audit-operation {
	position: absolute;
	bottom: 15px;
	left: 0;
	right: 0;
	z-index: 99;
}
.gz-audit-operation {
	.audit-type {
		margin-left: 30px;
		& > .svg-icon,
		& > img {
			height: 60px;
			width: 60px;
			cursor: pointer;
		}
		p {
			font-size: 14px;
			color: #333333;
			height: 22px;
			line-height: 22px;
			text-align: center;
		}
	}

	:deep(.el-radio-button__inner) {
		padding: 10px 50px;
		box-shadow: none;
		&:hover {
			color: inherit;
		}
	}
	:deep(.el-radio-group) {
		.el-radio-button {
			&.is-active .el-radio-button__inner {
				background: #e8faeb;
				border-radius: 6px 0px 0px 6px;
				border: 1px solid #14cc33;
				font-size: 14px;
				color: #14cc33;
			}
		}
		.el-radio-button:last-child {
			&.is-active .el-radio-button__inner {
				background: #ffeae8;
				border-radius: 0px 6px 6px 0px;
				font-size: 14px;
				color: #fa2c19;
				border: 1px solid #fa2c19;
			}
		}
	}
}
.flex-center-horizontal {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
