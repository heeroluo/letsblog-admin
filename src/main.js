import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;


const joinURL = require('url-join');
Vue.filter('joinURL', (to, from) => {
	return joinURL(from, to);
});


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');