const path = require('path');

module.exports = {
  entry: {
    blockSampleBlock: './blocks/sampleBlock/index.js',
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
