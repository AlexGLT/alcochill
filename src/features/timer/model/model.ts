import {
	createEffect,
	createEvent,
	createStore,
	sample,
} from 'effector';

import {
	delay,
	round,
	randomInt,
	sample as choice,
} from 'es-toolkit';

import {nanoid} from 'nanoid';

import {AudioController, convertMsToS} from '@shared/libs';

import {WorkerController} from '../worker-controller';
import {TimerState} from '../types';

import type {Sound} from '@shared/types';
import type {TimerConfig} from '../types';


const audioController = new AudioController();

export const timerStarted = createEvent<TimerConfig>();
export const timerPaused = createEvent();
export const timerResumed = createEvent();
export const timerStopped = createEvent();
export const timerRestarted = createEvent();

const playSignalSoundFx = createEffect<Sound, void>((sound) => {
	audioController.updateSource(sound.src);

	return audioController.play()
		.catch((error) => {
			console.error('Error has been occurred during the audio playing', error);
		})
		.finally(() => {
			audioController.clear();
		});
});

export const $timerState = createStore(TimerState.INITIAL)
	.on(timerStarted, () => TimerState.RUNNING)
	.on(playSignalSoundFx, () => TimerState.SIGNALIZING)
	.on(timerPaused, () => TimerState.PAUSED)
	.on(timerResumed, () => TimerState.RUNNING)
	.on(timerStopped, () => TimerState.STOPPED)
	.on(timerRestarted, () => TimerState.RUNNING);

const DEFAULT_CONFIG: TimerConfig = {
	minTime: 0,
	maxTime: 0,
	timeSpeed: 0,
	sounds: [],
};

// TODO: throw error and stop timer if params are incorrect
export const $workingTimerParams = createStore(DEFAULT_CONFIG)
	.on(timerStarted, (_, params) => params)
	.reset(timerStopped);

export const counterUpdated = createEvent<number>();

export const $counter = createStore(0)
	.on(counterUpdated, (_, value) => value)
	.reset(timerStopped);

export const $limit = createStore(0)
	.on(timerStarted, (_, {minTime, maxTime}) => {
		return randomInt(minTime, maxTime + 1);
	})
	.on(timerRestarted, () => {
		const {minTime, maxTime} = $workingTimerParams.getState();

		return randomInt(minTime, maxTime + 1);
	})
	.reset(timerStopped);

sample({
	clock: timerStarted,
	source: $workingTimerParams,
	fn: ({sounds}) => choice(sounds),
	target: playSignalSoundFx,
});

sample({
	clock: $counter,
	source: {config: $workingTimerParams, limit: $limit},
	filter: ({limit}, counter) => limit > 0 && limit === counter,
	fn: ({config: {sounds}}) => choice(sounds),
	target: playSignalSoundFx,
});

sample({
	clock: playSignalSoundFx.finally,
	source: $timerState,
	filter: (state) => state === TimerState.SIGNALIZING,
	target: timerRestarted,
});

// ============================
// DOM EVENTS EMITTING ABOUT SIGNALIZING
// ============================

const DELAY_BEFORE_SIGNAL = 1000;

const notifyBeforeSignalFx = createEffect<void, void>(() => {
	window.dispatchEvent(new CustomEvent('timer:pre-signalizing'));
});

sample({
	clock: $counter,
	source: $limit,
	filter: (limit, counter) => limit > 0 && (limit === counter - convertMsToS(DELAY_BEFORE_SIGNAL)),
	target: notifyBeforeSignalFx,
});

const DELAY_AFTER_SIGNAL = 1000;

const notifyAfterSignalFx = createEffect<void, void>(async () => {
	await delay(DELAY_AFTER_SIGNAL);

	window.dispatchEvent(new CustomEvent('timer:post-signalizing'));
});

sample({
	clock: playSignalSoundFx.finally,
	target: notifyAfterSignalFx,
});

// ============================
// LOGS
// ============================

type TimerEvent = {
	id: string,
	eventName: string,
	eventTime: Date,
};

const EMPTY_EVENTS: Array<TimerEvent> = [];

const logEvent = (eventName: string): TimerEvent => {
	return {
		id: nanoid(),
		eventName,
		eventTime: new Date(),
	};
};

export const $logs = createStore(EMPTY_EVENTS)
	.on(timerStarted, () => EMPTY_EVENTS.concat(logEvent('start')))
	.on(playSignalSoundFx, (state) => state.concat(logEvent('signal')))
	.on(timerPaused, (state) => state.concat(logEvent('pause')))
	.on(timerResumed, (state) => state.concat(logEvent('resume')))
	.on(timerStopped, (state) => state.concat(logEvent('stop')))
	.on(timerRestarted, (state) => state.concat(logEvent('restart')));

// ============================
// WORKER INITIALIZATION
// ============================

const workerController = new WorkerController();

const DEFAULT_INTERVAL = 1000;

timerStarted.watch(({timeSpeed}) => {
	workerController.initialize({
		interval: round(DEFAULT_INTERVAL / timeSpeed, 2),
		onCounterUpdate: counterUpdated,
	});
});

timerPaused.watch(() => {
	workerController.pause();
});

playSignalSoundFx.watch(() => {
	workerController.pause();
});

timerResumed.watch(() => {
	workerController.resume();
});

timerRestarted.watch(() => {
	workerController.restart();
});

timerStopped.watch(() => {
	workerController.destroy();
});
