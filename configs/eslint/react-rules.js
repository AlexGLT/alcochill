import reactPlugin from 'eslint-plugin-react';


// config for eslint-plugin-react 7.33.2
/** @type {import('eslint').Linter.FlatConfig} */
export const reactRules = {
	files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
	plugins: {
		react: reactPlugin,
	},
	rules: {

	},
};
