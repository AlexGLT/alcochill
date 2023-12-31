declare namespace React {
	// eslint-disable-next-line typescript/consistent-indexed-object-style
	interface CSSProperties {
		[key: `--${string}`]: string | number,
	}
}

declare module '*.module.scss' {
	const classes: Record<string, string>;

	export default classes;
}

// TODO: add correct typings
declare module '*.svg' {
	const content: string;

	export default content;
}
