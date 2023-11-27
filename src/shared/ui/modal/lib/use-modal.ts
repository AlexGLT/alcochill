
import {useCallback, useState} from 'react';


type ReturnParams = {
	isOpen: boolean,
	openModal: () => void,
	closeModal: () => void,
};

export const useModal = (): ReturnParams => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	return {
		isOpen,
		openModal,
		closeModal,
	};
};
