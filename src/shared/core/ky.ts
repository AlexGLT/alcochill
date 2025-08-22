import ky from 'ky';


export const BASE_URL = 'https://840ca558-80be-454c-8a82-9170ec14b807.pub.instances.scw.cloud:8000/api/';

export const API = ky
	.create({
		prefixUrl: BASE_URL,
		headers: {
			'X-API-KEY': localStorage.API_KEY as string,
		},
	});

export default API;
