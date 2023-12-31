import {useState} from 'react';

import {useStableCallback} from '@shared/libs';


const INITIAL_TEAM_COUNT = 2;

type ReturnParams = {
	teamCount: number,
	teams: Array<Array<string>>,
	updateTeamCount: (value: number) => void,
	randomizeTeams: (players: Array<string>) => void,
};

export const useRandom = (): ReturnParams => {
	const [teamCount, setTeamCount] = useState(INITIAL_TEAM_COUNT);

	const [teams, setTeams] = useState<Array<Array<string>>>([]);

	const updateTeamCount = useStableCallback((value: number): void => {
		if (typeof value === 'number' && !Number.isNaN(value) && value >= 0) {
			setTeamCount(value);
		}
	});

	const randomizeTeams = useStableCallback((players: Array<string>): void => {
		if (players.length >= teamCount) {
			const randomizedTeams: Array<Array<string>> = Array.from({length: teamCount}, () => []);

			const temp = [...players];

			for (let index = 0; index < players.length; index++) {
				const [victim] = temp.splice(Math.floor(Math.random() * temp.length), 1);

				randomizedTeams[index % teamCount].push(victim);
			}

			setTeams(randomizedTeams);
		}
	});

	return {
		teamCount,
		teams,
		updateTeamCount,
		randomizeTeams,
	};
};
