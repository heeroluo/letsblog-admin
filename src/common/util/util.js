/**
 * 格式化日期
 * @param {Date} date 日期
 * @param {string} format 日期格式
 * @return {string} 格式化后的日期字符串
 */
export function formatDate(date, format) {
	const values = {
		Y: date.getFullYear(),
		M: date.getMonth() + 1,
		D: date.getDate(),
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds()
	};

	return format.replace(/Y+|M+|D+|h+|m+|s+/g, (match) => {
		let result = values[match[0]];
		if (match.length > 1 && result.toString().length !== match.length) {
			result = (
				(new Array(match.length)).join('0') + result
			).slice(-match.length);
		}
		return result;
	});
}