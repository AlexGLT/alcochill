import clsx from 'clsx';

import styles from './page.module.scss';

import type {FC, PropsWithChildren} from 'react';


type Props = PropsWithChildren<{
	isSinglePage?: boolean,
	hasCenteredContent?: boolean,
}>;

const PageLayout: FC<Props> = ({
	isSinglePage,
	hasCenteredContent,
	children,
}) => {
	const classNames = clsx(styles.page, {
		[styles.pageSingle]: isSinglePage,
		[styles.pageCentralizer]: hasCenteredContent,
	});

	return (
		<>
			<main className={classNames}>
				{children}
			</main>
		</>
	);
};

export default PageLayout;
