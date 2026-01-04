import {useGate, useUnit} from 'effector-react';

import {model} from '../../model';

import {IndexControl, VideoContainer} from './ui';

import styles from './styles.module.scss';

import type {FC} from 'react';


export const Player: FC = () => {
	useGate(model.Gate);

	const {
		displayedVideos: [previousVideo, currentVideo, nextVideo],
		loadingProgress,
		onActiveVideoRatingUpdate,
		onAnimationStart,
		onAnimationEnd,
	} = useUnit({
		displayedVideos: model.$displayedVideos,
		loadingProgress: model.$activeVideoLoadingProgress,
		onActiveVideoRatingUpdate: model.activeVideoRatingUpdated,
		onAnimationStart: model.scrollAnimationStarted,
		onAnimationEnd: model.scrollAnimationEnded,
	});

	return (
		<div className={styles.player}>
			<IndexControl/>

			{previousVideo ? (
				<VideoContainer
					key={previousVideo.fileId}
					className={styles.videoContainerPrevious!}
					videoItem={previousVideo}
				/>
			) : null}

			{currentVideo ? (
				<VideoContainer
					key={currentVideo.fileId}
					isActive={true}
					className={styles.videoContainerCurrent!}
					videoItem={currentVideo}
					loadingProgress={loadingProgress}
					onTransitionStart={onAnimationStart}
					onTransitionEnd={onAnimationEnd}
					onVideoRatingUpdate={onActiveVideoRatingUpdate}
				/>
			) : null}

			{nextVideo ? (
				<VideoContainer
					key={nextVideo.fileId}
					className={styles.videoContainerNext!}
					videoItem={nextVideo}
				/>
			) : null}
		</div>
	);
};
