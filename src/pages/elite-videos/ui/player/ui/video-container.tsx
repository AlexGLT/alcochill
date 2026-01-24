import clsx from 'clsx';
import {useLayoutEffect, useRef, useState} from 'react';

import {Rating} from '@shared/ui/rating';
import {isNumber, useStableCallback} from '@shared/libs';
import {Progress} from '@shared/ui/progress';

import styles from '../styles.module.scss';

import type {FC, TransitionEventHandler} from 'react';
import type {VideoItem} from '../../../types';


const createTransitionEventHandler = (handler: () => void): TransitionEventHandler<HTMLDivElement> => {
	return (event) => {
		if (event.target === event.currentTarget) {
			handler();
		}
	};
};

type Props = {
	isActive?: boolean,
	className: string,
	videoItem: VideoItem,
	loadingProgress?: number | null,
	onVideoRatingUpdate?: (index: number) => void,
	onTransitionStart?: () => void,
	onTransitionEnd?: () => void,
};

export const VideoContainer: FC<Props> = ({
	isActive,
	className,
	videoItem,
	loadingProgress,
	onVideoRatingUpdate,
	onTransitionStart,
	onTransitionEnd,
}) => {
	const {
		fileId,
		from,
		timestamp,
		rating,
		src,
	} = videoItem;

	const videoRef = useRef<HTMLVideoElement>(null);

	const [isPausedManually, setIsPausedManually] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handlePlayToggle = useStableCallback((): void => {
		const element = videoRef.current;

		if (element) {
			if (element.paused) {
				element.play();
				setIsPausedManually(false);
			} else {
				element.pause();
				setIsPausedManually(true);
			}
		}
	});

	useLayoutEffect(() => {
		if (isActive) {
			const onKeyDown = (event: KeyboardEvent): void => {
				const element = videoRef.current;

				if (event.key === ' ') {
					handlePlayToggle();
				} else if (element) {
					if (event.key === 'ArrowRight') {
						element.currentTime += 1;
					} else if (event.key === 'ArrowLeft') {
						element.currentTime -= 1;
					}
				}
			};

			window.addEventListener('keydown', onKeyDown);

			return () => {
				window.removeEventListener('keydown', onKeyDown);
			};
		}
	}, [isActive, handlePlayToggle]);

	const handleTransitionStart = createTransitionEventHandler(() => {
		onTransitionStart?.();

		if (videoRef.current) {
			videoRef.current.pause();
		}
	});

	const handleTransitionEnd = createTransitionEventHandler(() => {
		onTransitionEnd?.();

		const element = videoRef.current;

		if (element) {
			if (isActive) {
				element.play();
			} else {
				element.currentTime = 0;
			}
		}
	});

	const handleMouseEnter = (): void => {
		setIsHovered(true);
	};

	const handleMouseLeave = (): void => {
		setIsHovered(false);
	};

	return (
		<div
			inert={!isActive}
			className={clsx(styles.videoContainer, className)}
			onTransitionStart={handleTransitionStart}
			onTransitionEnd={handleTransitionEnd}
		>
			{isNumber(loadingProgress) ? (
				<div className={styles.loadingProgress}>
					<Progress value={loadingProgress}/>
				</div>
			) : null}

			{from || timestamp ? (
				<div className={styles.meta}>
					{from ? (
						<div className={styles.card}>
							{new Date(timestamp).toLocaleString()}
						</div>
					) : null}

					{timestamp ? (
						<div className={styles.card}>
							{from}
						</div>
					) : null}
				</div>
			) : null}

			<div className={clsx(styles.rating, styles.card)}>
				<Rating
					id={fileId}
					value={rating}
					onChange={onVideoRatingUpdate}
				/>
			</div>

			<video
				ref={videoRef}
				src={src}
				autoPlay={isActive}
				loop={true}
				controls={true}
				disablePictureInPicture={true}
				disableRemotePlayback={true}
				controlsList="nofullscreen noremoteplayback"
				className={clsx(styles.video, isActive && (isPausedManually || isHovered) && styles.videoCurrent)}
				onClick={isActive ? handlePlayToggle : undefined}
				onMouseEnter={isActive ? handleMouseEnter : undefined}
				onMouseLeave={isActive ? handleMouseLeave : undefined}
			/>
		</div>
	);
};
