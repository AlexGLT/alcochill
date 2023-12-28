import importPlugin from 'eslint-plugin-import';

import {SEVERITY} from './constants.js';


// config for eslint-plugin-import 2.28.1
/** @type {import('eslint').Linter.FlatConfig} */
export const importRules = {
	files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
	plugins: {
		import: importPlugin,
	},
	rules: {
		// ============================================
		// HELPFUL WARNINGS
		// ============================================

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md
		'import/export': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-deprecated.md
		'import/no-deprecated': SEVERITY.WARN,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-empty-named-blocks.md
		'import/no-empty-named-blocks': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
		'import/no-extraneous-dependencies': [SEVERITY.ERROR, {
			devDependencies: true,
			optionalDependencies: false,
			peerDependencies: true,
			bundledDependencies: false,
		}],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md
		'import/no-mutable-exports': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default.md
		'import/no-named-as-default': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default-member.md
		'import/no-named-as-default-member': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md
		// 'import/no-unused-modules': [SEVERITY.ERROR, {
		// 	missingExports: true,
		// 	unusedExports: true,
		// }],

		// ============================================
		// MODULE SYSTEMS
		// ============================================

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-amd.md
		'import/no-amd': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-commonjs.md
		'import/no-commonjs': [SEVERITY.WARN, {
			allowRequire: false,
			allowConditionalRequire: false,
			allowPrimitiveModules: false,
		}],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-import-module-exports.md
		'import/no-import-module-exports': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-nodejs-modules.md
		'import/no-nodejs-modules': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/unambiguous.md
		'import/unambiguous': SEVERITY.ERROR,

		// Static analysis

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/default.md
		'import/default': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md
		'import/named': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
		'import/namespace': [SEVERITY.ERROR, {
			allowComputed: false,
		}],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md
		'import/no-absolute-path': [SEVERITY.ERROR, {
			esmodule: true,
			commonjs: true,
			amd: true,
		}],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
		'import/no-cycle': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-dynamic-require.md
		'import/no-dynamic-require': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-internal-modules.md
		'import/no-internal-modules': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-packages.md
		'import/no-relative-packages': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-parent-imports.md
		'import/no-relative-parent-imports': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md
		'import/no-restricted-paths': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md
		'import/no-self-import': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
		'import/no-unresolved': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md
		'import/no-useless-path-segments': [SEVERITY.ERROR, {
			noUselessIndex: true,
		}],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-webpack-loader-syntax.md
		'import/no-webpack-loader-syntax': SEVERITY.ERROR,

		// ============================================
		// Style guide
		// ============================================

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md
		'import/consistent-type-specifier-style': [SEVERITY.ERROR, 'prefer-top-level'],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/dynamic-import-chunkname.md
		'import/dynamic-import-chunkname': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/exports-last.md
		'import/exports-last': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
		'import/extensions': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
		'import/first': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/group-exports.md
		'import/group-exports': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/max-dependencies.md
		'import/max-dependencies': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
		'import/newline-after-import': [SEVERITY.ERROR, {
			count: 2,
			considerComments: true,
		}],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
		'import/no-anonymous-default-export': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
		'import/no-default-export': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
		'no-duplicate-imports': SEVERITY.OFF,
		'import/no-duplicates': [SEVERITY.ERROR, {
			'prefer-inline': false,
		}],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-default.md
		'import/no-named-default': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-export.md
		'import/no-named-export': SEVERITY.OFF,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-namespace.md
		'import/no-namespace': SEVERITY.ERROR,

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unassigned-import.md
		'import/no-unassigned-import': [SEVERITY.ERROR, {
			allow: [
				'**/*.css',
				'**/*.scss',
				'**/*.less',
				'**/*.styl',
			],
		}],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
		'import/order': [SEVERITY.ERROR, {
			groups: [
				'builtin',
				'external',
				'internal',
				'parent',
				'sibling',
				'index',
				'object',
				'type',
			],

			// 'newlines-between': 'always',
			'newlines-between': 'always-and-inside-groups',
		}],

		// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
		'import/prefer-default-export': SEVERITY.OFF,
	},
};
