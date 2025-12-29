import {ThemeProvider as ColorModeProvider} from 'next-themes';

import {ChakraProvider, defaultSystem} from '@chakra-ui/react';

import type {FC} from 'react';
import type {ThemeProviderProps} from 'next-themes';


export const ThemeProvider: FC<ThemeProviderProps> = ({children, ...restProps}) => {
	return (
		<ChakraProvider value={defaultSystem}>
			<ColorModeProvider attribute="class" disableTransitionOnChange={true} {...restProps}>
				{children}
			</ColorModeProvider>
		</ChakraProvider>
	);
};
