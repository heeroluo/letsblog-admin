<template>
	<div v-if="isUpdate != null">
		<h2 class="l-main__title"><template v-if="isUpdate">编辑</template><template v-else>添加</template>链接</h2>
		<form class="l-main__body g-form" @submit.prevent="submit">
			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">站名<em class="g-required">*</em></p>
						<input ref="linkname" class="g-textbox" type="text" maxlength="50" v-model.trim="link.linkname" />
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">链接地址<em class="g-required">*</em></p>
						<input ref="siteurl" class="g-textbox" type="text" maxlength="80" v-model.trim="link.siteurl" />
					</div>
				</div>
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">权重<em class="g-required">*</em></p>
						<input ref="weight" class="g-textbox" type="text" placeholder="0~255" maxlength="3" v-model.number="link.weight" />
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">站点简介</p>
						<input ref="introduction" class="g-textbox" type="text" maxlength="255" v-model.trim="link.introduction" />
					</div>
				</div>
			</div>

			<div class="g-form__row g-form__row-button">
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
			link: {},
			isUpdate: false
		};
	},

	methods: {
		async submit() {
			const result = validate(this.link, [
				{
					name: '站名',
					prop: 'linkname'
				},
				{
					name: '链接地址',
					prop: 'siteurl',
					rule: { url: true }
				},
				{
					name: '权重',
					prop: 'weight',
					rule: { weight: true }
				}
			], {
				elements: this.$refs
			});

			if (result) {
				if (this.isUpdate) {
					await request('admin/link/update', {
						method: 'put',
						data: this.link
					});
					alert('修改成功');
				} else {
					await request('admin/link/create', {
						method: 'post',
						data: this.link
					});
					alert('创建成功');
				}

				this.$router.push('/link/list');
			}
		}
	},

	async created() {
		const id = this.$route.params.id;
		if (id) {
			this.link = (
				await request('admin/link/read', {
					params: { id }
				})
			).link;
			this.isUpdate = true;
		} else {
			this.isUpdate = false;
		}
	}
};
</script>