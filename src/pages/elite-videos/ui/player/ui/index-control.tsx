import {FaChevronUp, FaChevronDown} from 'react-icons/fa6';
import {useUnit} from 'effector-react';

import {model} from '../../../model';

import styles from '../styles.module.scss';

import type {FC, MouseEventHandler} from 'react';


const createMoveButtonHandler = (handler: () => void): MouseEventHandler<HTMLButtonElement> => {
	return (event) => {
		if (event.detail !== 0) {
			event.currentTarget.blur();
		}

		handler();
	};
};

export const IndexControl: FC = () => {
	const {
		videosCount,
		activeIndex,
		onMoveBackward,
		onMoveForward,
	} = useUnit({
		videosCount: model.$videosCount,
		activeIndex: model.$activeIndex,
		onMoveBackward: model.movedBackward,
		onMoveForward: model.movedForward,
	});

	const handleBackwardButtonClick = createMoveButtonHandler(onMoveBackward);
	const handleForwardButtonClick = createMoveButtonHandler(onMoveForward);

	return (
		<div className={styles.indexControlContainer}>
			{activeIndex > 0 ? (
				<button
					type="button"
					className={styles.indexControlButton}
					disabled={activeIndex < 1}
					onClick={handleBackwardButtonClick}
				>
					<FaChevronUp/>
				</button>
			) : null}

			{activeIndex < videosCount ? (
				<button
					type="button"
					className={styles.indexControlButton}
					disabled={activeIndex >= videosCount}
					onClick={handleForwardButtonClick}
				>
					<FaChevronDown/>
				</button>
			) : null}
		</div>
	);
};
