import {useUnit} from 'effector-react';

import {QueryClientProvider} from '@tanstack/react-query';

import {$queryClient} from './model';

import type {FC, PropsWithChildren} from 'react';


export const ReactQueryProvider: FC<PropsWithChildren> = ({children}) => {
	const queryClient = useUnit($queryClient);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};
