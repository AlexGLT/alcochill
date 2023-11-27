import type {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import type {Values} from '@shared/types/core';
import type {TYPE} from './constants';


export type InputProps = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, (
	| 'type'
	| 'value'
)>;

export type Type = Values<typeof TYPE>;
