import z from 'zod';


export const USER_NAME_FIELD = 'userName';
export const PASSWORD_FIELD = 'password';
export const CONFIRM_PASSWORD_FIELD = 'confirmPassword';

const userNameSchema = z
	.string()
	.min(4, 'Username is too short')
	.max(20, 'Username is too long')
	.regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores');

const passwordSchema = z
	.string()
	.min(8, 'Password is too short');

export const LOGIN_SCHEMA = z.object({
	[USER_NAME_FIELD]: userNameSchema,
	[PASSWORD_FIELD]: passwordSchema,
});

export const REGISTER_SCHEMA = z
	.object({
		[USER_NAME_FIELD]: userNameSchema,
		[PASSWORD_FIELD]: passwordSchema,
		[CONFIRM_PASSWORD_FIELD]: z.string(),
	})
	.refine((data) => data[PASSWORD_FIELD] === data[CONFIRM_PASSWORD_FIELD], {
		path: [CONFIRM_PASSWORD_FIELD],
		message: 'Entered passwords didn’t match',
	});

export type FormData = z.infer<typeof REGISTER_SCHEMA>;
