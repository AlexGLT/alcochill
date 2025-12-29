import {forwardRef} from 'react';
import {IoHeart} from 'react-icons/io5';

import {RatingGroup} from '@chakra-ui/react';

import type {ReactElement, ReactNode} from 'react';


type ChangeHandler = RatingGroup.RootProps['onValueChange'];

export type RatingProps = {
	icon?: ReactElement,
	count?: number,
	label?: ReactNode,
	onChange?: (value: number) => void,
} & Omit<RatingGroup.RootProps, 'onChange'>;

export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating({
	label,
	icon = <IoHeart/>,
	count = 5,
	value: currentValue = 0,
	onChange,
	...rest
}, ref) {
	const handleChange: ChangeHandler = ({value}): void => {
		onChange?.(value);
	};

	return (
		<RatingGroup.Root
			ref={ref}
			count={count}
			size="lg"
			value={currentValue}
			onValueChange={handleChange}
			style={{display: 'flex'}}
			{...rest}
		>
			{label ? <RatingGroup.Label>{label}</RatingGroup.Label> : null}

			<RatingGroup.HiddenInput/>

			<RatingGroup.Control>
				{Array.from({length: count}, (_, index) => {
					return (
						<RatingGroup.Item key={index} index={index + 1}>
							<RatingGroup.ItemIndicator icon={icon}/>
						</RatingGroup.Item>
					);
				})}
			</RatingGroup.Control>
		</RatingGroup.Root>
	);
});
