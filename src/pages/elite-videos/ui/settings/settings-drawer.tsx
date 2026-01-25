import {FiSettings} from 'react-icons/fi';
import {useState} from 'react';

import {
	addDays,
	subYears,
	format,
	parseISO,
	addMilliseconds,
	subDays,
	differenceInMilliseconds,
} from 'date-fns';

import {
	Button,
	IconButton,
	Input,
	Drawer,
	Flex,
	Portal,
	CloseButton,
} from '@chakra-ui/react';

import {Slider} from '@shared/ui/slider';

import styles from './styles.module.scss';

import type {FC} from 'react';


const MIN_DATE = parseISO('2022-01-01');
const MAX_DATE = addDays(new Date(), 1);

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

const DEFAULT_DATE_START = subYears(MAX_DATE, 1);
const DEFAULT_DATE_END = MAX_DATE;

export const SettingsDrawer: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeDrawer = (): void => {
		setIsOpen(false);
	};

	const [dateStart, setDateStart] = useState(DEFAULT_DATE_START);
	const [dateEnd, setDateEnd] = useState(DEFAULT_DATE_END);

	const handleRangeChange = (dates: [number, number]): void => {
		setDateStart(mapRangeToDate(dates[0]));
		setDateEnd(mapRangeToDate(dates[1]));
	};

	return (
		<Drawer.Root open={isOpen} onOpenChange={({open}) => setIsOpen(open)}>
			<Drawer.Trigger asChild={true}>
				<IconButton
					className={styles.settingsTrigger}
					variant="ghost"
					size="xl"
					aria-label="Settings"
				>
					<FiSettings/>
				</IconButton>
			</Drawer.Trigger>

			<Portal>
				<Drawer.Backdrop/>

				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>Settings</Drawer.Title>
						</Drawer.Header>

						<Drawer.CloseTrigger asChild={true}>
							<CloseButton size="sm"/>
						</Drawer.CloseTrigger>

						<Drawer.Body>
							<Flex direction="column" gap="4">
								<Slider
									label="Date filtering"
									value={[
										mapDateToRange(dateStart),
										mapDateToRange(dateEnd),
									]}
									step={0.01}
									minStepsBetweenThumbs={100}
									thumbAlignment="contain"
									onValueChange={(e) => handleRangeChange(e.value as [number, number])}
								/>

								<Flex gap="3">
									<Input
										type="date"
										value={format(dateStart, 'yyyy-MM-dd')}
										min={format(MIN_DATE, 'yyyy-MM-dd')}
										max={format(subDays(dateEnd, 1), 'yyyy-MM-dd')}
										onChange={(event) => {
											const date = event.target.valueAsDate;

											if (date) {
												setDateStart(date);
											}
										}}
									/>

									<Input
										type="date"
										value={format(dateEnd, 'yyyy-MM-dd')}
										min={format(addDays(dateStart, 1), 'yyyy-MM-dd')}
										max={format(MAX_DATE, 'yyyy-MM-dd')}
										onChange={(event) => {
											const date = event.target.valueAsDate;

											if (date) {
												setDateEnd(date);
											}
										}}
									/>

								</Flex>
							</Flex>
						</Drawer.Body>

						<Drawer.Footer justifyContent="left">
							<Button>Save</Button>

							<Button variant="outline" onClick={closeDrawer}>
								Cancel
							</Button>
						</Drawer.Footer>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};
