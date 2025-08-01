import {RouterProvider} from 'react-router-dom';
import {ChakraProvider, defaultSystem} from '@chakra-ui/react';
import Snowfall from 'react-snowfall';
import {ThemeProvider} from 'next-themes';
import {useLayoutEffect, useState} from 'react';

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
		<ChakraProvider value={defaultSystem}>
			<ThemeProvider attribute="class" disableTransitionOnChange={true} forcedTheme="dark">
				<RouterProvider router={router}/>

				{showSnow ? <Snowfall/> : null}
			</ThemeProvider>
		</ChakraProvider>
	);
};
