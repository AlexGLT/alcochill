import {changeSound} from '@features/timer/model/actions';
import {SOUNDS} from '@shared/constants';

import styles from '../home.module.scss';

import type {FC, ChangeEvent} from 'react';

// bell: '../../audio/bell.wav',
// goofy: '../../audio/goofy.mp3',
// metalPipe: '../../audio/metal-pipe.mp3',
// ring: '../../audio/ring.mp3',
// vine: '../../audio/vine.mp3',

const SOUND_NAME = {
	[SOUNDS.bell]: 'Bell',
	[SOUNDS.fart]: 'Fart',
	[SOUNDS.goofy]: 'Goofy',
	[SOUNDS.metalPipe]: 'Metal pipe',
	[SOUNDS.ring]: 'Ring',
	[SOUNDS.vine]: 'Vine',
};

type Props = {

};

export const AudioSelect: FC<Props> = ({}) => {
	const onChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		changeSound(event.target.value);
	};

	return (
		<select className={styles.homeSelect} onChange={onChange}>
			{Object.values(SOUNDS).map((sound) => (
				<option key={sound} value={sound}>{SOUND_NAME[sound]}</option>
			))}
		</select>
	);
};
