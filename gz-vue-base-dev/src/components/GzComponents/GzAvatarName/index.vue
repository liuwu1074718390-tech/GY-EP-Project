<template>
	<div class="gz-avatar-name" :style="`background:${bgColor}`">
		<img :style="`width:${size}px;height:${size}px;margin-right:${gap}px`" :src="imgUrl || img" />
		<span :style="`font-size:${fontSizs}px`">{{ name }} <slot></slot></span>
	</div>
</template>
<script setup>
import img from '@/assets/icons/other/head-icon-user@2x.png';
defineProps({
	bgColor: {
		type: String,
		default: '#f5f7fa'
	},
	imgUrl: {
		type: String,
		default: img
	},
	name: {
		type: String,
		default: ''
	},
	size: {
		type: Number,
		default: 18
	},
	fontSizs: {
		type: Number,
		default: 14
	},
	gap: {
		type: Number,
		default: 5
	}
});
</script>
<style lang="scss" scoped>
.gz-avatar-name {
	// background: #f5f7fa;
	border-radius: 61px 61px 61px 61px;
	display: inline-block;
	padding: 2px 8px 2px 0;
	margin-right: 10px;
	margin-top: 10px;
	font-size: 14px;

	img {
		border-radius: 30px;
		margin-right: 3px;
		position: relative;
		top: -1px;
	}
	span {
		display: inline-block;
		vertical-align: middle;
	}
}
</style>
