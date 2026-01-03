import {createStore, attach, sample} from 'effector';

import type {Effect} from 'effector';


type Noop = () => void;

type ReturnParams = {
	subscribeFx: Effect<void, Noop>,
	unsubscribeFx: Effect<void, void>,
};

export const createSubscribeEffect = (subscribe: () => Noop): ReturnParams => {
	const $unsubscribe = createStore<Noop>(() => undefined, {serialize: 'ignore'});

	const subscribeFx = attach({
		source: $unsubscribe,
		effect: (unsubscribe) => {
			unsubscribe();

			return subscribe();
		},
	});

	const unsubscribeFx = attach({
		source: $unsubscribe,
		effect: (unsubscribe) => unsubscribe(),
	});

	sample({
		clock: subscribeFx.doneData,
		target: $unsubscribe,
	});

	return {
		subscribeFx,
		unsubscribeFx,
	};
};
