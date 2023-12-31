import {useState} from 'react';

import Button, {Accent} from '@shared/ui/button';
import TextField, {TYPE} from '@shared/ui/text-field';
import {useStableCallback} from '@shared/libs';

import styles from '../games.module.scss';

import type {ChangeEvent, FC} from 'react';


type Props = {
	players: Array<string>,
	teamCount: number,
	updateTeamCount: (value: number) => void,
	randomizeTeams: (players: Array<string>) => void,
};

export const Controls: FC<Props> = ({
	players,
	teamCount,
	updateTeamCount,
	randomizeTeams,
}) => {
	const onInputChange = useStableCallback((event: ChangeEvent<HTMLInputElement>): void => {
		updateTeamCount(Number(event.target.value));
	});

	const onButtonClick = useStableCallback((): void => {
		randomizeTeams(players);
	});

	return (
		<div className={styles.gamesControls}>
			<TextField
				type={TYPE.NUMBER}
				value={teamCount}
				onChange={onInputChange} />

			<Button
				accent={Accent.SUCCESS}
				isDisabled={teamCount > players.length}
				onClick={onButtonClick}
			>
				Randomize!
			</Button>
		</div>
	);
};
