import type {Sound} from '@shared/types';
import type {ValidationResult} from './types';


export const validateSounds = (sounds: Array<Sound>): ValidationResult => {
	if (!sounds.length) {
		return [false, 'At least one sound must be selected!'];
	}

	return [true, undefined];
};
