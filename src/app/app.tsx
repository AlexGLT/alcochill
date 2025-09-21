import {useLayoutEffect, useState} from 'react';
import {RouterProvider} from 'react-router-dom';
import Snowfall from 'react-snowfall';

import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@shared/core/react-query';
import ThemeProvider from '@shared/ui/theme-provider';
import Toaster from '@shared/ui/toast';

import {router} from './router';

import type {FC} from 'react';


export const App: FC = () => {
	const [showSnow, setShowSnow] = useState(false);

	useLayoutEffect(() => {
		// @ts-expect-error WHY: I'm too lazy to create view for it
		window.toggleSnow = () => {
			setShowSnow((snow) => !snow);
		};
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<RouterProvider router={router}/>

				{showSnow ? <Snowfall/> : null}

				<Toaster/>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
