const API_KEY = 'X-API-KEY';


const BASE_URL = 'https://840ca558-80be-454c-8a82-9170ec14b807.pub.instances.scw.cloud:8000';

const fetchPatched = (endpoint: string, init?: RequestInit): Promise<Response> => {
	return fetch(`${BASE_URL}/${endpoint}`, {
		...init,
		headers: {
			// WHY: this field will be always passed as object
			// eslint-disable-next-line typescript/no-misused-spread
			...init?.headers,
			[API_KEY]: localStorage.API_KEY as string,
		},
	});
};

export {
	fetchPatched as default,
	fetchPatched as fetch,
};
