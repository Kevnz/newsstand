const path = require('path')

module.exports = {
  entry: './src/ui/index.js',
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ca]ss$/,
        loader: 'style-loader!css-loader!resolve-url-loader!sass-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.mjs', '.js', '.jsx'],
    modules: ['node_modules', 'src'],
    alias: {
      '_variables.sass': path.resolve(
        __dirname,
        '../',
        'ui',
        '_variables.sass'
      ),
    },
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
}
