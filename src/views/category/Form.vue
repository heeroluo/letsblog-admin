<template>
	<div v-if="isUpdate != null">
		<h2 class="l-main__title"><template v-if="isUpdate">编辑</template><template v-else>添加</template>分类</h2>
		<form class="l-main__body g-form" @submit.prevent="submit">
			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<input ref="categoryname" class="g-textbox" type="text" placeholder="分类名" maxlength="20" v-model.trim="category.categoryname" />
						<div class="g-form-item__side"><em class="g-required">*</em></div>
					</div>
				</div>
				<div class="g-form__row__col">
					<input ref="categoryname_en" class="g-textbox" type="text" placeholder="英文分类名" maxlength="20" v-model.trim="category.categoryname_en" />
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<input ref="weight" class="g-textbox" type="text" placeholder="权重（0~255）" maxlength="3" v-model.number="category.weight" />
						<div class="g-form-item__side"><em class="g-required">*</em></div>
					</div>
				</div>
				<div class="g-form__row__col"></div>
			</div>

			<div class="g-form__row">
				<input type="submit" value="提 交" class="g-button" />
			</div>
		</form>
	</div>
</template>


<script>
import { request } from '@/common/api/api';
import { validate } from '@/common/validator/validator';

export default {
	data() {
		return {
			category: {},
			isUpdate: null
		};
	},

	methods: {
		async submit() {
			const result = validate(this.category, [{
				name: '分类名',
				prop: 'categoryname'
			}, {
				name: '英文分类名',
				prop: 'categoryname_en',
				required: false,
				rules: {
					enTitle: true
				}
			}, {
				name: '权重',
				prop: 'weight',
				rules: {
					weight: true
				}
			}], {
				elements: this.$refs
			});

			if (result) {
				if (this.isUpdate) {
					await request('admin/category/update', {
						method: 'put',
						data: this.category
					});
					alert('修改成功');
				} else {
					await request('admin/category/create', {
						method: 'post',
						data: this.category
					});
					alert('创建成功');
				}

				this.$router.push('/category/list');
			}
		}
	},

	async created() {
		const id = this.$route.params.id;
		if (id) {
			this.category = (
				await request('admin/category/read/' + id)
			).category;
			this.isUpdate = true;
		} else {
			this.isUpdate = false;
		}
	}
};
</script>