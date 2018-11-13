import { request } from '@/common/api/api';


export default {
	namespaced: true,

	state: {
		me: null
	},

	mutations: {
		setMe(state, me) { state.me = me; }
	},

	actions: {
		async login({ state, commit }) {
			if (state.me) { return state.me; }

			const me = request('admin/user/whoAmI').then((res) => {
				return res.me || false;
			});
			commit('setMe', me);
			return me;
		}
	}
};