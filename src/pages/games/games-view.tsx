import Card from '@shared/ui/card';

import styles from './games.module.scss';

import {usePlayers, useRandom} from './hooks';
import {PlayerInput} from './ui/player-input';
import {PlayersList} from './ui/players-list';
import {Controls} from './ui/controls';
import {Teams} from './ui/teams';

import type {FC} from 'react';


type Props = {

};

export const GamesView: FC<Props> = ({}) => {
	const {
		players,
		addPlayer,
		removePlayer,
	} = usePlayers();

	const {
		teamCount,
		teams,
		updateTeamCount,
		randomizeTeams,
	} = useRandom();


	return (
		<main className={styles.games}>
			<div className={styles.gamesMainContent}>
				<div className={styles.gamesPlayerAdditionContainer}>
					<PlayerInput {...{addPlayer}} />

					<Card customClasses={styles.gamesCard}>
						<PlayersList {...{players, removePlayer}} />
					</Card>
				</div>

				<Controls
					{...{
						players,
						teamCount,
						updateTeamCount,
						randomizeTeams,
					}}
				/>

				<Teams
					{...{
						teams,
					}}
				/>
			</div>
		</main>
	);
};
