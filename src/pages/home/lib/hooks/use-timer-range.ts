import {useState} from 'react';
import {useStore} from 'effector-react';

import {
	$maxTime,
	$minTime,
	changeMaxTime,
	changeMinTime,
} from '@features/timer';

import {useStableCallback} from '@shared/libs';

import type {ChangeEvent} from 'react';


type ReturnParams = {
	isMinTimeInputInvalid: boolean,
	isMaxTimeInputInvalid: boolean,
	minTimeInMinutes: number,
	maxTimeInMinutes: number,
	updateMinTime: (event: ChangeEvent<HTMLInputElement>) => void,
	updateMaxTime: (event: ChangeEvent<HTMLInputElement>) => void,
};

export const useTimeRange = (): ReturnParams => {
	const minTimeInMinutes = useStore($minTime);
	const maxTimeInMinutes = useStore($maxTime);

	const [isMinTimeInputInvalid, setIsMinTimeInputInvalid] = useState(false);
	const [isMaxTimeInputInvalid, setIsMaxTimeInputInvalid] = useState(false);

	const updateMinTime = useStableCallback((event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;

		if (!value || value.startsWith('00') || value.startsWith('-')) {
			setIsMinTimeInputInvalid(true);
		} else {
			setIsMinTimeInputInvalid(false);

			changeMinTime(Number.parseFloat(value));
		}
	});

	const updateMaxTime = useStableCallback((event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;

		if (!value || value.startsWith('00') || value.startsWith('-')) {
			setIsMaxTimeInputInvalid(true);
		} else {
			setIsMaxTimeInputInvalid(false);

			changeMaxTime(Number.parseFloat(value));
		}
	});

	return {
		isMinTimeInputInvalid,
		isMaxTimeInputInvalid,
		minTimeInMinutes,
		maxTimeInMinutes,
		updateMinTime,
		updateMaxTime,
	};
};
