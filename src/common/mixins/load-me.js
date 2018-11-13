export default {
	data() {
		return {
			me: null
		};
	},

	async beforeCreate() {
		this.me = await this.$store.dispatch('user/login');
	}
};