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
	const styles: CSSModule;
	export = styles;
}

declare module '*.module.scss' {
	const styles: CSSModule;
	export = styles;
}

declare module '*.module.less' {
	const styles: CSSModule;
	export = styles;
}

declare module '*.module.styl' {
	const styles: CSSModule;
	export = styles;
}
