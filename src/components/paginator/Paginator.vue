<template>
	<ol class="c-paginator" v-if="data">
		<li
			class="c-paginator__item c-paginator__item-prev"
			:class="{ 'c-paginator__item--disabled': data.currentPage <= 1 }"
		>
			<span class="c-paginator__item__inner g-iconfont" @click="setPage(data.currentPage - 1)"></span>
		</li>

		<template v-for="(item, index) in data.pageNumbers">
			<li v-if="item.page === '...'" :key="index" class="c-paginator__item c-paginator__item-ellipsis">
				<span class="c-paginator__item__inner g-iconfont"></span>
			</li>
			<li
				v-else
				:key="index"
				class="c-paginator__item c-paginator__item-number"
				:class="{ 'c-paginator__item--current': item.page === currentPage }"
			>
				<span class="c-paginator__item__inner" @click="setPage(item.page)">{{ item.page }}</span>
			</li>
		</template>

		<li
			class="c-paginator__item c-paginator__item-next"
			:class="{ 'c-paginator__item--disabled': data.currentPage >= data.pageCount }"
		>
			<span class="c-paginator__item__inner g-iconfont" @click="setPage(data.currentPage + 1)"></span>
		</li>
	</ol>
</template>


<script>
export default {
	props: {
		currentPage: {
			type: Number,
			required: true
		},

		pageCount: {
			type: Number,
			required: true
		}
	},

	computed: {
		// 生成分页条数据
		data() {
			const currentPage = this.currentPage;
			const pageCount = this.pageCount;

			if (!currentPage || !pageCount) { return; }

			const howManyPageItems = 7;
			const howManyPageItemsPerSide = parseInt((howManyPageItems - 1) / 2);

			const data = [];

			let start = currentPage - howManyPageItemsPerSide;
			let end = currentPage + howManyPageItemsPerSide;
			const startOverflow = start - 1;
			const endOverflow = pageCount - end;

			// 把左侧剩余的页码额度移到右侧
			if (startOverflow < 0) {
				start = 1;
				end = Math.min(pageCount, end - startOverflow);
			}
			// 把右侧剩余的页码移到左侧
			if (endOverflow < 0) {
				end = pageCount;
				if (startOverflow > 0) { start = Math.max(1, start + endOverflow); }
			}

			// 处理 howManyPageItems 为双数，减一后除不尽的情况
			if (howManyPageItems % 2 === 0) {
				if (start > 1) {
					start--;
				} else if (end < pageCount) {
					end++;
				}
			}

			// 开始页码大于1，但第一页一定要显示，所以要减一个额度
			if (start > 1) { start++; }
			// 结束页码小于总页数，但最后一页一定要显示，所以要减一个额度
			if (end < pageCount) { end--; }

			// 补充第一页到开始页
			if (start - 1) {
				data.push({
					page: 1,
					current: false
				}, {
					page: '...'
				});
			}

			for (let i = start; i <= end; i++) {
				data.push({
					page: i,
					current: i == currentPage
				});
			}

			// 补充结束页到末页
			if (pageCount - end) {
				data.push({
					page: '...'
				}, {
					page: pageCount,
					current: false
				});
			}

			return {
				currentPage,
				pageCount,
				pageNumbers: data
			};
		}
	},

	methods: {
		setPage(page) {
			this.$emit('click', { page });
		}
	}
};
</script>


<style lang="scss">
.c-paginator {
	position: relative;
	width: 100%;
	font-family: Tahoma;
	text-align: center;
}
.c-paginator__item {
	display: inline-block;
	margin: 0 8px;
}
.c-paginator__item__inner {
	display: block;
	width: 30px;
	height: 30px;
	line-height: 30px;
	border-radius: 50%;
	border: 1px solid #e3e3e3;
	color: #999;
	cursor: pointer;
}
a.c-paginator__item__inner:hover {
	border-color: #999;
	color: #666 !important;
	text-decoration: none;
}
.c-paginator__item--current .c-paginator__item__inner {
	background: #80bd01;
	border-color: #80bd01;
	color: #fff;
}
.c-paginator__item-prev,
.c-paginator__item-next {
	position: absolute;
	top: 0;
	margin: 0;
}
.c-paginator__item-prev { left: 0; }
.c-paginator__item-next { right: 0; }
.c-paginator__item--disabled { display: none; }
.c-paginator__item-ellipsis {
	margin-left: 0;
	margin-right: 0;
}
.c-paginator__item-ellipsis .c-paginator__item__inner { border: none; }
.c-paginator__item-ellipsis .c-paginator__item__inner:after { content: '\e637'; }
.c-paginator__item-prev .c-paginator__item__inner:after { content: '\e63a'; }
.c-paginator__item-next .c-paginator__item__inner:after { content: '\e63b'; }

@media (max-width: 767px) {
	.c-paginator__item {
		margin-left: 3px;
		margin-right: 3px;
	}
	.c-paginator__item--prev,
	.c-paginator__item--next { margin: 0; }
}
</style>