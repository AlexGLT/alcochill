import {FaChevronUp, FaChevronDown} from 'react-icons/fa6';
import {useGate, useUnit} from 'effector-react';

import {model} from '../../model';

import {VideoContainer} from './video-container';

import styles from './styles.module.scss';

import type {FC, MouseEventHandler} from 'react';


export const Player: FC = () => {
	const {
		videosListRef: {current: videosList},
		displayedVideos: [previousVideo, currentVideo, nextVideo],
		activeIndex,
		onMoveForward,
		onMoveBackward,
		onActiveVideoRatingUpdate,
		onAnimationStart,
		onAnimationEnd,
	} = useUnit({
		videosListRef: model.$videosListRef,
		displayedVideos: model.$displayedVideos,
		activeIndex: model.$activeIndex,
		onMoveForward: model.movedForward,
		onMoveBackward: model.movedBackward,
		onActiveVideoRatingUpdate: model.activeVideoRatingUpdated,
		onAnimationStart: model.scrollAnimationStarted,
		onAnimationEnd: model.scrollAnimationEnded,
	});

	useGate(model.Gate);

	const handleUpClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		if (event.detail !== 0) {
			event.currentTarget.blur();
		}

		onMoveForward();
	};

	const handleDownClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		if (event.detail !== 0) {
			event.currentTarget.blur();
		}

		onMoveBackward();
	};

	return (
		<div className={styles.player}>
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

			<div className={styles.indexControlContainer}>
				<button
					type="button"
					className={styles.indexControlButton}
					disabled={activeIndex < 1}
					onClick={handleDownClick}
				>
					<FaChevronUp/>
				</button>

				<button
					type="button"
					className={styles.indexControlButton}
					disabled={activeIndex >= videosList.length}
					onClick={handleUpClick}
				>
					<FaChevronDown/>
				</button>
			</div>
		</div>
	);
};
