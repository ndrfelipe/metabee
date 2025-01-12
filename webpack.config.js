const path = require('path'); // CommonJS

module.exports = {
  mode: 'production',
  entry: './frontend/main.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'bundle.js',
    publicPath: './frontend/assets/css', // Caminho absoluto para acessar os arquivos estáticos
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Adiciona o CSS ao DOM
      },
    ],
  },
  devtool: 'source-map',
};