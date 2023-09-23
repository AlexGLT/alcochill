import CountDown, {Direction} from '@shared/ui/count-down';
import Button from '@shared/ui/button';
import TextField from '@shared/ui/text-field';

import {Accent} from '@shared/ui/button/constants';

import {useTimeRange, useRandomSignal} from './hooks';

import styles from './alco-timer.module.scss';

import type {FC} from 'react';


export const AlcoTimer: FC = () => {
	const {
		minTimeInMinutes,
		maxTimeInMinutes,
		updateMinTime,
		updateMaxTime
	} = useTimeRange();

	const {
		previousSignals,
		isStopped,
		playSound,
		toggleIsStopped
	} = useRandomSignal({
		minTimeInMinutes,
		maxTimeInMinutes,
	});

	const startButtonCaption = isStopped ? 'Start' : 'Stop';

	return (
		<div className={styles.alcoTimer}>
			<Button
				onClick={playSound}
			>
				Test volume
			</Button>

			<CountDown
				key={`${previousSignals.length} ${startButtonCaption}`}
				direction={Direction.UP}
				startingPoint={0}
				shouldStop={isStopped}
			/>

			<div className={styles.alcoTimerControllers}>
				<TextField
					value={minTimeInMinutes}
					onChange={updateMinTime}
				/>

				<Button
					accent={Accent.SUCCESS}
					isDisabled={maxTimeInMinutes <= minTimeInMinutes}
					onClick={toggleIsStopped}
				>
					{startButtonCaption}
				</Button>

				<TextField
					value={maxTimeInMinutes}
					onChange={updateMaxTime}
				/>
			</div>

			{!!previousSignals.length && (
				<div className={styles.alcoTimerLogger}>
					Previous signals:
					{previousSignals.map((timestamp) => (
						<span key={timestamp}>{timestamp}</span>
					))}
				</div>
			)}
		</div>
	);
};
