import {SEVERITY} from './constants.js';


// config for eslint-plugin-react-hooks 5.2.0
/** @type {import('eslint').Linter.Config.rules} */
export const reactHooksRules = {
	'react-hooks/rules-of-hooks': SEVERITY.ERROR,
	'react-hooks/exhaustive-deps': SEVERITY.ERROR,
};
