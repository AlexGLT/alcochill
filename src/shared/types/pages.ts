import type {ReactNode} from 'react';


export type PageParams = {
	isSinglePage?: boolean,
	hasCenteredContent?: boolean,
	hasAlcoTimer?: boolean,
};

export type PageConfig = {
	id: string,
	name: string,
	path: string,
	element: ReactNode,
	params?: PageParams,
};
