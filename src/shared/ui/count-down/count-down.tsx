import {Fragment, useCallback, useLayoutEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';

import {useStableCallback} from '@shared/libs/hooks';

import {CounterBlock} from './ui';
import {parseSeconds} from './utils';
import {Direction, TIME_IN_SECONDS, TimeMetric} from './constants';
import styles from './count-down.module.scss';

import type {FC, ReactNode} from 'react';


const DEFAULT_TIMEOUT = 1000;
const DEFAULT_UPDATE_FREQUENCY = 1;

type Props = {
	value: number,
	direction?: Direction,
	updateFrequency?: number,
	isWorking?: boolean,
	maxTime?: number,
};

const CountDown: FC<Props> = ({
	value,
	maxTime = TIME_IN_SECONDS.DAY,
	direction = Direction.UP,
	updateFrequency = DEFAULT_UPDATE_FREQUENCY,
	isWorking,
}) => {
	const [renderedValue, setRenderedValue] = useState(0);

	const updateRenderedValue = useStableCallback(() => {
		setRenderedValue(value % maxTime);
	});

	const timer = useRef<number>();

	useLayoutEffect(() => {
		if (isWorking) {
			timer.current = setInterval(updateRenderedValue, updateFrequency * DEFAULT_TIMEOUT);
		}

		return () => {
			clearInterval(timer.current);
		};
	}, [isWorking, updateFrequency, updateRenderedValue]);

	const parsedTime = useMemo(() => {
		return parseSeconds(renderedValue);
	}, [renderedValue]);

	const counterBlocks = useMemo(() => {
		return [
			TimeMetric.YEAR,
			TimeMetric.MONTH,
			TimeMetric.DAY,
			TimeMetric.HOUR,
			TimeMetric.MINUTE,
			TimeMetric.SECOND,
		].reduce((acc: Array<{ key: TimeMetric, node: ReactNode }>, timeMetric) => {
			if (maxTime > TIME_IN_SECONDS[timeMetric]) {
				acc.push(
					{
						key: timeMetric,
						node: (
							<CounterBlock {...{
								key: timeMetric,
								direction,
								timeSpeed: updateFrequency,
								currentValue: parsedTime[timeMetric] ?? 0,
							}}/>
						),
					},
				);
			}

			return acc;
		}, []);
	}, [parsedTime, maxTime, updateFrequency, direction]);

	const classNames = clsx(styles.countDown);

	return (
		<div className={classNames}>
			{counterBlocks.map(({key, node}, index, array) => (
				<Fragment key={key}>
					{node}
					{index !== array.length - 1 && ':'}
				</Fragment>
			))}
		</div>
	);
};

export default CountDown;
