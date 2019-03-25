const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./config')

const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './src/ui/index.html',
      historyApiFallback: true,
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/graphql': 'http://localhost:4567/',
    },
  },
}

module.exports = {
  ...baseConfig,
  ...devConfig,
}
