<template>
	<div>
		<h2 class="l-main__title">用户管理</h2>
		<div class="l-main__body">
			<form class="g-form" style="margin-bottom: 2.5em;" @submit="search">
				<h3 class="g-form__title">用户搜索</h3>
				<div class="g-form__row">
					<div class="g-form__row__col">
						<div class="g-form-item">
							<input ref="search-name" class="g-textbox" type="text" placeholder="用户名或昵称" maxlength="20" v-model.trim="params.name" />
						</div>
					</div>
					<div class="g-form__row__col">
						<div class="g-form-item">
							<select ref="search-groupid" class="g-selectbox" v-model.number="params.groupid" v-if="groupList">
								<option value="">用户组</option>
								<option v-for="item in groupList" :key="item.groupid" :value="item.groupid">{{ item.groupname }}</option>
							</select>
						</div>
					</div>
					<div class="g-form__row__col">
						<input type="submit" value="搜 索" class="g-button" />
					</div>
				</div>
			</form>

			<form class="g-form">
				<table class="g-datatable" v-if="dataList">
					<thead>
						<tr>
							<th><input type="checkbox" @click="toggleAll" :checked="dataList.length === checkedIds.length" /></th>
							<th>用户名</th>
							<th>昵称</th>
							<th>用户组</th>
							<th>注册时间</th>
							<th>最后在线</th>
							<th>文章 / 评论</th>
							<th>操作</th>
						</tr>
					</thead>
					<tfoot>
						<tr v-if="pageCount > 1">
							<td colspan="8">
								<paginator :pageCount="pageCount" :currentPage="page" @click="setPage" />
							</td>
						</tr>
						<tr v-if="dataList.length">
							<td colspan="8">
								<input type="submit" value="批量删除" class="g-button" />
							</td>
						</tr>
					</tfoot>
					<tbody>
						<template v-if="dataList.length">
							<tr v-for="item in dataList" :key="item.userid">
								<td style="text-align: center;">
									<input type="checkbox" :value="item.userid" v-model.number="checkedIds" />
								</td>
								<td>{{ item.username }}</td>
								<td>{{ item.nickname }}</td>
								<td>{{ item.usergroup.groupname }}</td>
								<td style="text-align: center;">{{ item.regtime | formatDate('YYYY-MM-DD hh:mm:ss') }}</td>
								<td style="text-align: center;">{{ item.lastactivity | formatDate('YYYY-MM-DD hh:mm:ss') }}</td>
								<td style="text-align: center;">{{ item.totalarticles }} / {{ item.totalcomments }}</td>
								<td style="word-spacing: 1em; text-align: center;">
									<router-link :to="'/admin/user/update/' + item.userid">编辑</router-link>{{ ' ' }}
									<router-link :to="'/admin/user/update/password/' + item.username">修改密码</router-link>
								</td>
							</tr>
						</template>
						<tr v-else>
							<td colspan="8">没有符合搜索条件的用户</td>
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
import axios from 'axios';

export default {
	mixins: [searchPage],

	data() {
		return {
			groupList: null
		};
	},

	methods: {
		async loadData() {
			if (this.cancel) {
				this.cancel();
				this.cancel = null;
			}

			const result = await request('admin/user/list', {
				params: Object.assign({
					page: this.page
				}, this.queryParams),

				cancelToken: new axios.CancelToken((c) => {
					this.cancel = c;
				})
			});
			this.cancel = null;

			this.pageCount = result.pageCount;
			this.page = result.page;
			this.dataList = result.rows;

			window.scrollTo(0, 0);
		}
	},

	async created() {
		this.params.groupid = '';
		this.dataItemKey = 'groupid';
		this.groupList = (await request('admin/usergroup/list')).userGroupList;
		this.loadData();
	}
};
</script>