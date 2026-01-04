import {
	attach,
	createEvent,
	createStore,
	sample,
	scopeBind,
} from 'effector';

import {throttle} from 'es-toolkit';

import type {Effect, EventCallable, Unit} from 'effector';


type Trigger = Unit<unknown> | Array<Unit<unknown>>;

type ReturnParams<T> = [
	EventCallable<T>,
	Effect<T, void>,
];

export const createThrottledEvent = <T = void>(
	cancelTriggers: Trigger,
	delay: number = 100,
): ReturnParams<T> => {
	const eventCalled = createEvent<T>();
	const $throttledEvent = createStore(throttle(eventCalled, delay));

	const callThrottledEventFx = attach({
		source: $throttledEvent,
		effect: (throttledEvent, params: T) => {
			scopeBind(throttledEvent)(params);
		},
	});

	sample({
		clock: Array.isArray(cancelTriggers) ? cancelTriggers : [cancelTriggers],
		target: attach({
			source: $throttledEvent,
			effect: (throttledEvent) => {
				throttledEvent.cancel();
			},
		}),
	});

	return [
		eventCalled,
		callThrottledEventFx,
	];
};
