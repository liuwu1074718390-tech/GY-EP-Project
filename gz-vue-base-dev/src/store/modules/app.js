import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Cookies } from '@/plugins/cache';
import defaultSettings from '@/config/settings';

const useAppStore = defineStore('app', () => {
	const storageSetting = ref(JSON.parse(localStorage.getItem('layout-setting')) || {});
	const { topNav } = defaultSettings;

	const sidebar = ref({
		opened: ref(Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true),
		withoutAnimation: ref(false),
		hide: ref((storageSetting.value.topNav || topNav) === 'top-menu')
	});

	const device = ref('desktop');
	const size = ref(Cookies.get('size') || 'default');

	function toggleSideBar(withoutAnimation) {
		if (sidebar.value.hide) {
			return;
		}
		sidebar.value.opened = !sidebar.value.opened;
		sidebar.value.withoutAnimation = withoutAnimation;
		Cookies.set('sidebarStatus', +sidebar.value.opened);
	}

	function closeSideBar({ withoutAnimation }) {
		Cookies.set('sidebarStatus', 0);
		toggleSideBar({ withoutAnimation });
	}

	function toggleDevice(deviceValue) {
		device.value = deviceValue;
	}

	function setSize(sizeValue) {
		size.value = sizeValue;
		Cookies.set('size', sizeValue);
	}

	function toggleSideBarHide(status, index) {
		sidebar.value.hide = !!status;
		// console.log('this.sidebar.hide', sidebar.value.hide, index);
	}

	return {
		sidebar,
		device,
		size,
		toggleSideBar,
		closeSideBar,
		toggleDevice,
		setSize,
		toggleSideBarHide
	};
});

export default useAppStore;
