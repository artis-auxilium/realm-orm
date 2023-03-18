import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const plugins = [
    babel({exclude: 'node_modules/realm', babelHelpers: "bundled"}),
    resolve({
        // module: true,
        // jsnext: true,
        // main: true,
        preferBuiltins: true,
        browser: false,
        modulesOnly: true,
    }),
    commonjs(),
];

const createConfig = (filename) => ({
    input: `./${filename}.js`,
    output: [
        {
            file: `./dist/${filename}.js`,
            format: 'cjs',
            exports: 'auto',
        }
    ],
    external: ['realm'],
    plugins,
});


const configs = [
    'index',
    'Model',
].map((filename) => createConfig(filename));

export default configs;
