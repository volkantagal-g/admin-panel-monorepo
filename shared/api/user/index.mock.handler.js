// TESTING_PRACTICE_EXAMPLE MOCK_HANDLER_OPTIONS
import { mockedAuthTempToken } from '../auth/index.mock.data';
import * as MOCKS from './index.mock.data';

const refreshLoggedInUserMockOptions = {
  url: '/user/refreshLoggedInUser',
  // random 32 character string
  successData: mockedAuthTempToken('12345678901234567890123456789012'),
};

const getUserByIdUrl = '/user/getUser';

const getUserByIdMockOptions = {
  url: getUserByIdUrl,
  handler: req => {
    // we want to pass the same id that is requested, so, use "handler" property
    const { id } = req.body;
    return { data: { ...MOCKS.mockedUser, _id: id } };
  },
};

const getUsersUrl = '/user/getUsers';

const getUsersMockOptions = {
  url: getUsersUrl,
  successData: MOCKS.mockedUsers,
};

const createUserUrl = '/user/createUser';

const createUserMockOptions = {
  url: createUserUrl,
  successData: { _id: 'success_id' },
};

const bulkInactivateExternalCustomerServicesAccountsUrl = '/user/bulkInactivateExternalCustomerServicesAccounts';
const bulkInactivateExternalCustomerServicesAccountsMockOptions = {
  url: bulkInactivateExternalCustomerServicesAccountsUrl,
  successData: MOCKS.mockedBulkInactivateExternalCustomerServicesAccountsResponse,
};

const getUserRolesUrl = '/user/getUserRoles';

const getUserRolesMockOptions = {
  url: getUserRolesUrl,
  successData: MOCKS.mockedUserRoles,
};

const bulkCreateTeleperformanceUsersUrl = '/user/bulkCreateTeleperformanceUsers';
const bulkCreateTeleperformanceUsersMockOptions = {
  url: bulkCreateTeleperformanceUsersUrl,
  successData: MOCKS.mockedBulkCreateTeleperformanceUsersResponse,
};

const bulkCreateWebhelpUsersGlobalUrl = '/user/bulkCreateWebhelpUsersGlobal';
const bulkCreateWebhelpUsersGlobalMockOptions = {
  url: bulkCreateWebhelpUsersGlobalUrl,
  successData: MOCKS.mockedBulkCreateWebhelpUsersGlobalResponse,
};

const bulkCreateWebhelpUsersTurkeyUrl = '/user/bulkCreateWebhelpUsersTurkey';
const bulkCreateWebhelpUsersTurkeyMockOptions = {
  url: bulkCreateWebhelpUsersTurkeyUrl,
  successData: MOCKS.mockedBulkCreateWebhelpUsersTurkeyResponse,
};

const bulkCreateAssisttUsersUrl = '/user/bulkCreateAssisttUsers';
const bulkCreateAssisttUsersMockOptions = {
  url: bulkCreateAssisttUsersUrl,
  successData: MOCKS.mockedBulkCreateAssisttUsersResponse,
};

const getFavoritePagesUrl = '/user/getFavoritePages';
const getFavoritePagesMockOptions = {
  url: getFavoritePagesUrl,
  successData: MOCKS.getFavoritePagesResponse,
};

const getFilteredUsersWithRestrictedDataMockOptions = {
  url: '/user/getFilteredUsersWithRestrictedData',
  successData: MOCKS.mockedFilteredUsersWithRestrictedData,
};

export default [
  refreshLoggedInUserMockOptions,
  getUserByIdMockOptions, getUsersMockOptions, createUserMockOptions,
  bulkInactivateExternalCustomerServicesAccountsMockOptions,
  getUserRolesMockOptions,
  bulkCreateTeleperformanceUsersMockOptions,
  bulkCreateWebhelpUsersGlobalMockOptions,
  bulkCreateWebhelpUsersTurkeyMockOptions,
  bulkCreateAssisttUsersMockOptions,
  getFavoritePagesMockOptions,
  getFilteredUsersWithRestrictedDataMockOptions,
];
