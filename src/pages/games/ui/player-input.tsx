import {useState} from 'react';

import Button from '@shared/ui/button';
import TextField from '@shared/ui/text-field';
import {useStableCallback} from '@shared/libs';

import styles from '../games.module.scss';

import type {FC, ChangeEvent, KeyboardEvent} from 'react';


const EMPTY_VALUE = '';

type Props = {
	addPlayer: (player: string) => void,
};

export const PlayerInput: FC<Props> = ({addPlayer}) => {
	const [value, setValue] = useState(EMPTY_VALUE);

	const isInputEmpty = !value.trim();

	const onButtonClick = useStableCallback((): void => {
		if (value) {
			addPlayer(value);

			setValue(EMPTY_VALUE);
		}
	});

	const onInputChange = useStableCallback((event: ChangeEvent<HTMLInputElement>): void => {
		setValue(event.target.value);
	});

	const onEnterPress = useStableCallback((event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === 'Enter') {
			onButtonClick();
		}
	});

	return (
		<div className={styles.gamesPlayerAddController}>
			<TextField
				value={value}
				onChange={onInputChange}
				onKeyUp={onEnterPress}
			/>

			<Button
				isDisabled={isInputEmpty}
				onClick={onButtonClick}
			>
				Add
			</Button>
		</div>
	);
};
