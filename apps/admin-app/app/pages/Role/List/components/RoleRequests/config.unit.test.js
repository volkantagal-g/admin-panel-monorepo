import { Link } from 'react-router-dom';
import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { tableColumns } from './config';
import { ROUTE } from '@app/routes';

describe('Role/List/components/RoleRequests/config.js', () => {
  afterAll(cleanup);

  it('should return an array of columns with expected properties when given valid input', () => {
    const canAccess = jest.fn();
    const onCancel = jest.fn();
    const showRoleRequestModal = jest.fn();
    const t = jest.fn();
    const tab = 'pendingApproval';

    const columns = tableColumns({ canAccess, onCancel, showRoleRequestModal, t, tab });

    expect(columns).toBeInstanceOf(Array);
    expect(columns.length).toBeGreaterThan(0);
    expect(columns[0]).toHaveProperty('title');
    expect(columns[0]).toHaveProperty('dataIndex');
    expect(columns[0]).toHaveProperty('key');
    expect(columns[0]).toHaveProperty('width');
  });

  it('should render the role name as a button with a link to the role detail page when the user has permission to access the page', () => {
    const canAccess = jest.fn().mockReturnValue(true);
    const onCancel = jest.fn();
    const showRoleRequestModal = jest.fn();
    const t = jest.fn();
    const tab = 'pendingApproval';
    const role = { _id: 'role_id', name: 'Role Name' };
    const roleRequest = { role };

    const columns = tableColumns({ canAccess, onCancel, showRoleRequestModal, t, tab });
    const roleColumn = columns.find(column => column.key === 'role');

    expect(roleColumn.render(role, roleRequest).type).toBe(Link);
    expect(roleColumn.render(role, roleRequest).props.to).toBe(ROUTE.ROLE_DETAIL.path.replace(':id', role._id));
  });

  it('should render the role name as plain text when the user does not have permission to access the role detail page', () => {
    const canAccess = jest.fn().mockReturnValue(false);
    const onCancel = jest.fn();
    const showRoleRequestModal = jest.fn();
    const t = jest.fn();
    const tab = 'pendingApproval';
    const role = { _id: 'role_id', name: 'Role Name' };
    const roleRequest = { role };

    const columns = tableColumns({ canAccess, onCancel, showRoleRequestModal, t, tab });
    const roleColumn = columns.find(column => column.key === 'role');

    expect(roleColumn.render(role, roleRequest)).toBe(role.name);
  });

  it('should not render the user column when the tab is not "pendingApproval"', () => {
    const canAccess = jest.fn();
    const onCancel = jest.fn();
    const showRoleRequestModal = jest.fn();
    const t = jest.fn();
    const tab = 'myRequests';

    const columns = tableColumns({ canAccess, onCancel, showRoleRequestModal, t, tab });
    const userColumn = columns.find(column => column.key === 'user');

    expect(userColumn).toBeUndefined();
  });
});
