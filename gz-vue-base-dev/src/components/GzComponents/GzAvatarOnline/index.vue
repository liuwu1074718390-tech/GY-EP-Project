<template>
	<div class="gz-avatar-online" :style="`background:${bgColor}`">
		<el-tooltip v-if="showTips" placement="top" effect="light">
			<template #content>
				<slot name="tips" :data="{ ...data }">
					<p style="font-size: 14px; color: #333; padding: 3px 0">
						<svg-icon style="opacity: 0.8; width: 16px; height: 16px; margin-right: 4px" icon-class="enterprise" /> 企业名称：{{
							data.name || '-'
						}}
					</p>
					<p style="font-size: 14px; color: #333; padding: 3px 0">
						<svg-icon style="opacity: 0.8; width: 16px; height: 16px; margin-right: 4px" icon-class="person" /> 联系人：{{
							data.contactName || '-'
						}}
					</p>
					<p style="font-size: 14px; color: #333; padding: 3px 0">
						<svg-icon style="opacity: 0.8; width: 16px; height: 16px; margin-right: 4px" icon-class="caller" /> 联系方式：{{
							data.contactPhone || '-'
						}}
					</p>
					<p v-if="data.remarkLabel" style="font-size: 14px; color: #333; padding: 3px 0">
						<svg-icon style="opacity: 0.8; width: 16px; height: 16px; margin-right: 4px" :icon-class="data.remarkIcon" />
						{{ data.remarkLabel || '-' }}：{{ data.remarkValue }}
					</p>
				</slot>
			</template>
			<div :style="`width:${size}px;height:${size}px;`">
				<img :class="{ off: !status }" :src="imageUrl || img" @error="handleImageError" />
				<span :style="`width:${size * 0.28}px;height:${size * 0.28}px;background:${statusColor}`" v-if="statusColor"></span>
				<svg-icon v-if="status === true" icon-class="line-on" :style="`width:${size * 0.28}px;height:${size * 0.28}px`" />
				<svg-icon v-else icon-class="line-off" :style="`width:${size * 0.28}px;height:${size * 0.28}px`" /></div
		></el-tooltip>
		<div v-else :style="`width:${size}px;height:${size}px;`">
			<img :class="{ off: !status }" :src="imageUrl || img" @error="handleImageError" />
			<span :style="`width:${size * 0.28}px;height:${size * 0.28}px;background:${statusColor}`" v-if="statusColor"></span>
			<svg-icon v-if="status === true" icon-class="line-on" :style="`width:${size * 0.28}px;height:${size * 0.28}px`" />
			<svg-icon v-else icon-class="line-off" :style="`width:${size * 0.28}px;height:${size * 0.28}px`" />
		</div>
		<p class="tx-of" :style="`font-size:${fontSizs}px;margin-top:${gap}px`">{{ name }} <slot></slot></p>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import img from '@/assets/icons/other/head-icon-business@2x.png';
const props = defineProps({
	bgColor: {
		type: String,
		default: ''
	},
	imgUrl: {
		type: String,
		default: img
	},
	name: {
		type: String,
		default: ''
	},
	size: {
		type: Number,
		default: 36
	},
	fontSizs: {
		type: Number,
		default: 14
	},
	gap: {
		type: Number,
		default: 4
	},
	status: {
		type: Boolean,
		default: true
	},
	statusColor: {
		type: String,
		default: ''
	},
	showTips: {
		type: Boolean,
		default: true
	},
	data: {
		type: Object,
		default: () => ({})
	}
});
const imageUrl = ref(props.imgUrl);
const handleImageError = () => {
	imageUrl.value = img;
};
</script>
<style lang="scss" scoped>
.gz-avatar-online {
	// background: #f5f7fa;
	// border-radius: 61px 61px 61px 61px;
	display: inline-block;
	padding: 2px 8px 2px 0;
	// margin-right: 10px;
	// margin-top: 10px;
	font-size: 14px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;

	& > div {
		position: relative;
	}

	img {
		border-radius: 30px;
		margin-right: 3px;
		width: 100%;
		height: 100%;
	}
	p {
		display: inline-block;
		vertical-align: middle;
		color: #8a9099;
		width: 100%;
		text-align: center;
	}
	span {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 2;
		border-radius: 10px;
		box-shadow: 0 0 1px #fff;
		border: 1px solid #ffffff;
	}
	.svg-icon {
		color: #ffffff;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	.off {
		mix-blend-mode: luminosity;
		opacity: 0.5;
	}
}
.tx-of {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
