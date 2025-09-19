export const createTimeoutPromise = (callback: () => void, delay: number): Promise<void> => {
	return new Promise<void>((resolve) => {
		window.setTimeout(() => {
			callback();
			resolve();
		}, delay);
	});
};
