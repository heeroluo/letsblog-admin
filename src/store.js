import Vue from 'vue';
import Vuex from 'vuex';
import UserModule from '@/store/user';
import OptionsModule from '@/store/options';


Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user: UserModule,
		options: OptionsModule
	},

	state: {

	},

	mutations: {

	},

	actions: {

	}
});