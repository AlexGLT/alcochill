import {
	useCallback,
	useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import clsx from 'clsx';
import {nanoid} from 'nanoid';

import {isNumber, useStableCallback} from '@shared/libs';

import {getRandomVideo} from './api';
import ArrowUp from './arrow-up.svg?react';
import ArrowDown from './arrow-down.svg?react';

import styles from './elite-videos.module.scss';

import type {FC} from 'react';


const OFFSET = 3;

const DOWN = 'DOWN';
const UP = 'UP';

type VideoParams = {
	id: string,
	src?: string,
	senderName?: string | null,
	timestamp?: string | null,
	// isLoading: boolean,
};

export const EliteVideosView: FC = () => {
	const [videos, setVideos] = useState<Array<VideoParams>>([]);

	const [currentIndex, setCurrentIndex] = useState(0);

	const previousVideo = isNumber(currentIndex - 1) && currentIndex - 1 >= 0 ? videos.at(currentIndex - 1) : undefined;
	const currentVideo = isNumber(currentIndex) ? videos.at(currentIndex) : undefined;
	const nextVideo = isNumber(currentIndex + 1) ? videos.at(currentIndex + 1) : undefined;

	const isAnimationPlays = useRef(false);

	const playerContainerRef = useRef<HTMLDivElement>(null);

	const previousVideoContainerRef = useRef<HTMLVideoElement>(null);
	const currentVideoContainerRef = useRef<HTMLVideoElement>(null);
	const nextVideoContainerRef = useRef<HTMLVideoElement>(null);

	const onAnimationEnd = useCallback((): void => {
		isAnimationPlays.current = false;

		currentVideoContainerRef.current?.play();
	}, []);

	const fetchRandomVideo = useStableCallback((): Promise<{
		blob: Blob,
		senderName: string | null,
		timestamp: string | null,
	}> => {
		return getRandomVideo().then(async (response) => {
			const blobbedVideo = await response.blob();

			return {
				blob: blobbedVideo,
				senderName: response.headers.get('X-From'),
				timestamp: response.headers.get('X-Timestamp'),
			};
		});
	});

	const fetchNewVideo = useStableCallback((id: string): void => {
		fetchRandomVideo().then(({blob, senderName, timestamp}) => {
			const src = URL.createObjectURL(blob);

			setVideos((previousVideos) => {
				return previousVideos.concat({
					id: nanoid(),
					src,
					senderName,
					timestamp,
				});
			});
		});
	});

	useEffect(() => {
		fetchNewVideo();
		fetchNewVideo();
		fetchNewVideo();
	}, []);

	useLayoutEffect(() => {
		if (currentIndex + OFFSET >= videos.length) {
			fetchNewVideo();
		}
	}, [currentIndex]);

	const handleVideoError = useStableCallback((errorIndex: number): void => {
		fetchRandomVideo().then(({blob, senderName, timestamp}) => {
			const src = URL.createObjectURL(blob);

			setVideos((previousVideos) => {
				return previousVideos.with(errorIndex, {
					id: nanoid(),
					src,
					senderName,
					timestamp,
				});
			});
		});
	});

	const changeIndex = useStableCallback((direction: typeof DOWN | typeof UP): void => {
		if (!isAnimationPlays.current) {
			if (previousVideoContainerRef.current) {
				previousVideoContainerRef.current.pause();
				previousVideoContainerRef.current.currentTime = 0;
			}

			if (currentVideoContainerRef.current) {
				currentVideoContainerRef.current.pause();
				currentVideoContainerRef.current.currentTime = 0;
			}

			if (nextVideoContainerRef.current) {
				nextVideoContainerRef.current.pause();
				nextVideoContainerRef.current.currentTime = 0;
			}

			isAnimationPlays.current = true;

			if (direction === 'UP') {
				setCurrentIndex((index) => index + 1);
			} else {
				setCurrentIndex((index) => {
					return index > 0
						? index - 1
						: index;
				});
			}
		}
	});

	const openNextVideo = useStableCallback((): void => {
		changeIndex('UP');
	});

	const openPreviousVideo = useStableCallback((): void => {
		changeIndex('DOWN');
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

	useLayoutEffect(() => {
		const onKeyDown = (event: KeyboardEvent): void => {
			if (event.key === 'ArrowDown') {
				openNextVideo();
			} else if (event.key === 'ArrowUp') {
				openPreviousVideo();
			} else if (event.key === ' ') {
				togglePlay();
			}
		};

		playerContainerRef.current?.addEventListener('keydown', onKeyDown);
		window.addEventListener('keydown', onKeyDown);

		return () => {
			playerContainerRef.current?.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	return (
		<main className={styles.main}>
			<div
				ref={playerContainerRef}
				className={styles.eliteVideos}
			>
				{currentVideo?.senderName && (
					<div className={styles.sender}>
						{currentVideo.senderName}
					</div>
				)}

				{currentVideo?.timestamp && (
					<div className={styles.timestamp}>
						{new Date(currentVideo.timestamp).toLocaleString()}
					</div>
				)}

				{previousVideo && (
					<video
						ref={previousVideoContainerRef}
						key={previousVideo.src}
						src={previousVideo.src}
						controls={true}
						className={clsx(styles.videoBlock, styles.videoBlockPrevious)}
						onTransitionEndCapture={onAnimationEnd}
					/>
				)}

				{currentVideo && (
					<video
						ref={currentVideoContainerRef}
						key={currentVideo.src}
						src={currentVideo.src}
						autoPlay={true}
						loop={true}
						controls={true}
						disablePictureInPicture={true}
						disableRemotePlayback={true}
						controlsList="nofullscreen noremoteplayback noplaybackrate"
						className={clsx(styles.videoBlock, styles.videoBlockCurrent)}
						onClick={togglePlay}
						onTransitionEndCapture={onAnimationEnd}
						onError={() => {
							handleVideoError(currentIndex);
						}}
					/>
				)}

				{nextVideo && (
					<video
						ref={previousVideoContainerRef}
						key={nextVideo.src}
						src={nextVideo.src}
						controls={true}
						className={clsx(styles.videoBlock, styles.videoBlockNext)}
						onTransitionEndCapture={onAnimationEnd}
					/>
				)}

				<div className={styles.indexControlContainer}>
					<button
						className={styles.indexControlButton}
						disabled={currentIndex < 1}
						onClick={openPreviousVideo}>
						<ArrowUp />
					</button>

					<button
						className={styles.indexControlButton}
						disabled={currentIndex >= videos.length - 1}
						onClick={openNextVideo}
					>
						<ArrowDown />
					</button>
				</div>
			</div>
		</main>
	);
};
