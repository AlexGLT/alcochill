import {
	createEffect,
	createEvent,
	createStore,
	sample,
} from 'effector';

import {LocalStorage} from '@shared/storages';
import {isNumber, isString} from '@shared/libs';
import {SOUNDS} from '@shared/constants';

import type {Sound} from '@shared/types';


// ============================
// MIN TIME LOGIC
// ============================

export const minTimeUpdated = createEvent<number>();

const PREVIOUS_MIN_VALUE_KEY = 'ALCO_TIMER/MIN_VALUE';

const saveMinTimeFx = createEffect<number, void>((time) => {
	LocalStorage.setItem(PREVIOUS_MIN_VALUE_KEY, time);
});

export const $minTime = createStore<number>(LocalStorage.getItem(PREVIOUS_MIN_VALUE_KEY, isNumber, 0))
	.on(minTimeUpdated, (_, time) => time);

sample({
	clock: minTimeUpdated,
	target: saveMinTimeFx,
});

// ============================
// MAX TIME LOGIC
// ============================

export const maxTimeUpdated = createEvent<number>();
// export const updateTimeSpeed = createEvent<number>();

const PREVIOUS_MAX_VALUE_KEY = 'ALCO_TIMER/MAX_VALUE';

const saveMaxTimeFx = createEffect<number, void>((time) => {
	LocalStorage.setItem(PREVIOUS_MAX_VALUE_KEY, time);
});

export const $maxTime = createStore<number>(LocalStorage.getItem(PREVIOUS_MAX_VALUE_KEY, isNumber, 0))
	.on(maxTimeUpdated, (_, time) => time);

sample({
	clock: maxTimeUpdated,
	target: saveMaxTimeFx,
});

// ============================
// SELECTED SOUNDS LOGIC
// ============================

export const selectedSoundsUpdated = createEvent<Array<Sound>>();

const SELECTED_SOUNDS_KEY = 'ALCO_TIMER/CHOSEN_SOUNDS';

export const $selectedSounds = createStore<Array<Sound>>(
	LocalStorage
		.getItem(
			SELECTED_SOUNDS_KEY,
			(sounds): sounds is Array<string> => {
				return Array.isArray(sounds) && sounds.every(isString);
			},
			[SOUNDS[0].src],
		)
		.reduce((acc: Array<Sound>, soundSrc) => {
			const sound = SOUNDS.find(({src}) => src === soundSrc);

			if (sound) {
				acc.push(sound);
			}

			return acc;
		}, []),
)
	.on(selectedSoundsUpdated, (_, sounds) => sounds);

const saveSelectedSoundsFx = createEffect<Array<Sound>, void>((sounds) => {
	LocalStorage.setItem(SELECTED_SOUNDS_KEY, sounds.map(({src}) => src));
});

sample({
	clock: selectedSoundsUpdated,
	source: $selectedSounds,
	target: saveSelectedSoundsFx,
});
