import type {IntervalParams} from '../../types';


export const chooseRandomSecondFromInterval = ({min, max, timeout}: IntervalParams): number => (
	// eslint-disable-next-line no-mixed-operators, @typescript-eslint/no-magic-numbers
	Math.round((Math.random() * (max - min) + min) * 60)
);
