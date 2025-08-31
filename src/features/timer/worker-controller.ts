import {TimerEventType} from './types';

import type {TimerIncomingMessage, TimerUpcomingMessage} from './types';


type noop = () => void;

type InitializationConfig = {
	interval: number,
	onCounterUpdate: (counter: number) => void,
};

export class WorkerController {
	private worker: Worker | undefined;
	private cleanup: noop | undefined;

	private readonly postMessage = (message: TimerIncomingMessage): void => {
		if (this.worker) {
			this.worker.postMessage(message);
		} else {
			console.error('Worker is not started!');
		}
	};

	initialize = ({interval, onCounterUpdate}: InitializationConfig): void => {
		if (!this.worker) {
			const onMessage = (event: MessageEvent<TimerUpcomingMessage>): void => {
				onCounterUpdate(event.data.counter);
			};

			const worker = new Worker(new URL('./worker-interval.js', import.meta.url), {type: 'module'});
			worker.addEventListener('message', onMessage);

			this.postMessage({
				type: TimerEventType.START,
				interval,
			});

			this.cleanup = (): void => {
				worker.removeEventListener('message', onMessage);
			};
		} else {
			console.error('Worker is already initialized!');
		}
	};

	start = (interval: number): void => {
		this.postMessage({
			type: TimerEventType.START,
			interval,
		});
	};

	pause = (): void => {
		this.postMessage({
			type: TimerEventType.PAUSE,
		});
	};

	resume = (): void => {
		this.postMessage({
			type: TimerEventType.RESUME,
		});
	};

	restart = (): void => {
		this.postMessage({
			type: TimerEventType.RESTART,
		});
	};

	destroy = (): void => {
		if (this.worker) {
			this.cleanup?.();
			this.cleanup = undefined;

			this.worker.terminate();
			this.worker = undefined;
		} else {
			console.error('Worker is not initialized!');
		}
	};
}
