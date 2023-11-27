import {useEffect, useState} from 'react';
import clsx from 'clsx';

import styles from './spinner.module.scss';

import type {FC, PropsWithChildren, ReactNode} from 'react';


type Props = PropsWithChildren<{
	isLoading: boolean,
	customClassNames?: string,
}>;

export const SpinnerContainer: FC<Props> = ({
	isLoading,
	customClassNames,
	children,
}) => {
	const [currentChildren, setCurrentChildren] = useState<ReactNode>(children);

	useEffect(() => {
		if (!isLoading) {
			setCurrentChildren(children);
		}
	}, [isLoading, children]);

	const className = clsx(styles.spinnerContainer, customClassNames, {
		[styles.spinnerContainerLoading]: isLoading,
	});

	return (
		<div className={className}>{currentChildren}</div>
	);
};
