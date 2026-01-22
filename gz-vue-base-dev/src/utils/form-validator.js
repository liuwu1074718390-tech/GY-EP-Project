// 验证密码 validator: validatePassword
export const validatePassword = (rule, value, callback) => {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
	if (passwordRegex.test(value)) {
		callback();
	} else {
		callback(new Error('不少于8位，需包含大小写字母、数字、符号'));
	}
};

// 验证手机号码  pattern: regexPhone
export const regexPhone = /^1\d{10}$/;

//正数（即大于零的整数或小数） pattern: regexPositiveNumber
export const regexPositiveNumber = /^\d+(\.\d+)?$/;

//金额 pattern: regexAmountInRange
export const regexAmountInRange = /^\d+(\.\d{1,2})?$/;

// 邮箱 pattern: regexMail
export const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 编码 pattern: regexCodeNumber
export const regexCodeNumber = /^[A-Za-z0-9]{6,30}$/;

export const validateAmount = (rule, value, callback) => {
	const amountRegex = /^\d+(\.\d{1,2})?$/;
	if (value === '') {
		callback(new Error('请输入金额'));
	} else if (!amountRegex.test(value)) {
		callback(new Error('金额格式不正确，应为整数或最多两位小数'));
	} else {
		callback();
	}
};

// 验证身份证号
export const regexIdCard = (rule, value, callback) => {
	if (value === '') {
		callback(new Error('请输入身份证号'));
	} else if (!isValidIDCard(value)) {
		callback(new Error('请检查格式'));
	} else {
		callback();
	}
};

function isValidIDCard(idCard) {
	// 清除身份证两边的空格
	idCard = idCard.trim();
	// 校验长度，15位或18位
	if (idCard.length !== 15 && idCard.length !== 18) {
		return false;
	}
	// 校验前17位是否全为数字
	for (let i = 0; i < 17; i++) {
		if (!/^\d+$/.test(idCard.substr(i, 1))) {
			return false;
		}
	}
	// 校验18位身份证最后一位是否为数字或字符'X'
	if (idCard.length === 18) {
		if (!/^\d|X|x$/.test(idCard.substr(17, 1))) {
			return false;
		}
	}
	// 校验出生日期是否合理
	if (idCard.length === 18) {
		const birthDate = idCard.substr(6, 8);
		const date = new Date(birthDate.substr(0, 4) + '-' + birthDate.substr(4, 2) + '-' + birthDate.substr(6, 2));
		// 校验日期是否合理
		if (
			date.getFullYear() !== parseInt(birthDate.substr(0, 4), 10) ||
			date.getMonth() + 1 !== parseInt(birthDate.substr(4, 2), 10) ||
			date.getDate() !== parseInt(birthDate.substr(6, 2), 10)
		) {
			return false;
		}
	}
	// 校验18位身份证的校验码
	if (idCard.length === 18) {
		const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		const checks = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
		let sum = 0;
		for (let i = 0; i < 17; i++) {
			sum += parseInt(idCard.substr(i, 1), 10) * factors[i];
		}
		const mod = sum % 11;
		const lastChar = checks[mod];
		if (lastChar !== idCard.substr(17, 1).toUpperCase()) {
			return false;
		}
	}
	return true;
}
