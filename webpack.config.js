const path = require('path');

module.exports = {
  entry: {
    pluginSidebar: './plugins/sidebar/index.js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /.js$/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
  },
};
