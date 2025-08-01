const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const appPackageVersion = require('./package.json').version;

const formattedAppPackageVersion = `v${appPackageVersion}`;

module.exports = {
  entry: { main: path.resolve(__dirname, './app/index.js') },
  // Where files should be sent once they are bundled
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },
  // Rules of how webpack will take our files, compile & bundle them for the browser
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },

        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                  ],
                ],
              },
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.md$/,
        type: 'asset/source',
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(process.cwd(), '../../shared/translations'),
          to: 'translations',
        },
        { from: path.join(process.cwd(), '../../shared/assets'), to: 'assets' },
        { from: path.join(process.cwd(), '../../shared/assets/images/logo/getir_icon.png'), to: 'favicon.ico' },
      ],
    }),
    new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
      if (!/\/moment\//.test(context.context)) {
        return;
      }
      // context needs to be modified in place
      Object.assign(context, {
        // include only CJK
        regExp: /^\.\/tr/,
        // point to the locale data folder relative to moment's src/lib/locale
        request: '../../locale',
      });
    }),

    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_GATEWAY_URI: JSON.stringify(
          process.env.REACT_APP_API_GATEWAY_URI,
        ),
        REACT_APP_LOCALS_PANEL_URL: JSON.stringify(
          process.env.REACT_APP_LOCALS_PANEL_URL,
        ),
        REACT_APP_GOOGLE_AUTH_CLIENT_ID: JSON.stringify(
          process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
        ),
        REACT_APP_YANDEX_JS_API_KEY: JSON.stringify(
          process.env.REACT_APP_YANDEX_JS_API_KEY,
        ),
        REACT_APP_GOOGLE_MAPS_API_KEY: JSON.stringify(process.env.REACT_APP_GOOGLE_MAPS_API_KEY),
        REACT_APP_GIS_GEOSERVER_URL: JSON.stringify(process.env.REACT_APP_GIS_GEOSERVER_URL),
        REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV || 'development'),
        REACT_APP_RUDDERSTACK_ANALYTICS_WRITE_KEY: JSON.stringify(
          process.env.REACT_APP_RUDDERSTACK_ANALYTICS_WRITE_KEY,
        ),
        REACT_APP_RUDDERSTACK_ANALYTICS_DATA_PLANE_URL: JSON.stringify(
          process.env.REACT_APP_RUDDERSTACK_ANALYTICS_DATA_PLANE_URL,
        ),
        REACT_APP_WATER_PANEL_URL: JSON.stringify(
          process.env.REACT_APP_WATER_PANEL_URL,
        ),
        REACT_APP_FOOD_RESTAURANT_PANEL_URL: JSON.stringify(
          process.env.REACT_APP_FOOD_RESTAURANT_PANEL_URL,
        ),
        REACT_APP_VERSION:
          JSON.stringify(process.env.VERSION)
          || JSON.stringify(formattedAppPackageVersion),
        REACT_APP_TARGET_ENV: JSON.stringify(process.env.REACT_APP_TARGET_ENV || 'N/A'),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      'react-dom/server': 'react-dom/server',
      'react/jsx-runtime': 'react/jsx-runtime',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
    }),
  ],
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.react.js', '.less'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    fallback: {
      fs: false,
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'react-dom/server': require.resolve('react-dom/server'),
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
    },
    alias: {
      react: path.resolve(__dirname, '../../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../../node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, '../../../node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(__dirname, '../../../node_modules/react/jsx-dev-runtime'),
      '@app': path.resolve(__dirname, './app/'),
      '@shared': path.resolve(__dirname, '../../shared/'),
      '@public': path.resolve(__dirname, './public/'),
      '@test': path.resolve(__dirname, './test/'),
      '@e2e': path.resolve(__dirname, './e2e/'),
    },
  },
  target: ['browserslist'],
};
