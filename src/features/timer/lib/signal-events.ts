// TODO: make DELAY_BEFORE_SIGNAL configurable
export const DELAY_BEFORE_SIGNAL = 1000;
export const PRE_SIGNAL_EVENT = 'timer:pre-signalizing';

export const emitPreSignalEvent = (): void => {
	window.dispatchEvent(new CustomEvent(PRE_SIGNAL_EVENT));
};


// TODO: make DELAY_AFTER_SIGNAL configurable
export const DELAY_AFTER_SIGNAL = 1000;
export const POST_SIGNAL_EVENT = 'timer:post-signalizing';

export const emitPostSignalEvent = (): void => {
	window.dispatchEvent(new CustomEvent(POST_SIGNAL_EVENT));
};
