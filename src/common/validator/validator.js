// 验证规则
const ruleHelpers = {
	enTitle: {
		validate(value) {
			return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
		},
		message: '只能包含小写字母、数字和连字符，且不能以连字符开头'
	},

	min: {
		validate(value, min) {
			value = Number(value);
			return !isNaN(value) && value >= min;
		},
		message(min) { return '不能小于 ' + min; }
	},

	max: {
		validate(value, max) {
			value = Number(value);
			return !isNaN(value) && value <= max;
		},
		message(max) { return '不能大于 ' + max; }
	},

	minLength: {
		validate(value, min) { return value.length >= min; },
		message(min) { return '不能少于' + min + '个字符'; }
	},

	weight: {
		validate(value) {
			value = Number(value);
			return value >= 0 && value <= 255;
		},
		message: '必须为0至255之间的整数'
	},

	email: {
		validate(value) {
			let temp = /^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)*\.[a-zA-Z]{2,}$/.test(value);
			if (temp) {
				temp = value.replace('@', '.').split('.');
				for (let i = temp.length - 2; i >= 0; i--) {
					if (/^[-_]/.test(temp[i]) || /[_-]$/.test(temp[i])) {
						return false;
					}
				}
			} else {
				return false;
			}

			return true;
		},

		message: '格式错误'
	},

	url: {
		validate(value) { return /^https?:\/\//i.test(value); },
		message: '不是合法的URL'
	},

	username: {
		validate(value) { return /^\w{2,20}$/.test(value); },
		message: '不是合法的用户名'
	},

	password: {
		validate(value) {
			return value.length >= 6 &&
				value.length <= 16 &&
				!/^\d+$/.test(value) &&
				!/^[a-z]+$/i.test(value);
		},
		message: '必须为6-16位字符，且不能为纯数字或纯字母'
	}
};



/**
 * 数据验证
 * @param {Object} data 数据
 * @param {Object[]} steps 验证步骤
 * @param {string} steps[].name 字段名称
 * @param {string} steps[].prop 验证的数据属性
 * @param {boolean} [steps[].required=true] 是否不能为空
 * @param {Object} [steps[].rules] 验证规则
 * @param {Object} [options] 其他选项
 * @param {Object} [options.elements] 相关HTML元素集合
 */
export function validate(data, steps, options) {
	options = options || {};
	const elements = options.elements;

	return !steps.some((step) => {
		let errMsg;

		if (typeof step.rule === 'function') {
			if (!step.rule(data)) {
				errMsg = step.message;
			}

		} else {
			const value = data[step.prop];
			const isEmpty = value === '' || value == null;

			// 空值验证
			if (isEmpty && step.required !== false) {
				errMsg = step.name + ' 不能为空';

			// 具体规则验证
			} else if (!isEmpty && step.rules) {
				Object.keys(step.rules).some((key) => {
					const helper = ruleHelpers[key];
					if (!helper) {
						throw new Error(`Rule "${ key }" does not exist`);
					}

					const refValue = step.rules[key];
					const result = helper.validate(value, refValue);
					if (!result) {
						errMsg = step.name + ' ' + (
							typeof helper.message === 'function' ?
								helper.message(refValue) :
								helper.message
						);
						return true;
					}
				});
			}
		}

		if (errMsg) {
			alert(errMsg);
			if (elements && elements[step.prop]) {
				elements[step.prop].focus();
			}
			return true;
		}
	});
}



// // 是否权重
// exports.isWeight = (val) => {
// 	return val >= 0 && val <= 255;
// };

// // 是否用户名
// exports.isUsername = (val) => {
// 	return /^\w{2,20}$/.test(val);
// };

// // 是否昵称
// exports.isNickname = (val) => {
// 	return val.length >= 2 && val.length <= 20;
// };

// // 是否自动编号
// exports.isAutoId = (val) => {
// 	val = Number(val);
// 	return !isNaN(val) && val > 0;
// };

// // 是否英文标题
// exports.isEnTitle = (val) => {
// 	return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val);
// };

// // 是否QQ号
// exports.isQQ = (val) => {
// 	return /^[1-9]\d{4,}$/.test(val);
// };