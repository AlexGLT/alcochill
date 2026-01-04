// eslint-disable-next-line typescript/consistent-type-definitions
interface Promise<T> {
	/**
	 * Attaches a callback for only the rejection of the Promise.
	 * @param onrejected The callback to execute when the Promise is rejected.
	 * @returns A Promise for the completion of the callback.
	 */
	catch: <TResult = never>(
		onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
	) => Promise<T | TResult>,
}

type CSSModule = Record<string, string>;

declare module '*.module.css' {
	const classes: CSSModule;
	export default classes;
}

declare module '*.module.scss' {
	const classes: CSSModule;
	export default classes;
}
