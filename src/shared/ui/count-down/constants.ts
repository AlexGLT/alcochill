export enum Direction {
	UP = 'UP',
	DOWN = 'DOWN',
}

export enum TimeMetric {
	SECOND = 'SECOND',
	MINUTE = 'MINUTE',
	HOUR = 'HOUR',
	DAY = 'DAY',
	MONTH = 'MONTH',
	YEAR = 'YEAR',
}

export const TIME_METRIC_LIMITS: Record<TimeMetric, number> = {
	[TimeMetric.SECOND]: 60,
	[TimeMetric.MINUTE]: 60,
	[TimeMetric.HOUR]: 24,
	[TimeMetric.DAY]: 30,
	[TimeMetric.MONTH]: 12,
	[TimeMetric.YEAR]: Infinity,
};

// STYLES

export enum CSSVariable {
	TIME_SPEED = '--time-speed',
}
