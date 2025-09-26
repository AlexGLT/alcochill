import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';

import {
	Button,
	Flex,
	Field,
	Input,
} from '@chakra-ui/react';

import {
	REGISTER_SCHEMA,
	LOGIN_SCHEMA,
	USER_NAME_FIELD,
	PASSWORD_FIELD,
	CONFIRM_PASSWORD_FIELD,
} from './schema';

import type {FC} from 'react';


const SIGN_IN_CAPTION = 'Sign in';
const SIGN_UP_CAPTION = 'Sign up';

export const AuthView: FC = () => {
	const [isLogin, setIsLogin] = useState(true);

	const {
		control,
		formState: {
			errors: {
				[USER_NAME_FIELD]: userNameError,
				[PASSWORD_FIELD]: passwordError,
				[CONFIRM_PASSWORD_FIELD]: confirmPasswordError,
			},
		},
		handleSubmit,
	} = useForm({
		mode: 'onBlur',
		resolver: zodResolver((
			isLogin
				? LOGIN_SCHEMA
				: REGISTER_SCHEMA
		) as typeof REGISTER_SCHEMA),
	});

	const toggleAuthType = (): void => {
		setIsLogin((previousIsLogin) => !previousIsLogin);
	};

	return (
		<Flex
			height="100%"
			width="100%"
			alignItems="center"
			justifyContent="center"
		>
			<form onSubmit={handleSubmit((data) => console.log(data))}>
				<Flex width="600px" flexDirection="column" gap="4">
					<Field.Root required={true} invalid={!!userNameError}>
						<Field.Label>
							Username <Field.RequiredIndicator/>
						</Field.Label>

						<Controller
							name={USER_NAME_FIELD}
							defaultValue=""
							control={control}
							render={({field}) => {
								return (
									<Input
										{...field}
										variant="subtle"
										placeholder="Enter your username"
									/>
								);
							}}
						/>

						{userNameError ? (
							<Field.ErrorText>
								{userNameError.message}
							</Field.ErrorText>
						) : null}
					</Field.Root>

					<Field.Root required={true} invalid={!!passwordError}>
						<Field.Label>
							Password <Field.RequiredIndicator/>
						</Field.Label>

						<Controller
							name={PASSWORD_FIELD}
							defaultValue=""
							control={control}
							render={({field}) => {
								return (
									<Input
										{...field}
										type="password"
										variant="subtle"
										placeholder="Enter your password"
									/>
								);
							}}
						/>

						{passwordError ? (
							<Field.ErrorText>
								{passwordError.message}
							</Field.ErrorText>
						) : null}
					</Field.Root>

					{!isLogin ? (
						<Field.Root required={true} invalid={!!confirmPasswordError}>
							<Field.Label>
								Confirm password <Field.RequiredIndicator/>
							</Field.Label>

							<Controller
								name={CONFIRM_PASSWORD_FIELD}
								shouldUnregister={true}
								defaultValue=""
								control={control}
								render={({field}) => {
									return (
										<Input
											{...field}
											type="password"
											variant="subtle"
											placeholder="Confirm your password"
										/>
									);
								}}
							/>

							{confirmPasswordError ? (
								<Field.ErrorText>
									{confirmPasswordError.message}
								</Field.ErrorText>
							) : null}
						</Field.Root>
					) : null}

					<Flex justifyContent="space-between">
						<Button variant="ghost" onClick={toggleAuthType}>
							{isLogin
								? SIGN_UP_CAPTION
								: SIGN_IN_CAPTION}
						</Button>

						<Button type="submit" colorPalette="blue">
							{isLogin
								? SIGN_IN_CAPTION
								: SIGN_UP_CAPTION}
							!
						</Button>
					</Flex>
				</Flex>
			</form>
		</Flex>
	);
};
