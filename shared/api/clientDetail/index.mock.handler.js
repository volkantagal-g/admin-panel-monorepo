import * as MOCKS from './index.mock.data';

const getMockedClientDetailByClientIdSuccessResponse = {
  url: '/v1/clientDetail/getClientByClientId',
  method: 'post',
  handler: req => {
    const { clientId, integrationKey } = req.body;
    if (clientId) return MOCKS.FAILURE_RESPONSE;
    if (integrationKey) return MOCKS.mockedIntegrationClientDetails;
    return MOCKS.mockedClientDetails;
  },
};

const getClientDetailAccessTokenSuccessResponse = {
  url: '/v1/clientDetail/getClientDetailAccessToken',
  method: 'post',
  successData: MOCKS.getClientDetailAccessToken,
};

const getMockedGetirJobsClientStatusSuccessResponse = {
  url: '/clientDetail/getirJobs/status/:id',
  method: 'get',
  successData: MOCKS.mockedGetirJobsClientStatus,
};

export default [
  getMockedClientDetailByClientIdSuccessResponse,
  getClientDetailAccessTokenSuccessResponse,
  getMockedGetirJobsClientStatusSuccessResponse,
];
