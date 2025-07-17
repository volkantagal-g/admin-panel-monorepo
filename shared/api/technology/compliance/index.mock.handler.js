import * as MOCKS from './index.mock.data';

const getSummaryMockOptions = {
  url: '/compliance/getSummary',
  successData: MOCKS.mockedSummary,
};

const getRepositoriesMockOptions = {
  url: '/compliance/getRepositories',
  successData: MOCKS.mockedRepositories,
};

const getVulnerabilitiesMockOptions = {
  url: '/compliance/getVulnerabilities',
  successData: MOCKS.mockedVulnerabilities,
};

const getNodeVersionsMockOptions = {
  url: '/compliance/getNodeVersions',
  successData: MOCKS.mockedNodeVersions,
};

export default [getSummaryMockOptions, getRepositoriesMockOptions, getVulnerabilitiesMockOptions, getNodeVersionsMockOptions];
