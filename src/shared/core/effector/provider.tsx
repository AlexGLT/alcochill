import {Provider} from 'effector-react';

import {scope} from './model';

import type {FC, PropsWithChildren} from 'react';


export const EffectorProvider: FC<PropsWithChildren> = ({children}) => {
	return (
		<Provider value={scope}>
			{children}
		</Provider>
	);
};
