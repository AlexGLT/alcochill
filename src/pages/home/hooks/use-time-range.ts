import {useState, useCallback, useLayoutEffect} from 'react';

import type {ChangeEvent} from 'react';


const PREVIOUS_MIN_VALUE_KEY = 'ALCO_TIMER/MIN_VALUE';
const PREVIOUS_MAX_VALUE_KEY = 'ALCO_TIMER/MAX_VALUE';

type Params = {};

export const useTimeRange = () => {
	const [isMinTimeInputInvalid, setIsMinTimeInputInvalid] = useState(false);
	const [minTimeInMinutes, setMinTimeInMinutes] = useState<number>(0);

	const [isMaxTimeInputInvalid, setIsMaxTimeInputInvalid] = useState(false);
	const [maxTimeInMinutes, setMaxTimeInMinutes] = useState<number>(0);

	useLayoutEffect(() => {
		const storedMinValue = parseFloat(localStorage.getItem(PREVIOUS_MIN_VALUE_KEY) ?? '') || 0;
		const storedMaxValue = parseFloat(localStorage.getItem(PREVIOUS_MAX_VALUE_KEY) ?? '') || 0;

		if (storedMinValue) {
			setMinTimeInMinutes(storedMinValue);
		}

		if (storedMaxValue) {
			setMaxTimeInMinutes(storedMaxValue);
		}
	}, []);

	const updateMinTime = (event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;

		if (!value || value.startsWith('00') || value.startsWith('-')) {
			setIsMinTimeInputInvalid(true);
		} else {
			setIsMinTimeInputInvalid(false);
			setMinTimeInMinutes(Number.parseFloat(value));

			localStorage.setItem(PREVIOUS_MIN_VALUE_KEY, value);
		}
	};

	const updateMaxTime = (event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;

		if (!value || value.startsWith('00') || value.startsWith('-')) {
			setIsMaxTimeInputInvalid(true);
		} else {
			setIsMaxTimeInputInvalid(false);
			setMaxTimeInMinutes(Number.parseFloat(value));

			localStorage.setItem(PREVIOUS_MAX_VALUE_KEY, value);
		}
	};

	return {
		isMinTimeInputInvalid,
		isMaxTimeInputInvalid,
		minTimeInMinutes,
		maxTimeInMinutes,
		updateMinTime,
		updateMaxTime,
	};
};
