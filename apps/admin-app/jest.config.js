const thresholdEnabled = process.env.COVERAGE_THRESHOLD_ENABLED === 'true';

module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  testTimeout: 15_000,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/index.js',
    '!app/**/*.test.{js,jsx,ts,tsx}',
    '!app/**/*.spec.{js,jsx,ts,tsx}',
    '!app/services/**',
    '!app/assets/**',
    '!app/translations/**',
    '!app/pages/GetirFood/OrderDetail/components/utils/**',
    '!app/components/GIS/Maps/**',
    '!app/containers/GIS/Maps/**',
  ],
  coverageDirectory: './coverage/',
  coverageThreshold: thresholdEnabled ? {
    // TODO: start with 20, slowly increase to 80 for easy adoption
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  } : undefined,
  testResultsProcessor: 'jest-sonar-reporter',
  moduleDirectories: ['node_modules', 'app', 'test'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/test/mock/styles.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/mock/image.js',
    '@app/(.*)$': '<rootDir>/app/$1',
    '@test/(.*)$': '<rootDir>/test/$1',
    d3: '<rootDir>/node_modules/d3/dist/d3.min.js',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/toBeRefactored/', '<rootDir>/e2e/'],
  transformIgnorePatterns:
    ['/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime|moment|react-odometerjs|react-dnd|dnd-core|react-dnd-html5-backend).+(js|jsx)$'],
  setupFiles: ['<rootDir>/test/setupFiles.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setupFilesAfterEnv.js'],
  testMatch: ['**/*.(spec|test).(js|jsx|ts|tsx)'],
};
