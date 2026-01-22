<template>
	<div class="copy-container">
		<!-- 模式选择逻辑 -->
		<template v-if="mode === 'text'">
			<span
				class="copy-text"
				@click="handleTextClick"
				:title="`点击复制：${textToCopy}`"
				:aria-label="`点击复制文案：${textToCopy}`"
			>
				{{ textToCopy }}
			</span>
		</template>

		<template v-else-if="mode === 'button'">
			<el-button
				:type="props.btnType"
				:class="buttonClass"
				:disabled="!canCopy"
				@click="handleButtonClick"
				:aria-label="`复制到剪贴板：${textToCopy}`"
			>
				<slot>{{ buttonText }}</slot>
			</el-button>
		</template>

		<!-- 反馈提示 -->
		<div v-if="showFeedback" class="feedback" :class="{ success: isSuccess, error: !isSuccess }">
			{{ feedbackMessage }}
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
	content: { type: String, default: '' },
	contentSource: { type: Function, default: null },
	buttonText: { type: String, default: '复制到剪贴板' },
	buttonClass: { type: [String, Array, Object], default: '' },
	successText: { type: String, default: '复制成功！' },
	errorText: { type: String, default: '复制失败，请重试。' },
	feedbackDuration: { type: Number, default: 2000 },
	mode: { type: String, default: 'button', validator: value => ['button', 'text'].includes(value) },
	btnType: { type: String, default: 'default' } // 新增模式属性[1,3](@ref)
});

const textToCopy = ref('');
const canCopy = ref(false);
const showFeedback = ref(false);
const isSuccess = ref(false);
const feedbackMessage = ref('');

const computedText = computed(() => {
	return typeof props.contentSource === 'function' ? props.contentSource() : props.content;
});

watch(
	computedText,
	async newText => {
		textToCopy.value = newText;
		canCopy.value = !!newText;
	},
	{ immediate: true }
);

const handleTextClick = async () => {
	await copyText(textToCopy.value);
};

const handleButtonClick = async () => {
	await copyText(textToCopy.value);
};

const copyText = async text => {
	try {
		await navigator.clipboard.writeText(text);
		isSuccess.value = true;
		feedbackMessage.value = props.successText;
	} catch (error) {
		const textarea = document.createElement('textarea');
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		try {
			document.execCommand('copy');
			isSuccess.value = true;
			feedbackMessage.value = props.successText;
		} catch (execError) {
			isSuccess.value = false;
			feedbackMessage.value = props.errorText;
		} finally {
			document.body.removeChild(textarea);
		}
	} finally {
		showFeedback.value = true;
		setTimeout(() => {
			showFeedback.value = false;
		}, props.feedbackDuration);
	}
};

const showButton = computed(() => {
	return props.mode === 'button' && !!props.buttonText && canCopy.value;
});
</script>

<style scoped>
.copy-container {
	display: flex;
	align-items: center;
	gap: 8px;
}

.copy-text {
	cursor: pointer;
	user-select: all;
	color: #1890ff;
	margin-right: 8px;
}

.button {
	padding: 4px 12px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.feedback {
	margin-left: 8px;
	padding: 4px 8px;
	border-radius: 4px;
	transition: opacity 0.3s;
}

.success {
	background-color: #edf7ff;
	color: #1890ff;
}

.error {
	background-color: #fff1f0;
	color: #ff4d4f;
}
</style>
