<template>
	<div>
		<template v-if="me">
			<admin-header />
			<router-view class="l-main" />
		</template>
		<template v-else-if="me === false">
			<div class="p-error">
				<p class="p-error__msg">未登录或登录超时</p>
			</div>
		</template>
	</div>
</template>


<script>
import loadMe from '@/common/mixins/load-me';
import Header from '@/components/header/Header';

export default {
	mixins: [loadMe],

	components: {
		'admin-header': Header
	},

	methods: {
	}
};
</script>


<style lang="scss" src="@/common/style/reset.scss"></style>
<style lang="scss" src="@/common/style/classes.scss"></style>
<style lang="scss">
html {
	background: #fbfbfb;
}
body {
	margin-left: 200px;
	font-size: 14px;
	color: #333;
}
a { color: #09c; }
a:hover { color: #f91; }


/* 主内容区 */
.l-main {
	min-width: 800px;
	line-height: 1.5;
}
.l-main__title {
	padding: 10px;
	background: #f0f0f0;
	text-shadow: 1px 1px 0 #fff;
	font-size: 22px;
	font-weight: normal;
}
.l-main__body { padding: 20px; }
</style>
<style lang="scss" scoped>
.p-error {
	position: fixed;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: #293036;

	&__msg {
		font-size: 18px;
		color: #fff;
	}
}
</style>