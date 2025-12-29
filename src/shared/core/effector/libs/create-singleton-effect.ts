import {
	attach,
	createStore,
	createEvent,
	sample,
} from 'effector';

import type {Effect} from 'effector';


export const createSingletonEffect = <D, E extends Effect<unknown, D>>(effect: E): E => {
	const requestLaunched = createEvent<Promise<D>>();
	const refreshCompleted = createEvent();

	const $requestInProgress = createStore<Promise<D> | null>(null)
		.on(requestLaunched, (_, promise) => promise)
		.reset(refreshCompleted);

	sample({
		clock: effect.finally,
		target: refreshCompleted,
	});

	return attach({
		source: $requestInProgress,
		effect: async (currentRequest, params) => {
			if (currentRequest) {
				return await currentRequest;
			}

			const request = effect(params);
			requestLaunched(request);

			return await request;
		},
	}) as E;
};
