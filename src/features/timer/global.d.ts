declare global {
	// eslint-disable-next-line typescript/consistent-type-definitions
	interface Window {
		timer: {
			sounds: Record<string, string>,
			changeMinTime: (time: number) => void,
			changeMaxTime: (time: number) => void,
			changeChosenSounds: (sounds: Array<string>) => void,
			startTimer: () => void,
			stopTimer: () => void,
		},
	}
}

export {};
