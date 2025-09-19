import CountDown, {Direction} from '@shared/ui/count-down';

import {useTimerState} from '../model';

import type {FC} from 'react';


export const TimerCountDown: FC = () => {
	const {
		counter,
		wasStarted,
		isInDangerZone,
	} = useTimerState();

	return (
		<CountDown
			value={counter}
			direction={Direction.UP}
			isWorking={wasStarted}
			isInDangerZone={isInDangerZone}
		/>
	);
};
