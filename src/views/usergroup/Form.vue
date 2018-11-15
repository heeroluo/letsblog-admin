<template>
	<div v-if="isUpdate != null">
		<h2 class="l-main__title"><template v-if="isUpdate">编辑</template><template v-else>添加</template>用户组</h2>
		<form class="l-main__body g-form" @submit.prevent="submit">
			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">用户组名<em class="g-required">*</em></p>
						<input ref="groupname" class="g-textbox" type="text" maxlength="20" v-model.trim="userGroup.groupname" />
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<p class="g-form-item__label">评论权限 <em class="g-required">*</em></p>
					<ul class="g-radio-list">
						<li><label><input name="perm_comment" type="radio" value="0" v-model.number="userGroup.perm_comment" /> 无</label></li>
						<li><label><input name="perm_comment" type="radio" value="1" v-model.number="userGroup.perm_comment" /> 发表后需经过管理员审核才能显示</label></li>
						<li><label><input name="perm_comment" type="radio" value="2" v-model.number="userGroup.perm_comment" /> 发表后直接显示</label></li>
					</ul>
				</div>

				<div class="g-form__row__col">
					<p class="g-form-item__label">文章发布权限 <em class="g-required">*</em></p>
					<ul class="g-radio-list">
						<li><label><input name="perm_article" type="radio" value="0" v-model.number="userGroup.perm_article" /> 无</label></li>
						<li><label><input name="perm_article" type="radio" value="1" v-model.number="userGroup.perm_article" /> 有</label></li>
					</ul>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<p class="g-form-item__label">评论管理权限 <em class="g-required">*</em></p>
					<ul class="g-radio-list">
						<li><label><input name="perm_manage_comment" type="radio" value="0" v-model.number="userGroup.perm_manage_comment" /> 无</label></li>
						<li><label><input name="perm_manage_comment" type="radio" value="1" v-model.number="userGroup.perm_manage_comment" /> 有</label></li>
					</ul>
				</div>

				<div class="g-form__row__col">
					<p class="g-form-item__label">站点设置权限 <em class="g-required">*</em></p>
					<ul class="g-radio-list">
						<li><label><input name="perm_manage_option" type="radio" value="0" v-model.number="userGroup.perm_manage_option" /> 无</label></li>
						<li><label><input name="perm_manage_option" type="radio" value="1" v-model.number="userGroup.perm_manage_option" /> 有</label></li>
					</ul>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<p class="g-form-item__label">文章管理权限 <em class="g-required">*</em></p>
					<ul class="g-radio-list">
						<li><label><input name="perm_manage_article" type="radio" value="0" v-model.number="userGroup.perm_manage_article" /> 无</label></li>
						<li><label><input name="perm_manage_article" type="radio" value="1" v-model.number="userGroup.perm_manage_article" /> 可以添加、编辑、删除任意文章</label></li>
						<li><label><input name="perm_manage_article" type="radio" value="2" v-model.number="userGroup.perm_manage_article" /> 可以添加、编辑、删除任意文章和文章分类</label></li>
					</ul>
				</div>

				<div class="g-form__row__col">
					<p class="g-form-item__label">用户管理权限 <em class="g-required">*</em></p>
					<ul class="g-radio-list">
						<li><label><input name="perm_manage_user" type="radio" value="0" v-model.number="userGroup.perm_manage_user" /> 无</label></li>
						<li><label><input name="perm_manage_user" type="radio" value="1" v-model.number="userGroup.perm_manage_user" /> 可以添加权限与自己相同或比自己低的用户</label></li>
						<li><label><input name="perm_manage_user" type="radio" value="2" v-model.number="userGroup.perm_manage_user" /> 可以添加、编辑、删除任意用户及用户组</label></li>
					</ul>
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
			isUpdate: null,
			userGroup: {}
		};
	},

	methods: {
		async submit() {
			const result = validate(this.userGroup, [{
				name: '用户组名',
				prop: 'groupname'
			}, {
				name: '评论权限',
				prop: 'perm_comment'
			}, {
				name: '文章发布权限',
				prop: 'perm_article'
			}, {
				name: '评论管理权限',
				prop: 'perm_manage_comment'
			}, {
				name: '站点设置权限',
				prop: 'perm_manage_option'
			}, {
				name: '文章管理权限',
				prop: 'perm_manage_article'
			}, {
				name: '用户管理权限',
				prop: 'perm_manage_user'
			}], {
				elements: this.$refs
			});

			if (result) {
				if (this.isUpdate) {
					await request('admin/usergroup/update', {
						method: 'put',
						data: this.userGroup
					});
					alert('修改成功');
				} else {
					await request('admin/usergroup/create', {
						method: 'post',
						data: this.userGroup
					});
					alert('创建成功');
				}

				this.$router.push('/usergroup/list');
			}
		}
	},

	async created() {
		const id = this.$route.params.id;
		if (id) {
			this.userGroup = (
				await request('admin/usergroup/read', {
					params: { id }
				})
			).userGroup;
			this.isUpdate = true;
		} else {
			this.isUpdate = false;
		}
	}
};
</script>