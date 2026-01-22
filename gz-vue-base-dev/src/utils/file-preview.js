import { Base64 } from 'js-base64';
import { decodeBase64 } from '@/utils';
import { getDownloadUrl } from '@/api/common';

//通过url获取预览地址
export function getPreviewUrl(url) {
	if (!url.includes('http')) {
		url = import.meta.env.VITE_APP_BASE_TARGRT + url;
	}
	return `${import.meta.env.VITE_APP_PREVIEW_URL}onlinePreview?url=` + encodeURIComponent(Base64.encode(`${url}`));
}

// 使用base64字符串预览
export function previewByBase64(base64Data) {
	getDownloadUrl({ ossPath: decodeBase64(base64Data).path }).then(res => {
		window.open(getPreviewUrl(res.data));
	});
}
