import {useRef} from 'react';
import {CSSTransition, Transition} from 'react-transition-group';
import clsx from 'clsx';

import styles from './popover.module.scss';

import type {FC, PropsWithChildren} from 'react';


const POPOVER_CLASS_NAME = 'modal';

const ANIMATION_TIMEOUTS = {
	enter: 400,
	exit: 100,
};

type Props = PropsWithChildren<{
	isOpen: boolean,
	onClose?: () => void,
	customClassNames?: string,
}>;

const Popover: FC<Props> = ({
	isOpen,
	onClose,
	customClassNames,
	children,
}) => {
	const elementRef = useRef<HTMLDivElement>(null);

	const handleEnter = (): void => {
		elementRef.current?.classList.add(styles.popoverOpen);
	};

	const handleExited = (): void => {
		elementRef.current?.classList.remove(styles.popoverOpen);
	};

	const popoverClassNames = clsx(styles.popover, customClassNames);

	const bodyClassNames = clsx(styles.popoverBody);

	return (
		<CSSTransition
			nodeRef={elementRef}
			classNames={POPOVER_CLASS_NAME}
			in={isOpen}
			appear={true}
			timeout={ANIMATION_TIMEOUTS}
			onEnter={handleEnter}
			onExited={handleExited}
		>
			<div
				ref={elementRef}
				className={popoverClassNames}
			>
				<div className={bodyClassNames}>
					{children}
				</div>
			</div>
		</CSSTransition>
	);
};

export default Popover;
