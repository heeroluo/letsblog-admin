<template>
	<div v-if="isAuditPage != null">
		<h2 class="l-main__title">
			<template v-if="isAuditPage">审核评论</template>
			<template v-else>评论管理</template>
		</h2>
		<div class="l-main__body">
			<form class="g-form" @submit.prevent="batch" v-if="dataList">
				<table class="g-datatable">
					<thead>
						<tr>
							<th><input type="checkbox" @click="toggleAll" :checked="dataList.length === checkedIds.length" /></th>
							<th style="width: 15%;">文章</th>
							<th>发布者</th>
							<th style="width: 45%;">内容</th>
							<th>发布时间</th>
							<th>状态</th>
						</tr>
					</thead>
					<tfoot v-if="pageCount > 0">
						<tr v-if="pageCount > 1">
							<td colspan="6">
								<paginator :pageCount="pageCount" :currentPage="page" @click="setPage" />
							</td>
						</tr>
						<tr>
							<td colspan="6">
								<select class="g-selectbox" style="width: 8em; margin-right: 0.6em;" v-model="batchAction">
									<option value="">请选择操作</option>
									<option value="audit">审核通过</option>
									<option value="delete">删除</option>
								</select>
								<input type="submit" value="批量操作" class="g-button" style="vertical-align: middle;" />
							</td>
						</tr>
					</tfoot>
					<tbody>
						<template v-if="dataList.length > 0">
							<tr v-for="item in dataList" :key="item.commentid">
								<td style="text-align: center;">
									<input type="checkbox" :value="item.commentid" v-model.number="checkedIds" />
								</td>
								<td>
									<a v-if="item.article" :href="item.article.href" target="_blank">{{ item.article.title }}</a>
								</td>
								<td>
									{{ item.user_nickname }}<br />
									Email: {{ item.user_email }}<br />
									QQ: {{ item.user_qq }}
								</td>
								<td>{{ item.content }}</td>
								<td style="text-align: center;">{{ item.pubtime | formatDate('YYYY-MM-DD hh:mm:ss') }}</td>
								<td>
									<template v-if="item.state === 1">已审</template>
									<template v-else>未审</template>
								</td>
							</tr>
						</template>
						<tr v-else>
							<td colspan="6">没有符合搜索条件的评论</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
	</div>
</template>


<script>
import { request } from '@/common/api/api';
import searchPage from '@/common/mixins/search-page';

export default {
	mixins: [searchPage],

	data() {
		return {
			// 为 true 时是评论审核页，为 false 时是评论管理页
			isAuditPage: null,
			// 批量操作动作
			batchAction: '',
			// 初始化时读取最新一页评论
			page: -1
		};
	},

	computed: {
		dataListParams() {
			return Object.assign({
				state: this.isAuditPage ? 0 : null,
				page: this.page
			}, this.queryParams);
		}
	},

	methods: {
		async batch() {
			if (!this.batchAction) {
				alert('请选择要执行的操作');
				return;
			}
			if (!this.checkedIds.length) {
				alert('请选中要操作的评论');
				return;
			}
			if (window.confirm('确认要执行指定的操作吗？')) {
				await request('comment/list/batch', {
					method: 'post',
					data: {
						action: this.batchAction,
						commentids: this.checkedIds
					}
				});
				alert('操作成功');
				await this.loadData();
			}
		}
	},

	async created() {
		this.isAuditPage = this.$route.query.type === 'audit';
		this.dataListAPI = 'comment/list';
		this.dataItemKey = 'commentid';
		this.loadData();
	}
};
</script>