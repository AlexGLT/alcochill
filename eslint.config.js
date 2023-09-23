import globals from 'globals';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import imports from 'eslint-plugin-import';


const SEVERITY = {
	OFF: 'off',
	WARN: 'warn',
	ERROR: 'error',
};

// config for ESLint 8.48.0
const commonConfig = {
	languageOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		globals: {
			...globals.browser,
		},
	},
	plugins: {
		'react': react,
		'react-refresh': reactRefresh,
		'react-hooks': reactHooks,
		'import': imports,
	},
	settings: {
		'import/parsers': {
			espree: ['.js', '.jsx'],
		},
	},
	rules: {
		'react-refresh/only-export-components': [SEVERITY.WARN, {
			allowConstantExport: true,
		}],

		'array-callback-return': SEVERITY.ERROR,
		'constructor-super': SEVERITY.ERROR,
		'for-direction': SEVERITY.ERROR,
		'getter-return': SEVERITY.ERROR,
		'no-async-promise-executor': SEVERITY.ERROR,
		'no-await-in-loop': SEVERITY.WARN,
		'no-class-assign': SEVERITY.ERROR,
		'no-compare-neg-zero': SEVERITY.ERROR,
		'no-cond-assign': SEVERITY.ERROR,
		'no-const-assign': SEVERITY.ERROR,
		'no-constant-binary-expression': SEVERITY.ERROR,
		'no-constant-condition': SEVERITY.ERROR,
		'no-constructor-return': SEVERITY.ERROR,
		'no-debugger': SEVERITY.ERROR,
		'no-dupe-args': SEVERITY.ERROR,
		'no-dupe-class-members': SEVERITY.ERROR,
		'no-dupe-else-if': SEVERITY.ERROR,
		'no-dupe-keys': SEVERITY.ERROR,
		'no-duplicate-case': SEVERITY.ERROR,
		'no-duplicate-imports': SEVERITY.ERROR,
		'no-empty-character-class': SEVERITY.ERROR,
		'no-empty-pattern': SEVERITY.ERROR,
		'no-ex-assign': SEVERITY.ERROR,
		'no-fallthrough': [SEVERITY.ERROR, {
			allowEmptyCase: true,
		}],
		'no-func-assign': SEVERITY.ERROR,
		'no-import-assign': SEVERITY.ERROR,
		'no-inner-declarations': [SEVERITY.ERROR, 'both'],
		'no-invalid-regexp': SEVERITY.ERROR,
		'no-irregular-whitespace': [SEVERITY.ERROR, {
			skipStrings: true,
			skipRegExps: true,
			skipTemplates: true,
			skipJSXText: true,
		}],
		'no-loss-of-precision': SEVERITY.ERROR,
		'no-misleading-character-class': SEVERITY.ERROR,
		'no-new-native-nonconstructor': SEVERITY.ERROR,
		'no-obj-calls': SEVERITY.ERROR,
		'no-promise-executor-return': [SEVERITY.ERROR, {
			allowVoid: true,
		}],
		'no-prototype-builtins': SEVERITY.ERROR,
		'no-self-assign': SEVERITY.ERROR,
		'no-self-compare': SEVERITY.ERROR,
		'no-setter-return': SEVERITY.ERROR,
		'no-sparse-arrays': SEVERITY.ERROR,
		'no-template-curly-in-string': SEVERITY.ERROR,
		'no-this-before-super': SEVERITY.ERROR,
		'no-undef': SEVERITY.ERROR,
		'no-unexpected-multiline': SEVERITY.ERROR,
		'no-unmodified-loop-condition': SEVERITY.ERROR,
		'no-unreachable': SEVERITY.ERROR,
		'no-unreachable-loop': SEVERITY.ERROR,
		'no-unsafe-finally': SEVERITY.ERROR,
		'no-unsafe-negation': SEVERITY.ERROR,
		'no-unsafe-optional-chaining': [SEVERITY.ERROR, {
			disallowArithmeticOperators: true,
		}],
		'no-unused-private-class-members': SEVERITY.ERROR,
		'no-unused-vars': [SEVERITY.ERROR, {
			vars: 'all',
			varsIgnorePattern: '^_',
			args: 'none',
			caughtErrors: 'all',
			destructuredArrayIgnorePattern: '^_',
			ignoreRestSiblings: true,
		}],
		'no-use-before-define': SEVERITY.ERROR,
		'no-useless-backreference': SEVERITY.ERROR,
		'require-atomic-updates': [SEVERITY.ERROR, {
			allowProperties: true,
		}],
		'use-isnan': SEVERITY.ERROR,
		'valid-typeof': SEVERITY.ERROR,
		'accessor-pairs': SEVERITY.ERROR,
		'arrow-body-style': SEVERITY.OFF,
		'camelcase': SEVERITY.WARN,
		'capitalized-comments': SEVERITY.OFF,
		'class-methods-use-this': SEVERITY.OFF,
		'complexity': SEVERITY.OFF,
		'consistent-return': SEVERITY.ERROR,
		'consistent-this': SEVERITY.OFF,
		'curly': SEVERITY.ERROR,
		'default-case': SEVERITY.ERROR,
		'default-case-last': SEVERITY.ERROR,
		'default-param-last': SEVERITY.OFF,
		'dot-notation': SEVERITY.ERROR,
		'eqeqeq': SEVERITY.ERROR,
		'func-name-matching': SEVERITY.OFF,
		'func-names': SEVERITY.OFF,
		'func-style': [SEVERITY.ERROR, 'expression'],
		'grouped-accessor-pairs': [SEVERITY.WARN, 'getBeforeSet'],
		'guard-for-in': SEVERITY.ERROR,
		'id-denylist': SEVERITY.OFF,
		'id-length': SEVERITY.OFF,
		'id-match': SEVERITY.OFF,
		'init-declarations': SEVERITY.OFF,
		'logical-assignment-operators': SEVERITY.WARN,
		'max-classes-per-file': SEVERITY.OFF,
		'max-depth': SEVERITY.OFF,
		'max-lines': SEVERITY.OFF,
		'max-lines-per-function': SEVERITY.OFF,
		'max-nested-callbacks': SEVERITY.OFF,
		'max-params': [SEVERITY.ERROR, 3],
		'max-statements': SEVERITY.OFF,
		'multiline-comment-style': SEVERITY.WARN,
		'new-cap': SEVERITY.OFF,
		'no-alert': SEVERITY.ERROR,
		'no-array-constructor': SEVERITY.OFF,
		'no-bitwise': SEVERITY.OFF,
		'no-caller': SEVERITY.ERROR,
		'no-case-declarations': SEVERITY.ERROR,
		'no-confusing-arrow': SEVERITY.ERROR,
		'no-console': SEVERITY.ERROR,
		'no-continue': SEVERITY.OFF,
		'no-delete-var': SEVERITY.OFF,
		'no-div-regex': SEVERITY.ERROR,
		'no-else-return': SEVERITY.ERROR,
		'no-empty': [SEVERITY.ERROR, {
			allowEmptyCatch: true,
		}],
		'no-empty-function': [SEVERITY.ERROR, {
			allow: ['arrowFunctions'],
		}],
		'no-empty-static-block': SEVERITY.ERROR,
		'no-eq-null': SEVERITY.ERROR,
		'no-eval': SEVERITY.ERROR,
		'no-extend-native': SEVERITY.ERROR,
		'no-extra-bind': SEVERITY.ERROR,
		'no-extra-boolean-cast': SEVERITY.ERROR,
		'no-extra-label': SEVERITY.ERROR,
		'no-extra-semi': SEVERITY.ERROR,
		'no-floating-decimal': SEVERITY.ERROR,
		'no-global-assign': SEVERITY.ERROR,
		'no-implicit-coercion': [SEVERITY.ERROR, {
			boolean: false,
		}],
		'no-implicit-globals': SEVERITY.ERROR,
		'no-implied-eval': SEVERITY.ERROR,
		'no-inline-comments': SEVERITY.OFF,
		'no-invalid-this': SEVERITY.ERROR,
		'no-iterator': SEVERITY.ERROR,
		'no-label-var': SEVERITY.ERROR,
		'no-labels': [SEVERITY.ERROR, {
			allowLoop: true,
		}],
		'no-lone-blocks': SEVERITY.ERROR,
		'no-lonely-if': SEVERITY.ERROR,
		'no-loop-func': SEVERITY.ERROR,
		'no-magic-numbers': [SEVERITY.ERROR, {
			enforceConst: true,
			ignoreArrayIndexes: true,
			ignoreDefaultValues: false,
			ignoreClassFieldInitialValues: false,
			detectObjects: false,
			ignore: [0, 1],
		}],
		'no-mixed-operators': SEVERITY.ERROR,
		'no-multi-assign': SEVERITY.OFF,
		'no-multi-str': SEVERITY.ERROR,
		'no-negated-condition': SEVERITY.ERROR,
		'no-nested-ternary': SEVERITY.ERROR,
		'no-new': SEVERITY.ERROR,
		'no-new-func': SEVERITY.ERROR,
		'no-new-object': SEVERITY.ERROR,
		'no-new-wrappers': SEVERITY.ERROR,
		'no-nonoctal-decimal-escape': SEVERITY.ERROR,
		'no-octal': SEVERITY.OFF,
		'no-octal-escape': SEVERITY.ERROR,
		'no-param-reassign': [SEVERITY.ERROR, {
			props: false,
		}],
		'no-plusplus': SEVERITY.OFF,
		'no-proto': SEVERITY.ERROR,
		'no-redeclare': SEVERITY.ERROR,
		'no-regex-spaces': SEVERITY.ERROR,
		'no-restricted-exports': SEVERITY.OFF,
		'no-restricted-globals': SEVERITY.OFF,
		'no-restricted-imports': SEVERITY.OFF,
		'no-restricted-properties': SEVERITY.OFF,
		'no-return-assign': SEVERITY.ERROR,
		'no-script-url': SEVERITY.ERROR,
		'no-sequences': SEVERITY.ERROR,
		'no-shadow': [SEVERITY.ERROR, {
			builtinGlobals: false,
			hoist: 'all',
		}],
		'no-ternary': SEVERITY.OFF,
		'no-throw-literal': SEVERITY.ERROR,
		'no-undef-init': SEVERITY.ERROR,
		'no-undefined': SEVERITY.ERROR,
		'no-underscore-dangle': SEVERITY.OFF,
		'no-unneeded-ternary': SEVERITY.ERROR,
		'no-unused-expressions': [SEVERITY.ERROR, {
			enforceForJSX: true,
		}],
		'no-unused-labels': SEVERITY.ERROR,
		'no-useless-call': SEVERITY.ERROR,
		'no-useless-catch': SEVERITY.ERROR,
		'no-useless-computed-key': [SEVERITY.ERROR, {
			enforceForClassMembers: true,
		}],
		'no-useless-concat': SEVERITY.ERROR,
		'no-useless-constructor': SEVERITY.ERROR,
		'no-useless-escape': SEVERITY.ERROR,
		'no-useless-rename': SEVERITY.ERROR,
		'no-useless-return': SEVERITY.ERROR,
		'no-var': SEVERITY.ERROR,
		'no-void': SEVERITY.OFF,
		'no-warning-comments': [SEVERITY.WARN, {
			terms: ['TEMP'],
		}],
		'no-with': SEVERITY.ERROR,
		// 'object-shorthand': [SEVERITY.ERROR, 'consistent-as-needed'],
		'object-shorthand': SEVERITY.OFF,
		'one-var': SEVERITY.OFF,
		'one-var-declaration-per-line': [SEVERITY.ERROR, 'initializations'],
		'operator-assignment': SEVERITY.ERROR,
		'prefer-arrow-callback': SEVERITY.ERROR,
		'prefer-const': [SEVERITY.ERROR, {
			ignoreReadBeforeAssign: true,
		}],
		'prefer-destructuring': SEVERITY.OFF,
		'prefer-exponentiation-operator': SEVERITY.ERROR,
		'prefer-named-capture-group': SEVERITY.ERROR,
		'prefer-numeric-literals': SEVERITY.OFF,
		'prefer-object-has-own': SEVERITY.ERROR,
		'prefer-object-spread': SEVERITY.ERROR,
		'prefer-promise-reject-errors': SEVERITY.OFF,
		'prefer-regex-literals': SEVERITY.OFF,
		'prefer-rest-params': SEVERITY.ERROR,
		'prefer-spread': SEVERITY.ERROR,
		'prefer-template': SEVERITY.ERROR,
		'quote-props': [SEVERITY.ERROR, 'as-needed', {
			keywords: false,
			numbers: false,
		}],
		'radix': [SEVERITY.ERROR, 'as-needed'],
		'require-await': SEVERITY.ERROR,
		'require-unicode-regexp': SEVERITY.OFF,
		'require-yield': SEVERITY.OFF,
		'sort-imports': SEVERITY.OFF,
		'sort-keys': SEVERITY.OFF,
		'sort-vars': SEVERITY.OFF,
		'spaced-comment': SEVERITY.ERROR,
		'symbol-description': SEVERITY.ERROR,
		'vars-on-top': SEVERITY.ERROR,
		'yoda': [SEVERITY.ERROR, 'never', {
			exceptRange: true,
		}],

		'array-bracket-newline': [SEVERITY.ERROR,'consistent'],
		'array-bracket-spacing': [SEVERITY.ERROR, 'never'],
		'array-element-newline': [SEVERITY.ERROR, 'consistent', {
			multiline: true,
		}],
		'arrow-parens': [SEVERITY.ERROR, 'always', {
			requireForBlockBody: true,
		}],
		'arrow-spacing': [SEVERITY.ERROR, {
			before: true,
			after: true,
		}],
		'block-spacing': [SEVERITY.ERROR, 'always'],
		'brace-style': [SEVERITY.ERROR, '1tbs',{
			allowSingleLine: true,
		}],
		'comma-dangle': [SEVERITY.ERROR, 'only-multiline'],
		'comma-spacing': [SEVERITY.ERROR,{
			before: false,
			after: true,
		}],
		'comma-style': [SEVERITY.ERROR, 'last'],
		'computed-property-spacing': [SEVERITY.ERROR, 'never'],
		'dot-location': [SEVERITY.ERROR, 'property'],
		'eol-last': [SEVERITY.ERROR, 'always'],
		'func-call-spacing': [SEVERITY.ERROR, 'never'],
		'function-call-argument-newline': [SEVERITY.ERROR, 'consistent'],
		'function-paren-newline': [SEVERITY.ERROR, 'multiline-arguments'],
		'generator-star-spacing': [SEVERITY.ERROR, {
			before: false,
			after: true,
			anonymous: 'neither',
		}],
		'implicit-arrow-linebreak': [SEVERITY.ERROR, 'beside'],
		'indent': [SEVERITY.ERROR, 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 'first',
		}],
		'jsx-quotes': [SEVERITY.ERROR, 'prefer-double'],
		'key-spacing': [SEVERITY.ERROR, {
			beforeColon: false,
			afterColon: true,
			mode: 'strict',
		}],
		'keyword-spacing': [SEVERITY.ERROR, {
			before: true,
			after: true,
		}],
		'line-comment-position': SEVERITY.OFF,
		'linebreak-style': [SEVERITY.ERROR, 'unix'],
		'lines-around-comment': [SEVERITY.WARN, {
			beforeBlockComment: true,
			afterBlockComment: false,
			beforeLineComment: true,
			afterLineComment: false,
			allowBlockStart: true,
			allowBlockEnd: true,
			allowClassStart: true,
			allowClassEnd: true,
			allowObjectStart: true,
			allowObjectEnd: true,
			allowArrayStart: true,
			allowArrayEnd: true,
		}],
		'lines-between-class-members': [SEVERITY.ERROR, 'always', {
			exceptAfterSingleLine: true,
		}],
		'max-len': [SEVERITY.ERROR, 120, 4],
		'max-statements-per-line': SEVERITY.OFF,
		'multiline-ternary': SEVERITY.OFF,
		'new-parens': [SEVERITY.ERROR, 'always'],
		'newline-per-chained-call': [SEVERITY.ERROR, {
			ignoreChainWithDepth: 3,
		}],
		'no-extra-parens': SEVERITY.OFF,
		'no-mixed-spaces-and-tabs': [SEVERITY.ERROR, 'smart-tabs'],
		'no-multi-spaces': SEVERITY.ERROR,
		'no-multiple-empty-lines': [SEVERITY.ERROR, {
			max: 2,
			maxEOF: 1,
			maxBOF: 1,
		}],
		'no-tabs': SEVERITY.OFF,
		'no-trailing-spaces': [SEVERITY.ERROR, {
			skipBlankLines: false,
			ignoreComments: false,
		}],
		'no-whitespace-before-property': SEVERITY.ERROR,
		'nonblock-statement-body-position': SEVERITY.ERROR,
		'object-curly-newline': [SEVERITY.ERROR, {
			multiline: false,
			consistent: true,
		}],
		'object-curly-spacing': [SEVERITY.ERROR, 'never'],
		'object-property-newline': [SEVERITY.ERROR, {
			allowAllPropertiesOnSameLine: true,
		}],
		'operator-linebreak': [SEVERITY.ERROR, 'after'],
		'padded-blocks': [SEVERITY.ERROR, 'never'],
		'padding-line-between-statements': [
			SEVERITY.ERROR,
			{blankLine: 'always', prev: "*", next: 'return'},
			{blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
			{blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
		],
		'quotes': [SEVERITY.ERROR, 'single', {
			avoidEscape: true,
			allowTemplateLiterals: true,
		}],
		'rest-spread-spacing': [SEVERITY.ERROR, 'never'],
		'semi': [SEVERITY.ERROR, 'always', {
			omitLastInOneLineBlock: false,
			omitLastInOneLineClassBody: false,
		}],
		'semi-spacing': [SEVERITY.ERROR, {
			before: false,
			after: true,
		}],
		'semi-style': [SEVERITY.ERROR, 'last'],
		'space-before-blocks': [SEVERITY.ERROR, 'always'],
		'space-before-function-paren': [SEVERITY.ERROR, {
			anonymous: 'never',
			named: 'always',
			asyncArrow: 'always',
		}],
		'space-in-parens': [SEVERITY.ERROR, 'never'],
		'space-infix-ops': [SEVERITY.ERROR, {
			int32Hint: true,
		}],
		'space-unary-ops': [SEVERITY.ERROR, {
			words: true,
			nonwords: false,
		}],
		'switch-colon-spacing': [SEVERITY.ERROR, {
			after: true,
			before: false,
		}],
		'template-curly-spacing': [SEVERITY.ERROR, 'never'],
		'template-tag-spacing': [SEVERITY.ERROR, 'never'],
		'unicode-bom': SEVERITY.OFF,
		'wrap-iife': [SEVERITY.ERROR, 'inside'],
		'wrap-regex': SEVERITY.OFF,
		'yield-star-spacing': [SEVERITY.ERROR, 'after'],

		// eslint-plugin-import
		
		// Helpful warnings
		
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

		// Module systems

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

		// Style guide
		
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
			"prefer-inline": false,
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

const jsConfig = {
	files: ['**/*.js', '**/*.jsx'],
	languageOptions: {
		...commonConfig.languageOptions,
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
	plugins: {
		...commonConfig.plugins,
	},
	rules: {
		...commonConfig.rules,
	},
};

const tsConfig = {
	files: ['**/*.ts', '**/*.tsx'],
	languageOptions: {
		...commonConfig.languageOptions,
		parser: tsParser,
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
				globalReturn: false,
			},
			ecmaVersion: 'latest',
			project: './tsconfig.json',
		},
	},

	plugins: {
		...commonConfig.plugins,
		'@typescript-eslint': ts,
		'import': imports,
	},
	settings: {	
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				project: './tsconfig.json',
				alwaysTryTypes: true,
			},
		},
	},
	rules: {
		...commonConfig.rules,
		'block-spacing': SEVERITY.OFF,
		'@typescript-eslint/block-spacing': [SEVERITY.ERROR, 'always'],
		"brace-style": SEVERITY.OFF,
		"@typescript-eslint/brace-style": [SEVERITY.ERROR, '1tbs',{
			allowSingleLine: true,
		}],
		'class-methods-use-this': SEVERITY.OFF,
		'@typescript-eslint/class-methods-use-this': SEVERITY.ERROR,
		'comma-dangle': SEVERITY.OFF,
		'@typescript-eslint/comma-dangle': [SEVERITY.ERROR, {
			arrays: 'only-multiline',
			objects: 'only-multiline',
			imports: 'only-multiline',
			exports: 'only-multiline',
			functions: 'only-multiline',
			enums: 'only-multiline',
			generics: 'only-multiline',
			tuples: 'only-multiline',
		}],
		'comma-spacing': SEVERITY.OFF,
		'@typescript-eslint/comma-spacing': [SEVERITY.ERROR,{
			before: false,
			after: true,
		}],
		'default-param-last': SEVERITY.OFF,
		'@typescript-eslint/default-param-last': SEVERITY.OFF,
		'dot-notation': SEVERITY.OFF,
		'@typescript-eslint/dot-notation': SEVERITY.ERROR,
		'func-call-spacing': SEVERITY.OFF,
		'@typescript-eslint/func-call-spacing': [SEVERITY.ERROR, 'never'],
		'indent': SEVERITY.OFF,
		'@typescript-eslint/indent': [SEVERITY.ERROR, 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 'first',
		}],
		'init-declarations': SEVERITY.OFF,
		'@typescript-eslint/init-declarations': SEVERITY.OFF,
		'key-spacing': SEVERITY.OFF,
		'@typescript-eslint/key-spacing': [SEVERITY.ERROR, {
			beforeColon: false,
			afterColon: true,
			mode: 'strict',
		}],
		'keyword-spacing': SEVERITY.OFF,
		'@typescript-eslint/keyword-spacing': [SEVERITY.ERROR, {
			before: true,
			after: true,
		}],
		'lines-around-comment': SEVERITY.OFF,
		'@typescript-eslint/lines-around-comment': [SEVERITY.WARN, {
			beforeBlockComment: true,
			afterBlockComment: false,
			beforeLineComment: true,
			afterLineComment: false,
			allowBlockStart: true,
			allowBlockEnd: true,
			allowClassStart: true,
			allowClassEnd: true,
			allowObjectStart: true,
			allowObjectEnd: true,
			allowArrayStart: true,
			allowArrayEnd: true,
		}],
		'lines-between-class-members': SEVERITY.OFF,
		'@typescript-eslint/lines-between-class-members': [SEVERITY.ERROR, 'always', {
			exceptAfterSingleLine: true,
		}],
		'no-array-constructor': SEVERITY.OFF,
		'@typescript-eslint/no-array-constructor': SEVERITY.OFF,
		'no-dupe-class-members': SEVERITY.OFF,
		'@typescript-eslint/no-dupe-class-members': SEVERITY.ERROR,
		'no-empty-function': SEVERITY.OFF,
		'@typescript-eslint/no-empty-function': [SEVERITY.ERROR, {
			allow: ['arrowFunctions'],
		}],
		'no-extra-parens': SEVERITY.OFF,
		'@typescript-eslint/no-extra-parens': SEVERITY.OFF,
		'no-extra-semi': SEVERITY.OFF,
		'@typescript-eslint/no-extra-semi': SEVERITY.ERROR,
		'no-implied-eval': SEVERITY.OFF,
		'@typescript-eslint/no-implied-eval': SEVERITY.ERROR,
		'no-invalid-this': SEVERITY.OFF,
		'@typescript-eslint/no-invalid-this': SEVERITY.ERROR,
		'no-loop-func': SEVERITY.OFF,
		'@typescript-eslint/no-loop-func': SEVERITY.ERROR,
		'no-loss-of-precision': SEVERITY.OFF,
		'@typescript-eslint/no-loss-of-precision': SEVERITY.ERROR,
		'no-magic-numbers': SEVERITY.OFF,
		'@typescript-eslint/no-magic-numbers': [SEVERITY.ERROR, {
			enforceConst: true,
			ignoreEnums: true,
			ignoreNumericLiteralTypes: true,
			ignoreReadonlyClassProperties: true,
			ignoreTypeIndexes: true,
			ignore: [0, 1],
		}],
		'no-redeclare': SEVERITY.OFF,
		'@typescript-eslint/no-redeclare': SEVERITY.ERROR,
		'no-restricted-imports': SEVERITY.OFF,
		'@typescript-eslint/no-restricted-imports': SEVERITY.OFF,
		'no-shadow': SEVERITY.OFF,
		'@typescript-eslint/no-shadow': [SEVERITY.ERROR, {
			builtinGlobals: false,
			hoist: 'all',
			ignoreTypeValueShadow: false,
			ignoreFunctionTypeParameterNameValueShadow: false,
		}],
		'no-throw-literal': SEVERITY.OFF,
		'@typescript-eslint/no-throw-literal': [SEVERITY.ERROR, {
			allowThrowingAny: true,
			allowThrowingUnknown: true,
		}],
		'no-unused-expressions': SEVERITY.OFF,
		'@typescript-eslint/no-unused-expressions': [SEVERITY.ERROR, {
			enforceForJSX: true,
		}],
		'no-unused-vars': SEVERITY.OFF,
		'@typescript-eslint/no-unused-vars': [SEVERITY.ERROR, {
			vars: 'all',
			varsIgnorePattern: '^_',
			args: 'none',
			caughtErrors: 'all',
			destructuredArrayIgnorePattern: '^_',
			ignoreRestSiblings: true,
		}],
		'no-use-before-define': SEVERITY.OFF,
		'@typescript-eslint/no-use-before-define': [SEVERITY.ERROR, {
			enums: true,
			typedefs: true,
			ignoreTypeReferences: false,
		}],
		'no-useless-constructor': SEVERITY.OFF,
		'@typescript-eslint/no-useless-constructor': SEVERITY.ERROR,
		'object-curly-spacing': SEVERITY.OFF,
		'@typescript-eslint/object-curly-spacing': [SEVERITY.ERROR, 'never'],
		'padding-line-between-statements': SEVERITY.OFF,
		'@typescript-eslint/padding-line-between-statements': [
			SEVERITY.ERROR,
			{blankLine: 'always', prev: "*", next: 'return'},
			{blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
			{blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
		],
		'quotes': SEVERITY.OFF,
		'@typescript-eslint/quotes': [SEVERITY.ERROR, 'single', {
			avoidEscape: true,
			allowTemplateLiterals: true,
		}],
		'require-await': SEVERITY.OFF,
		'@typescript-eslint/require-await': SEVERITY.ERROR,
		'semi': SEVERITY.OFF,
		'@typescript-eslint/semi': [SEVERITY.ERROR, 'always', {
			omitLastInOneLineBlock: false,
			omitLastInOneLineClassBody: false,
		}],
		'space-before-blocks': SEVERITY.OFF,
		'@typescript-eslint/space-before-blocks': [SEVERITY.ERROR, 'always'],
		'space-before-function-paren': SEVERITY.OFF,
		'@typescript-eslint/space-before-function-paren': [SEVERITY.ERROR, {
			anonymous: 'never',
			named: 'always',
			asyncArrow: 'always',
		}],
		'space-infix-ops': SEVERITY.OFF,
		'@typescript-eslint/space-infix-ops': [SEVERITY.ERROR, {
			int32Hint: true,
		}],

		'@typescript-eslint/adjacent-overload-signatures': SEVERITY.ERROR,
		
		// https://typescript-eslint.io/rules/array-type
		'@typescript-eslint/array-type': [SEVERITY.ERROR, {
			default: 'generic',
			readonly: 'generic',
		}],
		'@typescript-eslint/await-thenable': SEVERITY.ERROR,
		'@typescript-eslint/ban-ts-comment': [SEVERITY.ERROR, {
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': 'allow-with-description',
			'ts-nocheck': 'allow-with-description',
			'ts-check': 'allow-with-description',
			minimumDescriptionLength: 3,
		}],
		'@typescript-eslint/ban-tslint-comment': SEVERITY.ERROR,
		'@typescript-eslint/ban-types': SEVERITY.ERROR,
		'@typescript-eslint/class-literal-property-style': [SEVERITY.ERROR, 'getters'],
		'@typescript-eslint/consistent-generic-constructors': [SEVERITY.ERROR, 'constructor'],
		'@typescript-eslint/consistent-indexed-object-style': [SEVERITY.ERROR, 'record'],
		'@typescript-eslint/consistent-type-assertions': [SEVERITY.ERROR, {
			assertionStyle: 'as',
			objectLiteralTypeAssertions: 'allow',
		}],
		'@typescript-eslint/consistent-type-definitions': SEVERITY.OFF,
		'@typescript-eslint/consistent-type-exports': [SEVERITY.ERROR, {
			fixMixedExportsWithInlineTypeSpecifier: false,
		}],
		'@typescript-eslint/consistent-type-imports': [SEVERITY.ERROR, {
			prefer: 'type-imports',
			fixStyle: 'separate-type-imports',
			disallowTypeAnnotations: true,
		}],
		'@typescript-eslint/explicit-function-return-type': [SEVERITY.ERROR, {
			allowExpressions: true,
			allowTypedFunctionExpressions: true,
			allowHigherOrderFunctions: true,
			allowDirectConstAssertionInArrowFunctions: true,
			allowConciseArrowFunctionExpressionsStartingWithVoid: true,
			allowFunctionsWithoutTypeParameters: false,
			allowIIFEs: true,
		}],
		'@typescript-eslint/explicit-member-accessibility': [SEVERITY.ERROR, {
			accessibility: 'no-public',
		}],
		'@typescript-eslint/explicit-module-boundary-types': [SEVERITY.ERROR, {
			allowArgumentsExplicitlyTypedAsAny: true,
			allowDirectConstAssertionInArrowFunctions: false,
			allowHigherOrderFunctions: true,
			allowTypedFunctionExpressions: true,
		}],
		'@typescript-eslint/member-delimiter-style': [SEVERITY.ERROR, {
			singleline: {
				delimiter: 'comma',
				requireLast: false,
			},
			multiline: {
				delimiter: 'comma',
				requireLast: true,
			},
			multilineDetection: 'brackets',
		}],
		'@typescript-eslint/member-ordering': SEVERITY.OFF,
		'@typescript-eslint/method-signature-style': SEVERITY.OFF,
		'@typescript-eslint/naming-convention': [SEVERITY.ERROR, 
			{
				selector: 'default',
				format: ['camelCase'],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow',
			},
			{
				selector: 'variable',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow',
			},
			{
				selector: 'typeLike',
				format: ['PascalCase'],
			},
			{
				selector: 'enumMember',
				format: ['UPPER_CASE'],
			}
		],
		'@typescript-eslint/no-base-to-string': [SEVERITY.ERROR, {
			ignoredTypeNames: ['Error', 'RegExp', 'URL', 'URLSearchParams'],
		}],
		'@typescript-eslint/no-confusing-non-null-assertion': SEVERITY.ERROR,
		'@typescript-eslint/no-confusing-void-expression': [SEVERITY.ERROR, {
			ignoreArrowShorthand: true,
			ignoreVoidOperator: false,
		}],
		'@typescript-eslint/no-duplicate-enum-values': SEVERITY.ERROR,
		'@typescript-eslint/no-duplicate-type-constituents': [SEVERITY.ERROR, {
			ignoreIntersections: false,
			ignoreUnions: false,
		}],
		'@typescript-eslint/no-dynamic-delete': SEVERITY.OFF,
		'@typescript-eslint/no-empty-interface': [SEVERITY.ERROR, {
			allowSingleExtends: true,
		}],
		'@typescript-eslint/no-explicit-any': SEVERITY.OFF,
		'@typescript-eslint/no-extra-non-null-assertion': SEVERITY.ERROR,
		'@typescript-eslint/no-extraneous-class': [SEVERITY.ERROR, {
			allowConstructorOnly: true,
			allowEmpty: false,
			allowStaticOnly: false,
			allowWithDecorator: false,
		}],
		'@typescript-eslint/no-floating-promises': [SEVERITY.ERROR, {
			ignoreIIFE: true,
			ignoreVoid: true,
		}],
		'@typescript-eslint/no-for-in-array': SEVERITY.ERROR,
		'@typescript-eslint/no-import-type-side-effects': SEVERITY.ERROR,
		'@typescript-eslint/no-inferrable-types': [SEVERITY.ERROR, {
			ignoreParameters: true,
			ignoreProperties: true,
		}],
		'@typescript-eslint/no-invalid-void-type': [SEVERITY.ERROR, {
			allowInGenericTypeArguments: true,
			allowAsThisParameter: true,
		}],
		'@typescript-eslint/no-meaningless-void-operator': [SEVERITY.ERROR, {
			checkNever: true,
		}],
		'@typescript-eslint/no-misused-new': SEVERITY.ERROR,
		'@typescript-eslint/no-misused-promises': [SEVERITY.ERROR, {
			checksConditionals: true,
			checksSpreads: true,
			checksVoidReturn: false,
		}],
		'@typescript-eslint/no-mixed-enums': SEVERITY.ERROR,
		'@typescript-eslint/no-namespace': [SEVERITY.ERROR, {
			allowDeclarations: true,
			allowDefinitionFiles: true,
		}],
		'@typescript-eslint/no-non-null-asserted-nullish-coalescing': SEVERITY.ERROR,
		'@typescript-eslint/no-non-null-asserted-optional-chain': SEVERITY.ERROR,
		'@typescript-eslint/no-non-null-assertion': SEVERITY.OFF,
		'@typescript-eslint/no-redundant-type-constituents': SEVERITY.ERROR,
		'@typescript-eslint/no-require-imports': SEVERITY.ERROR,
		'@typescript-eslint/no-this-alias': SEVERITY.OFF,
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': [SEVERITY.ERROR, {
			allowComparingNullableBooleansToFalse: true,
			allowComparingNullableBooleansToTrue: true,
		}],
		'@typescript-eslint/no-unnecessary-condition': [SEVERITY.ERROR, {
			allowConstantLoopConditions: false,
			allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
		}],
		'@typescript-eslint/no-unnecessary-qualifier': SEVERITY.ERROR,
		'@typescript-eslint/no-unnecessary-type-arguments': SEVERITY.ERROR,
		'@typescript-eslint/no-unnecessary-type-assertion': SEVERITY.ERROR,
		'@typescript-eslint/no-unnecessary-type-constraint': SEVERITY.ERROR,
		'@typescript-eslint/no-unsafe-argument': SEVERITY.ERROR,
		'@typescript-eslint/no-unsafe-assignment': SEVERITY.ERROR,
		'@typescript-eslint/no-unsafe-call': SEVERITY.ERROR,
		'@typescript-eslint/no-unsafe-declaration-merging': SEVERITY.ERROR,
		'@typescript-eslint/no-unsafe-enum-comparison': SEVERITY.ERROR,
		'@typescript-eslint/no-unsafe-member-access': SEVERITY.ERROR,
		'@typescript-eslint/no-unsafe-return': SEVERITY.ERROR,
		'@typescript-eslint/no-useless-empty-export': SEVERITY.ERROR,
		'@typescript-eslint/no-var-requires': SEVERITY.ERROR,
		'@typescript-eslint/non-nullable-type-assertion-style': SEVERITY.ERROR,
		'@typescript-eslint/parameter-properties': SEVERITY.OFF,
		'@typescript-eslint/prefer-as-const': SEVERITY.ERROR,
		'@typescript-eslint/prefer-enum-initializers': SEVERITY.ERROR,
		'@typescript-eslint/prefer-for-of': SEVERITY.ERROR,
		'@typescript-eslint/prefer-includes': SEVERITY.ERROR	,
		'@typescript-eslint/prefer-literal-enum-member': [SEVERITY.ERROR, {
			allowBitwiseExpressions: false,
		}],
		'@typescript-eslint/prefer-namespace-keyword': SEVERITY.ERROR,
		'@typescript-eslint/prefer-nullish-coalescing': SEVERITY.OFF,
		'@typescript-eslint/prefer-optional-chain': [SEVERITY.ERROR, {
			allowPotentiallyUnsafeFixesThatModifyTheReturnTypeIKnowWhatImDoing: false,
			checkAny: true,
			checkUnknown: true,
			checkString: true,
			checkNumber: true,
			checkBoolean: true,
			checkBigInt: true,
			requireNullish: false,
		}],
		'@typescript-eslint/prefer-readonly': SEVERITY.ERROR,
		'@typescript-eslint/prefer-readonly-parameter-types': SEVERITY.OFF,
		'@typescript-eslint/prefer-reduce-type-parameter': SEVERITY.ERROR,
		'@typescript-eslint/prefer-regexp-exec': SEVERITY.ERROR,
		'@typescript-eslint/prefer-return-this-type': SEVERITY.ERROR,
		'@typescript-eslint/prefer-string-starts-ends-with': SEVERITY.ERROR,
		'@typescript-eslint/prefer-ts-expect-error': SEVERITY.ERROR,
		'@typescript-eslint/promise-function-async': SEVERITY.OFF,
		'@typescript-eslint/require-array-sort-compare': [SEVERITY.ERROR, {
			ignoreStringArrays: true,
		}],
		'@typescript-eslint/restrict-plus-operands': [SEVERITY.ERROR, {
			allowAny: false,
			allowBoolean: true,
			allowNullish: false,
			allowNumberAndString: false,
			allowRegExp: false,
			skipCompoundAssignments: false,	
		}],
		'@typescript-eslint/restrict-template-expressions': [SEVERITY.ERROR, {
			allowAny: false,
			allowBoolean: true,
			allowNullish: true,
			allowNumber: true,
			allowRegExp: true,
		}],
		'@typescript-eslint/sort-type-constituents': SEVERITY.OFF,
		'@typescript-eslint/strict-boolean-expressions': SEVERITY.OFF,
		'@typescript-eslint/switch-exhaustiveness-check': SEVERITY.ERROR,
		'@typescript-eslint/triple-slash-reference': [SEVERITY.ERROR, {
			lib: 'always',
			path: 'never',
			types: 'prefer-import',
		}],
		'@typescript-eslint/type-annotation-spacing': [SEVERITY.ERROR, {
			after: true,
			before: false,
			overrides: {
				arrow: {
					after: true,
					before: true,
				},
			},
		}],
		'@typescript-eslint/typedef': SEVERITY.OFF,
		'@typescript-eslint/unbound-method': [SEVERITY.ERROR, {
			ignoreStatic: true,
		}],
		'@typescript-eslint/unified-signatures': SEVERITY.OFF,		
	},
};

const ignoreConfig = {
	ignores: [
		'dist',
		'.vscode',
		'**/*.config.js',
		'**/*.config.ts',
	],
};

export default [jsConfig, tsConfig, ignoreConfig];
