import { defineStore } from 'pinia';
import { ref } from 'vue';

const useTagsViewStore = defineStore('tags-view', () => {
	// 使用 ref 创建响应式状态
	const visitedViews = ref([]);
	const cachedViews = ref([]);
	const iframeViews = ref([]);

	// 添加视图
	function addView(view) {
		addVisitedView(view);
		addCachedView(view);
	}

	function addIframeView(view) {
		if (!iframeViews.value.some(v => v.path === view.path)) {
			iframeViews.value.push({ ...view, title: view.meta.title || 'no-name' });
		}
	}

	function addVisitedView(view) {
		if (!visitedViews.value.some(v => v.path === view.path)) {
			visitedViews.value.push({ ...view, title: view.meta.title || 'no-name' });
		}
	}

	function addCachedView(view) {
		if (!cachedViews.value.includes(view.name) && !view.meta.noCache) {
			cachedViews.value.push(view.name);
		}
	}

	// 删除视图
	function delView(view) {
		return new Promise(resolve => {
			delVisitedView(view);
			delCachedView(view);
			resolve({
				visitedViews: [...visitedViews.value],
				cachedViews: [...cachedViews.value]
			});
		});
	}

	function delVisitedView(view) {
		return new Promise(resolve => {
			for (const [i, v] of visitedViews.value.entries()) {
				if (v.path === view.path) {
					visitedViews.value.splice(i, 1);
					break;
				}
			}
			iframeViews.value = iframeViews.value.filter(item => item.path !== view.path);
			resolve([...visitedViews.value]);
		});
	}

	function delCachedView(view) {
		return new Promise(resolve => {
			const index = cachedViews.value.indexOf(view.name);
			if (index > -1) {
				cachedViews.value.splice(index, 1);
			}
			resolve([...cachedViews.value]);
		});
	}

	function delIframeView(view) {
		return new Promise(resolve => {
			iframeViews.value = iframeViews.value.filter(item => item.path !== view.path);
			resolve([...iframeViews.value]);
		});
	}

	// 删除其他视图
	function delOthersViews(view) {
		return new Promise(resolve => {
			delOthersVisitedViews(view);
			delOthersCachedViews(view);
			resolve({
				visitedViews: [...visitedViews.value],
				cachedViews: [...cachedViews.value]
			});
		});
	}

	function delOthersVisitedViews(view) {
		return new Promise(resolve => {
			visitedViews.value = visitedViews.value.filter(v => v.meta.affix || v.path === view.path);
			iframeViews.value = iframeViews.value.filter(item => item.path === view.path);
			resolve([...visitedViews.value]);
		});
	}

	function delOthersCachedViews(view) {
		return new Promise(resolve => {
			const index = cachedViews.value.indexOf(view.name);
			if (index > -1) {
				cachedViews.value = cachedViews.value.slice(index, index + 1);
			} else {
				cachedViews.value = [];
			}
			resolve([...cachedViews.value]);
		});
	}

	// 删除所有视图
	function delAllViews(view) {
		return new Promise(resolve => {
			delAllVisitedViews(view);
			delAllCachedViews(view);
			resolve({
				visitedViews: [...visitedViews.value],
				cachedViews: [...cachedViews.value]
			});
		});
	}

	function delAllVisitedViews(view) {
		return new Promise(resolve => {
			const affixTags = visitedViews.value.filter(tag => tag.meta.affix);
			visitedViews.value = affixTags;
			iframeViews.value = [];
			resolve([...visitedViews.value]);
		});
	}

	function delAllCachedViews(view) {
		return new Promise(resolve => {
			cachedViews.value = [];
			resolve([...cachedViews.value]);
		});
	}

	// 更新访问过的视图
	function updateVisitedView(view) {
		for (let i = 0; i < visitedViews.value.length; i++) {
			if (visitedViews.value[i].path === view.path) {
				visitedViews.value[i] = { ...visitedViews.value[i], ...view };
				break;
			}
		}
	}

	// 删除右侧标签
	function delRightTags(view) {
		return new Promise(resolve => {
			const index = visitedViews.value.findIndex(v => v.path === view.path);
			if (index === -1) return;
			visitedViews.value = visitedViews.value.filter((item, idx) => idx <= index || (item.meta && item.meta.affix));
			cachedViews.value = cachedViews.value.filter(name => visitedViews.value.some(v => v.name === name));
			iframeViews.value = iframeViews.value.filter(v => visitedViews.value.some(item => item.path === v.path));
			resolve([...visitedViews.value]);
		});
	}

	// 删除左侧标签
	function delLeftTags(view) {
		return new Promise(resolve => {
			const index = visitedViews.value.findIndex(v => v.path === view.path);
			if (index === -1) return;
			visitedViews.value = visitedViews.value.filter((item, idx) => idx >= index || (item.meta && item.meta.affix));
			cachedViews.value = cachedViews.value.filter(name => visitedViews.value.some(v => v.name === name));
			iframeViews.value = iframeViews.value.filter(v => visitedViews.value.some(item => item.path === v.path));
			resolve([...visitedViews.value]);
		});
	}

	// 返回需要导出的状态和方法
	return {
		visitedViews,
		cachedViews,
		iframeViews,
		addView,
		addIframeView,
		addVisitedView,
		addCachedView,
		delView,
		delVisitedView,
		delCachedView,
		delIframeView,
		delOthersViews,
		delOthersVisitedViews,
		delOthersCachedViews,
		delAllViews,
		delAllVisitedViews,
		delAllCachedViews,
		updateVisitedView,
		delRightTags,
		delLeftTags
	};
});

export default useTagsViewStore;
