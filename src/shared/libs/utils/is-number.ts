export const isNumber = (arg: unknown): arg is number => (
	typeof arg === 'number'
);
