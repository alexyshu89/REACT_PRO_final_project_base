const esbuild = require('esbuild');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

async function runBuild() {
	console.time('Bundle time');

	try {
		console.log('⏳ Шаг 1: Локальная транспиляция через SWC...');
		execSync('npx swc src -d dist-swc --strip-leading-paths', {
			stdio: 'inherit',
		});

		console.log('⏳ Шаг 2: Изолированный бандлинг через Esbuild...');

		await esbuild.build({
			entryPoints: ['dist-swc/index.js'],
			outdir: 'dist-esbuild',
			bundle: true,
			minify: true,
			sourcemap: false,
			target: ['es2020'],

			absWorkingDir: __dirname,
			nodePaths: [path.resolve(__dirname, 'node_modules')],

			alias: {
				shared: path.resolve(__dirname, './dist-swc/shared'),
				entities: path.resolve(__dirname, './dist-swc/entities'),
				features: path.resolve(__dirname, './dist-swc/features'),
				widgets: path.resolve(__dirname, './dist-swc/widgets'),
				pages: path.resolve(__dirname, './dist-swc/pages'),
				app: path.resolve(__dirname, './dist-swc/app'),
			},

			plugins: [
				{
					name: 'isolate-and-fix-assets',
					setup(build) {
						build.onResolve(
							{ filter: /\.(css|svg|png|jpg|jpeg|woff|woff2)$/ },
							(args) => {
								if (args.path.startsWith('.')) {
									const absolutePathInSwc = path.resolve(
										args.resolveDir,
										args.path
									);
									const relativeToProject = path.relative(
										path.resolve(__dirname, 'dist-swc'),
										absolutePathInSwc
									);
									return {
										path: path.resolve(__dirname, 'src', relativeToProject),
									};
								}
								const fsdLayers = [
									'shared',
									'entities',
									'features',
									'widgets',
									'pages',
									'app',
								];
								const layer = fsdLayers.find((l) => args.path.startsWith(l));
								if (layer) {
									return { path: path.resolve(__dirname, 'src', args.path) };
								}
								return null;
							}
						);

						build.onResolve({ filter: /^[^./]/ }, (args) => {
							const fsdLayers = [
								'shared',
								'entities',
								'features',
								'widgets',
								'pages',
								'app',
							];
							if (fsdLayers.some((layer) => args.path.startsWith(layer)))
								return null;

							try {
								return {
									path: require.resolve(args.path, {
										paths: [path.resolve(__dirname, 'node_modules')],
									}),
								};
							} catch (e) {
								return null;
							}
						});
					},
				},
			],

			loader: {
				'.css': 'css',
				'.svg': 'file',
				'.png': 'file',
				'.jpg': 'file',
				'.jpeg': 'file',
				'.woff': 'file',
				'.woff2': 'file',
			},
		});

		if (fs.existsSync(path.resolve(__dirname, 'dist-swc'))) {
			fs.rmSync(path.resolve(__dirname, 'dist-swc'), {
				recursive: true,
				force: true,
			});
		}

		console.log('✨ Альтернативная сборка Esbuild + SWC успешно завершена!');
		console.timeEnd('Bundle time');
	} catch (error) {
		console.error('❌ Ошибка сборки:', error);
		if (fs.existsSync(path.resolve(__dirname, 'dist-swc'))) {
			fs.rmSync(path.resolve(__dirname, 'dist-swc'), {
				recursive: true,
				force: true,
			});
		}
		process.exit(1);
	}
}

runBuild();
