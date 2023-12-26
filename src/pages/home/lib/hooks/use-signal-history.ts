import {useStore} from 'effector-react';

import {
	$isStarted,
	$signalHistory,
	clearSignalsHistory,
} from '@features/timer';


type ReturnParams = {
	isStarted: boolean,
	signalsHistory: Array<string>,
	clearSignalsHistory: () => void,
};

export const useSignalHistory = (): ReturnParams => {
	const isStarted = useStore($isStarted);
	const signalsHistory = useStore($signalHistory);

	return {
		isStarted,
		signalsHistory,
		clearSignalsHistory,
	};
};
