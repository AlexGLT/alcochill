import {useGate, useUnit} from 'effector-react';

import {model} from '../../model';

import {IndexControl, VideoContainer} from './ui';

import styles from './styles.module.scss';

import type {FC} from 'react';


export const Player: FC = () => {
	const {
		displayedVideos: [previousVideo, currentVideo, nextVideo],
		onActiveVideoRatingUpdate,
		onAnimationStart,
		onAnimationEnd,
	} = useUnit({
		displayedVideos: model.$displayedVideos,
		onActiveVideoRatingUpdate: model.activeVideoRatingUpdated,
		onAnimationStart: model.scrollAnimationStarted,
		onAnimationEnd: model.scrollAnimationEnded,
	});

	useGate(model.Gate);

	return (
		<div className={styles.player}>
			<IndexControl/>

			{previousVideo ? (
				<VideoContainer
					key={previousVideo.fileId}
					className={styles.videoContainerPrevious}
					videoItem={previousVideo}
				/>
			) : null}

			{currentVideo ? (
				<VideoContainer
					key={currentVideo.fileId}
					isActive={true}
					className={styles.videoContainerCurrent}
					videoItem={currentVideo}
					onTransitionStart={onAnimationStart}
					onTransitionEnd={onAnimationEnd}
					onVideoRatingUpdate={onActiveVideoRatingUpdate}
				/>
			) : null}

			{nextVideo ? (
				<VideoContainer
					key={nextVideo.fileId}
					className={styles.videoContainerNext}
					videoItem={nextVideo}
				/>
			) : null}
		</div>
	);
};
