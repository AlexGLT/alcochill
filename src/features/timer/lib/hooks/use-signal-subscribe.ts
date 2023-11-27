import {useEffect} from 'react';

import {requestNewSignal} from '../../model';


type Params = {
	onSignalRequest: (previousSignal: number | null) => void,
};

export const useSignalSubscribe = ({onSignalRequest}: Params): void => {
	useEffect(() => {
		const subscription = requestNewSignal.watch(onSignalRequest);

		return () => {
			subscription.unsubscribe();
		};
	}, [onSignalRequest]);
};
