import { resolve } from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export const mode = 'production'
export const entry = resolve(__dirname, './index.js')
export const devtool = 'inline-source-map'
export const plugins = [
  new CleanWebpackPlugin()
]
export const output = {
  libraryTarget: 'umd',
  library: 'Container',
  filename: 'bundle.js',
  path: resolve(__dirname, 'dist')
}
export const module = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-decorators',
            '@babel/plugin-proposal-object-rest-spread',
          ]
        }
      }
    },
  ]
}
