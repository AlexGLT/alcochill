import Popover from '@shared/ui/popover/popover';

import {useTimerState} from '../model';

import {TimerCountDown} from './timer-count-down';

import styles from './timer-popover.module.scss';

import type {FC} from 'react';


type Props = {
	canBeDisplayed?: boolean,
};

export const TimerPopover: FC<Props> = ({canBeDisplayed = true}) => {
	const {wasStarted} = useTimerState();

	return (
		<Popover
			isOpen={canBeDisplayed ? wasStarted : false}
			customClassNames={styles.timerPopover}
		>
			<TimerCountDown/>
		</Popover>
	);
};
