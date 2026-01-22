import cookies from 'js-cookie';
import config from '@/config/common';
function prefix(key) {
	return config.cachesPrefix + key;
}
export const session = {
	set(key, value) {
		if (!sessionStorage) {
			return;
		}
		if (key != null && value != null) {
			sessionStorage.setItem(prefix(key), value);
		}
	},
	get(key) {
		if (!sessionStorage) {
			return null;
		}
		if (key == null) {
			return null;
		}
		return sessionStorage.getItem(prefix(key));
	},
	setJSON(key, jsonValue) {
		if (jsonValue != null) {
			this.set(prefix(key), JSON.stringify(jsonValue));
		}
	},
	getJSON(key) {
		const value = this.get(prefix(key));
		if (value != null) {
			return JSON.parse(value);
		}
	},
	remove(key) {
		sessionStorage.removeItem(prefix(key));
	}
};
export const local = {
	set(key, value) {
		if (!localStorage) {
			return;
		}
		if (key != null && value != null) {
			localStorage.setItem(prefix(key), value);
		}
	},
	get(key) {
		if (!localStorage) {
			return null;
		}
		if (key == null) {
			return null;
		}
		return localStorage.getItem(prefix(key));
	},
	setJSON(key, jsonValue) {
		if (jsonValue != null) {
			this.set(prefix(key), JSON.stringify(jsonValue));
		}
	},
	getJSON(key) {
		const value = this.get(prefix(key));
		if (value != null) {
			return JSON.parse(value);
		}
	},
	remove(key) {
		localStorage.removeItem(prefix(key));
	}
};

export const Cookies = {
	get(name) {
		return cookies.get(prefix(name));
	},
	set(name, value, attributes) {
		return cookies.set(prefix(name), value, attributes);
	},
	remove(name, attributes) {
		return cookies.remove(prefix(name), attributes);
	},
	withAttributes: cookies.withAttributes,
	withConverter: cookies.withConverter
};

export default {
	/**
	 * 会话级缓存
	 */
	session,
	/**
	 * 本地缓存
	 */
	local,

	/*
	 * 这里重写
	 */
	Cookies
};
