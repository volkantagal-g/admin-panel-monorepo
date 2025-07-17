// TESTING_PRACTICE_EXAMPLE MOCK_HANDLER_OPTIONS
import * as MOCKS from './index.mock.data';

const getMyPermissionsUrl = '/permission/getMyPermissions';

const getMyPermissionsMockOptions = {
  url: getMyPermissionsUrl,
  successData: MOCKS.mockedMyPermissions,
};

const getPageAndComponentPermissionsByRoleUrl = '/permission/getPageAndComponentPermissionsByRole';

const getPageAndComponentPermissionsByRoleMockOptions = {
  url: getPageAndComponentPermissionsByRoleUrl,
  handler: req => {
    // we want to pass the same id that is requested, so, use "handler" property
    const { role } = req.body;
    return { data: MOCKS.mockedPageAndComponentPermissionsByRole(role) };
  },
};

export default [getMyPermissionsMockOptions, getPageAndComponentPermissionsByRoleMockOptions];
