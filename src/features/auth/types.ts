export type UserSession = {
	accessToken: string,
	expiresAt: Date,
};

export type UserCredentials = {
	userName: string,
	password: string,
};

export type AuthType = 'login' | 'register';
