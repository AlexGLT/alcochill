import {createEvent, createStore, sample} from 'effector';

import {createEffectWithAbort} from '@shared/api';
import {getVideoFx} from '@shared/api/random-videos';
import {isAbortError} from '@shared/errors';

import {movedForward, movedBackward, $activeIndex} from './active-index';

import {
	videoSourceLoaded,
	videoRemoved,
	$videosListRef,
	$videosCount,
	$preloadedVideosCount,
} from './videos-list';

import {Gate} from './basic';

import type {ParamsWithSignal} from '@shared/api';
import type {StoreRef} from '@shared/core/effector';
import type {VideoItem} from '../types';


const activeVideoProgressUpdated = createEvent<number>();

export const activeVideoProgress = createStore(0)
	.on(activeVideoProgressUpdated, (_, progress) => progress)
	.reset(Gate.close);

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
			preloadedVideosCount <= index + 5 &&
			!!videosCount &&
			videosCount !== preloadedVideosCount
		);
	},
	fn: ({preloadedVideosCount: index, videosListRef}) => ({index, videosListRef}),
	target: loadVideoFx,
});
