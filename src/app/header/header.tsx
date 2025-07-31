import {NavLink} from 'react-router-dom';

import clsx from 'clsx';

import homePage from '@pages/home';
import gamesPage from '@pages/games';
import eliteMemesPage from '@pages/elite-memes';
import eliteVideosPage from '@pages/elite-videos';

import styles from './header.module.scss';

import type {FC} from 'react';


type Props = {

};

export const Header: FC<Props> = ({}) => {
	const getNavLinkStyles = ({isActive}: {isActive: boolean}): string => (
		clsx(styles.headerLink, {
			[styles.headerLinkActive]: isActive,
		})
	);

	return (
		<header className={styles.header}>
			<nav>
				<NavLink
					to={homePage.path}
					className={getNavLinkStyles}
				>
					{homePage.name}
				</NavLink>
			</nav>

			<nav>
				<NavLink
					to={gamesPage.path}
					className={getNavLinkStyles}
				>
					{gamesPage.name}
				</NavLink>
			</nav>

			<nav>
				<NavLink
					to={eliteVideosPage.path}
					className={getNavLinkStyles}
				>
					{eliteVideosPage.name}
				</NavLink>
			</nav>

			<nav>
				<NavLink
					to={eliteMemesPage.path}
					className={getNavLinkStyles}
				>
					{eliteMemesPage.name}
				</NavLink>
			</nav>
		</header>
	);
};
