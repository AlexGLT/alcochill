import {TIME_IN_SECONDS, TimeMetric} from '../constants';


const DEFAULT_COUNT = 3;

const COUNT: Record<TimeMetric, number> = {
	[TimeMetric.SECOND]: 1,
	[TimeMetric.MINUTE]: 2,
	[TimeMetric.HOUR]: 3,
	[TimeMetric.DAY]: 4,
	[TimeMetric.MONTH]: 5,
	[TimeMetric.YEAR]: 6,
};

export const computeOptimalCounterBlockCount = (maxTime: number): number => {
	const timesInSeconds = Object.entries(TIME_IN_SECONDS).filter(([_, timeInSeconds]) => timeInSeconds >= maxTime);

	return Math.max(5) || DEFAULT_COUNT;
};
