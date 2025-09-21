import {validateTimeRange} from './validate-time-range';
import {validateTimeSpeed} from './validate-time-speed';
import {validateSounds} from './validate-sounds';

import type {TimerConfig} from '../../types';


export const validateConfig = ({
	minTime,
	maxTime,
	timeSpeed,
	sounds,
}: TimerConfig): string | undefined => {
	const [isTimeRangeValid, timeRangeError] = validateTimeRange(minTime, maxTime);

	if (!isTimeRangeValid) {
		return timeRangeError;
	}

	const [isTimeSpeedValid, timeSpeedError] = validateTimeSpeed(timeSpeed);

	if (!isTimeSpeedValid) {
		return timeSpeedError;
	}

	const [areSoundsValid, soundsError] = validateSounds(sounds);

	if (!areSoundsValid) {
		return soundsError;
	}

	return undefined;
};
