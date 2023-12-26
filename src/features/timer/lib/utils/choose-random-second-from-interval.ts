export const chooseRandomSecondFromInterval = (min: number, max: number): number => (
	// eslint-disable-next-line no-mixed-operators, @typescript-eslint/no-magic-numbers
	Math.round((Math.random() * (max - min) + min) * 60)
);
