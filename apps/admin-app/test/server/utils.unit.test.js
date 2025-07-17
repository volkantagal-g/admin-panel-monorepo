// TESTING_PRACTICE_EXAMPLE UNIT_TEST
const { validate, DEFAULT_VALUES, searchParamsToQueryObject } = require('./utils');

const TEST_CASES = [
  {
    description: 'options = undefined should throw',
    options: undefined,
    shouldThrow: true,
  },
  {
    description: 'options = null should throw',
    options: null,
    shouldThrow: true,
  },
  {
    description: 'options = {} should throw',
    options: {},
    shouldThrow: true,
  },
  {
    description: 'No "url" should throw',
    options: { method: 'GET', successData: 'data' },
    shouldThrow: true,
  },
  {
    description: 'No data or handler should throw',
    options: { url: '/path', method: 'GET' },
    shouldThrow: true,
  },
  {
    description: '"url" + "successData" should not throw',
    options: { url: '/path', successData: 'successData' },
    shouldThrow: false,
  },
  {
    description: '"url" + "errorData" should not throw',
    options: { url: '/path', errorData: 'errorData' },
    shouldThrow: false,
  },
  {
    description: '"successData" + "errorData" should throw, as one needs to be choosen',
    options: { url: '/path', successData: 'successData', errorData: 'errorData' },
    shouldThrow: true,
  },
  {
    description: '"successData" + "handler" should throw, as one needs to be choosen',
    options: { url: '/path', successData: 'successData', handler: () => {} },
    shouldThrow: true,
  },
  {
    description: '"errorData" + "handler" should throw, as one needs to be choosen',
    options: { url: '/path', errorData: 'errorData', handler: () => {} },
    shouldThrow: true,
  },
  {
    description: '"baseUrl" and "method" are optional, so return value should include them even if they are not set',
    options: { url: '/path', successData: 'success' },
    expected: { url: '/path', successData: 'success', ...DEFAULT_VALUES },
  },
];

describe('validate function of createHandler', () => {
  it.each(TEST_CASES)('($description)', testCase => {
    const { options, shouldThrow, expected } = testCase;
    if (shouldThrow !== undefined) {
      if (shouldThrow) {
        expect(() => validate(options)).toThrow();
      }
      else {
        expect(() => validate(options)).not.toThrow();
      }
    }
    if (expected !== undefined) {
      expect(validate(options)).toEqual(expected);
    }
  });
});

const TEST_CASES_2 = [
  {
    description: 'argument (undefined) which is not an object instance of URLSearchParams should return empty object',
    input: undefined,
    expected: {},
  },
  {
    description: 'argument (null) should return empty object',
    input: null,
    expected: {},
  },
  {
    description: 'argument ("string") should return empty object',
    input: 'string',
    expected: {},
  },
  {
    description: 'Empty search params should return empty object',
    input: new URLSearchParams('?'),
    expected: {},
  },
  {
    description: 'Non-empty search params should return correct object',
    input: new URLSearchParams('?a=1&b=2'),
    expected: {
      a: '1',
      b: '2',
    },
  },

];

describe('searchParamsToQueryObject utility function', () => {
  it.each(TEST_CASES_2)('($description)', testCase => {
    const { input, expected } = testCase;
    expect(searchParamsToQueryObject(input)).toEqual(expected);
  });
});
