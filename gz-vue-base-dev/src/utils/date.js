// 计算两个日期之间的毫秒差
export function getMillisecondsDifference(date1, date2) {
	return new Date(date2) - new Date(date1);
}
