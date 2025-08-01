import {z} from 'zod';

import {
	addDays,
	addYears,
	isValid,
} from 'date-fns';

import fetch from '@shared/core/fetch';


const VideoSchema = z.object({
	fileId: z.string(),
	from: z.string(),
	timestamp: z.string(),
});

export type Video = z.infer<typeof VideoSchema>;

const VideoListSchema = z.array(VideoSchema);

export type VideoList = z.infer<typeof VideoListSchema>;

const TODAY = Date.now();
const EMPTY_LIST: Array<Video> = [];

export const getVideosListByRange = (to: string | number = TODAY, from?: string | number): Promise<VideoList> => {
	const searchParams = new URLSearchParams();

	const dateEnd = isValid(to)
		? addDays(to, 1)
		: addDays(TODAY, 1);

	const dateStart = from && isValid(from)
		? new Date(from)
		: addYears(dateEnd, -1);

	searchParams.set('dateStart', dateStart.toISOString());
	searchParams.set('dateEnd', dateEnd.toISOString());

	return fetch(`api/v1/videos?${searchParams}`)
		.then((res) => res.json())
		.then((res) => VideoListSchema.parse(res))
		.catch(() => EMPTY_LIST);
};

export const getRandomVideoUrl = (fileId: string): string => {
	return `https://840ca558-80be-454c-8a82-9170ec14b807.pub.instances.scw.cloud:8000/api/v1/videos/${fileId}`;
};
