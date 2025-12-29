import {
	attach,
	combine,
	createEvent,
	createStore,
	sample,
} from 'effector';

import {registerUserFx, loginUserFx, logoutUserFx} from '@shared/api/auth';
import {$sessionInfo, tokenInvalidated, tokenUpdated} from '@shared/core/session';

import type {UserCredentials} from './types';


const logoutRequested = createEvent();

sample({
	clock: logoutRequested,
	target: logoutUserFx,
});

sample({
	clock: [
		registerUserFx.doneData,
		loginUserFx.doneData,
	],
	target: tokenUpdated,
});

sample({
	clock: [
		logoutRequested,
		registerUserFx.failData,
		loginUserFx.failData,
	],
	target: tokenInvalidated,
});

const $isAuthorized = $sessionInfo.map(({accessToken}) => !!accessToken);

const $isAuthorizing = combine([registerUserFx.pending, loginUserFx.pending]).map(([
	isRegisterInProgress,
	isLoginInProgress,
]) => isRegisterInProgress || isLoginInProgress);

export const authTypeToggled = createEvent();

export const $authType = createStore<'login' | 'register'>('login')
	.on(authTypeToggled, (currentAuthType) => {
		return currentAuthType === 'login'
			? 'register'
			: 'login';
	})
	.reset(logoutUserFx.done);
export const submitAuthFx = attach({
	source: $authType,
	effect: async (authType, {userName, password}: UserCredentials) => {
		const meta = {
			login: userName,
			password,
		};

		if (authType === 'login') {
			return await loginUserFx({meta});
		}

		return await registerUserFx({meta});
	},
});

export const model = {
	$isAuthorized,
	$isAuthorizing,
	$authType,
	authTypeToggled,
	logoutRequested,
	submitAuthFx,
};
