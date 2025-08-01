module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: '3.22',
      },
    ],
    [
      '@babel/preset-react',
      { runtime: 'classic' },
    ],
    [
      '@babel/preset-typescript',
      {
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
      },
    ],
  ],
  plugins: [
    // https://github.com/lodash/babel-plugin-lodash/pull/261#issuecomment-1603282271
    '@sigmacomputing/babel-plugin-lodash',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-proposal-export-default-from',
    ['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
    }, 'antd'],
    ['import', {
      libraryName: '@ant-design/icons',
      libraryDirectory: 'lib/icons',
      camel2DashComponentName: false,
    }, '@ant-design/icons'],
  ],
  env: {
    production: { plugins: ['transform-react-remove-prop-types'] },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
