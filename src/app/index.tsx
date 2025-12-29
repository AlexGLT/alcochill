// import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import {EffectorProvider} from '@shared/core/effector';

import {App} from './app';

import './index.scss';


const rootElement = document.getElementById('root');

if (rootElement) {
	createRoot(rootElement).render(
		// <StrictMode>
		<EffectorProvider>
			<App/>
		</EffectorProvider>,
		// </StrictMode>,
	);
}
