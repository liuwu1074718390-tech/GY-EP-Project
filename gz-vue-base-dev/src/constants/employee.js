export const EMPLOYEE_STATUS = {
	NORMAL: {
		value: 1,
		desc: '正常'
	},
	DISABLED: {
		value: 1,
		desc: '禁用'
	},
	DELETED: {
		value: 2,
		desc: '已删除'
	}
};
export const EMPLOYEE_ACCOUNT_TYPE = {
	QQ: {
		value: 1,
		desc: 'QQ登录'
	},
	WECHAT: {
		value: 2,
		desc: '微信登录'
	},
	DINGDING: {
		value: 3,
		desc: '钉钉登录'
	},
	USERNAME: {
		value: 4,
		desc: '用户名密码登录'
	}
};
export default {
	EMPLOYEE_STATUS,
	EMPLOYEE_ACCOUNT_TYPE
};
