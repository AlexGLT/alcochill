import {EliteVideosView} from './elite-videos-view';

import type {PageConfig} from '@shared/types/pages';


const PAGE_ID = 'elite-videos';
const PAGE_NAME = 'Elite Videos';
const PAGE_PATH = '/elite-videos';

const pageConfig: PageConfig = {
	id: PAGE_ID,
	name: PAGE_NAME,
	path: PAGE_PATH,
	element: <EliteVideosView/>,
	params: {
		isSinglePage: true,
		hasCenteredContent: true,
		hasAlcoTimer: true,
	},
};

export default pageConfig;
