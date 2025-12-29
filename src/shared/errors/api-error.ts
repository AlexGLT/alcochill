import {HTTPError} from 'ky';

import type {NormalizedOptions} from 'ky';


export class ApiError extends HTTPError {
	status: number;

	constructor(response: Response, request: Request, options: NormalizedOptions) {
		super(response, request, options);

		this.name = 'ApiError';
		this.status = response.status;
	}
}

export const isApiError = (error: unknown): error is ApiError => {
	return error instanceof ApiError;
};
