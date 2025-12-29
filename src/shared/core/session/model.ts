import {
	attach,
	createEffect,
	createEvent,
	createStore,
	sample,
	scopeBind,
} from 'effector';

import {differenceInSeconds} from 'date-fns';

import {$apiClient, apiClientUpdated} from '@shared/api';
import {refreshUserFx} from '@shared/api/auth';
import {appStarted} from '@shared/core/effector';

import {createSingletonEffect} from '../effector/libs';

import type {ApiContext} from '@shared/api';
import type {UserSession} from '@shared/api/auth';


export const tokenUpdated = createEvent<UserSession>();
export const tokenInvalidated = createEvent();

export const $sessionInfo = createStore<UserSession>({
	accessToken: '',
	expiresAt: new Date(),
})
	.on(tokenUpdated, (_, sessionInfo) => sessionInfo)
	.reset(tokenInvalidated);

const refreshUserSingletonFx = createSingletonEffect(refreshUserFx);

sample({
	clock: refreshUserSingletonFx.doneData,
	target: tokenUpdated,
});

sample({
	clock: refreshUserSingletonFx.failData,
	target: tokenInvalidated,
});

const refreshUserIfNeededFx = attach({
	source: $sessionInfo,
	effect: async (currentSession) => {
		const {expiresAt: currentExpiresAt} = currentSession;

		if (differenceInSeconds(currentExpiresAt, new Date()) < 60) {
			return await refreshUserSingletonFx();
		}

		return currentSession;
	},
});

export const initializeApiClientFx = attach({
	source: $apiClient,
	effect: (client) => {
		const refreshUser = scopeBind(refreshUserSingletonFx);
		const refreshUserIfNeeded = scopeBind(refreshUserIfNeededFx);

		apiClientUpdated(
			client.extend({
				hooks: {
					beforeRequest: [
						async (request, {context}) => {
							const isPublic = (context as ApiContext).isCalledEndpointPublic;

							if (!isPublic) {
								const {accessToken} = await refreshUserIfNeeded();

								if (accessToken) {
									request.headers.set('Authorization', `Bearer ${accessToken}`);
								}
							}
						},
					],
					afterResponse: [
						async (request, {context}, response, state) => {
							const isPublic = (context as ApiContext).isCalledEndpointPublic;

							if (response.status === 401 && state.retryCount === 0 && !isPublic) {
								try {
									const {accessToken} = await refreshUser();

									const headers = new Headers(request.headers);
									headers.set('Authorization', `Bearer ${accessToken}`);

									return client.retry({
										request: new Request(request, {headers}),
										code: 'TOKEN_REFRESH',
									});
								} catch (error) {
									return response;
								}
							}

							return response;
						},
					],
				},
			}),
		);
	},
});

const initializeRefreshOnVisibility = createEffect(() => {
	let userLeftPageTime: Date | undefined;

	const refreshUser = scopeBind(refreshUserFx);

	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') {
			userLeftPageTime = new Date();
		}

		if (document.visibilityState === 'visible') {
			if (userLeftPageTime && differenceInSeconds(new Date(), userLeftPageTime) > 5) {
				refreshUser();
			}
		}
	});
});

sample({
	clock: appStarted,
	target: [
		refreshUserSingletonFx,
		initializeApiClientFx,
		initializeRefreshOnVisibility,
	],
});

