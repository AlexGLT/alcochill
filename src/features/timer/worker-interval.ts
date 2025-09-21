import {isNumber} from '@shared/libs';

import type {TimerIncomingMessage, TimerUpcomingMessage} from './types';


const DEFAULT_INTERVAL = 1000;

let activeTimerId: number | undefined;
let activeInterval: number | undefined;

let counter = 0;

const updateCounter = (value: number): void => {
	counter = value;

	self.postMessage({
		type: 'UPDATE',
		counter: value,
	} satisfies MessageEvent<TimerUpcomingMessage>['data']);
};

const destroyInterval = (): void => {
	if (!isNumber(activeTimerId)) {
		console.error('Timer was not started!');
	}

	self.clearInterval(activeTimerId);
	activeTimerId = undefined;
};

const setupInterval = (interval?: number): void => {
	if (isNumber(activeTimerId)) {
		console.error('Timer is already running!');
		destroyInterval();
	}

	if (!isNumber(activeInterval) && !isNumber(interval)) {
		console.error('Incorrect interval!');
	}

	activeInterval = interval ?? activeInterval ?? DEFAULT_INTERVAL;

	activeTimerId = self.setInterval(() => {
		updateCounter(counter + 1);
	}, activeInterval);
};

self.addEventListener('message', (event: MessageEvent<TimerIncomingMessage>) => {
	const {data} = event;

	switch (data.type) {
		case 'START': {
			setupInterval(data.interval);
			break;
		}

		case 'PAUSE': {
			destroyInterval();
			break;
		}

		case 'RESUME': {
			setupInterval();
			break;
		}

		case 'STOP': {
			destroyInterval();
			activeInterval = undefined;
			break;
		}

		case 'RESTART': {
			updateCounter(0);
			setupInterval();
			break;
		}

		default:
			console.error('Incorrect message was posted!');
	}
});

