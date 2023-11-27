import {useEffect, useRef} from 'react';
import {useStore} from 'effector-react';

import Modal, {useModal} from '@shared/ui/modal';

import {$isTimeOver} from '../model';

import type {FC} from 'react';


const CLOSE_TIMEOUT = 5000;

type Props = {

};

export const TimerModal: FC<Props> = ({}) => {
	const {isOpen, closeModal} = useModal();

	const isTimeOver = useStore($isTimeOver);

	const closeTimeoutRef = useRef<number>();

	useEffect(() => {
		if (isTimeOver) {
			closeTimeoutRef.current = setTimeout(closeModal, CLOSE_TIMEOUT);
		}
	}, [isTimeOver, closeModal]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={closeModal}
		>

		</Modal>
	);
};
