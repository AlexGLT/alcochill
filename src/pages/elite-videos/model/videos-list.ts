import {shuffle} from 'es-toolkit';
import {createEvent, createStore} from 'effector';

import {Gate} from './basic';

import type {Video} from '@shared/api/random-videos';
import type {StoreRef} from '@shared/core/effector';
import type {VideoItem} from '../types';


export const videosListFetched = createEvent<Array<Video>>();

export const $rawVideosList = createStore<Array<Video> | null>(null)
	.on(videosListFetched, (_, videosList) => shuffle(videosList));

export const videoRemoved = createEvent<{index: number}>();
export const videoSourceLoaded = createEvent<{index: number, src: string | undefined}>();
export const videoRatingUpdated = createEvent<{index: number, rating: number}>();

export const $videosListRef = createStore<StoreRef<Array<VideoItem>>>({current: []})
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

export const $videosCount = $videosListRef.map(({current: videosList}) => videosList.length);
export const $preloadedVideosCount = $videosListRef.map(({current: videosList}) => {
	return videosList.findIndex(({src}) => !src);
});
