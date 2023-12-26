import {
	createEvent,
	createStore,
	combine,
	sample,
} from 'effector';

import {isNumber, isString} from '@shared/libs';
import {SOUND} from '@shared/constants';

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

// TODO: remake localStorage workflow
export const $minTime = createStore<number>(Number(localStorage.getItem(PREVIOUS_MIN_VALUE_KEY) ?? '') || 0)
	.on(changeMinTime, (_, time) => {
		localStorage.setItem(PREVIOUS_MIN_VALUE_KEY, String(time));

		return time;
	});

// TODO: remake localStorage workflow
export const $maxTime = createStore<number>(Number(localStorage.getItem(PREVIOUS_MAX_VALUE_KEY) ?? '') || 0)
	.on(changeMaxTime, (_, time) => {
		localStorage.setItem(PREVIOUS_MAX_VALUE_KEY, String(time));

		return time;
	});

export const $chosenSounds = createStore<Array<Sound>>(
	localStorage.getItem(CHOSEN_SOUNDS)

		// @ts-expect-error WHY: too lazy
		? JSON.parse(localStorage.getItem(CHOSEN_SOUNDS))
		: [SOUND.BELL],
).on(changeChosenSounds, (_, newChosenSounds) => {
	localStorage.setItem(CHOSEN_SOUNDS, JSON.stringify(newChosenSounds));

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

// TODO: optimize read from localStorage
export const $signalHistory = createStore<Array<string>>((() => {
	const stringifiedHistory = localStorage.getItem('ALCO_TIMER/PREVIOUS_SIGNAL');

	let storedSignals: Array<string> = [];

	try {
		const parsedHistory = stringifiedHistory && JSON.parse(stringifiedHistory);

		if (Array.isArray(parsedHistory) && parsedHistory.every(isString)) {
			storedSignals = parsedHistory;
		} else {
			storedSignals = [];
		}
	} catch (_) {
		storedSignals = [];
	}

	return storedSignals;
})())
	.on(requestSignal, (history, signalInSeconds = 0) => {
		const signal = (signalInSeconds ?? 0) * 1000;

		const timeStamp = new Date().toLocaleTimeString();
		const lastSignalString = new Date(signal).toLocaleTimeString('da-DK', {timeZone: 'Atlantic/Reykjavik'});

		const timeRecord = `${timeStamp} - ${lastSignalString}`;

		const updatedHistory = history.concat(timeRecord);

		localStorage.setItem('ALCO_TIMER/PREVIOUS_SIGNAL', JSON.stringify(updatedHistory));

		return updatedHistory;
	})
	.on(clearSignalsHistory, () => {
		localStorage.removeItem('ALCO_TIMER/PREVIOUS_SIGNAL');

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

requestSignal.watch((): void => {
	const audio = $signalAudio.getState();

	audio.load();
	void audio.play();
});
