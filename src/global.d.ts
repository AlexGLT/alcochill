declare namespace React {
	// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
	interface CSSProperties {
		[key: `--${string}`]: string | number,
	}
}

declare module '*.module.scss' {
	const classes: Record<string, string>;

	export default classes;
}
