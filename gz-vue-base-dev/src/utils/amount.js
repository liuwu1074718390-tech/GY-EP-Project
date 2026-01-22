// 输入金额数字，返回大写金额
export function numberToChinese(num) {
	if (num === 0) return '零元整';

	const chineseNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	const chineseUnits = ['', '拾', '佰', '仟'];
	const chineseBigUnits = ['', '万', '亿', '兆'];

	let str = num.toString();
	let result = '';

	// 处理负数
	if (str.startsWith('-')) {
		str = str.slice(1);
		result += '负';
	}

	// 去掉小数部分
	let integerPart = str.split('.')[0];
	let decimalPart = str.split('.')[1] || '';

	// 补足小数位
	if (decimalPart.length === 1) {
		decimalPart += '0';
	} else if (decimalPart.length > 2) {
		decimalPart = decimalPart.slice(0, 2);
	}

	// 处理整数部分
	let integerStr = '';
	for (let i = 0; i < integerPart.length; i++) {
		let digit = integerPart[integerPart.length - 1 - i];
		let chineseDigit = chineseNums[digit];
		let unit = chineseUnits[i % 4];

		if (digit !== '0' || (i > 0 && integerStr[integerStr.length - 1] === '零')) {
			integerStr = chineseDigit + unit + integerStr;
		} else if (i % 4 === 0) {
			integerStr = chineseDigit + chineseBigUnits[i / 4] + integerStr;
		}
	}

	// 处理大单位
	for (let i = 1; i < chineseBigUnits.length; i++) {
		if (integerStr.includes(chineseBigUnits[i])) {
			integerStr = integerStr.replace(chineseBigUnits[i], chineseBigUnits[i] + '元');
		}
	}

	// 去掉多余的零
	integerStr = integerStr
		.replace(/零+/, '零')
		.replace(/零+$/, '')
		.replace(/零+([亿|万])/g, '$1');

	// 添加小数部分
	if (decimalPart) {
		result += integerStr + '元' + chineseNums[decimalPart[0]] + '角' + chineseNums[decimalPart[1]] + '分';
	} else {
		result += integerStr + '元整';
	}

	return result;
}

// 输入金额数字，返回格式化金额
export function formatAmountManual(number) {
	// 输入验证
	if (number === null || number === undefined || number === '' || (typeof number !== 'number' && typeof number !== 'string')) {
		return '';
	}

	// 尝试将输入转换为数字
	let num = Number(number);
	if (isNaN(num)) {
		return number;
		//throw new Error('Invalid input: not a valid number. Input was: ' + number);
	}

	// 处理负数
	const isNegative = num < 0;
	num = Math.abs(num);

	// 分离整数部分和小数部分，并限制小数部分长度
	const parts = num.toFixed(2).split('.');
	const integerPart = parts[0];
	const decimalPart = parts.length > 1 ? parts[1] : '';

	// 添加千位分隔符
	const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	// 返回格式化的金额
	return (isNegative ? '-' : '') + formattedIntegerPart + (decimalPart ? '.' + decimalPart : '');
}
