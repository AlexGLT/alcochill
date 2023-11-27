import {RouterProvider} from 'react-router-dom';

import {router} from './router';

import type {FC} from 'react';


export const App: FC = () => (
	<RouterProvider router={router} />
);
