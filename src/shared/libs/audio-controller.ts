import {TimeoutController} from './timeout-controller';


const DEFAULT_TIMEOUT = 1000;

export class AudioController {
	private readonly delay: number;

	private abortController: AbortController | undefined;
	private timeoutController: TimeoutController | undefined;

	private readonly audio: HTMLAudioElement;

	constructor(src?: string, playEndDelay: number = DEFAULT_TIMEOUT) {
		this.delay = playEndDelay;
		this.audio = new Audio(src);
	}

	updateSource = (src: string): void => {
		try {
			this.audio.src = src;
			this.audio.load();
		} catch (error) {
			console.error('Error updating audio source:', error);
		}
	};

	play = (): Promise<void> => {
		return this.audio
			.play()
			.then(() => {
				return new Promise((resolve, reject) => {
					const timeoutController = new TimeoutController(this.delay);
					const abortController = new AbortController();

					const onPlayEnd = (): void => {
						timeoutController.delay(resolve);
					};

					this.audio.addEventListener('pause', onPlayEnd, {signal: abortController.signal});
					this.audio.addEventListener('error', reject, {signal: abortController.signal});

					this.timeoutController = timeoutController;
					this.abortController = abortController;
				});
			});
	};

	pause = (): void => {
		this.audio.pause();
	};

	clear = (): void => {
		this.abortController?.abort();
		this.timeoutController?.clear();
		this.audio.load();
	};
}
