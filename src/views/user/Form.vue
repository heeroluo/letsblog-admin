<template>
	<div v-if="isUpdate != null">
		<h2 class="l-main__title">
			<template v-if="isUpdate === 1">编辑用户</template>
			<template v-else-if="isUpdate === 2">修改资料</template>
			<template v-else>添加用户</template>
		</h2>

		<form class="l-main__body g-form" @submit.prevent="submit">
			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">用户名<em class="g-required">*</em></p>
						<input class="g-textbox" ref="username" type="text" maxlength="20" v-model.trim="user.username" :readonly="!!isUpdate" />
					</div>
				</div>
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">昵称</p>
						<input class="g-textbox" ref="nickname" type="text" maxlength="20" v-model.trim="user.nickname" />
					</div>
				</div>
			</div>

			<div class="g-form__row" v-if="!isUpdate">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">密码<em class="g-required">*</em></p>
						<input class="g-textbox" ref="password" type="password" maxlength="16" v-model="user.password" />
					</div>
				</div>
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">重复密码<em class="g-required">*</em></p>
						<input class="g-textbox" ref="password2" type="password" maxlength="16" v-model="user.password2" />
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">Email<em class="g-required">*</em></p>
						<input class="g-textbox" ref="email" type="text" maxlength="60" v-model.trim="user.email" />
					</div>
				</div>

				<div class="g-form__row__col">
					<div class="g-form-item" v-if="isUpdate < 2 && groupList">
						<p class="g-form-item__label">用户组<em class="g-required">*</em></p>
						<select ref="groupid" class="g-selectbox" v-model.number="user.groupid">
							<option value="">请选择用户组</option>
							<option v-for="item in groupList" :key="item.groupid" :value="item.groupid">{{ item.groupname }}</option>
						</select>
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
			isUpdate: null, // 0 - 创建; 1 - 管理员更新用户; 2 - 用户更新自己
			user: {
				groupid: ''
			},
			groupList: null
		};
	},

	methods: {
		async submit() {
			const steps = [{
				name: '用户名',
				prop: 'username',
				rules: { username: true }
			}, {
				name: '昵称',
				prop: 'nickname',
				rules: { minLength: 2 },
				required: false
			}, {
				name: 'Email',
				prop: 'email',
				rules: { email: true }
			}];

			if (!this.isUpdate) {
				steps.push({
					name: '密码',
					prop: 'password',
					rules: { password: true }
				}, {
					name: '重复密码',
					prop: 'password2',
					rules: { password: true }
				}, {
					rule(data) {
						return data.password === data.password2;
					},
					message: '两次密码输入不一致'
				});
			}

			if (this.isUpdate < 2) {
				steps.push({
					name: '用户组',
					prop: 'groupid'
				});
			}

			const result = validate(this.user, steps, {
				elements: this.$refs
			});

			if (result) {
				const data = this.isUpdate ? {
					userid: this.user.userid,
					nickname: this.user.nickname,
					email: this.user.email,
					groupid: this.user.groupid
				} : this.user;

				switch (this.isUpdate) {
					case 0:
						await request('admin/user/create', {
							method: 'post',
							data
						});
						alert('创建成功');
						this.$router.push('/user/list');
						break;

					case 1:
						await request('admin/user/update', {
							method: 'put',
							data
						});
						alert('修改成功');
						this.$router.push('/user/list');
						break;

					case 2:
						await request('admin/user/i/update', {
							method: 'put',
							data
						});
						alert('修改成功');
						break;
				}
			}
		}
	},

	async created() {
		this.groupList = (await request('admin/usergroup/list')).userGroupList;

		this.isUpdate = this.$route.meta.isUpdate || (
			this.$route.params.id ? 1 : 0
		);
		switch (this.isUpdate) {
			case 1:
				this.user = (await request('admin/user/read', {
					params: { id: this.$route.params.id }
				})).user;
				break;

			case 2:
				this.user = await this.$store.dispatch('user/login');
				break;
		}
	}
};
</script>