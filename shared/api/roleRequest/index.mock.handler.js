import * as MOCKS from './index.mock.data';

// TODO: write tests for this endpoint and its usage
const getUserRoleRequestsUrl = '/roleRequest/getUserRoleRequests';

const getUserRoleRequestsMockOptions = {
  url: getUserRoleRequestsUrl,
  successData: MOCKS.mockedUserRoleRequests,
};

export default [getUserRoleRequestsMockOptions];
