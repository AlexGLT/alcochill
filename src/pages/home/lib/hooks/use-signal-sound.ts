import {useCallback, useLayoutEffect, useRef, useState} from 'react';

import {useStore} from 'effector-react';

import {
	$isStarted,
	$chosenSounds,
	changeChosenSounds,
} from '@features/timer';

import {useStableCallback} from '@shared/libs';
import {takeRandomArrayElement} from '@features/timer/lib/utils';

import type {Sound} from '@shared/constants';


type ReturnParams = {
	isStarted: boolean,
	nowPlaying: Sound | null,
	chosenSounds: Set<Sound>,
	playSound: (sound: Sound) => void,
	stopSound: () => void,
	testVolume: () => void,
	checkChosenSound: (sound: Sound, value: boolean) => void,
	apply: () => void,
	cancel: () => void,
};

export const useSoundSignal = (): ReturnParams => {
	const isStarted = useStore($isStarted);
	const storedChosenSounds = useStore($chosenSounds);

	const [nowPlaying, setNowPlaying] = useState<Sound | null>(null);

	const audioRef = useRef<HTMLAudioElement>(new Audio(''));

	useLayoutEffect(() => {
		audioRef.current.addEventListener('ended', () => {
			setNowPlaying(null);
		});
	}, []);

	const [chosenSounds, setChosenSounds] = useState<Set<Sound>>(new Set(storedChosenSounds));

	const checkChosenSound = useStableCallback((sound: Sound, value: boolean): void => {
		setChosenSounds((previousChosenSounds) => {
			const newChosenSounds = new Set(previousChosenSounds);

			if (value) {
				newChosenSounds.add(sound);
			} else {
				newChosenSounds.delete(sound);
			}

			return newChosenSounds;
		});
	});

	const playSound = useCallback((sound: Sound): void => {
		const audio = audioRef.current;

		audio.src = sound;

		setNowPlaying(sound);

		audio.load();
		audio.play();
	}, []);

	const stopSound = useCallback((): void => {
		const audio = audioRef.current;

		audio.pause();
		audio.load();

		setNowPlaying(null);
	}, []);

	const testVolume = useStableCallback((): void => {
		const audio = audioRef.current;

		audio.src = takeRandomArrayElement(storedChosenSounds) ?? '';

		audio.load();
		void audio.play();
	});

	const apply = useStableCallback(() => {
		changeChosenSounds(Array.from(chosenSounds.values()));
	});

	const cancel = useStableCallback(() => {
		setChosenSounds(new Set(storedChosenSounds));
	});

	return {
		nowPlaying,
		isStarted,
		chosenSounds,
		playSound,
		stopSound,
		testVolume,
		checkChosenSound,
		apply,
		cancel,
	};
};
