import clsx from 'clsx';

import {TimerPopover} from '@features/timer';

import {Header} from '../header';

import styles from './page-layout.module.scss';

import type {FC, PropsWithChildren} from 'react';
import type {PageParams} from '@shared/types/pages';


type Props = PropsWithChildren<PageParams & {
	currentPath: string,
}>;

export const PageLayout: FC<Props> = ({
	isSinglePage,
	hasCenteredContent,
	hasAlcoTimer,
	currentPath,
	children,
}) => {
	const canTimerPopoverBeDisplayed = currentPath !== '/';

	const classNames = clsx(styles.pageLayout, {
		[styles.pageLayoutSingle]: isSinglePage,
	});

	return (
		<div className={classNames}>
			<Header />
			{hasAlcoTimer && <TimerPopover canBeDisplayed={canTimerPopoverBeDisplayed} />}
			{children}
		</div>
	);
};
