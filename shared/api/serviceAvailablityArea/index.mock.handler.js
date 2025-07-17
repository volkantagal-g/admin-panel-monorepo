import * as MOCKS from './index.mock.data';

const getByFiltersUrl = '/saa/getByFilters';
const getByFiltersMockOptions = {
  url: getByFiltersUrl,
  method: 'post',
  successData: MOCKS.mockedSaaList,
};

const getByFiltersMockError = {
  url: getByFiltersUrl,
  method: 'post',
  errorData: { msg: 'Get SAA List Error' },
};

const getByIdUrl = '/saa/getById';
const getByIdMockOptions = {
  url: getByIdUrl,
  method: 'post',
  successData: MOCKS.mockedSaaDetail,
};

export default [
  getByFiltersMockOptions,
  getByFiltersMockError,
  getByIdMockOptions,
];
