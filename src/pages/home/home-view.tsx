import {TimerCountDown} from '@features/timer';

import Button, {Accent} from '@shared/ui/button';
import TextField, {TYPE} from '@shared/ui/text-field';

import {useTimeRange, useRandomSignal} from './hooks';
import {AudioSelect, Logger} from './ui';

import styles from './home.module.scss';

import type {FC} from 'react';


export const HomeView: FC = () => {
	const {
		minTimeInMinutes,
		maxTimeInMinutes,
		isMinTimeInputInvalid,
		isMaxTimeInputInvalid,
		updateMinTime,
		updateMaxTime,
	} = useTimeRange();

	const {
		isStarted,
		previousSignals,
		playSound,
		toggleStartButton,
		clearSignals,
	} = useRandomSignal({
		minTimeInMinutes,
		maxTimeInMinutes,
	});

	const startButtonCaption = isStarted ? 'Stop' : 'Start';

	const isStartButtonDisabled = (
		isMinTimeInputInvalid ||
		isMaxTimeInputInvalid ||
		minTimeInMinutes >= maxTimeInMinutes
	);

	return (
		<main className={styles.home}>
			<Button
				onClick={playSound}
			>
				Test volume
			</Button>

			<TimerCountDown />

			<div className={styles.homeControllers}>
				<TextField
					type={TYPE.NUMBER}
					label="Min Time"
					isInvalid={isMinTimeInputInvalid}
					value={minTimeInMinutes}
					onChange={updateMinTime}
				/>

				<Button
					accent={isStarted ? Accent.DANGER : Accent.SUCCESS}
					isDisabled={isStartButtonDisabled}
					onClick={toggleStartButton}
				>
					{startButtonCaption}
				</Button>

				<TextField
					type={TYPE.NUMBER}
					label="Max Time"
					isInvalid={isMaxTimeInputInvalid}
					value={maxTimeInMinutes}
					onChange={updateMaxTime}
				/>
			</div>

			<div className={styles.homeAdditionalButtons}>
				<Logger
					isStarted={isStarted}
					previousSignals={previousSignals}
					onClearButtonClick={clearSignals}
				/>

				<AudioSelect/>
			</div>
		</main>
	);
};
