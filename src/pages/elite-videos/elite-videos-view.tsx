import {
	useCallback,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import {FaChevronUp, FaChevronDown} from 'react-icons/fa6';
import clsx from 'clsx';
import {shuffle} from 'es-toolkit';
import {useUnit} from 'effector-react';

import {
	addDays,
	addYears,
	isValid,
} from 'date-fns';

import {useQuery} from '@tanstack/react-query';
import {useStableCallback} from '@shared/libs';
import {getRandomVideoUrl, rateVideoFx, getVideosListByRangeFx} from '@shared/api/random-videos';
import {Rating} from '@shared/ui/rating';

import styles from './elite-videos.module.scss';

import type {FC} from 'react';
import type {Video} from '@shared/api/random-videos';


type DIRECTION = 'DOWN' | 'UP';
const TODAY = Date.now();

const EMPTY_LIST: Array<Video> = [];

export const EliteVideosView: FC = () => {
	const [getVideosListByRange, rateVideo] = useUnit([getVideosListByRangeFx, rateVideoFx]);

	const searchParams = useMemo(() => {
		const from = undefined;
		const to = TODAY;

		const dateEnd = isValid(to)
			? addDays(to, 1)
			: addDays(TODAY, 1);

		// eslint-disable-next-line typescript/no-unnecessary-condition
		const dateStart = from && isValid(from)
			? new Date(from)
			: addYears(dateEnd, -1);

		return {
			dateStart: dateStart.toISOString().split('T')[0],
			dateEnd: dateEnd.toISOString().split('T')[0],
		};
	}, []);

	const {data = EMPTY_LIST} = useQuery({
		queryKey: ['videos'],
		queryFn: ({signal}) => getVideosListByRange({
			meta: searchParams,
			options: {signal},
		}),
	});

	const [currentIndex, setCurrentIndex] = useState(0);
	const [videos, setVideos] = useState(EMPTY_LIST);

	useLayoutEffect(() => {
		setVideos(shuffle(data));
		// setVideos(data);
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
		document.body.focus();
	});

	const openPreviousVideo = useStableCallback((): void => {
		changeIndex('DOWN');
		document.body.focus();
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

	const rateTheVideo = useStableCallback((rating: number): void => {
		const fileId = currentVideo?.fileId;

		if (fileId) {
			setVideos((previousVideos) => {
				return previousVideos.map((video) => {
					if (video.fileId === currentVideo.fileId) {
						return {
							...video,
							rating,
						};
					}

					return video;
				});
			});

			rateVideo({meta: {fileId, rating}});
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
			} else if (event.key === '1') {
				rateTheVideo(1);
			} else if (event.key === '2') {
				rateTheVideo(2);
			} else if (event.key === '3') {
				rateTheVideo(3);
			} else if (event.key === '4') {
				rateTheVideo(4);
			} else if (event.key === '5') {
				rateTheVideo(5);
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
		rateTheVideo,
	]);

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

				{currentVideo ? (
					<div className={styles.rating}>
						<Rating
							id={currentVideo.fileId}
							value={currentVideo.rating}
							onChange={rateTheVideo}
						/>
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
						ref={nextVideoContainerRef}
						key={nextVideo.fileId}
						src={getRandomVideoUrl(nextVideo.fileId)}
						autoPlay={false}
						loop={true}
						controls={true}
						disablePictureInPicture={true}
						disableRemotePlayback={true}
						controlsList="nofullscreen noremoteplayback noplaybackrate"
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
