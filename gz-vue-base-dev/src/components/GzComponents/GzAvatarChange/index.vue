<template>
	<div>
		<el-dialog
			:title="title"
			v-model="open"
			width="800px"
			append-to-body
			destroy-on-close
			@opened="modalOpened"
			@close="closeDialog"
		>
			<el-row>
				<el-col :xs="24" :md="12" :style="{ height: '350px' }">
					<vue-cropper
						v-if="visible"
						ref="cropper"
						:img="options.img || logo"
						:info="true"
						:autoCrop="options.autoCrop"
						:autoCropWidth="options.autoCropWidth"
						:autoCropHeight="options.autoCropHeight"
						:fixedBox="options.fixedBox"
						:outputType="options.outputType"
						@realTime="realTime"
					/>
				</el-col>
				<el-col :xs="24" :md="12" :style="{ height: '350px' }">
					<div class="avatar-upload-preview">
						<img :src="options.previews.url" :style="options.previews.img" />
					</div>
				</el-col>
			</el-row>
			<br />
			<el-row>
				<el-col :lg="2" :md="2">
					<el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
						<el-button>
							选择
							<el-icon class="el-icon--right">
								<Upload />
							</el-icon>
						</el-button>
					</el-upload>
				</el-col>
				<el-col :lg="{ span: 1, offset: 2 }" :md="2">
					<el-button icon="Plus" @click="changeScale(1)"></el-button>
				</el-col>
				<el-col :lg="{ span: 1, offset: 1 }" :md="2">
					<el-button icon="Minus" @click="changeScale(-1)"></el-button>
				</el-col>
				<el-col :lg="{ span: 1, offset: 1 }" :md="2">
					<el-button icon="RefreshLeft" @click="rotateLeft()"></el-button>
				</el-col>
				<el-col :lg="{ span: 1, offset: 1 }" :md="2">
					<el-button icon="RefreshRight" @click="rotateRight()"></el-button>
				</el-col>
				<el-col :lg="{ span: 2, offset: 6 }" :md="2">
					<el-button type="primary" @click="uploadImg()">提 交</el-button>
				</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue';
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import logo from '@/assets/images/head-icon-user.png';

const emit = defineEmits(['uploadAvatar']);
const { proxy } = getCurrentInstance();

const open = ref(false);
const visible = ref(false);
const title = ref('修改头像');

const props = defineProps({
	avatar: {
		type: String
	}
});

//图片裁剪数据
const options = reactive({
	img: props.avatar, // 裁剪图片的地址
	autoCrop: true, // 是否默认生成截图框
	autoCropWidth: 200, // 默认生成截图框宽度
	autoCropHeight: 200, // 默认生成截图框高度
	fixedBox: true, // 固定截图框大小 不允许改变
	outputType: 'png', // 默认生成截图为PNG格式
	previews: {} //预览数据
});

/** 编辑头像 */
const editCropper = () => {
	open.value = true;
	setAvatarBase64(options.img, base64 => {
		console.log('base64', base64);
		options.img = base64;
		console.log('avatar', options.img); // 把这行移到这里确保它在更新之后调用
	});
};

const setAvatarBase64 = (src, callback) => {
	console.log('setAvatarBase64', src);
	const image = new Image();
	image.src = `${src}`;
	image.crossOrigin = 'anonymous';
	image.onload = () => {
		console.log('image', image);
		const base64 = transBase64FromImage(image);
		callback && callback(base64);
	};
};

const transBase64FromImage = image => {
	const canvas = document.createElement('canvas');
	canvas.width = image.width;
	canvas.height = image.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);

	// Here you can use 'image/jpeg' or other types as needed
	return canvas.toDataURL('image/png');
};

const closeCropper = () => {
	open.value = false;
	visible.value = false;
};
/** 打开弹出层结束时的回调 */
const modalOpened = () => {
	visible.value = true;
};
/** 覆盖默认上传行为 */
const requestUpload = () => {};
/** 向左旋转 */
const rotateLeft = () => {
	proxy.$refs.cropper.rotateLeft();
};
/** 向右旋转 */
const rotateRight = () => {
	proxy.$refs.cropper.rotateRight();
};
/** 图片缩放 */
const changeScale = num => {
	num = num || 1;
	proxy.$refs.cropper.changeScale(num);
};
/** 上传预处理 */
const beforeUpload = file => {
	if (file.type.indexOf('image/') == -1) {
		proxy.$modal.msgError('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。');
	} else {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			options.img = reader.result;
		};
	}
};
/** 上传图片 */
const uploadImg = () => {
	proxy.$refs.cropper.getCropBlob(data => {
		emit('uploadAvatar', data);
	});
};
/** 实时预览 */
const realTime = data => {
	options.previews = data;
};
/** 关闭窗口 */
const closeDialog = () => {
	options.visible = false;
};

defineExpose({
	editCropper,
	closeCropper
});
</script>

<style lang="scss" scoped>
.user-info-head {
	position: relative;
	display: inline-block;
	height: 120px;
}

.user-info-head:hover:after {
	content: '+';
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	color: #eee;
	background: rgba(0, 0, 0, 0.5);
	font-size: 24px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	cursor: pointer;
	line-height: 110px;
	border-radius: 50%;
}
</style>
