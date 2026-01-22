<template>
	<div>
		<CountDown :initial-time="360000" :on-finish="handleFinish1" />
		<CountDown :initial-time="180000" :on-finish="handleFinish2" />
	</div>
</template>

<script setup>
function handleFinish1() {
	console.log('First countdown finished!');
}

function handleFinish2() {
	console.log('Second countdown finished!');
}
</script>
