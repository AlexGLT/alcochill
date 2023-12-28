import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

import {
	baseRules,
	typescriptRules,
	stylisticRules,
	importRules,
	reactRules,
	reactHooksRules,
	reactRefreshRules,
	accesibilityRules,
	jestRules
} from './configs/eslint/index.js';


const SEVERITY = {
	OFF: 'off',
	WARN: 'warn',
	ERROR: 'error',
};

/** @type {import('eslint').Linter.FlatConfig} */
const jsConfig = {
	files: ['**/*.js', '**/*.jsx'],
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		globals: {
			...globals.browser,
		},
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			ecmaFeatures: {
				jsx: true,
				globalReturn: false,
				impliedStrict: true,
			},
		},
	},
	plugins: {
		'import': importPlugin,
	},
	settings: {
		'import/parsers': {
			espree: ['.js', '.jsx'],
		},
	},
};

/** @type {import('eslint').Linter.FlatConfig} */
const tsConfig = {
	files: ['**/*.ts', '**/*.tsx'],
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		globals: {
			...globals.browser,
		},
		parser: typescriptParser,
		parserOptions: {
			ecmaVersion: 'latest',
			ecmaFeatures: {
				jsx: true,
				globalReturn: false,
				impliedStrict: true,
			},
			project: './tsconfig.json',
		},
	},
	plugins: {
		'import': importPlugin,
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: './tsconfig.json',
			},
		},
	},
};

const ignoreConfig = {
	ignores: [
		'dist',
		'.vscode',
		'**/*.config.js',
		'**/*.config.ts',
		'env.d.ts',
	],
};

export default [
	ignoreConfig,
	jsConfig,
	tsConfig,
	baseRules,
	typescriptRules,
	stylisticRules,
	importRules,
	reactRules,
	reactHooksRules,
	reactRefreshRules,
	accesibilityRules,
	jestRules,
];
