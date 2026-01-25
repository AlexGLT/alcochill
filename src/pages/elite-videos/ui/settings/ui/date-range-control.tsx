import {useController, useFormContext} from 'react-hook-form';

import {
	addMilliseconds,
	differenceInMilliseconds,
	format,
} from 'date-fns';

import {Flex, Input} from '@chakra-ui/react';
import {Slider} from '@shared/ui/slider';

import {MAX_DATE, MIN_DATE} from '../constants';

import type {FC} from 'react';
import type {FormData} from '../schema';


const mapDateToRange = (date: Date): number => {
	const totalDuration = differenceInMilliseconds(MAX_DATE, MIN_DATE);
	const elapsed = differenceInMilliseconds(MAX_DATE, date);

	const reflection = (1 - elapsed / totalDuration) * 100;

	return Math.min(Math.max(reflection, 0), 100);
};

const mapRangeToDate = (value: number): Date => {
	const totalDuration = differenceInMilliseconds(MAX_DATE, MIN_DATE);
	const elapsed = (value / 100) * totalDuration;

	return addMilliseconds(MIN_DATE, elapsed);
};

export const DateRangeControl: FC = () => {
	const {control} = useFormContext<FormData>();

	const {
		field: {
			value: activeDateStart,
			onChange: changeDateStart,
		},
	} = useController({
		control,
		name: 'dateStart',
	});

	const {
		field: {
			value: activeDateEnd,
			onChange: changeDateEnd,
		},
	} = useController({
		control,
		name: 'dateEnd',
	});

	const handleRangeChange = (dates: Array<number>): void => {
		const [dateStart, dateEnd] = dates;

		if (dateStart && dateEnd) {
			changeDateStart(mapRangeToDate(dateStart));
			changeDateEnd(mapRangeToDate(dateEnd));
		}
	};

	const rangeValue = [
		mapDateToRange(activeDateStart),
		mapDateToRange(activeDateEnd),
	];

	return (
		<Flex direction="column" gap="4">
			<Slider
				label="Date filtering"
				value={rangeValue}
				thumbAlignment="contain"
				onValueChange={(e) => handleRangeChange(e.value as [number, number])}
			/>

			<Flex gap="3">
				<Input
					type="date"
					value={format(activeDateStart, 'yyyy-MM-dd')}
					min={format(MIN_DATE, 'yyyy-MM-dd')}
					max={format(MAX_DATE, 'yyyy-MM-dd')}
					onChange={(event) => {
						const date = event.target.valueAsDate;

						if (date) {
							changeDateStart(date);
						}
					}}
				/>

				<Input
					type="date"
					value={format(activeDateEnd, 'yyyy-MM-dd')}
					min={format(MIN_DATE, 'yyyy-MM-dd')}
					max={format(MAX_DATE, 'yyyy-MM-dd')}
					onChange={(event) => {
						const date = event.target.valueAsDate;

						if (date) {
							changeDateEnd(date);
						}
					}}
				/>

			</Flex>
		</Flex>
	);
};
