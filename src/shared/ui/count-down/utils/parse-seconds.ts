import {
	TimeMetric,
	TIME_METRIC_LIMITS,
} from '../constants';

import type {ParsedTime} from '../types';

const METRIC_CHAIN = [
	TimeMetric.SECOND,
	TimeMetric.MINUTE,
	TimeMetric.HOUR,
	TimeMetric.DAY,
	TimeMetric.MONTH,
	TimeMetric.YEAR,
];

const MIN_MAX_GRADE = 1;
const MAX_MAX_GRADE = 6;
const DEFAULT_MAX_GRADE = 3;

export const parseSeconds = (timeInSeconds: number, maxGrade: number = DEFAULT_MAX_GRADE): ParsedTime => {
	let normalizedTimeInSeconds = Math.floor(timeInSeconds);
	let normalizedMaxGrade = Math.floor(maxGrade);

	if (normalizedMaxGrade < MIN_MAX_GRADE) {
		normalizedMaxGrade = MIN_MAX_GRADE;
	} else if (normalizedMaxGrade > MAX_MAX_GRADE) {
		normalizedMaxGrade = MAX_MAX_GRADE;
	}

	const parsedSeconds = {};

	for (const metric of METRIC_CHAIN.slice(0, normalizedMaxGrade)) {
		parsedSeconds[metric] = normalizedTimeInSeconds % TIME_METRIC_LIMITS[metric];

		normalizedTimeInSeconds = Math.floor(normalizedTimeInSeconds / TIME_METRIC_LIMITS[metric]);
	}

	return parsedSeconds;
};
