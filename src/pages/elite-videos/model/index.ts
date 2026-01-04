import {
	Gate,
	scrollAnimationEnded,
	scrollAnimationStarted,
} from './basic';

import {
	$videosCount,
	$preloadedVideosCount,
	videosListFetched,
} from './videos-list';

import {
	$activeIndex,
	$displayedVideos,
	movedBackward,
	movedForward,
} from './active-index';

import {
	activeVideoRatingUpdated,
} from './video-rating';

import {$activeVideoLoadingProgress} from './video-loading';


export const model = {
	Gate,
	$videosCount,
	$preloadedVideosCount,
	$displayedVideos,
	$activeVideoLoadingProgress,
	$activeIndex,
	movedForward,
	movedBackward,
	activeVideoRatingUpdated,
	scrollAnimationStarted,
	scrollAnimationEnded,
	videosListFetched,
};
