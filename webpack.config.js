const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './index.js'),
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    libraryTarget: 'umd',
    library: 'Container',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      base: path.resolve(__dirname, '')
    },
    fallback: {
      path: false
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: 'glob-import-loader' // https://www.npmjs.com/package/glob-import-loader
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              ["@babel/plugin-proposal-decorators", { "version": "2023-05" }]
            ]
          }
        }
      },
    ]
  }
}
