import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
	],
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
			generateScopedName: '[local] [local]___[hash:base64:5]',
		},
	},
	
});
