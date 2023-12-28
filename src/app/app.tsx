import {RouterProvider} from 'react-router-dom';
import Snowfall from 'react-snowfall';

import {setGlobalTheme} from '@atlaskit/tokens';

import {useLayoutEffect, useState} from 'react';

import {router} from './router';

import type {FC} from 'react';


export const App: FC = () => {
	const [showSnow, setShowSnow] = useState(true);

	useLayoutEffect(() => {
		// @ts-expect-error WHY: I'm too lazy to create view for it
		window.toggleSnow = () => {
			setShowSnow((snow) => !snow);
		};

		void setGlobalTheme({
			colorMode: 'dark',
		});
	}, []);

	return (
		<>
			<RouterProvider router={router} />

			{showSnow && <Snowfall />}
		</>
	);
};
