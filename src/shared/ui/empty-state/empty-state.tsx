import styles from './empty-state.module.scss';

import type {FC} from 'react';


const DEFAULT_MESSAGE = 'No data available!';

type Props = {
	message?: string,
};

const EmptyState: FC<Props> = ({
	message = DEFAULT_MESSAGE,
}) => {
	return (
		<div className={styles.emptyState}>
			{message}
		</div>
	);
};

export default EmptyState;
