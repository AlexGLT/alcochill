import clsx from 'clsx';
import {useLayoutEffect, useRef} from 'react';

import {Rating} from '@shared/ui/rating';
import {useStableCallback} from '@shared/libs';

import styles from '../styles.module.scss';

import type {FC} from 'react';
import type {VideoItem} from '../../../types';


type Props = {
	isActive?: boolean,
	className: string,
	videoItem: VideoItem,
	onVideoRatingUpdate?: (index: number) => void,
	onTransitionStart?: () => void,
	onTransitionEnd?: () => void,
};

export const VideoContainer: FC<Props> = ({
	isActive,
	className,
	videoItem,
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

	const handlePlayToggle = useStableCallback((): void => {
		const element = videoRef.current;

		if (element) {
			if (element.paused) {
				element.play();
			} else {
				element.pause();
			}
		}
	});

	useLayoutEffect(() => {
		if (isActive) {
			const onKeyDown = (event: KeyboardEvent): void => {
				if (event.key === ' ') {
					handlePlayToggle();
				}
			};

			window.addEventListener('keydown', onKeyDown);

			return () => {
				window.removeEventListener('keydown', onKeyDown);
			};
		}
	}, [isActive, handlePlayToggle]);

	const handleTransitionStart = (): void => {
		onTransitionStart?.();

		if (videoRef.current) {
			videoRef.current.pause();
		}
	};

	const handleTransitionEnd = (): void => {
		onTransitionEnd?.();

		const element = videoRef.current;

		if (element) {
			if (isActive) {
				element.play();
			} else {
				element.currentTime = 0;
			}
		}
	};

	return (
		<div
			inert={!isActive}
			className={clsx(styles.videoContainer, className)}
			onTransitionStart={handleTransitionStart}
			onTransitionEnd={handleTransitionEnd}
		>
			<div className={styles.sender}>
				{from}
			</div>

			<div className={styles.timestamp}>
				{new Date(timestamp).toLocaleString()}
			</div>

			<div className={styles.rating}>
				<Rating
					id={fileId}
					value={rating}
					onChange={onVideoRatingUpdate}
				/>
			</div>

			<video
				ref={videoRef}
				src={src}
				width="100%"
				height="100%"
				autoPlay={isActive}
				loop={true}
				controls={true}
				disablePictureInPicture={true}
				disableRemotePlayback={true}
				controlsList="nofullscreen noremoteplayback"
				className={styles.video}
				onClick={isActive ? handlePlayToggle : undefined}
			/>
		</div>
	);
};
