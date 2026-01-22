import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import defAva from '@/assets/images/head-icon-user.png';

const useUserStore = defineStore('user', () => {
	// 使用 ref 创建响应式状态
	const token = ref(getToken());
	const id = ref('');
	const name = ref('');
	const avatar = ref('');
	const roles = ref([]);
	const permissions = ref([]);

	// 登录
	function _login(userInfo) {
		const username = userInfo.username.trim();
		const password = userInfo.password;
		const code = userInfo.code;
		const uuid = userInfo.uuid;
		return new Promise((resolve, reject) => {
			login(username, password, code, uuid)
				.then(res => {
					setToken(res.token);
					token.value = res.token;
					resolve();
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	// 获取用户信息
	function _getInfo() {
		return new Promise((resolve, reject) => {
			getInfo()
				.then(res => {
					const user = res.user;
					const avatarUrl = user.avatar === '' || user.avatar === null ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;

					if (res.roles && res.roles.length > 0) {
						roles.value = res.roles;
						permissions.value = res.permissions;
					} else {
						roles.value = ['ROLE_DEFAULT'];
					}
					id.value = user.userId;
					name.value = user.userName;
					avatar.value = avatarUrl;
					resolve(res);
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	// 退出系统
	function _logOut() {
		return new Promise((resolve, reject) => {
			logout(token.value)
				.then(() => {
					token.value = '';
					roles.value = [];
					permissions.value = [];
					removeToken();
					resolve();
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	// 返回需要导出的状态和方法
	return {
		token,
		id,
		name,
		avatar,
		roles,
		permissions,
		login: _login,
		getInfo: _getInfo,
		logOut: _logOut
	};
});

export default useUserStore;
