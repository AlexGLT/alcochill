import Button from '@shared/ui/button';
import EmptyState from '@shared/ui/empty-state';

import {useSignalHistory} from '../lib/hooks';

import styles from '../home.module.scss';

import type {FC} from 'react';


const NOT_STARTED_MESSAGE = 'Click on start!';
const WAITED_MESSAGE = 'Waiting...';

export const SignalsHistory: FC = () => {
	const {
		isStarted,
		signalsHistory,
		clearSignalsHistory,
	} = useSignalHistory();

	const emptyStateMessage = isStarted ? WAITED_MESSAGE : NOT_STARTED_MESSAGE;

	return (
		<div className={styles.homeLoggerContainer}>
			{signalsHistory.length ? (
				<>
					<div className={styles.homeLogger}>
						Previous signals:
						{signalsHistory.toReversed().map((timestamp) => (
							<span key={timestamp}>{timestamp}</span>
						))}
					</div>
					<Button
						customClassNames={styles.homeLoggerButton}
						onClick={clearSignalsHistory}
					>
						Clear signals
					</Button>
				</>
			) : (
				<EmptyState message={emptyStateMessage} />
			)}
		</div>
	);
};
