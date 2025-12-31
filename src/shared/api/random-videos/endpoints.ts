import {createApiEffect} from '../create-api-effect';

import {RateVideoResponseSchema, VideoListResponseSchema} from './schemas';

import type {ApiCall, ApiCallFxParams} from '../types';

import type {
	RateVideoMeta,
	RateVideoResponse,
	VideoListMeta,
	VideoListResponse,
} from './schemas';


export const getVideosListByRange: ApiCall<VideoListResponse> = async (
	apiClient,
	options,
) => {
	const response = await apiClient.get('v1/videos', options);

	const body = await response.json();

	return VideoListResponseSchema.parse(body);
};

export const getVideosListByRangeFx = createApiEffect(
	async (client, {meta, options}: ApiCallFxParams<VideoListMeta>) => {
		const {dateEnd, dateStart} = meta;

		return await getVideosListByRange(client, {
			...options,
			searchParams: {
				dateEnd,
				dateStart,
			},
		});
	},
);

export const getVideo: ApiCall<string, {fileId: string}> = async (
	apiClient,
	params,
	options,
) => {
	const {fileId} = params;

	const response = await apiClient.get(`v1/videos/${fileId}`, options);

	const blob = await response.blob();

	return URL.createObjectURL(blob);
};

export const getVideoFx = createApiEffect(
	async (client, {meta, options}: ApiCallFxParams<{fileId: string}>) => {
		return await getVideo(client, meta, options);
	},
);

export const rateVideo: ApiCall<RateVideoResponse, {fileId: string}> = async (
	apiClient,
	params,
	options,
) => {
	const {fileId} = params;

	const response = await apiClient.post(`v1/videos/${fileId}/rating`, options);

	const body = await response.json();

	return RateVideoResponseSchema.parse(body);
};

export const rateVideoFx = createApiEffect(
	async (client, {meta, options}: ApiCallFxParams<RateVideoMeta>) => {
		const {fileId, rating} = meta;

		return await rateVideo(client, {fileId}, {
			...options,
			json: {
				rating,
			},
		});
	},
);
