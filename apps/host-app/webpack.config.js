const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    alias: {
      react: require('path').resolve(__dirname, '../../node_modules/react'),
      'react-dom': require('path').resolve(__dirname, '../../node_modules/react-dom'),
      '@app': path.resolve(__dirname, './src/'),
      '@appAdmin': path.resolve(__dirname, '../../admin-app/app'),
      '@shared': path.resolve(__dirname, '../../shared/'),
      '@public': path.resolve(__dirname, './public/')
    },
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
      "util": require.resolve("util"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
    },
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 9003,
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              ['@babel/preset-typescript', { allowDeclareFields: true, onlyRemoveTypeImports: true }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        exclude: /\.svg$/i,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host_app',
      remotes: {
        user_app: 'user_app@http://localhost:8083/remoteEntry.js',
        product_app: 'product_app@http://localhost:8081/remoteEntry.js',
        admin_app: 'admin_app@http://localhost:9002/remoteEntry.js',
        market_app: 'market_app@http://localhost:9001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: false, eager: true },
        'react-dom': { singleton: true, requiredVersion: false, eager: true },
        'react-router-dom': {singleton: true, eager: true}
      },
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}; 