export const randomizeInteger = (max: number, min = 0, mutiplier = 1): number => {
	return Math.round((Math.random() * (max - min) + min) * mutiplier);
};
