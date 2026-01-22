class SetUtils {
	constructor() {
		this.set = new Set();
	}

	// 添加元素
	add(item) {
		this.set.add(item);
	}

	// 删除元素
	delete(item) {
		this.set.delete(item);
	}

	// 检查元素是否存在
	has(item) {
		return this.set.has(item);
	}

	// 获取集合的所有元素
	getAll() {
		return Array.from(this.set);
	}

	// 清空集合
	clear() {
		this.set.clear();
	}

	// 获取集合的大小
	size() {
		return this.set.size;
	}

	// 遍历集合中的每个元素
	forEach(callback) {
		this.set.forEach(callback);
	}
}

export default SetUtils;

// 示例用法
// const setUtils = new SetUtils();

// 添加元素
// setUtils.add(1);
// setUtils.add(2);
// setUtils.add(3);

// // 删除元素
// setUtils.delete(2);

// // 检查元素是否存在
// console.log(setUtils.has(1)); // true
// console.log(setUtils.has(2)); // false

// // 获取所有元素
// console.log(setUtils.getAll()); // [1, 3]

// // 清空集合
// setUtils.clear();
// console.log(setUtils.size()); // 0

// // 遍历集合
// setUtils.add(4);
// setUtils.add(5);
// setUtils.forEach(item => {
//     console.log(item); // 4, 5
// });
