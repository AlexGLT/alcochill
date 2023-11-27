import {Gallery, Controllers} from './ui';

import styles from './elite-memes.module.scss';

import type {FC} from 'react';


export const EliteMemesView: FC = () => {
	return (
		<main className={styles.eliteMemes}>
			<Gallery />

			<Controllers />
		</main>
	);
};
