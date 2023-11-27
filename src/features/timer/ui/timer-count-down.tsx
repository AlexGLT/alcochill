import {useStore} from 'effector-react';

import CountDown, {Direction} from '@shared/ui/count-down';

import {$intervalValue, $isStarted} from '../model';

import type {FC} from 'react';


type Props = {};

export const TimerCountDown: FC<Props> = () => {
	const currentTime = useStore($intervalValue);
	const isStarted = useStore($isStarted);

	return (
		<CountDown
			value={currentTime}
			direction={Direction.UP}
			isWorking={isStarted}
		/>
	);
};
