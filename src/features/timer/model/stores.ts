import {createStore, combine, sample} from 'effector';

import {isNumber} from '@shared/libs';
import {SOUNDS} from '@shared/constants';

import {chooseRandomSecondFromInterval} from '../lib/utils';

import {
	start,
	stop,
	play,
	pause,
	requestNewSignal,
	tick,
	changeSound,
} from './actions';

import type {IntervalParams} from '../types';


// @ts-expect-error temp
window.sounds = SOUNDS;

const defaultSound = SOUNDS.bell;

export const $intervalSound = createStore<HTMLAudioElement>(new Audio(defaultSound))
	.on(changeSound, (audio, newSound) => {
		audio.src = newSound;

		return audio;
	});

const $intervalParams = createStore<IntervalParams | null>(null)
	.on(start, (_, intervalParams) => intervalParams)
	.on(stop, () => null);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const $intervalId = createStore<number | null>(null)
	.on(start, (intervalId, intervalTimeout) => {
		if (isNumber(intervalId)) {
			clearInterval(intervalId);
		}

		return setInterval(tick, intervalTimeout.timeout);
	})
	.on(pause, (intervalId) => {
		if (isNumber(intervalId)) {
			clearInterval(intervalId);
		}

		return null;
	})
	.on(play, (intervalId) => {
		if (isNumber(intervalId)) {
			clearInterval(intervalId);
		}

		const intervalParams = $intervalParams.getState();

		if (intervalParams !== null) {
			return setInterval(() => tick, intervalParams.timeout);
		}

		return null;
	})
	.on(stop, (intervalId) => {
		if (isNumber(intervalId)) {
			clearInterval(intervalId);
		}

		return null;
	});

export const $intervalValue = createStore<number>(0)
	.on(tick, (intervalValue) => intervalValue + 1)
	.on(requestNewSignal, () => 0)
	.on(stop, () => 0);

const $signalValue = createStore<number | null>(null)
	.on(start, (_, intervalParams) => (
		chooseRandomSecondFromInterval(intervalParams)
	))
	.on(requestNewSignal, () => {
		const intervalParams = $intervalParams.getState();

		if (intervalParams !== null) {
			return chooseRandomSecondFromInterval(intervalParams);
		}

		return null;
	})
	.on(stop, () => null);

export const $isTimeOver = combine($intervalValue, $signalValue, (intervalValue, signalValue) => !!(
	intervalValue && signalValue && intervalValue === signalValue
));

export const $isStarted = combine($intervalParams, (intervalParams) => !!intervalParams);
export const $isPaused = combine($isStarted, $intervalId, (isStarted, intervalId) => (
	isStarted && isNumber(intervalId)
));

sample({
	clock: $intervalValue,
	source: $signalValue,
	filter: $isTimeOver,
	target: requestNewSignal,
});

requestNewSignal.watch((lastSignal) => {
	const audio = $intervalSound.getState();

	audio.load();
	void audio.play();

	const lastSignalValue = (lastSignal ?? 0) * 1000;

	const timeStamp = new Date().toLocaleTimeString();
	const lastSignalString = new Date(lastSignalValue).toLocaleTimeString('da-DK', {timeZone: 'Atlantic/Reykjavik'});

	const timeRecord = `${timeStamp} - ${lastSignalString}`;

	let storedSignals = JSON.parse(localStorage.getItem('ALCO_TIMER/PREVIOUS_SIGNAL') ?? '{}') as unknown;

	if (Array.isArray(storedSignals)) {
		storedSignals = storedSignals.filter((signal) => typeof signal === 'string');
	} else {
		storedSignals = [];
	}

	// @ts-expect-error test
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	localStorage.setItem('ALCO_TIMER/PREVIOUS_SIGNAL', JSON.stringify(storedSignals.concat(timeRecord)));
});
