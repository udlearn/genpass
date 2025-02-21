const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      dir: 'lib',
      format: 'cjs',
      exports: 'named'
    },
    plugins: [commonjs(), typescript()]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/types.d.ts',
      format: 'esm'
    },
    plugins: [require('rollup-plugin-dts').dts()]
  },
  {
    input: 'src/cli.ts',
    output: {
      dir: 'lib',
      format: 'cjs',
      exports: 'named'
    },
    external: ['yargs-parser'],
    plugins: [commonjs(), typescript()]
  },
];