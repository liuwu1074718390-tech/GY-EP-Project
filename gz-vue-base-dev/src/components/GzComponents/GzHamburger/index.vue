<template>
	<div style="padding: 0 15px" @click="toggleClick" class="hamburger-container-sidebar gz-hamburger">
		<el-icon
			:class="{ 'is-active': Props.isActive }"
			class="hamburger"
			width="64"
			height="64"
			:style="{ fill: sideTheme === 'theme-dark' ? variables.menuColorActive : '' }"
			><DArrowRight
		/></el-icon>
		<span v-if="Props.isActive">{{ Props.text }}</span>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import variables from '@/styles/variables.module.scss';
import useSettingsStore from '@/store/modules/settings';
const settingsStore = useSettingsStore();
const sideTheme = computed(() => settingsStore.sideTheme);
const Props = defineProps({
	isActive: {
		type: Boolean,
		default: false
	},
	text: {
		type: String,
		default: '折叠菜单'
	}
});

const emit = defineEmits();
const toggleClick = () => {
	emit('toggleClick');
};
</script>

<style lang="scss" scoped>
.gz-hamburger {
	&.hamburger-container-sidebar {
		display: flex;
		justify-content: center;
		min-width: 40px;
		height: 36px;
		vertical-align: middle;
		line-height: 36px;
		border-radius: 10px;
		border: 1px solid #eeeeee;
		padding: 10px;
		font-weight: 400;

		.hamburger {
			height: 36px;
			line-height: 36px;
			color: #8a9099;
			font-size: 15px;
			margin: 0 8px;

			// svg {
			// 	transform: translate(0, -50%);
			// }
		}
		span {
			font-size: 14px;
			color: #333333;
			overflow: hidden;
		}
	}
	.hamburger.is-active {
		transform: rotate(180deg);
	}
}
</style>
