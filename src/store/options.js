import { request } from '@/common/api/api';


export default {
	namespaced: true,

	state: {
		options: null
	},

	mutations: {
		set(state, options) { state.options = options; },

		clear(state) { state.options = null; }
	},

	actions: {
		async load({ state, commit }) {
			if (state.me) { return state.me; }

			const options = request('admin/options/read').then((res) => {
				return res.options;
			});
			commit('set', options);
			return options;
		},

		async update({ commit }, data) {
			await request('admin/options/update', {
				method: 'put',
				data
			});
			commit('clear');
		}
	}
};