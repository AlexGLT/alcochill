import {SEVERITY} from './constants.js';


// config for @stylistic/eslint-plugin 4.2.0
/** @type {import('eslint').Linter.Config.rules} */
export const stylisticRules = {
	// https://eslint.style/rules/default/array-bracket-newline
	'stylistic/array-bracket-newline': [SEVERITY.ERROR, 'consistent'],

	// https://eslint.style/rules/default/array-bracket-spacing
	'stylistic/array-bracket-spacing': [SEVERITY.ERROR, 'never', {
		singleValue: false,
		objectsInArrays: false,
		arraysInArrays: false,
	}],

	// https://eslint.style/rules/default/array-element-newline
	'stylistic/array-element-newline': [SEVERITY.ERROR, 'consistent'],

	// https://eslint.style/rules/default/arrow-parens
	'stylistic/arrow-parens': [SEVERITY.ERROR, 'always'],

	// https://eslint.style/rules/default/arrow-spacing
	'stylistic/arrow-spacing': [SEVERITY.ERROR, {
		before: true,
		after: true,
	}],

	// https://eslint.style/rules/default/block-spacing
	'stylistic/block-spacing': [SEVERITY.ERROR, 'never'],

	// https://eslint.style/rules/default/brace-style
	'stylistic/brace-style': [SEVERITY.ERROR, '1tbs', {
		allowSingleLine: true,
	}],

	// https://eslint.style/rules/default/comma-dangle
	'stylistic/comma-dangle': [SEVERITY.ERROR, {
		arrays: 'always-multiline',
		objects: 'always-multiline',
		imports: 'always-multiline',
		exports: 'always-multiline',
		functions: 'always-multiline',
		importAttributes: 'always-multiline',
		dynamicImports: 'always-multiline',
		enums: 'always-multiline',
		generics: 'always-multiline',
		tuples: 'always-multiline',
	}],

	// https://eslint.style/rules/default/comma-spacing
	'stylistic/comma-spacing': [SEVERITY.ERROR, {
		before: false,
		after: true,
	}],

	// https://eslint.style/rules/default/comma-style
	'stylistic/comma-style': [SEVERITY.ERROR, 'last'],

	// https://eslint.style/rules/default/computed-property-spacing
	'stylistic/computed-property-spacing': [SEVERITY.ERROR, 'never', {
		enforceForClassMembers: true,
	}],

	// https://eslint.style/rules/default/curly-newline
	'stylistic/curly-newline': [SEVERITY.ERROR, {
		multiline: true,
		minElements: 4,
		consistent: true,
	}],

	// https://eslint.style/rules/default/dot-location
	'stylistic/dot-location': [SEVERITY.ERROR, 'property'],

	// https://eslint.style/rules/default/eol-last
	'stylistic/eol-last': [SEVERITY.ERROR, 'always'],

	// https://eslint.style/rules/default/function-call-argument-newline
	'stylistic/function-call-argument-newline': [SEVERITY.ERROR, 'consistent'],

	// https://eslint.style/rules/default/function-call-spacing
	'stylistic/function-call-spacing': [SEVERITY.ERROR, 'never'],

	// https://eslint.style/rules/default/function-paren-newline
	'stylistic/function-paren-newline': [SEVERITY.ERROR, 'consistent'],

	// https://eslint.style/rules/default/generator-star-spacing
	'stylistic/generator-star-spacing': [SEVERITY.ERROR, {
		before: false,
		after: true,
	}],

	// https://eslint.style/rules/default/implicit-arrow-linebreak
	'stylistic/implicit-arrow-linebreak': [SEVERITY.ERROR, 'beside'],

	// https://eslint.style/rules/default/indent
	'stylistic/indent': [SEVERITY.ERROR, 'tab'],

	// https://eslint.style/rules/default/indent-binary-ops
	'stylistic/indent-binary-ops': [SEVERITY.ERROR, 'tab'],

	// https://eslint.style/rules/default/jsx-child-element-spacing
	'stylistic/jsx-child-element-spacing': SEVERITY.OFF,

	// https://eslint.style/rules/default/jsx-closing-bracket-location
	'stylistic/jsx-closing-bracket-location': [SEVERITY.ERROR, {
		nonEmpty: 'line-aligned',
		selfClosing: 'tag-aligned',
	}],

	// https://eslint.style/rules/default/jsx-closing-tag-location
	'stylistic/jsx-closing-tag-location': [SEVERITY.ERROR, 'tag-aligned'],

	// https://eslint.style/rules/default/jsx-curly-brace-presence
	'stylistic/jsx-curly-brace-presence': [SEVERITY.OFF, {
		props: 'never',
		children: 'never',
		propElementValues: 'always',
	}],

	// https://eslint.style/rules/default/jsx-curly-newline
	'stylistic/jsx-curly-newline': [SEVERITY.OFF, {
		multiline: 'consistent',
		singleline: 'consistent',
	}],

	// https://eslint.style/rules/default/jsx-curly-spacing
	'stylistic/jsx-curly-spacing': [SEVERITY.ERROR, {
		when: 'never',
	}],

	// https://eslint.style/rules/default/jsx-equals-spacing
	'stylistic/jsx-equals-spacing': [SEVERITY.ERROR, 'never'],

	// https://eslint.style/rules/default/jsx-first-prop-new-line
	'stylistic/jsx-first-prop-new-line': [SEVERITY.ERROR, 'multiline'],

	// https://eslint.style/rules/default/jsx-function-call-newline
	'stylistic/jsx-function-call-newline': [SEVERITY.ERROR, 'multiline'],

	// https://eslint.style/rules/default/jsx-indent-props
	'stylistic/jsx-indent-props': [SEVERITY.ERROR, 'tab'],

	// https://eslint.style/rules/default/jsx-max-props-per-line
	'stylistic/jsx-max-props-per-line': [SEVERITY.ERROR, {
		maximum: {
			single: 3,
			multi: 1,
		},
	}],

	// https://eslint.style/rules/default/jsx-newline
	'stylistic/jsx-newline': [SEVERITY.ERROR, {
		prevent: false,
	}],

	// https://eslint.style/rules/default/jsx-one-expression-per-line
	'stylistic/jsx-one-expression-per-line': [SEVERITY.ERROR, {
		allow: 'single-line',
	}],

	'stylistic/jsx-pascal-case': [SEVERITY.ERROR, {
		allowAllCaps: false,
		allowNamespace: false,
		allowLeadingUnderscore: false,
	}],

	// https://eslint.style/rules/default/jsx-props-no-multi-spaces
	'stylistic/jsx-props-no-multi-spaces': SEVERITY.ERROR,

	// https://eslint.style/rules/default/jsx-quotes
	'stylistic/jsx-quotes': [SEVERITY.ERROR, 'prefer-double'],

	// https://eslint.style/rules/default/jsx-self-closing-comp
	'stylistic/jsx-self-closing-comp': [SEVERITY.ERROR, {
		component: true,
		html: true,
	}],

	// TODO: return to this rule later
	// https://eslint.style/rules/default/jsx-sort-props
	// 'stylistic/jsx-sort-props': [SEVERITY.ERROR, {
	// 	noSortAlphabetically: true,
	// 	ignoreCase: false,
	// 	callbacksLast: true,
	// 	shorthandFirst: true,
	// 	shorthandLast: false,
	// 	multiline: 'last',
	// 	locale: 'auto',
	// }],
	'stylistic/jsx-sort-props': SEVERITY.OFF,

	// https://eslint.style/rules/default/jsx-tag-spacing
	'stylistic/jsx-tag-spacing': [SEVERITY.ERROR, {
		beforeSelfClosing: 'never',
		afterOpening: 'never',
		beforeClosing: 'never',
		closingSlash: 'never',
	}],

	// https://eslint.style/rules/default/jsx-wrap-multilines
	'stylistic/jsx-wrap-multilines': [SEVERITY.ERROR, {
		declaration: 'parens-new-line',
		assignment: 'parens-new-line',
		return: 'parens-new-line',
		arrow: 'parens-new-line',
		condition: 'parens-new-line',
		logical: 'parens-new-line',
		prop: 'parens-new-line',
	}],

	// https://eslint.style/rules/default/key-spacing
	'stylistic/key-spacing': [SEVERITY.ERROR, {
		beforeColon: false,
		afterColon: true,
		mode: 'strict',
	}],

	// https://eslint.style/rules/default/keyword-spacing
	'stylistic/keyword-spacing': [SEVERITY.ERROR, {
		before: true,
		after: true,
	}],

	// https://eslint.style/rules/default/line-comment-position
	'stylistic/line-comment-position': SEVERITY.OFF,

	// https://eslint.style/rules/default/linebreak-style
	'stylistic/linebreak-style': [SEVERITY.ERROR, 'unix'],

	// TODO: return to this rule later
	// https://eslint.style/rules/default/lines-around-comment
	// 'stylistic/lines-around-comment': [SEVERITY.ERROR, {
	// 	beforeBlockComment: true,
	// 	afterBlockComment: false,
	// 	beforeLineComment: false,
	// 	afterLineComment: false,
	// 	allowBlockStart: true,
	// 	allowBlockEnd: true,
	// 	allowObjectStart: true,
	// 	allowObjectEnd: true,
	// 	allowArrayStart: true,
	// 	allowArrayEnd: true,
	// 	allowClassStart: true,
	// 	allowClassEnd: true,
	// 	afterHashbangComment: true,
	// 	applyDefaultIgnorePatterns: true,
	// }],
	'stylistic/lines-around-comment': SEVERITY.OFF,

	// TODO: return to this rule later
	// https://eslint.style/rules/default/lines-between-class-members
	'stylistic/lines-between-class-members': SEVERITY.OFF,

	// https://eslint.style/rules/default/max-len
	'stylistic/max-len': [SEVERITY.ERROR, {
		code: 120,
		tabWidth: 4,
		ignoreComments: true,
		ignoreUrls: true,
		ignoreStrings: true,
		ignoreTemplateLiterals: false,
		ignoreRegExpLiterals: true,
	}],

	// https://eslint.style/rules/default/max-statements-per-line
	'stylistic/max-statements-per-line': [SEVERITY.ERROR, {
		max: 2,
	}],

	// https://eslint.style/rules/default/member-delimiter-style
	'stylistic/member-delimiter-style': [SEVERITY.ERROR, {
		multiline: {
			delimiter: 'comma',
			requireLast: true,
		},
		singleline: {
			delimiter: 'comma',
			requireLast: false,
		},
		multilineDetection: 'brackets',
	}],

	// https://eslint.style/rules/default/multiline-comment-style
	'stylistic/multiline-comment-style': [SEVERITY.ERROR, 'starred-block'],

	// https://eslint.style/rules/default/multiline-ternary
	'stylistic/multiline-ternary': SEVERITY.OFF,

	// https://eslint.style/rules/default/new-parens
	'stylistic/new-parens': [SEVERITY.ERROR, 'always'],

	// https://eslint.style/rules/default/newline-per-chained-call
	'stylistic/newline-per-chained-call': [SEVERITY.ERROR, {
		ignoreChainWithDepth: 3,
	}],

	// https://eslint.style/rules/default/no-confusing-arrow
	'stylistic/no-confusing-arrow': [SEVERITY.ERROR, {
		allowParens: false,
		onlyOneSimpleParam: true,
	}],

	// TODO: return to this rule later
	// https://eslint.style/rules/default/no-extra-parens
	// 'stylistic/no-extra-parens': [SEVERITY.ERROR, 'all', {
	// 	conditionalAssign: false,
	// 	returnAssign: false,
	// 	nestedBinaryExpressions: false,
	// 	ternaryOperandBinaryExpressions: false,
	// 	ignoreJSX: 'multi-line',
	// 	enforceForArrowConditionals: false,
	// 	enforceForSequenceExpressions: false,
	// 	enforceForNewInMemberExpressions: false,
	// 	enforceForFunctionPrototypeMethods: false,
	// }],
	'stylistic/no-extra-parens': SEVERITY.OFF,

	// https://eslint.style/rules/default/no-extra-semi
	'stylistic/no-extra-semi': SEVERITY.ERROR,

	// https://eslint.style/rules/default/no-floating-decimal
	'stylistic/no-floating-decimal': SEVERITY.ERROR,

	// https://eslint.style/rules/default/no-mixed-operators
	'stylistic/no-mixed-operators': SEVERITY.OFF,

	// https://eslint.style/rules/default/no-mixed-spaces-and-tabs
	'stylistic/no-mixed-spaces-and-tabs': SEVERITY.ERROR,

	// https://eslint.style/rules/default/no-multi-spaces
	'stylistic/no-multi-spaces': [SEVERITY.ERROR, {
		ignoreEOLComments: false,
		includeTabs: true,
		exceptions: {
			Property: false,
			BinaryExpression: false,
			VariableDeclarator: false,
			ImportDeclaration: false,
		},
	}],

	// https://eslint.style/rules/default/no-multiple-empty-lines
	'stylistic/no-multiple-empty-lines': [SEVERITY.ERROR, {
		max: 2,
		maxEOF: 1,
		maxBOF: 0,
	}],

	// https://eslint.style/rules/default/no-tabs
	'stylistic/no-tabs': [SEVERITY.ERROR, {
		allowIndentationTabs: true,
	}],

	// https://eslint.style/rules/default/no-trailing-spaces
	'stylistic/no-trailing-spaces': [SEVERITY.ERROR, {
		skipBlankLines: false,
		ignoreComments: false,
	}],

	// https://eslint.style/rules/default/no-whitespace-before-property
	'stylistic/no-whitespace-before-property': SEVERITY.ERROR,

	// https://eslint.style/rules/default/nonblock-statement-body-position
	'stylistic/nonblock-statement-body-position': [SEVERITY.ERROR, 'beside'],

	// https://eslint.style/rules/default/object-curly-newline
	'stylistic/object-curly-newline': [SEVERITY.ERROR, {
		multiline: true,
		minProperties: 4,
		consistent: true,
	}],

	// https://eslint.style/rules/default/object-curly-spacing
	'stylistic/object-curly-spacing': [SEVERITY.ERROR, 'never', {
		arraysInObjects: false,
		objectsInObjects: false,
	}],

	// https://eslint.style/rules/default/object-property-newline
	'stylistic/object-property-newline': [SEVERITY.ERROR, {
		allowAllPropertiesOnSameLine: true,
	}],

	// https://eslint.style/rules/default/one-var-declaration-per-line
	'stylistic/one-var-declaration-per-line': [SEVERITY.ERROR, 'initializations'],

	// https://eslint.style/rules/default/operator-linebreak
	'stylistic/operator-linebreak': [SEVERITY.ERROR, 'after', {
		overrides: {
			'?': 'ignore',
			':': 'ignore',
		},
	}],

	// https://eslint.style/rules/default/padded-blocks
	'stylistic/padded-blocks': [SEVERITY.ERROR, {
		blocks: 'never',
		classes: 'never',
		switches: 'never',
	}],

	// TODO: return to this rule later
	// https://eslint.style/rules/default/padding-line-between-statements
	// 'stylistic/padding-line-between-statements': [
	// 	SEVERITY.ERROR,
	// 	{blankLine: 'always', prev: 'directive', next: '*'},
	// 	{blankLine: 'never', prev: 'directive', next: 'directive'},
	// 	{blankLine: 'always', prev: '*', next: 'return'},
	// ],
	'stylistic/padding-line-between-statements': SEVERITY.OFF,

	// https://eslint.style/rules/default/quote-props
	'stylistic/quote-props': [SEVERITY.ERROR, 'as-needed', {
		keywords: false,
		unnecessary: true,
		numbers: false,
	}],

	// https://eslint.style/rules/default/quotes
	'stylistic/quotes': [SEVERITY.ERROR, 'single', {
		avoidEscape: true,
		allowTemplateLiterals: 'avoidEscape',
	}],

	// https://eslint.style/rules/default/rest-spread-spacing
	'stylistic/rest-spread-spacing': [SEVERITY.ERROR, 'never'],

	// https://eslint.style/rules/default/semi
	'stylistic/semi': [SEVERITY.ERROR, 'always', {
		omitLastInOneLineBlock: true,
		omitLastInOneLineClassBody: true,
	}],

	// https://eslint.style/rules/default/semi-spacing
	'stylistic/semi-spacing': [SEVERITY.ERROR, {
		before: false,
		after: true,
	}],

	// https://eslint.style/rules/default/semi-style
	'stylistic/semi-style': [SEVERITY.ERROR, 'last'],

	// https://eslint.style/rules/default/space-before-blocks
	'stylistic/space-before-blocks': [SEVERITY.ERROR, {
		functions: 'always',
		keywords: 'always',
		classes: 'always',
	}],

	// https://eslint.style/rules/default/space-before-function-paren
	'stylistic/space-before-function-paren': [SEVERITY.ERROR, {
		anonymous: 'always',
		named: 'never',
		asyncArrow: 'always',
	}],

	// https://eslint.style/rules/default/space-in-parens
	'stylistic/space-in-parens': [SEVERITY.ERROR, 'never'],

	// https://eslint.style/rules/default/space-infix-ops
	'stylistic/space-infix-ops': [SEVERITY.ERROR, {
		int32Hint: true,
		ignoreTypes: false,
	}],

	// https://eslint.style/rules/default/space-unary-ops
	'stylistic/space-unary-ops': [SEVERITY.ERROR, {
		words: true,
		nonwords: false,
	}],

	// https://eslint.style/rules/default/spaced-comment
	'stylistic/spaced-comment': [SEVERITY.ERROR, 'always'],

	// https://eslint.style/rules/default/switch-colon-spacing
	'stylistic/switch-colon-spacing': [SEVERITY.ERROR, {
		before: false,
		after: true,
	}],

	// https://eslint.style/rules/default/template-curly-spacing
	'stylistic/template-curly-spacing': [SEVERITY.ERROR, 'never'],

	// https://eslint.style/rules/default/template-tag-spacing
	'stylistic/template-tag-spacing': [SEVERITY.ERROR, 'never'],

	// https://eslint.style/rules/default/type-annotation-spacing
	'stylistic/type-annotation-spacing': [SEVERITY.ERROR, {
		before: false,
		after: true,
		overrides: {
			arrow: {
				before: true,
				after: true,
			},
		},
	}],

	// https://eslint.style/rules/default/type-generic-spacing
	'stylistic/type-generic-spacing': SEVERITY.ERROR,

	// https://eslint.style/rules/default/type-named-tuple-spacing
	'stylistic/type-named-tuple-spacing': SEVERITY.ERROR,

	// https://eslint.style/rules/default/wrap-iife
	'stylistic/wrap-iife': [SEVERITY.ERROR, 'inside', {
		functionPrototypeMethods: true,
	}],

	// https://eslint.style/rules/default/wrap-regex
	'stylistic/wrap-regex': SEVERITY.OFF,

	// https://eslint.style/rules/default/jsx-equals-spacing
	'stylistic/yield-star-spacing': [SEVERITY.ERROR, {
		before: false,
		after: true,
	}],
};
