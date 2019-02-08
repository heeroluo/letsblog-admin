import { request } from '@/common/api/api';
import axios from 'axios';
import Paginator from '@/components/paginator/Paginator';

export default {
	components: {
		Paginator
	},

	data() {
		return {
			// 数据列表API地址
			dataListAPI: '',
			// 当前页
			page: 1,
			// 总页数
			pageCount: null,
			// 搜索表单绑定的数据
			params: {},
			// 点击搜索后把 params 扩展到 queryParams
			queryParams: {},
			// 数据列表
			dataList: null,
			// 用于取消文章列表请求的函数
			cancel: null,
			// 数据项唯一id属性的key
			dataItemKey: null,
			// 已选项目
			checkedIds: []
		};
	},

	watch: {
		// 页码变化时加载对应页数据
		page(newValue, oldValue) {
			if (oldValue !== -1) {
				this.loadData();
			}
		},

		// 查询参数变化时重新加载数据
		queryParams() { this.loadData(); }
	},

	computed: {
		dataListParams() {
			return Object.assign({
				page: this.page
			}, this.queryParams);
		}
	},

	methods: {
		async loadData() {
			if (this.cancel) {
				this.cancel();
				this.cancel = null;
			}

			const result = await request(this.dataListAPI, {
				params: this.dataListParams,

				cancelToken: new axios.CancelToken((c) => {
					this.cancel = c;
				})
			});
			this.cancel = null;

			this.pageCount = result.pageCount;
			this.page = result.page;
			this.dataList = result.rows;

			window.scrollTo(0, 0);
		},

		search() {
			if (!this.validateSearch || this.validateSearch()) {
				this.page = 1;
				this.queryParams = Object.assign({}, this.params);
			}
		},

		setPage(e) { this.page = e.page; },

		// 全选/反全选
		toggleAll() {
			if (this.checkedIds.length === this.dataList.length) {
				this.checkedIds = [];
			} else {
				this.checkedIds = this.dataList.map((item) => {
					return item[this.dataItemKey];
				});
			}
		}
	}
};