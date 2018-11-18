<template>
	<div>
		<h2 class="l-main__title">修改密码</h2>
		<form class="g-form l-main__body" @submit.prevent="submit">
			<div class="g-form__row" v-if="!username">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">请输入旧密码<em class="g-required">*</em></p>
						<input class="g-textbox" ref="oldpassword" type="password" maxlength="16" v-model="data.oldpassword" />
					</div>
				</div>
				<div class="g-form__row__col"></div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">请输入新密码<em class="g-required">*</em></p>
						<input class="g-textbox" ref="newpassword" type="password" maxlength="16" v-model="data.newpassword" />
					</div>
				</div>
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">再次输入新密码<em class="g-required">*</em></p>
						<input class="g-textbox" ref="newpassword2" type="password" maxlength="16" v-model="data.newpassword2" />
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
			username: null,
			data: {}
		};
	},

	methods: {
		async submit() {
			const steps = [{
				name: '新密码',
				prop: 'newpassword',
				rules: { password: true }
			}, {
				name: '重复新密码',
				prop: 'newpassword2',
				rules: { password: true }
			}, {
				rule(data) {
					return data.newpassword === data.newpassword2;
				},
				message: '两次新密码输入不一致'
			}];

			// 非管理员修改的情况，要输入旧密码
			if (!this.username) {
				steps.unshift({
					name: '旧密码',
					prop: 'oldpassword',
					rules: { password: true }
				});
			}

			const result = validate(this.data, [{
				name: '新密码',
				prop: 'newpassword',
				rules: { password: true }
			}, {
				name: '重复新密码',
				prop: 'newpassword2',
				rules: { password: true }
			}, {
				rule(data) {
					return data.newpassword === data.newpassword2;
				},
				message: '两次新密码输入不一致'
			}], {
				elements: this.$refs
			});

			if (result) {
				if (this.username) {
					await request('admin/user/update/password', {
						method: 'put',
						data: {
							username: this.username,
							newpassword: this.data.newpassword
						}
					});
					alert('修改成功');
					this.$router.push('/user/list');

				} else {
					await request('admin/user/i/update/password', {
						method: 'put',
						data: {
							oldpassword: this.data.oldpassword,
							newpassword: this.data.newpassword
						}
					});
					alert('修改成功');
				}
			}
		}
	},

	created() {
		this.username = this.$route.params.username;
	}
};
</script>