import {useId, useLayoutEffect, useState} from 'react';
import clsx from 'clsx';

import {TYPE} from './constants';
import styles from './text-field.module.scss';

import type {FC, ChangeEvent, ReactNode} from 'react';
import type {InputProps, Type} from './typedef';


const DEFAULT_VALUE = '';
const DEFAULT_INVALID_MESSAGE = 'Incorrect, try again!';

type Props = InputProps & {
	initialValue?: string | number,
	value?: string | number,
	type?: Type,
	label?: ReactNode,
	isInvalid?: boolean,
	invalidMessage?: string,
};

const TextField: FC<Props> = ({
	type = TYPE.TEXT,
	placeholder = DEFAULT_VALUE,
	invalidMessage = DEFAULT_INVALID_MESSAGE,
	value: externalValue,
	initialValue = '',
	label,
	isInvalid,
	onChange,
	...restProps
}) => {
	const inputId = useId();

	const [value, setValue] = useState(initialValue);

	useLayoutEffect(() => {
		if (typeof externalValue === 'string' || typeof externalValue === 'number') {
			setValue(externalValue.toString());
		}
	}, [externalValue]);

	const fieldContainerClassNames = clsx(styles.textFieldInputContainer, {
		[styles.textFieldInputContainerInvalid]: isInvalid,
	});

	const messageClassNames = clsx(styles.textFieldMessage, {
		[styles.textFieldMessageInvalid]: isInvalid,
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		onChange?.(event);

		setValue(event.target.value);
	};

	return (
		<div className={styles.textField}>
			{label && (
				<label htmlFor={inputId} className={styles.textFieldLabel}>
					{label}
				</label>
			)}

			<div className={fieldContainerClassNames}>
				<input
					{...restProps}
					className={styles.textFieldInput}
					id={inputId}
					value={value}
					type={type}
					placeholder={placeholder}
					onChange={handleChange}
				/>
			</div>

			{isInvalid && (
				<small className={messageClassNames}>
					{invalidMessage}
				</small>
			)}
		</div>

	);
};

export default TextField;
