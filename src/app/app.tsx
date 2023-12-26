import {RouterProvider} from 'react-router-dom';

import {setGlobalTheme} from '@atlaskit/tokens';

import {useLayoutEffect} from 'react';

import {router} from './router';

import type {FC} from 'react';


export const App: FC = () => {
	useLayoutEffect(() => {
		void setGlobalTheme({
			colorMode: 'dark',
		});
	}, []);

	return <RouterProvider router={router} />;
};
