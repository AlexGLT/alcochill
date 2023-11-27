import {HomeView} from './home-view';

import type {PageConfig} from '@shared/types/pages';


const PAGE_ID = 'home';
const PAGE_NAME = 'Home';
const PAGE_PATH = '/';


const pageConfig: PageConfig = {
	id: PAGE_ID,
	name: PAGE_NAME,
	path: PAGE_PATH,
	element: <HomeView />,
	params: {
		isSinglePage: true,
		hasCenteredContent: true,
		hasAlcoTimer: false,
	},
};

export default pageConfig;
