import Button, {Accent} from '@shared/ui/button';

import styles from '../games.module.scss';

import deleteIcon from './icon-delete.svg';

import type {FC} from 'react';


type Props = {
	players: Array<string>,
	removePlayer: (player: string) => void,
};

export const PlayersList: FC<Props> = ({players, removePlayer}) => {
	return players.length ? (
		<ul className={styles.gamesPlayersList}>
			{players.map((player) => {
				const onRemoveButtonClick = (): void => {
					removePlayer(player);
				};

				return (
					<li key={player} className={styles.gamesPlayer}>
						<span className={styles.gamesPlayerCaption}>
							{player}
						</span>

						<Button
							accent={Accent.DANGER}
							customClassNames={styles.gamesPlayerRemoveButton}
							onClick={onRemoveButtonClick}
						>
							<img src={deleteIcon} />
						</Button>
					</li>
				);
			})}
		</ul>
	) : (
		<div>
			Add some players!
		</div>
	);
};
