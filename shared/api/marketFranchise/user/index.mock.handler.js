import * as MOCKS from './index.mock.data';

const getMarketFranchiseUserListURL = '/franchiseUser/filter';
const getFranchiseUserDetailURL = '/franchiseUser/detail';
const getRoleGroupsURL = '/franchiseUserRoleGroup/filter';
const getFranchisesURL = '/marketFranchise/getMarketFranchises';
const getRolesURL = '/franchiseRole/listAll';
const getReportsURL = '/franchiseUserRoleGroup/getFranchiseReports';
const exportFranchiseUsersURL = '/franchiseUser/export';
const getRoleGroupDetailURL = '/franchiseUserRoleGroup/detail';

const getMarketFranchiseUserListConfigMock = {
  url: getMarketFranchiseUserListURL,
  // TODO: Fix success data when you need it, i just mocked it empty array to prevent a test failure
  successData: [],
};

const getFranchiseUserDetailConfigMock = {
  url: getFranchiseUserDetailURL,
  method: 'get',
  successData: MOCKS.franchiseUserDetailMock,
};

const getRoleGroupsConfigMock = {
  url: getRoleGroupsURL,
  method: 'post',
  successData: MOCKS.roleGroupsMock,
};

const getFranchisesConfigMock = {
  url: getFranchisesURL,
  method: 'post',
  successData: MOCKS.franchisesMock,
};

const getRolesConfigMock = {
  url: getRolesURL,
  method: 'post',
  successData: MOCKS.rolesMock,
};

const getReportsMock = {
  url: getReportsURL,
  method: 'post',
  successData: MOCKS.reportsMock,
};

const exportFranchiseUsersMock = {
  url: exportFranchiseUsersURL,
  method: 'get',
  successData: MOCKS.exportFranchiseUsersMock,
};

const getRoleGroupDetailConfigMock = {
  url: getRoleGroupDetailURL,
  method: 'post',
  successData: MOCKS.getRoleGroupDetailMock,
};

export default [
  getMarketFranchiseUserListConfigMock,
  getFranchiseUserDetailConfigMock,
  getRoleGroupsConfigMock,
  getFranchisesConfigMock,
  getRolesConfigMock,
  getReportsMock,
  exportFranchiseUsersMock,
  getRoleGroupDetailConfigMock,
];
