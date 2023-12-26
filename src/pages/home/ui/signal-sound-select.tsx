
import DropdownMenu, {DropdownItem, DropdownItemGroup} from '@atlaskit/dropdown-menu';
import {Checkbox} from '@atlaskit/checkbox';
import {Box, Flex} from '@atlaskit/primitives';
import PlayIcon from '@atlaskit/icon/glyph/vid-play';
import PauseIcon from '@atlaskit/icon/glyph/vid-pause';
import Spinner from '@atlaskit/spinner';

import {useState} from 'react';

import Button, {Accent} from '@shared/ui/button';
import {SOUND, SOUND_LABEL} from '@shared/constants';

import {useSoundSignal} from '../lib/hooks';

import styles from '../home.module.scss';

import type {FC, ChangeEvent} from 'react';
import './temp.scss';


const ALL_SOUNDS = Object.values(SOUND);

export const SignalSoundSelect: FC = () => {
	const {
		isStarted,
		nowPlaying,
		chosenSounds,
		playSound,
		stopSound,
		testVolume,
		checkChosenSound,
		apply,
		cancel,
	} = useSoundSignal();

	const [isOpen, setIsOpen] = useState(false);

	const onOpenChange = (args: {isOpen: boolean}): void => {
		if (!args.isOpen) {
			cancel();
		}

		setIsOpen(args.isOpen);
	};

	const onApplyClick = (): void => {
		apply();

		setIsOpen(false);
	};

	const onCancelClick = (): void => {
		cancel();

		setIsOpen(false);
	};

	const onSelectAllClick = ({target: {checked}}: ChangeEvent<HTMLInputElement>): void => {
		ALL_SOUNDS.forEach((sound) => {
			checkChosenSound(sound, checked);
		});
	};

	const onCheckboxChange = ({target: {name, checked}}: ChangeEvent<HTMLInputElement>): void => {
		checkChosenSound(name, checked);
	};

	return (
		<Flex direction="column" justifyContent="space-evenly" alignItems="center" gap="space.200">
			<Button onClick={testVolume}>
				Test volume
			</Button>

			<DropdownMenu trigger="Sounds" isOpen={isOpen} onOpenChange={onOpenChange}>
				<div style={{maxHeight: 250, fontSize: '0.65em', lineHeight: 'normal'}}>
					<DropdownItemGroup>
						<DropdownItem component={({children}) => (
							<div style={{
								display: 'flex',
								padding: 8,
								paddingRight: 10,
							}}>
								{children}
							</div>
						)}>
							<Flex justifyContent="space-between">
								<Checkbox
									name="selectAll"
									isChecked={chosenSounds.size === ALL_SOUNDS.length}
									label="Select All"
									size="large"
									onChange={onSelectAllClick}
								/>
							</Flex>
						</DropdownItem>

						{ALL_SOUNDS.map((sound) => (
							<DropdownItem key={sound} component={({children}) => (
								<div style={{
									display: 'flex',
									padding: 8,
									paddingRight: 10,
								}}>
									{children}
								</div>
							)}>
								<Flex justifyContent="space-between" alignItems="center" gap="space.050">
									<Checkbox
										name={sound}
										isChecked={chosenSounds.has(sound)}
										label={SOUND_LABEL[sound]}
										size="large"
										onChange={onCheckboxChange}
									/>

									{nowPlaying === sound
										? <div onClick={stopSound}><PauseIcon label="" size="medium" /></div>
										: (
											<div onClick={() => playSound(sound)}>
												<PlayIcon label="" size="medium" />
											</div>
										)}

								</Flex>
							</DropdownItem>
						))}

						<div style={{fontSize: '1em'}}>
							<Flex justifyContent="space-evenly">
								<Button
									accent={Accent.SUCCESS}
									isDisabled={!chosenSounds.size || isStarted}
									onClick={onApplyClick}
								>
									Apply
								</Button>

								<Button
									accent={Accent.DEFAULT}
									onClick={onCancelClick}
								>
									Cancel
								</Button>
							</Flex>
						</div>
					</DropdownItemGroup>
				</div>
			</DropdownMenu>
		</Flex>
	);
};
