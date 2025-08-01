import {useMemo} from 'react';

import {
	createListCollection,
	Portal,
	Select,
	Text,
	Flex,
	Box,
} from '@chakra-ui/react';

import {FaPause, FaPlay} from 'react-icons/fa6';

import Button from '@shared/ui/button';
import {SOUND, SOUND_LABEL} from '@shared/constants';

import {useSoundSignal} from '../lib/hooks';

import type {FC, MouseEvent} from 'react';


const ALL_SOUNDS = createListCollection({
	items: Object.values(SOUND).map((sound) => {
		return {
			value: sound,
			label: SOUND_LABEL[sound],
		};
	}),
});

export const SignalSoundSelect: FC = () => {
	const {
		nowPlaying,
		chosenSounds,
		playSound,
		stopSound,
		testVolume,
		updateChosenSounds,
		/*
		 * apply,
		 * cancel,
		 */
	} = useSoundSignal();

	const selectedSounds = useMemo(() => {
		return Array.from(chosenSounds);
	}, [chosenSounds]);

	return (
		<Flex
			direction="column"
			justifyContent="space-evenly"
			alignItems="center"
			gap="4"
		>
			<Button onClick={testVolume}>
				Test volume
			</Button>

			<Select.Root
				multiple={true}
				collection={ALL_SOUNDS}
				variant="subtle"
				colorPalette="yellow"
				size="md"
				width="240px"
				value={Array.from(selectedSounds)}
				onValueChange={(event) => updateChosenSounds(event.value)}
			>
				<Select.HiddenSelect/>

				<Select.Control>
					<Select.Trigger>
						<Text>Select sounds</Text>
					</Select.Trigger>

					<Select.IndicatorGroup>
						<Select.Indicator/>
					</Select.IndicatorGroup>
				</Select.Control>

				<Portal>
					<Select.Positioner>
						<Select.Content>
							{ALL_SOUNDS.items.map((sound) => {
								const handleClick = (event: MouseEvent<SVGElement>): void => {
									event.stopPropagation();

									if (nowPlaying === sound.value) {
										stopSound();
									} else {
										playSound(sound.value);
									}
								};

								return (
									<Select.Item
										key={sound.value}
										item={sound}
										padding="2"
										fontSize="xs"
									>
										<Flex alignItems="center" justifyContent="space-between" flexBasis="100%">
											<Flex alignItems="center" gap="2">
												<Box fontSize="xx-small">
													{nowPlaying === sound.value
														? <FaPause onClick={handleClick}/>
														: <FaPlay onClick={handleClick}/>}
												</Box>

												{sound.label}
											</Flex>

											<Select.ItemIndicator/>
										</Flex>
									</Select.Item>
								);
							})}
						</Select.Content>
					</Select.Positioner>
				</Portal>
			</Select.Root>
		</Flex>
	);
};
