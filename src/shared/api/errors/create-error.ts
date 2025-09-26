import {isNumber} from '@shared/libs';

import {ErrorReason} from './types';

import type {Error} from './types';


export const createError = (reason: number | ErrorReason): Error => {
	if (!isNumber(reason)) {
		return {reason};
	}

	if (reason === 400) {
		return {reason: ErrorReason.BAD_REQUEST};
	}

	if (reason === 401) {
		return {reason: ErrorReason.UNAUTHORIZED};
	}

	if (reason === 409) {
		return {reason: ErrorReason.CONFLICT};
	}

	return {reason: ErrorReason.UNEXPECTED_RESPONSE};
};
