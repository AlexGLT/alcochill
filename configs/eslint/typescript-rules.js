import typescriptPlugin from '@typescript-eslint/eslint-plugin';

import {SEVERITY} from './constants.js';


// config for typescript plugin 6.4.1
/** @type {import('eslint').Linter.FlatConfig} */
export const typescriptRules = {
	files: ['**/*.ts', '**/*.tsx'],
	plugins: {
		typescript: typescriptPlugin,
	},
	rules: {
		'class-methods-use-this': SEVERITY.OFF,
		'typescript/class-methods-use-this': SEVERITY.ERROR,

		'default-param-last': SEVERITY.OFF,
		'typescript/default-param-last': SEVERITY.OFF,

		'init-declarations': SEVERITY.OFF,
		'typescript/init-declarations': SEVERITY.OFF,

		'no-array-constructor': SEVERITY.OFF,
		'typescript/no-array-constructor': SEVERITY.OFF,

		'no-dupe-class-members': SEVERITY.OFF,
		'typescript/no-dupe-class-members': SEVERITY.ERROR,

		'no-empty-function': SEVERITY.OFF,
		'typescript/no-empty-function': [SEVERITY.ERROR, {
			allow: ['arrowFunctions'],
		}],

		'no-implied-eval': SEVERITY.OFF,
		'typescript/no-implied-eval': SEVERITY.ERROR,

		'no-invalid-this': SEVERITY.OFF,
		'typescript/no-invalid-this': SEVERITY.ERROR,

		'no-loop-func': SEVERITY.OFF,
		'typescript/no-loop-func': SEVERITY.ERROR,

		'no-loss-of-precision': SEVERITY.OFF,
		'typescript/no-loss-of-precision': SEVERITY.ERROR,

		'no-magic-numbers': SEVERITY.OFF,
		'typescript/no-magic-numbers': [SEVERITY.ERROR, {
			enforceConst: true,
			ignoreEnums: true,
			ignoreNumericLiteralTypes: true,
			ignoreReadonlyClassProperties: true,
			ignoreTypeIndexes: true,
			ignore: [0, 1],
		}],

		'no-redeclare': SEVERITY.OFF,
		'typescript/no-redeclare': SEVERITY.ERROR,

		'no-restricted-imports': SEVERITY.OFF,
		'typescript/no-restricted-imports': SEVERITY.OFF,

		'no-shadow': SEVERITY.OFF,
		'typescript/no-shadow': [SEVERITY.ERROR, {
			builtinGlobals: false,
			hoist: 'all',
			ignoreTypeValueShadow: false,
			ignoreFunctionTypeParameterNameValueShadow: false,
		}],

		'no-throw-literal': SEVERITY.OFF,
		'typescript/no-throw-literal': [SEVERITY.ERROR, {
			allowThrowingAny: true,
			allowThrowingUnknown: true,
		}],

		'no-unused-expressions': SEVERITY.OFF,
		'typescript/no-unused-expressions': [SEVERITY.ERROR, {
			enforceForJSX: true,
		}],

		'no-unused-vars': SEVERITY.OFF,
		'typescript/no-unused-vars': [SEVERITY.ERROR, {
			vars: 'all',
			varsIgnorePattern: '^_',
			args: 'none',
			caughtErrors: 'all',
			destructuredArrayIgnorePattern: '^_',
			ignoreRestSiblings: true,
		}],

		'no-use-before-define': SEVERITY.OFF,
		'typescript/no-use-before-define': [SEVERITY.ERROR, {
			enums: true,
			typedefs: true,
			ignoreTypeReferences: false,
		}],

		'no-useless-constructor': SEVERITY.OFF,
		'typescript/no-useless-constructor': SEVERITY.ERROR,

		'require-await': SEVERITY.OFF,
		'typescript/require-await': SEVERITY.ERROR,

		'typescript/adjacent-overload-signatures': SEVERITY.ERROR,

		// https://typescript-eslint.io/rules/array-type
		'typescript/array-type': [SEVERITY.ERROR, {
			default: 'generic',
			readonly: 'generic',
		}],
		'typescript/await-thenable': SEVERITY.ERROR,

		'typescript/ban-ts-comment': [SEVERITY.ERROR, {
			'ts-expect-error': 'allow-with-description',
			'ts-ignore': 'allow-with-description',
			'ts-nocheck': 'allow-with-description',
			'ts-check': 'allow-with-description',
			minimumDescriptionLength: 3,
		}],

		'typescript/ban-tslint-comment': SEVERITY.ERROR,

		'typescript/ban-types': SEVERITY.ERROR,

		'typescript/class-literal-property-style': [SEVERITY.ERROR, 'getters'],

		'typescript/consistent-generic-constructors': [SEVERITY.ERROR, 'constructor'],

		'typescript/consistent-indexed-object-style': [SEVERITY.ERROR, 'record'],

		'typescript/consistent-type-assertions': [SEVERITY.ERROR, {
			assertionStyle: 'as',
			objectLiteralTypeAssertions: 'allow',
		}],

		'typescript/consistent-type-definitions': SEVERITY.OFF,

		'typescript/consistent-type-exports': [SEVERITY.ERROR, {
			fixMixedExportsWithInlineTypeSpecifier: false,
		}],

		'typescript/consistent-type-imports': [SEVERITY.ERROR, {
			prefer: 'type-imports',
			fixStyle: 'separate-type-imports',
			disallowTypeAnnotations: true,
		}],

		'typescript/explicit-function-return-type': [SEVERITY.ERROR, {
			allowExpressions: true,
			allowTypedFunctionExpressions: true,
			allowHigherOrderFunctions: true,
			allowDirectConstAssertionInArrowFunctions: true,
			allowConciseArrowFunctionExpressionsStartingWithVoid: true,
			allowFunctionsWithoutTypeParameters: false,
			allowIIFEs: true,
		}],

		'typescript/explicit-member-accessibility': [SEVERITY.ERROR, {
			accessibility: 'no-public',
		}],

		'typescript/explicit-module-boundary-types': [SEVERITY.ERROR, {
			allowArgumentsExplicitlyTypedAsAny: true,
			allowDirectConstAssertionInArrowFunctions: false,
			allowHigherOrderFunctions: true,
			allowTypedFunctionExpressions: true,
		}],

		'typescript/member-ordering': SEVERITY.OFF,

		'typescript/method-signature-style': SEVERITY.OFF,

		'typescript/naming-convention': [SEVERITY.ERROR,
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
			},
			{
				selector: 'objectLiteralProperty',
				format: ['camelCase', 'UPPER_CASE'],
			}],

		'typescript/no-base-to-string': [SEVERITY.ERROR, {
			ignoredTypeNames: ['Error', 'RegExp', 'URL', 'URLSearchParams'],
		}],

		'typescript/no-confusing-non-null-assertion': SEVERITY.ERROR,

		'typescript/no-confusing-void-expression': [SEVERITY.ERROR, {
			ignoreArrowShorthand: true,
			ignoreVoidOperator: false,
		}],

		'typescript/no-duplicate-enum-values': SEVERITY.ERROR,

		'typescript/no-duplicate-type-constituents': [SEVERITY.ERROR, {
			ignoreIntersections: false,
			ignoreUnions: false,
		}],

		'typescript/no-dynamic-delete': SEVERITY.OFF,

		'typescript/no-empty-interface': [SEVERITY.ERROR, {
			allowSingleExtends: true,
		}],

		'typescript/no-explicit-any': SEVERITY.OFF,

		'typescript/no-extra-non-null-assertion': SEVERITY.ERROR,

		'typescript/no-extraneous-class': [SEVERITY.ERROR, {
			allowConstructorOnly: true,
			allowEmpty: false,
			allowStaticOnly: false,
			allowWithDecorator: false,
		}],

		// 'typescript/no-floating-promises': [SEVERITY.ERROR, {
		// 	ignoreIIFE: true,
		// 	ignoreVoid: true,
		// }],

		'typescript/no-for-in-array': SEVERITY.ERROR,

		'typescript/no-import-type-side-effects': SEVERITY.ERROR,

		'typescript/no-inferrable-types': [SEVERITY.ERROR, {
			ignoreParameters: true,
			ignoreProperties: true,
		}],

		// Seems to be bugged: https://github.com/typescript-eslint/typescript-eslint/issues/6547
		// 'typescript/no-invalid-void-type': [SEVERITY.ERROR, {
		// 	allowInGenericTypeArguments: true,
		// 	allowAsThisParameter: true,
		// }],

		'typescript/no-meaningless-void-operator': [SEVERITY.ERROR, {
			checkNever: true,
		}],

		'typescript/no-misused-new': SEVERITY.ERROR,

		'typescript/no-misused-promises': [SEVERITY.ERROR, {
			checksConditionals: true,
			checksSpreads: true,
			checksVoidReturn: false,
		}],

		'typescript/no-mixed-enums': SEVERITY.ERROR,

		'typescript/no-namespace': [SEVERITY.ERROR, {
			allowDeclarations: true,
			allowDefinitionFiles: true,
		}],

		'typescript/no-non-null-asserted-nullish-coalescing': SEVERITY.ERROR,

		'typescript/no-non-null-asserted-optional-chain': SEVERITY.ERROR,

		'typescript/no-non-null-assertion': SEVERITY.OFF,

		'typescript/no-redundant-type-constituents': SEVERITY.ERROR,

		'typescript/no-require-imports': SEVERITY.ERROR,

		'typescript/no-this-alias': SEVERITY.OFF,

		'typescript/no-unnecessary-boolean-literal-compare': [SEVERITY.ERROR, {
			allowComparingNullableBooleansToFalse: true,
			allowComparingNullableBooleansToTrue: true,
		}],

		'typescript/no-unnecessary-condition': [SEVERITY.ERROR, {
			allowConstantLoopConditions: false,
			allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
		}],

		'typescript/no-unnecessary-qualifier': SEVERITY.ERROR,

		'typescript/no-unnecessary-type-arguments': SEVERITY.ERROR,

		'typescript/no-unnecessary-type-assertion': SEVERITY.ERROR,

		'typescript/no-unnecessary-type-constraint': SEVERITY.ERROR,

		'typescript/no-unsafe-argument': SEVERITY.ERROR,

		'typescript/no-unsafe-assignment': SEVERITY.ERROR,

		'typescript/no-unsafe-call': SEVERITY.ERROR,

		'typescript/no-unsafe-declaration-merging': SEVERITY.ERROR,

		'typescript/no-unsafe-enum-comparison': SEVERITY.ERROR,

		'typescript/no-unsafe-member-access': SEVERITY.ERROR,

		'typescript/no-unsafe-return': SEVERITY.ERROR,

		'typescript/no-useless-empty-export': SEVERITY.ERROR,

		'typescript/no-var-requires': SEVERITY.ERROR,

		'typescript/non-nullable-type-assertion-style': SEVERITY.ERROR,

		'typescript/parameter-properties': SEVERITY.OFF,

		'typescript/prefer-as-const': SEVERITY.ERROR,

		'typescript/prefer-enum-initializers': SEVERITY.ERROR,

		'typescript/prefer-for-of': SEVERITY.ERROR,

		'typescript/prefer-includes': SEVERITY.ERROR,

		'typescript/prefer-literal-enum-member': [SEVERITY.ERROR, {
			allowBitwiseExpressions: false,
		}],

		'typescript/prefer-namespace-keyword': SEVERITY.ERROR,

		'typescript/prefer-nullish-coalescing': SEVERITY.OFF,

		'typescript/prefer-optional-chain': [SEVERITY.ERROR, {
			allowPotentiallyUnsafeFixesThatModifyTheReturnTypeIKnowWhatImDoing: false,
			checkAny: true,
			checkUnknown: true,
			checkString: true,
			checkNumber: true,
			checkBoolean: true,
			checkBigInt: true,
			requireNullish: false,
		}],

		'typescript/prefer-readonly': SEVERITY.ERROR,

		'typescript/prefer-readonly-parameter-types': SEVERITY.OFF,

		'typescript/prefer-reduce-type-parameter': SEVERITY.ERROR,

		'typescript/prefer-regexp-exec': SEVERITY.ERROR,

		'typescript/prefer-return-this-type': SEVERITY.ERROR,

		'typescript/prefer-string-starts-ends-with': SEVERITY.ERROR,

		'typescript/prefer-ts-expect-error': SEVERITY.ERROR,

		'typescript/promise-function-async': SEVERITY.OFF,

		'typescript/require-array-sort-compare': [SEVERITY.ERROR, {
			ignoreStringArrays: true,
		}],

		'typescript/restrict-plus-operands': [SEVERITY.ERROR, {
			allowAny: false,
			allowBoolean: true,
			allowNullish: false,
			allowNumberAndString: false,
			allowRegExp: false,
			skipCompoundAssignments: false,
		}],

		'typescript/restrict-template-expressions': [SEVERITY.ERROR, {
			allowAny: false,
			allowBoolean: true,
			allowNullish: true,
			allowNumber: true,
			allowRegExp: true,
		}],

		'typescript/sort-type-constituents': SEVERITY.OFF,

		'typescript/strict-boolean-expressions': SEVERITY.OFF,

		'typescript/switch-exhaustiveness-check': SEVERITY.ERROR,

		'typescript/triple-slash-reference': [SEVERITY.ERROR, {
			lib: 'always',
			path: 'never',
			types: 'prefer-import',
		}],

		'typescript/type-annotation-spacing': [SEVERITY.ERROR, {
			after: true,
			before: false,
			overrides: {
				arrow: {
					after: true,
					before: true,
				},
			},
		}],

		'typescript/typedef': SEVERITY.OFF,

		'typescript/unbound-method': [SEVERITY.ERROR, {
			ignoreStatic: true,
		}],

		'typescript/unified-signatures': SEVERITY.OFF,

		// ============================================
		// FORMATTING
		// ============================================

		'typescript/block-spacing': SEVERITY.OFF, // USE STYLISTIC

		'typescript/brace-style': SEVERITY.OFF, // USE STYLISTIC

		'typescript/comma-dangle': SEVERITY.OFF, // USE STYLISTIC

		'typescript/comma-spacing': SEVERITY.OFF, // USE STYLISTIC

		'typescript/dot-notation': SEVERITY.OFF, // USE STYLISTIC

		'typescript/func-call-spacing': SEVERITY.OFF, // USE STYLISTIC

		'typescript/indent': SEVERITY.OFF, // USE STYLISTIC

		'typescript/key-spacing': SEVERITY.OFF, // USE STYLISTIC

		'typescript/keyword-spacing': SEVERITY.OFF, // USE STYLISTIC

		'typescript/lines-around-comment': SEVERITY.OFF, // USE STYLISTIC

		'typescript/lines-between-class-members': SEVERITY.OFF, // USE STYLISTIC

		'typescript/no-extra-parens': SEVERITY.OFF, // USE STYLISTIC

		'typescript/no-extra-semi': SEVERITY.OFF, // USE STYLISTIC

		'typescript/object-curly-spacing': SEVERITY.OFF, // USE STYLISTIC

		'typescript/padding-line-between-statements': SEVERITY.OFF, // USE STYLISTIC

		'typescript/quotes': SEVERITY.OFF, // USE STYLISTIC

		'typescript/semi': SEVERITY.OFF, // USE STYLISTIC

		'typescript/space-before-blocks': SEVERITY.OFF, // USE STYLISTIC

		'typescript/space-before-function-paren': SEVERITY.OFF, // USE STYLISTIC

		'typescript/space-infix-ops': SEVERITY.OFF, // USE STYLISTIC

		'typescript/member-delimiter-style': SEVERITY.OFF, // USE STYLISTIC
	},
};
