<template>
	<div class="main-contant">
		<div v-if="Props.leftWidth" :style="`width:${Props.leftWidth}`" class="left-contant">
			<slot name="left"></slot>
		</div>
		<div v-else :style="`right:${_leftWidth}`" class="left-contant">
			<slot name="left"></slot>
		</div>

		<div v-if="Props.rightWidth" :style="`width:${Props.rightWidth}`" class="right-sider">
			<slot name="right"></slot>
		</div>

		<div v-else :style="`left:${_rightWidth}`" class="right-sider">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script setup name="GzTwoColumn">
import { ref, computed } from 'vue';
const Props = defineProps({
	rightWidth: {
		type: String,
		default: ''
	},
	gutter: {
		type: String,
		default: '24px'
	},
	leftWidth: {
		type: String,
		default: ''
	}
});

let _leftWidth = computed(() => parseInt(Props.rightWidth) + parseInt(Props.gutter) + 'px');
let _rightWidth = computed(() => parseInt(Props.leftWidth) + parseInt(Props.gutter) + 'px');
</script>

<style scoped lang="scss">
.main-contant {
	height: 100%;
	position: relative;
}
.left-contant {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;

	// right: 350px;
	overflow: auto;
}
.right-sider {
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;

	// width: 330px;
	overflow: auto;
}
</style>
