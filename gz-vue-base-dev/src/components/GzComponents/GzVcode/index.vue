<!-- https://gitee.com/laelzzl/vue-puzzle-vcode/blob/master/README3.md -->

<template>
	<Vcode :show="isShow" @success="success" @close="close" @fail="fail" :imgs="imgList"></Vcode>
</template>
<script setup>
import Vcode from 'vue3-puzzle-vcode';
import Img1 from '@/assets/vcode/v1.jpg';
import Img2 from '@/assets/vcode/v2.jpg';
import Img3 from '@/assets/vcode/v3.jpg';
import Img4 from '@/assets/vcode/v4.jpg';
import Img5 from '@/assets/vcode/v5.jpg';
import Img6 from '@/assets/vcode/v6.jpg';
import Img7 from '@/assets/vcode/v7.jpg';
import Img8 from '@/assets/vcode/v8.jpg';
import Img9 from '@/assets/vcode/v9.jpg';
import Img0 from '@/assets/vcode/v0.jpg';
const Props = defineProps({
	imgList: {
		type: Array,
		default: () => [Img0, Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9]
	},
	isShow: {
		type: Boolean,
		default: false
	}
});
const emit = defineEmits(['success', 'close', 'fail']);
const success = () => emit('success');
const close = () => emit('close');
const fail = () => emit('fail');
</script>
<style lang="scss" scoped>
// .gz-vcode {
// }
// .vue-auth-box_ .auth-body_ .reset_ {
// 	filter: hue-rotate(53deg);
// }
</style>
<style>
.vue-puzzle-vcode {
	z-index: 9999;
}
</style>
