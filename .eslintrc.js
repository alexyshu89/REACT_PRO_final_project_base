module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: false,
	},
	plugins: ['boundaries', '@typescript-eslint'],
	settings: {
		react: {
			version: 'detect',
		},
		'import/extensions': [
			'.js',
			'.jsx',
			'.ts',
			'.tsx',
			'.png',
			'.jpg',
			'.svg',
			'.css',
		],
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: './tsconfig.json',
				node: {
					extensions: [
						'.js',
						'.jsx',
						'.ts',
						'.tsx',
						'.png',
						'.jpg',
						'.svg',
						'.css',
					],
				},
			},
			'boundaries/elements': [
				{ type: 'app', pattern: 'src/app' },
				{ type: 'pages', pattern: 'src/pages/*' },
				{ type: 'widgets', pattern: 'src/widgets/*' },
				{ type: 'features', pattern: 'src/features/*' },
				{ type: 'entities', pattern: 'src/entities/*' },
				{ type: 'shared', pattern: 'src/shared' },
			],
		},
		extends: [
			'plugin:@typescript-eslint/recommended',
			'plugin:prettier/recommended',
			'prettier',
			'plugin:react/recommended',
			'plugin:react-hooks/recommended',
			'plugin:import/errors',
			'plugin:import/warnings',
			'plugin:import/typescript',
			'plugin:jsx-a11y/recommended',
			'plugin:eslint-comments/recommended',
			'plugin:boundaries/recommended',
		],
		rules: {
			semi: [2, 'always'],
			quotes: [2, 'single', { avoidEscape: true }],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error'],
			'@typescript-eslint/no-var-requires': 'off',
			'react/prop-types': 'off',
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'import/no-relative-parent-imports': 'error',
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					pathGroups: [
						{ pattern: 'app/**', group: 'internal', position: 'after' },
						{ pattern: 'pages/**', group: 'internal', position: 'after' },
						{ pattern: 'widgets/**', group: 'internal', position: 'after' },
						{ pattern: 'features/**', group: 'internal', position: 'after' },
						{ pattern: 'entities/**', group: 'internal', position: 'after' },
						{ pattern: 'shared/**', group: 'internal', position: 'after' },
					],
					pathGroupsExcludedImportTypes: ['builtin'],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],

			'boundaries/dependencies': [
				'error',
				{
					default: 'disallow',
					message: '{{from.type}} нельзя импортировать из {{to.type}}',
					rules: [
						{
							from: { type: 'app' },
							allow: [
								{
									to: {
										type: [
											'pages',
											'widgets',
											'features',
											'entities',
											'shared',
										],
									},
								},
							],
						},
						{
							from: { type: 'pages' },
							allow: [
								{ to: { type: ['widgets', 'features', 'entities', 'shared'] } },
							],
						},
						{
							from: { type: 'widgets' },
							allow: [{ to: { type: ['features', 'entities', 'shared'] } }],
						},
						{
							from: { type: 'features' },
							allow: [{ to: { type: ['entities', 'shared'] } }],
						},
						{
							from: { type: 'entities' },
							allow: [{ to: { type: ['shared'] } }],
						},
						{ from: { type: 'shared' }, allow: [{ to: { type: ['shared'] } }] },
						{
							disallow: [
								{
									to: {
										type: [
											'app',
											'pages',
											'widgets',
											'features',
											'entities',
											'shared',
										],
										internalPath: '!index.{ts,tsx,js,jsx}',
									},
								},
							],
							message:
								'Импорт из другого слайса разрешен только через его публичное API (index.ts)',
						},
					],
				},
			],
		},
	},
};
