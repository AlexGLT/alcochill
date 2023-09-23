import {useEffect, useRef, useState} from 'react';

import {CounterBlock} from './ui';
import {parseSeconds} from './utils';
import {Direction} from './constants';
import styles from './count-down.module.scss';

import type {FC} from 'react';


const DEFAULT_STARTING_POINT = 0;
const DEFAULT_TIME_SPEED = 1;
const DEFAULT_STEP = 1;
const DEFAULT_TIMEOUT = 1000;

type Props = {
	startingPoint?: number,
	direction?: Direction,
	timeSpeed?: number,
	step?: number,
	shouldStop?: boolean,
};

const CountDown: FC<Props> = ({
	startingPoint = DEFAULT_STARTING_POINT,
	direction = Direction.UP,
	step = DEFAULT_STEP,
	shouldStop = false,
	timeSpeed = DEFAULT_TIME_SPEED,
}) => {
	const [currentTime, setCurrentTime] = useState(startingPoint);

	const timer = useRef<number>();

	useEffect(() => {
		if (!shouldStop) {
			timer.current = setInterval(() => {
				setCurrentTime((previousState) => previousState + step);
			}, timeSpeed * DEFAULT_TIMEOUT);
		}

		return () => {
			clearInterval(timer.current);
		};
	}, [shouldStop]);

	const {
		SECOND = 0,
		MINUTE = 0,
		HOUR = 0,
	} = parseSeconds(currentTime);

	return (
		<div className={styles.countDown}>
			<CounterBlock {...{direction, timeSpeed, currentValue: HOUR}} />
			:
			<CounterBlock {...{direction, timeSpeed, currentValue: MINUTE}} />
			:
			<CounterBlock {...{direction, timeSpeed, currentValue: SECOND}} />
		</div>
	);
};

export default CountDown;
