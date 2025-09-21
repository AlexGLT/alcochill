import {FaPause, FaPlay} from 'react-icons/fa6';

import {
	createListCollection,
	Portal,
	Select,
	Text,
	Flex,
	IconButton,
} from '@chakra-ui/react';

import Button from '@shared/ui/button';
import {SOUNDS} from '@shared/constants';

import {useSoundSignal} from '../lib/hooks';

import type {FC, MouseEvent} from 'react';


const ALL_SOUNDS = createListCollection({
	items: SOUNDS.map(({src, label}) => {
		return {
			value: src,
			label,
		};
	}),
});

export const SignalSoundSelect: FC = () => {
	const {
		playingNowSound,
		selectedSounds,
		playSound,
		stopSound,
		testVolume,
		updateSelectedSounds,
	} = useSoundSignal();

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
				variant="subtle"
				multiple={true}
				collection={ALL_SOUNDS}
				// size="md"
				width="240px"
				value={selectedSounds.map((sound) => sound.src)}
				onValueChange={(event) => updateSelectedSounds(event.value)}
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
								const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
									event.stopPropagation();

									if (playingNowSound?.src === sound.value) {
										stopSound();
									} else {
										playSound(sound.value);
									}
								};

								return (
									<Select.Item key={sound.value} item={sound}>
										<Flex alignItems="center" justifyContent="space-between" flexBasis="100%">
											<Flex alignItems="center" gap="2">
												<IconButton variant="ghost" size="2xs" onClick={handleClick}>
													{playingNowSound?.src === sound.value
														? <FaPause/>
														: <FaPlay/>}
												</IconButton>

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
