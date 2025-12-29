import {Controller, useFormContext} from 'react-hook-form';

import {Flex, Field, Input} from '@chakra-ui/react';

import {
	USER_NAME_FIELD,
	PASSWORD_FIELD,
	CONFIRM_PASSWORD_FIELD,
} from '../schema';

import type {FC} from 'react';
import type {FormData} from '../schema';


type Props = {
	isLoginAuth: boolean,
};

export const AuthForm: FC<Props> = ({isLoginAuth}) => {
	const {
		control,
		formState: {
			errors: {
				[USER_NAME_FIELD]: userNameError,
				[PASSWORD_FIELD]: passwordError,
				[CONFIRM_PASSWORD_FIELD]: confirmPasswordError,
			},
		},
	} = useFormContext<FormData>();

	return (
		<Flex flexDirection="column" gap="4">
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

			{!isLoginAuth ? (
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
		</Flex>
	);
};
