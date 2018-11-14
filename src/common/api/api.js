import axios from 'axios';


const defaultConfig = {
	timeout: 3000,
	baseURL: 'http://localhost:3020/',
	withCredentials: true,
	validateStatus() { return true; }
};

axios.interceptors.response.use((res) => {
	res = res.data;
	const status = res.status;
	if ((status >= 200 && status < 300) || status === 304) {
		return res.data || {};
	} else {
		const error = new Error(res.message);
		error.statusCode = status;
		return Promise.reject(error);
	}
});

export async function request(url, config) {
	config = Object.assign({
		url
	}, defaultConfig, config);

	return axios.request(config);
}