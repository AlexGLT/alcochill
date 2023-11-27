import {useCallback} from 'react';
import {useStore, useEvent} from 'effector-react';

import {
	$intervalValue,
	$isTimeOver,
	$isStarted,
	$isPaused,
	start,
	stop,
	play,
	pause,
	$intervalSound,
} from '../../model';


type ReturnParams = {
	intervalSound: HTMLAudioElement,
	intervalValue: number,
	isTimeOver: boolean,
	isStarted: boolean,
	isPaused: boolean,
	handleStart: (min: number, max: number, timeout: number) => void,
	handleStop: () => void,
	handlePlay: () => void,
	handlePause: () => void,
};

export const useTimer = (): ReturnParams => {
	const intervalSound = useStore($intervalSound);
	const intervalValue = useStore($intervalValue);
	const isTimeOver = useStore($isTimeOver);
	const isStarted = useStore($isStarted);
	const isPaused = useStore($isPaused);

	const startEvent = useEvent(start);
	const stopEvent = useEvent(stop);
	const playEvent = useEvent(play);
	const pauseEvent = useEvent(pause);

	const handleStart = useCallback((min: number, max: number, timeout: number) => {
		// @ts-expect-error TODO: fix
		startEvent({min, max, timeout});
	}, []);

	const handleStop = useCallback(() => {
		stopEvent();
	}, []);

	const handlePlay = useCallback(() => {
		playEvent();
	}, []);

	const handlePause = useCallback(() => {
		pauseEvent();
	}, []);

	return {
		intervalSound,
		intervalValue,
		isTimeOver,
		isStarted,
		isPaused,
		handleStart,
		handleStop,
		handlePlay,
		handlePause,
	};
};
