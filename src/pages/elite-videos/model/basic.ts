import {createStore, createEvent} from 'effector';
import {createGate} from 'effector-react';


export const Gate = createGate();

export const scrollAnimationStarted = createEvent();
export const scrollAnimationEnded = createEvent();

export const $isAnimationPlaying = createStore<boolean>(false)
	.on(scrollAnimationStarted, () => true)
	.on(scrollAnimationEnded, () => false);
