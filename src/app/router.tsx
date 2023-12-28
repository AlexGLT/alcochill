import {createBrowserRouter} from 'react-router-dom';

import homePage from '@pages/home';
import eliteMemesPage from '@pages/elite-memes';

import {PageLayout} from './page-layout';


export const router = createBrowserRouter([
	{
		path: homePage.path,
		element: (
			<PageLayout
				{...{
					...homePage.params,
					currentPath: homePage.path,
				}}
			>
				{homePage.element}
			</PageLayout>
		),
	},
	{
		path: eliteMemesPage.path,
		element: (
			<PageLayout
				{...{
					...eliteMemesPage.params,
					currentPath: eliteMemesPage.path,
				}}
			>
				{eliteMemesPage.element}
			</PageLayout>
		),
	},
]);
