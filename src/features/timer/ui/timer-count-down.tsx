import {useStore} from 'effector-react';

import CountDown, {Direction} from '@shared/ui/count-down';

import {$intervalValue, $isInDangerZone, $isStarted} from '../model';

import type {FC} from 'react';


export const TimerCountDown: FC = () => {
	const currentTime = useStore($intervalValue);
	const isStarted = useStore($isStarted);
	const isInDangerZone = useStore($isInDangerZone);

	return (
		<CountDown
			value={currentTime}
			direction={Direction.UP}
			isWorking={isStarted}
			isInDangerZone={isInDangerZone}
		/>
	);
};
