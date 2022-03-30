/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
	transform: {
		'^.+\\.svelte$': [
			'svelte-jester',
			{
				preprocess: true
			}
		],
		'^.+\\.ts$': 'ts-jest',
		'^.+\\.js$': 'babel-jest'
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['js', 'ts', 'svelte'],
	testPathIgnorePatterns: ['/__utils__/']
};

export default config;
