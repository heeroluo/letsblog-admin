<template>
	<div>
		<h2 class="l-main__title">编辑添加分类</h2>
		<form class="l-main__body g-form-layout" @submit.prevent="submit">
			<div class="g-form-layout__row">
				<div class="g-form-layout__row__col">
					<div class="g-form-item">
						<input class="g-textbox" type="text" placeholder="分类名" maxlength="20" v-model="category.categoryname" />
						<div class="g-form-item__side"><em class="g-form-item__required">*</em></div>
					</div>
				</div>
				<div class="g-form-layout__row__col">
					<input class="g-textbox" type="text" placeholder="英文分类名" maxlength="20" v-model="category.categoryname_en" />
				</div>
			</div>

			<div class="g-form-layout__row">
				<div class="g-form-layout__row__col">
					<div class="g-form-item">
						<input class="g-textbox" type="text" placeholder="权重（0~255）" maxlength="3" v-model="category.weight" />
						<div class="g-form-item__side"><em class="g-form-item__required">*</em></div>
					</div>
				</div>
				<div class="g-form-layout__row__col"></div>
			</div>

			<div class="g-form-layout__row">
				<input type="submit" value="提 交" class="g-button" />
			</div>
		</form>
	</div>
</template>


<script>
import { request } from '@/common/api/api';

export default {
	data() {
		return {
			category: {}
		};
	},

	methods: {
		submit() {
			console.log(this.category.categoryname);
		}
	},

	async beforeCreate() {
		this.category = (
			await request('admin/category/read/' + this.$route.params.id)
		).category;
	}
};
</script>