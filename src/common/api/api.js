import axios from 'axios';


const defaultConfig = {
	timeout: 3000,
	baseURL: 'http://localhost:3020/',
	withCredentials: true
};

export async function request(url, config) {
	config = Object.assign({
		url
	}, defaultConfig, config);

	const response = (await axios.request(config)).data;
	const status = response.status;
	if ((status >= 200 && status < 300) || status === 304) {
		return response.data || {};
	} else {
		const error = new Error(response.message);
		error.statusCode = status;
		throw error;
	}
}