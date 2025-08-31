import type {Sound} from '@shared/constants';


export type TimerConfig = {
	minTime: number,
	maxTime: number,
	timeSpeed: number,
	sounds: Array<Sound>,
};

type StartTimerMessage = {
	type: 'START',
	interval: number,
};

type PauseTimerMessage = {
	type: 'PAUSE',
};

type ResumeTimerMessage = {
	type: 'RESUME',
};

type RestartTimerMessage = {
	type: 'RESTART',
};

type StopTimerMessage = {
	type: 'STOP',
};

export type TimerIncomingMessage =
	| StartTimerMessage
	| PauseTimerMessage
	| ResumeTimerMessage
	| RestartTimerMessage
	| StopTimerMessage;

export type TimerUpcomingMessage = {
	type: 'UPDATE',
	counter: number,
};

export enum TimerEventType {
	START = 'START',
	SIGNALIZE = 'SIGNALIZE',
	PAUSE = 'PAUSE',
	RESUME = 'RESUME',
	STOP = 'STOP',
	RESTART = 'RESTART',
}

export enum TimerState {
	INITIAL = 'INITIAL',
	RUNNING = 'RUNNING',
	SIGNALIZING = 'SIGNALIZING',
	PAUSED = 'PAUSED',
	STOPPED = 'STOPPED',
}
