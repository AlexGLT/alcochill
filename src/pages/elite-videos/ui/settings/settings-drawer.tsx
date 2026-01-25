import {FiSettings} from 'react-icons/fi';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {subYears} from 'date-fns';

import {zodResolver} from '@hookform/resolvers/zod';

import {
	Button,
	IconButton,
	Drawer,
	Portal,
	CloseButton,
} from '@chakra-ui/react';

import {DateRangeControl} from './ui/date-range-control';
import {schema} from './schema';
import {MAX_DATE} from './constants';

import styles from './styles.module.scss';

import type {FC} from 'react';


const DEFAULT_DATE_START = subYears(MAX_DATE, 1);
const DEFAULT_DATE_END = MAX_DATE;

export const SettingsDrawer: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeDrawer = (): void => {
		setIsOpen(false);
	};

	const formMethods = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			dateStart: DEFAULT_DATE_START,
			dateEnd: DEFAULT_DATE_END,
		},
	});

	const {formState, handleSubmit} = formMethods;

	const isValid = formState.isValid && !Object.keys(formState.errors).length;

	const onSubmit = handleSubmit((data) => {
		console.log('Form Data:', data);
		closeDrawer();
	});

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
				<FormProvider {...formMethods}>
					<form onSubmit={onSubmit}>
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
									<DateRangeControl/>
								</Drawer.Body>

								<Drawer.Footer justifyContent="left">
									<Button type="submit" disabled={!isValid}>Save</Button>

									<Button variant="outline" onClick={closeDrawer}>
										Cancel
									</Button>
								</Drawer.Footer>
							</Drawer.Content>
						</Drawer.Positioner>
					</form>
				</FormProvider>
			</Portal>
		</Drawer.Root>
	);
};
