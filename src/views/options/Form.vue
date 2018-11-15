<template>
	<div>
		<h2 class="l-main__title">网站设置</h2>
		<form class="l-main__body g-form" @submit.prevent="submit" v-if="currentOptions">
			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">网站名称<em class="g-required">*</em></p>
						<input ref="sitename" class="g-textbox" type="text" maxlength="50" v-model.trim="currentOptions.sitename" />
					</div>
				</div>
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">网站URL<em class="g-required">*</em></p>
						<input ref="siteurl" class="g-textbox" type="text" maxlength="80" v-model.trim="currentOptions.siteurl" />
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">网站关键词</p>
						<input ref="keywords" class="g-textbox" type="text" placeholder="多个关键词用逗号隔开" maxlength="255" v-model.trim="currentOptions.keywords" />
					</div>
				</div>
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">网站开关 <em class="g-required">*</em></p>
						<ul class="g-radio-list g-radio-list-inline">
							<li><label><input type="radio" value="1" v-model.number="currentOptions.isopen" /> 开放</label></li>
							<li><label><input type="radio" value="0" v-model.number="currentOptions.isopen" /> 关闭</label></li>
						</ul>
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">网站描述</p>
						<textarea ref="description" class="g-textbox" cols="30" rows="4" v-model.trim="currentOptions.description"></textarea>
					</div>
				</div>
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">关站提示 <span class="g-tips">（网站开关设为关闭时显示）</span></p>
						<textarea ref="tipstext" class="g-textbox" cols="30" rows="4" v-model.trim="currentOptions.tipstext"></textarea>
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">统计代码</p>
						<textarea ref="statcode" class="g-textbox" cols="60" rows="4" v-model.trim="currentOptions.statcode"></textarea>
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
import loadOptions from '@/common/mixins/load-options';
import { validate } from '@/common/validator/validator';

export default {
	mixins: [loadOptions],

	methods: {
		async submit() {
			const result = validate(this.currentOptions, [{
				name: '网站名称',
				prop: 'sitename'
			}, {
				name: '网站URL',
				prop: 'siteurl',
				rules: { url: true }
			}, {
				name: '网站开关',
				prop: 'isopen'
			}], {
				elements: this.$refs
			});

			if (result) {
				await this.$store.dispatch('options/update', this.currentOptions);
				alert('操作成功');
			}
		}
	}
};
</script>