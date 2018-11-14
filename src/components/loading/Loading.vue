<template>
	<div v-if="visible" class="c-loading g-fade-in"></div>
</template>


<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	}
};
</script>


<style lang="scss">
.c-loading {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 9999;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6) url(./imgs/loading.png) no-repeat center center;
	background-size: 144px 18px;
}
</style>