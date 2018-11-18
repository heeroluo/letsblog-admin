<template>
	<div v-if="isPersonalPage != null">
		<h2 class="l-main__title">
			<template v-if="isPersonalPage">我的文章</template>
			<template v-else>文章管理</template>
		</h2>
		<div class="l-main__body">
			<form class="g-form" style="margin-bottom: 2.5em;" v-if="!isPersonalPage" @submit.prevent="search">
				<h3 class="g-form__title">文章搜索</h3>
				<div class="g-form__row">
					<div class="g-form__row__col">
						<div class="g-form-item">
							<input class="g-textbox" type="text" placeholder="文章标题" maxlength="100" v-model.trim="params.title" />
						</div>
					</div>
					<div class="g-form__row__col">
						<div class="g-form-item">
							<input class="g-textbox" type="text" placeholder="发布者" maxlength="20" v-model.trim="params.username" />
						</div>
					</div>
					<div class="g-form__row__col">
						<div class="g-form-item">
							<select class="g-selectbox" v-model.number="params.categoryid" v-if="categoryList">
								<option value="">文章分类</option>
								<option v-for="item in categoryList" :key="item.categoryid" :value="item.categoryid">{{ item.categoryname }}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="g-form__row">
					<div class="g-form__row__col">
						<div class="g-form-item">
							<input class="g-textbox" type="text" placeholder="最小权重" maxlength="3" v-model.number="params.min_weight" />
						</div>
					</div>
					<div class="g-form__row__col">
						<div class="g-form-item">
							<input class="g-textbox" type="text" placeholder="最大权重" maxlength="3" v-model.number="params.max_weight" />
						</div>
					</div>
					<div class="g-form__row__col">
						<div class="g-form-item">
							<select class="g-selectbox" v-model.number="params.state">
								<option value="">发布状态</option>
								<option value="0">状态：草稿</option>
								<option value="1">状态：已发布</option>
							</select>
						</div>
					</div>
				</div>
				<div class="g-form__row">
					<input type="submit" value="搜 索" class="g-button" />
				</div>
			</form>

			<form class="g-form" @submit="batch" v-if="dataList">
				<table class="g-datatable">
					<thead>
						<tr>
							<th><input type="checkbox" @click="toggleAll" :checked="dataList.length === checkedIds.length" /></th>
							<th>标题</th>
							<th>分类</th>
							<th>发布者</th>
							<th>状态</th>
							<th>发布时间</th>
							<th>权重</th>
							<th>操作</th>
						</tr>
					</thead>
					<tfoot v-if="pageCount > 0">
						<tr v-if="pageCount > 1">
							<td colspan="8">
								<paginator :pageCount="pageCount" :currentPage="page" @click="setPage" />
							</td>
						</tr>
						<tr>
							<td colspan="8">
								<input type="submit" value="批量删除" class="g-button" />
							</td>
						</tr>
					</tfoot>
					<tbody>
						<template v-if="dataList.length > 0">
							<tr v-for="item in dataList" :key="item.articleid">
								<td style="text-align: center;">
									<input type="checkbox" :value="item.articleid" v-model.number="checkedIds" />
								</td>
								<td>
									<a :href="item.href | joinURL(currentOptions.siteurl)" target="_blank">{{ item.title }}</a>
								</td>
								<td style="text-align: center;">{{ item.category.categoryname }}</td>
								<td style="text-align: center;">{{ item.user.name }}</td>
								<td style="text-align: center;">{{ item.state === 1 ? '已发布' : '草稿' }}</td>
								<td style="text-align: center;">{{ item.pubtime | formatDate('YYYY-MM-DD hh:mm:ss') }}</td>
								<td style="text-align: center;">{{ item.weight }}</td>
								<td style="text-align: center;">
									<router-link :to="'/article/update/' + item.articleid">编辑</router-link>
								</td>
							</tr>
						</template>
						<tr v-else>
							<td colspan="8">没有符合搜索条件的文章</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	</div>
</template>


<script>
import { request } from '@/common/api/api';
import { validate } from '@/common/validator/validator';
import loadOptions from '@/common/mixins/load-options';
import searchPage from '@/common/mixins/search-page';

export default {
	mixins: [searchPage, loadOptions],

	data() {
		return {
			// 为 true 时是个人文章列表页，为 false 时是文章管理页
			isPersonalPage: null,
			// 分类列表
			categoryList: []
		};
	},

	computed: {
		dataListParams() {
			return Object.assign({
				type: this.isPersonalPage ? 'personal' : '',
				page: this.page
			}, this.queryParams);
		}
	},

	methods: {
		batch() {},

		validateSearch() {
			return validate(this.params, [{
				name: '最小权重',
				prop: 'min_weight',
				rule: { weight: true }
			}, {
				name: '最大权重',
				prop: 'max_weight',
				rule: { weight: true }
			}, {
				rule(data) {
					return data.max_weight >= data.min_weight;
				},
				message: '最小权重不能大于最大权重'
			}]);
		}
	},

	async created() {
		this.isPersonalPage = this.$route.params.type === 'personal';
		this.dataListAPI = 'admin/article/list';
		this.params.categoryid = '';
		this.params.state = '';
		this.dataItemKey = 'articleid';
		this.categoryList = (await request('admin/category/list')).categoryList;
		this.loadData();
	}
};
</script>