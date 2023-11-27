import {combine, createStore, sample} from 'effector';

import {isNumber} from '@shared/libs';

import {
	moveTo,
	previous,
	next,
	reset,
	fetchRandomMemeFx,
} from './actions';


export const $isLoading = fetchRandomMemeFx.pending;

export const $index = createStore<number | null>(null)
	.on(moveTo, (_, newState) => newState)
	.on(previous, (state) => (state ?? 0) - 1)
	.on(next, (state) => (state ?? 0) + 1)
	.on(reset, () => null);

export const $list = createStore<Array<string>>([])
	.on(fetchRandomMemeFx.doneData, (state, newMemeLink) => state.concat(newMemeLink))
	.on(reset, (state) => {
		state.forEach((link) => {
			URL.revokeObjectURL(link);
		});

		return [];
	});

export const $currentMemeLink = combine($list, $index, (currentList, currentIndex) => (
	isNumber(currentIndex) ? currentList[currentIndex] : undefined
));

sample({
	source: $list,
	clock: $index,
	filter: (currentList, currentIndex) => (
		isNumber(currentIndex) && !currentList[currentIndex]
	),
	target: fetchRandomMemeFx,
});
