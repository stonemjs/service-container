import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import multi from '@rollup/plugin-multi-entry'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodeExternals from 'rollup-plugin-node-externals'

const inputs = {
  container: 'src/Container.mjs',
  decorators: 'src/decorators/*.mjs'
}

export default Object.entries(inputs).map(([name, input]) => ({
	input,
	output: [
    { format: 'es', file: `dist/${name}.mjs` },
    { format: 'cjs', file: `dist/${name}.cjs` }
  ],
  plugins: [
    json(),
    multi(),
    nodeExternals({ deps: false }), // Must always be before `nodeResolve()`.
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
  ]
}))