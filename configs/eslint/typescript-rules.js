import typescriptPlugin from '@typescript-eslint/eslint-plugin';

import {SEVERITY} from './constants.js';


// config for typescript plugin 8.31.0
/** @type {import('eslint').Linter.Config.rules} */
export const typescriptRules = {
	// https://typescript-eslint.io/rules/adjacent-overload-signatures
	'typescript/adjacent-overload-signatures': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/array-type
	'typescript/array-type': [SEVERITY.ERROR, {
		default: 'generic',
		readonly: 'generic',
	}],

	// https://typescript-eslint.io/rules/await-thenable
	'typescript/await-thenable': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/ban-ts-comment
	'typescript/ban-ts-comment': [SEVERITY.ERROR, {
		'ts-expect-error': 'allow-with-description',
		'ts-ignore': false,
		'ts-nocheck': 'allow-with-description',
		'ts-check': false,
		minimumDescriptionLength: 3,
	}],

	// https://typescript-eslint.io/rules/class-literal-property-style
	'typescript/class-literal-property-style': [SEVERITY.ERROR, 'getters'],

	// https://typescript-eslint.io/rules/class-methods-use-this
	'typescript/class-methods-use-this': [SEVERITY.ERROR, {
		enforceForClassFields: false,
		ignoreOverrideMethods: false,
		ignoreOverrideMethods: false,
		ignoreClassesThatImplementAnInterface: false,
	}],

	// https://typescript-eslint.io/rules/consistent-generic-constructors
	'typescript/consistent-generic-constructors': [SEVERITY.ERROR, 'constructor'],

	// https://typescript-eslint.io/rules/consistent-indexed-object-style
	'typescript/consistent-indexed-object-style': [SEVERITY.ERROR, 'record'],

	// https://typescript-eslint.io/rules/consistent-return
	'typescript/consistent-return': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/consistent-type-assertions
	'typescript/consistent-type-assertions': [SEVERITY.ERROR, {
		assertionStyle: 'as',
		objectLiteralTypeAssertions: 'allow',
		arrayLiteralTypeAssertions: 'allow',
	}],

	// https://typescript-eslint.io/rules/consistent-type-definitions
	'typescript/consistent-type-definitions': [SEVERITY.ERROR, 'type'],

	// https://typescript-eslint.io/rules/consistent-type-exports
	'typescript/consistent-type-exports': [SEVERITY.ERROR, {
		fixMixedExportsWithInlineTypeSpecifier: false,
	}],

	// https://typescript-eslint.io/rules/consistent-type-imports
	'typescript/consistent-type-imports': [SEVERITY.ERROR, {
		prefer: 'type-imports',
		fixStyle: 'separate-type-imports',
		disallowTypeAnnotations: false,
	}],

	// https://typescript-eslint.io/rules/default-param-last
	'typescript/default-param-last': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/dot-notation
	'typescript/dot-notation': [SEVERITY.ERROR, {
		allowKeywords: true,
		allowPrivateClassPropertyAccess: false,
		allowProtectedClassPropertyAccess: false,
		allowIndexSignaturePropertyAccess: false,
	}],

	// https://typescript-eslint.io/rules/typescript/no-empty-function
	'typescript/no-empty-function': [SEVERITY.ERROR, {
		allow: ['arrowFunctions'],
	}],

	// https://typescript-eslint.io/rules/explicit-function-return-type
	'typescript/explicit-function-return-type': [SEVERITY.ERROR, {
		allowExpressions: true,
		allowTypedFunctionExpressions: true,
		allowHigherOrderFunctions: true,
		allowDirectConstAssertionInArrowFunctions: true,
		allowConciseArrowFunctionExpressionsStartingWithVoid: true,
		allowFunctionsWithoutTypeParameters: false,
		allowIIFEs: true,
	}],

	// https://typescript-eslint.io/rules/explicit-member-accessibility
	'typescript/explicit-member-accessibility': [SEVERITY.ERROR, {
		accessibility: 'no-public',
	}],

	// https://typescript-eslint.io/rules/explicit-module-boundary-types
	'typescript/explicit-module-boundary-types': [SEVERITY.ERROR, {
		allowArgumentsExplicitlyTypedAsAny: true,
		allowDirectConstAssertionInArrowFunctions: false,
		allowHigherOrderFunctions: true,
		allowTypedFunctionExpressions: true,
		allowOverloadFunctions: false,
	}],

	// https://typescript-eslint.io/rules/init-declarations
	'typescript/init-declarations': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/max-params
	'typescript/max-params': [SEVERITY.ERROR, {
		max: 3,
		countVoidThis: false,
	}],

	// TODO: return to this rule later
	// https://typescript-eslint.io/rules/member-ordering
	'typescript/member-ordering': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/method-signature-style
	'typescript/method-signature-style': [SEVERITY.ERROR, 'property'],

	// TODO: return to this rule later
	// https://typescript-eslint.io/rules/naming-convention
	// 'typescript/naming-convention': [SEVERITY.ERROR,
	// 	{
	// 		selector: 'default',
	// 		format: ['camelCase'],
	// 		leadingUnderscore: 'allow',
	// 		trailingUnderscore: 'allow',
	// 	},
	// 	{
	// 		selector: 'variable',
	// 		format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
	// 		leadingUnderscore: 'allow',
	// 		trailingUnderscore: 'allow',
	// 	},
	// 	{
	// 		selector: 'typeLike',
	// 		format: ['PascalCase'],
	// 	},
	// 	{
	// 		selector: 'enumMember',
	// 		format: ['UPPER_CASE'],
	// 	},
	// 	{
	// 		selector: 'objectLiteralProperty',
	// 		format: ['camelCase', 'UPPER_CASE'],
	// 	}],
	'typescript/naming-convention': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-array-constructor
	'typescript/no-array-constructor': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-array-delete
	'typescript/no-array-delete': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-base-to-string
	// 'typescript/no-base-to-string': [SEVERITY.ERROR, {
	// 	ignoredTypeNames: [
	// 		'Error',
	// 		'RegExp',
	// 		'URL',
	// 		'URLSearchParams',
	// 	],
	// }],
	'typescript/no-base-to-string': SEVERITY.OFF, // WHY: returns later

	// https://typescript-eslint.io/rules/no-confusing-non-null-assertion
	'typescript/no-confusing-non-null-assertion': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-confusing-void-expression
	'typescript/no-confusing-void-expression': [SEVERITY.ERROR, {
		ignoreArrowShorthand: true,
		ignoreVoidOperator: false,
		ignoreVoidReturningFunctions: false,
	}],

	// https://typescript-eslint.io/rules/no-deprecated
	'typescript/no-deprecated': SEVERITY.WARN,

	// https://typescript-eslint.io/rules/no-duplicate-enum-values
	'typescript/no-duplicate-enum-values': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-duplicate-type-constituents
	'typescript/no-duplicate-type-constituents': [SEVERITY.ERROR, {
		ignoreIntersections: false,
		ignoreUnions: false,
	}],

	// https://typescript-eslint.io/rules/no-dynamic-delete
	'typescript/no-dynamic-delete': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-empty-object-type
	'typescript/no-empty-object-type': [SEVERITY.ERROR, {
		allowInterfaces: 'with-single-extends',
		allowObjectTypes: 'never',
		allowWithName: 'Props$',
	}],

	// https://typescript-eslint.io/rules/no-explicit-any
	'typescript/no-explicit-any': [SEVERITY.ERROR, {
		fixToUnknown: true,
		ignoreRestArgs: true,
	}],

	// https://typescript-eslint.io/rules/no-extra-non-null-assertion
	'typescript/no-extra-non-null-assertion': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-extraneous-class
	'typescript/no-extraneous-class': [SEVERITY.ERROR, {
		allowConstructorOnly: true,
		allowEmpty: false,
		allowStaticOnly: false,
		allowWithDecorator: true,
	}],

	// TODO: return to this rule later
	// https://typescript-eslint.io/rules/no-floating-promises
	'typescript/no-floating-promises': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-for-in-array
	'typescript/no-for-in-array': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-implied-eval
	'typescript/no-implied-eval': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-import-type-side-effects
	'typescript/no-import-type-side-effects': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-inferrable-types
	'typescript/no-inferrable-types': [SEVERITY.ERROR, {
		ignoreParameters: true,
		ignoreProperties: true,
	}],

	// https://typescript-eslint.io/rules/no-invalid-void-type
	'typescript/no-invalid-void-type': [SEVERITY.ERROR, {
		allowInGenericTypeArguments: true,
		allowAsThisParameter: true,
	}],

	// https://typescript-eslint.io/rules/no-loop-func
	'typescript/no-loop-func': SEVERITY.ERROR,

	// TODO: return to this rule later
	// https://typescript-eslint.io/rules/no-magic-numbers
	// 'typescript/no-magic-numbers': [SEVERITY.ERROR, {
	// 	enforceConst: true,
	// 	ignoreEnums: true,
	// 	ignoreNumericLiteralTypes: true,
	// 	ignoreReadonlyClassProperties: true,
	// 	ignoreTypeIndexes: true,
	// 	ignore: [0, 1],
	// }],
	'typescript/no-magic-numbers': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-meaningless-void-operator
	'typescript/no-meaningless-void-operator': [SEVERITY.ERROR, {
		checkNever: false,
	}],

	// https://typescript-eslint.io/rules/no-misused-new
	'typescript/no-misused-new': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-misused-promises
	'typescript/no-misused-promises': [SEVERITY.ERROR, {
		checksConditionals: true,
		checksSpreads: true,
		checksVoidReturn: true,
	}],

	// https://typescript-eslint.io/rules/no-misused-spread
	'typescript/no-misused-spread': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-mixed-enums
	'typescript/no-mixed-enums': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-namespace
	'typescript/no-namespace': [SEVERITY.ERROR, {
		allowDeclarations: true,
		allowDefinitionFiles: true,
	}],

	// https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing
	'typescript/no-non-null-asserted-nullish-coalescing': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
	'typescript/no-non-null-asserted-optional-chain': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-non-null-assertion
	'typescript/no-non-null-assertion': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-redundant-type-constituents
	'typescript/no-redundant-type-constituents': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-require-imports
	'typescript/no-require-imports': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-restricted-imports
	'typescript/no-restricted-imports': [SEVERITY.ERROR, {
        paths: [
			{
				name: '.',
				message: 'Please import from the specific file instead of using index import',
			},
        ],
	}],

	// https://typescript-eslint.io/rules/no-restricted-types
	'typescript/no-restricted-types': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-shadow
	'typescript/no-shadow': [SEVERITY.ERROR, {
		builtinGlobals: false,
		hoist: 'all',
		ignoreOnInitialization: false,
		ignoreTypeValueShadow: false,
		ignoreFunctionTypeParameterNameValueShadow: false,
	}],

	// https://typescript-eslint.io/rules/no-this-alias
	'typescript/no-this-alias': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/only-throw-error
	'typescript/only-throw-error': [SEVERITY.ERROR, {
		allowThrowingAny: true,
		allowThrowingUnknown: true,
	}],

	// https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
	'typescript/no-unnecessary-boolean-literal-compare': [SEVERITY.ERROR, {
		allowComparingNullableBooleansToFalse: true,
		allowComparingNullableBooleansToTrue: true,
	}],

	// https://typescript-eslint.io/rules/no-unnecessary-condition
	'typescript/no-unnecessary-condition': [SEVERITY.ERROR, {
		allowConstantLoopConditions: 'only-allowed-literals',
		checkTypePredicates: true,
	}],

	// https://typescript-eslint.io/rules/no-unnecessary-parameter-property-assignment
	'typescript/no-unnecessary-parameter-property-assignment': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unnecessary-qualifier
	'typescript/no-unnecessary-qualifier': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unnecessary-template-expression
	'typescript/no-unnecessary-template-expression': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unnecessary-type-arguments
	'typescript/no-unnecessary-type-arguments': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unnecessary-type-assertion
	'typescript/no-unnecessary-type-assertion': [SEVERITY.ERROR, {
		checkLiteralConstAssertions: false,
	}],

	// https://typescript-eslint.io/rules/no-unnecessary-type-constraint
	'typescript/no-unnecessary-type-constraint': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unsafe-argument
	'typescript/no-unsafe-argument': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unsafe-assignment
	'typescript/no-unsafe-assignment': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unsafe-call
	'typescript/no-unsafe-call': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unsafe-declaration-merging
	'typescript/no-unsafe-declaration-merging': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unsafe-enum-comparison
	'typescript/no-unsafe-enum-comparison': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-unsafe-function-type
	'typescript/no-unsafe-function-type': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unsafe-member-access
	'typescript/no-unsafe-member-access': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unsafe-return
	'typescript/no-unsafe-return': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unsafe-type-assertion
	'typescript/no-unsafe-type-assertion': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-unsafe-unary-minus
	'typescript/no-unsafe-unary-minus': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-unused-expressions
	'typescript/no-unused-expressions': [SEVERITY.ERROR, {
		allowShortCircuit: false,
		allowTernary: false,
		allowTaggedTemplates: false,
		enforceForJSX: true,
	}],

	// https://typescript-eslint.io/rules/no-unused-vars
	'typescript/no-unused-vars': [SEVERITY.ERROR, {
		vars: 'all',
		varsIgnorePattern: '^_',
		args: 'none',
		argsIgnorePattern: '^_',
		destructuredArrayIgnorePattern: '^_',
		caughtErrors: 'none',
		ignoreRestSiblings: true,
		ignoreClassWithStaticInitBlock: false,
		reportUsedIgnorePattern: false,
	}],

	// https://typescript-eslint.io/rules/no-use-before-define
	'typescript/no-use-before-define': [SEVERITY.ERROR, {
        functions: true,
        classes: true,
        variables: true,
        allowNamedExports: false,
		enums: true,
		typedefs: true,
		ignoreTypeReferences: false,
	}],

	// https://typescript-eslint.io/rules/no-useless-constructor
	'typescript/no-useless-constructor': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-useless-empty-export
	'typescript/no-useless-empty-export': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/no-wrapper-object-types
	'typescript/no-wrapper-object-types': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/non-nullable-type-assertion-style
	'typescript/non-nullable-type-assertion-style': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/only-throw-error
	'typescript/only-throw-error': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/parameter-properties
	'typescript/parameter-properties': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/prefer-as-const
	'typescript/prefer-as-const': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/prefer-destructuring
	'typescript/prefer-destructuring': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/prefer-enum-initializers
	'typescript/prefer-enum-initializers': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/prefer-find
	'typescript/prefer-find': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/prefer-for-of
	'typescript/prefer-for-of': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/prefer-function-type
	'typescript/prefer-function-type': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/prefer-includes
	'typescript/prefer-includes': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/prefer-literal-enum-member
	'typescript/prefer-literal-enum-member': [SEVERITY.ERROR, {
		allowBitwiseExpressions: false,
	}],

	// https://typescript-eslint.io/rules/prefer-namespace-keyword
	'typescript/prefer-namespace-keyword': SEVERITY.ERROR,

	// TODO: return to this rule later
	// https://typescript-eslint.io/rules/prefer-nullish-coalescing
	'typescript/prefer-nullish-coalescing': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/prefer-optional-chain
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

	// https://typescript-eslint.io/rules/prefer-promise-reject-errors
	'typescript/prefer-promise-reject-errors': [SEVERITY.ERROR, {
		allowEmptyReject: false,
		allowThrowingAny: false,
		allowThrowingUnknown: false,
	}],

	// https://typescript-eslint.io/rules/prefer-readonly
	'typescript/prefer-readonly': [SEVERITY.ERROR, {
		onlyInlineLambdas: false,
	}],

	// https://typescript-eslint.io/rules/prefer-readonly-parameter-types
	'typescript/prefer-readonly-parameter-types': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/prefer-reduce-type-parameter
	'typescript/prefer-reduce-type-parameter': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/prefer-regexp-exec
	'typescript/prefer-regexp-exec': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/prefer-return-this-type
	'typescript/prefer-return-this-type': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/prefer-string-starts-ends-with
	'typescript/prefer-string-starts-ends-with': [SEVERITY.ERROR, {
		allowSingleElementEquality: 'always',
	}],

	// https://typescript-eslint.io/rules/promise-function-async
	'typescript/promise-function-async': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/related-getter-setter-pairs
	'typescript/related-getter-setter-pairs': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/require-array-sort-compare
	'typescript/require-array-sort-compare': [SEVERITY.ERROR, {
		ignoreStringArrays: true,
	}],

	// https://typescript-eslint.io/rules/require-await
	'typescript/require-await': SEVERITY.ERROR,

	// https://typescript-eslint.io/rules/restrict-plus-operands
	'typescript/restrict-plus-operands': [SEVERITY.ERROR, {
		allowAny: false,
		allowBoolean: true,
		allowNullish: false,
		allowNumberAndString: false,
		allowRegExp: false,
		skipCompoundAssignments: false,
	}],

	// https://typescript-eslint.io/rules/restrict-template-expressions
	'typescript/restrict-template-expressions': [SEVERITY.ERROR, {
		allowAny: false,
		allowArray: false,
		allowBoolean: true,
		allowNever: false,
		allowNullish: false,
		allowNumber: true,
		allowRegExp: true,
	}],

	// https://typescript-eslint.io/rules/return-await
	'typescript/return-await': [SEVERITY.ERROR, 'always'],

	// https://typescript-eslint.io/rules/strict-boolean-expressions
	// 'typescript/strict-boolean-expressions': [SEVERITY.ERROR, {
	// 	allowString: true,
	// 	allowNumber: true,
	// 	allowNullableObject: true,
	// 	allowNullableBoolean: true,
	// 	allowNullableString: true,
	// 	allowNullableNumber: false,
	// 	allowNullableEnum: true,
	// 	allowAny: true,
	// 	allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
	// }],
	'typescript/strict-boolean-expressions': SEVERITY.OFF, // WHY: uncomment later

	// https://typescript-eslint.io/rules/switch-exhaustiveness-check
	'typescript/switch-exhaustiveness-check': [SEVERITY.ERROR, {
		allowDefaultCaseForExhaustiveSwitch: true,
		requireDefaultForNonUnion: false,
		considerDefaultExhaustiveForUnions: false,
	}],

	// https://typescript-eslint.io/rules/triple-slash-reference
	'typescript/triple-slash-reference': [SEVERITY.ERROR, {
		lib: 'always',
		path: 'never',
		types: 'prefer-import',
	}],

	// https://typescript-eslint.io/rules/typedef
	'typescript/typedef': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/unbound-method
	'typescript/unbound-method': [SEVERITY.ERROR, {
		ignoreStatic: true,
	}],

	// https://typescript-eslint.io/rules/unified-signatures
	'typescript/unified-signatures': [SEVERITY.ERROR, {
		ignoreDifferentlyNamedParameters: true,
		ignoreOverloadsWithDifferentJSDoc: true,
	}],

	// https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable
	'typescript/use-unknown-in-catch-callback-variable': SEVERITY.OFF,

	// ============================================
	// COVERED BY ANOTHER MODULES
	// ============================================

	// https://typescript-eslint.io/rules/no-dupe-class-members
	'typescript/no-dupe-class-members': SEVERITY.OFF, // COVERED BY TYPESCRIPT COMPILER

	// https://typescript-eslint.io/rules/no-invalid-this
	'typescript/no-invalid-this': SEVERITY.OFF, // COVERED BY TYPESCRIPT COMPILER

	// https://typescript-eslint.io/rules/no-redeclare
	'typescript/no-redeclare': SEVERITY.OFF, // COVERED BY TYPESCRIPT COMPILER

	// ============================================
	// DEPRECATED OR RELATED TO OBSOLETE FUNCTIONAL
	// ============================================

	// https://typescript-eslint.io/rules/ban-tslint-comment
	'typescript/ban-tslint-comment': SEVERITY.OFF, // tslint is not used

	// https://typescript-eslint.io/rules/no-empty-interface
	'typescript/no-empty-interface': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-loss-of-precision
	'typescript/no-loss-of-precision': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-type-alias
	'typescript/no-type-alias': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/no-var-requires
	'typescript/no-var-requires': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/prefer-ts-expect-error
	'typescript/prefer-ts-expect-error': SEVERITY.OFF,

	// https://typescript-eslint.io/rules/type-annotation-spacing
	'typescript/type-annotation-spacing': SEVERITY.OFF,
};
