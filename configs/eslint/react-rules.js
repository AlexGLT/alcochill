import {SEVERITY} from './constants.js';


// config for eslint-plugin-react 7.37.5
/** @type {import('eslint').Linter.Config.rules} */
export const reactRules = {
	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/boolean-prop-naming.md
	'react/boolean-prop-naming': [SEVERITY.ERROR, {
		propTypeNames: ['bool'],
		rule: "^(is|are|has|should|was|were|can)[A-Z]([A-Za-z0-9]?)+",
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
	'react/button-has-type': [SEVERITY.ERROR, {
		button: true,
		submit: true,
		reset: true,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/checked-requires-onchange-or-readonly.md
	'react/checked-requires-onchange-or-readonly': [SEVERITY.ERROR, {
		ignoreMissingProperties: false,
		ignoreExclusiveCheckedAttribute: false,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
	'react/destructuring-assignment': [SEVERITY.ERROR, 'always', {
		ignoreClassFields: true,
		destructureInSignature: 'always',
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
	'react/display-name': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md
	'react/forbid-component-props': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-dom-props.md
	'react/forbid-dom-props': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forward-ref-uses-ref.md
	'react/forward-ref-uses-ref': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
	'react/function-component-definition': [SEVERITY.ERROR, {
		namedComponents: 'arrow-function',
		unnamedComponents: ['function-expression', 'arrow-function'],
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
	'react/hook-use-state': [SEVERITY.ERROR, {
		allowDestructuredState: false,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/iframe-missing-sandbox.md
	'react/iframe-missing-sandbox': SEVERITY.WARN,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
	'react/jsx-boolean-value': [SEVERITY.ERROR, 'always'],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
	'react/jsx-filename-extension': [SEVERITY.ERROR, {
		allow: 'as-needed',
		extensions: ['.jsx', '.tsx'],
		ignoreFilesWithoutCode: true,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
	'react/jsx-fragments': [SEVERITY.ERROR, 'syntax'],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
	'react/jsx-handler-names': [SEVERITY.ERROR, {
		eventHandlerPrefix: 'handle',
		eventHandlerPropPrefix: 'on',
		checkLocalVariables: false,
		checkInlineFunction: false,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
	'react/jsx-key': [SEVERITY.ERROR, {
		checkFragmentShorthand: true,
		checkKeyMustBeforeSpread: true,
		warnOnDuplicates: true,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-depth.md
	'react/jsx-max-depth': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
	'react/jsx-no-bind': [SEVERITY.ERROR, {
		ignoreDOMComponents: false,
		ignoreRefs: true,
		allowArrowFunctions: true,
		allowFunctions: false,
		allowBind: false,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
	'react/jsx-no-comment-textnodes': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
	'react/jsx-no-constructed-context-values': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
	'react/jsx-no-duplicate-props': [SEVERITY.ERROR, {
		ignoreCase: false,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
	'react/jsx-no-leaked-render': [SEVERITY.ERROR, {
		validStrategies: ['ternary'],
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
	'react/jsx-no-literals': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
	'react/jsx-no-script-url': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
	'react/jsx-no-undef': [SEVERITY.ERROR, {
		allowGlobals: true,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
	'react/jsx-no-useless-fragment': [SEVERITY.ERROR, {
		allowExpressions: true,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spread-multi.md
	'react/jsx-props-no-spread-multi': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
	'react/jsx-props-no-spreading': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
	'react/jsx-uses-vars': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-adjacent-inline-elements.md
	'react/no-adjacent-inline-elements': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
	'react/no-array-index-key': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
	'react/no-children-prop': [SEVERITY.ERROR, {
		allowFunctions: true,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md
	'react/no-danger': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
	'react/no-danger-with-children': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
	'react/no-deprecated': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
	'react/no-find-dom-node': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
	'react/no-invalid-html-attribute': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
	'react/no-multi-comp': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
	'react/no-namespace': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-object-type-as-default-prop.md
	'react/no-object-type-as-default-prop': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
	'react/no-render-return-value': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
	'react/no-string-refs': [SEVERITY.ERROR, {
		noTemplateLiterals: true,
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md
	'react/no-this-in-sfc': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
	'react/no-unescaped-entities': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
	'react/no-unknown-property': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
	'react/no-unstable-nested-components': [SEVERITY.ERROR, {
		allowAsProps: true,
		propNamePattern: 'render*',
	}],

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-read-only-props.md
	'react/prefer-read-only-props': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
	'react/prefer-stateless-function': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
	'react/prop-types': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
	'react/style-prop-object': SEVERITY.ERROR,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
	'react/void-dom-elements-no-children': SEVERITY.ERROR,

	// ============================================
	// CLASS COMPONENTS
	// ============================================

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
	'react/default-props-match-prop-types': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
	'react/forbid-foreign-prop-types': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
	'react/forbid-prop-types': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md
	'react/no-access-state-in-setstate': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-arrow-function-lifecycle.md
	'react/no-arrow-function-lifecycle': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
	'react/no-did-mount-set-state': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
	'react/no-did-update-set-state': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
	'react/no-direct-mutation-state': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
	'react/no-is-mounted': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
	'react/no-redundant-should-component-update': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
	'react/no-set-state': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-typos.md
	'react/no-typos': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unsafe.md
	'react/no-unsafe': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-class-component-methods.md
	'react/no-unused-class-component-methods': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
	'react/no-unused-prop-types': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md
	'react/no-unused-state': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
	'react/no-will-update-set-state': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
	'react/prefer-es6-class': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-exact-props.md
	'react/prefer-exact-props': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
	'react/require-default-props': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
	'react/require-optimization': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
	'react/require-render-return': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
	'react/sort-comp': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-default-props.md
	'react/sort-default-props': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
	'react/state-in-constructor': SEVERITY.OFF,

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
	'react/static-property-placement': SEVERITY.OFF,

	// ============================================
	// COVERED BY ANOTHER MODULES
	// ============================================

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-child-element-spacing.md
	'react/jsx-child-element-spacing': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
	'react/jsx-closing-bracket-location': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
	'react/jsx-closing-tag-location': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
	'react/jsx-curly-brace-presence': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-newline.md
	'react/jsx-curly-newline': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
	'react/jsx-curly-spacing': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
	'react/jsx-equals-spacing': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
	'react/jsx-first-prop-new-line': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
	'react/jsx-indent': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
	'react/jsx-indent-props': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
	'react/jsx-max-props-per-line': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-newline.md
	'react/jsx-newline': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
	'react/jsx-one-expression-per-line': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
	'react/jsx-pascal-case': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-multi-spaces.md
	'react/jsx-props-no-multi-spaces': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
	'react/jsx-sort-props': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
	'react/jsx-tag-spacing': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
	'react/jsx-wrap-multilines': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
	'react/self-closing-comp': SEVERITY.OFF, // USE STYLISTIC

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
	'react/sort-prop-types': SEVERITY.OFF, // USE STYLISTIC

	// ============================================
	// DEPRECATED
	// ============================================

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
	'react/jsx-no-target-blank': SEVERITY.OFF, // deprecated, because of Modern browsers (Chrome ≥ 88, Edge ≥ 88, Firefox ≥ 79 and Safari ≥ 12.2) automatically imply rel="noopener"

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
	'react/jsx-uses-react': SEVERITY.OFF, // deprecated after React 17 release

	// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
	'react/react-in-jsx-scope': SEVERITY.OFF, // deprecated after React 17 release
};
