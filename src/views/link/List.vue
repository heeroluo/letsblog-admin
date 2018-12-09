<template>
	<div>
		<h2 class="l-main__title">链接管理</h2>
		<div class="l-main__body">
			<table class="g-datatable" v-if="list">
				<thead>
					<tr>
						<th>站名</th>
						<th>链接</th>
						<th>权重</th>
						<th>介绍</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="list.length > 0">
						<tr v-for="item in list" :key="item.linkid">
							<td>{{ item.linkname }}</td>
							<td><a :href="item.siteurl" target="_blank">{{ item.siteurl }}</a></td>
							<td style="text-align: center;">{{ item.weight }}</td>
							<td>{{ item.introduction }}</td>
							<td style="word-spacing: 1em; text-align: center;">
								<router-link :to="'/link/update/' + item.linkid">修改</router-link>{{ ' ' }}
								<span class="g-delete" @click="del(item.linkid)">删除</span>
							</td>
						</tr>
					</template>
					<tr v-else>
						<td colspan="5">暂无分类</td>
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
				await request('link/delete', {
					method: 'delete',
					params: { id }
				});
				this.list = this.list.filter((item) => {
					return item.linkid !== id;
				});
				alert('操作成功');
			}
		}
	},

	async created() {
		this.list = (await request('link/list')).linkList || [];
	}
};
</script>