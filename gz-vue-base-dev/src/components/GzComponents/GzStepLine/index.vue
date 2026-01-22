<template>
	<div class="gz-step-process h100">
		<div class="step-warpper h100">
			<template v-for="(item, index) in data" :key="index">
				<div class="step h100" :style="`width:${itemWidth}%`">
					<p class="tx-of">{{ item.time }}</p>
					<div class="line-w">
						<span class="tick"><svg-icon icon-class="tick" /></span><a></a>
					</div>
					<div class="cont">
						<h3 class="tx-of">{{ item.title }}</h3>
						<div>
							<p
								class="tx-of"
								:title="typeof ite === 'object' ? ite.eventName + ' ' + ite.eventName + ' ' + ite.eventTime : ite"
								v-for="(ite, inx) in item.list"
								:key="inx"
							>
								<!-- <solt name="list" :item="ite"> -->
								<template v-if="typeof ite === 'object'"> {{ ite.userName }} {{ ite.eventName }} {{ ite.eventTime }} </template>
								<template v-else>
									{{ ite }}
								</template>
								<!-- </solt> -->
							</p>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
	data: {
		type: Array,
		default: () => []
	}
});
const itemWidth = computed(() => 100 / (props.data.length || 1));
</script>
<style lang="scss" scoped>
.gz-step-process {
	padding: 20px 10px;
	.step-warpper {
		display: flex;
		justify-content: space-around;
		align-items: start;
		gap: 0;
	}
	.step {
		// flex: 1;
		& > p {
			padding-left: 30px;
			position: relative;
			top: 2px;
			font-weight: 400;
			font-size: 14px;
			color: #333333;
			line-height: 20px;
			text-align: left;
		}
	}
	.line-w {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		a {
			border-bottom: 2px solid #377cfd;
			width: calc(100% - 22px);
			border-radius: 2px;
		}
		.tick {
			width: 20px;
			height: 20px;
			background: #377cfd;
			border-radius: 20px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-right: 1px;
			.svg-icon {
				width: 16px;
				height: 16px;
			}
		}
	}
	.cont {
		margin-top: 5px;
		margin-left: 8px;
		border-left: 1px dashed #d8d8d8;
		padding-left: 21px;
		height: calc(100% - 55px);

		h3 {
			font-weight: 700;
			font-size: 16px;
			color: #333333;
			line-height: 26px;
			text-align: left;
			padding: 0;
			margin: 0;
			position: relative;
			top: -5px;
		}
		& > div {
			max-height: calc(100% - 30px);
			overflow: auto;
			padding-bottom: 10px;
		}
		p {
			font-weight: 400;
			font-size: 12px;
			color: #8a9099;
			line-height: 20px;
			text-align: left;
		}
	}

	.tx-of {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
