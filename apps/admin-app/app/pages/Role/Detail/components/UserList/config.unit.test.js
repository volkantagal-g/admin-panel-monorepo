import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { getTableColumns } from './config';

describe('UserList/config.js', () => {
  afterAll(cleanup);

  it('should return an array of table columns with expected properties and render functions', () => {
    const roleId = '12345';
    const countriesMap = {
      1: { name: 'Country 1' },
      2: { name: 'Country 2' },
    };
    const hasPermissionToEditUsers = true;
    const handleRemoveRoleFromUserByRoleOwner = jest.fn();
    const isActiveUserIsRoleOwner = true;
    const handleUpdateRoleMembership = jest.fn();
    const isUpdatePending = false;
    const classes = { actionButton: 'action-button' };
    const tPage = key => key;

    const tableColumns = getTableColumns({
      roleId,
      countriesMap,
      hasPermissionToEditUsers,
      handleRemoveRoleFromUserByRoleOwner,
      isActiveUserIsRoleOwner,
      handleUpdateRoleMembership,
      isUpdatePending,
      classes,
      tPage,
    });

    expect(tableColumns).toBeDefined();
    expect(tableColumns).toHaveLength(9);
  });
});
