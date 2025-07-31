import {SEVERITY} from './constants.js';


// config for eslint-plugin-import-x 4.10.5
/** @type {import('eslint').Linter.Config.rules} */
export const importRules = {
	// ============================================
	// HELPFUL WARNINGS
	// ============================================

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/export.md
	'import-x/export': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-deprecated.md
	'import-x/no-deprecated': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-empty-named-blocks.md
	'import-x/no-empty-named-blocks': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md
	'import-x/no-extraneous-dependencies': [SEVERITY.ERROR, {
		devDependencies: true,
		optionalDependencies: false,
		peerDependencies: true,
		bundledDependencies: false,
		includeInternal: false,
		includeTypes: true,
	}],

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-mutable-exports.md
	'import-x/no-mutable-exports': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default.md
	'import-x/no-named-as-default': SEVERITY.WARN,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-as-default-member.md
	'import-x/no-named-as-default-member': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-rename-default.md
	'import-x/no-rename-default': SEVERITY.OFF,

	// TODO: return to this rule later
	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unused-modules.md
	// 'import-x/no-unused-modules': [SEVERITY.ERROR, {
	// 	missingExports: true,
	// 	unusedExports: false,
	// 	ignoreUnusedTypeExports: false,
	// }],
	'import-x/no-unused-modules': SEVERITY.OFF,

	// ============================================
	// MODULE SYSTEMS
	// ============================================

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-amd.md
	'import-x/no-amd': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-commonjs.md
	'import-x/no-commonjs': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-import-module-exports.md
	'import-x/no-import-module-exports': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-nodejs-modules.md
	'import-x/no-nodejs-modules': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/unambiguous.md
	'import-x/unambiguous': SEVERITY.OFF, // WHY: often gives false-positive results

	// ============================================
	// STATIC ANALYSIS
	// ============================================

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/default.md
	'import-x/default': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/named.md
	'import-x/named': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/namespace.md
	'import-x/namespace': [SEVERITY.ERROR, {
		allowComputed: true,
	}],

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-absolute-path.md
	'import-x/no-absolute-path': [SEVERITY.ERROR, {
		esmodule: true,
		commonjs: true,
		amd: true,
	}],

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md
	'import-x/no-cycle': SEVERITY.OFF, // WHY: this rule is very expensive

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-dynamic-require.md
	'import-x/no-dynamic-require': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-internal-modules.md
	'import-x/no-internal-modules': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-packages.md
	'import-x/no-relative-packages': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-parent-imports.md
	'import-x/no-relative-parent-imports': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-restricted-paths.md
	'import-x/no-restricted-paths': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-self-import.md
	'import-x/no-self-import': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unresolved.md
	'import-x/no-unresolved': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-useless-path-segments.md
	'import-x/no-useless-path-segments': [SEVERITY.ERROR, {
		noUselessIndex: true,
	}],

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-webpack-loader-syntax.md
	'import-x/no-webpack-loader-syntax': SEVERITY.OFF,

	// ============================================
	// STYLE GUIDE
	// ============================================

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/consistent-type-specifier-style.md
	'import-x/consistent-type-specifier-style': [SEVERITY.ERROR, 'prefer-top-level'],

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/dynamic-import-chunkname.md
	// 'import-x/dynamic-import-chunkname': [SEVERITY.ERROR, {
	// 	allowEmpty: true,
	// }],
	'import-x/dynamic-import-chunkname': SEVERITY.OFF, // WHY: triggers strange errors (TypeError: Cannot read properties of undefined (reading 'range'))

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/exports-last.md
	'import-x/exports-last': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
	'import-x/extensions': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/first.md
	'import-x/first': SEVERITY.ERROR,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/group-exports.md
	'import-x/group-exports': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/max-dependencies.md
	'import-x/max-dependencies': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md
	'import-x/newline-after-import': [SEVERITY.ERROR, {
		count: 2,
		considerComments: false,
	}],

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-anonymous-default-export.md
	'import-x/no-anonymous-default-export': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-default-export.md
	'import-x/no-default-export': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-duplicates.md
	'import-x/no-duplicates': [SEVERITY.ERROR, {
		'considerQueryString': true,
		'prefer-inline': false,
	}],

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-default.md
	'import-x/no-named-default': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-export.md
	'import-x/no-named-export': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-namespace.md
	'import-x/no-namespace': SEVERITY.OFF,

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-unassigned-import.md
	'import-x/no-unassigned-import': [SEVERITY.ERROR, {
		allow: [
			'**/*.css',
			'**/*.scss',
			'**/*.less',
			'**/*.styl',
		],
	}],

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md
	'import-x/order': [SEVERITY.ERROR, {
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
		pathGroups: [
			{
				pattern: '@*/**',
				group: 'internal',
				position: 'after',
			},
			{
				pattern: './**/*.{css,scss,less,styl}',
				group: 'index',
				position: 'after',
			},
		],
		pathGroupsExcludedImportTypes: ['builtin', 'external'],
		distinctGroup: true,
		warnOnUnassignedImports: true,
		sortTypesGroup: true,
		consolidateIslands: 'inside-groups',
		'newlines-between': 'always-and-inside-groups',
		"newlines-between-types": 'never', // should be never, but in this case it will require to remove newline before types
	}],

	// https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/prefer-default-export.md
	'import-x/prefer-default-export': SEVERITY.OFF,

	// ============================================
	// DEPRECATED OR RELATED TO OBSOLETE FUNCTIONAL
	// ============================================
};
