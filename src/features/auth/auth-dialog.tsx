import {FormProvider, useForm} from 'react-hook-form';
import {useState} from 'react';
import {StatusCodes} from 'http-status-codes';
import {useUnit} from 'effector-react';

import {
	Alert,
	Button,
	CloseButton,
	Dialog,
	Portal,
} from '@chakra-ui/react';

import {zodResolver} from '@hookform/resolvers/zod';
import {isApiError} from '@shared/errors';

import {LOGIN_SCHEMA, REGISTER_SCHEMA} from './schema';
import {AuthForm} from './ui';
import {model} from './model';

import type {FC} from 'react';
import type {FormData} from './schema';


const SIGN_IN_CAPTION = 'Sign in';
const SIGN_UP_CAPTION = 'Sign up';

export const AuthDialog: FC = () => {
	const [
		activeAuthType,
		isAuthorized,
	] = useUnit([
		model.$authType,
		model.$isAuthorized,
		model.$isAuthorizing,
	]);

	const [
		toggleAuthType,
		submitAuth,
		logoutUser,
	] = useUnit([
		model.authTypeToggled,
		model.submitAuthFx,
		model.logoutRequested,
	]);

	const isLoginAuth = activeAuthType === 'login';

	const formMethods = useForm<FormData>({
		mode: 'onBlur',
		resolver: zodResolver((
			isLoginAuth
				? LOGIN_SCHEMA
				: REGISTER_SCHEMA
		) as typeof REGISTER_SCHEMA),
	});

	const {
		formState: {
			isSubmitting,
			errors,
		},
		handleSubmit,
		setError,
		clearErrors,
		reset,
	} = formMethods;

	// ==================

	const [isOpen, setIsOpen] = useState(false);

	const onSubmit = async (credentials: FormData): Promise<void> => {
		try {
			await submitAuth(credentials);

			setIsOpen(false);
		} catch (error) {
			if (isApiError(error)) {
				if (error.status === StatusCodes.CONFLICT) {
					setError('userName', {
						type: 'server',
						message: 'This username is already taken',
					});

					return;
				}

				if (error.status === StatusCodes.UNAUTHORIZED) {
					setError('root', {
						type: 'server',
						message: 'Incorrect login or password!',
					});

					return;
				}
			}

			setError('root', {
				type: 'server',
				message: 'Something went wrong...',
			});
		}
	};

	const onChange = (): void => {
		clearErrors('root');
	};

	const onExitComplete = (): void => {
		reset();
		toggleAuthType();
	};

	return (
		<Dialog.Root
			lazyMount={true}
			placement="center"
			open={isOpen}
			onOpenChange={(event) => setIsOpen(event.open)}
			onExitComplete={onExitComplete}
		>
			{isAuthorized ? (
				<Button variant="surface" onClick={logoutUser}>
					Sign out
				</Button>
			) : (
				<Dialog.Trigger asChild={true}>
					<Button variant="surface">
						Sign in
					</Button>
				</Dialog.Trigger>
			)}

			<Portal>
				<Dialog.Backdrop/>

				<Dialog.Positioner>
					<Dialog.Content width="600px">
						<FormProvider {...formMethods}>
							<form onChange={onChange} onSubmit={handleSubmit(onSubmit)}>
								<Dialog.Header>
									<Dialog.Title>
										{isLoginAuth
											? SIGN_IN_CAPTION
											: SIGN_UP_CAPTION}
									</Dialog.Title>
								</Dialog.Header>

								{errors.root ? (
									<Alert.Root status="error" size="sm">
										<Alert.Indicator/>

										<Alert.Content>
											<Alert.Description>
												{errors.root.message}
											</Alert.Description>
										</Alert.Content>
									</Alert.Root>
								) : null}

								<Dialog.Body>
									<AuthForm isLoginAuth={isLoginAuth}/>
								</Dialog.Body>

								<Dialog.Footer justifyContent="space-between">
									<Button
										variant="ghost"
										disabled={isSubmitting}
										onClick={toggleAuthType}
									>
										{isLoginAuth
											? SIGN_UP_CAPTION
											: SIGN_IN_CAPTION}
									</Button>

									<Button
										type="submit"
										colorPalette="blue"
										loading={isSubmitting}
									>
										{isLoginAuth
											? SIGN_IN_CAPTION
											: SIGN_UP_CAPTION}
										!
									</Button>
								</Dialog.Footer>

								<Dialog.CloseTrigger asChild={true}>
									<CloseButton size="sm"/>
								</Dialog.CloseTrigger>
							</form>
						</FormProvider>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};
