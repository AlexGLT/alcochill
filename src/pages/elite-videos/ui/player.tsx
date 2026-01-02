import {useCallback, useLayoutEffect, useRef} from 'react';
import {FaChevronUp, FaChevronDown} from 'react-icons/fa6';
import clsx from 'clsx';
import {useGate, useUnit} from 'effector-react';

import {useStableCallback} from '@shared/libs';
import {Rating} from '@shared/ui/rating';

import {model} from '../model';

import styles from '../styles.module.scss';

import type {FC} from 'react';


export const Player: FC = () => {
	const {
		videosListRef,
		displayedVideos: [previousVideo, currentVideo, nextVideo],
		activeIndex,
		moveForward,
		moveBackward,
		updateVideoRating,
	} = useUnit({
		videosListRef: model.$videosList,
		displayedVideos: model.$displayedVideos,
		activeIndex: model.$activeIndex,
		moveForward: model.movedForward,
		moveBackward: model.movedBackward,
		updateVideoRating: model.videoRatingUpdated,
	});

	const videosList = videosListRef.ref || [];

	useGate(model.Gate);

	const isAnimationPlays = useRef(false);

	const playerContainerRef = useRef<HTMLDivElement>(null);

	const previousVideoContainerRef = useRef<HTMLVideoElement>(null);
	const currentVideoContainerRef = useRef<HTMLVideoElement>(null);
	const nextVideoContainerRef = useRef<HTMLVideoElement>(null);

	const onAnimationEnd = useCallback((): void => {
		isAnimationPlays.current = false;

		currentVideoContainerRef.current?.play();
	}, []);

	const handleIndexChange = useStableCallback(() => {
		if (!isAnimationPlays.current) {
			if (previousVideoContainerRef.current) {
				previousVideoContainerRef.current.pause();
				previousVideoContainerRef.current.currentTime = 0;
			}

			if (currentVideoContainerRef.current) {
				currentVideoContainerRef.current.pause();
			}

			if (nextVideoContainerRef.current) {
				nextVideoContainerRef.current.pause();
				nextVideoContainerRef.current.currentTime = 0;
			}

			isAnimationPlays.current = true;
		}
	});

	const openNextVideo = useStableCallback((): void => {
		handleIndexChange();
		moveForward();
	});

	const openPreviousVideo = useStableCallback((): void => {
		handleIndexChange();
		moveBackward();
	});

	const togglePlay = useStableCallback((): void => {
		const currentVideoContainer = currentVideoContainerRef.current;

		if (currentVideoContainer) {
			if (currentVideoContainer.paused) {
				currentVideoContainer.play();
			} else {
				currentVideoContainer.pause();
			}
		}
	});

	const rateVideo = useStableCallback((rating: number): void => {
		updateVideoRating({index: activeIndex, rating});
	});

	useLayoutEffect(() => {
		const onKeyDown = (event: KeyboardEvent): void => {
			if (event.key === 'ArrowDown') {
				openNextVideo();
			} else if (event.key === 'ArrowUp') {
				openPreviousVideo();
			} else if (event.key === ' ') {
				togglePlay();
			} else if (event.key === '1') {
				rateVideo(1);
			} else if (event.key === '2') {
				rateVideo(2);
			} else if (event.key === '3') {
				rateVideo(3);
			} else if (event.key === '4') {
				rateVideo(4);
			} else if (event.key === '5') {
				rateVideo(5);
			}
		};

		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [
		openNextVideo,
		openPreviousVideo,
		togglePlay,
		rateVideo,
	]);

	return (
		<div
			ref={playerContainerRef}
			className={styles.eliteVideos}
		>
			{currentVideo?.from ? (
				<div className={styles.sender}>
					{currentVideo.from}
				</div>
			) : null}

			{currentVideo?.timestamp ? (
				<div className={styles.timestamp}>
					{new Date(currentVideo.timestamp).toLocaleString()}
				</div>
			) : null}

			{currentVideo ? (
				<div className={styles.rating}>
					<Rating
						id={currentVideo.fileId}
						value={currentVideo.rating}
						onChange={rateVideo}
					/>
				</div>
			) : null}

			{previousVideo ? (
				<video
					ref={previousVideoContainerRef}
					key={previousVideo.fileId}
					src={previousVideo.src}
					controls={true}
					className={clsx(styles.videoBlock, styles.videoBlockPrevious)}
					onTransitionEnd={onAnimationEnd}
				/>
			) : null}

			{currentVideo ? (
				<video
					ref={currentVideoContainerRef}
					key={currentVideo.fileId}
					src={currentVideo.src}
					autoPlay={true}
					loop={true}
					controls={true}
					disablePictureInPicture={true}
					disableRemotePlayback={true}
					controlsList="nofullscreen noremoteplayback noplaybackrate"
					className={clsx(styles.videoBlock, styles.videoBlockCurrent)}
					onClick={togglePlay}
					onTransitionEnd={onAnimationEnd}
				/>
			) : null}

			{nextVideo ? (
				<video
					ref={nextVideoContainerRef}
					key={nextVideo.fileId}
					src={nextVideo.src}
					autoPlay={false}
					loop={true}
					controls={true}
					disablePictureInPicture={true}
					disableRemotePlayback={true}
					controlsList="nofullscreen noremoteplayback noplaybackrate"
					className={clsx(styles.videoBlock, styles.videoBlockNext)}
					onTransitionEnd={onAnimationEnd}
				/>
			) : null}

			<div className={styles.indexControlContainer}>
				<button
					type="button"
					className={styles.indexControlButton}
					disabled={activeIndex < 1}
					onClick={openPreviousVideo}
				>
					<FaChevronUp/>
				</button>

				<button
					type="button"
					className={styles.indexControlButton}
					disabled={activeIndex >= videosList.length}
					onClick={openNextVideo}
				>
					<FaChevronDown/>
				</button>
			</div>
		</div>
	);
};
