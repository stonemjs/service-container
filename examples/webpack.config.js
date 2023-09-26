const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.mjs'),
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
    globalObject: 'this',
    library: 'StoneJSContainerExample',
    path: path.resolve(__dirname, 'dist'),
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
        use: 'webpack-import-glob'
      },
    ]
  }
}
