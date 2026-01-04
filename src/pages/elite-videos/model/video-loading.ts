import {createStore, sample, scopeBind} from 'effector';

import {createEffectWithAbort} from '@shared/api';
import {getVideoFx} from '@shared/api/random-videos';
import {isAbortError} from '@shared/errors';
import {createThrottledEvent} from '@shared/core/effector';
import {isNumber} from '@shared/libs';

import {Gate} from './basic';

import {
	videoSourceLoaded,
	videoRemoved,
	$videosListRef,
	$videosCount,
	$preloadedVideosCount,
} from './videos-list';

import {
	$activeIndex,
	movedForward,
	movedBackward,
} from './active-index';

import type {StoreRef} from '@shared/core/effector';
import type {ParamsWithSignal} from '@shared/api';
import type {VideoItem} from '../types';


const [
	videoLoadingProgressUpdated,
	updateVideoLoadingProgressFx,
] = createThrottledEvent<{index: number, progress: number | null}>([$activeIndex, Gate.close]);

export const $activeVideoLoadingProgress = createStore<number | null>(null).reset([$activeIndex, Gate.close]);

sample({
	clock: videoLoadingProgressUpdated,
	source: $activeIndex,
	filter: (activeIndex, {index}) => activeIndex === index,
	fn: (_, {progress}) => {
		return isNumber(progress) && progress !== 1
			? progress * 100
			: null;
	},
	target: $activeVideoLoadingProgress,
});

export const loadVideoFx = createEffectWithAbort(async (params: ParamsWithSignal<{
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

	const updateVideoLoadingProgress = scopeBind(updateVideoLoadingProgressFx);
	updateVideoLoadingProgress({index, progress: 0});

	return await getVideoFx({
		meta: {fileId},
		options: {
			signal,
			onDownloadProgress: ({percent: progress}) => {updateVideoLoadingProgress({index, progress})},
		},
	});
}, {gate: Gate});

sample({
	clock: loadVideoFx.finally,
	fn: ({params: {index}}) => ({index, progress: null}),
	target: videoLoadingProgressUpdated,
});

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
