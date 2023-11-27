import {useEffect, useRef} from 'react';
import {useStore} from 'effector-react';

import EmptyState from '@shared/ui/empty-state';
import Card from '@shared/ui/card';
import {SpinnerContainer} from '@shared/ui/spinner';

import {$isLoading, $currentMemeLink} from '../model';

import styles from '../elite-memes.module.scss';

import type {FC} from 'react';


type Props = {

	// src?: string,
};

export const Gallery: FC<Props> = () => {
	const isLoading = useStore($isLoading);
	const currentSrc = useStore($currentMemeLink);

	const previousSrc = useRef<string>();

	useEffect(() => {
		previousSrc.current = currentSrc;
	}, [currentSrc]);

	return (
		<SpinnerContainer isLoading={isLoading} customClassNames={styles.eliteMemesGalleryWrapper}>
			<div className={styles.eliteMemesGallery}>
				<Card customClasses={styles.eliteMemesImgContainer}>
					{currentSrc ? (
						<>
							<img className={styles.eliteMemesImg} src={currentSrc} alt="meme" />
							<div className={styles.eliteMemesGalleryBackground} style={{'--background-image': `url('${currentSrc}')`}} />
						</>
					) : (
						<EmptyState />
					)}
				</Card>
			</div>
		</SpinnerContainer>
	);
};
