export const isObject = (arg: unknown): arg is Record<string, unknown> => {
	return !!arg && typeof arg === 'object' && !Array.isArray(arg);
};
