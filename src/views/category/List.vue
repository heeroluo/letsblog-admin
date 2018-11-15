<template>
	<div>
		<h2 class="l-main__title">分类管理</h2>
		<div class="l-main__body">
			<table class="g-datatable" v-if="list && currentOptions">
				<thead>
					<tr>
						<th>分类名</th>
						<th>权重</th>
						<th>文章总数</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="list.length > 0">
						<tr v-for="item in list" :key="item.categoryid">
							<td><a :href="item.href | joinURL(currentOptions.siteurl)" target="_blank">{{ item.categoryname }}</a></td>
							<td style="text-align: center;">{{ item.weight }}</td>
							<td style="text-align: center;">{{ item.totalarticles }}</td>
							<td style="word-spacing: 1em; text-align: center;">
								<router-link :to="'/category/update/' + item.categoryid">修改</router-link>{{' '}}
								<span class="g-delete" @click="del(item.categoryid)">删除</span>
							</td>
						</tr>
					</template>
					<tr v-else>
						<td colspan="4">暂无分类</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>


<script>
import { request } from '@/common/api/api';
import loadOptions from '@/common/mixins/load-options';

export default {
	mixins: [loadOptions],

	data() {
		return {
			list: null
		};
	},

	methods: {
		async del(id) {
			if (window.confirm('确认要删除此分类吗？')) {
				await request('admin/category/delete', {
					method: 'delete',
					params: { id }
				});
				this.list = this.list.filter((item) => {
					return item.categoryid !== id;
				});
				alert('操作成功');
			}
		}
	},

	async created() {
		this.list = (await request('admin/category/list')).categoryList || [];
	}
};
</script>