import clsx from 'clsx';

import styles from './card.module.scss';

import type {FC, PropsWithChildren, CSSProperties} from 'react';


type Props = PropsWithChildren<{
	customClasses?: string,
	customStyles?: CSSProperties,
}>;

const Card: FC<Props> = ({customClasses, customStyles, children}) => {
	const className = clsx(styles.card, customClasses);

	return (
		<div className={className} style={customStyles}>{children}</div>
	);
};

export default Card;
