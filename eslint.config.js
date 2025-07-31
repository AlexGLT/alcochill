import globals from 'globals';
import {defineConfig} from 'eslint/config';
import typescriptEslint from 'typescript-eslint';
import stylisticPlugin from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import-x';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import {createTypeScriptImportResolver} from 'eslint-import-resolver-typescript'

import {
	baseRules,
	typescriptRules,
	stylisticRules,
	importRules,
	reactRules,
	reactHooksRules,
	reactRefreshRules,
	SEVERITY,
} from './configs/eslint/index.js';


const files = [
	'./src/**/*.{ts,tsx}',
	'./scripts/**/*.{ts,tsx}',
];

/** @type {import('eslint').Linter.Config} */
const typescriptConfig = {
	files,
	plugins: {
		'typescript': typescriptEslint.plugin,
		'stylistic': stylisticPlugin,
		'import-x': importPlugin,
		'react': reactPlugin,
		'react-hooks': reactHooksPlugin,
	},
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: typescriptEslint.parser,
		parserOptions: {
			ecmaVersion: 'latest',
			ecmaFeatures: {
				globalReturn: false,
				impliedStrict: true,
			},
			projectService: true,
			project: './tsconfig.json',
		},
		globals: {
			...globals.browser,
		},
	},
	rules: {
		...baseRules,
		...typescriptRules,
	},
};

/** @type {import('eslint').Linter.Config} */
const importConfig = {
	files,
	name: 'import-x',
	plugins: {
		'import-x': importPlugin,
	},
	rules: importRules,
	settings: {
		'import-x/extensions':  ['.js', '.jsx', '.ts', '.tsx'],
		'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
		'import-x/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import-x/resolver-next': [
			createTypeScriptImportResolver(),
		],
	},
};

/** @type {import('eslint').Linter.Config} */
const stylisticConfig = {
	files,
	plugins: {
		'stylistic': stylisticPlugin,
	},
	rules: stylisticRules,
};

/** @type {import('eslint').Linter.Config} */
const reactConfig = {
	files,
	plugins: {
		'react': reactPlugin,
		'react-hooks': reactHooksPlugin,
	},
	languageOptions: {
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
			jsxPragma: null,
		},
	},
	rules: {
		...reactRules,
		...reactHooksRules,
	},
	settings: {
		react: {
			version: 'detect',
		}
	},
};

/** @type {import('eslint').Linter.Config} */
const reactRefreshConfig = {
	files: ['./src/**/*.{jsx,tsx}'],
	plugins: {
		'react-refresh': reactRefreshPlugin,
	},
	rules: {
		...reactRefreshRules,
	},
};

/** @type {import('eslint').Linter.Config} */
const ignoreConfig = {
	ignores: [
		'dist',
		'.vscode',
		'./server',
		'**/*.config.js',
		'**/*.config.ts',
		'**/env.d.ts',
	],
};

/** @type {import('eslint').Linter.Config.rules} */
const typescriptOverridesConfig = {
	files,
	rules: {
		'class-methods-use-this': SEVERITY.OFF,
		'consistent-return': SEVERITY.OFF,
		'default-param-last': SEVERITY.OFF,
		'dot-notation': SEVERITY.OFF,
		'init-declarations': SEVERITY.OFF,
		'no-array-constructor': SEVERITY.OFF,
		'no-class-assign': SEVERITY.OFF,
		'no-const-assign': SEVERITY.OFF,
		'no-dupe-args': SEVERITY.OFF,
		'no-dupe-class-members': SEVERITY.OFF,
		'no-dupe-keys': SEVERITY.OFF,
		'no-empty-function': SEVERITY.OFF,
		'no-func-assign': SEVERITY.OFF,
		'no-implied-eval': SEVERITY.OFF,
		'no-import-assign': SEVERITY.OFF,
		'no-invalid-this': SEVERITY.OFF,
		'no-loop-func': SEVERITY.OFF,
		'no-magic-numbers': SEVERITY.OFF,
		'no-new-native-nonconstructor': SEVERITY.OFF,
		'no-obj-calls': SEVERITY.OFF,
		'no-setter-return': SEVERITY.OFF,
		'no-this-before-super': SEVERITY.OFF,
		'no-undef': SEVERITY.OFF,
		'no-unsafe-negation': SEVERITY.OFF,
		'no-unused-vars': SEVERITY.OFF,
		'no-redeclare': SEVERITY.OFF,
		'no-restricted-imports': SEVERITY.OFF,
		'no-return-await': SEVERITY.OFF,
		'no-shadow': SEVERITY.OFF,
		'no-unused-expressions': SEVERITY.OFF,
		'no-unused-vars': SEVERITY.OFF,
		'no-use-before-define': SEVERITY.OFF,
		'no-useless-constructor': SEVERITY.OFF,
		'max-params': SEVERITY.OFF,
		'only-throw-error': SEVERITY.OFF,
		'prefer-destructuring': SEVERITY.OFF,
		'prefer-promise-reject-errors': SEVERITY.OFF,
		'require-await': SEVERITY.OFF,

		'import-x/export': SEVERITY.OFF,
		'import-x/no-deprecated': SEVERITY.OFF,
		'import-x/no-mutable-exports': SEVERITY.OFF,
		'import-x/named': SEVERITY.OFF,
		'import-x/namespace': SEVERITY.OFF,
		'import-x/no-unresolved': SEVERITY.OFF,

		'react/jsx-no-undef': SEVERITY.OFF,
		'react/jsx-uses-vars': SEVERITY.OFF,
		'react/no-deprecated': SEVERITY.OFF,
		'react/no-invalid-html-attribute': SEVERITY.OFF,
		'react/no-namespace': SEVERITY.OFF,
		'react/no-unknown-property': SEVERITY.OFF,
		'react/prop-types': SEVERITY.OFF,
		'react/style-prop-object': SEVERITY.OFF,
	},
};

export default defineConfig([
	typescriptConfig,
	importConfig,
	stylisticConfig,
	reactConfig,
	reactRefreshConfig,
	typescriptOverridesConfig,
	ignoreConfig,
]);
