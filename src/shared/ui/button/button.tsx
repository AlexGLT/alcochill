import clsx from 'clsx';

import {Accent} from './constants';

import styles from './button.module.scss';

import type {
	FC,
	PropsWithChildren,
	MouseEvent,
} from 'react';


const ACCENT_MIX: Record<Accent, string> = {
	[Accent.DEFAULT]: styles.buttonDefault,
	[Accent.PRIMARY]: styles.buttonPrimary,
	[Accent.SUCCESS]: styles.buttonSuccess,
	[Accent.DANGER]: styles.buttonDanger,
	[Accent.WARNING]: styles.buttonWarning,
};

type Props = PropsWithChildren<{
	accent?: Accent,
	isSelected?: boolean,
	isDisabled?: boolean,
	isLoading?: boolean,
	customClassNames?: string,
	onClick: (event: MouseEvent<HTMLButtonElement>) => void,
}>;

const Button: FC<Props> = ({
	accent = Accent.PRIMARY,
	isSelected,
	isDisabled,
	isLoading,
	customClassNames,
	onClick,
	children,
}) => {
	const className = clsx(styles.button, customClassNames, ACCENT_MIX[accent], {
		[styles.buttonSelected]: isSelected,
	});

	const handleClick = !isDisabled && !isLoading
		? onClick
		: undefined;

	return (
		<button
			className={className}
			disabled={isDisabled}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;
