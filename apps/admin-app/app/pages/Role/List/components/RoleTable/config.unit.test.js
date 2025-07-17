import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import { Tag } from 'antd';

import { tableColumns } from './config';

describe('Role/List/components/RoleTable/config.js', () => {
  afterAll(cleanup);

  it('should return an array of table columns with correct properties', () => {
    const language = 'en';
    const hasAccessToRoleDetailPage = false;
    const userId = '123';
    const userRoleIds = ['456', '789'];
    const openRoleRequestModal = jest.fn();
    const roleRequests = [
      { role: { _id: '111' }, status: 'PENDING' },
      { role: { _id: '222' }, status: 'COMPLETED' },
    ];

    const columns = tableColumns(language, {
      hasAccessToRoleDetailPage,
      userId,
      userRoleIds,
      openRoleRequestModal,
      roleRequests,
    });

    expect(columns).toHaveLength(5);
    expect(columns[0]).toHaveProperty('title', 'Activeness');
    expect(columns[0]).toHaveProperty('dataIndex', 'isActive');
    expect(columns[0]).toHaveProperty('key', 'isActive');
    expect(columns[0]).toHaveProperty('align', 'center');
    expect(columns[0]).toHaveProperty('width', 80);
  });

  it('should render the \'isActive\' column with correct Tag component', () => {
    const language = 'en';
    const hasAccessToRoleDetailPage = true;
    const userId = '123';
    const userRoleIds = ['456', '789'];
    const openRoleRequestModal = jest.fn();
    const roleRequests = [
      { role: { _id: '111' }, status: 'PENDING' },
      { role: { _id: '222' }, status: 'COMPLETED' },
    ];

    const columns = tableColumns(language, {
      hasAccessToRoleDetailPage,
      userId,
      userRoleIds,
      openRoleRequestModal,
      roleRequests,
    });

    const isActiveColumn = columns.find(column => column.key === 'isActive');
    expect(isActiveColumn).toHaveProperty('render');
    expect(isActiveColumn.render(true)).toEqual(<Tag color="success">Active</Tag>);
    expect(isActiveColumn.render(false)).toEqual(<Tag color="error">Inactive</Tag>);
  });

  it('should render the \'roleOwners\' column with correct Tag component', () => {
    const language = 'en';
    const hasAccessToRoleDetailPage = true;
    const userId = '123';
    const userRoleIds = ['456', '789'];
    const openRoleRequestModal = jest.fn();
    const roleRequests = [];

    const columns = tableColumns(language, {
      hasAccessToRoleDetailPage,
      userId,
      userRoleIds,
      openRoleRequestModal,
      roleRequests,
    });

    const roleOwnersColumn = columns.find(column => column.key === 'roleOwners');
    expect(roleOwnersColumn).toHaveProperty('render');
    expect(roleOwnersColumn.render(['123'], { _id: '456' })).toEqual(<Tag>ROLE_OWNER</Tag>);
    expect(roleOwnersColumn.render(['456'], { _id: '789' })).toEqual(<Tag>Standard</Tag>);
  });

  it('should handle empty or undefined \'createdAt\' property', () => {
    const language = 'en';
    const hasAccessToRoleDetailPage = true;
    const userId = '123';
    const userRoleIds = ['456', '789'];
    const openRoleRequestModal = jest.fn();
    const roleRequests = [
      { role: { _id: '111' }, status: 'PENDING' },
      { role: { _id: '222' }, status: 'COMPLETED' },
    ];

    const columns = tableColumns(language, {
      hasAccessToRoleDetailPage,
      userId,
      userRoleIds,
      openRoleRequestModal,
      roleRequests,
    });

    const createdAtColumn = columns.find(column => column.key === 'createdAt');
    expect(createdAtColumn).toHaveProperty('render');
    expect(createdAtColumn.render(undefined)).toEqual('N/A');
  });

  it('should display detail action button when it is permitted', () => {
    const language = 'en';
    const hasAccessToRoleDetailPage = true;
    const userId = '123';
    const userRoleIds = ['456', '789'];
    const openRoleRequestModal = jest.fn();
    const roleRequests = [
      { role: { _id: '111' }, status: 'PENDING' },
      { role: { _id: '222' }, status: 'COMPLETED' },
    ];

    const columns = tableColumns(language, {
      hasAccessToRoleDetailPage,
      userId,
      userRoleIds,
      openRoleRequestModal,
      roleRequests,
    });

    expect(columns).toHaveLength(6);
    if (hasAccessToRoleDetailPage) {
      const actionColumn = columns[columns.length - 1];
      expect(actionColumn).toHaveProperty('title', 'Action');
      expect(actionColumn).toHaveProperty('align', 'center');
      expect(actionColumn).toHaveProperty('width', 120);
    }
  });
});
