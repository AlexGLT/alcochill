import styles from './no-data.module.scss';

import type {FC} from 'react';


const NoData: FC = () => {
	return (
		<div className={styles.noData}>
			No data available!
		</div>
	);
};

export default NoData;
