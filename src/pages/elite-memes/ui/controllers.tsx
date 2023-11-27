import {useEvent, useStore} from 'effector-react';

import Button, {Accent} from '@shared/ui/button';

import {
	$index,
	$isLoading,
	moveTo,
	previous,
	next,
	reset,
} from '../model';

import styles from '../elite-memes.module.scss';

import type {FC} from 'react';


type Props = {

	// s s
};

export const Controllers: FC<Props> = () => {
	const index = useStore($index);
	const isLoading = useStore($isLoading);

	const onMove = useEvent(moveTo);
	const onPrevious = useEvent(previous);
	const onNext = useEvent(next);
	const onReset = useEvent(reset);

	return (
		<div className={styles.eliteMemesControllers}>
			{index === null ? (
				<Button accent={Accent.SUCCESS} onClick={() => {
					onMove(0);
				}}>
					Start
				</Button>
			) : (
				<>
					<Button isDisabled={index === 0} onClick={onPrevious}>
						Previous
					</Button>

					<Button accent={Accent.DANGER} onClick={onReset}>
						Reset
					</Button>

					<Button isLoading={isLoading} onClick={onNext}>
						Next
					</Button>
				</>
			)}
		</div>
	);
};
