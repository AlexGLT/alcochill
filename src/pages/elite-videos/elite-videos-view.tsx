import {
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

import {FaChevronUp, FaChevronDown} from 'react-icons/fa6';
import {useQuery} from '@tanstack/react-query';
import clsx from 'clsx';
import {shuffle} from 'es-toolkit';

import {useStableCallback} from '@shared/libs';
import {getVideosListByRange, getRandomVideoUrl} from '@shared/api/random-videos';

import styles from './elite-videos.module.scss';

import type {FC} from 'react';
import type {VideoList} from '@shared/api/random-videos';


type DIRECTION = 'DOWN' | 'UP';

const EMPTY_LIST: VideoList = [];

export const EliteVideosView: FC = () => {
	const {data = EMPTY_LIST} = useQuery({
		queryKey: ['videos'],
		queryFn: () => getVideosListByRange(),
	});

	const [currentIndex, setCurrentIndex] = useState(0);
	const [videos, setVideos] = useState(EMPTY_LIST);

	useLayoutEffect(() => {
		setVideos(shuffle(data));
	}, [data]);

	const previousVideo = currentIndex - 1 >= 0 ? videos.at(currentIndex - 1) : undefined;
	const currentVideo = currentIndex || currentIndex === 0 ? videos.at(currentIndex) : undefined;
	const nextVideo = currentIndex + 1 ? videos.at(currentIndex + 1) : undefined;

	const isAnimationPlays = useRef(false);

	const playerContainerRef = useRef<HTMLDivElement>(null);

	const previousVideoContainerRef = useRef<HTMLVideoElement>(null);
	const currentVideoContainerRef = useRef<HTMLVideoElement>(null);
	const nextVideoContainerRef = useRef<HTMLVideoElement>(null);

	const onAnimationEnd = useCallback((): void => {
		isAnimationPlays.current = false;

		currentVideoContainerRef.current?.play();
	}, []);

	const handleVideoError = useStableCallback((fileId: string): void => {
		setVideos((previousVideos) => {
			return previousVideos.filter((video, index) => video.fileId !== fileId);
		});
	});

	const changeIndex = useStableCallback((direction: DIRECTION): void => {
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

				{previousVideo ? (
					<video
						ref={previousVideoContainerRef}
						key={previousVideo.fileId}
						src={getRandomVideoUrl(previousVideo.fileId)}
						controls={true}
						className={clsx(styles.videoBlock, styles.videoBlockPrevious)}
						onTransitionEndCapture={onAnimationEnd}
					/>
				) : null}

				{currentVideo ? (
					<video
						ref={currentVideoContainerRef}
						key={currentVideo.fileId}
						src={getRandomVideoUrl(currentVideo.fileId)}
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
							handleVideoError(currentVideo.fileId);
						}}
					/>
				) : null}

				{nextVideo ? (
					<video
						ref={previousVideoContainerRef}
						key={nextVideo.fileId}
						src={getRandomVideoUrl(nextVideo.fileId)}
						controls={true}
						className={clsx(styles.videoBlock, styles.videoBlockNext)}
						onTransitionEndCapture={onAnimationEnd}
					/>
				) : null}

				<div className={styles.indexControlContainer}>
					<button
						type="button"
						className={styles.indexControlButton}
						disabled={currentIndex < 1}
						onClick={openPreviousVideo}
					>
						<FaChevronUp/>
					</button>

					<button
						type="button"
						className={styles.indexControlButton}
						disabled={currentIndex >= videos.length - 1}
						onClick={openNextVideo}
					>
						<FaChevronDown/>
					</button>
				</div>
			</div>
		</main>
	);
};
