import {SEVERITY} from './constants.js';


// config for eslint 9.25.1
/** @type {import('eslint').Linter.Config.rules} */
export const baseRules = {
	// ============================================
	// POSSIBLE PROBLEMS
	// ============================================

	// https://eslint.org/docs/latest/rules/array-callback-return
	'array-callback-return': [SEVERITY.ERROR, {
		allowImplicit: true,
		checkForEach: false,
		allowVoid: true,
	}],

	// https://eslint.org/docs/latest/rules/constructor-super
	'constructor-super': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/for-direction
	'for-direction': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/getter-return
	'getter-return': [SEVERITY.ERROR, {
		allowImplicit: true,
	}],

	// https://eslint.org/docs/latest/rules/no-async-promise-executor
	'no-async-promise-executor': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-await-in-loop
	'no-await-in-loop': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-class-assign
	'no-class-assign': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-compare-neg-zero
	'no-compare-neg-zero': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-cond-assign
	'no-cond-assign': [SEVERITY.ERROR, 'except-parens'],

	// https://eslint.org/docs/latest/rules/no-const-assign
	'no-const-assign': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-constant-binary-expression
	'no-constant-binary-expression': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-constant-condition
	'no-constant-condition': [SEVERITY.ERROR, {
		checkLoops: 'allExceptWhileTrue',
	}],

	// https://eslint.org/docs/latest/rules/no-constructor-return
	'no-constructor-return': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-debugger
	'no-debugger': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-dupe-args
	'no-dupe-args': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-dupe-class-members
	'no-dupe-class-members': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-dupe-else-if
	'no-dupe-else-if': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-dupe-keys
	'no-dupe-keys': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-duplicate-case
	'no-duplicate-case': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-empty-character-class
	'no-empty-character-class': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-empty-pattern
	'no-empty-pattern': [SEVERITY.ERROR, {
		allowObjectPatternsAsParameters: false,
	}],

	// https://eslint.org/docs/latest/rules/no-ex-assign
	'no-ex-assign': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-fallthrough
	'no-fallthrough': [SEVERITY.ERROR, {
		allowEmptyCase: true,
		reportUnusedFallthroughComment: true,
	}],

	// https://eslint.org/docs/latest/rules/no-func-assign
	'no-func-assign': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-import-assign
	'no-import-assign': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-inner-declarations
	'no-inner-declarations': [SEVERITY.ERROR, 'both'],

	// https://eslint.org/docs/latest/rules/no-invalid-regexp
	'no-invalid-regexp': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-irregular-whitespace
	'no-irregular-whitespace': [SEVERITY.ERROR, {
		skipStrings: true,
		skipComments: false,
		skipRegExps: true,
		skipTemplates: true,
		skipJSXText: true,
	}],

	// https://eslint.org/docs/latest/rules/no-loss-of-precision
	'no-loss-of-precision': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-misleading-character-class
	'no-misleading-character-class': [SEVERITY.ERROR, {
		allowEscape: true,
	}],

	// https://eslint.org/docs/latest/rules/no-new-native-nonconstructor
	'no-new-native-nonconstructor': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-obj-calls
	'no-obj-calls': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-promise-executor-return
	'no-promise-executor-return': [SEVERITY.ERROR, {
		allowVoid: true,
	}],

	// https://eslint.org/docs/latest/rules/no-prototype-builtins
	'no-prototype-builtins': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-self-assign
	'no-self-assign': [SEVERITY.ERROR, {
		props: false,
	}],

	// https://eslint.org/docs/latest/rules/no-self-compare
	'no-self-compare': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-setter-return
	'no-setter-return': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-sparse-arrays
	'no-sparse-arrays': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-template-curly-in-string
	'no-template-curly-in-string': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-this-before-super
	'no-this-before-super': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-undef
	'no-undef': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-unexpected-multiline
	'no-unexpected-multiline': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-unmodified-loop-condition
	'no-unmodified-loop-condition': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-unreachable
	'no-unreachable': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-unreachable-loop
	'no-unreachable-loop': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-unsafe-finally
	'no-unsafe-finally': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-unsafe-negation
	'no-unsafe-negation': [SEVERITY.ERROR, {
		enforceForOrderingRelations: false,
	}],

	// https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining
	'no-unsafe-optional-chaining': [SEVERITY.ERROR, {
		disallowArithmeticOperators: true,
	}],

	// https://eslint.org/docs/latest/rules/no-unused-private-class-members
	'no-unused-private-class-members': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-unused-vars
	'no-unused-vars': [SEVERITY.ERROR, {
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

	// https://eslint.org/docs/latest/rules/no-use-before-define
	'no-use-before-define': [SEVERITY.ERROR, {
        functions: true,
        classes: true,
        variables: true,
        allowNamedExports: false,
    }],

	// https://eslint.org/docs/latest/rules/no-useless-assignment
	'no-useless-assignment': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-useless-backreference
	'no-useless-backreference': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/require-atomic-updates
	'require-atomic-updates': [SEVERITY.ERROR, {
		allowProperties: true,
	}],

	// https://eslint.org/docs/latest/rules/use-isnan
	'use-isnan': [SEVERITY.ERROR, {
		enforceForSwitchCase: true,
		enforceForIndexOf: true,
	}],

	// https://eslint.org/docs/latest/rules/valid-typeof
	'valid-typeof': [SEVERITY.ERROR, {
		requireStringLiterals: true,
	}],

	// ============================================
	// SUGGESTIONS
	// ============================================

	// https://eslint.org/docs/latest/rules/accessor-pairs
	'accessor-pairs': [SEVERITY.ERROR, {
		getWithoutSet: true,
		setWithoutGet: false,
		enforceForClassMembers: true,
	}],

	// https://eslint.org/docs/latest/rules/arrow-body-style
	'arrow-body-style': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/block-scoped-var
	'block-scoped-var': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/camelcase
	'camelcase': [SEVERITY.WARN, {
		properties: 'always',
		ignoreDestructuring: true,
		ignoreImports: true,
		ignoreGlobals: true,
	}],

	// https://eslint.org/docs/latest/rules/capitalized-comments
	'capitalized-comments': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/class-methods-use-this
	'class-methods-use-this': [SEVERITY.ERROR, {
		enforceForClassFields: false,
		ignoreOverrideMethods: false,
		ignoreClassesWithImplements: 'all',
	}],

	// https://eslint.org/docs/latest/rules/complexity
	'complexity': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/consistent-return
	'consistent-return': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/consistent-this
	'consistent-this': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/curly
	'curly': [SEVERITY.ERROR, 'all'],

	// https://eslint.org/docs/latest/rules/default-case
	'default-case': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/default-case-last
	'default-case-last': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/default-param-last
	'default-param-last': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/dot-notation
	'dot-notation': [SEVERITY.ERROR, {
		allowKeywords: false,
	}],

	// https://eslint.org/docs/latest/rules/eqeqeq
	'eqeqeq': [SEVERITY.ERROR, 'always', {
		null: 'ignore',
	}],

	// https://eslint.org/docs/latest/rules/func-name-matching
	'func-name-matching': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/func-names
	'func-names': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/func-style
	'func-style': [SEVERITY.ERROR, 'expression', {
		allowArrowFunctions: true,
	}],

	// https://eslint.org/docs/latest/rules/grouped-accessor-pairs
	'grouped-accessor-pairs': [SEVERITY.ERROR, 'getBeforeSet'],

	// https://eslint.org/docs/latest/rules/guard-for-in
	'guard-for-in': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/id-denylist
	'id-denylist': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/id-length
	'id-length': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/id-match
	'id-match': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/init-declarations
	'init-declarations': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/logical-assignment-operators
	'logical-assignment-operators': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/max-classes-per-file
	'max-classes-per-file': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/max-depth
	'max-depth': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/max-lines
	'max-lines': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/max-lines-per-function
	'max-lines-per-function': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/max-nested-callbacks
	'max-nested-callbacks': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/max-params
	'max-params': [SEVERITY.ERROR,{
		max: 3,
	}],

	// https://eslint.org/docs/latest/rules/max-statements
	'max-statements': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/multiline-comment-style
	'multiline-comment-style': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/new-cap
	'new-cap': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-alert
	'no-alert': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-array-constructor
	'no-array-constructor': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-bitwise
	'no-bitwise': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-caller
	'no-caller': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-case-declarations
	'no-case-declarations': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-console
	'no-console': [SEVERITY.ERROR, {
		allow: ['error', 'warn']
	}],

	// https://eslint.org/docs/latest/rules/no-continue
	'no-continue': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-delete-var
	'no-delete-var': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-div-regex
	'no-div-regex': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-else-return
	'no-else-return': [SEVERITY.ERROR, {
		allowElseIf: false,
	}],

	// https://eslint.org/docs/latest/rules/no-empty
	'no-empty': [SEVERITY.ERROR, {
		allowEmptyCatch: true,
	}],

	// https://eslint.org/docs/latest/rules/no-empty-function
	'no-empty-function': [SEVERITY.ERROR, {
		allow: ['arrowFunctions'],
	}],

	// https://eslint.org/docs/latest/rules/no-empty-static-block
	'no-empty-static-block': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-eq-null
	'no-eq-null': SEVERITY.OFF, // COVERED BY eqeqeq rule

	// https://eslint.org/docs/latest/rules/no-eval
	'no-eval': [SEVERITY.ERROR, {
		allowIndirect: true,
	}],

	// https://eslint.org/docs/latest/rules/no-extend-native
	'no-extend-native': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-extra-bind
	'no-extra-bind': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-extra-boolean-cast
	'no-extra-boolean-cast': [SEVERITY.ERROR, {
		enforceForInnerExpressions: true,
	}],

	// https://eslint.org/docs/latest/rules/no-extra-label
	'no-extra-label': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-global-assign
	'no-global-assign': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-implicit-coercion
	'no-implicit-coercion': [SEVERITY.ERROR, {
		boolean: false,
		number: false,
		disallowTemplateShorthand: true,
	}],

	// https://eslint.org/docs/latest/rules/no-implicit-globals
	'no-implicit-globals': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-implied-eval
	'no-implied-eval': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-inline-comments
	'no-inline-comments': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-invalid-this
	'no-invalid-this': [SEVERITY.ERROR, {
		capIsConstructor: true,
	}],

	// https://eslint.org/docs/latest/rules/no-iterator
	'no-iterator': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-label-var
	'no-label-var': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-labels
	'no-labels': [SEVERITY.ERROR, {
		allowLoop: true,
		allowSwitch: false,
	}],

	// https://eslint.org/docs/latest/rules/no-lone-blocks
	'no-lone-blocks': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-lonely-if
	'no-lonely-if': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-loop-func
	'no-loop-func': SEVERITY.ERROR,

	// TODO: return to this rule later
	// https://eslint.org/docs/latest/rules/no-magic-numbers
	// 'no-magic-numbers': [SEVERITY.ERROR, {
	// 	enforceConst: true,
	// 	ignoreArrayIndexes: true,
	// 	ignoreDefaultValues: false,
	// 	ignoreClassFieldInitialValues: false,
	// 	detectObjects: false,
	// 	ignore: [0, 1],
	// }],
	'no-magic-numbers': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-multi-assign
	'no-multi-assign': [SEVERITY.ERROR, {
		ignoreNonDeclaration: true,
	}],

	// https://eslint.org/docs/latest/rules/no-multi-str
	'no-multi-str': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-negated-condition
	'no-negated-condition': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-nested-ternary
	'no-nested-ternary': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-new
	'no-new': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-new-func
	'no-new-func': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-new-wrappers
	'no-new-wrappers': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape
	'no-nonoctal-decimal-escape': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-object-constructor
	'no-object-constructor': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-octal
	'no-octal': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-octal-escape
	'no-octal-escape': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-param-reassign
	'no-param-reassign': [SEVERITY.ERROR, {
		props: false,
	}],

	// https://eslint.org/docs/latest/rules/no-plusplus
	'no-plusplus': [SEVERITY.ERROR, {
		allowForLoopAfterthoughts: true,
	}],

	// https://eslint.org/docs/latest/rules/no-proto
	'no-proto': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-redeclare
	'no-redeclare': [SEVERITY.ERROR, {
		builtinGlobals: true,
	}],

	// https://eslint.org/docs/latest/rules/no-regex-spaces
	'no-regex-spaces': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-restricted-exports
	'no-restricted-exports': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-restricted-globals
	'no-restricted-globals': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-restricted-imports
	'no-restricted-imports': [SEVERITY.ERROR, {
        paths: [
			{
				name: '.',
				message: 'Please import from the specific file instead of using index import',
			},
        ],
	}],

	// https://eslint.org/docs/latest/rules/no-restricted-properties
	'no-restricted-properties': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-restricted-syntax
	'no-restricted-syntax': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-return-assign
	'no-return-assign': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-script-url
	'no-script-url': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-sequences
	'no-sequences': [SEVERITY.ERROR, {
		allowInParentheses: true,
	}],

	// https://eslint.org/docs/latest/rules/no-shadow
	'no-shadow': [SEVERITY.ERROR, {
		builtinGlobals: true,
		hoist: 'all',
		ignoreOnInitialization: false,
	}],

	// https://eslint.org/docs/latest/rules/no-shadow-restricted-names
	'no-shadow-restricted-names': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-ternary
	'no-ternary': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-throw-literal
	'no-throw-literal': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-undef-init
	'no-undef-init': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-undefined
	'no-undefined': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-underscore-dangle
	'no-underscore-dangle': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-unneeded-ternary
	'no-unneeded-ternary': [SEVERITY.ERROR, {
		defaultAssignment: false,
	}],

	// https://eslint.org/docs/latest/rules/no-unused-expressions
	'no-unused-expressions': [SEVERITY.ERROR, {
		allowShortCircuit: false,
		allowTernary: false,
		allowTaggedTemplates: false,
		enforceForJSX: true,
	}],

	// https://eslint.org/docs/latest/rules/no-unused-labels
	'no-unused-labels': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-useless-call
	'no-useless-call': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-useless-catch
	'no-useless-catch': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-useless-computed-key
	'no-useless-computed-key': [SEVERITY.ERROR, {
		enforceForClassMembers: true,
	}],

	// https://eslint.org/docs/latest/rules/no-useless-concat
	'no-useless-concat': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-useless-constructor
	'no-useless-constructor': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-useless-escape
	'no-useless-escape': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-useless-rename
	'no-useless-rename': [SEVERITY.ERROR, {
		ignoreDestructuring: false,
		ignoreImport: false,
		ignoreExport: false,
	}],

	// https://eslint.org/docs/latest/rules/no-useless-return
	'no-useless-return': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-var
	'no-var': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/no-void
	'no-void': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/no-warning-comments
	'no-warning-comments': [SEVERITY.WARN, {
		terms: ['TEMP', 'TODO', 'FIXME'],
	}],

	// https://eslint.org/docs/latest/rules/no-with
	'no-with': SEVERITY.OFF,

	// TODO: return to this rule later
	// https://eslint.org/docs/latest/rules/object-shorthand
	// 'object-shorthand': [SEVERITY.ERROR, 'consistent-as-needed'],
	'object-shorthand': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/one-var
	'one-var': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/operator-assignment
	'operator-assignment': [SEVERITY.ERROR, 'always'],

	// https://eslint.org/docs/latest/rules/prefer-arrow-callback
	'prefer-arrow-callback': [SEVERITY.ERROR, {
		allowNamedFunctions: true,
		allowUnboundThis: true,
	}],

	// https://eslint.org/docs/latest/rules/prefer-const
	'prefer-const': [SEVERITY.ERROR, {
		destructuring: 'any',
		ignoreReadBeforeAssign: true,
	}],

	// https://eslint.org/docs/latest/rules/prefer-destructuring
	'prefer-destructuring': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/prefer-exponentiation-operator
	'prefer-exponentiation-operator': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/prefer-named-capture-group
	'prefer-named-capture-group': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/prefer-numeric-literals
	'prefer-numeric-literals': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/prefer-object-has-own
	'prefer-object-has-own': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/prefer-object-spread
	'prefer-object-spread': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
	'prefer-promise-reject-errors': [SEVERITY.ERROR, {
		allowEmptyReject: false,
	}],

	// https://eslint.org/docs/latest/rules/prefer-regex-literals
	'prefer-regex-literals': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/testtesttest
	'prefer-rest-params': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/prefer-spread
	'prefer-spread': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/prefer-template
	'prefer-template': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/radix
	'radix': [SEVERITY.ERROR, 'as-needed'],

	// https://eslint.org/docs/latest/rules/require-await
	'require-await': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/require-unicode-regexp
	'require-unicode-regexp': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/require-yield
	'require-yield': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/sort-imports
	'sort-imports': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/sort-keys
	'sort-keys': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/sort-vars
	'sort-vars': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/spaced-comment
	'spaced-comment': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/strict
	'strict': SEVERITY.OFF,

	// https://eslint.org/docs/latest/rules/symbol-description
	'symbol-description': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/vars-on-top
	'vars-on-top': SEVERITY.ERROR,

	// https://eslint.org/docs/latest/rules/yoda
	'yoda': [SEVERITY.ERROR, 'never', {
		exceptRange: true,
	}],

	// ============================================
	// LAYOUT & FORMATTING
	// ============================================

	// https://eslint.org/docs/latest/rules/testtesttest
	'unicode-bom': SEVERITY.OFF,

	// ============================================
	// COVERED BY ANOTHER MODULES
	// ============================================

	'array-bracket-newline': SEVERITY.OFF, // USE STYLISTIC
	'array-bracket-spacing': SEVERITY.OFF, // USE STYLISTIC
	'array-element-newline': SEVERITY.OFF, // USE STYLISTIC
	'arrow-parens': SEVERITY.OFF, // USE STYLISTIC
	'arrow-spacing': SEVERITY.OFF, // USE STYLISTIC
	'block-spacing': SEVERITY.OFF, // USE STYLISTIC
	'brace-style': SEVERITY.OFF, // USE STYLISTIC
	'comma-dangle': SEVERITY.OFF, // USE STYLISTIC
	'comma-spacing': SEVERITY.OFF, // USE STYLISTIC
	'comma-style': SEVERITY.OFF, // USE STYLISTIC
	'computed-property-spacing': SEVERITY.OFF, // USE STYLISTIC
	'dot-location': SEVERITY.OFF, // USE STYLISTIC
	'eol-last': SEVERITY.OFF, // USE STYLISTIC
	'func-call-spacing': SEVERITY.OFF, // USE STYLISTIC
	'function-call-argument-newline': SEVERITY.OFF, // USE STYLISTIC
	'function-paren-newline': SEVERITY.OFF, // USE STYLISTIC
	'generator-star-spacing': SEVERITY.OFF, // USE STYLISTIC
	'implicit-arrow-linebreak': SEVERITY.OFF, // USE STYLISTIC
	'indent': SEVERITY.OFF, // USE STYLISTIC
	'jsx-quotes': SEVERITY.OFF, // USE STYLISTIC
	'key-spacing': SEVERITY.OFF, // USE STYLISTIC
	'keyword-spacing': SEVERITY.OFF, // USE STYLISTIC
	'line-comment-position': SEVERITY.OFF, // USE STYLISTIC
	'linebreak-style': SEVERITY.OFF, // USE STYLISTIC
	'lines-around-comment': SEVERITY.OFF, // USE STYLISTIC
	'lines-between-class-members': SEVERITY.OFF, // USE STYLISTIC
	'max-len': SEVERITY.OFF, // USE STYLISTIC
	'max-statements-per-line': SEVERITY.OFF, // USE STYLISTIC
	'multiline-ternary': SEVERITY.OFF, // USE STYLISTIC
	'new-parens': SEVERITY.OFF, // USE STYLISTIC
	'newline-per-chained-call': SEVERITY.OFF, // USE STYLISTIC
	'no-confusing-arrow': SEVERITY.OFF, // USE STYLISTIC
	'no-duplicate-imports': SEVERITY.OFF, // USE IMPORT-X
	'no-extra-parens': SEVERITY.OFF, // USE STYLISTIC
	'no-extra-semi': SEVERITY.OFF, // USE STYLISTIC
	'no-floating-decimal': SEVERITY.OFF, // USE STYLISTIC
	'no-mixed-operators': SEVERITY.OFF, // USE STYLISTIC
	'no-mixed-spaces-and-tabs': SEVERITY.OFF, // USE STYLISTIC
	'no-multi-spaces': SEVERITY.OFF, // USE STYLISTIC
	'no-multiple-empty-lines': SEVERITY.OFF, // USE STYLISTIC
	'no-tabs': SEVERITY.OFF, // USE STYLISTIC
	'no-trailing-spaces': SEVERITY.OFF, // USE STYLISTIC
	'no-whitespace-before-property': SEVERITY.OFF, // USE STYLISTIC
	'nonblock-statement-body-position': SEVERITY.OFF, // USE STYLISTIC
	'object-curly-newline': SEVERITY.OFF, // USE STYLISTIC
	'object-curly-spacing': SEVERITY.OFF, // USE STYLISTIC
	'object-property-newline': SEVERITY.OFF, // USE STYLISTIC
	'one-var-declaration-per-line': SEVERITY.OFF, // USE STYLISTIC
	'operator-linebreak': SEVERITY.OFF, // USE STYLISTIC
	'padded-blocks': SEVERITY.OFF, // USE STYLISTIC
	'padding-line-between-statements': SEVERITY.OFF, // USE STYLISTIC
	'quotes': SEVERITY.OFF, // USE STYLISTIC
	'quote-props': SEVERITY.OFF,
	'rest-spread-spacing': SEVERITY.OFF, // USE STYLISTIC
	'semi': SEVERITY.OFF, // USE STYLISTIC
	'semi-spacing': SEVERITY.OFF, // USE STYLISTIC
	'semi-style': SEVERITY.OFF, // USE STYLISTIC
	'space-before-blocks': SEVERITY.OFF, // USE STYLISTIC
	'space-before-function-paren': SEVERITY.OFF, // USE STYLISTIC
	'space-in-parens': SEVERITY.OFF, // USE STYLISTIC
	'space-infix-ops': SEVERITY.OFF, // USE STYLISTIC
	'space-unary-ops': SEVERITY.OFF, // USE STYLISTIC
	'switch-colon-spacing': SEVERITY.OFF, // USE STYLISTIC
	'template-curly-spacing': SEVERITY.OFF, // USE STYLISTIC
	'template-tag-spacing': SEVERITY.OFF, // USE STYLISTIC
	'unicode-bom': SEVERITY.OFF, // USE STYLISTIC
	'wrap-iife': SEVERITY.OFF, // USE STYLISTIC
	'wrap-regex': SEVERITY.OFF, // USE STYLISTIC
	'yield-star-spacing': SEVERITY.OFF, // USE STYLISTIC

	// ============================================
	// DEPRECATED OR RELATED TO OBSOLETE FUNCTIONAL
	// ============================================
};
