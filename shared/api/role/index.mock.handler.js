// TESTING_PRACTICE_EXAMPLE MOCK_HANDLER_OPTIONS
import * as MOCKS from './index.mock.data';

const getRoleByIdPath = '/role/getRole';

const getRoleByIdMockOptions = {
  url: getRoleByIdPath,
  handler: req => {
    // we want to pass the same id that is requested, so, use "handler" property
    const { id } = req.body;
    return { data: { ...MOCKS.mockedRole, _id: id } };
  },
};

const createRoleUrl = '/role/createRole';

const createRoleMockOptions = {
  url: createRoleUrl,
  successData: MOCKS.mockedRole,
};

const getRolesUrl = '/role/getRoles';

const getRolesMockOptions = {
  url: getRolesUrl,
  successData: MOCKS.mockedRoles,
};

const getRoleUsersPath = '/role/getUsers';

const getRoleUsersMockOptions = {
  url: getRoleUsersPath,
  handler: req => {
    // we want to pass the same id that is requested, so, use "handler" property
    const { roleId } = req.body;
    return { data: MOCKS.mockedRoleUsers(roleId) };
  },
};

const getUserOwnedRolesPath = '/role/getUserOwnedRoles';

const getUserOwnedRolesMockOptions = {
  url: getUserOwnedRolesPath,
  successData: MOCKS.mockedUserOwnedRoles,
};

const getRolesOfTeammatesMockOptions = {
  url: '/role/getRolesOfTeammates',
  successData: MOCKS.mockedRolesOfTeammates,
};

const getRoleHierarchyMockOptions = {
  url: '/role/getRoleHierarchy',
  successData: MOCKS.mockedRoleHierarchy,
};

export default [
  getRoleByIdMockOptions,
  createRoleMockOptions,
  getRolesMockOptions,
  getRoleUsersMockOptions,
  getUserOwnedRolesMockOptions,
  getRolesOfTeammatesMockOptions,
  getRoleHierarchyMockOptions,
];
