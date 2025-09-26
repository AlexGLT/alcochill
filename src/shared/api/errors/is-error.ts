import {isObject} from '../libs/utils';

import type {Error} from './types';


export const isError = (arg: unknown): arg is Error => {
	return isObject(arg) && 'reason' in arg;
};
