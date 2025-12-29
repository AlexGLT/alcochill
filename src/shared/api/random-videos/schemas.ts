import z from 'zod';


export const VideoSchema = z.object({
	fileId: z.string(),
	from: z.string(),
	timestamp: z.string(),
	rating: z
		.number()
		.min(0)
		.max(5)
		.optional(),
});

export type Video = z.infer<typeof VideoSchema>;

export const VideoListResponseSchema = z.array(VideoSchema);

export type VideoListResponse = z.infer<typeof VideoListResponseSchema>;

export type VideoListMeta = {
	dateEnd: string | number,
	dateStart: string | number,
};

export const RateVideoResponseSchema = z.object({
	message: z.string(),
});

export type RateVideoResponse = z.infer<typeof RateVideoResponseSchema>;

export type RateVideoMeta = {
	fileId: string,
	rating: number,
};
