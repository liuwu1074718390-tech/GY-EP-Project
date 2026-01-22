export function getYear(time) {
	var date = new Date(time);
	var year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate();
	return year + '年';
}
export function getMonth(time) {
	var date = new Date(time);
	var year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate();
	return month + '月';
}
export function getYearMonthC(time) {
	var date = new Date(time);
	var year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate();
	return year + '年' + month + '月';
}
export function getYearMonthDayC(time) {
	var date = new Date(time);
	var year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate();
	return year + '年' + month + '月' + day + '日';
}
export function getDay(time) {
	var date = new Date(time);
	var year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate();
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}
	return year + '-' + month + '-' + day;
}

export function getDay1(time) {
	var date = new Date(time);
	var year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate();
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}
	return year + '/' + month + '/' + day;
}

export function getthisMonth(str) {
	var year, lastMonth;
	// console.log(str)
	var date = new Date(str + '-01');
	var nowYear = date.getFullYear(); //当前年：四位数字
	var nowMonth = date.getMonth(); //当前月：0-11
	lastMonth = nowMonth + 1;
	lastMonth = lastMonth < 10 ? '0' + lastMonth : lastMonth; //月份格式化：月份小于10则追加个0

	let lastYearMonth = year + '-' + lastMonth;

	return lastYearMonth;
}
export function getLastMonth(str) {
	var year, lastMonth;
	// console.log(str)
	var date = new Date(str + '-01');
	var nowYear = date.getFullYear(); //当前年：四位数字
	var nowMonth = date.getMonth(); //当前月：0-11
	if (nowMonth == 0) {
		//如果是0，则说明是1月份，上一个月就是去年的12月
		year = nowYear - 1;
		lastMonth = 12;
	} else {
		//不是1月份，年份为当前年，月份本来是要减1的，但是由于`getMonth()`的月份本身就是少了1的，所以月份不用变。
		year = nowYear;
		lastMonth = nowMonth;
	}

	lastMonth = lastMonth < 10 ? '0' + lastMonth : lastMonth; //月份格式化：月份小于10则追加个0

	let lastYearMonth = year + '-' + lastMonth;

	return lastYearMonth;
}

export function getLast3Month(str) {
	var year, lastMonth;
	// console.log(str)
	var date = new Date(str + '-01');
	var nowYear = date.getFullYear(); //当前年：四位数字
	var nowMonth = date.getMonth(); //当前月：0-11
	lastMonth = nowMonth - 2;
	if (nowMonth <= 0) {
		//如果是0，则说明是1月份，上一个月就是去年的12月
		year = nowYear - 1;
		lastMonth = lastMonth + 12;
	}
	lastMonth = lastMonth < 10 ? '0' + lastMonth : lastMonth; //月份格式化：月份小于10则追加个0

	let lastYearMonth = year + '-' + lastMonth;

	return lastYearMonth;
}
// 计算最早日期 最晚日期
export function findEarliestAndLatestDates(datesArray) {
	// 将日期字符串数组转换为Date对象数组
	const dates = datesArray.map(dateString => new Date(dateString));

	// 计算最早日期（最小值）
	const earliestDate = new Date(Math.min(...dates));

	// 计算最晚日期（最大值）
	const latestDate = new Date(Math.max(...dates));
	console.log('findEarliestAndLatestDates,', datesArray);
	console.log('findEarliestAndLatestDates,', earliestDate, latestDate);

	// 返回最早和最晚日期
	return {
		earliest: earliestDate,
		latest: latestDate
	};
}

export function addDay(str, num) {
	var year, lastMonth;
	// console.log(str)
	var date = new Date(str);
	date.setDate(date.getDate() + num);

	return getDay(date);
}
export function addMonth(str, num) {
	var year, lastMonth;
	var date = new Date(str);
	date.setMonth(date.getMonth() + num);

	return getDay(date);
}
export function addYear(str, num) {
	var date = new Date(str);
	date.setYear(date.getYear() + num);

	return getDay(date);
}
