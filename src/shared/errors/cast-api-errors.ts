import {AbortError} from 'es-toolkit';
import {isHTTPError} from 'ky';

import {ApiError} from './api-error';


export const castApiErrors = async <T>(apiCall: () => Promise<T>): Promise<T> => {
	try {
		return await apiCall();
	} catch (error) {
		if (isHTTPError(error)) {
			const {response, request, options} = error;
			await response.body?.cancel();

			throw new ApiError(response, request, options);
		} else if (error instanceof Error && error.name === 'AbortError') {
			throw new AbortError(error.message);
		}

		throw error;
	}
};
