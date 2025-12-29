export const isArray = (arg: unknown): arg is Array<unknown> => {
	return Array.isArray(arg);
};
