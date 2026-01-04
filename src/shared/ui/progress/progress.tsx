import {Progress as ChakraProgress} from '@chakra-ui/react';

import type {RefObject, ReactNode, FC} from 'react';
import type {ProgressRootProps} from '@chakra-ui/react';


type Props = {
	ref?: RefObject<HTMLDivElement>,
	showValueText?: boolean,
	valueText?: React.ReactNode,
	label?: ReactNode,
	info?: ReactNode,
} & ProgressRootProps;

export const Progress: FC<Props> = ({
	ref,
	showValueText,
	valueText,
	label,
	info,
	...rest
}) => {
	return (
		<ChakraProgress.Root {...rest} ref={ref}>
			{label ? (
				<ChakraProgress.Label>
					{label}
				</ChakraProgress.Label>
			) : null}

			<ChakraProgress.Track>
				<ChakraProgress.Range/>
			</ChakraProgress.Track>

			{showValueText ? (
				<ChakraProgress.ValueText>
					{valueText}
				</ChakraProgress.ValueText>
			) : null}
		</ChakraProgress.Root>
	);
};
