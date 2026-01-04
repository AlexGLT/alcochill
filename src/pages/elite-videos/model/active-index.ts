import {
	createStore,
	combine,
	createEvent,
	sample,
} from 'effector';

import {Gate, $isAnimationPlaying} from './basic';

import {
	videoRemoved,
	$videosCount,
	$videosListRef,
} from './videos-list';


export const movedForward = createEvent();
export const movedBackward = createEvent();

export const $activeIndex = createStore<number>(0).reset(Gate.close);

export const $displayedVideos = combine($videosListRef, $activeIndex, ({current: videosList}, index) => {
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
