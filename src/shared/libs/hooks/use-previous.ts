import {useLayoutEffect, useRef} from 'react';


export const usePrevious = <T>(value: T): T | undefined => {
	const previousValue = useRef<T>();

	useLayoutEffect(() => {
		previousValue.current = value;
	}, [value]);

	return previousValue.current;
};
