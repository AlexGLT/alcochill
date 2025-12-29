import {ZodError} from 'zod';


export {ZodError as ParseError};

export const isParseError = (error: unknown): error is ZodError => {
	return error instanceof ZodError;
};
