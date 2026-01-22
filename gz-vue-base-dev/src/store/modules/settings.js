import { defineStore } from 'pinia';
import { ref } from 'vue';
import defaultSettings from '@/config/settings';
import { useDynamicTitle } from '@/utils/dynamicTitle';
import variables from '@/styles/variables.module.scss';

// const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings;

const storageSetting = ref(JSON.parse(localStorage.getItem('layout-setting')) || {});

const { primary } = variables;

const useSettingsStore = defineStore('settings', () => {
	// 使用 ref 创建响应式状态
	const title = ref('');
	const theme = ref(storageSetting.value.theme || primary);
	const sideTheme = ref(storageSetting.value.sideTheme || defaultSettings.sideTheme);
	const showSettings = ref(defaultSettings.showSettings);
	const topNav = ref(typeof storageSetting.value.topNav !== 'undefined' ? storageSetting.value.topNav : defaultSettings.topNav);
	const tagsView = ref(
		typeof storageSetting.value.tagsView !== 'undefined' ? storageSetting.value.tagsView : defaultSettings.tagsView
	);
	const fixedHeader = ref(
		typeof storageSetting.value.fixedHeader !== 'undefined' ? storageSetting.value.fixedHeader : defaultSettings.fixedHeader
	);
	const sidebarLogo = ref(
		typeof storageSetting.value.sidebarLogo !== 'undefined' ? storageSetting.value.sidebarLogo : defaultSettings.sidebarLogo
	);
	const dynamicTitle = ref(
		typeof storageSetting.value.dynamicTitle !== 'undefined' ? storageSetting.value.dynamicTitle : defaultSettings.dynamicTitle
	);

	// 将actions转换为普通函数，直接操作ref的.value
	// function changeSetting(data) {
	// 	const { key, value } = data;
	// 	if (this.hasOwnProperty(key)) {
	// 		this[key].value = value;
	// 	}
	// }

	function setTitle(newTitle) {
		title.value = newTitle;
		useDynamicTitle();
	}

	// 返回需要导出的状态和方法
	return {
		title,
		theme,
		sideTheme,
		showSettings,
		topNav,
		tagsView,
		fixedHeader,
		sidebarLogo,
		dynamicTitle,
		// changeSetting,
		setTitle
	};
});

export default useSettingsStore;
