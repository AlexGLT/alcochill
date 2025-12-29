import {
	createEffect,
	createEvent,
	createStore,
	sample,
} from 'effector';

import {
	delay,
	randomInt,
	sample as choice,
} from 'es-toolkit';

import {nanoid} from 'nanoid';

import {AudioController} from '@shared/libs';
import {toaster} from '@shared/ui/toast';

import {WorkerController} from '../worker-controller';

import {
	validateConfig,
	DELAY_BEFORE_SIGNAL,
	emitPreSignalEvent,
	DELAY_AFTER_SIGNAL,
	emitPostSignalEvent,
} from '../lib';

import {TimerState} from '../types';

import type {Sound} from '@shared/types';
import type {TimerConfig} from '../types';


const audioController = new AudioController();

export const timerStarted = createEvent<TimerConfig>();
export const timerPaused = createEvent();
export const timerResumed = createEvent();
export const timerStopped = createEvent();
export const timerRestarted = createEvent();

export const startTimerFx = createEffect<TimerConfig, TimerConfig>((config) => {
	const errorMessage = validateConfig(config);

	if (errorMessage) {
		throw new Error(errorMessage);
	}

	return config;
});

const showErrorNotificationFx = createEffect<string, void>((message) => {
	toaster.create({
		type: 'error',
		duration: 30000,
		closable: true,
		description: message,
	});
});

sample({
	clock: startTimerFx.doneData,
	target: timerStarted,
});

sample({
	clock: startTimerFx.failData,
	fn: (error) => error.message,
	target: showErrorNotificationFx,
});

const playSignalSoundFx = createEffect<Sound, void>(async ({src}) => {
	audioController.updateSource(src);

	emitPreSignalEvent();
	await delay(DELAY_BEFORE_SIGNAL);

	await audioController.play()
		.catch((error) => {
			console.error(`Error has been occurred during the ${src} playing`, error);
		})
		.finally(() => {
			audioController.clear();
		});

	await delay(DELAY_AFTER_SIGNAL);
	emitPostSignalEvent();
});

export const $timerState = createStore(TimerState.INITIAL)
	.on(timerStarted, () => TimerState.RUNNING)
	.on(playSignalSoundFx, () => TimerState.SIGNALIZING)
	.on(timerPaused, () => TimerState.PAUSED)
	.on(timerResumed, () => TimerState.RUNNING)
	.on(timerStopped, () => TimerState.STOPPED)
	.on(timerRestarted, () => TimerState.RUNNING);

export const $wasTimerStarted = $timerState.map((state): boolean => {
	return state !== TimerState.INITIAL && state !== TimerState.STOPPED;
});

export const $workingTimerParams = createStore<TimerConfig>({
	minTime: 0,
	maxTime: 0,
	timeSpeed: 0,
	sounds: [],
})
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
	source: {
		config: $workingTimerParams,
		limit: $limit,
		wasStarted: $wasTimerStarted,
	},
	filter: ({wasStarted, limit}, counter) => wasStarted && limit === counter,
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

const worker = new WorkerController();

sample({
	clock: timerStarted,
	target: createEffect<TimerConfig, void>(({timeSpeed}) => (
		worker.initialize({
			timeSpeed,
			onCounterUpdate: counterUpdated,
		})
	)),
});

sample({
	clock: [timerPaused, playSignalSoundFx],
	target: createEffect(() => worker.pause()),
});

sample({
	clock: timerResumed,
	target: createEffect(() => worker.resume()),
});

sample({
	clock: timerRestarted,
	target: createEffect(() => worker.restart()),
});

sample({
	clock: timerStopped,
	target: createEffect(() => worker.destroy()),
});
