import type {ValidationResult} from './types';


const MIN_TIME_DIFFERENCE = 60; // 1 minute

export const validateTimeRange = (minTime: number, maxTime: number): ValidationResult => {
	if (minTime < 0 || maxTime < 0) {
		return [false, 'Time values must be positive numbers!'];
	}

	if (minTime > maxTime) {
		return [false, 'Min time cannot be greater than max time!'];
	}

	if (maxTime - minTime < MIN_TIME_DIFFERENCE) {
		return [false, 'Time range must be at least 1 minute!'];
	}

	return [true, undefined];
};
