import {createEffect, createEvent} from 'effector';

import {getRandomMeme} from '../api';


export const moveTo = createEvent<number>();
export const previous = createEvent();
export const next = createEvent();
export const reset = createEvent();

export const fetchRandomMemeFx = createEffect(() => (
	getRandomMeme()
		.then((response) => response.blob())
		.then((blob) => URL.createObjectURL(blob))
));
