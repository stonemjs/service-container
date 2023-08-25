const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.mjs'),
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new NodePolyfillPlugin({ excludeAliases: ['console'] }),
  ],
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
    globalObject: 'this',
    library: 'ContainerExample',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.m?js$/,
        use: 'glob-import-loader'
      },
    ]
  }
}
