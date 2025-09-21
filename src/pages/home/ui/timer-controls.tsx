import Button, {Accent} from '@shared/ui/button';
import TextField, {TYPE} from '@shared/ui/text-field';

import {useTimeRange, useTimerControlState} from '../lib/hooks';

import styles from '../home.module.scss';

import type {FC} from 'react';


const DEFAULT_HELPER_MESSAGE = 'Please enter a time in minutes';

export const TimerControls: FC = () => {
	const {
		enteredMinTime,
		minTimeErrorMessage,
		updateMinTime,
		enteredMaxTime,
		maxTimeErrorMessage,
		updateMaxTime,
	} = useTimeRange();

	const {
		wasStarted,
		toggleTimer,
	} = useTimerControlState();

	const isStartButtonDisabled = !!(
		minTimeErrorMessage ||
		maxTimeErrorMessage
	);

	const startButtonCaption = wasStarted
		? 'Stop'
		: 'Start';

	return (
		<div className={styles.homeControllers}>
			<TextField
				type={TYPE.NUMBER}
				label="Min Time"
				helperMessage={minTimeErrorMessage ?? DEFAULT_HELPER_MESSAGE}
				isInvalid={!!minTimeErrorMessage}
				value={enteredMinTime}
				onChange={updateMinTime}
			/>

			<Button
				accent={wasStarted ? Accent.DANGER : Accent.SUCCESS}
				isDisabled={isStartButtonDisabled}
				onClick={toggleTimer}
			>
				{startButtonCaption}
			</Button>

			<TextField
				type={TYPE.NUMBER}
				label="Max Time"
				helperMessage={maxTimeErrorMessage ?? DEFAULT_HELPER_MESSAGE}
				isInvalid={!!maxTimeErrorMessage}
				value={enteredMaxTime}
				onChange={updateMaxTime}
			/>
		</div>
	);
};
