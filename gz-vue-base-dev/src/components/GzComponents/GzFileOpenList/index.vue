<template>
	<div class="gz-file-open-list gz-file-open-solt">
		<el-link @click="openFile(file)" :key="index" :underline="false" v-for="(file, index) in fileList">
			<span style="padding: 0 5px; color: #333333; font-size: 16px" v-if="index != 0">|</span>
			<!-- <el-icon v-if="showIcon" style="margin-right: 4px; color: #8a9099"><Document /></el-icon> -->
			<svg-icon v-if="showIcon" style="margin-right: 4px; height: 16px; width: 16px" icon-class="link-file-active" />

			<span class="tx-of w100 tx-name" :title="file.name" :style="{ color: props.textColor }">
				<slot :file="file">
					{{ getFileName(file.name) }}
				</slot>
			</span>
		</el-link>
		<teleport to="body" v-if="showImgPreview">
			<el-image-viewer :z-index="9999999" :url-list="[imgPreviewUrl]" show-progress @close="showImgPreview = false" />
		</teleport>
	</div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { decodeBase64Array } from '@/utils';
import { getDownloadUrl } from '@/api/common';
import { getPreviewUrl } from '@/utils/file-preview';
import { downloadPdf } from '@/utils/common';
const props = defineProps({
	file: {
		type: String,
		default: ''
	},
	showIcon: {
		type: Boolean,
		default: false
	},
	textColor: {
		type: String,
		default: '#377cfd'
	},
	openType: {
		type: String,
		default: 'preview' //preview 预览,//dolwnload 下载
	}
});
const fileList = ref([]);
const showImgPreview = ref(false);
const imgPreviewUrl = ref('');
if (props.file) {
	let temp = 1;
	const list = decodeBase64Array(props.file);
	fileList.value = list.map(item => {
		if (typeof item === 'string') {
			item = { name: item, url: item };
		}
		item.uid = item.uid || new Date().getTime() + temp++;
		return item;
	});
} else {
	fileList.value = [];
}
function openFile(file) {
	getDownloadUrl({ ossPath: file.path }).then(res => {
		if (!res.data) return;
		if (props.openType == 'preview') {
			let fileTyle = res.data.split('?')[0]?.split('.')?.pop();
			if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(fileTyle)) {
				imgPreviewUrl.value = res.data;
				showImgPreview.value = true;
			} else {
				window.open(getPreviewUrl(res.data), 'blank');
			}
		} else {
			// window.open(res.data, 'blank');
			downloadPdf(res.data, getFileName(file.name));
		}
	});
}

function getFileName(name) {
	if (name && name.lastIndexOf('/') > -1) {
		return name.slice(name.lastIndexOf('/') + 1);
	} else {
		return name;
	}
}

// fileList.value =
</script>
<style lang="scss" scoped>
.gz-file-open-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
}
.el-link {
	// width: 100%;
	// &.hover {
	// 	border-bottom: 1px solid #377cfd;
	// }
	flex: 1;
	max-width: 100%;
}

:deep(.el-link__inner) {
	width: 100%;

	.tx-name {
		&:hover {
			text-decoration: underline;
		}
	}
}
.gz-info-table {
	.gz-file-open-list {
		.el-link {
			flex: inherit !important;
			max-width: inherit !important;
			width: auto !important;
		}
	}
}
.file-open-inline {
	.el-link {
		flex: inherit !important;
		max-width: inherit !important;
		width: auto !important;
	}
}
</style>
