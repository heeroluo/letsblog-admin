<template>
	<div>
		<h2 class="l-main__title">后台首页</h2>
		<div v-if="me" class="l-main__body">
			<p>{{ me.nickname }}，欢迎回来。</p>
			<ul>
				<li>文章数：{{ me.totalarticles }}</li>
				<li>评论数：{{ me.totalcomments }}</li>
			</ul>
		</div>
	</div>
</template>


<script>
import loadMe from '@/common/mixins/load-me';

export default {
	mixins: [loadMe]
};
</script>


<style scoped>
.l-main__body {
	line-height: 28px;
	font-size: 16px;
}
</style>