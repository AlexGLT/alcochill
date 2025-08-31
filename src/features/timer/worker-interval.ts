import {isNumber} from '@shared/libs';

import type {TimerIncomingMessage, TimerUpcomingMessage} from './types';


const DEFAULT_INTERVAL = 1000;

class Timer {
	private activeTimerId: number | undefined;
	private activeInterval: number | undefined;

	private counter = 0;

	updateCounter = (value: number): void => {
		this.counter = value;

		self.postMessage({
			type: 'UPDATE',
			counter: value,
		} satisfies MessageEvent<TimerUpcomingMessage>['data']);
	};

	private readonly clearInterval = (): void => {
		if (!isNumber(this.activeTimerId)) {
			console.error('Timer was not started!');
		}

		self.clearInterval(this.activeTimerId);
		this.activeTimerId = undefined;
	};

	private readonly setupInterval = (): void => {
		if (isNumber(this.activeTimerId)) {
			console.error('Timer is already running!');
			this.clearInterval();
		}

		if (!isNumber(this.activeInterval)) {
			console.error('Incorrect interval!');
		}

		this.activeTimerId = self.setInterval(() => {
			this.updateCounter(this.counter + 1);
		}, this.activeInterval ?? DEFAULT_INTERVAL);
	};

	start = (interval: number): void => {
		this.activeInterval = interval;

		this.setupInterval();
	};

	pause = (): void => {
		this.clearInterval();
	};

	resume = (): void => {
		this.setupInterval();
	};

	stop = (): void => {
		this.clearInterval();
		this.activeInterval = undefined;
	};

	restart = (): void => {
		this.updateCounter(0);

		this.setupInterval();
	};
}

const timer = new Timer();

self.addEventListener('message', (event: MessageEvent<TimerIncomingMessage>) => {
	const {data} = event;

	switch (data.type) {
		case 'START': {
			timer.start(data.interval);
			break;
		}

		case 'PAUSE': {
			timer.pause();
			break;
		}

		case 'RESUME': {
			timer.resume();
			break;
		}

		case 'STOP': {
			timer.stop();
			break;
		}

		case 'RESTART': {
			timer.restart();
			break;
		}

		default:
			console.error('Incorrect message was posted!');
	}
});

