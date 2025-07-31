import {
	useCallback,
	useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import clsx from 'clsx';
import {nanoid} from 'nanoid';
import {CSSTransition} from 'react-transition-group';

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
	// isLoading: boolean,
};

export const EliteVideosView: FC = () => {
	const [videos, setVideos] = useState<Array<VideoParams>>([]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const previousIndex = useRef<number>();

	const currentVideo = isNumber(currentIndex) ? videos.at(currentIndex) : undefined;
	const previousVideo = isNumber(previousIndex.current) ? videos.at(previousIndex.current) : undefined;

	const changeDirection = useRef<typeof DOWN | typeof UP>();

	const isAnimationPlays = useRef(false);

	const playerContainerRef = useRef<HTMLDivElement>(null);
	const previousVideoContainerRef = useRef<HTMLVideoElement>(null);
	const currentVideoContainerRef = useRef<HTMLVideoElement>(null);

	const onAnimationEnd = useCallback((): void => {
		isAnimationPlays.current = false;

		previousVideoContainerRef.current?.pause();
		currentVideoContainerRef.current?.play();
	}, []);

	const fetchNewVideo = useStableCallback((id: string): void => {
		getRandomVideo()
			.then((response) => response.blob())
			.then((blob) => {
				const src = URL.createObjectURL(blob);

				setVideos((previousVideos) => {
					return previousVideos.concat({
						id,
						src,
					});
				});
			});
	});

	useEffect(() => {
		fetchNewVideo(nanoid());
		fetchNewVideo(nanoid());
		fetchNewVideo(nanoid());
	}, []);

	useLayoutEffect(() => {
		if (currentIndex + OFFSET >= videos.length) {
			fetchNewVideo();
		}
	}, [currentIndex]);

	const changeIndex = useStableCallback((direction: typeof DOWN | typeof UP): void => {
		if (!isAnimationPlays.current) {
			previousVideoContainerRef.current?.pause();

			isAnimationPlays.current = true;
			previousIndex.current = currentIndex;
			changeDirection.current = direction;

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

	useLayoutEffect(() => {
		const onKeyDown = (event: KeyboardEvent): void => {
			const currentVideoContainer = currentVideoContainerRef.current;

			if (event.key === 'ArrowDown') {
				openNextVideo();
			} else if (event.key === 'ArrowUp') {
				openPreviousVideo();
			} else if (event.key === ' ' && currentVideoContainer) {
				if (currentVideoContainer.paused) {
					currentVideoContainer.play();
				} else {
					currentVideoContainer.pause();
				}
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

				{previousVideo && isAnimationPlays.current && changeDirection.current === 'UP' && (
					<video
						ref={previousVideoContainerRef}
						key={previousVideo.src ?? currentVideo?.src ?? 'PREVIOUS'}
						src={previousVideo.src}
						className={clsx(
							styles.videoBlock,
							styles.videoBlockPrevious,
							styles.videoBlockUp,
						)}
						onTransitionEndCapture={onAnimationEnd}
					/>
				)}

				<video
					ref={currentVideoContainerRef}
					key={currentVideo?.src || 'CURRENT'}
					src={currentVideo?.src}
					autoPlay={true}
					loop={true}
					controls={true}
					disablePictureInPicture={true}
					disableRemotePlayback={true}
					controlsList="nofullscreen noremoteplayback noplaybackrate"
					className={clsx(styles.videoBlock, {
						[styles.videoBlockUp]: changeDirection.current === 'DOWN' && isAnimationPlays.current,
						[styles.videoBlockDown]: changeDirection.current === 'UP' && isAnimationPlays.current,
					})}
					onTransitionEndCapture={onAnimationEnd}
				/>

				{isAnimationPlays.current && changeDirection.current === 'DOWN' && (
					<video
						ref={previousVideoContainerRef}
						key={previousVideo?.src || 'NEXT'}
						src={previousVideo?.src}
						className={clsx(
							styles.videoBlock,
							styles.videoBlockNext,
							styles.videoBlockDown,
						)}
						onTransitionEndCapture={onAnimationEnd}
					/>
				)}

				<div className={styles.indexControlContainer} onClick={openPreviousVideo}>
					<button className={styles.indexControlButton}>
						<ArrowUp />
					</button>

					<button className={styles.indexControlButton} onClick={openNextVideo}>
						<ArrowDown />
					</button>
				</div>
			</div>
		</main>
	);
};
