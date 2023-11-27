import {useState, useEffect, useRef, useCallback, useLayoutEffect} from 'react';

import {useTimer, useSignalSubscribe} from '@features/timer';


// eslint-disable-next-line max-len

const defaultSound = '../../../../audio/bell.wav';

// const SOUND_LINK = 'https://audio-previews.elements.envatousercontent.com/files/148785970/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22RZFWLXE-bell-hop-bell.mp3%22';
const PREVIOUS_SIGNAL_KEY = 'ALCO_TIMER/PREVIOUS_SIGNAL';
const DEFAULT_TIMEOUT = 1000;

type Params = {
	minTimeInMinutes: number,
	maxTimeInMinutes: number,
};

type ReturnParams = {
	isStarted: boolean,
	previousSignals: Array<string>,
	toggleStartButton: () => void,
	playSound: () => void,
	clearSignals: () => void,
};

export const useRandomSignal = ({
	minTimeInMinutes,
	maxTimeInMinutes,
}: Params): ReturnParams => {
	const {
		isStarted,
		intervalSound: audio,
		handleStart,
		handleStop,
	} = useTimer();

	const [previousSignals, setPreviousSignals] = useState<Array<string>>([]);

	// const audio = useRef<HTMLAudioElement>(new Audio(localStorage.getItem('currentSound') || defaultSound));

	useEffect(() => {
		audio.load();
	}, []);

	useLayoutEffect(() => {
		const storedSignals = JSON.parse(localStorage.getItem(PREVIOUS_SIGNAL_KEY) ?? '{}') as unknown;

		if (Array.isArray(storedSignals)) {
			setPreviousSignals(storedSignals.filter((signal) => typeof signal === 'string'));
		}
	}, []);

	const clearSignals = (): void => {
		localStorage.removeItem(PREVIOUS_SIGNAL_KEY);

		setPreviousSignals([]);
	};

	const playSound = useCallback(() => {
		// audio.src = localStorage.getItem('currentSound') || defaultSound;
		audio.load();
		void audio.play();
	}, []);

	const onSignalRequest = (signal: number | null): void => {
		const lastSignalValue = (signal ?? 0) * DEFAULT_TIMEOUT;

		const timeStamp = new Date().toLocaleTimeString();
		const lastSignal = new Date(lastSignalValue).toLocaleTimeString('da-DK', {timeZone: 'Atlantic/Reykjavik'});

		const timeRecord = `${timeStamp} - ${lastSignal}`;

		setPreviousSignals((prevValue) => {
			if (!prevValue.includes(timeStamp)) {
				return [...prevValue, timeRecord];
			}

			return prevValue;
		});
	};

	useSignalSubscribe({
		onSignalRequest,
	});

	const toggleStartButton = (): void => {
		if (isStarted) {
			handleStop();
		} else {
			handleStart(
				minTimeInMinutes,
				maxTimeInMinutes,
				DEFAULT_TIMEOUT,
			);

			playSound();
		}
	};

	return {
		isStarted,
		previousSignals,
		toggleStartButton,
		playSound,
		clearSignals,
	};
};
