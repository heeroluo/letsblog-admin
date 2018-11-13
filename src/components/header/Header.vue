<template>
	<header class="c-header" v-if="me">
		<h1 class="c-header__logo">LetsBlog <sup>0.4.0</sup></h1>

		<nav class="c-header__nav">
			<h2 class="c-header__nav__menu-title">我的操作</h2>
			<ul class="c-header__nav__menu-list">
				<template v-if="me.usergroup.perm_article >= 1">
					<li class="c-header__nav__menu-list__item"><router-link to="/article/create/">写文章</router-link></li>
					<li class="c-header__nav__menu-list__item"><router-link to href="/article/list/?type=personal">我的文章</router-link></li>
				</template>
				<li class="c-header__nav__menu-list__item"><router-link to="/user/i/update/">修改资料</router-link></li>
				<li class="c-header__nav__menu-list__item"><router-link to="/user/i/update/password/">修改密码</router-link></li>
				<li class="c-header__nav__menu-list__item"><router-link to="/user/logout">登出</router-link></li>
			</ul>

			<template v-if="me.usergroup.perm_manage_article >= 1">
				<h2 class="c-header__nav__menu-title">文章</h2>
				<ul class="c-header__nav__menu-list">
					<li class="c-header__nav__menu-list__item"><router-link to="/admin/article/list/">文章管理</router-link></li>
					<li class="c-header__nav__menu-list__item" v-if="me.usergroup.perm_manage_article >= 2">
						分类 ( <router-link to="/admin/category/create/">新建</router-link> | <router-link to="/admin/category/list/">管理</router-link> )
					</li>
				</ul>
			</template>

			<template v-if="me.usergroup.perm_manage_comment >= 1">
				<h2 class="c-header__nav__menu-title">评论</h2>
				<ul class="c-header__nav__menu-list">
					<li class="c-header__nav__menu-list__item"><router-link to="/admin/comment/list/?state=0">审核评论</router-link></li>
					<li class="c-header__nav__menu-list__item"><router-link to="/admin/comment/list/">评论管理</router-link></li>
				</ul>
			</template>

			<template v-if="me.usergroup.perm_manage_user >= 1">
				<h2 class="c-header__nav__menu-title">用户</h2>
				<ul class="c-header__nav__menu-list">
					<li class="c-header__nav__menu-list__item">用户 ( <router-link to="/admin/user/create/">新建</router-link> | <router-link to href="/admin/user/list/">管理</router-link> )</li>
					<li class="c-header__nav__menu-list__item" v-if="me.usergroup.perm_manage_user >= 2">
						用户组 ( <router-link to="/admin/usergroup/create/">新建</router-link> | <router-link to="/admin/usergroup/list/">管理</router-link> )
					</li>
				</ul>
			</template>

			<template v-if="me.usergroup.perm_manage_option >= 1">
				<h2 class="c-header__nav__menu-title">站点设置</h2>
				<ul class="c-header__nav__menu-list">
					<li class="c-header__nav__menu-list__item"><router-link to="/admin/options/update/">常规设置</router-link></li>
					<li class="c-header__nav__menu-list__item">友情链接 ( <router-link to="/admin/link/create/">新建</router-link> | <router-link to="/admin/link/list/">管理</router-link> )</li>
				</ul>
			</template>
		</nav>
	</header>
</template>


<script>
import loadMe from '@/common/mixins/load-me';

export default {
	mixins: [loadMe]
};
</script>


<style lang="scss">
.c-header {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: 9000;
	width: 200px;
	background: #293036;

	&__logo {
		margin: 20px 0 32px 0;
		color: #fefefe;
		font-family: 'Source Sans Pro', 'Arial';
		font-size: 30px;
		text-align: center;

		sup {
			padding: 2px;
			border-radius: 3px;
			background: #80bd01;
			font-size: 12px;
			font-family: arial;
			font-weight: normal;
			color: #fff;
		}
	}

	&__nav {
		margin-left: 14px;

		&__menu-title {
			margin: 28px 0 16px 0;
			font-size: 16px;
			color: #ddd;
		}

		&__menu-list {
			margin-left: 1.5em;

			&__item {
				margin-top: 12px;
				list-style-type: disc;
				color: #888;

				a {
					color: #888;
					transition-duration: 0.35s;
					transition-property: color;
				}
				a:hover { color: #80bd01 !important; }

				&--current {
					padding: 5px 0;
					border-right: 4px solid #80bd01;
				}

				&--current,
				&--current a {
					color: #efefef;
				}
			}
		}
	}
}
</style>