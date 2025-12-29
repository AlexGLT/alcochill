import {createStore} from 'effector';

import {QueryClient} from '@tanstack/react-query';


export const $queryClient = createStore<QueryClient>(
	new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity,
			},
		},
	}),
	{serialize: 'ignore'},
);

