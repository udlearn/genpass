const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'src/index.js',
  output: {
    dir: 'lib',
    format: 'cjs'
  },
  plugins: [commonjs()]
};