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

export const TIME_IN_SECONDS: Record<TimeMetric, number> = {
	[TimeMetric.SECOND]: 0,
	[TimeMetric.MINUTE]: TIME_METRIC_LIMITS.SECOND,
	[TimeMetric.HOUR]: TIME_METRIC_LIMITS.SECOND * TIME_METRIC_LIMITS.MINUTE,
	[TimeMetric.DAY]: TIME_METRIC_LIMITS.SECOND * TIME_METRIC_LIMITS.MINUTE * TIME_METRIC_LIMITS.HOUR,
	[TimeMetric.MONTH]: TIME_METRIC_LIMITS.SECOND * TIME_METRIC_LIMITS.MINUTE * TIME_METRIC_LIMITS.HOUR * TIME_METRIC_LIMITS.DAY, // eslint-disable-line max-len
	[TimeMetric.YEAR]: TIME_METRIC_LIMITS.SECOND * TIME_METRIC_LIMITS.MINUTE * TIME_METRIC_LIMITS.HOUR * TIME_METRIC_LIMITS.DAY * TIME_METRIC_LIMITS.MONTH, // eslint-disable-line max-len
};

// STYLES

export enum CSSVariable {
	TIME_SPEED = '--time-speed',
}
