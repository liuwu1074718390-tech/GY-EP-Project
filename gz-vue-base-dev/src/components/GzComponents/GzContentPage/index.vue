<template>
	<div class="hw100 gz-content-page">
		<gz-top-nav-title v-if="showTitle" :showBackBtn="showBackBtn" :title="title" :level="level" />
		<div class="card-container">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GzTopNavTitle from '@/components/GzTopNavTitle';
const router = useRouter();
defineProps({
	showTitle: {
		type: Boolean,
		default: true
	},
	showBackBtn: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		default: ''
	},
	level: {
		type: Number,
		default: 0
	}
});
</script>

<style scoped lang="scss">
.gz-content-page {
	.card-container {
		position: absolute;
		top: $saas-top-nav-height;
		bottom: 0;
		width: 100%;
		background: inherit !important;
		padding: 20px;
		margin-top: 20px;
		padding: 0 !important;
		overflow: auto;
	}
}
</style>
