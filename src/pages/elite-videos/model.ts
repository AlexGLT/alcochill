import {
	attach,
	combine,
	createEvent,
	createStore,
	sample,
} from 'effector';

import {shuffle} from 'es-toolkit';
import {createGate} from 'effector-react';

import {getVideoFx} from '@shared/api/random-videos';

import type {Video} from '@shared/api/random-videos';
import type {VideoItem} from './types';


const Gate = createGate();

const videosListFetched = createEvent<Array<Video>>();

const $rawVideosList = createStore<Array<Video> | null>(null)
	.on(videosListFetched, (_, videos) => shuffle(videos));

const videoItemRemoved = createEvent<{index: number}>();
const videoItemSourceLoaded = createEvent<{index: number, src: string | undefined}>();
const videoRatingUpdated = createEvent<{index: number, rating: number}>();

const $videosList = createStore<{ref: Array<VideoItem> | null}>({ref: null})
	.on($rawVideosList.updates, (_, videos) => ({ref: videos}))
	.on(videoItemRemoved, (state, {index}) => {
		if (!state.ref) {
			console.error('No videos to remove from!');
			return state;
		}

		if (!state.ref[index]) {
			console.error(`No video at the specified index to remove! Index: ${index}, Length: ${state.ref.length}`);
			return state;
		}


		const videosList = state.ref;
		state.ref.splice(index, 1);

		return {ref: videosList};
	})
	.on(videoItemSourceLoaded, (state, {index, src}) => {
		if (!state.ref) {
			console.error('No videos to load source into!');
			return state;
		}

		const targetVideoItem = state.ref[index];

		if (!targetVideoItem) {
			console.error(`No video at the specified index to update! Index: ${index}, Length: ${state.ref.length}`);
			return state;
		}

		const videosList = state.ref;
		videosList.splice(index, 1, {
			...targetVideoItem,
			src,
		});

		return {ref: videosList};
	})
	.on(videoRatingUpdated, (state, {index, rating}) => {
		if (!state.ref) {
			console.error('No videos to update rating for!');
			return state;
		}

		const targetItem = state.ref[index];

		if (!targetItem) {
			console.error(`No video at the specified index to update! Index: ${index}, Length: ${state.ref.length}`);
			return state;
		}

		const videosList = state.ref;
		videosList.splice(index, 1, {
			...targetItem,
			rating,
		});

		return {ref: videosList};
	});

const $preloadedVideosCount = $videosList.map(({ref: videosList}) => (videosList || []).findIndex(({src}) => !src));

const movedForward = createEvent();
const movedBackward = createEvent();

const $activeIndex = createStore<number>(0);

sample({
	clock: movedForward,
	source: {
		index: $activeIndex,
		videosList: $videosList,
	},
	filter: ({index, videosList: {ref: videosList}}) => {
		if (!videosList) {
			console.error('No videos available!');
			return false;
		}

		if (index >= videosList.length - 1) {
			console.error('Already at the last video!');
			return false;
		}

		return true;
	},
	fn: ({index}) => index + 1,
	target: $activeIndex,
});

sample({
	clock: movedBackward,
	source: {
		index: $activeIndex,
		videosList: $videosList,
	},
	filter: ({index, videosList: {ref: videosList}}) => {
		if (!videosList) {
			console.error('No videos available!');
			return false;
		}

		if (index === 0) {
			console.error('Already at the first video!');
			return false;
		}

		return true;
	},
	fn: ({index}) => index - 1,
	target: $activeIndex,
});

const loadVideoFx = attach({
	source: $videosList,
	effect: async ({ref: videosList}, targetVideoIndex: number) => {
		if (!videosList || videosList.length <= targetVideoIndex) {
			console.error('Index out of bounds!');
			return;
		}

		for (let shift = 0; shift + targetVideoIndex < videosList.length; shift++) {
			const fallbackIndex = targetVideoIndex + shift;

			const targetVideoItem = videosList[fallbackIndex];

			if (!targetVideoItem) {
				console.error(`No video at index ${fallbackIndex} to load!`);
				continue;
			}

			if (targetVideoItem.src) {
				console.error(`Video at index ${fallbackIndex} already has a source loaded!`);
				continue;
			}

			const {fileId} = targetVideoItem;

			try {
				const videoUrl = await getVideoFx({
					meta: {fileId},
					// options: {onDownloadProgress: console.log},
				});

				return videoUrl;
			} catch (error) {
				console.error('Error loading video', error);
				videoItemRemoved({index: fallbackIndex});
			}
		}

		console.error('No valid video found to load source for!');
		return undefined;
	},
});

sample({
	clock: loadVideoFx.done,
	fn: ({params, result}) => ({index: params, src: result}),
	target: videoItemSourceLoaded,
});

sample({
	clock: [
		$activeIndex,
		$preloadedVideosCount,
		movedForward,
		movedBackward,
	],
	source: {
		index: $activeIndex,
		preloadedVideosCount: $preloadedVideosCount,
	},
	filter: ({index, preloadedVideosCount}) => preloadedVideosCount <= index + 3,
	fn: ({preloadedVideosCount}) => preloadedVideosCount,
	target: loadVideoFx,
});

const $displayedVideos = combine($videosList, $activeIndex, ({ref: videosList}, index) => {
	return [
		videosList?.[index - 1],
		videosList?.[index],
		videosList?.[index + 1],
	] as const;
});

export const model = {
	Gate,
	$videosList,
	$displayedVideos,
	$activeIndex,
	movedForward,
	movedBackward,
	videosListFetched,
};
