const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'lib',
        format: 'cjs',
        exports: 'named',
      },
      {
        file: 'lib/bundle.js',
        format: 'umd',
        name: 'genpass',
        exports: 'named',
      },
      {
        file: 'lib/bundle.min.js',
        format: 'umd',
        name: 'genpass',
        exports: 'named',
        plugins: [terser()],
      },
    ],
    plugins: [commonjs(), typescript({ removeComments: false })],
  },
  {
    input: 'src/index.ts',
    output: { file: 'lib/index.mjs', format: 'esm' },
    plugins: [commonjs(), typescript({ tsconfig: './tsconfig.esm.json' })],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/types.d.ts',
      format: 'esm',
    },
    plugins: [require('rollup-plugin-dts').dts({ compilerOptions: { removeComments: false } })],
  },
  {
    input: 'src/cli.ts',
    output: {
      dir: 'lib',
      format: 'cjs',
      exports: 'named',
    },
    external: ['yargs-parser'],
    plugins: [commonjs(), typescript()],
  },
];
