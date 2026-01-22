<template>
	<!-- <el-button v-if="test" @click="print">打印</el-button> -->
	<div style="border: 1px solid #ebebeb; width: 100%">
		<Toolbar style="border-bottom: 1px solid #ebebeb" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
		<Editor
			style="height: 500px; overflow-y: hidden"
			v-model="inputValue"
			:defaultConfig="editorConfig"
			:mode="mode"
			@onCreated="handleCreated"
		/>
	</div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { DomEditor } from '@wangeditor/editor';
import { computed, onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: '请输入...'
	},
	editorConfig: {
		type: Object,
		default: () => {
			return {
				readOnly: false
			};
		}
	},
	toolbarConfig: {
		type: Object,
		default: () => {
			return {};
		}
	}
});
const inputValue = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	}
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = ref('default');
const test = ref(false);
const editorConfig = Object.assign(props.editorConfig, {
	placeholder: props.placeholder
});
// 默认工具栏配置
const toolbarConfig = Object.assign({}, props.toolbarConfig);

/** 排除菜单组，写菜单组 key 的值即可 */
toolbarConfig.excludeKeys = ['group-image', 'group-video', 'fullScreen'];

onMounted(() => {});

/** 组件销毁时，也及时销毁编辑器 */
onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});

/** 记录 editor 实例，重要！*/
const handleCreated = editor => {
	editorRef.value = editor;
};
const print = () => {
	const toolbar = DomEditor.getToolbar(editorRef.value);
	const curToolbarConfig = toolbar.getConfig();
	console.log(curToolbarConfig.toolbarKeys); // 当前菜单排序和分组

	// const menu = editorRef.value.getAllMenuKeys()
	// console.log(menu)
	// console.log(editorRef.value.getMenuConfig('bgColor'))
	// console.log(valueHtml.value)
};

/** 获取HTML格式内容方法 */
const getHtml = () => {
	return editorRef.value.getHtml();
};

/** 获取原始文本内容方法 */
const getText = () => {
	return editorRef.value.getText();
};

/** 暴露方法 */
defineExpose({ getHtml, getText });
</script>

<style scoped lang="scss">
.el-button {
	margin: 1%;
}
</style>
