import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/Home.vue';
import CategoryList from './views/category/List.vue';
import CategoryForm from './views/category/Form.vue';
import OptionsForm from './views/options/Form.vue';
import LinkList from './views/link/List.vue';
import LinkForm from './views/link/Form.vue';
import UserGroupList from './views/usergroup/List.vue';
import UserGroupForm from './views/usergroup/Form.vue';
import UserList from './views/user/List.vue';
import UserForm from './views/user/Form.vue';
import PasswordForm from './views/user/Password.vue';
import ArticleList from './views/article/List.vue';
import ArticleForm from './views/article/Form.vue';
import CommentList from './views/comment/List.vue';


Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: Home
		},

		{
			path: '/category/list',
			component: CategoryList
		},
		{
			path: '/category/create',
			component: CategoryForm
		},
		{
			path: '/category/update/:id',
			component: CategoryForm
		},

		{
			path: '/options/update',
			component: OptionsForm
		},

		{
			path: '/link/list',
			component: LinkList
		},
		{
			path: '/link/create',
			component: LinkForm
		},
		{
			path: '/link/update/:id',
			component: LinkForm
		},

		{
			path: '/usergroup/list',
			component: UserGroupList
		},
		{
			path: '/usergroup/create',
			component: UserGroupForm
		},
		{
			path: '/usergroup/update/:id',
			component: UserGroupForm
		},

		{
			path: '/article/list',
			component: ArticleList
		},
		{
			path: '/article/create',
			component: ArticleForm
		},
		{
			path: '/article/update/:id',
			component: ArticleForm
		},

		{
			path: '/comment/list',
			component: CommentList
		},

		{
			path: '/user/list',
			component: UserList
		},
		{
			path: '/user/create',
			component: UserForm
		},
		{
			path: '/user/update/:id',
			component: UserForm
		},
		{
			path: '/user/i/update',
			component: UserForm,
			meta: {
				isUpdate: 2
			}
		},
		{
			path: '/user/i/update/password',
			component: PasswordForm
		},
		{
			path: '/user/update/password/:username',
			component: PasswordForm
		}

		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (about.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		// }
	]
});