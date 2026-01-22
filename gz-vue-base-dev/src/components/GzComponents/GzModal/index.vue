<template>
	<Teleport :to="el" v-if="show">
		<div class="gz-mask" :style="`z-index:${zIndex}`">
			<div class="gz-modal" :style="modalStyle">
				<slot></slot>
			</div>
		</div>
	</Teleport>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	width: {
		type: String || Number,
		default: 500
	},
	height: {
		type: String || Number,
		default: 500
	},
	minWidth: {
		type: Number,
		default: 800
	},
	minHeight: {
		type: Number,
		default: 650
	},
	el: {
		type: String,
		default: '#app'
	},
	zIndex: {
		type: Number || String,
		default: 100
	}
});

const modalStyle = computed(() => {
	return {
		width: Number.isFinite(+props.width) ? props.width + 'px' : props.width,
		height: Number.isFinite(+props.height) ? props.height + 'px' : props.height,
		minWidth: props.minWidth + 'px',
		minHeight: props.minHeight + 'px'
	};
});
</script>

<style scoped lang="scss">
.gz-mask {
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.3);
	position: absolute;
	z-index: 100;
}

.gz-modal {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: #ffffff;
	box-shadow: 0px 20px 30px 0px rgba(63, 63, 65, 0.06);
	border-radius: 30px 30px 30px 30px;
}
#app > .gz-mask,
body > .gz-mask {
	position: fixed;
}
</style>
