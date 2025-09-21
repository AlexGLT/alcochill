import type {ValidationResult} from './types';


const MIN_TIME_SPEED = 0.2;
const MAX_TIME_SPEED = 5;

export const validateTimeSpeed = (timeSpeed: number): ValidationResult => {
	if (timeSpeed <= 0) {
		return [false, 'Time speed must be a positive number!'];
	}

	if (timeSpeed < MIN_TIME_SPEED) {
		return [false, `Time speed cannot be less than ${MIN_TIME_SPEED}!`];
	}

	if (timeSpeed > MAX_TIME_SPEED) {
		return [false, `Time speed cannot be greater than ${MAX_TIME_SPEED}!`];
	}

	return [true, undefined];
};
