import {
	attach,
	createEffect,
	createEvent,
	createStore,
	sample,
} from 'effector';

import type {Effect, EventCallable} from 'effector';
import type {Gate} from 'effector-react';


type AbortSource = {
	gate?: Gate<unknown>,
	event?: EventCallable<unknown>,
};

export const createEffectWithAbort = <Params extends Record<string, unknown>, Done>(
	handler: (params: Params & {signal: AbortSignal}) => Promise<Done> | Done,
	{event, gate}: AbortSource,
): Effect<Params, Done> => {
	const abortControllerCreated = createEvent<AbortController>();

	const $abortController = createStore<AbortController | null>(null)
		.on(abortControllerCreated, (_, controller) => controller);

	const abortFx = attach({
		source: $abortController,
		effect: (abortController) => abortController?.abort(),
	});

	if (event) {
		sample({
			clock: event,
			target: abortFx,
		});
	}

	if (gate) {
		sample({
			clock: gate.status,
			source: $abortController,
			filter: (_, isGateOpened) => !isGateOpened,
			target: abortFx,
		});
	}

	return createEffect((params: Params) => {
		const abortController = new AbortController();
		abortControllerCreated(abortController);

		return handler({
			...params,
			signal: abortController.signal,
		});
	});
};
