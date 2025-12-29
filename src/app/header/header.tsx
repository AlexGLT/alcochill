import {NavLink} from 'react-router-dom';
import clsx from 'clsx';

import {Flex, Box} from '@chakra-ui/react';
import {AuthDialog} from '@features/auth';
import homePage from '@pages/home';
import gamesPage from '@pages/games';
import eliteMemesPage from '@pages/elite-memes';
import eliteVideosPage from '@pages/elite-videos';

import styles from './header.module.scss';

import type {FC} from 'react';


export const Header: FC = () => {
	const getNavLinkStyles = ({isActive}: {isActive: boolean}): string => (
		clsx(styles.headerLink, {
			[styles.headerLinkActive]: isActive,
		})
	);

	return (
		<Flex asChild={true}>
			<header className={styles.header}>
				<Box as="nav">
					<NavLink
						to={homePage.path}
						className={getNavLinkStyles}
					>
						{homePage.name}
					</NavLink>
				</Box>

				<Box as="nav">
					<NavLink
						to={gamesPage.path}
						className={getNavLinkStyles}
					>
						{gamesPage.name}
					</NavLink>
				</Box>

				<Box as="nav">
					<NavLink
						to={eliteVideosPage.path}
						className={getNavLinkStyles}
					>
						{eliteVideosPage.name}
					</NavLink>
				</Box>

				<Box as="nav">
					<NavLink
						to={eliteMemesPage.path}
						className={getNavLinkStyles}
					>
						{eliteMemesPage.name}
					</NavLink>
				</Box>

				<Box marginLeft="auto">
					<AuthDialog/>
				</Box>
			</header>
		</Flex>
	);
};
