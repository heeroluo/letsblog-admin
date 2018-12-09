<template>
	<div>
		<h2 class="l-main__title">用户组管理</h2>
		<div class="l-main__body">
			<table class="g-datatable" v-if="list">
				<thead>
					<tr>
						<th>组名</th>
						<th>评论</th>
						<th>文章</th>
						<th>站点设置</th>
						<th>评论管理</th>
						<th>文章管理</th>
						<th>用户管理</th>
						<th>用户数</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in list" :key="item.groupid">
						<td>{{ item.groupname }}</td>
						<td style="text-align: center;">{{ item.perm_comment }}</td>
						<td style="text-align: center;">{{ item.perm_article }}</td>
						<td style="text-align: center;">{{ item.perm_manage_option }}</td>
						<td style="text-align: center;">{{ item.perm_manage_comment }}</td>
						<td style="text-align: center;">{{ item.perm_manage_article }}</td>
						<td style="text-align: center;">{{ item.perm_manage_user }}</td>
						<td style="text-align: center;">{{ item.totalusers }}</td>
						<td style="word-spacing: 1em; text-align: center;">
							<router-link :to="'/usergroup/update/' + item.groupid">修改</router-link>{{ ' ' }}
							<span class="g-delete" @click="del(item.groupid)">删除</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>


<script>
import { request } from '@/common/api/api';

export default {
	data() {
		return {
			list: null
		};
	},

	methods: {
		async del(id) {
			if (window.confirm('确认要删除此链接吗？')) {
				await request('usergroup/delete', {
					method: 'delete',
					params: { id }
				});
				this.list = this.list.filter((item) => {
					return item.groupid !== id;
				});
				alert('操作成功');
			}
		}
	},

	async created() {
		this.list = (await request('usergroup/list')).userGroupList || [];
	}
};
</script>