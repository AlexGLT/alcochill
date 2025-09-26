import {createStore, createEffect, combine} from 'effector';

import {apiClient} from '@shared/core/ky';

import {
	loginUser,
	refreshUser,
	registerUser,
} from '@shared/api/auth';

import {isError} from '../api/errors';

import type {Error} from '../api/errors';
import type {UserSession} from '../api/auth';
import type {UserCredentials} from './types';


export const registerUserFx = createEffect<UserCredentials, UserSession, Error>(async ({userName, password}) => {
	const result = await registerUser(userName, password);

	if (isError(result)) {
		throw new Error(result.reason);
	}

	return result;
});

export const loginUserFx = createEffect<UserCredentials, UserSession, Error>(async ({userName, password}) => {
	const result = await loginUser(userName, password);

	if (isError(result)) {
		throw new Error(result.reason);
	}

	return result;
});

export const refreshSessionFx = createEffect<void, UserSession, Error>(async () => {
	const result = await refreshUser();

	if (isError(result)) {
		throw new Error(result.reason);
	}

	return result;
});

const $sessionInfo = createStore<UserSession>({
	accessToken: '',
	expiresAt: new Date(),
})
	.on(registerUserFx.doneData, (_, sessionInfo) => sessionInfo)
	.on(loginUserFx.doneData, (_, sessionInfo) => sessionInfo)
	.on(refreshSessionFx.doneData, (_, sessionInfo) => sessionInfo)
	.reset(registerUserFx.failData)
	.reset(loginUserFx.failData)
	.reset(refreshSessionFx.failData);

const $isAuthorized = $sessionInfo.map(({accessToken, expiresAt}) => {
	return !!accessToken && (+expiresAt > +new Date());
});

const $isAuthorizing = combine([registerUserFx.pending, loginUserFx.pending]).map(([
	isRegisterInProgress,
	isLoginInProgress,
]) => isRegisterInProgress || isLoginInProgress);

export const model = {
	$isAuthorized,
	$isAuthorizing,
	registerUserFx,
	loginUserFx,
	refreshSessionFx,
};

apiClient.extend({
	hooks: {
		beforeRequest: [
			async (request) => {
				const {accessToken, expiresAt} = $sessionInfo.getState();

				let token = accessToken;

				// TODO: move to some constant
				if ((+expiresAt - +new Date()) < 60 * 1000) {
					const result = await refreshSessionFx();

					token = result.accessToken;
				}

				if (accessToken) {
					request.headers.set('Authorization', `Bearer ${token}`);
				}
			},
		],
		afterResponse: [
			async (request, _, response) => {
				if (response.status === 401) {
					try {
						const result = await refreshSessionFx();
						request.headers.set('Authorization', `Bearer ${result.accessToken}`);

						// TODO: add such requests to the queue, to prevent sending multiple refresh requests
						return await apiClient(request);
					} catch (error) {
						return response;
					}
				}

				return response;
			},
		],
	},
});

// TODO: add document.addEventListener('visibilitychange'
