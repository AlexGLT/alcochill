import {
	createEvent,
	attach,
	scopeBind,
	sample,
} from 'effector';

import {rateVideoFx} from '@shared/api/random-videos';
import {createSubscribeEffect} from '@shared/core/effector';

import {movedForward, movedBackward, $activeIndex} from './active-index';
import {$isAnimationPlaying, Gate} from './basic';
import {videoRatingUpdated, $videosListRef} from './videos-list';


export const activeVideoRatingUpdated = createEvent<number>();

const [subscribeKeyboardFx, unsubscribeKeyboardFx] = createSubscribeEffect(() => {
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
	target: subscribeKeyboardFx,
});

sample({
	clock: Gate.close,
	target: unsubscribeKeyboardFx,
});

export const updateActiveVideoRatingFx = attach({
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
