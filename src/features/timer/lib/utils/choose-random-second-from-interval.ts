const SECONDS_IN_MINUTE = 60;

export const chooseRandomSecondFromInterval = (min: number, max: number): number => {
	return Math.round((Math.random() * (max - min) + min) * SECONDS_IN_MINUTE);
};
