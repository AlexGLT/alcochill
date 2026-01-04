import {EmptyState as ChakraEmptyState, VStack} from '@chakra-ui/react';

import type {FC, ReactNode, RefObject} from 'react';
import type {EmptyStateRootProps} from '@chakra-ui/react';


export type Props = {
	ref?: RefObject<HTMLDivElement | null>,
	title: string,
	description?: string,
	icon?: ReactNode,
} & EmptyStateRootProps;

const EmptyState: FC<Props> = ({
	ref,
	title,
	description,
	icon,
	children,
	...rest
}) => {
	return (
		<ChakraEmptyState.Root ref={ref} {...rest}>
			<ChakraEmptyState.Content>
				{icon ? <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator> : null}

				{description ? (
					<VStack textAlign="center">
						<ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>

						<ChakraEmptyState.Description>
							{description}
						</ChakraEmptyState.Description>
					</VStack>
				) : (
					<ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
				)}

				{children}
			</ChakraEmptyState.Content>
		</ChakraEmptyState.Root>
	);
};

export default EmptyState;
