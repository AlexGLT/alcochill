import {EliteMemesView} from './elite-memes-view';

import type {PageConfig} from '@shared/types/pages';


const PAGE_ID = 'elite-memes';
const PAGE_NAME = 'Elite Memes';
const PAGE_PATH = '/elite-memes';


const pageConfig: PageConfig = {
	id: PAGE_ID,
	name: PAGE_NAME,
	path: PAGE_PATH,
	element: <EliteMemesView />,
	params: {
		isSinglePage: true,
		hasCenteredContent: true,
		hasAlcoTimer: true,
	},
};

export default pageConfig;
