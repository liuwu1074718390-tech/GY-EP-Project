// execution-timing-utils.js
// JavaScript执行时机控制工具库

/**
 * 防抖函数（支持立即执行模式）
 * @param {Function} func - 目标函数
 * @param {number} delay=300 - 延迟时间(ms)
 * @param {boolean} immediate=false - 是否立即执行
 * @returns {Function} 防抖处理后的函数
 *
 * 特性说明[1,4,8](@ref)：
 * - 立即执行模式适用于按钮提交等需要即时反馈的场景
 * - 延迟执行模式适用于输入联想等需等待用户停止操作的场景
 */
export const debounce = (func, delay = 300, immediate = false) => {
	let timeoutId;
	return function (...args) {
		const context = this;
		const later = () => {
			timeoutId = null;
			if (!immediate) func.apply(context, args);
		};

		const shouldCallNow = immediate && !timeoutId;
		clearTimeout(timeoutId);
		timeoutId = setTimeout(later, delay);

		if (shouldCallNow) func.apply(context, args);
	};
};

/**
 * 增强版节流函数（时间戳+定时器组合实现）
 * @param {Function} func - 目标函数
 * @param {number} limit=300 - 节流阈值(ms)
 * @returns {Function} 节流处理后的函数
 *
 * 核心特性[3,5,9](@ref)：
 * - 首触发立即执行
 * - 尾触发补执行
 * - 精确的时间间隔控制
 */
export const throttle = (func, limit = 300) => {
	let lastExec = 0;
	let timeoutId;

	return function (...args) {
		const context = this;
		const now = Date.now();

		const execute = () => {
			func.apply(context, args);
			lastExec = now;
		};

		if (now - lastExec >= limit) {
			execute();
		} else {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(execute, limit - (now - lastExec));
		}
	};
};

/**
 * 异步操作专用节流函数
 * @param {Function} asyncFunc - 异步目标函数
 * @param {number} limit=300 - 节流阈值(ms)
 * @returns {Function} 节流处理后的异步函数
 *
 * 特殊处理[8,9](@ref)：
 * - 防止Promise并发执行
 * - 自动追踪异步操作状态
 */
export const asyncThrottle = (asyncFunc, limit = 300) => {
	let lastExec = 0;
	let pending = false;

	return async function (...args) {
		const now = Date.now();
		const remaining = limit - (now - lastExec);

		if (remaining <= 0 && !pending) {
			lastExec = now;
			pending = true;
			try {
				await asyncFunc.apply(this, args);
			} finally {
				pending = false;
			}
		}
	};
};
