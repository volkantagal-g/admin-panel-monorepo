import * as MOCKS from './index.mock.data';

const getTobbGibRequestUrl = '/tobb/requestVKNInfo';

const getTobbGibRequestMockOptions = {
  url: getTobbGibRequestUrl,
  method: 'post',
  successData: MOCKS.mockedGetTobbGibRequest,
};

export default [getTobbGibRequestMockOptions];
