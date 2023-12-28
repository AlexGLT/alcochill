import reactHooksPlugin from 'eslint-plugin-react-hooks';


// config for eslint-plugin-react-hooks 4.6.0
/** @type {import('eslint').Linter.FlatConfig} */
export const reactHooksRules = {
	files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
	plugins: {
		'react-hooks': reactHooksPlugin,
	},
	rules: {

	},
};
