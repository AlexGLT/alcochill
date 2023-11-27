import {createEvent} from 'effector';

import type {IntervalParams} from '../types';


export const start = createEvent<IntervalParams & {
	audioLinks: Array<string>,
}>();
export const pause = createEvent();
export const play = createEvent();
export const stop = createEvent();

export const tick = createEvent();

export const requestNewSignal = createEvent<number | null>();

export const changeSound = createEvent<string>();
