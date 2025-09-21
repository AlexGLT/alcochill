import {useUnit} from 'effector-react';

import {TimerState} from '../types';

import {
	$counter,
	$timerState,
	$workingTimerParams,
	startTimerFx,
	timerStopped,
} from './model';

import type {TimerConfig} from '../types';


type ReturnParams = {
	counter: number,
	wasStarted: boolean,
	isInDangerZone: boolean,
	startTimer: (config: TimerConfig) => Promise<TimerConfig>,
	stopTimer: () => void,
};

export const useTimerState = (): ReturnParams => {
	const counter = useUnit($counter);
	const timerState = useUnit($timerState);
	const {minTime} = useUnit($workingTimerParams);

	const startTimer = useUnit(startTimerFx);
	const stopTimer = useUnit(timerStopped);

	const wasStarted = timerState !== TimerState.INITIAL && timerState !== TimerState.STOPPED;

	return {
		counter,
		wasStarted,
		isInDangerZone: counter > minTime,
		startTimer,
		stopTimer,
	};
};
