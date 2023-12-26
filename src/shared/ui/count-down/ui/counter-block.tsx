import styles from '../count-down.module.scss';

import {CounterBox} from './counter-box';


import type {FC} from 'react';
import type {Direction} from '../constants';


const BOX_VALUE_LIMIT = 10;

type Props = {
	currentValue: number | undefined,
	direction: Direction,
	timeSpeed: number,
};

export const CounterBlock: FC<Props> = ({
	currentValue = 0,
	direction,
	timeSpeed,
}) => {
	const rightPart = currentValue % BOX_VALUE_LIMIT;
	const leftPart = Math.floor(currentValue / BOX_VALUE_LIMIT) % BOX_VALUE_LIMIT;

	return (
		<div className={styles.countDown}>
			<CounterBox {...{direction, timeSpeed, currentValue: leftPart}} />
			<CounterBox {...{direction, timeSpeed, currentValue: rightPart}} />
		</div>
	);
};
