<template>
	<div class="gz-list-null-tips">
		<slot v-if="model"></slot>

		<div v-if="!model" class="flex-center-all no-data">
			<div>
				<slot name="nullData">
					<svg-icon :style="`width:${size}px; height:${size}px`" :icon-class="icon" />
					<p :style="`font-size:${fontSize ? fontSize + 'px' : size / 70 + 'em'}`" class="color-info text-c mt-10">{{ text }}</p>
				</slot>
			</div>
		</div>
	</div>
</template>
<script setup>
const model = defineModel({
	type: Number || Boolean,
	default: true
});
defineProps({
	size: {
		type: Number,
		default: 70
	},
	text: {
		type: String,
		default: '暂无数据'
	},
	icon: {
		type: String,
		default: 'qs-05'
	},
	fontSize: {
		type: Number,
		default: null
	}
});
</script>
<style lang="scss" scoped>
.gz-list-null-tips {
	width: 100%;
	height: 100%;
	min-height: 100px;
	font-size: 13px;

	.no-data {
		width: 100%;
		height: 100%;
		padding-top: 40px;
		& > div {
			font-size: 13px;
			text-align: center;
		}
	}
}
</style>
