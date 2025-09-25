import {AuthView} from './auth-view';

import type {PageConfig} from '@shared/types/pages';


const PAGE_ID = 'login';
const PAGE_NAME = 'Sign in';
const PAGE_PATH = '/login';


const pageConfig: PageConfig = {
	id: PAGE_ID,
	name: PAGE_NAME,
	path: PAGE_PATH,
	element: <AuthView/>,
	params: {
		isSinglePage: true,
		hasCenteredContent: true,
		hasAlcoTimer: false,
	},
};

export default pageConfig;
