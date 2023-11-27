import {useStore} from 'effector-react';

import Popover from '@shared/ui/popover/popover';

import {$isStarted} from '../model';

import {TimerCountDown} from './timer-count-down';

import styles from './timer-popover.module.scss';

import type {FC} from 'react';


type Props = {
	canBeDisplayed: boolean,
};

export const TimerPopover: FC<Props> = ({canBeDisplayed}) => {
	const isStarted = useStore($isStarted);

	return (
		<Popover
			isOpen={canBeDisplayed && isStarted}
			customClassNames={styles.timerPopover}
		>
			<TimerCountDown />
		</Popover>
	);
};
