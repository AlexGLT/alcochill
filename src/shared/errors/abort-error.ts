export class AbortError extends Error {
	constructor(message?: string) {
		super(message);

		this.name = 'AbortError';
	}
}

export const isAbortError = (error: unknown): error is AbortError => {
	return error instanceof AbortError;
};
