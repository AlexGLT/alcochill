import {GamesView} from './games-view';

import type {PageConfig} from '@shared/types/pages';


const PAGE_ID = 'games';
const PAGE_NAME = 'Games';
const PAGE_PATH = '/games';


const pageConfig: PageConfig = {
	id: PAGE_ID,
	name: PAGE_NAME,
	path: PAGE_PATH,
	element: <GamesView />,
	params: {
		isSinglePage: true,
		hasCenteredContent: true,
		hasAlcoTimer: true,
	},
};

export default pageConfig;
