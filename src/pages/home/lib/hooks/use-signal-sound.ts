import {
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

import {useStore} from 'effector-react';

import {
	$isStarted,
	$chosenSounds,
	changeChosenSounds,
} from '@features/timer';

import {useStableCallback} from '@shared/libs';
import {SOUND} from '@shared/constants';
import {takeRandomArrayElement} from '@features/timer/lib/utils';

import type {ChangeEvent} from 'react';

import type {Sound} from '@shared/constants';


const ALL_SOUNDS = Object.values(SOUND);

type ReturnParams = {
	isStarted: boolean,
	nowPlaying: Sound | null,
	chosenSounds: Set<Sound>,
	playSound: (sound: Sound) => void,
	stopSound: () => void,
	testVolume: () => void,
	checkChosenSound: (sound: Sound, value: boolean) => void,
	selectAll: any,
	// apply: () => void,
	// cancel: () => void,
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

	// const [chosenSounds, setChosenSounds] = useState<Set<Sound>>(new Set(storedChosenSounds));

	const chosenSounds = new Set(storedChosenSounds);

	const checkChosenSound = useStableCallback((sound: Sound, value: boolean): void => {
		const newChosenSounds = new Set(storedChosenSounds);

		if (value) {
			newChosenSounds.add(sound);
		} else {
			newChosenSounds.delete(sound);
		}

		changeChosenSounds(Array.from(newChosenSounds.values()));
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

	const selectAll = useStableCallback(({target: {checked}}: ChangeEvent<HTMLInputElement>): void => {
		if (checked) {
			changeChosenSounds(ALL_SOUNDS);
		} else {
			changeChosenSounds([]);
		}
	});

	// const apply = useStableCallback(() => {
	// 	changeChosenSounds(Array.from(chosenSounds.values()));
	// });

	// const cancel = useStableCallback(() => {
	// 	setChosenSounds(new Set(storedChosenSounds));
	// });

	return {
		nowPlaying,
		isStarted,
		chosenSounds,
		playSound,
		stopSound,
		testVolume,
		checkChosenSound,
		selectAll,
		// apply,
		// cancel,
	};
};
