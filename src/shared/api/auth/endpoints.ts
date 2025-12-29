import {createApiEffect} from '../create-api-effect';

import {AuthResponseSchema} from './schemas';

import type {ApiContext, ApiCall, ApiCallFxParams} from '../types';
import type {AuthMeta, AuthResponse} from './schemas';


const API_CONTEXT: ApiContext = {
	isCalledEndpointPublic: true,
};

export const registerUser: ApiCall<AuthResponse> = async (
	apiClient,
	options,
) => {
	const response = await apiClient.post('v1/auth/register', {
		...options,
		context: API_CONTEXT,
	});

	const body = await response.json();

	return AuthResponseSchema.parse(body);
};

export const registerUserFx = createApiEffect(
	async (client, {meta, options}: ApiCallFxParams<AuthMeta>) => {
		const {login, password} = meta;

		return await registerUser(client, {
			...options,
			json: {
				login,
				password,
			},
		});
	},
);

export const loginUser: ApiCall<AuthResponse> = async (
	apiClient,
	options,
) => {
	const response = await apiClient.post('v1/auth/login', {
		...options,
		context: API_CONTEXT,
	});

	const body = await response.json();

	return AuthResponseSchema.parse(body);
};

export const loginUserFx = createApiEffect(
	async (client, {meta, options}: ApiCallFxParams<AuthMeta>) => {
		const {login, password} = meta;

		return await loginUser(client, {
			...options,
			json: {
				login,
				password,
			},
		});
	},
);

export const refreshUser: ApiCall<AuthResponse> = async (
	apiClient,
	options,
) => {
	const response = await apiClient.post('v1/auth/refresh', {
		...options,
		context: API_CONTEXT,
	});

	const body = await response.json();

	return AuthResponseSchema.parse(body);
};

export const refreshUserFx = createApiEffect(
	async (client, {options}: ApiCallFxParams = {}) => {
		return await refreshUser(client, options);
	},
);

export const logoutUser: ApiCall = async (
	apiClient,
	options,
) => {
	await apiClient.post('v1/auth/logout', {
		...options,
		context: API_CONTEXT,
	});
};

export const logoutUserFx = createApiEffect(
	async (client, {options}: ApiCallFxParams = {}) => {
		await logoutUser(client, options);
	},
);
