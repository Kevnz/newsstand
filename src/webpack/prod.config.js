const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./config')
const prodConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './src/ui/index.html',
      historyApiFallback: true,
    }),
  ],
  output: {
    path: path.join(process.cwd(), '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
}

module.exports = {
  ...baseConfig,
  ...prodConfig,
}
