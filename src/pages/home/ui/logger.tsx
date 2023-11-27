import Button from '@shared/ui/button';
import EmptyState from '@shared/ui/empty-state';

import styles from '../home.module.scss';

import type {FC} from 'react';


const NOT_STARTED_MESSAGE = 'Click on start!';
const WAITED_MESSAGE = 'Waiting...';

type Props = {
	isStarted: boolean,
	previousSignals: Array<string>,
	onClearButtonClick: () => void,
};

export const Logger: FC<Props> = ({
	isStarted,
	previousSignals,
	onClearButtonClick,
}) => {
	const emptyStateMessage = isStarted ? WAITED_MESSAGE : NOT_STARTED_MESSAGE;

	return (
		<div className={styles.homeLoggerContainer}>
			{previousSignals.length ? (
				<>
					<div className={styles.homeLogger}>
						Previous signals:
						{previousSignals.toReversed().map((timestamp) => (
							<span key={timestamp}>{timestamp}</span>
						))}
					</div>
					<Button
						customClassNames={styles.homeLoggerButton}
						onClick={onClearButtonClick}
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
