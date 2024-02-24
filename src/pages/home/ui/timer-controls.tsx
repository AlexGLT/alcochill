import Button, {Accent} from '@shared/ui/button';
import TextField, {TYPE} from '@shared/ui/text-field';

import {useTimeRange, useTimerState} from '../lib/hooks';

import styles from '../home.module.scss';

import type {FC} from 'react';


export const TimerControls: FC = () => {
	const {
		minTimeInMinutes,
		isMinTimeInputInvalid,
		maxTimeInMinutes,
		isMaxTimeInputInvalid,
		updateMinTime,
		updateMaxTime,
	} = useTimeRange();

	const {
		canBeStarted,
		isStarted,
		toggleTimer,
	} = useTimerState();

	const startButtonCaption = isStarted ? 'Stop' : 'Start';

	const isStartButtonDisabled = (
		isMinTimeInputInvalid ||
		isMaxTimeInputInvalid ||
		!canBeStarted
	);

	return (
		<div className={styles.homeControllers}>
			<TextField
				type={TYPE.NUMBER}
				label="Min Time (in minutes)"
				isInvalid={isMinTimeInputInvalid}
				initialValue={minTimeInMinutes}
				onChange={updateMinTime}
			/>

			<Button
				accent={isStarted ? Accent.DANGER : Accent.SUCCESS}
				isDisabled={isStartButtonDisabled}
				onClick={toggleTimer}
			>
				{startButtonCaption}
			</Button>

			<TextField
				type={TYPE.NUMBER}
				label="Max Time (in minutes)"
				isInvalid={isMaxTimeInputInvalid}
				initialValue={maxTimeInMinutes}
				onChange={updateMaxTime}
			/>
		</div>
	);
};
