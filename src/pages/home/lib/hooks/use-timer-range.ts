import {useState} from 'react';
import {useUnit} from 'effector-react';

import {useStableCallback} from '@shared/libs';

import {
	$minTime,
	$maxTime,
	minTimeUpdated,
	maxTimeUpdated,
} from '../../model';


import type {ChangeEvent} from 'react';


const SECONDS_IN_MINUTE = 60;

const validateTime = (value: string): string | undefined => {
	if (!value.trim()) {
		return 'Please enter a value!';
	}

	if (value.startsWith('-')) {
		return 'Negative values are forbidden!';
	}

	if ((value.startsWith('0') && !value.startsWith('0.')) || Number.isNaN(Number(value))) {
		return 'Entered value is not a number!';
	}

	return undefined;
};

type ReturnParams = {
	enteredMinTime: string,
	minTimeErrorMessage: string | undefined,
	updateMinTime: (event: ChangeEvent<HTMLInputElement>) => void,

	enteredMaxTime: string,
	maxTimeErrorMessage: string | undefined,
	updateMaxTime: (event: ChangeEvent<HTMLInputElement>) => void,
};

export const useTimeRange = (): ReturnParams => {
	const appliedMinTime = useUnit($minTime);
	const appliedMaxTime = useUnit($maxTime);

	const [enteredMinTime, setEnteredMinTime] = useState((appliedMinTime / SECONDS_IN_MINUTE).toFixed(2));
	const [minTimeErrorMessage, setMinTimeErrorMessage] = useState<string | undefined>(undefined);

	const updateMinTime = useStableCallback((event: ChangeEvent<HTMLInputElement>): void => {
		const {value} = event.target;

		setEnteredMinTime(value);

		const errorMessage = validateTime(value);
		setMinTimeErrorMessage(errorMessage);

		if (!errorMessage) {
			minTimeUpdated(Number.parseFloat(value) * SECONDS_IN_MINUTE);
		}
	});

	const [enteredMaxTime, setEnteredMaxTime] = useState((appliedMaxTime / SECONDS_IN_MINUTE).toFixed(2));
	const [maxTimeErrorMessage, setMaxTimeErrorMessage] = useState<string | undefined>(undefined);

	const updateMaxTime = useStableCallback((event: ChangeEvent<HTMLInputElement>): void => {
		const {value} = event.target;

		setEnteredMaxTime(value);

		const errorMessage = validateTime(value);
		setMaxTimeErrorMessage(errorMessage);

		if (!errorMessage) {
			maxTimeUpdated(Number.parseFloat(value) * SECONDS_IN_MINUTE);
		}
	});

	return {
		enteredMinTime,
		minTimeErrorMessage,
		updateMinTime,

		enteredMaxTime,
		maxTimeErrorMessage,
		updateMaxTime,
	};
};
