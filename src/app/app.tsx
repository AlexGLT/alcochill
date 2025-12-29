import {useLayoutEffect, useState} from 'react';
import {RouterProvider} from 'react-router-dom';
import Snowfall from 'react-snowfall';

import {ReactQueryProvider} from '@shared/core/react-query';
import {ThemeProvider} from '@shared/core/chakra';
import {ExplicitStarter} from '@shared/core/effector';
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
		<ExplicitStarter>
			<ReactQueryProvider>
				<ThemeProvider>
					<RouterProvider router={router}/>

					{showSnow ? <Snowfall/> : null}

					<Toaster/>
				</ThemeProvider>
			</ReactQueryProvider>
		</ExplicitStarter>
	);
};
