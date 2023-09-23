import styles from './text-field.module.scss';

import type {
	FC,
	ChangeEvent,
	HTMLInputTypeAttribute
} from 'react';


const DEFAULT_VALUE = '';
const DEFAULT_TYPE = 'text';

type Props = {
	value: string | number,
	type?: HTMLInputTypeAttribute,
	placeholder?: string,
	onChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

const TextField: FC<Props> = ({
	value = DEFAULT_VALUE,
	type = DEFAULT_TYPE,
	placeholder = DEFAULT_VALUE,
	onChange,
}) => {
	return (
		<input
			value={value}
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			className={styles.textField}
		/>
	);
};

export default TextField;
