import Card from '@shared/ui/card';

import styles from '../games.module.scss';

import type {FC} from 'react';


type Props = {
	teams: Array<Array<string>>,
};

export const Teams: FC<Props> = ({teams}) => {
	return (
		<div className={styles.gamesTeamsList}>
			{teams.length ? (
				teams.map((randomTeam, index) => (
					<Card customClasses={`${styles.gamesCard} ${styles.gamesTeam}`}>
						<h2>
							Team
							{' '}

							{index + 1}
						</h2>

						<ul className={styles.gamesPlayersList}>
							{randomTeam.map((player) => (
								<li key={player} className={styles.gamesPlayer}>
									{player}
								</li>
							))}
						</ul>
					</Card>
				))
			) : (
				<Card customClasses={styles.gamesCard}>
					Push randomize button!
				</Card>
			)}
		</div>
	);
};
