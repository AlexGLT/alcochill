import {useRef, useLayoutEffect, useCallback} from 'react';


type Handler<T, U> = (...args: Array<T>) => U;

export const useStableCallback = <T, U>(handler: Handler<T, U>): Handler<T, U> => {
	const handlerRef = useRef(handler);

	useLayoutEffect(() => {
		handlerRef.current = handler;
	});

	return useCallback((...args: Array<T>): U => {
		return handlerRef.current(...args);
	}, []);
};
