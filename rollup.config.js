import babel from 'rollup-plugin-babel';
export default {
	input: 'lib/index.js',
	output: {
		file: 'dist/index.js',
		format: 'umd',
		name: 'DOMObserver'
	},
	plugins: [
		babel({
			exclude: ['node_modules/**'],
			runtimeHelpers: true
		})
	]
};