import builtins from 'rollup-plugin-node-builtins';
/*
  Using builtins to avoid the following warning: 
  "Missing shims for Node.js built-ins.
   Creating a browser bundle that depends on 'os'. You might need to include https://www.npmjs.com/package/rollup-plugin-node-builtins"
*/
export default {
  input: 'dist/es6/core.js', // rollup requires ES input
  output: {
    format: 'umd',
    name: '@yellicode/core',
    file: 'dist/bundles/core.umd.js'
  },
  globals: {
    'uuid':'uuid'
  },  
  external: ['uuid'], // https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency
  plugins: [
    builtins()
  ]
}
