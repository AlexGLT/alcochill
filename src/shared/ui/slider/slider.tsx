import {Slider as ChakraSlider, HStack} from '@chakra-ui/react';

import type {FC, Ref} from 'react';


export type Props = {
	ref?: Ref<HTMLDivElement>,
	marks?: Array<number | {value: number, label: React.ReactNode}>,
	label?: React.ReactNode,
	showValue?: boolean,
} & ChakraSlider.RootProps;

export const Slider: FC<Props> = ({
	ref,
	label,
	showValue,
	marks,
	...rest
}) => {
	return (
		<ChakraSlider.Root ref={ref} thumbAlignment="center" {...rest}>
			{label && !showValue ? <ChakraSlider.Label>{label}</ChakraSlider.Label> : null}

			{label && showValue ? (
				<HStack justify="space-between">
					<ChakraSlider.Label>{label}</ChakraSlider.Label>

					<ChakraSlider.ValueText/>
				</HStack>
			) : null}

			<ChakraSlider.Control>
				<ChakraSlider.Track>
					<ChakraSlider.Range/>
				</ChakraSlider.Track>

				<ChakraSlider.Thumbs/>

				<ChakraSlider.Marks marks={marks}/>
			</ChakraSlider.Control>
		</ChakraSlider.Root>
	);
};
