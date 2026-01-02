import {
	attach,
	combine,
	createEffect,
	createEvent,
	createStore,
	sample,
} from 'effector';

import {shuffle} from 'es-toolkit';
import {createGate} from 'effector-react';

import {getVideoFx, rateVideoFx} from '@shared/api/random-videos';

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
	})
	.on(Gate.close, ({ref: videosList}) => {
		videosList?.forEach(({src}) => {
			if (src) {
				URL.revokeObjectURL(src);
			}
		});

		return {ref: null};
	});

sample({
	clock: videoRatingUpdated,
	source: {videos: $videosList},
	filter: ({videos: {ref: videosList}}, {index, rating}) => {
		const targetVideoItem = videosList?.[index];

		if (!targetVideoItem) {
			console.error(
				`No video at the specified index to update! Index: ${index}, Length: ${videosList?.length || 0}`,
			);

			return false;
		}

		return targetVideoItem.rating === rating;
	},
	fn: ({videos: {ref: videosList}}, {index, rating}) => {
		const {fileId} = videosList![index]!;

		return {meta: {fileId, rating}};
	},
	target: rateVideoFx,
});

const $videosCount = $videosList.map(({ref: videosList}) => (videosList || []).length);
const $preloadedVideosCount = $videosList.map(({ref: videosList}) => (videosList || []).findIndex(({src}) => !src));

const movedForward = createEvent();
const movedBackward = createEvent();

const $activeIndex = createStore<number>(0);

sample({
	clock: videoItemRemoved,
	source: {
		index: $activeIndex,
		videosCount: $videosCount,
	},
	filter: ({index, videosCount}) => {
		return videosCount > 0
			? index >= videosCount
			: false;
	},
	fn: ({videosCount}) => videosCount - 1,
	target: $activeIndex,
});

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


const abortControllerCreated = createEvent<AbortController>();
const $abortController = createStore<AbortController | null>(null)
	.on(abortControllerCreated, (_, controller) => controller);

const loadVideoFx = attach({
	source: $videosList,
	effect: async ({ref: videosList}, targetVideoIndex: number) => {
		if (!videosList || videosList.length <= targetVideoIndex) {
			console.error('Index out of bounds!');
			return;
		}

		const targetVideoItem = videosList[targetVideoIndex];

		if (!targetVideoItem) {
			console.error(`No video at index ${targetVideoIndex} to load!`);
			return;
		}

		const {fileId, src} = targetVideoItem;

		if (src) {
			console.error(`Video at index ${targetVideoIndex} already has a source loaded!`);
			return;
		}

		const abortController = new AbortController();
		abortControllerCreated(abortController);

		return await getVideoFx({
			meta: {fileId},
			options: {signal: abortController.signal},
			// options: {onDownloadProgress: console.log},
		});
	},
});

sample({
	clock: Gate.status,
	source: $abortController,
	filter: (_, isGateOpened) => !isGateOpened,
	target: createEffect((abortController: AbortController | null) => abortController?.abort()),
});

sample({
	clock: loadVideoFx.done,
	source: {isGateOpened: Gate.status},
	filter: ({isGateOpened}) => isGateOpened,
	fn: (_, {params, result}) => ({index: params, src: result}),
	target: videoItemSourceLoaded,
});

sample({
	clock: loadVideoFx.fail,
	source: {isGateOpened: Gate.status},
	filter: ({isGateOpened}) => isGateOpened,
	fn: (_, {params}) => ({index: params}),
	target: videoItemRemoved,
});

sample({
	clock: [
		$activeIndex,
		$videosCount,
		$preloadedVideosCount,
		movedForward,
		movedBackward,
	],
	source: {
		index: $activeIndex,
		preloadedVideosCount: $preloadedVideosCount,
		videosCount: $videosCount,
	},
	filter: ({index, videosCount, preloadedVideosCount}) => {
		return !!videosCount && preloadedVideosCount <= index + 3 && videosCount !== preloadedVideosCount;
	},
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
	videoRatingUpdated,
	videosListFetched,
};
