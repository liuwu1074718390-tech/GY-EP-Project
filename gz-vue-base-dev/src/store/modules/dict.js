import { defineStore } from 'pinia';
import { ref } from 'vue';

const useDictStore = defineStore('dict', () => {
	// 使用 ref 创建响应式数组
	const dict = ref([]);

	// 获取字典值
	const getDict = _key => {
		if (!_key) {
			return null;
		}
		for (const item of dict.value) {
			if (item.key === _key) {
				return item.value;
			}
		}
		return null;
	};

	// 设置字典
	const setDict = (_key, value) => {
		if (_key) {
			dict.value.push({ key: _key, value });
		}
	};

	// 删除字典项
	const removeDict = _key => {
		let found = false;
		dict.value = dict.value.filter(item => {
			if (item.key === _key) {
				found = true;
				return false;
			}
			return true;
		});
		return found;
	};

	// 清空字典
	const cleanDict = () => {
		dict.value = [];
	};

	// 初始化字典，此处假设初始化逻辑在其他地方实现或无需实现

	return { dict, getDict, setDict, removeDict, cleanDict };
});

export default useDictStore;
