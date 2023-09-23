import {useState, useEffect, useRef, useCallback} from 'react';


// eslint-disable-next-line max-len
const SOUND_LINK = 'https://audio-previews.elements.envatousercontent.com/files/148785970/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22RZFWLXE-bell-hop-bell.mp3%22';
const PREVIOUS_SIGNAL_KEY = 'ALCO_TIMER/PREVIOUS_SIGNAL';

type Params = {
	minTimeInMinutes: string,
	maxTimeInMinutes: string,
};

type ReturnParams = {
	isStopped: boolean,
	previousSignals: Array<string>,
	toggleIsStopped: () => void,
	playSound: () => void,
};

export const useRandomSignal = ({
	minTimeInMinutes,
	maxTimeInMinutes,
}: Params): ReturnParams => {
	const [isStopped, setIsStopped] = useState(true);

	// @ts-expect-error temprorary
	const [previousSignals, setPreviousSignals] = useState<Array<string>>(JSON.parse(localStorage.getItem(PREVIOUS_SIGNAL_KEY)) ?? []);

	const audio = useRef<HTMLAudioElement>(new Audio(SOUND_LINK));

	useEffect(() => {
		audio.current.load();
		audio.current.autoplay = false;
	}, []);

	const playSound = useCallback(() => {
		audio.current.load();
		void audio.current.play();
	}, []);

	const signalTimeout = useRef<number>();

	const createSignalTimeout = useCallback((min: number, max: number) => {
		void new Promise<void>((resolve) => {
			// eslint-disable-next-line no-mixed-operators, @typescript-eslint/no-magic-numbers
			const timeOut = (Math.random() * (max - min) + min) * 60 * 1000;

			signalTimeout.current = setTimeout(() => {
				playSound();

				const timeStamp = new Date().toLocaleTimeString();
				const lastSignal = new Date(timeOut).toLocaleTimeString('da-DK', {timeZone: 'Atlantic/Reykjavik'});

				const timeRecord = `${timeStamp} - ${lastSignal}`;

				setPreviousSignals((prevValue) => [timeRecord, ...prevValue]);

				resolve();
			}, timeOut);
		}).then(() => {
			createSignalTimeout(min, max);
		});
	}, []);

	useEffect(() => {
		localStorage.setItem(PREVIOUS_SIGNAL_KEY, JSON.stringify(previousSignals));
	}, [previousSignals]);

	useEffect(() => {
		if (isStopped) {
			clearTimeout(signalTimeout.current);
		} else {
			playSound();

			createSignalTimeout(
				Number(minTimeInMinutes),
				Number(maxTimeInMinutes)
			);
		}
	}, [isStopped, createSignalTimeout]);

	const toggleIsStopped = useCallback(() => {
		setIsStopped((prevValue) => !prevValue);
	}, []);

	return {
		isStopped,
		previousSignals,
		toggleIsStopped,
		playSound
	};
};
