import {useCallback, useEffect, useLayoutEffect, useState} from 'react';

import {isString} from '@shared/libs';


const PREVIOUS_PLAYERS_KEY = 'ALCO_TIMER/PREVIOUS_PLAYERS';

type ReturnParams = {
	players: Array<string>,
	addPlayer: (player: string) => void,
	removePlayer: (player: string) => void,
};

export const usePlayers = (): ReturnParams => {
	const [players, setPlayers] = useState<Array<string>>([]);

	useLayoutEffect(() => {
		const storedPlayers = localStorage.getItem(PREVIOUS_PLAYERS_KEY);

		if (storedPlayers) {
			const parsedStoredPlayers = JSON.parse(storedPlayers);

			if (Array.isArray(parsedStoredPlayers) && parsedStoredPlayers.every(isString)) {
				setPlayers(parsedStoredPlayers);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(PREVIOUS_PLAYERS_KEY, JSON.stringify(players));
	}, [players]);

	const addPlayer = useCallback((player: string): void => {
		setPlayers((previousPlayers) => previousPlayers.concat(player));
	}, []);

	const removePlayer = useCallback((player: string): void => {
		setPlayers((previousPlayers) => previousPlayers.filter((currentPlayer) => currentPlayer !== player));
	}, []);

	return {
		players,
		addPlayer,
		removePlayer,
	};
};
