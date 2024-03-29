import styles from '../count-down.module.scss';

import {CounterBox} from './counter-box';


import type {FC} from 'react';
import type {Direction} from '../constants';


const BOX_VALUE_LIMIT = 10;

type Props = {
	index: number,
	currentValue: number | undefined,
	direction: Direction,
	timeSpeed: number,
	isInDangerZone?: boolean,
};

export const CounterBlock: FC<Props> = ({
	index,
	currentValue = 0,
	direction,
	timeSpeed,
	isInDangerZone,
}) => {
	const rightPart = currentValue % BOX_VALUE_LIMIT;
	const leftPart = Math.floor(currentValue / BOX_VALUE_LIMIT) % BOX_VALUE_LIMIT;

	return (
		<div className={styles.countDown}>
			<CounterBox
				{...{
					direction,
					timeSpeed,
					currentValue: leftPart,
					animationDelay: `${index * 1.8 / 6}s`,
					isInDangerZone,

				}}
			/>

			<CounterBox
				{...{
					direction,
					timeSpeed,
					currentValue: rightPart,
					animationDelay: `${(index + 1) * 1.8 / 6}s`,
					isInDangerZone,
				}}
			/>
		</div>
	);
};
