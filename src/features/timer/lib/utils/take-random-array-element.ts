import {randomizeInteger} from './randomize-integer';


export const takeRandomArrayElement = <T>(array: Array<T>): T | undefined => {
	return array.length
		? array[randomizeInteger(array.length - 1)]
		: undefined;
};
