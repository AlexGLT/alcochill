import {useState, useCallback} from 'react';

import type {ChangeEvent} from 'react';


type Params = {};

export const useTimeRange = () => {
	const [minTimeInMinutes, setMinTimeInMinutes] = useState<string>('0');
	const [maxTimeInMinutes, setMaxTimeInMinutes] = useState<string>('0');

	const updateMinTime = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
		setMinTimeInMinutes(event.target.value);
	}, []);

	const updateMaxTime = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
		setMaxTimeInMinutes(event.target.value);
	}, []);

	return {
		minTimeInMinutes,
		maxTimeInMinutes,
		updateMinTime,
		updateMaxTime
	};
};
