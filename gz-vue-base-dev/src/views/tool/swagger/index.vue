<template>
	<i-frame v-model:src="url"></i-frame>
</template>

<script setup>
import { ref } from 'vue';
import IFrame from '@/components/IFrame';

const url = ref(import.meta.env.VITE_APP_BASE_API + '/');
// const url = ref('http://baidu.com');
</script>
