import {
	createEvent,
	createStore,
	combine,
	sample,
} from 'effector';

import {isNumber, isString} from '@shared/libs';
import {SOUND} from '@shared/constants';
import {LocalStorage} from '@shared/storages';

import {chooseRandomSecondFromInterval, takeRandomArrayElement} from './lib/utils';

import type {Sound} from '@shared/constants';


export const start = createEvent();
export const stop = createEvent();

export const tick = createEvent();

export const requestSignal = createEvent<number | null | void>();

export const changeMinTime = createEvent<number>();
export const changeMaxTime = createEvent<number>();
export const changeChosenSounds = createEvent<Array<string>>();

start.watch(() => {
	requestSignal();
});

// TODO: remake into store
const DEFAULT_TIMEOUT = 1000;

const PREVIOUS_MIN_VALUE_KEY = 'ALCO_TIMER/MIN_VALUE';
const PREVIOUS_MAX_VALUE_KEY = 'ALCO_TIMER/MAX_VALUE';

const PREVIOUS_SIGNALS_KEY = 'ALCO_TIMER/PREVIOUS_SIGNAL';
const CHOSEN_SOUNDS = 'ALCO_TIMER/CHOSEN_SOUNDS';

window.timer = {
	changeMinTime,
	changeMaxTime,
	changeChosenSounds,
	startTimer: start,
	stopTimer: stop,
	sounds: SOUND,
};

export const $minTime = createStore<number>(LocalStorage.getItem(PREVIOUS_MIN_VALUE_KEY, isNumber, 0))
	.on(changeMinTime, (_, time) => {
		LocalStorage.setItem(PREVIOUS_MIN_VALUE_KEY, time);

		return time;
	});

// TODO: remake localStorage workflow
export const $maxTime = createStore<number>(LocalStorage.getItem(PREVIOUS_MAX_VALUE_KEY, isNumber, 0))
	.on(changeMaxTime, (_, time) => {
		LocalStorage.setItem(PREVIOUS_MAX_VALUE_KEY, time);

		return time;
	});

export const $chosenSounds = createStore<Array<Sound>>(
	LocalStorage.getItem(
		CHOSEN_SOUNDS,
		(chosenSounds): chosenSounds is Array<Sound> => {
			return Array.isArray(chosenSounds) && chosenSounds.every(isString);
		},
		[SOUND.BELL],
	),
// @ts-expect-error WHY: temp
).on(changeChosenSounds, (_, newChosenSounds) => {
	LocalStorage.setItem(CHOSEN_SOUNDS, newChosenSounds);

	return newChosenSounds;
});


const $timerParams = combine($minTime, $maxTime, $chosenSounds, (minTime, maxTime, chosenSounds) => {
	return {
		minTime,
		maxTime,
		chosenSounds,
	};
});

export const $canBeStarted = $timerParams.map(({minTime, maxTime, chosenSounds}) => {
	return !!(
		isNumber(minTime) && minTime >= 0 &&
		isNumber(maxTime) && maxTime >= 0 &&
		maxTime > minTime &&
		chosenSounds.length
	);
});

export const $signalAudio = createStore<HTMLAudioElement>(new Audio(SOUND.BELL))
	.on(requestSignal, (audio) => {
		audio.src = takeRandomArrayElement($chosenSounds.getState()) ?? '';

		return audio;
	});

const $intervalId = createStore<number | null>(null)
	.on(start, (intervalId) => {
		if (isNumber(intervalId)) {
			clearInterval(intervalId);
		}

		return setInterval(tick, DEFAULT_TIMEOUT);
	})
	.on(stop, (intervalId) => {
		if (isNumber(intervalId)) {
			clearInterval(intervalId);
		}

		return null;
	});

export const $isStarted = $intervalId.map((intervalId) => isNumber(intervalId));

export const $intervalValue = createStore<number>(0)
	.on(tick, (intervalValue) => intervalValue + 1)
	.on(requestSignal, () => 0)
	.on(stop, () => 0);

const $signalValue = createStore<number | null>(null)
	.on(requestSignal, () => {
		if ($isStarted.getState()) {
			const {minTime, maxTime} = $timerParams.getState();

			return chooseRandomSecondFromInterval(minTime, maxTime);
		}

		return null;
	})
	.on(stop, () => null);

export const clearSignalsHistory = createEvent();

export const $isInDangerZone = combine($intervalValue, $minTime, (intervalValue, minValue) => {
	return !!(minValue && intervalValue) && intervalValue >= (minValue * 60);
});

// TODO: optimize read from localStorage
export const $signalHistory = createStore<Array<string>>(
	LocalStorage.getItem(
		PREVIOUS_SIGNALS_KEY, (history): history is Array<string> => {
			return Array.isArray(history) && history.every(isString);
		}, [],
	),
)
	.on(requestSignal, (history, signalInSeconds = 0) => {
		const signal = (signalInSeconds ?? 0) * 1000;

		const timeStamp = new Date().toLocaleTimeString();
		const lastSignalString = new Date(signal).toLocaleTimeString('da-DK', {timeZone: 'Atlantic/Reykjavik'});

		const timeRecord = `${timeStamp} - ${lastSignalString}`;

		const updatedHistory = history.concat(timeRecord);

		LocalStorage.setItem(PREVIOUS_SIGNALS_KEY, updatedHistory);

		return updatedHistory;
	})
	.on(clearSignalsHistory, () => {
		LocalStorage.removeItem(PREVIOUS_SIGNALS_KEY);

		return [];
	});

sample({
	source: $signalValue,
	clock: $intervalValue,
	target: requestSignal,
	filter: (signalValue, intervalValue) => {
		return !!(intervalValue && signalValue && intervalValue === signalValue);
	},
});

requestSignal.watch((previousSignal): void => {
	const audio = $signalAudio.getState();

	audio.load();
	void audio.play();
});
