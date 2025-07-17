import * as MOCKS from './index.mock.data';

const searchUrl = '/search';

const searchMockOptions = {
  url: searchUrl,
  successData: MOCKS.mockedClients,
};

export default [searchMockOptions];
