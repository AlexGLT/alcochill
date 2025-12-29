import {useState, useLayoutEffect, useRef} from 'react';
import clsx from 'clsx';

import {CSSVariable} from '../constants';

import styles from '../count-down.module.scss';

import type {FC} from 'react';
import type {Direction} from '../constants';


type Props = {
	currentValue: number,
	finalTime?: number,
	direction: Direction,
	timeSpeed: number,
	animationDelay: string,
	isInDangerZone?: boolean,
};

export const CounterBox: FC<Props> = ({
	currentValue,
	direction,
	timeSpeed,
	animationDelay,
	isInDangerZone,
}: Props) => {
	const [mountedValue, setMountedValue] = useState(currentValue);
	const previousValue = useRef(currentValue);

	useLayoutEffect(() => {
		window.requestAnimationFrame(() => {
			setMountedValue(currentValue);
		});
	}, [currentValue]);

	const isCurrentValueMounted = currentValue === mountedValue;

	if (!isCurrentValueMounted) {
		previousValue.current = mountedValue;
	}

	const currentBoxClassName = clsx(styles.countDownTime, !isCurrentValueMounted && styles.countDownTimeUp);
	const previousBoxClassName = clsx(styles.countDownTime, styles.countDownTimeDown);

	const customStyle = {
		[CSSVariable.TIME_SPEED]: timeSpeed,
		'--animation-delay': animationDelay,
	};

	const className = clsx(
		styles.countDownBox,
		// @ts-expect-error temp
		window.dangerZonesEnabled[window.dangerZones.ROTATE] && isInDangerZone && styles.countDownBoxDanger, // eslint-disable-line typescript/no-unsafe-argument, typescript/no-unsafe-member-access
	);

	return (
		<div className={className} style={customStyle}>
			<div key={currentValue} className={currentBoxClassName}>
				{currentValue}
			</div>

			{previousValue.current !== currentValue ? (
				<div key={previousValue.current} className={previousBoxClassName}>
					{previousValue.current}
				</div>
			) : null}
		</div>
	);
};
