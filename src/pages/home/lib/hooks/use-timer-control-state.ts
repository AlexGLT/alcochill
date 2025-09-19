import {useUnit} from 'effector-react';

import {useTimerState} from '@features/timer';
import {useStableCallback} from '@shared/libs';

import {
	$canBeStarted,
	$minTime,
	$maxTime,
	$selectedSounds,
} from '../../model';


type ReturnParams = {
	wasStarted: boolean,
	canBeStarted: boolean,
	toggleTimer: () => void,
};

export const useTimerControlState = (): ReturnParams => {
	const minTime = useUnit($minTime);
	const maxTime = useUnit($maxTime);
	const selectedSounds = useUnit($selectedSounds);
	const canBeStarted = useUnit($canBeStarted);

	const {
		wasStarted,
		startTimer,
		stopTimer,
	} = useTimerState();

	const toggleTimer = useStableCallback(() => {
		if (wasStarted) {
			stopTimer();
		} else {
			startTimer({
				minTime,
				maxTime,
				sounds: selectedSounds,
				timeSpeed: 1,
			});
		}
	});

	return {
		wasStarted,
		canBeStarted,
		toggleTimer,
	};
};
