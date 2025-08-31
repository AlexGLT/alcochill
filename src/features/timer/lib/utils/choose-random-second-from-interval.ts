const SECONDS_IN_MINUTE = 60;

export const chooseRandomSecondFromInterval = (min: number, max: number): number => {
	// TODO: forbid possibility to return 0
	return Math.round((Math.random() * (max - min) + min) * SECONDS_IN_MINUTE);
};
