const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const HTMLPlugins = () => {
  return glob.sync('src/html/**/*.html').map(
    (dir) =>
      new HTMLWebpackPlugin({
        template: dir,
        publicPath: '/',
        filename: dir.split(/src[\\/]html/)[1],
      }),
  );
};

module.exports = (_, { mode }) => {
  const isDev = mode === 'development';

  const plugins = [
    ...HTMLPlugins(),
    new EslintPlugin(),
    new StylelintPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          to: 'static',
          from: 'src/static',
        },
      ],
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.unshift(
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[fullhash].css',
      }),
    );

    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        reportFilename: '../report/index.html',
      }),
    );
  }

  return {
    entry: ['./src/scripts/index.js', './src/styles/main.scss'],

    output: {
      filename: 'scripts/[name].[fullhash].js',
      path: path.resolve(__dirname, 'dist'),
    },

    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s?css$/i,
          use: [
            isDev
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
                },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          type: 'asset/resource',
          test: /\.(png|jpe?g|gif|svg)$/i,
          generator: {
            filename: 'assets/[hash][ext]',
          },
        },
        {
          type: 'asset/resource',
          test: /\.(eot|woff2?|ttf)$/i,
          generator: {
            filename: 'fonts/[hash][ext]',
          },
        },
      ],
    },

    plugins,

    resolve: {
      extensions: ['.js', '.css', '.scss'],
    },

    devServer: {
      watchFiles: ['./src/**/*.html'],
      port: 8080,
      hot: isDev,
      open: isDev,
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    devtool: isDev ? 'inline-source-map' : 'source-map',

    cache: isDev,

    mode,
  };
};
