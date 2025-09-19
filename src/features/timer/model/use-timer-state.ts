import {useUnit} from 'effector-react';

import {TimerState} from '../types';

import {
	$counter,
	$timerState,
	$workingTimerParams,
	timerStarted,
	timerStopped,
} from './model';

import type {TimerConfig} from '../types';


type ReturnParams = {
	counter: number,
	wasStarted: boolean,
	isInDangerZone: boolean,
	startTimer: (config: TimerConfig) => void,
	stopTimer: () => void,
};

export const useTimerState = (): ReturnParams => {
	const counter = useUnit($counter);
	const timerState = useUnit($timerState);
	const {minTime} = useUnit($workingTimerParams);

	const wasStarted = timerState !== TimerState.INITIAL && timerState !== TimerState.STOPPED;

	return {
		counter,
		wasStarted,
		isInDangerZone: counter > minTime,
		startTimer: timerStarted,
		stopTimer: timerStopped,
	};
};
