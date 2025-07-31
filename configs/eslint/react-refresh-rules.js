import {SEVERITY} from './constants.js';


// config for eslint-plugin-react-refresh 0.4.19
/** @type {import('eslint').Linter.Config.rules} */
export const reactRefreshRules = {
	'react-refresh/only-export-components': [SEVERITY.ERROR, {
		allowConstantExport: true,
	}],
};
