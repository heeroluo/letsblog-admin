<template>
	<div v-if="isUpdate != null">
		<h2 class="l-main__title"><template v-if="isUpdate">编辑</template><template v-else>发表</template>文章</h2>
		<form class="l-main__body g-form" @submit.prevent="submit">
			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">标题<em class="g-required">*</em></p>
						<input class="g-textbox" ref="title" type="text" maxlength="100" v-model.trim="article.title" />
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">英文标题</p>
						<input class="g-textbox" ref="title_en" type="text" maxlength="150" v-model.trim="article.title_en" />
					</div>
				</div>
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">分类<em class="g-required">*</em></p>
						<select class="g-selectbox" v-model.number="article.categoryid">
							<option value="">请选择分类</option>
							<template v-if="categoryList">
								<option v-for="item in categoryList" :key="item.categoryid" :value="item.categoryid">{{ item.categoryname }}</option>
							</template>
						</select>
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">关键词</p>
						<input class="g-textbox" ref="keywords" type="text" maxlength="255" v-model.trim="article.keywords" />
					</div>
				</div>
				<div class="g-form__row__col">
					<div class="g-form-item">
						<p class="g-form-item__label">状态<em class="g-required">*</em></p>
						<select class="g-selectbox" v-model.number="article.state">
							<option value="">请选择状态</option>
							<option value="0">草稿</option>
							<option value="1">已发布</option>
						</select>
					</div>
				</div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<div class="g-form-item" v-if="canSetWeight">
						<p class="g-form-item__label">权重<em class="g-required">*</em></p>
						<input class="g-textbox" ref="weight" type="text" placeholder="0~255" maxlength="3" v-model.number="article.weight" />
					</div>
				</div>
				<div class="g-form__row__col"></div>
			</div>

			<div class="g-form__row">
				<div class="g-form__row__col">
					<textarea class="ckeditor" ref="content" style="width: 100%; height: 383px;"></textarea>
				</div>
			</div>

			<div class="g-form__row p-upload">
				<input ref="file" type="file" @change="fileChange" />
				<input type="button" value="上传文件" class="g-button" @click="chooseFile" />
				<ul>
					<li v-for="item in uploadList" :key="item.taskId">
						<template v-if="item.status === 0">
							正在上传<em class="p-upload__filename">{{ item.filename }}</em>... <span class="p-upload__cancel" @click="cancelUpload(item.taskId)">取消</span>
						</template>
						<template v-else-if="item.status === 1">
							<em class="p-upload__filename">{{ item.filename }}</em>已被上传到<em class="p-upload__path">{{ item.path }}</em>
							<span class="p-upload__insertlink g-link" @click="insertLink(item.path)">插入为链接</span>
							<span v-if="item.isImage" class="p-upload__insertimg g-link" @click="insertImg(item.path)">插入为图片</span>
						</template>
						<template v-else-if="item.status === 2">
							<em class="p-upload__filename">{{ item.filename }}</em>上传失败：<em class="p-upload__err">{{ item.message }}</em>
						</template>
					</li>
				</ul>
			</div>

			<div class="g-form__row g-form__row-button">
				<div class="g-form__row__col p-submit">
					<div class="g-form-item p-submit__item">
						<input type="submit" value="提 交" class="g-button" />
					</div>
					<div v-if="isUpdate" class="g-form-item p-submit__item p-submit__item-update-pubtime">
						<ul class="g-radio-list g-radio-list-inline">
							<li><label><input type="checkbox" value="1" v-model.number="updatePubTime" /> 更新发布时间</label></li>
						</ul>
					</div>
				</div>
			</div>

		</form>
	</div>
</template>


<script>
import axios from 'axios';
import { request } from '@/common/api/api';
import { validate } from '@/common/validator/validator';
const { getScript } = require('jraiser/ajax/1.5/ajax');

export default {
	data() {
		return {
			editorPromise: null,
			isUpdate: false,
			updatePubTime: 0,
			categoryList: [],
			article: {
				categoryid: '',
				state: '',
				weight: 60,
				content: ''
			},
			canSetWeight: false,
			uploadList: []
		};
	},

	methods: {
		chooseFile() {
			this.$refs.file.click();
		},

		cancelUpload(taskId) {
			for (let i = this.uploadList.length - 1, item; i >= 0; i--) {
				item = this.uploadList[i];
				if (item.taskId === taskId) {
					if (window.confirm(`确定取消上传 ${ item.filename } 吗？`)) {
						item.cancel();
						this.uploadList.splice(i, 1);
					}
					break;
				}
			}
		},

		async fileChange() {
			const file = this.$refs.file.files[0];
			if (!file) { return; }

			let errMsg;
			if (!file.size) { errMsg = '不能上传空文件'; }
			if (file.size > 5 * 1024 * 1024) { errMsg = '文件不能大于5MB'; }
			if (errMsg) {
				alert(errMsg);
				return;
			}

			// 获取文件全名和扩展名
			const filename = file.name;
			const temp = filename.split('.');
			const extName = temp.length > 1 ? temp[temp.length - 1].toLowerCase() : null;

			const task = {
				taskId: this.uploadList.length,
				status: 0,
				filename,
				isImage: ['jpg', 'jpeg', 'png', 'gif', 'bmp'].indexOf(extName) !== -1
			};
			this.uploadList.push(task);

			// 清空控件值，避免不能上传同一个文件
			this.$refs.file.value = '';

			const formData = new FormData();
			formData.append('file', file);

			let res;
			try {
				res = await request('article/attachment/upload', {
					method: 'POST',
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					data: formData,
					cancelToken: new axios.CancelToken((c) => {
						task.cancel = c;
					}),
					showLoading: false
				});
			} catch (e) {
				task.message = e.message;
				task.status = 2;
			}

			if (res) {
				task.path = res.path;
				task.status = 1;
			}
		},

		async getEditor() {
			if (!this.editorPromise) {
				this.editorPromise = getScript(
					process.env.BASE_URL + 'static/ckeditor/4.11/ckeditor.js'
				).then(() => {
					const CKEDITOR = window.CKEDITOR;
					return CKEDITOR.replace(this.$refs.content, {
						height: 350,
						contentsCss: '/article/contentCSS',
						bodyClass: 'article__content'
					});
				});
			}
			return this.editorPromise;
		},

		async setEditorData(data) {
			const editor = await this.getEditor();
			return new Promise((resolve) => {
				editor.setData(data, {
					callback: resolve,
					noSnapshot: true
				});
			});
		},

		async getEditorData() {
			return (await this.getEditor()).getData();
		},

		insertLink(path) {
			const text = window.prompt('请输入链接文字');
			if (text) {
				this.editor.insertHtml(
					`<a href="${ path }" target="_blank">${ text }</a>`
				);
			}
		},

		insertImg(path) {
			const alt = window.prompt('请输入图片说明') || '';
			this.editor.insertHtml(
				`<img src="${ path }" alt="${ alt }" />`
			);
		},

		async submit() {
			let result = validate(this.article, [{
				name: '标题',
				prop: 'title'
			}, {
				name: '英文标题',
				prop: 'title_en',
				required: false,
				rules: {
					enTitle: true
				}
			}, {
				name: '分类',
				prop: 'categoryid'
			}, {
				name: '状态',
				prop: 'state'
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
				const article = Object.assign({}, this.article, {
					content: await this.getEditorData()
				});

				if (this.isUpdate) {
					result = await request('article/update', {
						method: 'put',
						data: {
							article,
							updatePubTime: !!this.updatePubTime
						}
					});
					alert('编辑成功');

				} else {
					result = await request('article/create', {
						method: 'post',
						data: article
					});
					// 创建文章后切换到编辑模式
					this.article.articleid = result.articleid;
					this.isUpdate = true;
					alert('创建成功，您可以继续编辑文章');
				}
			}
		}
	},

	watch: {
		'article.content'(value) {
			this.setEditorData(value);
		}
	},

	async created() {
		const id = this.$route.params.id;
		if (id) {
			this.article = (
				await request('article/read', {
					params: { id }
				})
			).article;
			this.isUpdate = true;
		} else {
			this.isUpdate = false;
		}

		this.categoryList = (await request('category/list')).categoryList || [];
		const me = await this.$store.dispatch('user/login');
		this.canSetWeight = me.usergroup.perm_manage_article > 0;
	},

	async mounted() {
		await this.getEditor();
	}
};
</script>


<style lang="scss" scoped>
.p-upload {
	display: block;

	input[type=file] {
		position: absolute;
		top: -1000px;
		left: -1000px;
	}

	ul { margin-top: 1em; }

	li {
		margin: 0.5em 0;
		color: #666;
	}

	&__cancel {
		margin-left: 1em;
		color: #fd4f45 !important;
		cursor: pointer;
	}

	&__err { color: #fd4f45; }

	&__filename,
	&__path {
		color: #f91;
		margin: 0 12px;
	}

	&__filename {
		color: #000;
		&:first-child { margin-left: 0; }
	}

	&__insertlink,
	&__insertimg {
		margin: 0 8px;
		text-decoration: underline;
		cursor: pointer;
	}
}

.p-submit {
	&__item { display: inline-block; }
	&__item-update-pubtime { margin-left: 20px; }
}
</style>