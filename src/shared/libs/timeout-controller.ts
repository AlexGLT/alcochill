import {isNumber} from './utils';


export class TimeoutController {
	private readonly timeout: number;

	private timerId: number | undefined;

	constructor(timeout: number) {
		this.timeout = timeout;
	}

	delay = (callback: (arg?: unknown) => void): void => {
		if (isNumber(this.timerId)) {
			console.error('Timer is already running!');
		}

		this.timerId = window.setTimeout(callback, this.timeout);
	};

	clear = (): void => {
		window.clearTimeout(this.timerId);
		this.timerId = undefined;
	};
}
