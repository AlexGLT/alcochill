import z from 'zod';

import apiClient from '@shared/core/ky';

import {createError, ErrorReason} from './errors';

import type {Error} from './errors';


const AuthResponseSchema = z.object({
	accessToken: z.string(),
	expiresAt: z.number(),
});

const UserSessionSchema = AuthResponseSchema.transform(({
	accessToken,
	expiresAt,
}) => {
	return {
		accessToken,
		expiresAt: new Date(expiresAt),
	};
});

export type UserSession = z.infer<typeof UserSessionSchema>;

export const registerUser = async (login: string, password: string): Promise<UserSession | Error> => {
	const response = await apiClient.post('v1/auth/register', {
		json: {
			login,
			password,
		},
	});

	if (response.status === 201) {
		try {
			const body = await response.json();

			return UserSessionSchema.parse(body);
		} catch (error) {
			return createError(ErrorReason.PARSE_ERROR);
		}
	}

	return createError(response.status);
};

export const loginUser = async (login: string, password: string): Promise<UserSession | Error> => {
	const response = await apiClient.post('v1/auth/login', {
		json: {
			login,
			password,
		},
	});

	if (response.status === 201) {
		try {
			const body = await response.json();

			return UserSessionSchema.parse(body);
		} catch (error) {
			return createError(ErrorReason.PARSE_ERROR);
		}
	}

	return createError(response.status);
};

export const refreshUser = async (): Promise<UserSession | Error> => {
	const response = await apiClient.post('v1/auth/refresh');

	if (response.status === 201) {
		try {
			const body = await response.json();

			return UserSessionSchema.parse(body);
		} catch (error) {
			return createError(ErrorReason.PARSE_ERROR);
		}
	}

	return createError(response.status);
};
