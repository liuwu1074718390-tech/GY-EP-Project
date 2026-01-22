<template>
	<div class="app-container home"></div>
</template>

<script setup name="Index">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
	router.push('/workbench');
});
</script>

<style scoped lang="scss"></style>
