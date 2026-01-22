<template>
	<div class="gz-upload-file">
		<el-upload
			:multiple="_multiple"
			:action="uploadFileUrl"
			:before-upload="handleBeforeUpload"
			:file-list="fileList"
			:limit="_limit"
			:on-error="handleUploadError"
			:on-exceed="handleExceed"
			:on-success="handleUploadSuccess"
			:show-file-list="false"
			:headers="headers"
			class="upload-file-uploader"
			ref="fileUpload"
		>
			<!-- 上传按钮 -->
			<el-button :type="btnType" :title="tipsTxt" :text="isTextBtn">
				<el-icon v-if="!isTextBtn" style="font-size: 16px; margin-right: 5px; font-weight: 700"><Upload /></el-icon>
				{{ btnText }}
			</el-button>
		</el-upload>
		<!-- 上传提示 -->
		<div class="el-upload__tip" v-if="showTip">
			<!-- <template v-if="fileSize"> 大小不超过 {{ fileSize }}MB </template> -->
			<slot name="fileTypeTip" :data="{ fileType }">
				<template v-if="fileType"> 支持 {{ fileType.join('、') }} </template>
				格式</slot
			>
		</div>
		<!-- 文件列表 -->
		<transition-group
			v-if="showFileList"
			class="upload-file-list el-upload-list el-upload-list--text"
			name="el-fade-in-linear"
			tag="ul"
		>
			<li :key="file.uid" class="el-upload-list__item ele-upload-list__item-content" v-for="(file, index) in fileList">
				<!-- <el-link :href="`${baseUrl}${file.url}`" :underline="false" target="_blank">
					<span class="el-icon-document"> {{ getFileName(file.name) }} </span>
				</el-link> -->
				<el-link @click="openFile(file)" :underline="false">
					<!-- <el-icon style="margin-right: 4px; color: #8a9099"><Document /></el-icon> -->
					<svg-icon style="margin-right: 4px; height: 16px; width: 16px" icon-class="link-file-active" />
					<span class="el-icon-document color-pr" :title="getFileName(file.name)"> {{ getFileName(file.name) }} </span>
				</el-link>
				<div class="ele-upload-list__item-content-action">
					<el-link :underline="false" @click="handleDelete(index)">
						<el-icon><Close /></el-icon>
					</el-link>
				</div>
			</li>
		</transition-group>
	</div>
</template>

<script setup>
import { getCurrentInstance, ref, computed, watch } from 'vue';
import { getToken, getCacheEntId } from '@/services/auth';
import { decodeBase64Array } from '@/utils';
import { getDownloadUrl } from '@/api/common';

const props = defineProps({
	modelValue: [String, Object, Array],
	// 数量限制
	limit: {
		//默认单选
		type: Number,
		default: 1
	},
	// 大小限制(MB)
	fileSize: {
		type: Number,
		default: 500
	},
	// 文件类型, 例如['png', 'jpg', 'jpeg']
	fileType: {
		type: Array,
		default: () => ['doc', 'xls', 'xlsx', 'ppt', 'txt', 'pdf']
	},
	// 是否显示提示
	isShowTip: {
		type: Boolean,
		default: true
	},
	baseUrl: {
		type: String,
		default: import.meta.env.VITE_APP_BASE_API
	},
	path: {
		type: String,
		default: ''
	},
	multiple: {
		//一次勾选多个文件
		type: Boolean,
		default: true
	},
	moduleName: {
		type: String,
		default: ''
	},
	isTextBtn: {
		type: Boolean,
		default: false
	},
	showFileList: {
		type: Boolean,
		default: true
	},
	btnText: {
		type: String,
		default: '点击上传'
	},
	btnType: {
		type: String,
		default: 'primary'
	}
});
const _limit = ref(props.limit < 2 ? 2 : props.limit);
const _multiple = ref(props.limit < 2 ? false : props.multiple);
const { proxy } = getCurrentInstance();
const emits = defineEmits();
const number = ref(0);
const uploadList = ref([]);
// const path = (props.path || (props.multiple ? '/biz/oss/uploadFiles' : '/biz/oss/upload')) + '?moduleName=' + props.moduleName;
const path = (props.path || '/biz/oss/upload') + '?moduleName=' + props.moduleName;
const uploadFileUrl = ref(props.baseUrl + path); // 上传文件服务器地址
const headers = ref({ Authorization: 'Bearer ' + getToken(), 'Ent-Id': getCacheEntId() });
const fileList = ref([]);
const showTip = computed(() => props.isShowTip && (props.fileType || props.fileSize));

const tipsTxt = computed(() => {
	let txt = '';
	if (props.fileSize) txt = txt + `大小不超过${props.fileSize}MB `;
	if (props.fileType) txt = txt + `格式为 ${props.fileType.join('、')}`;
	return txt;
});

watch(
	() => props.modelValue,
	val => {
		if (val) {
			let temp = 1;
			let list;
			let base64Parts;
			// 首先将值转为数组
			if (typeof val === 'string') {
				list = decodeBase64Array(val);
				base64Parts = val.split('|');
			} else {
				list = val;
			}
			// 然后将数组转为对象数组
			fileList.value = list.map((item, index) => {
				// console.log(item, base64Parts[index]);
				if (typeof item === 'string') {
					item = { name: item, url: item, data: base64Parts[index] };
				}
				item.uid = item.uid || new Date().getTime() + temp++;
				item.data = item.data || base64Parts[index];
				return item;
			});
		} else {
			fileList.value = [];
			return [];
		}
	},
	{ deep: true, immediate: true }
);

// 上传前校检格式和大小
function handleBeforeUpload(file) {
	// 校检文件类型
	if (props.fileType.length) {
		const fileName = file.name.split('.');
		const fileExt = fileName[fileName.length - 1];
		const isTypeOk = props.fileType.indexOf(fileExt) >= 0;
		if (!isTypeOk) {
			proxy.$modal.msgError(`文件格式不正确, 请上传${props.fileType.join('、')}格式文件!`);
			return false;
		}
	}
	// 校检文件大小
	if (props.fileSize) {
		const isLt = file.size / 1024 / 1024 < props.fileSize;
		if (!isLt) {
			proxy.$modal.msgError(`上传文件大小不能超过 ${props.fileSize} MB!`);
			return false;
		}
	}

	if (_limit.value < fileList.value.length) {
		handleExceed();
		return false;
	}
	proxy.$modal.loading('正在上传文件，请稍候...');
	number.value++;
	return true;
}

// 文件个数超出
function handleExceed() {
	proxy.$modal.msgError(`上传文件数量不能超过 ${_limit.value} 个!`);
}

// 上传失败
function handleUploadError() {
	proxy.$modal.msgError('上传文件失败');
}

// 上传成功回调
function handleUploadSuccess(res, file) {
	if (res.code === 200) {
		// console.log(res);
		// decodeBase64Array
		// console.log(decodeBase64Array(res.data));
		const [dd] = decodeBase64Array(res.data);
		uploadList.value.push({ url: dd.path, ...dd, data: res.data });
		uploadedSuccessfully();
		emits('success', file);
	} else {
		number.value--;
		proxy.$modal.closeLoading();
		proxy.$modal.msgError(res.msg);
		proxy.$refs.fileUpload.handleRemove(file);
		uploadedSuccessfully();
	}
}

// 删除文件
function handleDelete(index) {
	fileList.value.splice(index, 1);
	// console.log(fileList.value);
	emits('update:modelValue', listTobase64(fileList.value));
	emits('change', fileList.value);
}

// 上传结束处理
function uploadedSuccessfully() {
	if (number.value > 0 && uploadList.value.length === number.value) {
		//fileList.value = fileList.value.filter(f => f.path !== undefined).concat(uploadList.value);
		fileList.value = [...fileList.value, ...uploadList.value].slice(-1 * props.limit);
		uploadList.value = [];
		number.value = 0;
		emits('update:modelValue', listTobase64(fileList.value));
		emits('change', fileList.value);
		proxy.$modal.closeLoading();
		// console.log(listTobase64(fileList.value));
	}
}

// 获取文件名称
function getFileName(name) {
	// 如果是url那么取最后的名字 如果不是直接返回
	if (name && name.lastIndexOf('/') > -1) {
		return name.slice(name.lastIndexOf('/') + 1);
	} else {
		return name;
	}
}

// 对象转成指定字符串分隔
function listToString(list, separator) {
	let strs = '';
	separator = separator || ',';
	for (let i in list) {
		if (list[i].url) {
			strs += list[i].url + separator;
		}
	}
	return strs != '' ? strs.substr(0, strs.length - 1) : '';
}

// 对象转成指定字符串分隔
function listTobase64(list, separator) {
	separator = separator || '|';
	let datas = [];
	for (let i in list) {
		if (list[i].data) {
			datas.push(list[i].data);
		}
	}
	return datas.join(separator);
}

function openFile(file) {
	getDownloadUrl({ ossPath: file.path }).then(res => {
		console.log(res);
		if (res.data) window.open(res.data, 'blank');
	});
}
</script>

<style scoped lang="scss">
.gz-upload-file {
	width: 100%;
	.upload-file-uploader {
		margin-bottom: 5px;
	}
	.upload-file-list .el-upload-list__item {
		position: relative;
		margin-bottom: 0 !important;
		line-height: 2;
		// border: 1px solid #ebebeb;
		// padding: 0 5px;
		border-radius: 4px;
	}
	.upload-file-list .ele-upload-list__item-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: inherit;

		& > .el-link {
			max-width: calc(100% - 25px);
			flex: 1;
			:deep(.el-link__inner) {
				justify-content: start;
				padding-left: 5px;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				& > span {
					flex: 1;
				}
			}
		}
		&:hover .ele-upload-list__item-content-action .el-link {
			visibility: visible;
		}
	}
	.ele-upload-list__item-content-action {
		.el-link {
			font-size: 15px;
			position: relative;
			top: -2px;
			opacity: 0.8;
			width: 20px;
			visibility: hidden;
			margin-right: 5px;
		}
	}
	.el-upload__tip {
		margin-top: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		font-size: 14px;
		color: #8a9099;
		padding-left: 5px;
	}
	.el-icon-document {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		//color: #8a9099;
		text-decoration: underline;
	}
	.el-upload-list {
		margin-top: 5px !important;
	}
}
</style>
