import {
	Toaster as ChakraToaster,
	Portal,
	Spinner,
	Stack,
	Toast,
} from '@chakra-ui/react';

import {toaster} from './constants';

import type {FC} from 'react';


export const Toaster: FC = () => {
	return (
		<Portal>
			<ChakraToaster toaster={toaster} insetInline={{mdDown: '4'}}>
				{(toast) => (
					<Toast.Root width={{md: 'sm'}} fontSize="xs">
						{toast.type === 'loading'
							? <Spinner size="sm" color="blue.solid"/>
							: <Toast.Indicator/>}

						<Stack gap="1" flex="1" maxWidth="100%">
							{toast.title
								? <Toast.Title>{toast.title}</Toast.Title>
								: null}

							{toast.description
								? <Toast.Description>{toast.description}</Toast.Description>
								: null}
						</Stack>

						{toast.action
							? <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
							: null}

						{toast.closable
							? <Toast.CloseTrigger/>
							: null}
					</Toast.Root>
				)}
			</ChakraToaster>
		</Portal>
	);
};
