import {useId, useLayoutEffect, useState} from 'react';
import clsx from 'clsx';

import {isDefined} from '@shared/libs';

import {TYPE} from './constants';

import styles from './text-field.module.scss';

import type {FC, ChangeEvent, ReactNode} from 'react';
import type {InputProps, Type} from './typedef';


const DEFAULT_VALUE = '';

type Props = InputProps & {
	type?: Type,
	initialValue?: string | number,
	value?: string | number,
	label?: ReactNode,
	isInvalid?: boolean,
	helperMessage?: string,
};

const TextField: FC<Props> = ({
	type = TYPE.TEXT,
	label,
	placeholder = DEFAULT_VALUE,
	value: externalValue,
	initialValue = '',
	isInvalid,
	helperMessage,
	onChange,
	...restProps
}) => {
	const labelId = useId();
	const inputId = useId();

	const [value, setValue] = useState(initialValue);

	useLayoutEffect(() => {
		if (isDefined(externalValue)) {
			setValue(externalValue.toString());
		}
	}, [externalValue]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		onChange?.(event);

		setValue(event.target.value);
	};

	return (
		<div className={styles.textField}>
			{label ? (
				<label
					id={labelId}
					htmlFor={inputId}
					className={styles.textFieldLabel}
				>
					{label}
				</label>
			) : null}

			<div
				className={clsx(styles.textFieldInputContainer, {
					[styles.textFieldInputContainerInvalid]: isInvalid,
				})}
			>
				<input
					{...restProps}
					className={styles.textFieldInput}
					aria-invalid={isInvalid}
					aria-labelledby={labelId}
					id={inputId}
					type={type}
					value={value}
					placeholder={placeholder}
					onChange={handleChange}
				/>
			</div>

			{helperMessage ? (
				<small
					className={clsx(styles.textFieldMessage, {
						[styles.textFieldMessageInvalid]: isInvalid,
					})}
				>
					{helperMessage}
				</small>
			) : null}
		</div>

	);
};

export default TextField;
