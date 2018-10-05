export default {
  input: 'dist/es6/core.js', // rollup requires ES input
  output: {
    format: 'umd',
    name: '@yellicode/core',
    file: 'dist/bundles/core.umd.js'
  } 
}
