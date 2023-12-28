import reactRefreshPlugin from 'eslint-plugin-react-refresh';

import {SEVERITY} from './constants.js';


// config for eslint-plugin-react-refresh 0.4.5
/** @type {import('eslint').Linter.FlatConfig} */
export const reactRefreshRules = {
	files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
	plugins: {
		'react-refresh': reactRefreshPlugin,
	},
	rules: {
		'react-refresh/only-export-components': [SEVERITY.WARN, {
			allowConstantExport: true,
		}],
	},
};
