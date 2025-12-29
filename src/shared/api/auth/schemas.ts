import z from 'zod';


export type AuthMeta = {
	login: string,
	password: string,
};

const AuthRawResponseSchema = z.object({
	accessToken: z.string(),
	expiresAt: z.number(),
});

export const AuthResponseSchema = AuthRawResponseSchema.transform(({
	accessToken,
	expiresAt,
}) => {
	return {
		accessToken,
		expiresAt: new Date(expiresAt * 1_000),
	};
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
