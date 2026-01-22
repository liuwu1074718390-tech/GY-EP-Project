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
const peedingMap = new Map();
const reqCatchResponse = setKey => {
	return new Promise((resolve, reject) => {
		peedingMap.has(setKey) ? peedingMap.get(setKey).push({ resolve, reject }) : peedingMap.set(setKey, [{ resolve, reject }]);
	});
};
const respCatchResponse = (setKey, type, data) => {
	if (peedingMap.has(setKey)) {
		const list = peedingMap.get(setKey);
		list.forEach(item => {
			item.resolve({ type: type, data });
		});
		peedingMap.delete(setKey);
	}
};

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
	async config => {
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
		// if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
		if (config.method === 'post' || config.method === 'put') {
			let setKey = config.url + (typeof config.data === 'object' ? JSON.stringify(config.data) : config.data);
			//console.log(setKey, peedingSet.has(setKey));
			//console.log(peedingSet.getAll());
			// 修改请求拦截器中的重复请求处理逻辑
			if (peedingSet.has(setKey)) {
				let message = !isDev ? '数据正在处理，请勿重复提交' : '你有一个相同的请求正在处理中，请优化代码，不建议重复提交';
				console.warn(`[${config.url}]: ` + message);

				// 等待重复请求的结果
				let result = await reqCatchResponse(setKey);

				// 关键修改：返回一个特殊配置，让Axios使用自定义适配器
				config.adapter = () => {
					if (result.type === 'resolve') {
						// 构造一个模拟的响应对象
						const fakeResponse = {
							data: result.data,
							status: 200,
							statusText: 'OK',
							headers: {},
							config
						};
						return Promise.resolve(fakeResponse);
					} else {
						return Promise.reject(result.data);
					}
				};
				return config;
			} else {
				peedingSet.add(setKey);
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
		let setKey;
		const config = res.config;
		if (config) {
			setKey = config.url + (typeof config.data === 'object' ? JSON.stringify(config.data) : config.data);
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
		if (res.request?.responseType === 'blob' || res.request?.responseType === 'arraybuffer') {
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
			respCatchResponse(setKey, 'reject', msg || '无效的会话，或者会话已过期，请重新登录。');
			return Promise.reject(msg || '无效的会话，或者会话已过期，请重新登录。');
		} else if (code * 1 == 605) {
			!quiet &&
				ElMessageBox.confirm(msg || '流程异常', '提交失败', {
					showConfirmButton: false,
					cancelButtonText: '关闭',
					type: 'error'
				});
			respCatchResponse(setKey, 'reject', res.data);
			return Promise.reject(res.data);
		} else if (code * 1 >= 500 && code * 1 < 600) {
			!quiet && ElMessage({ message: msg, type: 'error' });
			respCatchResponse(setKey, 'reject', res.data);
			return Promise.reject(res.data);
		} else if (code >= 600 && code < 700) {
			!quiet && ElMessage({ message: msg, type: 'error' });
			respCatchResponse(setKey, 'reject', res.data);
			return Promise.reject(msg);
		} else if (code !== 200) {
			!quiet && ElNotification.error({ title: msg });
			respCatchResponse(setKey, 'reject', res.data);
			return Promise.reject(res.data);
		} else {
			respCatchResponse(setKey, 'resolve', res.data);
			return Promise.resolve(res.data);
		}
	},
	error => {
		let setKey;
		const { config, RepeatError, RepeatType, RepeatData } = error;
		console.log(config);
		if (config) setKey = config.url + (typeof config.data === 'object' ? JSON.stringify(config.data) : config.data);
		if (config && RepeatType === 'resolve') {
			peedingSet.delete(setKey);
			return Promise.resolve(RepeatData);
		}
		if (config && !RepeatError) {
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
		respCatchResponse(setKey, 'reject', error);
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
