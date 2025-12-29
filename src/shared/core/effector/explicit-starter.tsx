import {useUnit} from 'effector-react';
import {useLayoutEffect} from 'react';

import {appStarted} from './model';

import type {FC, PropsWithChildren} from 'react';


export const ExplicitStarter: FC<PropsWithChildren> = ({children}) => {
	const triggerAppStart = useUnit(appStarted);

	useLayoutEffect(() => {
		triggerAppStart();
	}, [triggerAppStart]);

	return (
		<>
			{children}
		</>
	);
};
