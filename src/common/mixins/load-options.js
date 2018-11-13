export default {
	data() {
		return {
			currentOptions: null
		};
	},

	async beforeCreate() {
		this.currentOptions = await this.$store.dispatch('options/load');
	}
};