import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { formatDate } from './common/util/util';

Vue.config.productionTip = false;
Vue.filter('formatDate', (value, format) => {
	return formatDate(new Date(value), format);
});


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');