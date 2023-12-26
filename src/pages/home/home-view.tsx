import {TimerCountDown} from '@features/timer';

import {TimerControls, SignalsHistory, SignalSoundSelect} from './ui';

import styles from './home.module.scss';

import type {FC} from 'react';


export const HomeView: FC = () => {
	return (
		<main className={styles.home}>
			<TimerCountDown />

			<TimerControls />

			<div className={styles.homeAdditionalButtons}>
				<SignalsHistory />

				<SignalSoundSelect />
			</div>
		</main>
	);
};
