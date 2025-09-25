import {useLayoutEffect, useState} from 'react';

import {
	Button,
	Flex,
	Field,
	Input,
} from '@chakra-ui/react';

import type {FC} from 'react';


const EMPTY_VALUE = '';
const SIGN_IN_CAPTION = 'Sign in';
const SIGN_UP_CAPTION = 'Sign up';

export const AuthView: FC = () => {
	const [isLogin, setIsLogin] = useState(true);

	const [username, setUsername] = useState(EMPTY_VALUE);
	const [password, setPassword] = useState(EMPTY_VALUE);
	const [doublePassword, setDoublePassword] = useState(EMPTY_VALUE);

	const toggleAuthType = (): void => {
		setIsLogin((previousIsLogin) => !previousIsLogin);
	};

	useLayoutEffect(() => {
		setDoublePassword(EMPTY_VALUE);
	}, [isLogin]);

	return (
		<Flex
			height="100%"
			width="100%"
			alignItems="center"
			justifyContent="center"
		>
			<Flex width="600px" flexDirection="column" gap="4">
				<Field.Root required={true}>
					<Field.Label>
						Username <Field.RequiredIndicator/>
					</Field.Label>

					<Input
						variant="subtle"
						placeholder="Enter your username"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
				</Field.Root>

				<Field.Root required={true}>
					<Field.Label>
						Password <Field.RequiredIndicator/>
					</Field.Label>

					<Input
						type="password"
						variant="subtle"
						placeholder="Enter your password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</Field.Root>

				{!isLogin ? (
					<Field.Root required={true}>
						<Field.Label>
							Confirm password <Field.RequiredIndicator/>
						</Field.Label>

						<Input
							type="password"
							variant="subtle"
							placeholder="Enter your password once again"
							value={doublePassword}
							onChange={(event) => setDoublePassword(event.target.value)}
						/>
					</Field.Root>
				) : null}

				<Flex justifyContent="space-between">
					<Button variant="ghost" onClick={toggleAuthType}>
						{isLogin
							? SIGN_UP_CAPTION
							: SIGN_IN_CAPTION}
					</Button>

					<Button colorPalette="blue">
						{isLogin
							? SIGN_IN_CAPTION
							: SIGN_UP_CAPTION}
						!
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};
