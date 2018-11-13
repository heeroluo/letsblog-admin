import { request } from '@/common/api/api';


export default {
	namespaced: true,

	state: {
		options: null
	},

	mutations: {
		setOptions(state, options) { state.options = options; }
	},

	actions: {
		async load({ state, commit }) {
			if (state.me) { return state.me; }

			const options = request('admin/options/read').then((res) => {
				return res.options;
			});
			commit('setOptions', options);
			return options;
		}
	}
};