import multi from '@rollup/plugin-multi-entry'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodeExternals from 'rollup-plugin-node-externals'

const inputs = {
  index: 'src/**/*.ts'
}

export default Object.entries(inputs).map(([name, input]) => ({
	input,
	output: [
    { format: 'es', file: `dist/${name}.js` }
  ],
  plugins: [
    multi(),
    nodeExternals(), // Must always be before `nodeResolve()`.
    nodeResolve({
      extensions: ['.js', '.mjs', '.ts'],
      exportConditions: ['node', 'import', 'require', 'default']
    }),
    typescript({
      noEmitOnError: true,
      tsconfig: './tsconfig.build.json',
    }),
    commonjs()
  ]
}))