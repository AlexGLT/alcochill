import {attach} from 'effector';

import {castApiErrors} from '@shared/errors';

import {$apiClient} from './client';

import type {Effect} from 'effector';
import type {ApiCallFxParams, ApiClient} from './types';


export const createApiEffect = <Params extends ApiCallFxParams, Data>(
	effect: (apiClient: ApiClient, params?: Params) => Promise<Data>,
): Effect<Params, Data> => {
	return attach({
		source: $apiClient,
		effect: (apiClient, params: Params) => (
			castApiErrors(() => effect(apiClient, params))
		),
	});
};
