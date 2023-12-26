import {useStore} from 'effector-react';

import {
	$isStarted,
	$canBeStarted,
	start,
	stop,
} from '@features/timer';

import {useStableCallback} from '@shared/libs';


type ReturnParams = {
	isStarted: boolean,
	canBeStarted: boolean,
	toggleTimer: () => void,
};

export const useTimerState = (): ReturnParams => {
	const isStarted = useStore($isStarted);
	const canBeStarted = useStore($canBeStarted);

	const toggleTimer = useStableCallback(() => {
		if (isStarted) {
			stop();
		} else {
			start();
		}
	});

	return {
		isStarted,
		canBeStarted,
		toggleTimer,
	};
};
