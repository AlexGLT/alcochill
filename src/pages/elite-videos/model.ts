import {
	attach,
	combine,
	createEvent,
	createStore,
	sample,
	scopeBind,
} from 'effector';

import {shuffle} from 'es-toolkit';
import {createGate} from 'effector-react';

import {getVideoFx, rateVideoFx} from '@shared/api/random-videos';
import {createSubscribeEffect} from '@shared/core/effector';
import {createEffectWithAbort} from '@shared/api';
import {isAbortError} from '@shared/errors';

import type {StoreRef} from '@shared/core/effector';
import type {ParamsWithSignal} from '@shared/api';
import type {Video} from '@shared/api/random-videos';
import type {VideoItem} from './types';


const Gate = createGate();

const videosListFetched = createEvent<Array<Video>>();

const $rawVideosList = createStore<Array<Video> | null>(null)
	.on(videosListFetched, (_, videosList) => shuffle(videosList));

const scrollAnimationStarted = createEvent();
const scrollAnimationEnded = createEvent();

const $isAnimationPlaying = createStore<boolean>(false)
	.on(scrollAnimationStarted, () => true)
	.on(scrollAnimationEnded, () => false);

const videoRemoved = createEvent<{index: number}>();
const videoSourceLoaded = createEvent<{index: number, src: string | undefined}>();
const videoRatingUpdated = createEvent<{index: number, rating: number}>();

const $videosListRef = createStore<StoreRef<Array<VideoItem>>>({current: []})
	.on($rawVideosList.updates, (_, videos) => ({current: videos || []}))
	.on(videoRemoved, (state, {index}) => {
		const videosList = state.current;

		if (!videosList.length) {
			console.error('No videos to remove from!');
			return state;
		}

		if (!videosList[index]) {
			console.error(`No video at the specified index to remove! Index: ${index}, Length: ${videosList.length}`);
			return state;
		}

		videosList.splice(index, 1);

		return {current: videosList};
	})
	.on(videoSourceLoaded, (state, {index, src}) => {
		const videosList = state.current;

		if (!videosList.length) {
			console.error('No videos to load source into!');
			return state;
		}

		const targetVideoItem = videosList[index];

		if (!targetVideoItem) {
			console.error(`No video at the specified index to update! Index: ${index}, Length: ${videosList.length}`);
			return state;
		}

		videosList.splice(index, 1, {
			...targetVideoItem,
			src,
		});

		return {current: videosList};
	})
	.on(videoRatingUpdated, (state, {index, rating}) => {
		const videosList = state.current;

		if (!videosList.length) {
			console.error('No videos to update rating for!');
			return state;
		}

		const targetItem = videosList[index];

		if (!targetItem) {
			console.error(`No video at the specified index to update! Index: ${index}, Length: ${videosList.length}`);
			return state;
		}

		videosList.splice(index, 1, {
			...targetItem,
			rating,
		});

		return {current: videosList};
	})
	.on(Gate.close, ({current: videosList}) => {
		videosList.forEach(({src}) => {
			if (src) {
				URL.revokeObjectURL(src);
			}
		});

		return {current: []};
	});

const $videosCount = $videosListRef.map(({current: videosList}) => videosList.length);
const $preloadedVideosCount = $videosListRef.map(({current: videosList}) => videosList.findIndex(({src}) => !src));

const movedForward = createEvent();
const movedBackward = createEvent();

const $activeIndex = createStore<number>(0);

const $displayedVideos = combine($videosListRef, $activeIndex, ({current: videosList}, index) => {
	return [
		videosList[index - 1],
		videosList[index],
		videosList[index + 1],
	] as const;
});

sample({
	clock: movedForward,
	source: {
		isAnimationPlaying: $isAnimationPlaying,
		videosListRef: $videosListRef,
		index: $activeIndex,
	},
	filter: ({isAnimationPlaying, videosListRef: {current: videosList}, index}) => {
		if (!videosList.length) {
			console.error('No videos available!');
			return false;
		}

		if (index >= videosList.length - 1) {
			console.error('Already at the last video!');
			return false;
		}

		if (!videosList[index]?.src) {
			console.error('Wait until source is loaded at least for current video!');
			return false;
		}

		return !isAnimationPlaying;
	},
	fn: ({index}) => index + 1,
	target: $activeIndex,
});

sample({
	clock: movedBackward,
	source: {
		isAnimationPlaying: $isAnimationPlaying,
		videoListRef: $videosListRef,
		index: $activeIndex,
	},
	filter: ({isAnimationPlaying, videoListRef: {current: videosList}, index}) => {
		if (!videosList.length) {
			console.error('No videos available!');
			return false;
		}

		if (index === 0) {
			console.error('Already at the first video!');
			return false;
		}

		return !isAnimationPlaying;
	},
	fn: ({index}) => index - 1,
	target: $activeIndex,
});

// WHY: cover edge-case, when user was moved to the last video, but the source for this video cannot be loaded
sample({
	clock: videoRemoved,
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

const updateActiveVideoRatingFx = attach({
	source: {
		videoListRef: $videosListRef,
		index: $activeIndex,
	},
	effect: ({videoListRef: {current: videosList}, index}, rating: number) => {
		const targetVideoItem = videosList[index];

		videoRatingUpdated({index, rating});

		if (targetVideoItem) {
			return rateVideoFx({
				meta: {
					fileId: targetVideoItem.fileId,
					rating,
				},
			});
		}
	},
});

const activeVideoRatingUpdated = createEvent<number>();

sample({
	clock: activeVideoRatingUpdated,
	source: {
		isAnimationPlaying: $isAnimationPlaying,
		videoListRef: $videosListRef,
		index: $activeIndex,
	},
	filter: ({isAnimationPlaying, videoListRef: {current: videosList}, index}, rating) => {
		const targetVideoItem = videosList[index];

		if (!targetVideoItem) {
			console.error(`No video at the specified index to update! Index: ${index}, Length: ${videosList.length}`);
			return false;
		}

		return !isAnimationPlaying && targetVideoItem.rating !== rating;
	},
	fn: (_, rating) => rating,
	target: updateActiveVideoRatingFx,
});

const {subscribeFx, unsubscribeFx} = createSubscribeEffect(() => {
	const moveForward = scopeBind(movedForward);
	const moveBackward = scopeBind(movedBackward);

	const rateVideo = scopeBind(activeVideoRatingUpdated);

	const onKeyDown = (event: KeyboardEvent): void => {
		if (event.key === 'ArrowDown') {
			moveForward();
		} else if (event.key === 'ArrowUp') {
			moveBackward();
		} else if (event.key === '1') {
			rateVideo(1);
		} else if (event.key === '2') {
			rateVideo(2);
		} else if (event.key === '3') {
			rateVideo(3);
		} else if (event.key === '4') {
			rateVideo(4);
		} else if (event.key === '5') {
			rateVideo(5);
		}
	};

	window.addEventListener('keydown', onKeyDown);

	return () => {
		window.removeEventListener('keydown', onKeyDown);
	};
});

sample({
	clock: Gate.open,
	target: subscribeFx,
});

sample({
	clock: Gate.close,
	target: unsubscribeFx,
});

const loadVideoFx = createEffectWithAbort(async (params: ParamsWithSignal<{
	videosListRef: StoreRef<Array<VideoItem>>,
	index: number,
}>) => {
	const {
		videosListRef: {current: videosList},
		index,
		signal,
	} = params;

	if (videosList.length <= index) {
		console.error('Index out of bounds!');
		return;
	}

	const targetVideoItem = videosList[index];

	if (!targetVideoItem) {
		console.error(`No video at index ${index} to load!`);
		return;
	}

	const {fileId, src} = targetVideoItem;

	if (src) {
		console.error(`Video at index ${index} already has a source loaded!`);
		return;
	}

	return await getVideoFx({
		meta: {fileId},
		options: {signal},
		// options: {onDownloadProgress: console.log},
	});
}, {gate: Gate});

sample({
	clock: loadVideoFx.done,
	source: {isGateOpened: Gate.status},
	filter: ({isGateOpened}) => isGateOpened,
	fn: (_, {params: {index}, result}) => ({index, src: result}),
	target: videoSourceLoaded,
});

sample({
	clock: loadVideoFx.fail,
	source: {isGateOpened: Gate.status},
	filter: ({isGateOpened}, {error}) => isGateOpened && !isAbortError(error),
	fn: (_, {params: {index}}) => ({index}),
	target: videoRemoved,
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
		videosListRef: $videosListRef,
		videosCount: $videosCount,
		preloadedVideosCount: $preloadedVideosCount,
		index: $activeIndex,
		isAlreadyPending: loadVideoFx.pending,
	},
	filter: ({
		index,
		videosCount,
		preloadedVideosCount,
		isAlreadyPending,
	}) => {
		return (
			!isAlreadyPending &&
			preloadedVideosCount <= index + 3 &&
			!!videosCount &&
			videosCount !== preloadedVideosCount
		);
	},
	fn: ({preloadedVideosCount: index, videosListRef}) => ({index, videosListRef}),
	target: loadVideoFx,
});

export const model = {
	Gate,
	$videosCount,
	$displayedVideos,
	$activeIndex,
	movedForward,
	movedBackward,
	activeVideoRatingUpdated,
	scrollAnimationStarted,
	scrollAnimationEnded,
	videosListFetched,
};
