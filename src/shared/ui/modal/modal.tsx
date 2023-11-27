import {useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import clsx from 'clsx';

import styles from './modal.module.scss';

import type {FC, PropsWithChildren, MouseEvent} from 'react';


const MODAL_CLASS_NAME = 'modal';

const ANIMATION_TIMEOUTS = {
	enter: 400,
	exit: 100,
};

type Props = PropsWithChildren<{
	isOpen: boolean,
	onClose: () => void,
}>;

const Modal: FC<Props> = ({
	isOpen,
	onClose,
	children,
}) => {
	const elementRef = useRef<HTMLDialogElement>(null);

	const handleClickOutside = (event: MouseEvent<HTMLDialogElement>): void => {
		if (event.target === elementRef.current) {
			onClose();
		}
	};

	const bodyClassNames = clsx(styles.modalBody);

	const handleEnter = (): void => {
		elementRef.current?.showModal();
	};

	const handleExited = (): void => {
		elementRef.current?.close();
	};

	return (
		<CSSTransition
			nodeRef={elementRef}
			classNames={MODAL_CLASS_NAME}
			in={isOpen}
			timeout={ANIMATION_TIMEOUTS}
			onEnter={handleEnter}
			onExited={handleExited}
		>
			<dialog
				ref={elementRef}
				className={styles.modal}
				onClick={handleClickOutside}
			>
				<div className={bodyClassNames}>
					{children}
				</div>
			</dialog>
		</CSSTransition>
	);
};

export default Modal;
