require('dotenv').config();

const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const base = require('./webpack.base.config');

const devConfig = merge(base, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: 'auto',
  },
  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',
  devServer: {
    port: process.env.PORT || 9002,
    open: true,
    hot: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: { overlay: false },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            // https://webpack.js.org/loaders/thread-loader/
            loader: 'thread-loader',
            options: {
              workers: 4,
              workerParallelJobs: 20,
              poolRespawn: false,
              // watch mode, don't timeout
              poolTimeout: Infinity,
              poolParallelJobs: 200,
            },
          },
          {
            loader: 'babel-loader',
            // fast refresh plugin
            options: {
              // default directory is node_modules/.cache/babel-loader
              cacheDirectory: true,
              cacheCompression: false,
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'admin_app',
      filename: 'remoteEntry.js',
      exposes: {
        './AdminApp': './app/AdminAppComponent.tsx',
      },
      shared: {
        react: { 
          singleton: true, 
          requiredVersion: '^17.0.2',
          eager: true,
          shareScope: 'default'
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: '^17.0.2',
          eager: true,
          shareScope: 'default'
        },
        'react-redux': {
          singleton: true,
          requiredVersion: '^7.2.9',
          eager: true,
          shareScope: 'default'
        },
        '@reduxjs/toolkit': {
          singleton: true,
          requiredVersion: '^1.9.7',
          eager: true,
          shareScope: 'default'
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      filename: './index.html',
      inject: true,
      templateParameters() {
        return { REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV) };
      },
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  optimization: { splitChunks: false },
  performance: { hints: false },
  cache: {
    name: 'dev-server',
    // default is in memory, but making it filesystem is good for "npm start"s
    type: 'filesystem',
    // default directory is node_modules/.cache/webpack
    // print stats of cache usage
    profile: true,
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
    },
    // NOTE: if we change webpack options, change this, or remove old cache
    version: '1.1.0',
  },
});

module.exports = devConfig;
