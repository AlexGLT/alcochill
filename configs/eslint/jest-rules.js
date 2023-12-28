import jestPlugin from 'eslint-plugin-jest';


// config for eslint-plugin-jest 27.2.3
/** @type {import('eslint').Linter.FlatConfig} */
export const jestRules = {
	files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
	plugins: {
		jest: jestPlugin,
	},
	rules: {

	},
};
