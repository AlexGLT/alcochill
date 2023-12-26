export const isString = (param: unknown): param is string => {
	return typeof param === 'string';
};
