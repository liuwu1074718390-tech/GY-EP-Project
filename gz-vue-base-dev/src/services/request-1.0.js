import axios from 'axios';
import { ElNotification, ElMessageBox, ElMessage, ElLoading } from 'element-plus';
import { getToken, getCacheEntId } from '@/services/auth';
import ERROR_CODE from '@/constants/error-code';
import { tansParams, blobValidate } from '@/utils/common';
import SetUtils from '@/utils/setUtils';
// import cache from '@/plugins/cache';
import { saveAs } from 'file-saver';
import useUserStore from '@/store/modules/user';
import useEnterpriseStore from '@/store/modules/enterprise';
let enterpriseStore = null;
let downloadLoadingInstance;
const peedingSet = new SetUtils();

let isDev = process.env.NODE_ENV === 'development';

// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// 创建axios实例
const service = axios.create({
	// axios中请求配置有baseURL选项，表示请求URL公共部分
	baseURL: import.meta.env.VITE_APP_BASE_API,
	// 超时
	timeout: 30000
});

// request拦截器
service.interceptors.request.use(
	config => {
		// 是否需要设置 token
		const isToken = (config.headers || {}).isToken === false;
		const isEntId = (config.headers || {}).isEntId === false;
		// 是否需要防止数据重复提交
		const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
		if (getToken() && !isToken) {
			config.headers['Authorization'] = 'Bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
		}

		if (getCacheEntId() && !isEntId) {
			enterpriseStore = enterpriseStore || useEnterpriseStore();
			config.headers['Ent-Id'] = enterpriseStore.getCurTabEntID();
			if (config.headers['Ent-Id'] === false) return Promise.reject({ quiet: true });
		}
		// get请求映射params参数
		if (config.method === 'get' && config.params) {
			let url = config.url + '?' + tansParams(config.params);
			url = url.slice(0, -1);
			config.params = {};
			config.url = url;
		}
		if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
			// const requestObj = {
			// 	url: config.url,
			// 	data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
			// 	time: new Date().getTime()
			// };
			// const requestSize = Object.keys(JSON.stringify(requestObj)).length; // 请求数据大小
			// const limitSize = 5 * 1024 * 1024; // 限制存放数据5M
			// if (requestSize >= limitSize) {
			// 	console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。');
			// 	return config;
			// }
			// const sessionObj = cache.session.getJSON('sessionObj');
			// if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
			// 	cache.session.setJSON('sessionObj', requestObj);
			// } else {
			// 	const s_url = sessionObj.url; // 请求地址
			// 	const s_data = sessionObj.data; // 请求数据
			// 	const s_time = sessionObj.time; // 请求时间
			// 	const interval = 0; // 间隔时间(ms)，小于此时间视为重复提交
			// 	if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
			// 		const message = '数据正在处理，请勿重复提交';
			// 		console.warn(`[${s_url}]: ` + message);
			// 		return Promise.reject(new Error(message));
			// 	} else {
			// 		cache.session.setJSON('sessionObj', requestObj);
			// 	}
			// }
			let setKey = config.url + (typeof config.data === 'object' ? JSON.stringify(config.data) : config.data);
			//console.log(setKey, peedingSet.has(setKey));
			//console.log(peedingSet.getAll());
			if (peedingSet.has(setKey)) {
				const message = '数据正在处理，请勿重复提交';
				// return Promise.reject(new Error(message));
				if (!isDev) {
					console.warn(`[${config.url}]: ` + message);
				}
				return Promise.reject({ message, config, RepeatError: 1, quiet: !isDev });
			} else {
				peedingSet.add(setKey);
				// console.log('add:', setKey, peedingSet.has(setKey));
			}
		}

		return config;
	},
	error => {
		console.log(error);
		Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	res => {
		const config = res.config;
		if (config) {
			let setKey = config.url + (typeof config.data === 'object' ? JSON.stringify(config.data) : config.data);
			peedingSet.delete(setKey);
			Promise.resolve().then(() => {
				peedingSet.delete(setKey);
				// console.log('200:', setKey, peedingSet.has(setKey));
				// console.log(peedingSet.getAll());
			});
			// console.log(peedingSet.getAll());
		}

		let { quiet } = config.headers;
		// 未设置状态码则默认成功状态
		const code = res.data.code || 200;
		// 获取错误信息
		const msg = res.data.msg || ERROR_CODE[code] || ERROR_CODE['default'];

		// 二进制数据则直接返回
		if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
			return res;
		}

		if (code === 401 || code === 403) {
			if (!isRelogin.show) {
				isRelogin.show = true;
				!quiet &&
					ElMessageBox.confirm('您当前未登录，或登录已过期，请重新登录。', '系统提示', {
						confirmButtonText: '重新登录',
						cancelButtonText: '取消',
						type: 'warning'
					})
						.then(() => {
							isRelogin.show = false;
							useUserStore()
								.logOut()
								.then(() => {
									//location.href = '/login?redirect=' + encodeURIComponent(location.pathname + location.search);
									_IPC.pubSub.emitOnce('checkUserIsLogin');
								});
						})
						.catch(() => {
							isRelogin.show = false;
						});
			}
			return Promise.reject(msg || '无效的会话，或者会话已过期，请重新登录。');
		} else if (code * 1 == 605) {
			!quiet &&
				ElMessageBox.confirm(msg || '流程异常', '提交失败', {
					showConfirmButton: false,
					cancelButtonText: '关闭',
					type: 'error'
				});
			return Promise.reject(res.data);
		} else if (code * 1 >= 500 && code * 1 < 600) {
			!quiet && ElMessage({ message: msg, type: 'error' });
			return Promise.reject(res.data);
		} else if (code >= 600 && code < 700) {
			!quiet && ElMessage({ message: msg, type: 'error' });
			return Promise.reject(msg);
		} else if (code !== 200) {
			!quiet && ElNotification.error({ title: msg });
			return Promise.reject(res.data);
		} else {
			return Promise.resolve(res.data);
		}
	},
	error => {
		console.log('err:', error);

		const { config, RepeatError } = error;
		if (config && !RepeatError) {
			let setKey = config.url + (typeof config.data === 'object' ? JSON.stringify(config.data) : config.data);
			peedingSet.delete(setKey);
			Promise.resolve().then(() => {
				peedingSet.delete(setKey);
				// console.log('err:', setKey, peedingSet.has(setKey));
			});
		}

		let { message, quiet } = error;
		message = message + '';
		if (message == 'Network Error') {
			message = '后端接口连接异常';
		} else if (message.includes('timeout')) {
			message = '系统接口请求超时';
		} else if (message.includes('Request failed with status code')) {
			message = '系统接口' + message.substr(message.length - 3) + '异常';
		}
		if (!quiet) ElMessage({ message: message, type: 'error', duration: 5 * 1000 });
		return Promise.reject(error);
	}
);

// 通用下载方法
export async function download(url = '', params = {}, filename = '', config = {}, callback) {
	downloadLoadingInstance = ElLoading.service({
		text: '正在下载数据，请稍候',
		background: 'rgba(0, 0, 0, 0.7)'
	});
	try {
		const { data, headers } = await service.post(url, params, {
			// transformRequest: [
			// 	params => {
			// 		return tansParams(params);
			// 	}
			// ],
			// headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			responseType: 'blob',
			...config
		});
		const isBlob = blobValidate(data);
		if (isBlob) {
			const blob = new Blob([data]);
			const _filename = filename || window.decodeURIComponent(headers['content-disposition']?.split('filename=')[1]);
			saveAs(blob, _filename);
		} else {
			const resText = await data.text();
			const rspObj = JSON.parse(resText);
			const errMsg = ERROR_CODE[rspObj.code] || rspObj.msg || ERROR_CODE['default'];
			ElMessage.error(errMsg);
		}
		downloadLoadingInstance.close();
		typeof callback === 'function' && callback();
	} catch (r) {
		console.error(r);
		ElMessage.error('下载文件出现错误，请联系管理员！');
		downloadLoadingInstance.close();
		typeof callback === 'function' && callback();
	}
}

export function SSE(config) {
	config = Object.assign(
		{
			url: '',
			isToken: true,
			withCredentials: true // 如果需要携带 cookie
		},
		config
	);
	if (getToken() && config.isToken) {
		config.headers = config.headers || {};
		config.headers['Authorization'] = 'Bearer ' + getToken();
		config.headers['X-Custom-Header'] = 'custom-value';
		config.headers['Accept'] = 'text/event-stream';
	}
	let { url, headers, withCredentials } = config;
	if (config.data) {
		url = import.meta.env.VITE_APP_BASE_API + url + '?' + tansParams({ ...config.data, token: 'Bearer ' + getToken() });
		url = url.slice(0, -1);
	}
	return new EventSource(url, {
		headers: {
			Authorization: 'Bearer ' + getToken(),
			'X-Custom-Header': 'custom-value'
		}
	});
}

export default service;
