<template>
	<GzCopyToClipboard
		:content="staticText"
		:contentSource="async () => await fetchDynamicText()"
		buttonText="复制动态内容"
		successText="动态内容已复制！"
		errorText="动态复制失败"
		feedbackDuration="3000"
	/>
</template>

<script setup>
import CopyToClipboard from './GzCopyToClipboard.vue';
import { ref } from 'vue';

const staticText = ref('这是一段静态文案');
</script>
