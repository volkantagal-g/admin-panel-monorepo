import * as MOCKS from './index.mock.data';

const getTeamsMock = {
  url: '/internalAuthentication/getTeams',
  method: 'post',
  successData: MOCKS.mockedTeams,
};

const getTeamMock = {
  url: '/internalAuthentication/getTeam',
  method: 'post',
  successData: MOCKS.mockedTeams[0],
};

const updateTeamMock = {
  url: '/internalAuthentication/updateTeam',
  method: 'post',
  successData: MOCKS.mockedTeams[0],
};

const createTeamMock = {
  url: '/internalAuthentication/createTeam',
  method: 'post',
  successData: MOCKS.mockedTeams[0],
};

const deleteTeamMock = {
  url: '/internalAuthentication/deleteTeam',
  method: 'post',
  successData: {},
};

const getTeamServicesMock = {
  url: '/internalAuthentication/getTeamServices',
  method: 'post',
  successData: MOCKS.mockedTeamServices,
};

const createTeamServiceMock = {
  url: '/internalAuthentication/createTeamService',
  method: 'post',
  successData: MOCKS.mockedTeamServices[0],
};

const getServicesMock = {
  url: '/internalAuthentication/getServices',
  method: 'post',
  successData: MOCKS.mockedServices,
};

const getServiceMock = {
  url: '/internalAuthentication/getService',
  method: 'post',
  successData: MOCKS.mockedServices[0],
};

const updateServiceMock = {
  url: '/internalAuthentication/updateService',
  method: 'post',
  successData: MOCKS.mockedServices[0],
};

const deleteServiceMock = {
  url: '/internalAuthentication/deleteService',
  method: 'post',
  successData: {},
};

const getSlackConfigurationsMock = {
  url: '/internalAuthentication/getSlackConfigurations',
  method: 'post',
  successData: MOCKS.mockedSlackConfigurations,
};

const generateSlackTokenMock = {
  url: '/internalAuthentication/generateSlackToken',
  method: 'post',
  successData: {},
};

const updateSlackConfigurationsMock = {
  url: '/internalAuthentication/updateSlackConfigurations',
  method: 'post',
  successData: {},
};

export default [
  getTeamsMock,
  getTeamMock,
  updateTeamMock,
  createTeamMock,
  deleteTeamMock,
  getTeamServicesMock,
  createTeamServiceMock,
  getServicesMock,
  getServiceMock,
  updateServiceMock,
  deleteServiceMock,
  getSlackConfigurationsMock,
  generateSlackTokenMock,
  updateSlackConfigurationsMock,
];
