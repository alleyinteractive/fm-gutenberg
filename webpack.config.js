const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StatsPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const createWriteWpAssetManifest = require('./webpack/wpAssets');

module.exports = (env, argv) => {
  const { mode } = argv;

  return {
    devtool: 'production' === mode
      ? 'source-map'
      : 'cheap-module-eval-source-map',
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
      filename: 'production' === mode
        ? '[name].[chunkhash].bundle.min.js'
        : '[name].js',
      path: path.join(__dirname, 'build'),
    },
    plugins: [
      new StatsPlugin({
        transform: createWriteWpAssetManifest(mode),
        fields: ['assetsByChunkName', 'hash'],
        filename: 'assetMap.json',
      }),
      ...('production' === mode
        ? [
          new CleanWebpackPlugin(),
        ] : []
      ),
    ],
  };
};
