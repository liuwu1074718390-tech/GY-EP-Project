<template>
	<div class="gz-column-one">
		<div class="title flex-space-between">
			<h2 class="f-21 f-700">{{ Props.title }}</h2>
			<p class="f-16 flex-center-horizontal mr-5">
				<slot name="header"></slot>
			</p>
		</div>
		<slot></slot>
	</div>
</template>

<script setup name="GzColumnOne">
import { ref, computed } from 'vue';
const Props = defineProps({
	title: {
		type: String,
		default: ''
	}
});
</script>

<style scoped lang="scss">
.gz-column-one {
	padding: 20px;
	height: 100%;
	width: 100%;
	position: relative;
}
</style>
