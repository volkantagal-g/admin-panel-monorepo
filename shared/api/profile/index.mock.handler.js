import * as MOCKS from './index.mock.data';

const getEmployeeDetailForProfileUrl = '/getEmployeeDetailForProfile';
const getActiveSessionsProfileUrl = '/getActiveSessions';

const getEmployeeDetailForProfileMockOptions = {
  url: getEmployeeDetailForProfileUrl,
  successData: MOCKS.mockedProfile.mockedEmployeeBasicsForProfileFull,
};

const getActiveSessionsProfileUrlMockOptions = {
  url: getActiveSessionsProfileUrl,
  successData: MOCKS.mockedProfile.mockedActiveSessions,
};

export default [
  getEmployeeDetailForProfileMockOptions,
  getActiveSessionsProfileUrlMockOptions,
];
