import {createEvent, createStore} from 'effector';
import ky from 'ky';

import type {ApiClient} from './types';


export const apiClientUpdated = createEvent<ApiClient>();

export const BASE_URL = 'https://840ca558-80be-454c-8a82-9170ec14b807.pub.instances.scw.cloud:8000/api/';

export const $apiClient = createStore<ApiClient>(
	ky.create({
		prefixUrl: BASE_URL,
		credentials: 'include',
		throwHttpErrors: true,
		retry: 0,
	}),
	{serialize: 'ignore'},
).on(apiClientUpdated, (_, client) => client);
