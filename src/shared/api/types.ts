import type {KyInstance, Options} from 'ky';


export type ApiClient = KyInstance;

export type ApiContext = {
	isCalledEndpointPublic?: boolean,
};

export type ApiCall<
	Rep = undefined,
	Req extends Record<string, unknown> | void = void,
> = Req extends void
	? (apiClient: ApiClient, options?: Options) => Promise<Rep>
	: (apiClient: ApiClient, pathParams: Req, options?: Options) => Promise<Rep>;

export type ApiCallFxParams<T extends Record<string, unknown> | void = void> = T extends void
	? ({options?: Options} | void)
	: {meta: T, options?: Options};

export type ParamsWithSignal<Params extends Record<string, unknown> | void = Record<string, unknown>> = Params & {
	signal: AbortSignal,
};
