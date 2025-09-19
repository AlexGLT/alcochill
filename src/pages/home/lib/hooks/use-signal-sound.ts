import {
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

import {useUnit} from 'effector-react';
import {sample as choice} from 'es-toolkit';

import {useStableCallback} from '@shared/libs';
import {SOUNDS} from '@shared/constants';

import {
	$selectedSounds,
	selectedSoundsUpdated,
} from '../../model';

import type {Sound} from '@shared/types';


type ReturnParams = {
	playingNowSound: Sound | undefined,
	selectedSounds: Array<Sound>,
	playSound: (src: string) => void,
	stopSound: () => void,
	testVolume: () => void,
	updateSelectedSounds: (sounds: Array<string>) => void,
};

export const useSoundSignal = (): ReturnParams => {
	const [playingNowSound, setPlayingNowSound] = useState<Sound | undefined>(undefined);

	const audioRef = useRef<HTMLAudioElement>(new Audio(''));

	useLayoutEffect(() => {
		const abortController = new AbortController();

		audioRef.current.addEventListener('ended', () => {
			setPlayingNowSound(undefined);
		}, {signal: abortController.signal});

		return () => {
			abortController.abort();
		};
	}, []);

	const selectedSounds = useUnit($selectedSounds);

	const updateSelectedSounds = (sounds: Array<string>): void => {
		selectedSoundsUpdated(
			SOUNDS.filter(({src}) => sounds.includes(src)),
		);
	};

	const playSound = useCallback((src: string): void => {
		const audio = audioRef.current;

		audio.src = src;

		setPlayingNowSound(SOUNDS.find(({src: soundSrc}) => soundSrc === src));

		audio.load();
		audio.play();
	}, []);

	const stopSound = useCallback((): void => {
		const audio = audioRef.current;

		audio.pause();
		audio.load();

		setPlayingNowSound(undefined);
	}, []);

	const testVolume = useStableCallback((): void => {
		if (selectedSounds.length) {
			const audio = audioRef.current;

			audio.src = choice(selectedSounds).src;

			audio.load();
			void audio.play();
		}
	});

	return {
		playingNowSound,
		selectedSounds,
		playSound,
		stopSound,
		testVolume,
		updateSelectedSounds,
	};
};
