import accesibilityPlugin from 'eslint-plugin-jsx-a11y';


// config for eslint-plugin-jsx-a11y 6.7.1
/** @type {import('eslint').Linter.FlatConfig} */
export const accesibilityRules = {
	files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
	plugins: {
		accesibility: accesibilityPlugin,
	},
	rules: {

	},
};
