import clsx from 'clsx';

import {Accent} from './constants';

import styles from './button.module.scss';

import type {
	FC,
	PropsWithChildren,
	MouseEvent
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
	onClick: (event: MouseEvent) => void,
}>;

const Button: FC<Props> = ({
	accent = Accent.PRIMARY,
	isSelected,
	isDisabled,
	onClick,
	children,
}) => {
	const className = clsx(styles.button, ACCENT_MIX[accent], {
		[styles.buttonSelected]: isSelected,
	});

	return (
		<button
			className={className}
			disabled={isDisabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
