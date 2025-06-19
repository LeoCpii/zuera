import path from 'path';
import { glob } from 'glob';
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import packageJson from './package.json';

export default [
    {
        input: glob.sync('src/**/index.ts'),
        external: [
            ...Object.keys(packageJson.peerDependencies),
            '@zuera/toolkit',
        ],
        output: [
            {
                dir: path.dirname(packageJson.main),
                format: 'esm',
                sourcemap: true,
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
        ],
        plugins: [
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            resolve(),
            terser(),
            image(),
            postcss({
                use: [['sass']],
                preprocessor: (_, id) => new Promise((resolve) => {
                    const result = sass.renderSync({ file: id });
                    resolve({ code: result.css.toString() });
                }),
                minimize: true,
                sourceMap: true,
                extract: 'styles/index.css',
                extensions: ['.sass', '.css', '.scss'],
                additionalData: '@use "src/styles/main.scss" as *;',
            })
        ],
    }
];
